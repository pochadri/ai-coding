---
title: For Team Leads
summary: A 90-day rollout plan for engineering managers introducing AI coding to their team. Training matters more than tools. Update review guidelines. Set clear boundaries. Know when to escalate.
tags: [team-lead, management, policy, training, rollout]
related:
  - ./junior-developers.md
  - ./measuring-impact.md
  - ./alignment-bottleneck.md
  - ../03-effective-use/review-discipline.md
  - ../09-security/threat-landscape.md
last_updated: 2026-04-28
---

# For Team Leads

If you're an engineering manager or tech lead running a single team that's adopting AI coding tools, the rest of this page is for you. If you're a CTO, VPE, or Director making *org-level* decisions (platform team scope, hiring/leveling rubrics, AUP rollout, board narrative), the [12 — Adoption](../12-adoption/) folder is the right altitude. The two folders complement each other; this is the team-of-5-to-15 view.

The thesis: most teams that buy AI tools and expect productivity gains don't get them in the first three months. The teams that get the gains are the ones who treat the rollout as a capability-building exercise, not a tool-purchasing one. Tools are the cheap part. Building the team's discipline around them is the work.

## Training matters more than tools

I've seen teams give everyone Copilot licenses and expect productivity to improve. It doesn't. At least not for three months. People don't know how to use the tools effectively, the review discipline hasn't caught up to the new failure modes, and the team's existing AGENTS.md (if there is one) is built for a world without agentic execution.

The teams that do well invest in training. Not "how to accept suggestions" but four specific skills:

- **How to write specs the agent can actually use.** Most engineers, given an agent, prompt it conversationally and get conversational results. The shift to writing a spec first is the biggest productivity unlock and the biggest training gap.
- **How to review AI-generated code at the right altitude.** Reviewers fall into two failure modes: nitpicking style on AI diffs (waste of time; a linter does it) or rubber-stamping multi-hundred-line diffs (the actual bugs slip past). Train both away.
- **How to recognize when not to use AI.** Auth code, novel architectural decisions, anything where the team doesn't yet have conventions. The "use AI for everything" instinct is the source of most early incidents.
- **How to author and maintain custom skills.** This is the highest-leverage long-term investment and most teams skip it entirely. See [building your own skills](../06-skills/building-your-own.md).

## A 90-day rollout plan

This is the structure I'd run if I were rolling AI coding to a 5-15 person team starting Monday.

### Days 1-30: foundation

Goals: everyone has the tools installed, knows the team's basic policies, and has had at least one real session pairing with a more-experienced AI user.

Concrete actions:

- **Pick one tool and standardize.** Don't let everyone choose. Indecision and tool-fragmentation cost more than picking the "wrong" tool. See [recommended setup](../02-tools/recommended-setup.md). I'd default to Claude Code unless you have a strong reason otherwise.
- **Write the team's AGENTS.md.** Even 30 lines. The team's stack, conventions, what NOT to AI-generate. Commit it to the repo root. See [the org-level template](../12-adoption/templates/agents-md-org-template.md) for a starting point; trim ruthlessly.
- **Set up the security floor.** Static analysis (Semgrep / Snyk / CodeQL) on every PR; secret-scanning pre-commit and in CI; `skill-scanner` audit before any community skill installs. Non-negotiable. See [09 — Defenses](../09-security/defenses.md).
- **Run a team-wide "how I use Claude Code" session.** Whoever on the team is most fluent walks through their actual workflow. Specs, agent mode, skills, memory, the security review pass. One hour. Recorded.
- **Update the PR template.** Add a checkbox: "AI-generated code, fully reviewed and understood." This is the explicit signal to reviewers that this PR needs the AI-aware review discipline.

### Days 31-60: discipline

Goals: the team has adopted the spec-first workflow for non-trivial work, code review has caught up to AI's failure modes, and the first custom skills are getting authored.

Concrete actions:

- **Adopt spec-driven development for anything non-trivial.** Anything bigger than a one-file change starts with a short markdown spec checked into the repo. See [spec-driven development](../05-workflows/spec-driven-development.md). The first month is awkward; the second month it's reflex.
- **Update the code review guidelines.** The existing checklist probably doesn't cover AI-specific issues. Add: do all imports/dependencies actually exist? Does this code follow our patterns or is it generic? Are there obvious security issues? **Does the author understand what they shipped?** That last one is controversial but it's load-bearing. See [review discipline](../03-effective-use/review-discipline.md).
- **Author the team's first custom skills.** Two or three. Pick patterns the agent has been getting wrong repeatedly: your error-handling wrapper, your test-naming convention, your API-contract style. Twenty minutes per skill; hours per week of compounded return. See [building your own skills](../06-skills/building-your-own.md).
- **Start the AI-vs-AI security review pass habit** for any PR touching auth, deserialization, or external input. Different session, ideally different model. See [defenses, Tier 2](../09-security/defenses.md).

