# tests/test_gen_post.py
import os
import sys
import json
import pathlib
import tempfile
import unittest
from unittest import mock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "scripts"))
import gen_post as gp

SAMPLE = """---
layout: post
title: Rust Is Eating The World
description: Why the new rust framework actually matters
date: 2026-08-21 09:00:00 +0000
image: https://loremflickr.com/1600/900/rust
tags: [tech, rust]
---

Body text here about rust and why it wins.
"""


class TestGen(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.mkdtemp()
        self.cwd = os.getcwd()
        os.chdir(self.tmp)

    def tearDown(self):
        os.chdir(self.cwd)

    def test_validate_ok(self):
        self.assertTrue(gp.validate(SAMPLE))

    def test_validate_rejects(self):
        self.assertFalse(gp.validate("no front matter at all"))

    def test_slugify(self):
        self.assertEqual(gp.slugify("Rust Is Eating The World!"), "rust-is-eating-the-world")

    @mock.patch("gen_post.subprocess.run")
    def test_writes_post_and_log(self, mock_run):
        mock_run.return_value = mock.Mock(stdout=SAMPLE, returncode=0)
        spec = {"topic": "rust framework", "source_url": "https://x", "keywords": ["rust", "framework"]}
        pathlib.Path("topic.json").write_text(json.dumps(spec))
        with mock.patch("sys.argv", ["gen_post.py", "topic.json"]):
            gp.main()
        posts = list(pathlib.Path("_posts").glob("*.md"))
        self.assertEqual(len(posts), 1)
        self.assertIn("layout: post", posts[0].read_text())
        self.assertTrue(pathlib.Path("posted.json").exists())
        log = json.loads(pathlib.Path("posted.json").read_text())
        self.assertEqual(log[0]["topic"], "rust framework")


if __name__ == "__main__":
    unittest.main()
