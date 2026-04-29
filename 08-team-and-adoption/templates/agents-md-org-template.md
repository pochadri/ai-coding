---
title: Org-Level AGENTS.md Template
summary: Canonical org-wide context file the platform team owns. Per-repo override pattern.
tags: [adoption, templates, agents-md, claude-md, context-engineering]
related:
  - ./aup.md
  - ../org-design.md
  - ../../04-understanding-and-context/context-engineering.md
last_updated: 2026-04-26
---

# Org-Level `AGENTS.md` Template

The pattern: a canonical org-wide `AGENTS.md` lives in `[ORG]/.github` (or equivalent shared repo). Each individual repo extends it with project-specific overrides via its own `AGENTS.md` at the repo root. The agent reads both, org-wide gives the conventions, repo-level gives the specifics.

GitHub's published guidance ["how to write a great AGENTS.md, lessons from over 2,500 repositories"](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/) is worth reading before adopting this. The short version: treat `AGENTS.md` like code (PRs, reviews, changelog entries), keep it focused, and update it when the agent makes the same mistake twice.

---

## Template starts here ⬇️

# `[ORG]` Engineering — `AGENTS.md`

> This file is the org-wide context for AI coding agents working in `[ORG]` codebases.
> Per-repo overrides live in each repo's own `AGENTS.md`.
> Owner: `[Platform Team]`. Reviewed quarterly. Last review: `[DATE]`.

## Who we are

`[ORG]` is a `[ONE-SENTENCE DESCRIPTION]`. Our engineering org is `[N]` engineers across `[N]` teams. We ship to `[ENVIRONMENTS]` and our primary stack is `[LANGUAGES/FRAMEWORKS]`.

## Conventions you should follow

### General
- Match the existing code style of the file you're editing. Don't refactor unrelated code.
- Prefer existing utilities over new ones. Before writing a new helper, search for an equivalent.
- Comments only when WHY is non-obvious. Don't comment WHAT, names already do that.

### Error handling
- We use the `[AppError]` wrapper, not generic `try/catch`. See `[PATH/TO/EXAMPLE]`.
- All errors include a correlation ID for traceability.
- Never swallow errors silently.

### Logging
- All public methods have structured logging at `DEBUG` level minimum.
- Use `[ORG]`'s logger, not `console.log` / `print`.
- Never log secrets, PII, or tokens.

### Testing
- Tests live in `[CONVENTION, e.g., __tests__/, tests/, _test.go alongside]`.
- We use `[FRAMEWORK]`. Match existing test style.
- New tests required for new behavior; bug fixes require a regression test.

### Git workflow
- Branch naming: `[CONVENTION]`
- Commit messages: `[CONVENTION — Conventional Commits, etc.]`
- PR title and description: see template at `[INTERNAL URL]`

## Boundaries, what NOT to do

These are non-negotiable and override anything else in this file:

- **Never modify** files in `[/legacy, /vendor, /third-party, etc.]` without explicit human request
- **Never run** destructive database commands (`DROP`, `TRUNCATE`, `DELETE` without `WHERE`), even in dev
- **Never commit** code touching `[auth, crypto, billing, /security]` without a human review
- **Never disable** tests or security checks to make a build pass
- **Never install** a dependency without verifying it exists in the official registry
- **Never push** directly to `main` / `master`

## Three-tier permissions

| Action | Permission |
|---|---|
| Read code, search, run tests | Always |
| Edit code outside the boundaries above | After confirming the request |
| Edit code in boundary areas, run destructive commands, push to remote | Ask first, every time |

## Approved tools and their roles

- **Claude Code**: agentic refactoring, multi-file work, code understanding
- **Cursor / GitHub Copilot**: IDE-integrated autocomplete and chat
- **`[memory tool]`**: cross-session continuity (see `[INTERNAL URL]`)

## Where to find help

- Engineering wiki: `[URL]`
- Architecture decision records: `[URL]`
- Platform team Slack: `[#channel]`
- AI-specific patterns and known gotchas: `[INTERNAL URL, pattern library maintained by champions]`

---

*— End of template. Adapt freely. —*

---

## Notes for the editor (delete before adoption)

- **Where to put this:** the canonical org-wide file lives at `[ORG]/.github/AGENTS.md` (GitHub auto-discovers). Each individual repo gets its own `AGENTS.md` at the repo root that *extends* (not replaces) the org-wide one. Modern AI tools (Claude Code, Cursor, Codex CLI) read both.
- **Keep this file under ~100 lines.** Anthropic's published guidance is "under 500"; my recommendation for the *org-wide* file is under 100, with the rest in linked references that load on demand. Repos will add their own.
- **The "Boundaries" section is the highest-leverage content.** Most rollouts I've seen don't include hard boundaries; the result is the [Replit/SaaStr database deletion incident](../case-studies.md#-replit--saastr--the-production-database-deletion). Be specific about what's off-limits.
- **The error/logging/testing conventions** are placeholders. Replace with your actual ones. The pattern matters more than the specifics, any rule consistently applied beats no rule.
- **Per-repo overrides:** each repo's own `AGENTS.md` should *extend*, not replace, this file. The agent reads both. Common per-repo content: domain-specific concepts, deployment specifics, recent gotchas.
- **Treat this file like code.** PRs, reviews, changelog. The instinct to skip review on "just a docs change" is the instinct that lets bad context drift in.

## Related

- [AUP template](./aup.md), the policy this AGENTS.md operationalizes for agents
- [Context engineering (IC depth)](../../04-understanding-and-context/context-engineering.md), the practitioner-level treatment
- [Skills ecosystem](../../06-skills-and-memory/), for skill-based augmentation of this baseline
- [Memory](../../06-skills-and-memory/), for cross-session persistence beyond this file