### Days 61-90: institutionalize

Goals: the practices are habits, not initiatives. The team's metrics show the gains are real (not just self-reported). The lead has data to take to the next level of management.

Concrete actions:

- **Pick two metrics and start tracking.** Not lines of code. Probably a throughput metric (deploys per week, story points completed) and a quality metric (PR review cycle time, post-merge defects). See [measuring impact](./measuring-impact.md). Six weeks of data is enough to tell if the rollout worked.
- **Audit the custom-skill kit and prune.** Every quarter, look at which skills are actually firing and which aren't. Remove the ones the agent is no longer using. The kit should be living.
- **Address the alignment problem head-on.** Three months in, the team's individual throughput is up but team coordination is showing strain (more parallel work, more PR-stage misalignment). See [the alignment bottleneck](./alignment-bottleneck.md). Adopt at least one of the five practices on that page (the easiest is usually "plans as checked-in markdown artifacts").
- **Run a retrospective specifically on the rollout.** What's working? What's not? What practices should we drop because they were performative? What should we double down on?

By day 90, you'll know whether AI coding is working for your team and you'll have the data to defend that conclusion.

## Set clear boundaries

The rules I'd enforce on any team I led:

- **AI is not trusted on auth, crypto, or [security-critical code](../09-security/threat-landscape.md) without the structured pattern:** AI drafts, a human writes the security boundary, a separate-model review pass catches what the generation session missed. See [09 — Defenses](../09-security/defenses.md) for the pattern.
- **AI-generated code must be labeled in the PR.** A checkbox is enough. The reviewer needs to know to apply the AI-aware review discipline.
- **Any AI-suggested dependency must be verified before installation.** Slopsquatting is a real attack now. See [supply chain](../09-security/supply-chain.md).
- **Juniors run the [structured ramp](./junior-developers.md).** Pair without AI in month 1, autocomplete only in month 2, full toolkit in month 3 with skill gates between each.

You'll have different rules. The specifics matter less than the fact that they exist and are written down. The Wild West approach leads to the kind of incident that you only need to have once before you wish you'd had rules.

## When to escalate

Three classes of issue I'd escalate beyond the team:

1. **Security incidents involving AI-generated code.** Especially anything reaching customer data, payments, or auth. Loop in security and legal early. The "AI wrote it" defense doesn't exist; see [regulation](../09-security/regulation.md).
2. **Vendor-policy events that disrupt the team's tooling.** When Anthropic or OpenAI changes terms in a way that breaks workflows (it has happened), the team needs a runbook for migration. Don't absorb this quietly; it's an org-wide signal.
3. **Sustained throughput-without-quality patterns.** When the team's PR rate is up but post-merge defects are also up, that's not a team problem to solve in isolation. Escalate it as a measurement-and-platform problem.

Things to absorb without escalating:
- Individual incidents from AI hallucinations that didn't reach production. Fold into the next retro and update the AGENTS.md.
- Friction between engineers about tooling preferences within the standard. The team should have one tool; debate is fine, fragmentation isn't.
- Anyone insisting "AI doesn't help me." Not every engineer has the same gain profile. As long as they're meeting the team's quality bar, individual style differences are individual.

## What "good" looks like at three months

Five observable signs your rollout worked:

1. New PRs include the AI-generated checkbox more often than not. The team has internalized that AI use is normal and labeled, not hidden.
2. The team has at least 2-3 custom skills checked into the repo and being maintained.
3. The PR review cycle time is stable or down. Throughput hasn't been consumed by review burden.
4. At least one production incident has been caught in the security review pass before merge. (This means the pass is real, not performative.)
5. Junior engineers (if any) are progressing on the [skill-gate ramp](./junior-developers.md), not just shipping more code with hidden senior review burden.

If three months in you don't have any of these, the rollout isn't sticking. Don't double down on tools; back up to the discipline.

## Related reading

- [Junior developers](./junior-developers.md), the structured ramp this page assumes
- [Measuring impact](./measuring-impact.md), the metrics worth tracking
- [The alignment bottleneck](./alignment-bottleneck.md), the team coordination problem that surfaces at month three
- [Review discipline](../03-effective-use/review-discipline.md), the underlying review checklist
- [12 — Adoption / Org design + platform team](../12-adoption/org-design.md), the org-level framing of the same questions
