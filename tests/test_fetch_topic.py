# tests/test_fetch_topic.py
import os
import sys
import unittest
from unittest import mock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "scripts"))
import fetch_topic as ft


SAMPLE_GH = '''<article class="Box-row"><h2 class="h3 lh-condensed">
  <a href="/octocat/hello-world">octocat / hello-world</a>
</h2>
<p class="col-9 color-fg-muted my-1 pr-4">An AI powered dev tool</p>
</article>
<article class="Box-row"><h2 class="h3 lh-condensed">
  <a href="/foo/bar">foo / bar</a>
</h2>
<p class="col-9 color-fg-muted my-1 pr-4">A recipe for soup</p>
</article>'''

SAMPLE_HN = {"hits": [
    {"title": "New Rust web framework beats everything", "url": "https://example.com/r", "points": 300, "objectID": "1"},
    {"title": "My cat is cute", "url": "", "points": 5, "objectID": "2"},
]}


class _Resp:
    def __init__(self, data):
        self._d = data.encode() if isinstance(data, str) else data
    def read(self):
        return self._d
    def __enter__(self):
        return self
    def __exit__(self, *a):
        return False


class TestFetch(unittest.TestCase):
    def test_github_parse(self):
        with mock.patch("fetch_topic.urllib.request.urlopen", return_value=_Resp(SAMPLE_GH)):
            items = ft.fetch_github_trending()
        self.assertEqual(len(items), 2)
        self.assertEqual(items[0]["topic"], "octocat/hello-world")
        self.assertIn("AI", items[0]["description"])

    def test_hn_parse(self):
        with mock.patch("fetch_topic.urllib.request.urlopen", return_value=_Resp(__import__("json").dumps(SAMPLE_HN))):
            items = ft.fetch_hn()
        self.assertEqual(items[0]["title"], "New Rust web framework beats everything")

    def test_tech_filter(self):
        items = [
            {"topic": "rust framework", "description": "", "title": "rust", "source": "hn"},
            {"topic": "soup recipe", "description": "", "title": "soup", "source": "hn"},
        ]
        tech = [i for i in items if ft.is_tech(i)]
        self.assertEqual(len(tech), 1)
        self.assertEqual(tech[0]["topic"], "rust framework")

    def test_dedup_excludes_posted(self):
        items = [{"topic": "rust framework", "description": "", "title": "rust", "source": "hn"}]
        posted = [{"topic": "rust framework", "source_url": "x"}]
        self.assertIsNone(ft.select(items, posted))

    def test_select_picks_tech_unposted(self):
        items = [
            {"topic": "rust framework", "description": "fast", "title": "rust", "source": "hn", "points": 50},
            {"topic": "soup recipe", "description": "yum", "title": "soup", "source": "hn", "points": 5},
        ]
        chosen = ft.select(items, [])
        self.assertEqual(chosen["topic"], "rust framework")


if __name__ == "__main__":
    unittest.main()
