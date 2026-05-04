---
title: Artifact Memory — Code Knowledge Graphs
summary: graphify, GitNexus, and the "store the codebase as a queryable graph" approach. The complementary half to interaction memory.
tags: [memory, knowledge-graph, graphify, gitnexus, code-graph, ast]
related:
  - ./what-is-memory.md
  - ./interaction-memory.md
  - ./practice-and-risks.md
  - ../04-understanding-and-context/understanding-problem.md
last_updated: 2026-04-26
---

# Artifact Memory (Code Knowledge Graphs)

For most of the AI-coding-tools era, "memory" has meant *what we said*, past conversations, decisions, preferences. That's [interaction memory](./interaction-memory.md), and it's important. But there's a different sub-problem these tools don't solve well: **the agent doesn't actually understand your codebase's structure**, even when the relevant files are in front of it.

You've felt this. The agent confidently proposes a change in module A that breaks an assumption in module C because nothing in A's file mentions C. It writes a refactor that misses three call sites because grep found four and the fifth is dynamic. It reasons about types as if they were the local definitions, not the inherited ones.

Artifact memory is the answer. Build a persistent, queryable representation of the *code itself*, its calls, imports, inheritance, dependencies and let the agent query it before reasoning. The two leading projects in this space have very different bets, but they share a key conviction: **vector-DB RAG over source files isn't enough. You need the structural ground truth.**

---

## graphify

