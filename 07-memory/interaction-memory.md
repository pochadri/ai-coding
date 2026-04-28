---
title: Interaction Memory Tools
summary: claude-mem, Mem0, Letta, Zep/Graphiti, Cognee, ByteRover, Cline Memory Bank, Basic Memory, third-party layers when vendor defaults aren't enough.
tags: [memory, claude-mem, mem0, letta, zep, graphiti, cognee, byterover, cline]
related:
  - ./what-is-memory.md
  - ./vendor-native.md
  - ./artifact-memory.md
  - ./practice-and-risks.md
last_updated: 2026-04-26
---

# Interaction Memory Tools

When the vendor-native defaults don't cut it, usually because you want transparency, cross-tool portability, KG-backed retrieval, or just a deeper episodic store, you reach for a third-party memory layer. There are roughly twenty-five of these now, with very different bets.

The ones worth knowing, by category. For *artifact* memory (code knowledge graphs like graphify and GitNexus) and for "what should I actually use," see the related pages at the end.

> ⚠️ Star counts and version numbers move weekly. Numbers below were verified in April 2026 and will drift.

---

## The architectural spectrum

Before the catalog, the spectrum these tools occupy. Simplest to most complex:

1. **Plain markdown journals**: Cline Memory Bank, Karpathy's LLM Wiki pattern, Basic Memory, gstack `context-save`/`context-restore`
2. **Markdown + version control**: ByteRover Context Tree, Letta Context Repositories
3. **Summarization + SQLite/FTS**: claude-mem's SQLite tier
4. **Vector DB / RAG-style memory**: LlamaIndex VectorMemoryBlock, Mem0 base
5. **Knowledge graph**: Anthropic's MCP memory server, Mem0g, Cognee, Graphiti
6. **Hybrid graph + vector + temporal**: Zep/Graphiti, Supermemory, claude-mem's SQLite + ChromaDB split
7. **Memory OS**: MemOS MemCube, Letta's "LLM as OS"

You don't need to memorize this, but knowing where each tool sits helps explain why they have such different feels in practice.

---

## The flagship: claude-mem

