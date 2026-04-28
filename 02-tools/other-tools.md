---
title: Other Tools
summary: The non-headline tools, Windsurf, Codeium, Amazon Q, Kiro, Antigravity, Cline, Aider, and when each one is the right pick.
tags: [tools, windsurf, codeium, amazon-q, kiro, antigravity, cline, aider]
related:
  - ./recommended-setup.md
  - ../05-workflows/spec-driven-development.md
  - ../11-frontier/recent-updates-april-2026.md
last_updated: 2026-04-28
---

# The Others

The four headline tools ([Claude Code](./claude-code.md), [Cursor](./cursor.md), [GitHub Copilot](./github-copilot.md), [OpenAI Codex](./openai-codex.md)) cover most of what most developers need. The tools below cover specific use cases the headline four don't fit. None of them are my daily driver; all of them are the right answer for some readers.

## Windsurf

Cheaper than [Cursor](./cursor.md), broadly similar feature set, IDE-native AI built into a fork. The interesting context: **OpenAI acquired Windsurf in 2025**, which has implications for both pricing and product direction that haven't fully played out. Two scenarios worth tracking:

- *If* OpenAI maintains Windsurf as a distinct product, it'll likely become the OpenAI-flagship IDE-native answer to Cursor (which uses cross-vendor models). The integration story with Codex and ChatGPT becomes the differentiator.
- *If* Windsurf gets merged into Codex's offering, it disappears as a brand and its features become Codex IDE features.

Either way, treat Windsurf as a moving target. If your team is on Windsurf today, it works fine; the question is what it becomes in 12 months. For new adopters, I'd default to Cursor unless budget is the primary constraint.

## Codeium

The strongest **free** option. If you can't expense paid tools, this is the right starting point. The free tier is genuinely usable for IDE-native completion in a way that the free tiers from larger vendors aren't.

The trade-off: the agentic and codebase-aware features lag the paid tools by ~12 months in capability. For a single developer who mostly wants completion, fine. For team-scale agentic work, you'll outgrow it.

## Amazon Q

Only makes sense if your team is all-in on AWS. The AWS-specific suggestions are genuinely good — Lambda boilerplate, IAM policies, CloudFormation templates, CloudWatch query syntax. February 2026 updates strengthened the integration with Lambda and CloudWatch in particular.

What it's not good at: anything outside the AWS ecosystem. If you write code that's 80% AWS-glue and 20% other, Amazon Q is a strong companion. If your code is 20% AWS and 80% other, it's a worse Cursor.

## Amazon Kiro

A different category of tool: an **IDE built around [spec-driven development](../05-workflows/spec-driven-development.md)**, with EARS notation (Easy Approach to Requirements Syntax) baked in. The agent-hooks feature lets you trigger agents on file save, useful for automated documentation and testing.

If you're in the AWS ecosystem and your team has bought into spec-driven workflows, Kiro is worth a serious look. If you're not, the EARS-and-spec-discipline value proposition might still appeal even outside AWS.

The thing Kiro forces that other tools don't: writing the requirements down in unambiguous notation before any code happens. That discipline is the value, regardless of tool. You can do the same thing with markdown specs and any agent harness; Kiro just makes it the default.

## Google Antigravity

The interesting newcomer. In public preview with **free access to Claude Opus, Gemini models, and OpenAI models through a single interface**. Google's classic strategy: enter late, price aggressively, leverage existing distribution.

What's interesting about Antigravity:

- **Multi-model orchestration as a first-class feature.** You can have Claude Opus plan, Gemini implement, GPT review — all in one tool, without juggling vendors.
- **Google's distribution.** If you're in Workspace and GCP, Antigravity becomes available as part of the broader Google bundle.
- **The pricing pressure.** Free access to flagship models from three vendors is a serious gravity well that will pull pricing across the industry.

What I'm watching: whether Antigravity's multi-model orchestration is good enough to make "switch tools by task" obsolete, or whether it's a thinner integration that doesn't replace running specialized harnesses per vendor.

For now: worth installing and testing on a side project. Not yet worth migrating production work.

## Cline / Aider

Open source, bring-your-own-API-key tools. The right pick for two specific groups:

- **Engineers who want full control** over what the agent does and access to the underlying machinery (prompts, tool definitions, the orchestration loop). The transparency is genuine.
- **Teams with strict data-residency or vendor-policy requirements** that can't use SaaS-hosted agents. Cline and Aider running against your own model deployments are the path.

The trade-off: more setup cost than the SaaS tools; less polished UX; documentation can be uneven. For most engineers most of the time, the polished SaaS tools are worth the trade. For the specific cases above, these are the right answer and the only answer.

## A few I'd skip

Honest about tools that get attention but I wouldn't recommend as primary:

- **Tools that haven't shipped a real model in 12 months.** Several entrants from 2023-2024 are still running on dated models with thin product layers; they fall behind faster than they update. Don't migrate to a tool whose last meaningful release was a year ago.
- **Tools that lock you into a single vendor's models.** Single-vendor lock-in is a downside in a market where the model leader changes every few months. The serious tools today are the ones with cross-vendor support, even if they have a default.
- **"AI for X" niche tools** where X is a specific narrow domain (legal contracts, marketing copy, etc.) and the underlying model is the same one the general-purpose tools use. The wrapper rarely justifies the per-seat price for an engineering team.

## Related reading

- [Recommended setup](./recommended-setup.md), the author's actual stack and current pricing
- [Spec-driven development](../05-workflows/spec-driven-development.md), the workflow Kiro is built around
- [Recent updates](../11-frontier/recent-updates-april-2026.md), market movements and the OpenAI / Windsurf acquisition context
