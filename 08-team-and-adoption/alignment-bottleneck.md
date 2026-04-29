---
title: The Alignment Bottleneck
summary: Implementation isn't the bottleneck anymore. Alignment is. Why pull requests, Slack, and Jira are failing as coordination tools for agent-driven work, and what to do today even before the next-gen collaboration tools land.
tags: [team, alignment, collaboration, agents, ace, github-labs, multi-agent]
related:
  - ./for-team-leads.md
  - ./measuring-impact.md
  - ../05-workflows/agents.md
  - ../09-frontier/whats-coming.md
  - ../08-team-and-adoption/maturity-model.md
last_updated: 2026-04-27
---

# The Alignment Bottleneck

There's a thesis from GitHub's Labs team that I've been sitting with, and I think it's the most important reframe I've heard this year. The short version, in their words: *one developer, two dozen agents, zero alignment*.

The argument is that scaling individual developer productivity by giving each engineer more agents was the easy part. We did that, mostly successfully. The hard part, the part that's now the actual bottleneck on shipping good software, is **team alignment** — agreement on *what* and *why* to build, not just *how*. And our existing tools (pull requests, Slack, Jira, the PR-driven workflow itself) were built for a world where implementation was slow enough to leave room for alignment. Implementation isn't slow anymore.

I think they're right.

## What changed

The classic development workflow had three phases that mapped to natural alignment checkpoints:

1. **Plan.** Slow enough that disagreements surfaced before code was written.
2. **Build.** Slow enough that mid-flight check-ins were necessary anyway.
3. **Review.** Pull requests as a meaningful gate.

Agents collapsed phases 1-3 into one fast loop. The plan phase shrunk because plans became prompts. The build phase shrunk because agents type faster than humans. The review phase didn't shrink, but it now happens *after* the work is done, with code already written, against context the reviewer doesn't share.

The pull request stopped being a midpoint and became the *first shared checkpoint*. By the time the team sees the work, it's been built. The opportunities to disagree before implementation are gone. And because most agents run in private, local "plan" modes, no teammate sees the planning happen either. The plan is in one developer's head and one agent's session, and the next time anyone else encounters it is when the PR opens and there's already a diff to review.

