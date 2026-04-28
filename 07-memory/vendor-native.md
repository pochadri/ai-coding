---
title: Vendor-Native Memory
summary: What Claude, Copilot, Codex, Cursor, and Windsurf give you out of the box. The mainstream defaults, usually enough.
tags: [memory, claude, copilot, codex, cursor, windsurf, vendor]
related:
  - ./what-is-memory.md
  - ./interaction-memory.md
  - ../02-tools/claude-code.md
  - ../02-tools/cursor.md
last_updated: 2026-04-26
---

# Vendor-Native Memory

If you're new to memory, start here. Every major AI coding tool now ships some form of native memory, and for most workflows that's enough, third-party layers (covered on the next page) are for specific gaps the vendor defaults don't fill.

What changed in the last six months: memory went from "Claude.ai-only chat feature" to a first-class concept across the entire vendor stack. Not every implementation is good. But the defaults are no longer "stateless agents."

---

## Anthropic, three different surfaces

Anthropic confused everyone (including me, at first) by shipping memory in three places at the same time, all called "memory."

### 1. claude.ai chat memory
The user-facing one. Rolled out Sep 2025 (Team/Enterprise) → Oct 2025 (Pro/Max) → **March 2, 2026 free tier** ([MacRumors](https://www.macrumors.com/2026/03/02/anthropic-memory-import-tool/)).

Stored as **human-readable markdown** the user can view, edit, and wipe in Settings → Capabilities. Auto-summarized; not raw transcripts. Per-project scoping. This design choice, markdown the user owns, is increasingly cited as the *correct* default vs OpenAI's opaque memory. Simon Willison wrote [a sharp critique of the ChatGPT version](https://simonwillison.net/2025/May/21/chatgpt-new-memory/) and is more positive on Claude's approach.

Mostly relevant for chat use, less for coding. But the design pattern (human-readable, editable, transparent) is the one worth copying.

### 2. The `/memories` API tool + context editing
The API one. Claude API beta exposes a `/memories` directory tool: Claude can create, read, update, delete memory files between sessions. **Client-side storage**: you control where it lives. Pairs with **context editing**: when nearing the context limit, the API auto-clears stale tool results and Claude offloads important state to `/memories`. Available on Claude API, Bedrock, Vertex AI. ([memory tool docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool), [context management announcement](https://www.anthropic.com/news/context-management))

This is what you build on if you're writing your own agent. The combination, context editing + a place to put what you're paging out, is the architectural primitive most third-party memory tools wrap.

### 3. Claude Code `/memory`
The agent-CLI one. The `/memory` command in Claude Code edits `CLAUDE.md` files at four levels (project / user / local / managed-policy), with hierarchical loading walking up from cwd. Subdirectory `CLAUDE.md`s load on-demand. Hard limits: 200 lines / 25KB per index file.

As of March 2026 also includes **auto-memory**: Claude can write learned facts to a persistent memory file across sessions without you asking. ([Claude Code memory docs](https://code.claude.com/docs/en/memory))

This is the one most coding-agent users are actually touching every day, even if they don't realize it. Worth opening `~/.claude/CLAUDE.md` periodically and pruning what's accumulated, auto-memory drifts toward noise if you never look at it.

---

## GitHub Copilot Memory

Public preview Jan 15, 2026. **On by default for Pro/Pro+ March 4, 2026** ([changelog](https://github.blog/changelog/2026-03-04-copilot-memory-now-on-by-default-for-pro-and-pro-users-in-public-preview/)).

Currently used by Copilot's **agentic surfaces** (cloud agent, CLI, code review), not editor inline completions. Repo-scoped only. **Auto-deleted after 28 days** to avoid stale memory accumulating, which I think is the right call. Validates memories against current codebase before applying.

GitHub published a [solid engineering blog](https://github.blog/ai-and-ml/github-copilot/building-an-agentic-memory-system-for-github-copilot/) on how it's architected, rare for a major vendor and worth reading if you're curious about the implementation details.

What I've noticed: Copilot Memory is *quietly* good for code review. The "review gets less noisy over time" promise has actually held up in my use, patterns I always flag stop appearing in suggested changes after a few weeks.

---

## OpenAI Codex Memories

`~/.codex/memories/`, summaries, durable entries, recent inputs, supporting evidence. The `resume` subcommand reopens earlier threads with the same repo state. ([Codex Memories docs](https://developers.openai.com/codex/memories))

A community wrapper called "Oh My Codex (OMX)" adds `.omx/project-memory.json` and a priority notepad on top, useful if you want more control.

I haven't used Codex Memories enough to have strong opinions, but architecturally it's the closest of the vendor defaults to the Claude API memory tool: explicit, file-based, you can see what's stored.

---

## Cursor, the missing one

Cursor introduced "Memories" in mid-2025 to store project-level facts. **Removed in v2.1.x (late 2025).** Users were told to export memories and convert them into **Rules** (`.cursorrules` / project-level rules). Rules are now Cursor's only built-in persistence.

This is honestly a regression in my view. Rules are static, author-curated context, they're not memory. But the official line is that Rules + improved long-context handling is the right shape. ([forum thread](https://forum.cursor.com/t/persistent-ai-memory-for-cursor/145660))

If you're a Cursor user and want real memory: install one of the third-party "Cursor Memory Bank" projects ([tacticlaunch/cursor-bank](https://github.com/tacticlaunch/cursor-bank), [vanzan01/cursor-memory-bank](https://github.com/vanzan01/cursor-memory-bank)) or wire up an MCP-based memory tool, covered on the next page.

---

## Windsurf Cascade Memory

Cognition AI (post-Dec 2025 acquisition). **Cascade Memory** is autonomously generated between conversations; learns coding style, patterns, APIs. ([Cascade docs](https://docs.windsurf.com/windsurf/cascade/cascade))

Less transparent than Claude's approach (you can't easily inspect or edit what was learned), but works well enough out of the box for the Windsurf userbase that uses it. If you're already invested in Windsurf, leave it on; if you're tool-shopping, this isn't reason enough to switch.

---

## ChatGPT Memory (for comparison only)

Not a coding-agent feature, but the design choices have influenced the broader ecosystem.

April 2025: ChatGPT can reference *all* past conversations (not just explicit "remember this"). Two mechanisms: explicit "saved memories" and implicit "chat history references." Free-tier rollout June 3, 2025. ([OpenAI Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq))

The opacity is the problem. You can't read what ChatGPT thinks it knows about you in the way you can with Claude or Copilot. Willison's "[I really don't like ChatGPT's new memory dossier](https://simonwillison.net/2025/May/21/chatgpt-new-memory/)" remains the canonical take.

---

## What I'd actually do (vendor-native only)

If you're not ready to add third-party memory tools, here's the minimum viable setup:

- **Primary tool: Claude Code.** Use `/memory` actively. Open `~/.claude/CLAUDE.md` monthly and prune.
- **Primary tool: Cursor.** Migrate your old Memories to Rules. Accept that "real" memory needs a third-party layer.
- **Primary tool: Codex CLI.** Lean on `~/.codex/memories/` and `resume`. It's quietly the best vendor-native experience for episodic continuity.
- **Primary tool: Copilot for code review.** Leave Copilot Memory on. The 28-day TTL handles staleness for you.

For most workflows, vendor-native is genuinely enough, you reach for third-party memory when the vendor default's gap matches what you need (transparency, cross-tool portability, KG-backed retrieval, multi-modal ingest, etc.).

## Related reading

- [What is memory](./what-is-memory.md), the conceptual framing
- [Interaction memory tools](./interaction-memory.md), when to add a third-party layer
- [Practice and risks](./practice-and-risks.md), recommended stacks per IDE
