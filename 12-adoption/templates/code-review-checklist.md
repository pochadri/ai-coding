---
title: Code Review Checklist for AI-Generated Code
summary: 6-item checklist updated for AI-generated code. Adapt for your team's PR template.
tags: [adoption, templates, code-review, quality]
related:
  - ./aup.md
  - ../../03-effective-use/review-discipline.md
last_updated: 2026-04-26
---

# Code Review Checklist for AI-Generated Code

The argument I make to peers: AI-generated code needs *different* review than human code. Humans make typos, forget edge cases, get tired. AI makes different mistakes, subtle logic errors, hallucinated APIs, security vulnerabilities, missing context. Same review checklist won't catch them.

This is the version I'd hand to a team. The first five items are mechanical. **Item 6 is the controversial one**: it asserts that the human author should be able to explain what AI-generated code does, and if they can't, the PR doesn't merge. I hold the line on that one. The Replit/SaaStr database deletion was, at root, a violation of item 6.

---

## Template starts here ⬇️

# `[ORG]` Code Review Checklist

## For all PRs

- [ ] **CI is green.** No flaky-test bypass; no disabled tests.
- [ ] **The diff matches the description.** No surprise changes.
- [ ] **Tests cover the new behavior.** New code has new tests; bug fixes have regression tests.

## Additional checks for AI-assisted PRs (label: `ai-assisted`)

- [ ] **1. Do all imports and dependencies exist?**
      Verify against the actual package registry, not just "looks reasonable." Hallucinated packages are an attack vector ([typosquatted dependencies are documented in failure modes](../../03-effective-use/failure-modes.md#the-hallucination-problem)).
- [ ] **2. Are there any obvious security issues?**
      SQL injection, hardcoded secrets, insecure deserialization, missing auth checks, plaintext tokens. Apiiro's data: 322% spike in privilege escalation paths in AI-generated code. *Look for it specifically.*
- [ ] **3. Are edge cases handled?**
      Null, empty, boundary conditions. AI gets the happy path; you should explicitly check the unhappy ones.
- [ ] **4. Does this follow our patterns?**
      Or is it generic AI-default code? Specifically check: error handling (`AppError` vs generic `try/catch`), logging (org logger vs `console.log`), test naming, file structure.
- [ ] **5. Are observability and error paths instrumented?**
      All public methods have structured logging at DEBUG; all error paths include correlation IDs; all DB operations have timing metrics. AI generates happy-path code; you have to ask for the rest.
- [ ] **6. Can the author explain what this code does?**
      In review, ask: *"Walk me through what this is doing."* If the response is *"I don't fully understand it but it works,"* the PR doesn't merge. The author owns the code regardless of who (or what) wrote it.

## For PRs touching auth, crypto, or payment code

These should not be primarily AI-authored. If a PR in these areas is labelled `ai-assisted`, escalate the review to security or a designated reviewer. AI may *suggest*; humans *write*.

---

*— End of template. Adapt freely. —*

---

## Notes for the editor (delete before adoption)

- **Item 6 is the spine.** Almost every other check is mechanical and could in principle be automated. Item 6 is the human judgment that determines whether AI is amplifying your engineers or replacing their understanding. *Don't compress it out.*
- **Items 1–5** map roughly to the [STRIDE-style threat model in Risk, governance, policy](../risk-governance-policy.md#the-threat-model--ai-in-the-sdlc-stride-style). If your PR template tooling supports linking each checklist item to a doc, link them.
- **The `ai-assisted` label** can be self-reported initially. Once you have CI data on which tools your devs use, you can detect it programmatically (Claude Code leaves session metadata; Copilot's inline mode is harder; Cursor varies).
- **For high-throughput teams:** the AI-assisted checks add 1–3 minutes per review. The math: that's vastly less than the cost of one Apiiro-class privilege escalation in production.

## How this is different from the [IC review discipline page](../../03-effective-use/review-discipline.md)

The IC page frames the same checklist in practitioner voice, written for an engineer doing review. What follows is the same checklist as a *team artifact*, written for an EM or platform lead choosing what to put in their PR template. Use whichever framing your audience needs.

## Related

- [Review discipline (IC depth)](../../03-effective-use/review-discipline.md), the practitioner version
- [AUP template](./aup.md), the policy that mandates this checklist
- [Failure modes](../../03-effective-use/failure-modes.md), the patterns this checklist catches
