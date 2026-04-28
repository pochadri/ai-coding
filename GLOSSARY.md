# Glossary

Definitions of recurring terms used throughout the guide. Linked from first mention in each file.

---

### Agent
An AI tool that doesn't just suggest code but executes multi-step plans on your behalf, analyzing the codebase, editing files, running commands, and iterating until done. Examples: [Claude Code](./02-tools/claude-code.md), [OpenAI Codex](./02-tools/openai-codex.md), Cursor's agent mode. Contrast with **autocomplete**, where you accept or reject one suggestion at a time. See [Agents](./05-workflows/agents.md).

### Agent harness
The scaffolding around an AI agent: prompts, constraints, tool restrictions, and approval gates that shape what the agent can and can't do. Getting the harness right is becoming its own skill. See [Agents, controlling the agent](./05-workflows/agents.md#controlling-the-agent--the-harness-problem).

### `AGENTS.md` / `CLAUDE.md` / `.cursorrules`
Project-level instruction files that AI tools read at the start of every session. They encode conventions, architecture notes, and rules the AI can't infer from the code. See [Context engineering](./04-understanding-and-context/context-engineering.md).

### Agentic engineering
Term proposed by Andrej Karpathy in February 2026: humans stop writing code entirely and delegate to agents. Successor concept to [vibe coding](#vibe-coding).

### Composer / Composer 2
Cursor's in-house code-generation models. Composer 2 (March 2026) is built on Kimi K2.5 and scores 61.7 on Terminal-Bench 2.0. See [Cursor](./02-tools/cursor.md).

### Context engineering
The practice of curating what the AI sees so that it produces better output. The discipline that decides whether AI ships reliable code or generates expensive technical debt. See [Context engineering](./04-understanding-and-context/context-engineering.md).

### Context window
The amount of text (measured in tokens) an AI model can consider at once. Larger context windows let the model see more of your codebase but introduce the **lost in the middle** problem.

### DORA metrics
The four key delivery metrics tracked by the DevOps Research and Assessment program: deployment frequency, lead time, change failure rate, and mean time to recovery. Necessary but no longer sufficient for AI coding measurement. See [Measuring what matters](./10-team-and-process/measuring-impact.md) and the more comprehensive [DX Core 4](#dx-core-4) framework.

### DX Core 4
The 2025 productivity-measurement framework (Tacho & Noda + Forsgren / Storey / Zimmermann as advisors) that unifies DORA + SPACE + DevEx into 4 dimensions: **Speed, Effectiveness, Quality, Business Impact**. Specifically designed to incorporate AI tool impact. The starting point most engineering orgs should use in 2026. See [ROI and board narrative](./12-adoption/roi-and-board-narrative.md#beyond-dora).

### EARS (Easy Approach to Requirements Syntax)
A structured notation for writing unambiguous requirements, used by Amazon Kiro for [spec-driven development](./05-workflows/spec-driven-development.md).

### Hallucination (in AI coding)
When the model confidently invents something that doesn't exist, a package name, an API method, a function signature. Especially dangerous for dependencies because attackers register hallucinated package names as malware. See [Failure modes / Hallucinations](./03-effective-use/failure-modes.md#the-hallucination-problem).

### Lost in the middle
The phenomenon where information placed in the middle of a long context window gets ignored by LLMs. Affects long context files and large codebases.

### MCP (Model Context Protocol)
A protocol for connecting AI tools to external resources (servers, databases, APIs). Each connected MCP server adds tool definitions to the context window, useful but easy to overload. Mentioned in [Context engineering](./04-understanding-and-context/context-engineering.md). MCP has also become *the* dominant integration pattern for non-vendor [memory tools](./07-memory/), Anthropic, Graphiti, claude-mem, ByteRover, Basic Memory, Memorix, GitNexus all expose memory via MCP.

### Memory (in AI coding)
A *learned*, *persistent*, *evolving* store written by (or about) the agent itself, then surfaced into future contexts. Distinct from `CLAUDE.md`/`AGENTS.md` (always-on author-curated context) and from RAG (per-turn retrieval over a static corpus): **the write side is what makes it memory**. See the comprehensive treatment in [folder 07 — Memory](./07-memory/).

### Interaction memory vs. artifact memory
The dichotomy that organizes the memory ecosystem. **Interaction memory** stores what was *said and done* across past sessions, decisions, conversations, preferences (claude-mem, Mem0, Letta, Zep, Claude memory). **Artifact memory** stores the structure of the *code itself*, call graphs, imports, dependencies (graphify, GitNexus, code knowledge graphs). Both layers matter; they're complements, not competitors. See [What is memory](./07-memory/what-is-memory.md#the-two-sub-problems-memory-solves).

### CoALA (Cognitive Architectures for Language Agents)
The 2023 Princeton paper that gave the field its memory taxonomy: **working** (current decision cycle), **episodic** (past interactions), **semantic** (generalized facts), **procedural** (learned skills). Most memory tools target episodic + semantic. See [What is memory](./07-memory/what-is-memory.md#the-four-coala-memory-types).

### Memory poisoning
Persistent prompt injection via the agent's memory layer. An attacker gets normal-looking content into the agent's context once; the agent stores something based on it; every future session is influenced. Now a top-tier risk in 2026. See Microsoft's *AI Recommendation Poisoning* report and [Practice and risks](./07-memory/practice-and-risks.md#memory-poisoning--prompt-injection-via-memory).

### Repository intelligence
Term from Anthropic's 2026 Agentic Coding Trends Report: the AI's ability to understand not just code, but the relationships and intent behind it. AI can see what's there but can't see what's not there. See [The understanding problem](./04-understanding-and-context/understanding-problem.md#the-repository-intelligence-problem).

### Skill (in AI coding) / `SKILL.md`
A packaged prompt + workflow + instruction set that teaches an AI tool how to do a specific task. Format: a folder with `SKILL.md` (YAML frontmatter — `name`, `description`, plus Markdown body) and optional `scripts/`, `references/`, `assets/` subdirectories. Loaded via **progressive disclosure**: name+description always in the system prompt (~100 tokens), full body only when triggered, references only when linked. The format is an [open standard](https://agentskills.io/specification) supported across Claude Code, Cursor, Codex, Gemini CLI, and others. Distributed via skill libraries (gstack, Superpowers, vendor skills from MongoDB/Supabase/Vercel/etc.) or built in-house. See the comprehensive treatment in [folder 06 — Skills](./06-skills/).

### Skill bloat
Installing too many skills. Past 8–10 mixed skills, agents start second-guessing, adding verbose preamble, and surfacing instruction conflicts. Most experienced practitioners settle on 3 or fewer active skills. See [Quality and anti-patterns / Skill bloat](./06-skills/quality-and-anti-patterns.md#skill-bloat).

### Spec-driven development
Workflow where you write a detailed specification first (requirements, constraints, acceptance criteria) and hand it to an agent to implement. The spec becomes the source of truth. See [Spec-driven development](./05-workflows/spec-driven-development.md).

### Vibe coding
Term coined by Andrej Karpathy in early 2025 (Collins Dictionary Word of the Year 2025): accepting AI suggestions because they "look right" without fully understanding them. The Atlassian survey found 59% of developers have shipped code they didn't fully understand. See [Failure modes / Vibe coding](./03-effective-use/failure-modes.md#vibe-coding).

### AI coding maturity model
The opinionated 6-level model in this guide (Levels 0–5: Unmanaged → Sanctioned → Operational → Platformed → Compounding → Native) for org-level AI coding adoption. Synthesizes across Gartner / Deloitte / BCG / A16z while explicitly addressing engineering practice, security integration, junior pipeline, and multi-tool reality. See [Maturity model](./12-adoption/maturity-model.md) and the [interactive assessment](./12-adoption/assessment.md).

### AI Gateway
A centralized proxy through which all LLM requests route, providing auth, cost tracking, retention policy enforcement, and audit trail in one place. The Cloudflare-published pattern is the cleanest reference. The single most important platform-team-owned component past Level 2. See [Org design](./12-adoption/org-design.md).

### AI champions network
The Citi-pioneered model: 5–10% of an engineering org as designated champions with explicit time allocation (30–60 min/week), 1 lead per 10–20 champions. Bridges between the platform team and individual product teams. See [Org design](./12-adoption/org-design.md#the-ai-champions-network).

### Acceptable Use Policy (AUP), for AI coding
A short policy (one page works) covering approved tools, prohibited data classes, required workflow, audit obligations, and incident response, operationalizing a [STRIDE-style threat model for AI in the SDLC](./12-adoption/risk-governance-policy.md#the-threat-model--ai-in-the-sdlc-stride-style). See [AUP template](./12-adoption/templates/aup.md).

### Shadow AI
The use of AI tools (often on personal accounts) outside the org's sanctioned set. Per Netskope 2025: 47% of GenAI users access tools through personal, unmonitored accounts. Per IBM 2025: shadow-AI-related breaches cost +$650K and 1 in 5 orgs has had one. See [Risk, governance, policy / Shadow AI](./12-adoption/risk-governance-policy.md#shadow-ai).
