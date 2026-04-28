---
title: 06 — Skills
summary: My take on the AI coding skills ecosystem, what skills are, the libraries worth knowing, how I choose them, how I write them, and how I avoid getting burned.
---

# Skills

I was late to skills. For most of 2025 I treated them as a Claude-Code-specific gimmick and kept stuffing everything into `CLAUDE.md`. Then I watched a colleague rewrite his entire workflow around a half-dozen good skills and start shipping noticeably better code than I was. Two weeks later I admitted I was wrong.

Skills are the most consequential change to AI coding tooling since agents themselves. Since Anthropic released the `SKILL.md` format as an open standard in December 2025, the ecosystem has gone from "Claude Code custom commands" to a real cross-tool standard with vendor support, methodology systems, and, inevitably, a security research literature on what can go wrong.

This folder is the deep-dive I wished existed when I was figuring this out. The 60-second overview lives at [`05-workflows/skills-ecosystem.md`](../05-workflows/skills-ecosystem.md).

## How to read this folder

Read in order if you're new to skills. Skip around if you're not.

1. **[What are skills](./what-are-skills.md)**: the format, the open standard, how skills differ from `CLAUDE.md` / MCP / slash commands, where to find them
2. **[Ecosystem landscape](./ecosystem-landscape.md)**: the libraries I think are worth knowing: gstack, Superpowers, Anthropic official, vendor skills (MongoDB, Supabase, Vercel, Cloudflare, HashiCorp, LiveKit, ClickHouse, Expo, Figma), security skills (Trail of Bits, Sentry), Matt Pocock, the community catalogs
3. **[Choosing skills for your project](./choosing-skills.md)**: how I'd pick by project type, stage, team size, and risk profile, plus the kit I actually run
4. **[Building your own](./building-your-own.md)**: what I've learned writing custom skills that didn't suck
5. **[Quality and anti-patterns](./quality-and-anti-patterns.md)**: skill bloat, the security situation (it's bad), what I do about it

## Where to go next

- The agentic foundation skills extend → **[05 — Agents](../05-workflows/agents.md)**
- Context engineering, the lower-level companion → **[04 — Context engineering](../04-understanding-and-context/context-engineering.md)**
- Why the security pages here matter → **[07 — Security](../09-security/threat-landscape.md)**
