# scripts/gen_post.py
import sys
import os
import re
import json
import subprocess
import datetime
import pathlib

MODEL_PRIMARY = "gemini-3.7-flash-high"
MODEL_FALLBACK = "gemini-3.6-flash-high"
POSTS_DIR = pathlib.Path("_posts")
POSTED_PATH = pathlib.Path("posted.json")
AGY_BIN = os.environ.get("AGY_BIN", "agy")


def build_prompt(topic, source_url, keywords):
    today = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d 09:00:00 +0000")
    kw = keywords[0] if keywords else "technology"
    cover = f"https://loremflickr.com/1600/900/{kw}"
    kws = ", ".join(keywords) if keywords else kw
    return (
        "You are 'Pal', a tech blogger with the tagline 'writing what others are afraid to say'. "
        "Your voice is opinionated, provocative, and human: use contractions, a little dry humor, "
        "and a clear point of view. Never be robotic, corporate, or SEO-spammy.\n\n"
        f"Write ONE complete blog post in Markdown about this trending tech topic: {topic}\n"
        f"Source context: {source_url}\n"
        f"Keywords: {kws}\n\n"
        "Output ONLY the raw Markdown of the post. Start with Jekyll front matter delimited by --- lines "
        "containing exactly these keys:\n"
        "layout: post\n"
        "title: (catchy and opinionated)\n"
        "description: (one sentence)\n"
        f"date: {today}\n"
        f"image: {cover}\n"
        "tags: [tech, " + kw + "]\n\n"
        "Then the body: 600-900 words, with a strong opinionated stance and a short 'hot take' closing "
        "paragraph. Do NOT wrap the output in code fences. Output nothing else."
    )


def call_agy(prompt, model):
    r = subprocess.run(
        [AGY_BIN, "--print", "--model", model, prompt],
        capture_output=True, text=True, timeout=300,
    )
    return r.stdout.strip()


def validate(md):
    if not md.startswith("---"):
        return False
    if "layout: post" not in md:
        return False
    return True


def slugify(title):
    s = re.sub(r'[^a-zA-Z0-9]+', '-', title.lower()).strip('-')
    return s or "post"


def main():
    if len(sys.argv) < 2:
        print("usage: gen_post.py topic.json", file=sys.stderr)
        sys.exit(1)
    spec = json.loads(pathlib.Path(sys.argv[1]).read_text())
    topic = spec["topic"]
    source_url = spec["source_url"]
    keywords = spec.get("keywords", [])
    prompt = build_prompt(topic, source_url, keywords)

    md = call_agy(prompt, MODEL_PRIMARY)
    if not validate(md):
        md = call_agy(prompt, MODEL_FALLBACK)
    if not validate(md):
        print("ERROR: agy output invalid after retry", file=sys.stderr)
        sys.exit(3)

    tm = re.search(r'title:\s*(.+)', md)
    title = tm.group(1).strip().strip('"').strip("'") if tm else topic
    date = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d")
    slug = slugify(title)
    fname = POSTS_DIR / f"{date}-{slug}.md"
    if fname.exists():
        print(f"SKIP: {fname} already exists")
        sys.exit(0)

    POSTS_DIR.mkdir(exist_ok=True)
    fname.write_text(md + "\n", encoding="utf-8")

    posted = []
    if POSTED_PATH.exists():
        try:
            posted = json.loads(POSTED_PATH.read_text())
        except ValueError:
            posted = []
    posted.append({"date": date, "topic": topic, "source_url": source_url})
    posted = posted[-60:]
    POSTED_PATH.write_text(json.dumps(posted, indent=2), encoding="utf-8")
    print(f"WROTE {fname}")


if __name__ == "__main__":
    main()
