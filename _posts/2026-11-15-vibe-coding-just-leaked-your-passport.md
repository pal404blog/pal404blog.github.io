---
layout: post
title: "\"Vibe Coding\" Just Leaked Your Passport"
description: AI app builders like Lovable promised anyone could build software, but they forgot to mention anyone could read your private data too.
date: 2026-11-15 09:00:00 +0000
image: https://loremflickr.com/1600/900/ai?lock=9369
tags: [tech, ai]
---

We were told software engineering was dead. 

Remember the breathless LinkedIn posts from three months ago? The venture capitalists hyperventilating on X because they built a clone of Uber over the weekend without writing a single line of code? "You don't need a computer science degree anymore," they chirped. "You just need taste. Just prompt it. Let the vibes flow."

Well, the vibes have arrived. And along with them came over 200,000 private messages, scanned passport details, identity documents, and sensitive customer records, all sitting wide open on the public internet like a pile of free flyers on a college campus.

Security researchers at Crissy Field recently dropped a forensic post-mortem on apps built using Lovable—one of the hottest "AI full-stack app builders" on the market right now. If you haven't been keeping track of the hype cycle, Lovable lets anyone prompt a web app into existence, automatically provisioning a backend, a database (usually via Supabase), and frontend code.

The pitch was simple: go from idea to production app in ten minutes. 

The reality was simpler: go from idea to catastrophic data breach in eight.

What Crissy Field discovered wasn't an obscure, nation-state zero-day. It wasn't some hyper-sophisticated memory corruption bug. It was the digital equivalent of building a bank vault out of cardboard and leaving the door swinging in the wind. The AI was generating backends that completely bypassed Row Level Security (RLS) or carelessly baked service-role administrative keys right into public frontend bundles. Anyone with a web browser and an ounce of curiosity could query the databases directly, extract user tables, and walk away with personal IDs, financial snapshots, and hundreds of thousands of private DMs.

Let’s be brutally honest about what happened here. 

The entire premise of "vibe coding" relies on a lethal lie: that software engineering was merely the tedious chore of typing out syntax, and that understanding architecture, authorization, and data isolation was just bureaucratic legacy nonsense. 

When you tell an AI model to "build me an app where users can upload their travel docs and message each other," the model does exactly what it's trained to do: it produces code that *appears* to work. The buttons click. The text appears on screen. The file uploads. To a founder who doesn't know what an API token is, the app looks finished. It feels magical. 

Except the AI has no concept of threat models. It has no visceral terror of a compliance audit. It doesn’t lay awake at 3:00 AM wondering if a malicious payload in an HTTP header can dump the `users` table. The AI just wants to make the UI render so the human stops prompting it. 

The result? We have handed power tools to toddlers, wrapped it in sleek Silicon Valley branding, and told them they're enterprise architects. 

The fault doesn't entirely lie with the naive founders who trusted the tool. The platform vendors selling this dream deserve the lion's share of the blame. When your business model is convincing non-technical creators that they can deploy production-grade software handling sensitive personal data, having bulletproof default security isn't an "advanced feature" you toss on the backlog. It is your only ethical obligation. If your AI platform auto-generates a database without strict, non-negotiable authorization rules, you haven't built a dev tool; you've built an industrial data leak generator.

We are currently watching the demo-first, reality-never tech culture hit a very hard, very concrete wall. Real engineering was never about typing `for` loops or remembering the syntax for a CSS flexbox. It was about knowing how systems fail under adversarial pressure. It was about assuming everyone on the internet is actively trying to break into your house, and locking the deadbolt accordingly.

Now, thousands of end users who never even heard of Lovable have their government identification floating around in scraped breach archives because some "vibe-coder" wanted to hustle an MVP before their afternoon espresso.

**Hot Take:** If you build an app using an AI code generator and you don't know how to audit its database security policies yourself, you haven't built a tech company—you've built an extortion scheme where your users pay the ransom with their identities. Turn off your production servers and hire a real engineer before the regulators do it for you.
