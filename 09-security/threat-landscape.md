---
title: The Threat Landscape
summary: 55% of AI-generated code is secure. The other 45% includes SQL injection, hardcoded secrets, insecure deserialization, and a long tail of subtler issues that look fine until they don't.
tags: [security, vulnerabilities, threat-model, research]
related:
  - ./defenses.md
  - ./supply-chain.md
  - ../03-effective-use/failure-modes.md
  - ../03-effective-use/review-discipline.md
last_updated: 2026-04-27
---

# The Threat Landscape

I'm going to be blunt: the security situation with AI coding tools is not good. Not because the tools are malicious, but because they're not security-aware, and neither are most developers using them. This page is the "what goes wrong and why" page. The next page is "what to do about it."

## What I've Seen Go Wrong

The classes of bugs I keep finding in AI-generated code, ranked by how often they show up:

**SQL injection.** In 2024, and still happening in 2026. AI generates string concatenation instead of parameterized queries. The code looks fine. It works fine. It is a critical vulnerability.

**Hardcoded API keys and credentials.** AI uses placeholder values that look like real keys. `sk_test_abc123...` seems fake but maybe isn't. Apiiro's research on AI-assisted pull requests found that **repos using AI assistants exhibit materially higher rates of secret exposure** than otherwise-comparable repos. Not because AI is uniquely bad at handling secrets, but because the volume of generated code overwhelms the rate at which humans manually audit for them. (I've seen specific multipliers cited in coverage of Apiiro's work; treat them as directional rather than precise. The pattern holds even if the headline number doesn't.)

**Insecure deserialization.** AI suggested `pickle` to deserialize user input in a Python web app. If you know `pickle`, you know that's remote code execution. The AI didn't know and didn't warn. Same pattern with Java's `ObjectInputStream`, XStream, and Jackson with default typing enabled.

**Missing input validation.** AI happily writes an endpoint that takes a JSON blob and trusts every field in it. The "happy path" works. The malicious-input path crashes the service or worse.

**Authentication and authorization shortcuts.** AI suggests "for now, just check if the user is logged in", and that "for now" ships. Or it generates middleware that looks right but applies the auth check after the route handler runs.

**Race conditions and TOCTOU.** AI rarely thinks about concurrency. Check-then-act patterns get generated routinely; they pass tests run sequentially and break the moment two requests interleave.

**Dependency confusion and slopsquatting.** Covered in depth in [Supply chain & prompt injection](./supply-chain.md), but it belongs on this list. The dependency you didn't audit can be the one that owns your build.

## Why AI Is Particularly Bad at Security

The training data includes a lot of vulnerable code. Stack Overflow answers with SQL injection. Tutorial code with hardcoded secrets. Codebases that haven't been patched. AI learns these patterns and reproduces them confidently.

AI has no concept of security. It's not trying to be secure; it's trying to predict likely code. Vulnerable code is common code, so AI suggests it.

Developers trust AI too much. If the AI says to do it this way, it must be fine. Wrong. But people don't always verify, especially under deadline pressure.

The volume problem amplifies all of the above. A junior developer might write 50 lines of vulnerable code per day. AI can generate 50,000. Same proportional vulnerability rate, much bigger absolute problem.

## What the Research Says

A few data points that should shape your priors.

[Veracode's Spring 2026 GenAI Code Security Report](https://www.veracode.com/blog/spring-2026-genai-code-security/) found that only 55% of AI-generated code is secure. **That number has not improved meaningfully across the year of frontier-model releases the report covers, even as models got better at generating syntactically correct code.** Newer models do not appear to generate materially more secure code than their predecessors in Veracode's testing. The same study found AI fares worse on Java than on TypeScript or Python: what I call the **Java security paradox** in this guide (the term is mine, not Veracode's; the underlying finding is theirs). Java teams need more security review, not less, even though Java has the more mature security tooling ecosystem.

[Black Duck's 2026 OSSRA report](https://www.blackduck.com/resources/analyst-reports/open-source-security-risk-analysis.html) found mean vulnerabilities per codebase jumped **107% year-over-year**. Open source components per project increased 30%. AI is generating more code, faster, with more vulnerabilities, and pulling in more transitive dependencies along the way.

Georgia Tech's Vibe Security Radar tracks CVEs *directly* introduced by AI tools. They found 35 CVEs in March 2026 alone, up from 6 in January. Claude Code shows up the most in their data, mostly because it leaves a signature in commits; tools like Copilot's inline suggestions leave no trace, making them harder to attribute (and likely under-reported).

[Opsera's 2026 benchmark](https://opsera.ai/resources/report/ai-coding-impact-2026-benchmark-report/) found AI-generated code introduces **15-18% more vulnerabilities per line** compared to human-written code. The relative rate is bad; the absolute rate is much worse because the volume is much larger.

[Aikido Security](https://www.aikido.dev/state-of-ai-security-development-2026) reports that **roughly 1 in 5 breaches in their dataset is attributed to AI-generated code**. They estimate 24% of production code worldwide is AI-generated, 29% in the US. Caveat: vendor-published incident attribution methodology is not standardized, so treat this as directional. Even so, the ratio (~1 in 5 breaches from ~1 in 4 of code) is consistent with "AI-generated code is about as bad as the average legacy code it learned from", which is not a defense, given that the goal is to be *better* than the average legacy code, not the same.

[Apiiro's secrets-leakage research](https://apiiro.com) is one of the clearest signals in the data. The headline finding: AI-assisted repos exhibit dramatically higher rates of secret exposure than comparable repos without AI assistants. The exact multiplier varies depending on which slice of the data you look at; the pattern is robust either way.

## The pattern that emerges

Putting these numbers together, the picture is consistent:

- AI is roughly as secure as the average code it was trained on (which is not very).
- AI generates code at 10-100x the rate humans do.
- The product of those two numbers is a much larger absolute volume of vulnerabilities entering production.
- Newer models do not fix this. The gap has held flat across a year of frontier model releases.

If your security posture assumes the rate of new vulnerabilities is bounded by human typing speed, your posture is wrong.

The next page covers what to actually do about this.

## Related reading

- [Defenses](./defenses.md), the practical mitigations that move the number
- [Supply chain & prompt injection](./supply-chain.md), the second-order risks
- [Regulation & policy](./regulation.md), the legal context for getting this wrong
- [Failure modes](../03-effective-use/failure-modes.md), vibe coding and hallucinated dependencies
- [Review discipline](../03-effective-use/review-discipline.md), catching issues at PR time