This is structurally bad. The parts of the work that benefit most from team input (which feature, why now, what trade-offs, what's the right shape) have been pushed to the latest possible moment, when changing them costs the most.

## Why current tools don't fix it

Three tools we keep reaching for and why each one falls short for agent-driven workflows:

**Pull requests.** Built when PRs were the *late* checkpoint, not the *first* one. PR review cadence assumes a meaningful planning phase happened upstream. When upstream is one engineer prompting an agent, the PR is the planning phase, the build phase, and the review phase compressed into a code-first artifact. Reviewers see implementation choices, not the alternatives that were considered and rejected.

**Slack and chat tools.** Optimized for ephemeral coordination. They were not built to host the durable artifacts (plans, decisions, rationale) that agent-driven work generates at high velocity. The plan in a Slack DM evaporates the next day; the agent's session log lives only on the developer's machine.

**Jira and ticketing systems.** Sized for tasks that take days, not minutes. The granularity mismatch means most agent-generated work either doesn't get a ticket at all or generates dozens of tickets nobody reads. Either way, the system stops being a coordination layer.

The deeper issue is that the critical context for alignment isn't in any of these tools. **It's in people's heads.** Business goals, product vision, organizational history, why-we-don't-do-X, political dynamics with the partner team upstream, the customer call from last Tuesday that changed priorities. Agents cannot autonomously discover any of this. And if a teammate doesn't volunteer it before the agent starts coding, it doesn't enter the work.

## What "good" might look like

GitHub's Labs team has a research prototype called **ACE (Agent Collaboration Environment)** that's the most concrete proposal I've seen for what an alignment-first agent tool looks like. The features that matter conceptually, regardless of whether ACE itself ships:

- **Multiplayer chat sessions** as the unit of work. A session is shared from the start, not a private session that becomes a PR later. Teammates *and* agents are in the same room.
- **Workspaces backed by isolated cloud microVMs** on separate git branches, so the parallel-experimentation pattern (try three approaches, see which lands) is supported by the tool rather than fought against.
- **Shared prompt history.** The agent's context window is visible to the team. Teammates can see *what was asked* and *what was answered*, not just the resulting code.
- **Live terminal and preview** that everyone can see in real time. The thing being built is visible while it's being built, not after.
- **Integrated version control.** Agents commit, PRs are created, but the PR is a downstream artifact of the session, not the primary collaboration surface.
- **Inclusivity for non-developer roles.** PMs, designers, support engineers can be in the same session — they have context that engineers don't, and the alignment-first thesis demands they're present before code, not after.
- **Session summaries and team activity dashboards** so the rapid pace of agent work doesn't outrun the team's ability to track it.

I haven't used ACE yet. The conceptual framing is what I think is right; whether ACE specifically becomes the dominant implementation is a separate question. The pattern is the bet, not the product.

## What teams can do today

ACE-class tools will take a year or more to mature into anything you can roll out. In the meantime, here are five practices that close part of the alignment gap with the tools you already have. Each is low-overhead enough to adopt this week.

### 1. Make the plan a checked-in artifact, not a chat message

Before the agent writes code, write a short plan as a markdown file in the repo (or a ticket, or a Notion page — the medium matters less than its persistence and visibility). Even 100 words. This is what the team can comment on *before* the diff exists, and it's the first place to look for the "wait, why are we doing this?" conversation.

I write these as `plan-<feature>.md` in a `plans/` directory and PR them separately from the implementation. The plan PR usually merges in a day; the implementation PR follows when the plan is settled. This trades a small amount of process for a much larger reduction in late-stage rework.

### 2. Run shared "plan mode" sessions, not solo ones

Most agent harnesses (Claude Code, Cursor, etc.) have a planning step before they start writing code. Most engineers run that step alone. **Bring a teammate in for the planning step on anything non-trivial.** A 15-minute screen-share where two people review the agent's plan before code is generated catches more misalignment than a 1-hour PR review afterwards.

This is the lightest-weight version of multiplayer agent sessions. It works on the tools you already have today.

### 3. Treat AGENTS.md / CLAUDE.md as a team alignment artifact

A team's [AGENTS.md](../08-team-and-adoption/templates/agents-md-org-template.md) is the closest thing most teams have to a checked-in "what we agreed about how to build software here" document. Most teams treat it as configuration. Treat it instead as the durable home for shared decisions: not just "use this error wrapper" but "we ship features in this shape, behind feature flags, with this observability baseline, after passing this review checklist." Update it when decisions change. Review it quarterly.

This is the closest thing to durable agent-readable team context. The fact that the agent can read it is a nice side effect; the primary purpose is making the alignment explicit and visible.

### 4. Make agent sessions linkable, not local-only

If your harness lets you export or share a session log, do it. Paste the relevant slice into the PR description. The plan, the prompts, the agent's reasoning — all of that is currently locked on the prompter's machine, and it's exactly the context the reviewer needs. Even a copy-paste of "here's what I asked, here's what it did, here's what I changed" is better than the default of "I asked an agent to do this, judge the diff."

This is how you turn a single-player session into something the team can actually evaluate.

### 5. Cap parallel agent work and surface what's in flight

Two dozen agents per developer is the headline. The real-world version is closer to three to five concurrent agent tasks per engineer, but the coordination problem still bites. A simple kanban (a `board.md` in the repo, a Linear column, a Notion table — anything visible to the team) listing every in-flight agent task surfaces parallelism that would otherwise produce duplicate or conflicting work. I do this manually; it takes 30 seconds per task and saves much more in avoided collisions.

When a teammate is about to start a task, they should see what's already in flight. That's the alignment moment that PRs are too late for.

## The deeper claim, and whether I buy it

GitHub Labs makes a stronger claim that I'm still chewing on: that as code production gets faster and cheaper, **quality and craftsmanship become the differentiators**, but quality and craftsmanship require time, energy, and team alignment. The implication is that teams which optimize for shipping more should expect to ship more mediocre work; teams that use the freed-up time to align more deeply should expect to ship fewer, better products.

I think the directional claim is right. I'm less sure about the strong form (that there's a single optimum tilted toward fewer, higher-quality features). The honest version is: the *option* to invest the freed-up time in alignment, research, and craftsmanship now exists. Whether your team takes that option or uses it to ship 2x as many mediocre features is a deliberate decision, and it's a decision that should be made consciously, not by default. Most defaults today push toward the latter.

The teams I've seen do this well treat alignment as a *practice*, not a tool. They have the conversation about what to build before the agents start. They write the plan down. They make the agent's session visible to the team. They treat the freed time as theirs to spend, not as a productivity dividend to extract.

## Related reading

- [For team leads](./for-team-leads.md), the team-process baseline these practices fit into
- [Measuring impact](./measuring-impact.md), why "lines of code generated" is the wrong metric and what to measure instead
- [Agents](../05-workflows/agents.md), the underlying workflow shift these practices respond to
- [Spec-driven development](../05-workflows/spec-driven-development.md), the spec is one of the better alignment artifacts available today
- [What's coming next](../09-frontier/whats-coming.md), the broader context for collaborative-agent tooling
- [Maturity model](../08-team-and-adoption/maturity-model.md), where collaborative-agent capability shows up in the org-level model