- **[github.com/safishamsi/graphify](https://github.com/safishamsi/graphify)** · ~35K stars · MIT
- **Author:** Safi Shamsi (`safishamsi`); commercial site at graphifylabs.ai
- **Created:** April 2026 (very young; current version 0.5.0)
- **Install:** `uv tool install graphifyy && graphify install` (note: PyPI package is `graphifyy` with double-y due to namespace conflict). Then `/graphify .` inside Claude Code/Codex/Cursor/etc. `graphify hook install` adds a git post-commit hook for auto-rebuild.

### What it does
A cross-IDE "skill" (`/graphify`) that turns any folder of code, **docs, papers, images, audio, or video** into a queryable, persistent knowledge graph for AI coding assistants. Multi-modal is the headline differentiator, it's not just for code.

### How it works
Three-pass pipeline:
1. **Deterministic tree-sitter AST extraction** across 25 languages
2. **Local Whisper transcription** for audio/video
3. **Parallel Claude/LLM subagents** extract concepts and relations from docs, images, and transcripts

Results merge into a NetworkX graph clustered with **Leiden** (no embeddings/vector DB, graph topology is the similarity signal). Persisted as `graph.html` + `graph.json` + `GRAPH_REPORT.md`. Optionally exposed via an MCP stdio server (`python -m graphify.serve`).

### Notable design choices
- **Multi-modal ingestion**: code + research papers + screenshots + meeting recordings, all in one graph
- **Honesty-tagged edges**: every edge is `EXTRACTED` / `INFERRED` (with confidence) / `AMBIGUOUS`
- **No embeddings, no vector DB**: graph topology is the retrieval signal
- **SHA256 cache** for incremental rebuilds
- **`graphify-out/` is git-committable** for team sharing
- **PreToolUse hooks** to force-route the agent through the graph before grep/glob
- **71.5× token-reduction claim** vs raw-file reading

### Best for
Solo devs and small teams using AI coding assistants who want persistent, multi-modal context over a mixed corpus (code + research papers + screenshots + meeting recordings). Explicitly inspired by Karpathy's `/raw` folder workflow.

### Caveats
- PyPI namespace confusion — `graphify` on PyPI is unrelated; correct package is `graphifyy`
- LLM extraction passes cost tokens (cost.json tracking is local-only)
- Parallel-subagent execution requires platform-specific config (Codex needs `multi_agent = true`; Aider/OpenClaw fall back to sequential)
- Star/fork ratio relative to age is unusually high, some skepticism warranted

---

## GitNexus

- **[github.com/abhigyanpatwari/GitNexus](https://github.com/abhigyanpatwari/GitNexus)** · ~30K stars · PolyForm Noncommercial 1.0.0
- **Author:** Abhigyan Patwari; commercial entity Akon Labs
- **Install:** `npx gitnexus analyze` from repo root (indexes + installs skills + writes CLAUDE.md/AGENTS.md), then `npx gitnexus setup` to wire MCP into editors. Or browser-only via [gitnexus.vercel.app](https://gitnexus.vercel.app).

### What it does
Indexes any codebase into a code knowledge graph (calls, imports, inheritance, execution flows) and exposes it to AI agents via an MCP server, so Cursor / Claude Code / Codex don't miss dependencies.

Code-only and code-first, no multi-modal ingestion. The bet is depth, not breadth.

### How it works
A 12-phase ingestion DAG: Tree-sitter parse → symbol/call/import/inheritance extraction → Leiden clustering → optional embeddings. Builds an in-memory `KnowledgeGraph`, then persists it to **LadybugDB** (embedded graph DB with native vector support, formerly KuzuDB) under `.gitnexus/`.

Two delivery surfaces:
- **Node CLI + multi-repo MCP server** (stdio) for editors
- **Fully client-side web UI** (gitnexus.vercel.app) using Tree-sitter WASM, LadybugDB WASM, Sigma.js/WebGL rendering, in-browser HuggingFace transformers.js embeddings

Hybrid retrieval combines BM25 + semantic + Reciprocal Rank Fusion.

### Notable design choices
- **MCP-first with 16 tools**: `query`, `context`, `impact`, `detect_changes`, `rename`, `cypher`, plus group tools
- **Raw Cypher access** for power users
- **PreToolUse + PostToolUse hooks**: the latter detects stale index after commits
- **Zero-server browser mode** that needs no backend
- **Multi-repo global registry** under `~/.gitnexus/` so one MCP server serves all indexed repos (great for microservices)
- **Auto-generated repo-specific skills** per Leiden cluster

### Best for
Engineering teams on real-world TypeScript/Python/etc. monorepos that want their AI agent to do reliable impact analysis, refactors, and PR-review-style "blast radius" reasoning, including cross-repo / microservice graphs via `gitnexus group`.

### Caveats
- **License:** PolyForm Noncommercial 1.0.0, source-available, not OSI-open. Commercial use requires a paid license from Akon Labs.
- Browser mode capped at ~5K files by memory
- 300+ open issues
- README has an explicit disclaimer about scam crypto tokens trading on the name
- Tight coupling to LadybugDB (a relatively young KuzuDB rebrand)

---

## How they compare, and where they fit

| | graphify | GitNexus |
|---|---|---|
| Scope | Code + docs + papers + images + A/V | Code only |
| Language | Python | Node / TypeScript |
| License | MIT | PolyForm Noncommercial |
| Architecture | NetworkX + Leiden, no vectors | LadybugDB + hybrid (BM25 + semantic + RRF) |
| Killer feature | Multi-modal ingestion | Multi-repo, MCP-first, browser mode |
| Distribution | uv / pip | npx |
| Best for | Personal `/raw`-style context | Team monorepos and microservices |

They're direct competitors in the same niche but with different bets: graphify pitches itself as a personal `/raw`-folder tool that also handles code; GitNexus is code-only, MCP-native with deeper editor hooks, multi-repo aware, with a clear enterprise upsell.

Both **deliberately reject pure vector-DB RAG** for code retrieval. They treat AST + call graph as ground truth and use embeddings (if at all) only to augment retrieval. That conviction is the key thing they share with each other and don't share with most [interaction memory tools](./interaction-memory.md).

---

## Why this is a different sub-problem

The framing that organizes this whole folder ([what is memory](./what-is-memory.md#the-two-sub-problems-memory-solves)):

| | What it stores | Examples |
|---|---|---|
| **Interaction memory** | What was said and done across past sessions | claude-mem, Mem0, Letta, Zep, Claude memory |
| **Artifact memory** | The structure of the code itself | graphify, GitNexus |

A vector-DB conversational memory tool won't help you understand a 200K-LOC codebase's call graph. A code knowledge graph won't remember why you abandoned a particular library three months ago. **They solve different problems and you usually want both.**

graphify's author makes this explicit by maintaining a companion project, [agentmemory](https://github.com/rohitg00/agentmemory), for the temporal/interaction half and frames the two as complementary halves of "memory for coding agents." That's the right mental model.

---

## Other approaches in the same space

A few related projects worth knowing exist, even though graphify and GitNexus dominate the conversation right now:

- **Cursor's "codemaps"**: Cursor's internal code-graph representation, surfaced in some of their UI features. Closed, IDE-bound.
- **Sourcegraph Cody**: code intelligence layer with structural awareness, predates the AI-agent era and now overlaps with it.
- **Greptile, Aider's repo map, GitHub's symbol search**: adjacent. Less "persistent queryable memory," more "smart per-turn retrieval."
- **Anthropic's tree-sitter analyses inside Claude Code**: happens transparently when Claude reads code; not exposed as memory you can query.

The pattern that's genuinely new in 2026 is *making the structural representation **first-class, persistent, and queryable**, not a hidden retrieval optimization*. graphify and GitNexus are the two clearest examples; expect more.

---

## My take

I run **GitNexus on team monorepos** because the impact-analysis tool is genuinely useful for "what does this change break?" PR review work. I run **graphify** on a personal `/raw` folder where I dump research papers, screenshots, and meeting transcripts alongside code. They live happily side by side because they're solving different problems on different corpora.

Neither replaces interaction memory. The full stack I run is in [Practice and risks](./practice-and-risks.md).

## Related reading

- [What is memory](./what-is-memory.md), interaction-vs-artifact framing in context
- [Interaction memory tools](./interaction-memory.md), the complementary half
- [The understanding problem](../04-understanding-and-context/understanding-problem.md), why "AI sees what's there but not what's not" is the underlying disease artifact memory treats
