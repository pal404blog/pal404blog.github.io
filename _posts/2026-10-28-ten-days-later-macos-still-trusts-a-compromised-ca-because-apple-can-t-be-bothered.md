---
layout: post
title: Ten Days Later, macOS Still Trusts a Compromised CA Because Apple Can't Be Bothered
description: Ten days after a massive certificate authority compromise, macOS is still happily trusting eMudhra, proving once again that Apple's security posture is more theater than substance.
date: 2026-10-28 09:00:00 +0000
image: https://loremflickr.com/1600/900/rust?lock=71102
tags: [tech, rust]
---

Remember when Apple used to market itself as the paranoid, security-first adult in the room? Ah, sweet nostalgia. Because ten days after a glaring certificate authority disaster involving eMudhra came to light, your Mac is still happily trusting their compromised certificates—especially when you're just trying to pull down a repo with Git.

Let’s not bury the lede here: this is an absolute embarrassment. 

If you haven't been following the dumpster fire, security researchers dropped a bombshell pointing out that eMudhra—a cert authority that somehow has its roots baked into systems we rely on every single day—had serious integrity issues. We aren't talking about some obscure, fly-by-night operation in a basement. We’re talking about a CA whose authority quietly underpins everyday developer workflows, including Git operations on macOS. 

And yet, here we are, more than a week later, and macOS security is moving at the speed of a glacier in January. 

You fire up your terminal, type `git clone`, and your machine silently nods along to a trust chain that should have been nuked from orbit the second the news broke. It’s the digital equivalent of finding out your front door lock was picked on national television, and deciding to leave it wide open because calling a locksmith is just *so* much work before your morning oat milk latte.

Why does this keep happening? Because the modern tech ecosystem is built on a horrifying house of cards. We’ve abstracted our security away into bloated, monolithic OS frameworks maintained by trillion-dollar companies that are too busy dreaming up new ways to cram AI summaries into your text messages to actually audit the root certificates baked into their operating systems. 

Meanwhile, what are the adults doing? Look at the systems actually engineered for safety rather than marketing vibes. When you write something in **rust**, you get yelled at by the compiler for missing a single edge case before your code even sniffs production. Memory safety, type safety—we demand absolute rigor from our compilers. But the operating systems running those binaries? They’re apparently held together with duct tape, prayers, and trust in shady certificate authorities that nobody outside of a compliance checkbox committee has audited in a decade.

We shouldn't have to manually scrub our system stores or wait for Cupertino to issue a point release just because a CA screwed up. If a certificate authority goes sideways, revocation should propagate instantly. Instead, we’re stuck in this agonizing limbo where developers are the ones left holding the bag, vetting their own trust stores while Apple marketing teams figure out how to spin this into a "privacy feature."

If your development machine is still blindly trusting eMudhra today, you aren't secure. You're just lucky—so far. 

Here’s my hot take: Apple treats security compliance like a luxury aesthetic instead of an operational necessity, and until a major zero-day exploited via these zombie certificates costs them billions in enterprise churn, they simply won't care.
