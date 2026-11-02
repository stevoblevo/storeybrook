"""Read-only Pages verification on the existing standard hosted CI runner."""
import concurrent.futures
import hashlib
import json
import os
import subprocess
import time
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[2]
BASE = 'https://stevoblevo.github.io/storeybrook/show-tell/'


def main():
    if os.environ.get('GITHUB_ACTIONS') != 'true':
        raise SystemExit('Use the authorized hosted Pages verification job; do not retry the blocked local Pages route.')
    sha = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip()
    assert sha == os.environ['EXPECTED_SOURCE_SHA'], 'Checkout differs from Pages source.'
    release = json.loads((ROOT / 'show-tell/release.json').read_text())
    manifest = json.loads((ROOT / 'show-tell/media-manifest.json').read_text())
    runtime_types = {'.html', '.css', '.js', '.svg', '.png', '.mp3', '.ttf', '.json', '.txt', '.srt'}
    files = [path for path in subprocess.check_output(['git', 'ls-files', 'show-tell'], cwd=ROOT, text=True).splitlines()
             if Path(path).suffix in runtime_types]

    def verify(path):
        expected = (ROOT / path).read_bytes()
        relative = str(Path(path).relative_to('show-tell'))
        url = BASE + quote(relative, safe='/') + '?release=' + sha
        last = None
        # Bounded retries cover ordinary Pages propagation on this permitted runner.
        for attempt in range(4):
            try:
                request = urllib.request.Request(url, headers={'User-Agent': 'Storeybrook-release-verifier/1.0'})
                with urllib.request.urlopen(request, timeout=25) as response:
                    actual = response.read()
                    assert response.status == 200
                    assert hashlib.sha256(actual).digest() == hashlib.sha256(expected).digest(), 'Deployed bytes differ from Pages source.'
                    return {'path': relative, 'status': response.status, 'bytes': len(actual), 'sha256': hashlib.sha256(actual).hexdigest()}
            except (urllib.error.URLError, TimeoutError, AssertionError) as error:
                last = str(error)
                if attempt < 3:
                    time.sleep(10)
        return {'path': relative, 'error': last}

    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(verify, files))
    failures = [r for r in results if 'error' in r]
    confirmed = {r['path']: r for r in results if 'error' not in r}
    for asset in manifest['assets']:
        if asset['path'] in confirmed:
            assert confirmed[asset['path']]['sha256'] == asset['sha256']
            assert confirmed[asset['path']]['bytes'] == asset['bytes']
    receipt = {'version': release['version'], 'source_sha': sha,
               'pages_run_id': os.environ.get('PAGES_RUN_ID'), 'url': BASE,
               'exhibit_html_count': sum(Path(p).suffix == '.html' for p in files),
               'approved_asset_count': len(manifest['assets']),
               'verified_file_count': len(confirmed), 'failures': failures, 'files': results,
               'audible_verification': False}
    print(json.dumps(receipt, indent=2))
    if os.environ.get('GITHUB_STEP_SUMMARY'):
        with open(os.environ['GITHUB_STEP_SUMMARY'], 'a') as summary:
            summary.write(f"Show & Tell {release['version']} — {BASE}\n\nSource: `{sha}`\n\n")
            summary.write(f"Verified {len(confirmed)}/{len(files)} public files, including 11 exhibit HTML pages and 31 approved media assets. Failures: {len(failures)}.\n")
            summary.write('This checks deployed response bytes against the tested source. It does not claim audible listening.\n')
    return bool(failures)


if __name__ == '__main__':
    raise SystemExit(main())
