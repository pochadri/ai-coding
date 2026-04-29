---
title: For Team Leads
summary: A 90-day rollout plan for engineering managers introducing AI coding to their team. Training matters more than tools. Update review guidelines. Set clear boundaries. Know when to escalate.
tags: [team-lead, management, policy, training, rollout]
related:
  - ./junior-developers.md
  - ./measuring-impact.md
  - ./alignment-bottleneck.md
  - ../03-effective-use/review-discipline.md
  - ../07-quality-and-security/threat-landscape.md
last_updated: 2026-04-28
---

# For Team Leads

If you're an engineering manager or tech lead running a single team that's adopting AI coding tools, the rest of this page is for you. If you're a CTO, VPE, or Director making *org-level* decisions (platform team scope, hiring/leveling rubrics, AUP rollout, board narrative), the [08 — Team & Adoption](../08-team-and-adoption/) folder is the right altitude. The two folders complement each other; this is the team-of-5-to-15 view.

The thesis: most teams that buy AI tools and expect productivity gains don't get them in the first three months. The teams that get the gains are the ones who treat the rollout as a capability-building exercise, not a tool-purchasing one. Tools are the cheap part. Building the team's discipline around them is the work.

## Training matters more than tools

I've seen teams give everyone Copilot licenses and expect productivity to improve. It doesn't, at least not for three months. People don't know how to use the tools effectively, the review discipline hasn't caught up to the new failure modes, and the team's existing AGENTS.md (if there is one) is built for a world without agentic execution.

The teams that do well invest in training. Not "how to accept suggestions" but four specific skills:

- **How to write specs the agent can actually use.** Most engineers, given an agent, prompt it conversationally and get conversational results. The shift to writing a spec first is the biggest productivity unlock and the biggest training gap.
- **How to review AI-generated code at the right altitude.** Reviewers fall into two failure modes: nitpicking style on AI diffs (waste of time; a linter does it) or rubber-stamping multi-hundred-line diffs (the actual bugs slip past). Train both away.
- **How to recognize when not to use AI.** Auth code, novel architectural decisions, anything where the team doesn't yet have conventions. The "use AI for everything" instinct is the source of most early incidents.
- **How to author and maintain custom skills.** This is the highest-leverage long-term investment and most teams skip it entirely. See [building your own skills](../06-skills-and-memory/building-your-own.md).

## A 90-day rollout plan

If I were rolling AI coding to a 5-15 person team starting Monday, this is the structure I'd run.

### Days 1-30: foundation

The first month is about getting tools installed and the security floor in place. Pick one tool and standardize — don't let everyone choose, because indecision and tool-fragmentation cost more than picking the "wrong" tool. I'd default to [Claude Code](../02-tools/claude-code.md) unless you have a specific reason to choose otherwise; pair it with Cursor or Copilot for IDE-native completion if your team wants it.

Write the team's [AGENTS.md](../08-team-and-adoption/templates/agents-md-org-template.md) early, even just thirty lines covering your stack, your conventions, and what NOT to AI-generate. Commit it to the repo root and treat it as a living document.

Set up the security floor in parallel — static analysis (Semgrep / Snyk / CodeQL) on every PR, secret-scanning pre-commit and in CI, and `skill-scanner` audits before any community skill installs. Non-negotiable; details in [07 — Defenses](../07-quality-and-security/defenses.md).

Round it out with a one-hour team-wide "how I use the tool" session run by whoever is most fluent (recorded for later joiners), and update the PR template with a checkbox: "AI-generated code, fully reviewed and understood." The checkbox is the explicit signal to reviewers that this PR needs the AI-aware review discipline.

By end of month one: tools installed, AGENTS.md exists, security floor is live, and the team has shared a baseline of how to use the tooling.

### Days 31-60: discipline

The second month is where the practices land. Adopt [spec-driven development](../05-workflows/spec-driven-development.md) for anything non-trivial: any change bigger than a one-file edit starts with a short markdown spec checked into the repo. The first month is awkward; the second month it's reflex.

Update the code-review guidelines to cover AI-specific issues. Do all imports/dependencies actually exist? Does this code follow the team's patterns or is it generic? Are there obvious security issues? And the controversial one: **does the author understand what they shipped?** That last one is load-bearing; see [review discipline](../03-effective-use/review-discipline.md).

Author the team's first two or three custom skills. Pick patterns the agent has been getting wrong repeatedly — your error-handling wrapper, your test-naming convention, your API-contract style. Twenty minutes per skill, hours per week of compounded return. The how-to lives in [building your own skills](../06-skills-and-memory/building-your-own.md).

