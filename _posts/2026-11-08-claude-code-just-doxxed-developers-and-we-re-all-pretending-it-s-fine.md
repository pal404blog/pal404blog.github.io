---
layout: post
title: Claude Code Just Doxxed Developers, and We’re All Pretending It’s Fine
description: Anthropic's new coding agent left over a thousand sets of credentials exposed on GitHub because humans are too lazy to read permission prompts.
date: 2026-11-08 09:00:00 +0000
image: https://loremflickr.com/1600/900/ai?lock=45741
tags: [tech, ai]
---

Remember when software development required actual thought? Ah, those were the days. Now, we’re all just glorified prompt engineers babysitting hyperactive text predictors that we hope won’t accidentally leak our production database keys to the entire internet. 

Spoiler alert: they are leaking them. 

Let’s talk about the latest shiny object in the developer ecosystem: Claude Code. Anthropic’s CLI tool is supposed to be the ultimate productivity hack, writing our tests, refactoring our spaghetti code, and generally making us look like 10x engineers while we scroll through X. But according to a recent drop from the folks at Apiiro, this magical little **ai** assistant has a dark side. It turns out Claude Code’s enthusiastic use of the "Don't ask again" permission button has successfully exposed passwords, API keys, and internal secrets across 1,122 public **github** repositories. 

One thousand one hundred and twenty-two. 

Let that sink in. That’s not a rounding error; that’s a parade of shame.

Here is what actually happened, stripped of all the vendor PR doublespeak. Developers, being the chronically exhausted, caffeine-addled creatures we are, got tired of Claude popping up to ask, "Hey, can I read this file?" Every. Single. Time. So, what did we do? We clicked the checkbox. We checked the digital equivalent of "trust me, bro." We hit "Don't ask again" like lab rats hammering a pellet dispenser. 

And because Claude was just trying to be a helpful little digital beaver, it went ahead and ingested everything in sight. Then, through standard workflows, those local secrets—hardcoded configs, private keys, database credentials—ended up committed, pushed, and beamed directly onto **github** for the world to see. 

I can hear the AI evangelists typing their angry replies right now. *"Pal, you don't get it! This is user error! The tool is just doing what it's told!"*

Yeah, exactly. That’s the entire point. 

We’ve spent the last three years building **code** assistants designed to strip away the friction of software engineering. We’ve automated away the boring parts, but in doing so, we’ve also automated away the healthy paranoia that kept us from committing `.env` files. We’ve trained an entire generation of developers to treat security warnings as annoying pop-ups to be swiped away as fast as possible, right alongside cookie banners and software updates.

Anthropic will release a patch. They’ll tweak the UI, add more red warning text, or make the "Don't ask again" button require a blood sacrifice to click. And the tech press will write a polite post-mortem about "responsible AI governance."

Meanwhile, the fundamental problem remains: we are handing the keys to our digital kingdom over to systems that don't understand the difference between a public README and an AWS root password, operating under the command of humans who just want the red squiggly lines to go away so they can log off by 5 PM. 

We don't have an AI safety crisis. We have an industry-wide laziness crisis, and the machines are just holding up a mirror to show us how sloppy we've become.

Here is my hot take: Stop clicking "Don't ask again" on anything that touches your filesystem. If you're too lazy to review what your **ai** agent is reading, you deserve to have your staging environment mined for crypto.
