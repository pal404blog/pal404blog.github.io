---
layout: post
title: Stop Installing Heavy Packages for Stuff the Web Already Does
description: We are drowning in massive JavaScript bundles to solve problems HTML and CSS solved years ago.
date: 2026-08-21 09:00:00 +0000
image: https://loremflickr.com/1600/900/web
tags: [tech, web]
---

Let’s be honest for a second: as an industry, we’ve completely lost our minds. 

Every time a junior developer wants to build a simple tooltip or toggle a menu, the collective response from senior "thought leaders" is to reach for a three-megabyte npm package. We’ve turned web development into an exercise in digital hoarding. We pile framework upon framework, library upon library, until our simple text documents require a supercomputer to load. And why? Because we're too lazy—or too conditioned—to look at what's already built right into the browser.

It’s time to stop treating native **web** standards like a backup plan and start treating them like the superpower they actually are. 

I recently stumbled across a neat little corner of the internet called HTML Cat, and it’s a brilliant reminder of how much heavy lifting the browser will do for you for free, if you just get out of its way. We don't need a heavy dependency for every single interaction. We just need to remember how the web actually works.

Here are a few native tricks that are genuinely worth remembering the next time you're tempted to `npm install` your way out of a problem.

### The `<dialog>` Element is Dead. Long Live the `<dialog>` Element.

Remember when making a modal popup required importing a heavy UI library, managing body-scroll locks, writing convoluted z-index hacks, and frantically adding accessibility attributes so screen readers wouldn't burst into flames? 

Yeah, me too. And it was miserable.

Now we have the native `<dialog>` element. You write a couple of lines of HTML, call `.showModal()` in vanilla JavaScript, and the browser handles the rest. It automatically centers itself, creates a backdrop, locks focus inside the modal, and listens for the escape key to close. No third-party script required. It’s almost like the people building browsers actually understand UX. 

### Native Accordions Without the JavaScript Bloat

If you’ve ever written a custom React component with `useState` just to make an FAQ section expand and collapse, I want you to look in the mirror and ask yourself: *at what point did I stray from the light?*

The `<details>` and `<summary>` tags have been sitting in HTML5, quietly minding their own business, waiting for us to stop writing redundant JS. Wrap your hidden content in a `<details>`, put your clickable title in a `<summary>`, and boom—you have a fully accessible, animated, native accordion. 

```html
<details>
  <summary>Why am I writing so much JavaScript?</summary>
  <p>Because you forgot HTML can do this natively.</p>
</details>
```

It takes zero dependencies, works without JavaScript enabled, and takes about three seconds to type. 

### CSS Has Superpowers Now

While we're at it, can we talk about what CSS can do natively these days? We used to rely on bloated JavaScript libraries just to handle layout shifts, scroll-linked animations, and responsive typography. Now? CSS has container queries, nesting, trigonometric functions, and smooth native scrolling right out of the box. 

You don't need a layout engine written in JS to make a responsive card. You don't need a plugin to make elements snap into place as you scroll. The browser is a modern rendering engine, not a dumb terminal waiting for React to tell it what color a button should be.

### The Real Cost of Bloat

Every time you pull in a massive library for a trivial feature, you aren't just adding weight to your bundle. You're adding potential security vulnerabilities, maintenance debt, and sluggish load times for users on spotty mobile connections. We write code on M3 Max MacBooks connected to fiber-optic internet, and then we ship it to someone trying to read our blog on a budget phone in a subway tunnel. 

It’s arrogant, and it’s lazy. 

The web platform is richer, faster, and more capable than it has ever been. The next time you reach for your terminal to download a 50kb package to solve a basic UI problem, take a deep breath. Check the specs. The native solution is probably already there, waiting patiently for you to use it.

### Hot Take

If your web app requires a high-end gaming laptop just to render a static FAQ page, your code isn't enterprise-grade—it's just broken.