- **[github.com/thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** · ~67.8K stars · AGPL-3.0
- **Author:** thedotmack (Alex Mack); homepage [claude-mem.ai](https://claude-mem.ai)
- **Install:** `npx claude-mem install` or `/plugin install claude-mem` from inside Claude Code
- **What it does:** A Claude Code plugin (also Gemini CLI / OpenCode) that captures everything Claude does during your coding sessions, AI-compresses it (using Claude's agent-sdk), and injects relevant context into future sessions. Not user-facing chat memory — *agent telemetry compressed into recallable observations*.
- **Architecture:** 5 lifecycle hooks (`SessionStart`, `UserPromptSubmit`, `PostToolUse`, `Stop`, `SessionEnd`); a Bun-managed worker on `localhost:37777` with web viewer UI; dual-DB split (SQLite + FTS5 for full-text, ChromaDB for vector embeddings); compression pipeline turns raw tool-use events into "observations" then "summaries"; exposes a `mem-search` skill with progressive disclosure (search → timeline → get_observations) plus the same operations via MCP. ([architecture docs](https://docs.claude-mem.ai/architecture/overview))
- **Privacy:** `<private>` tags exclude content from storage; everything stored locally.
- **My take:** The reference implementation. If you use Claude Code seriously, install this. The progressive disclosure pattern (`search` returns IDs only, `get_observations` fetches full details only for filtered IDs) is the right way to handle the "memory could be huge" problem, it's the same insight that makes skills' progressive disclosure work.
- **Caveat:** AGPL-3.0, fine for personal/internal use; check with your legal before bundling into a commercial product.

---

## The agent-platform players

### Mem0
- **[github.com/mem0ai/mem0](https://github.com/mem0ai/mem0)** · [mem0.ai](https://mem0.ai)
- **What:** "Universal memory layer for AI Agents", drop-in API that wraps any LLM app.
- **Architecture:** Single-pass ADD-only LLM extraction; memories accumulate without overwrite; entity linking; multi-signal retrieval (semantic + BM25 + entity matching). A graph variant **Mem0g** builds a directed labeled KG alongside the vector store.
- **Claims:** 26% LLM-as-Judge improvement vs OpenAI memory baseline; 91% lower p95 latency; >90% token cost savings. ([paper, arXiv 2504.19413](https://arxiv.org/abs/2504.19413))
- **Vercel AI SDK integration** since V5 (August 2025).
- **Best for:** Building your own agent app where you want a hosted/managed memory tier without operational overhead.

### Letta + Letta Code
- **[github.com/letta-ai/letta](https://github.com/letta-ai/letta)** + **[letta-ai/letta-code](https://github.com/letta-ai/letta-code)** · [letta.com](https://letta.com)
- **What:** Platform for building stateful agents; absorbed the original MemGPT project. Frames the LLM as an OS managing its own memory, context, and reasoning loops.
- **Letta Code launched April 6, 2026**: a terminal coding agent built memory-first, with git-backed memory ("Context Repositories"), subagents, and model-agnostic identity (Claude, GPT, Gemini, GLM, Kimi). Claims #1 model-agnostic open-source on Terminal-Bench.
- **My take:** If you want a coding agent where memory is the *primary* concept rather than an addon, Letta Code is the bet. Imports past Claude Code / Codex sessions on `/init` so you don't have a cold-start problem. I've used it for two weeks; it's promising but the ergonomics are a step behind Claude Code.

### Zep + Graphiti
- **[Zep](https://www.getzep.com/)** (managed service) · **[Graphiti](https://github.com/getzep/graphiti)** (open-source core, Apache 2.0, Neo4j-backed)
- **What:** Temporal context graph engine. Async ingest of episodes (text or JSON) → entities/edges/temporal attributes. Hybrid retrieval (semantic + BM25 + graph traversal) with **no LLM at query time**.
- **Killer design choice:** Facts have **validity windows**. Old facts are *invalidated, not deleted*. Past statements remain queryable with their temporal context. This is the right answer to staleness, and other tools are copying it.
- **[Knowledge Graph MCP server](https://www.getzep.com/product/knowledge-graph-mcp/)**: exposes Graphiti to any MCP client.
- **My take:** If you're building serious memory infra and care about temporal correctness, Graphiti is the gold standard. Zep is the managed version if you don't want to run Neo4j.

### Cognee
- **[github.com/topoteretes/cognee](https://github.com/topoteretes/cognee)** · ~12K stars · Apache 2.0
- **What:** "Knowledge engine for AI agent memory in 6 lines of code." Graph + vector hybrid (LanceDB default; Qdrant/pgvector/Redis/DuckDB/Pinecone/ChromaDB supported).
- Used by Bayer, dltHub, others; >1M pipelines/month per their numbers.
- **Best for:** Building agent memory into a Python application without committing to a single vector or graph DB.

### MemOS
- **[github.com/MemTensor/MemOS](https://github.com/MemTensor/MemOS)** · paper [arXiv 2507.03724](https://huggingface.co/papers/2507.03724)
- **What:** "Memory operating system for LLMs", three-layer architecture (memory API / scheduling-management / storage-infrastructure) with **MemCube** abstraction unifying plaintext, activation, and parameter memories.
- More academic than production-ready in my experience, but the abstractions are interesting and may shape where the field goes. There's a separately-named **MemoryOS** at [github.com/BAI-LAB/MemoryOS](https://github.com/BAI-LAB/MemoryOS), different project, same year, easy to confuse.

---

## The lighter, markdown-first camp

These bet that "human-readable, version-controllable, transparent" beats "opaque vector DB" for coding-agent memory specifically. I lean toward this camp for personal use.

### Cline Memory Bank
- **[Cline docs](https://docs.cline.bot/features/memory-bank)**
- A project-root `memory-bank/` folder of six prescribed markdown files: `projectbrief.md`, `productContext.md`, `activeContext.md`, `systemPatterns.md`, `techContext.md`, `progress.md`. Pure markdown, no DB. Cline reads/writes them through normal file tools.
- **My take:** If you're a Cline user, this is the right starting point. The prescribed file structure is opinionated in the right way, you don't waste time deciding what to call things. Even if you don't use Cline, the file taxonomy is worth borrowing.

### ByteRover (formerly Cipher)
- **[github.com/campfirein/byterover-cli](https://github.com/campfirein/byterover-cli)** (`brv` CLI)
- "Portable memory layer for autonomous coding agents." Exposes git-style commands: `brv vc init/commit/push/pull`. Stores knowledge as Markdown in `.brv/context-tree/`, a hierarchical Context Tree with provenance and lifecycle metadata. Same LLM that reasons also curates/structures memory. ([blog](https://www.byterover.dev/blog/byterover-2-0))
- **Best for:** Teams that want git-flow semantics on their agent memory. The `vc` interface is genuinely clever.

### Basic Memory
- **[github.com/basicmachines-co/basic-memory](https://github.com/basicmachines-co/basic-memory)**
- Local-first; structured Markdown + wiki-links; integrates natively with Obsidian (same files). FastEmbed semantic + full-text hybrid search. MCP server exposes it to Claude Desktop, Cursor, Claude Code, etc.
- **Best for:** People who already live in Obsidian. Your second brain becomes the agent's first brain.

### The official Anthropic MCP memory server
- **[modelcontextprotocol/servers/tree/main/src/memory](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)**
- Reference implementation. Entities, relations, observations stored in a local `memory.json`. Knowledge-graph triples.
- **Best for:** Learning the pattern. Production needs more, but this is what you point at when explaining MCP-based memory to someone.

---

## The framework primitives

### LangChain memory
**Status: legacy.** `ConversationBufferMemory` and friends were deprecated in v0.3.1; slated for removal in 1.0.0. Replaced by **LangGraph checkpointing** (built-in persistence, multi-thread support, time travel). If you're maintaining LangChain code with old memory abstractions, see the [migration guide](https://python.langchain.com/docs/versions/migrating_memory/conversation_buffer_memory/).

### LlamaIndex memory
New `Memory` class with pluggable **MemoryBlock** modules: `StaticMemoryBlock`, `FactExtractionMemoryBlock`, `VectorMemoryBlock`. SQLite-backed for persistence across restarts. Each block has a priority for truncation. Short-term + long-term merged on retrieval within token limit. ([docs](https://developers.llamaindex.ai/python/framework/module_guides/deploying/agents/memory/))

### Vercel AI SDK
No built-in persistent memory. Integrates with **Mem0** (since V5, Aug 2025), **Letta** (official `letta-ai/vercel-ai-sdk-provider`), **Temporal** (durable execution), and the third-party "AI SDK Memory" tools at [ai-sdk-tools.dev/memory](https://ai-sdk-tools.dev/memory).

### Cloudflare Agent Memory
Managed service (Agents Week 2026), backed by Durable Objects, each memory profile gets its own SQLite-backed Durable Object for tenant isolation. Good infra-side play for multi-tenant agent apps. ([blog](https://blog.cloudflare.com/introducing-agent-memory/))

### Augment Code Context Engine
Proprietary "Context Engine" with persistent memory + 200K context tokens; markets itself on huge codebases (400k+ files). Three-layer model: AGENTS.md (team conventions) + agent memory (decision histories) + living spec. ([Context Engine](https://www.augmentcode.com/context-engine))

---

## Smaller / niche

Worth knowing they exist, less worth installing without a specific reason:

- **[Honcho](https://github.com/plastic-labs/honcho)**: "Memory library for building stateful agents" focused on social/peer memory (psychology facts about users). Not coding-specific.
- **[rohitg00/agentmemory](https://github.com/rohitg00/agentmemory)**: temporal memory; companion to graphify (same author maintains both).
- **Memorix**: shared persistent project memory with Git truth and reasoning via MCP (covers Cursor, Claude Code, Windsurf).
- **[Intina47/context-sync](https://github.com/Intina47/context-sync)**: local persistent memory MCP store across Continue.dev, Cursor, Claude Desktop, Copilot, Codex, Antigravity.
- **[Supermemory.ai](https://blog.supermemory.ai/best-memory-apis-stateful-ai-agents/)**: hosted "context infrastructure" with five layers (connectors / extractors / Super-RAG / memory graph / user profiles). Reports <300ms p99.

---

## Curated lists for further depth

If you want to go wider:

- **[TeleAI-UAGI/Awesome-Agent-Memory](https://github.com/TeleAI-UAGI/Awesome-Agent-Memory)**
- **[TsinghuaC3I/Awesome-Memory-for-Agents](https://github.com/TsinghuaC3I/Awesome-Memory-for-Agents)**
- **[topoteretes/awesome-ai-memory](https://github.com/topoteretes/awesome-ai-memory)**
- **[Shichun-Liu/Agent-Memory-Paper-List](https://github.com/Shichun-Liu/Agent-Memory-Paper-List)**: companion to the *Memory in the Age of AI Agents* survey ([arXiv 2512.13564](https://arxiv.org/abs/2512.13564))

## Related reading

- [What is memory](./what-is-memory.md), concept, taxonomy, why interaction vs artifact matters
- [Artifact memory (code knowledge graphs)](./artifact-memory.md), the complementary half
- [Practice and risks](./practice-and-risks.md), what I actually recommend running
