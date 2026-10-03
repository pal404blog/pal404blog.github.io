---
layout: post
title: Utah Just Learned You Can't Subpoena the Laws of Mathematics
description: "A federal court finally told Utah lawmakers what every network engineer already knew: demanding VPNs break encryption to police teenagers is an illiterate fantasy."
date: 2026-10-03 09:00:00 +0000
image: https://loremflickr.com/1600/900/oss?lock=14189
tags: [tech, oss]
---

Politicians have a fascinating relationship with reality. In their world, if you don't like an economic outcome, you pass a subsidy. If you don't like an election result, you redraw a district. So it’s almost endearing—in a deeply terrifying, catastrophic sort of way—when they assume the laws of computer science operate on the same corruptible principles.

They genuinely think code is just legislative play-doh. They believe that if enough state senators furrow their brows and cite "the safety of our children," the underlying mathematics of public-key cryptography will simply pack its bags, apologize for the inconvenience, and let the state snoop wherever it pleases.

Enter Utah. In its infinite wisdom, the state legislature passed a mandate demanding that virtual private network providers verify the age of their users and actively block minors from accessing restricted material. When privacy advocates politely pointed out that this is not how VPNs work, state officials essentially shrugged and said, *make it work.*

Now, the Electronic Frontier Foundation (EFF) dragged this legislative farce before a judge, and a federal court has delivered a verdict that anyone with half a brain saw coming: Utah's law demands a technical impossibility.

Let’s spell this out for the suits who still print out their emails. A VPN is a dumb, encrypted pipe. Its sole architectural purpose—its entire *raison d'être*—is to encapsulate traffic at point A and deliver it securely to point B without anyone in the middle knowing who you are or what payload you're hauling. It doesn't inspect the packets because *it cannot decrypt the packets*. 

Utah’s lawmakers looked at an encrypted tunnel and said: "Hey, can you set up a digital bouncer inside that opaque pipe to check whether the driver is seventeen years old, while also ensuring the pipe remains completely opaque and private?"

It's the digital equivalent of demanding an envelope manufacturer verify whether a handwritten letter contains profanity before the postal worker drops it in a mailbox, all while keeping the envelope completely sealed. It isn't just bad policy; it’s an intellectual void.

The real casualty here—had the court not slapped Utah down—would have been the open-source software ecosystem. Consider how modern secure networking actually functions. The internet doesn’t run on proprietary black boxes dreamed up in a venture capital incubator; it runs on foundational oss tools. Protocols like WireGuard and OpenVPN are open source software. They are audited by cryptographers worldwide. They are built on absolute mathematical truths, lean architecture, and verifiable transparency.

What did Utah expect an oss project maintainer to do? Push a commit that deliberately cripples the cryptographic handshakes of WireGuard just to comply with the moral panic of a single landlocked state? 

"Sorry folks, we're merging a backdoored KYC module into the Linux kernel this week because some politicians in Salt Lake City couldn't figure out how to put parental controls on their kids' iPads."

If you outlaw the standard, mathematically rigorous implementation of privacy tools, you don't magically fix the problem. You just criminalize oss developers and push everyday users into the arms of fly-by-night, logging-happy corporate VPNs that will happily sell your data to brokers under the guise of "compliance." You break the tools that protect dissidents, journalists, domestic abuse survivors, and ordinary citizens just to construct a toothless digital panopticon that any clever teenager with a Tor browser could bypass in thirty seconds anyway.

The EFF deserves credit for doing the thankless work of explaining basic networking to adults who make six figures drafting state statutes. The court's ruling is a rare, refreshing victory for technical sanity over legislative posturing. It draws a line in the sand: you cannot pass a statute that orders engineers to violate the physics of computer science, and you cannot bully software providers into building backdoors by labeling it "child safety."

This won't stop them, of course. Utah is just the canary in the coal mine. Lawmakers across the country—and across the globe—are queuing up identical, copy-pasted bills designed to dismantle end-to-end encryption. They are terrified of a world where citizens can communicate without a government-issued hall pass.

**Hot take:** If your child-protection bill requires rewriting the laws of encryption and gutting the open-source privacy stack, you don't actually care about kids—you’re just exploiting them as human shields to normalize state-mandated surveillance.
