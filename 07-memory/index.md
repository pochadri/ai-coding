---
title: 07 — Memory
summary: Memory for AI coding agents, what it is, what's available, what to actually use, and how not to get poisoned.
---

# Memory

For most of 2025 I assumed memory was a chat-app feature. ChatGPT remembered I had a dog. Cute. Useless for coding. I was wrong about this in two ways.

First, I underestimated how often I was re-explaining things. Every new Claude Code session: "we use the `AppError` wrapper, not generic try/catch." Every new Cursor session: "tests live in `__tests__`, not next to the source file." Every fresh chat about the same architecture decision I'd already made twice. The cost of statelessness adds up.

Second, by the time I noticed, the field had moved. Anthropic shipped memory in claude.ai (Sep 2025 → free tier March 2026). The Claude API got a `/memories` tool and context editing. Claude Code got `/memory`. Copilot Memory hit GA in March 2026, on by default. Codex Memories landed at the OpenAI side. Cursor tried, killed, and replaced its Memories feature with Rules. Cognition's Windsurf has Cascade Memory. And underneath the vendors, an entire third-party ecosystem appeared: claude-mem, Mem0, Letta + Letta Code, Zep/Graphiti, Cognee, ByteRover, Cline Memory Bank, Basic Memory, plus knowledge-graph approaches like graphify and GitNexus that index the *codebase itself* as a queryable memory.

This folder is what I've learned navigating that. It's the bigger gap in the original guide and the one I've researched hardest.

## How to read this folder

Read in order if you're new to memory. Skip around if you're not.

1. **[What is memory](./what-is-memory.md)**: the concept, the four CoALA memory types, how memory differs from context / skills / RAG, and the central distinction this folder hangs on: *interaction memory* vs *artifact memory*
2. **[Vendor-native memory](./vendor-native.md)**: what Claude, Copilot, Codex, Cursor, and Windsurf give you out of the box (more than you might think)
3. **[Interaction memory tools](./interaction-memory.md)**: claude-mem, Mem0, Letta + Letta Code, Zep/Graphiti, Cognee, ByteRover, Cline Memory Bank, Basic Memory, when third-party layers earn their keep
4. **[Artifact memory (code knowledge graphs)](./artifact-memory.md)**: graphify, GitNexus, and why "store the codebase as a graph" is a different (and complementary) bet
5. **[Practice and risks](./practice-and-risks.md)**: the stack I actually run, the Karpathy LLM Wiki pattern, memory poisoning (it's a real and growing threat), staleness, privacy, the cold-start problem
6. **🧠 [Memory picker](./picker.md)**: answer 5 questions, get a recommended memory stack

## The one-line distinction that organizes everything else

| | What it stores | Examples |
|---|---|---|
| **Interaction memory** | What was *said and done* across past sessions | claude-mem, Mem0, Letta, Zep, Claude memory, Copilot Memory |
| **Artifact memory** | The structure of the *code itself* (calls, imports, dependencies) | graphify, GitNexus, code knowledge graphs |

Both layers matter. They solve different sub-problems. The complete picture is usually one of each. See [Practice and risks](./practice-and-risks.md) for the actual stacks I recommend.

## Where to go next

- The conceptual cousin → **[04 — Context engineering](../04-understanding-and-context/context-engineering.md)** (memory shapes future turns; context shapes the current one)
- What memory extends → **[05 — Agents](../05-workflows/agents.md)**
- Why the security pages here matter → **[08 — Security](../09-security/threat-landscape.md)**
- Memory's effect on legacy maintenance → **[08 — AI for maintenance](../08-quality/ai-for-maintenance.md)**
