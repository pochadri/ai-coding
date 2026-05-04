---
title: Skill Quality and Anti-Patterns
summary: Skill bloat, the security situation (it's bad), real incidents, and what I do about it.
tags: [skills, anti-patterns, security, prompt-injection, skill-bloat, governance]
related:
  - ./building-your-own.md
  - ./choosing-skills.md
  - ../07-quality-and-security/threat-landscape.md
last_updated: 2026-04-25
---

# Skill Quality and Anti-Patterns

I've burned myself enough times that I now treat skills with the same suspicion I treat any third-party dependency. Here's what I've learned to watch for, in roughly the order it's bitten me.

If you're about to install a community skill, scroll to the Mitigations section below and walk through that checklist first.

---

## Quality anti-patterns

### Thin checklist skills

The most common failure: a skill that says "look for these patterns" with no methodology, confidence framework, or context-awareness. These don't change how the agent reasons, they just add noise. They flag everything, miss real issues, or both.

I've installed maybe a dozen "security review" skills over the past year. Only one materially changed Claude's reasoning ([Sentry's](https://github.com/getsentry/skills)). The rest were thin checklists masquerading as expertise. One reviewer ran the same experiment formally, tested five popular security skills and found four were thin checklists. Only Sentry's actually improved Claude's reasoning. ([TimOnWeb writeup](https://timonweb.com/ai/i-checked-5-security-skills-for-claude-code-only-one-is-worth-installing/))

**Test:** if you can replace your skill with the prompt "remember to check for X, Y, Z" and get equivalent results, your skill is a thin checklist. Either teach methodology or delete it.

### Skill bloat

I learned this one the hard way. I went through a phase of installing every skill that looked interesting. At one point I had 14 active skills and 4 MCP servers connected. My output got worse, not better. The agent started adding verbose preamble, hedging on simple questions, sometimes flat-out arguing with itself in the visible reasoning.

Most experienced practitioners I've talked to settle on:

- **3 or fewer active skills**
- **5–8 active *tools*** (skills + MCP servers combined) per context

Past those numbers, output quality drops measurably. Less is more. The hardest part is *uninstalling* skills you're emotionally invested in.

### Stuffing custom instructions

The mistake: dumping code review rules + deploy procedures + API guidelines + testing standards all into Custom Instructions or `CLAUDE.md`. Now everything is always in context, competing with the actual task.

The right structure: skills load conditionally, `CLAUDE.md` holds only invariants, MCP holds only live state. ([Karakambaka on this exact mistake](https://medium.com/@kdineshkvkl/stop-stuffing-your-custom-instructions-the-definitive-guide-to-claude-skills-mcp-0edda444fcda))

### Heavy MCP without skills

A 5-server / 58-tool MCP configuration burns 55K+ tokens before the model starts reasoning. If you find yourself there, the answer is usually to migrate procedural how-to into skills (loaded on demand) and keep MCP only for genuine live-state needs. I had to do this rebalancing about six months in and it materially improved my output.

### Generic vs project-specific

Generic skills are easy to install and weak in effect. Project-specific skills (your team's conventions, your domain's gotchas, the bug that took two days to find last month) are where the real lift is.

A reasonable target ratio: 70% project-specific skills you wrote, 30% community/vendor skills.

### Stale skills

Hardcoded API names drift out of date as frameworks evolve. The defensive design from [LiveKit](https://github.com/livekit/agent-skills) is the right answer: teach **architectural patterns**, not API surface. If you must include API names, pin the framework version and own the upgrade.

Re-test every skill against new model versions. Behaviors that needed correction in Sonnet 4.5 may be defaults in Opus 4.7, or vice versa. I've had skills become *worse* with model upgrades because the model's own defaults caught up but the skill kept overriding them.

### Conflicts between skills

Two skills defining different "how to commit" conventions, or different code review priorities, produce unstable behavior, the agent will pick one inconsistently. This is also why I argue against running both gstack and Superpowers simultaneously: they have opposite philosophies, and the agent ends up arbitrating.

Note: Claude Code's built-in skills now sometimes shadow custom skills with the same `name`. ([open issue #33080](https://github.com/anthropics/claude-code/issues/33080)) Use distinctive names.

---

## Security: prompt injection via skills

This is the part that should make you cautious about community installs. I'll be blunt: the skill security situation in April 2026 is bad.

### The ToxicSkills study (Snyk, February 2026)

Snyk audited 3,984 skills available across the ecosystem. The findings:

- **36% had prompt injection vulnerabilities**
- **1,467 contained malicious payloads**
- **~13% of any random ClawHub install in the prior month** had a critical security flaw

Embedded adversarial instructions in `SKILL.md` trigger on common prompts, a skill claiming to "format dates" can also extract environment variables when the agent runs it. There's **no code signing** and **no security review by default** on most marketplaces. ([Snyk: ToxicSkills](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/))

### Real incidents

- **"Claudy Day" (Oasis Security, March 2026)**: Researchers chained invisible prompt injection with data exfiltration against claude.ai itself. ([VentureBeat coverage](https://venturebeat.com/security/ai-agent-runtime-security-system-card-audit-comment-and-control-2026))
- **Johns Hopkins / PR-comment injection**: Researchers got Anthropic Claude Code Security Review, Gemini CLI Action, and GitHub Copilot Agent to leak API keys via crafted PR comments. ([SecurityWeek](https://www.securityweek.com/claude-code-gemini-cli-github-copilot-agents-vulnerable-to-prompt-injection-via-comments/))

### Why skills make this worse

Skills are **untrusted markdown files that ship arbitrary scripts** and tell the agent to run them. Every install is a trust decision. Every update is a re-trust decision. The progressive disclosure model that makes skills efficient also means you may never read the `references/` files that get loaded later, but the agent will.

I've moved to treating skill installs like installing a CLI from a stranger's GitHub. I wouldn't `pip install` a random package without at least skimming it; I shouldn't install a random skill without the same care.

### Mitigations

The pragmatic checklist before any community skill install. I run through this every time:

1. **Read every `SKILL.md` end-to-end.** Including the description (which can contain instructions to the model that override yours).
2. **Skim every file in `scripts/` and `references/`.** Skills can ship arbitrary code.
3. **Run [Sentry's `skill-scanner`](https://github.com/getsentry/skills) on the directory before install.** This is the single highest-leverage safety check; it's the one tool I run *every* time without exception.
4. **Pin versions.** Don't auto-update community skills.
5. **Prefer first-party publishers.** Vendor's own org > top-tier individual maintainer > random GitHub account.
6. **Audit `allowed-tools` carefully.** A skill requesting filesystem write or network access deserves more scrutiny than one that doesn't.
7. **Use directory-scoped edits** when touching production. gstack's `freeze`/`guard` skills enforce this if you don't want to roll your own.
8. **Treat skills as code, not configuration.** PR review, signed commits, audit logs.

For broader AI coding security context, see folder 08.

---

## Governance and team patterns

When skills are a team-level concern (rather than a personal kit), additional structure helps:

- **Centralized skills repo** with PR review on every change, same as application code.
- **Named owner** per skill (CODEOWNERS file).
- **Subagent pressure-tests in CI**: run a representative scenario through the skill on every PR.
- **Allowlist of approved external skills**: the team can pull from this list; anything else needs review.
- **Anthropic Team/Enterprise** for org-wide provisioning, audit logs, rollback, agent-owner roles.

> Reference: [Portkey on who owns Claude Code at your company](https://portkey.ai/blog/platfrom-guide-to-coding-agents/), [Aigentic Lab on enterprise governance](https://newsletter.aigenticlab.com/p/skills-at-enterprise-scale-governance-at-zero).

---

## A short rule

If you can't articulate **(a)** what a skill changes about the agent's reasoning, **(b)** what trust assumption it represents, and **(c)** how you'd notice when it stops helping, don't install it.

If your own skill fails any of those tests, don't ship it.

## Related reading

- [Choosing skills](./choosing-skills.md), the install decision framework
- [Building your own](./building-your-own.md), write skills that earn their tokens
- [Security](../07-quality-and-security/threat-landscape.md), broader AI coding security