Start the [AI-vs-AI security review pass](../07-quality-and-security/defenses.md#ai-vs-ai-review-a-separate-model-reviews-the-first-models-output) habit for any PR touching auth, deserialization, or external input — different session, ideally different model. This is the single highest-leverage Tier 2 security practice.

By end of month two: spec-driven is the default for real work, the code-review checklist has caught up, the first custom skills exist, and the security review pass is a habit.

### Days 61-90: institutionalize

The third month is where the rollout proves itself with data. Pick two metrics and start tracking — not lines of code; probably one throughput metric (deploys per week, story points completed) and one quality metric (PR review cycle time, post-merge defects). Six weeks of data is enough to tell if the rollout worked. See [measuring impact](./measuring-impact.md).

Audit the custom-skill kit and prune it. Every quarter, look at which skills are actually firing and which aren't; remove the ones the agent is no longer using. The kit should be living, not archived.

Address the alignment problem head-on. Three months in, the team's individual throughput is up but team coordination is showing strain (more parallel work, more PR-stage misalignment). See [the alignment bottleneck](./alignment-bottleneck.md). Adopt at least one of the five practices on that page; the easiest is usually "plans as checked-in markdown artifacts."

Run a retrospective specifically on the rollout. What's working? What's not? What practices should you drop because they were performative? What should you double down on?

By day 90, you'll know whether AI coding is working for your team and you'll have the data to defend that conclusion.

## Set clear boundaries

The rules I'd enforce on any team I led, in plain language. AI is not trusted on auth, crypto, or other [security-critical code](../07-quality-and-security/threat-landscape.md) without the structured pattern: AI drafts, a human writes the security boundary, a separate-model review pass catches what the generation session missed. AI-generated code must be labeled in the PR (a checkbox is enough) so the reviewer knows to apply the AI-aware discipline. Any AI-suggested dependency must be verified before installation, because slopsquatting is a real attack now (see [supply chain](../07-quality-and-security/supply-chain.md)). And juniors run the [structured ramp](./junior-developers.md): pair without AI in month 1, autocomplete only in month 2, full toolkit in month 3 with skill gates between each.

You'll have different rules. The specifics matter less than the fact that they exist and are written down. The Wild West approach leads to the kind of incident that you only need to have once before you wish you'd had rules.

## When to escalate

Three classes of issue I'd escalate beyond the team:

1. **Security incidents involving AI-generated code.** Especially anything reaching customer data, payments, or auth. Loop in security and legal early. The "AI wrote it" defense doesn't exist; see [regulation](../07-quality-and-security/regulation.md).
2. **Vendor-policy events that disrupt the team's tooling.** When Anthropic or OpenAI changes terms in a way that breaks workflows (it has happened), the team needs a runbook for migration. Don't absorb this quietly; it's an org-wide signal.
3. **Sustained throughput-without-quality patterns.** When the team's PR rate is up but post-merge defects are also up, that's not a team problem to solve in isolation. Escalate it as a measurement-and-platform problem.

Things to absorb without escalating: individual incidents from AI hallucinations that didn't reach production (fold into the next retro and update the AGENTS.md); friction between engineers about tooling preferences within the standard (the team should have one tool; debate is fine, fragmentation isn't); anyone insisting "AI doesn't help me" (not every engineer has the same gain profile, and as long as they're meeting the team's quality bar, individual style differences are individual).

## What "good" looks like at three months

Five observable signs your rollout worked:

1. New PRs include the AI-generated checkbox more often than not. The team has internalized that AI use is normal and labeled, not hidden.
2. The team has at least 2-3 custom skills checked into the repo and being maintained.
3. The PR review cycle time is stable or down. Throughput hasn't been consumed by review burden.
4. At least one production incident has been caught in the security review pass before merge. The pass is real, not performative.
5. Junior engineers (if any) are progressing on the [skill-gate ramp](./junior-developers.md), not just shipping more code with hidden senior review burden.

If three months in you don't have any of these, the rollout isn't sticking. Don't double down on tools; back up to the discipline.

## Related reading

- [Junior developers](./junior-developers.md), the structured ramp this page assumes
- [Measuring impact](./measuring-impact.md), the metrics worth tracking
- [The alignment bottleneck](./alignment-bottleneck.md), the team coordination problem that surfaces at month three
- [Review discipline](../03-effective-use/review-discipline.md), the underlying review checklist
- [08 — Team & Adoption / Org design + platform team](../08-team-and-adoption/org-design.md), the org-level framing of the same questions
