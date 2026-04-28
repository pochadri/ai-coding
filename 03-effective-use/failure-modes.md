---
title: Failure Modes Nobody Talks About
summary: Vibe coding, hallucinated packages, skill atrophy, and the technical debt machine.
tags: [failure-modes, vibe-coding, hallucinations, technical-debt, juniors]
related:
  - ./review-discipline.md
  - ../04-understanding-and-context/understanding-problem.md
  - ../09-security/threat-landscape.md
  - ../10-team-and-process/junior-developers.md
last_updated: 2026-04-25
---

# The Failure Modes Nobody Talks About

The marketing never mentions these. But after seeing them repeatedly, I think they're important.

## Vibe Coding

Andrej Karpathy [coined "vibe coding"](https://x.com/karpathy/status/1886192184808149383) in early 2025. By February 2026, he declared it passé and proposed "agentic engineering": humans stop writing code entirely, delegating to agents. [Collins Dictionary named "vibe coding" Word of the Year 2025](https://blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025-ai-meets-authenticity-as-society-shifts/), just as practitioners were moving past it. The widely-cited "[59% of developers have shipped code they didn't fully understand](https://clutch.co/resources/devs-use-ai-generated-code-they-dont-understand)" finding traces to a Clutch.co survey of 800 software professionals (the source guide attributed it to Atlassian; see [REFERENCES.md](../REFERENCES.md#8-atlassian--developer-survey-59-stat)). They accepted the AI suggestion because it "looked right" and moved on.

I've done it. We've all done it. And it creates problems later.

I've seen this happen firsthand. A developer I was helping committed Claude-generated code for a caching layer. It worked in testing. In production, under load, it had a race condition that corrupted data intermittently. When I asked him to debug it, he couldn't, because he'd never really understood what the code did. What should have been an hour fix became two days of forensics.

The lesson: **if you can't explain why the code works, you shouldn't ship it.** Period. I don't care how good the AI-generated code looks.

## The Hallucination Problem

AI confidently suggests packages and APIs that don't exist. It'll tell you to `npm install some-package-that-sounds-real`, and when you do, either nothing happens (package doesn't exist) or worse, you install malware (someone registered the hallucinated name).

This happened to me once. Copilot suggested a package for PDF parsing that sounded perfect. Turns out it was a typosquatted package that someone had registered three days earlier. Our security scanner caught it, but barely.

Now I verify every AI-suggested dependency against the actual package registry. It's paranoid, but necessary.

## The Skill Atrophy Concern

I worry about this for [junior developers](../10-team-and-process/junior-developers.md) especially.

When I was learning to code, I had to read documentation, understand APIs, struggle through problems. That struggle was how I learned. If you can just ask AI for the answer, do you ever build that deep understanding?

I've seen developers who couldn't explain how `async/await` actually works in JavaScript. They'd been using AI to write all their async code for months. It worked, but they had no mental model of the event loop.

If I were managing a team, here's what I'd do: have juniors do their first pass without AI. Struggle with the problem. Build understanding. Then use AI to verify or speed up their solution. It's slower, but necessary for real learning.

## The Technical Debt Machine

GitClear found 4x more code duplication since AI tools became popular. I believe it.

It's so easy to ask AI to write a new function instead of finding the existing one that does the same thing. So easy to generate similar code in three places instead of extracting a shared utility. The AI doesn't know you already have a string formatting helper, it just generates a new one.

Technical debt compounds. All that duplicated code becomes a maintenance nightmare. I've started explicitly prompting: "Before writing new code, check if there's an existing utility for this in the codebase." It helps, but it's not perfect.

## Overcomplication

A failure mode that doesn't get a clean name often enough: **the agent's tendency to overengineer.** Karpathy [named it directly in late 2025](https://x.com/karpathy/status/2015883857489522876): "They really like to overcomplicate code and APIs, bloat abstractions, don't clean up dead code... implement a bloated construction over 1000 lines when 100 would do."

I see this constantly. Ask the agent for a simple function and you get a configurable framework. Ask for a script and you get a CLI tool with subcommands and a plugin system. Ask for a one-time data migration and you get a generalized migration framework with rollback support, dry-run mode, and a metrics endpoint. All of it works. None of it was asked for.

The mechanism: the model has seen far more "production-grade" code than throwaway scripts in its training data, and it pattern-matches toward the production-grade shape even when the situation calls for the throwaway. It also doesn't know what "no, that's overkill" looks like — it interprets ambiguity as license to add more.

The fix is in the prompt. Constraints work; vague asks don't:

- *"Minimum code that solves the problem. No abstractions for single-use code. No flexibility or configurability that wasn't requested. No error handling for impossible scenarios. If 200 lines could be 50, rewrite it."*

I've adopted those lines (paraphrased from the [andrej-karpathy-skills CLAUDE.md](https://github.com/forrestchang/andrej-karpathy-skills)) as standing instructions in my AGENTS.md for any project where I do exploratory work. The line that catches the most: *"Would a senior engineer say this is overcomplicated? If yes, simplify."* The agent will sometimes catch its own overengineering when forced to apply the test.

This is also a review discipline. Reviewers should flag overengineering as a defect, not a stylistic preference. A 200-line PR that solves a 50-line problem is worse than a 50-line PR that solves the same problem, even if the 200-line version is "more flexible." The flexibility you didn't ask for is technical debt with extra steps.

## Related reading

- [Review discipline](./review-discipline.md), the checklist that catches these patterns
- [The understanding problem](../04-understanding-and-context/understanding-problem.md), why "looks right" isn't enough
- [Security](../09-security/threat-landscape.md), hallucinated dependencies as an attack vector
- [Junior developers](../10-team-and-process/junior-developers.md), protecting learning
