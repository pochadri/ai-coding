---
title: Practice and Risks
summary: My actual memory stack. The Karpathy LLM Wiki pattern. Memory poisoning (it's real and growing). Staleness. Privacy. Cold-start.
tags: [memory, practice, risks, prompt-injection, poisoning, staleness, karpathy]
related:
  - ./vendor-native.md
  - ./interaction-memory.md
  - ./artifact-memory.md
  - ../07-quality-and-security/threat-landscape.md
last_updated: 2026-04-26
---

# Practice and Risks

The decision tree, the actual stacks I use, the patterns worth borrowing, and then the security and quality concerns. The memory situation in April 2026 has a real underbelly that nobody's talking about loudly enough.

For the full picker logic, also see the interactive memory picker (linked at the end).

---

## What I actually run

My current stack, on most projects:

- **Vendor-native baseline**: Claude Code with `/memory` actively used and `~/.claude/CLAUDE.md` pruned monthly. Copilot Memory left on for the code-review surface. Codex `~/.codex/memories/` when I'm in Codex CLI.
- **Interaction memory: claude-mem**: installed as a Claude Code plugin. Compresses session telemetry, surfaces relevant observations into future sessions. Single biggest practical win for cross-session continuity. ~67K stars for a reason.
- **Artifact memory: GitNexus** on team monorepos for impact analysis on PRs. **graphify** on a personal `/raw` folder for mixed-content stuff (papers, screenshots, transcripts).
- **What I don't run:** Mem0 (I'm not building an agent app, it's the right tool for that job, not for daily coding). Letta Code (promising but ergonomics still trail Claude Code for me). Zep/Graphiti (overkill for personal use; the right call if I were building team memory infra). Cursor "Memory Bank" community workarounds (I use Claude Code, not Cursor, so I dodge the issue).

**Total active memory layers: 3 (vendor + interaction + artifact).** Same logic as skill bloat, more than that and you start fighting your own tooling.

---

## Recommended stacks per primary tool

### Claude Code user
```
Vendor: /memory + auto-memory (leave on; prune ~/.claude/CLAUDE.md monthly)
Interaction: claude-mem (the obvious choice)
Artifact: GitNexus (for code) and/or graphify (for mixed corpora)
```

### Cursor user
```
Vendor: Rules (since Memories was killed in 2.1.x)
Interaction: cursor-bank or vanzan01/cursor-memory-bank (community);
             OR an MCP-based memory like Memorix or Basic Memory
Artifact: GitNexus (works via MCP), or just lean on Cursor's codemaps
```

### Codex CLI user
```
Vendor: ~/.codex/memories/ + resume subcommand
Interaction: optionally OMX wrapper, or an MCP memory server
Artifact: graphify (Python-friendly) or GitNexus
```

### Copilot user (agentic surfaces)
```
Vendor: Copilot Memory (on by default since March 2026; the 28-day TTL handles staleness)
Interaction: usually nothing — Copilot Memory + AGENTS.md is enough for most workflows
Artifact: GitNexus if you do impact-heavy review work
```

### Multi-tool / portability matters
```
Vendor: leave each tool's native memory on
Interaction: an MCP-based memory like Basic Memory, ByteRover, or the official
             Anthropic MCP memory server, works in everything
Artifact: GitNexus (MCP-first by design)
```

---

## The Karpathy LLM Wiki pattern

Worth flagging on its own: in April 2026, Andrej Karpathy posted a [gist that moved practitioner sentiment hard](https://gamgee.ai/blogs/karpathy-llm-wiki-memory-pattern/), framing memory as a *compounding wiki* the agent builds and edits, rather than a retrieval index that re-reads source.

His critique of RAG: *"RAG rereads the same books for every exam, never actually learning the material."* The LLM Wiki pattern: agents write **synthesized, structured Markdown notes** during sessions, store them in version control (so humans can read/edit), and reference them next time. Notes evolve. The wiki *learns*.

It's deliberately low-tech. No vector DBs, no graph DBs, no hosted services. Just markdown + git + the agent's own writing. And it's becoming *the* default pattern people borrow when building custom memory layers.

**The minimal implementation:**
1. A directory (e.g. `.memory/` or `docs/learned/`) of markdown files
2. A skill or `CLAUDE.md` rule that says *"before answering, check `.memory/` for related notes; after answering, update or create notes if you learned something durable"*
3. Commit on every change

You can layer this on top of any vendor-native memory. Several projects ([Cline Memory Bank](https://docs.cline.bot/features/memory-bank), [ByteRover](https://github.com/campfirein/byterover-cli), [Basic Memory](https://github.com/basicmachines-co/basic-memory), Letta's "Context Repositories") are essentially polished, productized versions of the same idea.

---

## Risks

The part nobody's talking about loudly enough.

### Memory poisoning / prompt injection via memory

**This became a top-tier risk in 2026.** Memory creates a new attack surface that didn't exist when agents were stateless. Key incidents:

- **AI Recommendation Poisoning** (Microsoft Defender, Feb 2026), a 60-day URL-traffic review identified 50+ examples from 31 companies across 14 industries silently injecting hidden memory instructions into Copilot/ChatGPT/Claude/Perplexity/Grok during normal browsing. ([Microsoft Security blog](https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/))
- **MemoryGraft** (Dec 2025), implants fake "successful experiences" exploiting agent tendency to replicate past wins. The agent thinks it solved a similar problem this way last time, but "last time" was the attacker.
- **OWASP 2026 LLM Security Report**: prompt injection up 340% YoY; now the fastest-growing cyberattack category. Memory is the multiplier, one successful injection persists indefinitely. ([Swarm Signal recap](https://swarmsignal.net/ai-agent-security-2026/))

The mechanism is usually mundane: an attacker gets *normal-looking content* (a doc, a PR comment, a chunk of code, a webpage) into the agent's context once. The agent stores something based on it. Now every future session is influenced.

**Mitigations I follow:**
- **Inspect what your memory layer actually stored**: claude-mem's web UI on `localhost:37777`, Claude's Settings → Capabilities, Copilot Memory's settings page. If you can't read your memory, you can't audit it.
- **Prefer transparent over opaque memory**: Anthropic's "markdown the user can edit" design is the correct default; ChatGPT's opaque dossier is the cautionary one.
- **Treat memory writes from external content with suspicion**: if the agent is processing a fetched URL, a PR comment, or imported code, be more skeptical of what it learns from that session.
- **Use TTLs / validity windows**: Copilot Memory's 28-day TTL is good; Graphiti's "facts have validity windows, not deletes" is better; "memory accumulates forever" is the failure mode.
- **For team memory, treat it like privileged code**: PR review on changes, audit logs, the ability to wipe specific entries.

### Staleness — "memory without forgetting is as bad as no memory"

The other failure mode. Mitigations seen in production:

- **Temporal decay**: weight recent memories higher (Cognee, Mem0)
- **Validity windows**: facts are *invalidated, not deleted* (Graphiti, Zep), past statements remain queryable with their temporal context, which is the right answer
- **Hard TTL**: Copilot Memory's 28-day cap, with auto-validation against current codebase before applying
- **Versioned entity records** with timestamps

What you should not do: let memory accumulate forever with no expiration policy. I've watched teams' agent quality degrade over months because their memory grew faster than they pruned it.

### Privacy

Anthropic's design, markdown files the user can read, edit, wipe, is the correct default. Opaque memory (ChatGPT's "memory dossier") is the cautionary tale. claude-mem's `<private>` tags for content opt-out are another approach.

**Things to actually check** for any memory tool you're considering:
- **Where does memory live?** (Local file? Their server? Encrypted?)
- **Can you read what's stored?** (If not, that's a no.)
- **Can you delete specific entries, not just "wipe everything"?**
- **What happens at uninstall?**
- **For team / hosted services: where does the data physically live, and who has access?**

### Cold-start

New project / new user → memory is empty, so the memory layer adds latency and cost without value for the first N sessions. This is a real practical pain point — I've abandoned more than one memory tool that asked me to "wait a few weeks for it to learn you."

Letta Code addresses this by **importing past Claude Code / Codex sessions on `/init`**: turning your existing history into a starting memory. claude-mem similarly seeds from your current Claude Code state. Look for this feature when picking a tool — "imports from where I already was" is a meaningful quality-of-life improvement.

### The "just use better context files" debate

The static-context camp argues: better `CLAUDE.md` / `AGENTS.md` / Cursor Rules eliminates the need for memory; memory adds complexity and risk without proportionate gain.

The pro-memory camp argues: static files don't *learn*; they require human curation; they lag behind reality; they don't capture cross-session episodic knowledge.

The empirically-emerging compromise and what I personally do, is **layered persistence**: AGENTS.md for team conventions (static, manually curated), agent memory for decision histories (dynamic, learned), and a living spec for current state. Three layers, three different update cadences, three different failure modes.

If you're early-stage or solo and the static-context approach works, don't over-engineer. Add memory when you notice yourself re-explaining the same things.

---

## A short rule

**Most teams need three layers and only three:**

1. **Vendor-native memory**, on by default, with periodic pruning.
2. **One interaction memory tool** (claude-mem if Claude Code; an MCP-based memory if you need cross-tool portability).
3. **One artifact memory tool** (GitNexus for serious teams; graphify if you want multi-modal; nothing if you're solo on a small codebase).

If you're running more than three layers, audit. The cognitive load and conflict surface usually isn't worth it.

## Related reading

- [What is memory](./what-is-memory.md), the conceptual framing
- [Vendor-native memory](./vendor-native.md), the layer everyone has
- [Interaction memory tools](./interaction-memory.md), third-party episodic/semantic
- [Artifact memory](./artifact-memory.md), code knowledge graphs
- [🧠 Memory picker](./memory-picker.md), answer 5 questions, get a recommended stack
- [Security](../07-quality-and-security/threat-landscape.md), broader AI coding security context
