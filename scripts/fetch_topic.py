# scripts/fetch_topic.py
import sys
import re
import json
import html
import urllib.request
import urllib.error

TECH_KEYWORDS = [
    "ai", "ml", "machine learning", "deep learning", "llm", "gpt", "model", "neural",
    "dev", "developer", "code", "coding", "programming", "software", "open source", "oss",
    "web", "frontend", "backend", "api", "cloud", "kubernetes", "docker", "linux", "rust",
    "python", "javascript", "typescript", "security", "cyber", "data", "database",
    "startup", "crypto", "blockchain", "github", "framework", "compiler", "gpu", "chip",
]


def _get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    return urllib.request.urlopen(req, timeout=20).read().decode("utf-8", "replace")


def fetch_github_trending():
    try:
        data = _get("https://github.com/trending?since=daily")
    except urllib.error.URLError:
        return []
    items = []
    for art in re.findall(r'<article class="Box-row">(.*?)</article>', data, re.S):
        m = re.search(r'<h2[^>]*>\s*<a href="/([^"]+)"', art)
        if not m:
            continue
        repo = m.group(1).strip()
        dm = re.search(r'<p[^>]*>(.*?)</p>', art, re.S)
        desc = html.unescape(re.sub(r'<[^>]+>', '', dm.group(1))).strip() if dm else ""
        items.append({
            "topic": repo,
            "title": repo.split("/")[-1].replace("-", " ").replace("_", " "),
            "source_url": "https://github.com/" + repo,
            "description": desc,
            "source": "github",
            "points": 0,
        })
    return items


def fetch_hn():
    try:
        data = json.loads(_get("https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=30"))
    except (urllib.error.URLError, ValueError):
        return []
    items = []
    for h in data.get("hits", []):
        title = (h.get("title") or "").strip()
        if not title:
            continue
        items.append({
            "topic": title,
            "title": title,
            "source_url": h.get("url") or ("https://news.ycombinator.com/item?id=" + str(h.get("objectID", ""))),
            "description": "",
            "source": "hn",
            "points": h.get("points") or 0,
        })
    return items


def is_tech(item):
    text = (item["topic"] + " " + item["description"] + " " + item["title"]).lower()
    return any(k in text for k in TECH_KEYWORDS)


def keywords_for(item):
    text = (item["topic"] + " " + item["description"]).lower()
    found = [k for k in TECH_KEYWORDS if k.strip() in text]
    return found[:3] if found else ["technology"]


def load_posted(path):
    try:
        with open(path) as f:
            return json.load(f)
    except (FileNotFoundError, ValueError):
        return []


def normalize(s):
    return re.sub(r'[^a-z0-9]+', ' ', s.lower()).strip()


def select(items, posted):
    posted_norm = {normalize(p.get("topic", "")) for p in posted}
    cands = []
    for idx, it in enumerate(items):
        if normalize(it["topic"]) in posted_norm:
            continue
        if not is_tech(it):
            continue
        score = it.get("points", 0) + (1000 - idx)
        cands.append((score, it))
    cands.sort(key=lambda x: x[0], reverse=True)
    return cands[0][1] if cands else None


def main():
    posted = load_posted("posted.json")
    items = fetch_github_trending() + fetch_hn()
    if not items:
        print(json.dumps({"error": "no topics fetched"}))
        sys.exit(1)
    chosen = select(items, posted)
    if not chosen:
        print(json.dumps({"error": "no new topic (all posted or non-tech)"}))
        sys.exit(2)
    chosen["keywords"] = keywords_for(chosen)
    print(json.dumps({
        "topic": chosen["topic"],
        "source_url": chosen["source_url"],
        "keywords": chosen["keywords"],
        "source": chosen["source"],
    }))


if __name__ == "__main__":
    main()
