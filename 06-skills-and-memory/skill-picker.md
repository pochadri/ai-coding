---
title: Interactive Skill Picker
summary: Pick your project type, stage, team, and risk profile. Get a recommended skill kit.
tags: [skills, picker, interactive]
related:
  - ./choosing-skills.md
  - ./ecosystem-landscape.md
  - ./quality-and-anti-patterns.md
last_updated: 2026-04-25
---

# Interactive Skill Picker

Answer six questions and you'll get a recommended skill kit for your project. The recipe maps to the same logic as [Choosing skills](./choosing-skills.md), but in 30 seconds instead of reading four pages.

<SkillPicker />

## Want the conversational version?

If you'd rather *talk to the recommender inside your own AI tool* (Claude Code, Cursor, Codex CLI) and have it ask follow-ups based on your codebase context, that's available as an installable skill. Drop [`skills/skill-recommender/`](https://github.com/pochadri/ai-coding/tree/main/skills/skill-recommender) into `~/.claude/skills/` and ask *"recommend skills for my project."* Same decision rules as this picker, but interactive and with full starter `SKILL.md` scaffolds for the custom skills it suggests.

## How this works

The picker hardcodes the same decision rules I use in [Choosing skills](./choosing-skills.md). It's deliberately opinionated, it gives you *one* answer per combination, not "here are five options." The output is a starting point, not a destination.

A few notes:

- **Most combinations produce 4–8 skills.** That's the menu. The recommendation in [Quality and anti-patterns](./quality-and-anti-patterns.md#skill-bloat) is to settle on **3 or fewer active skills**, so treat the output as candidates and pick the ones that match how you actually work.
- **The picker doesn't know your codebase.** Your custom skills (the ones you write yourself) are what produce the real lift; this only covers the install side.
- **For risk profiles above "Internal tool,"** always run [Sentry's `skill-scanner`](https://github.com/getsentry/skills) before installing anything from the community.

## Related reading

- [Choosing skills](./choosing-skills.md), the full reasoning behind these recipes
- [Ecosystem landscape](./ecosystem-landscape.md), what each library does
- [Quality and anti-patterns](./quality-and-anti-patterns.md), what to check before installing
