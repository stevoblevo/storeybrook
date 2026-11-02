"""Source checks and fail-closed media verification; this is not browser QA."""
import argparse
import hashlib
import json
import re
import subprocess
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[2]
EXHIBITS = ROOT / 'show-tell'
EXPECTED = json.loads((Path(__file__).parent / 'expected-assets.json').read_text())


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs, self.scripts, self.script = [], [], None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.refs.extend(attrs[key] for key in ('href', 'src', 'poster') if attrs.get(key))
        if tag == 'script' and not attrs.get('src'):
            self.script = ''

    def handle_data(self, text):
        if self.script is not None:
            self.script += text

    def handle_endtag(self, tag):
        if tag == 'script' and self.script is not None:
            self.scripts.append(self.script)
            self.script = None


def verify(source_only=False):
    failures, syntax = [], 0
    for path in sorted(EXHIBITS.rglob('*')):
        refs, scripts = [], []
        if path.suffix == '.html':
            page = Page()
            page.feed(path.read_text())
            refs, scripts = page.refs, page.scripts
        elif path.suffix == '.css':
            refs = [next(value for value in match if value) for match in
                    re.findall(r'''url\(\s*(?:'([^']*)'|"([^"]*)"|([^)]*))\s*\)''', path.read_text())]
        elif path.suffix == '.js':
            scripts = [path.read_text()]
        for ref in refs:
            url = urlsplit(ref)
            if url.scheme or url.netloc or not url.path:
                continue
            target = (path.parent / unquote(url.path)).resolve()
            if not target.is_relative_to(ROOT):
                failures.append(f'Out-of-tree reference: {path.relative_to(ROOT)} -> {ref}')
            elif not target.exists():
                approved_missing = target.is_relative_to(EXHIBITS) and str(target.relative_to(EXHIBITS)) in EXPECTED
                if not (source_only and approved_missing):
                    failures.append(f'Missing reference: {path.relative_to(ROOT)} -> {ref}')
        for script in scripts:
            run = subprocess.run(['node', '--check', '--input-type=module'], input=script, text=True, capture_output=True)
            syntax += 1
            if run.returncode:
                failures.append(f'JavaScript syntax: {path.relative_to(ROOT)}: {run.stderr}')

    # The deliberately private media must never reappear as active public references.
    for filename in ('index.html', 'world.js'):
        text = (EXHIBITS / 'malachi-site' / filename).read_text()
        for forbidden in ('reference/image(20261031-023436).png', 'edited-excerpts.mp3'):
            if forbidden in text:
                failures.append(f'Private media reference in {filename}: {forbidden}')

    assets = []
    if not source_only:
        for relative in EXPECTED:
            path = EXHIBITS / relative
            if not path.is_file():
                failures.append(f'Missing approved asset: {relative}')
                continue
            data = path.read_bytes()
            assets.append({'path': relative, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
        manifest_path = EXHIBITS / 'media-manifest.json'
        if not manifest_path.is_file():
            failures.append('Missing verified media-manifest.json; obtain the exact approved archive before release.')
        else:
            manifest = json.loads(manifest_path.read_text())
            if manifest.get('archive_sha256') != 'bb98208e5e382600140f96a8ec5880b49ddd1b0d7343c281508491647c1ff284':
                failures.append('Media manifest does not identify the approved archive.')
            if sorted(manifest.get('assets', []), key=lambda x: x['path']) != sorted(assets, key=lambda x: x['path']):
                failures.append('Asset hashes differ from the verified archive manifest.')
    result = {'candidate': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip(),
              'source_only': source_only, 'syntax_checks': syntax,
              'expected_asset_counts': dict(Counter(Path(p).suffix for p in EXPECTED)),
              'assets': assets, 'failures': failures}
    print(json.dumps(result, indent=2))
    return bool(failures)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--source-only', action='store_true', help='Skip only the declared absent approved bundle; never a release pass.')
    raise SystemExit(verify(parser.parse_args().source_only))
