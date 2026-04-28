# What I've Learned About AI Coding Tools

*A practitioner's guide. April 2026, after two years of daily use.*

This guide is opinionated. It says which tools are worth paying for, where AI helps, where it hurts, and where the marketing lies. It's organized into 12 folders so you can read just the parts you need.

> 🚀 **In a hurry?** Read [QUICKSTART.md](./QUICKSTART.md) — five minutes, three things to do tomorrow.
>
> 📋 **Want copy-pasteable prompts?** [PROMPTS.md](./PROMPTS.md) — the prompts I actually use, grouped by task.

---

## How to read this guide

Pick a path that matches what you're trying to do:

### 🆕 I'm new to AI coding tools

Start with the foundations, then the use-case framework.

1. [Why this guide exists](./01-foundations/why-this-guide.md)
2. [The state of the industry](./01-foundations/state-of-industry.md)
3. [Where AI helps (and where it doesn't)](./03-effective-use/where-ai-helps.md)
4. [Failure modes nobody talks about](./03-effective-use/failure-modes.md)
5. [Recommended setup](./02-tools/recommended-setup.md)

### 🛠 I'm picking a tool

Skim foundations, then go deep on tools.

1. [The state of the industry](./01-foundations/state-of-industry.md)
2. [Tools overview](./02-tools/) (comparison table at the top)
3. [Cursor](./02-tools/cursor.md), [Claude Code](./02-tools/claude-code.md), [Copilot](./02-tools/github-copilot.md)
4. [Recommended setup](./02-tools/recommended-setup.md)
5. [Recent updates (April 2026)](./11-frontier/recent-updates-april-2026.md)

### 📈 I want to use AI better (already familiar)

Skip foundations. Go straight to practice.

1. [Where AI helps](./03-effective-use/where-ai-helps.md)
2. [Prompting patterns that work](./03-effective-use/prompting-patterns.md)
3. [Context engineering](./04-understanding-and-context/context-engineering.md)
4. [Spec-driven development](./05-workflows/spec-driven-development.md)
5. [Skills, comprehensive deep-dive](./06-skills/) (start with [What are skills](./06-skills/what-are-skills.md))
6. [Review discipline](./03-effective-use/review-discipline.md)

### 🧩 I want to learn about AI coding skills

The full deep-dive on the skills ecosystem.

1. [What are skills](./06-skills/what-are-skills.md): format, open standard, neighbors, discovery
2. [Ecosystem landscape](./06-skills/ecosystem-landscape.md): gstack, Superpowers, vendor skills, security skills
3. [Choosing skills](./06-skills/choosing-skills.md): by project type, stage, team, risk
4. [Building your own](./06-skills/building-your-own.md): anatomy of a good SKILL.md
5. [Quality and anti-patterns](./06-skills/quality-and-anti-patterns.md): what to avoid, security

### 🧠 I want to learn about memory for AI coding

What's available, what to actually use, and how not to get poisoned.

1. [What is memory](./07-memory/what-is-memory.md): concept, CoALA taxonomy, interaction vs artifact memory
2. [Vendor-native memory](./07-memory/vendor-native.md): Claude, Copilot, Codex, Cursor, Windsurf
3. [Interaction memory tools](./07-memory/interaction-memory.md): claude-mem, Mem0, Letta, Zep, Cognee, more
4. [Artifact memory (code KGs)](./07-memory/artifact-memory.md): graphify, GitNexus
5. [Practice and risks](./07-memory/practice-and-risks.md): recommended stacks, memory poisoning, staleness
6. 🧠 [Memory picker](./07-memory/picker.md): answer 5 questions, get a stack *(site only)*

### 🔐 I'm worried about security

The folder I most want you to read.

1. [Folder overview](./09-security/): the case for treating security as its own concern
2. [The threat landscape](./09-security/threat-landscape.md): what goes wrong, why AI is bad at security, the research
3. [Defenses](./09-security/defenses.md): what I do; what to scan; what never to AI-generate
4. [Supply chain & prompt injection](./09-security/supply-chain.md): slopsquatting, malicious skills, prompt injection
5. [Regulation & policy](./09-security/regulation.md): EU AI Act, FTC, sector regimes
6. Cross-references: [Quality (08)](./08-quality/), [Risk, governance, policy (12)](./12-adoption/risk-governance-policy.md)

### 👥 I lead a team

Focus on policy, security, and measurement.

1. [Measuring what matters](./10-team-and-process/measuring-impact.md)
2. [For team leads](./10-team-and-process/for-team-leads.md)
3. [Junior developers](./10-team-and-process/junior-developers.md)
4. [Security, full folder](./09-security/) (start with [The threat landscape](./09-security/threat-landscape.md) and [Defenses](./09-security/defenses.md))
5. [Review discipline](./03-effective-use/review-discipline.md)
6. [Technical excellence](./08-quality/technical-excellence.md)

### 🔬 I want the research

Studies, papers, and what's being investigated.

1. [The research landscape](./01-foundations/research-landscape.md): productivity studies
2. [The research frontier](./11-frontier/research-frontier.md): RAG, context, multi-agent
3. [Recent updates](./11-frontier/recent-updates-april-2026.md)
4. [REFERENCES.md](./REFERENCES.md): every cited study and paper, with links

### 🏢 I'm rolling AI coding out across an org

When the practitioner content needs to become a rollout: maturity, governance, ROI, org design, the 90-day plan. That's folder 12. It assumes the underlying ideas from the rest of the guide.

1. [Adoption overview](./12-adoption/), the 5-minute TL;DR of the whole rollout problem
2. [AI coding maturity model](./12-adoption/maturity-model.md), Level 0-5, where you sit, what's next
3. [Risk, governance, policy](./12-adoption/risk-governance-policy.md), STRIDE threat model, EU AI Act/FTC mapping, AUP template
4. [ROI and the case for investment](./12-adoption/roi-and-board-narrative.md), DORA + AI metrics, TCO modeling, productivity-paradox framing
5. [Org design + platform team](./12-adoption/org-design.md), platform team scope, AI champions, hiring/leveling
6. [The 90-day roadmap](./12-adoption/90-day-roadmap.md), concrete plans by maturity level
7. [Case studies](./12-adoption/case-studies.md), what worked and what didn't at peer companies
8. 📊 [Maturity assessment](./12-adoption/assessment.md), 10 questions, get your level plus actions *(site only)*

---

## Full table of contents

### Start here
- 🚀 [Quick start](./QUICKSTART.md): the 5-minute version, three things to do tomorrow
- 📋 [Prompt library](./PROMPTS.md): copy-pasteable prompts grouped by task

### [01 — Foundations](./01-foundations/)
- [Why I wrote this](./01-foundations/why-this-guide.md)
- [The state of the industry](./01-foundations/state-of-industry.md)
- [The research landscape](./01-foundations/research-landscape.md)
- [My personal experience](./01-foundations/my-experience.md)

### [02 — Tools](./02-tools/)
- [GitHub Copilot](./02-tools/github-copilot.md)
- [Cursor](./02-tools/cursor.md)
- [Claude Code](./02-tools/claude-code.md)
- [OpenAI Codex](./02-tools/openai-codex.md)
- [Other tools](./02-tools/other-tools.md)
- [Recommended setup](./02-tools/recommended-setup.md)

### [03 — Effective Use](./03-effective-use/)
- [Where AI helps (and where it doesn't)](./03-effective-use/where-ai-helps.md)
- [Prompting patterns that work](./03-effective-use/prompting-patterns.md)
- [Review discipline](./03-effective-use/review-discipline.md)
- [Language and framework effectiveness](./03-effective-use/language-effectiveness.md)
- [Failure modes](./03-effective-use/failure-modes.md)

### [04 — Understanding & Context](./04-understanding-and-context/)
- [The understanding problem](./04-understanding-and-context/understanding-problem.md)
- [Context engineering](./04-understanding-and-context/context-engineering.md)

### [05 — Workflows](./05-workflows/)
- [Spec-driven development](./05-workflows/spec-driven-development.md)
- [Agents](./05-workflows/agents.md)
- [Skills ecosystem (overview)](./05-workflows/skills-ecosystem.md). For the deep-dive, see folder **06 — Skills**.

### [06 — Skills](./06-skills/)
- [What are skills](./06-skills/what-are-skills.md): format, open standard, neighbors, discovery
- [Ecosystem landscape](./06-skills/ecosystem-landscape.md): gstack, Superpowers, Anthropic official, vendor skills, security skills, personal collections, community catalogs
- [Choosing skills](./06-skills/choosing-skills.md): decision framework + starter recipes
- [Building your own](./06-skills/building-your-own.md): anatomy of a good SKILL.md, testing, versioning
- [Quality and anti-patterns](./06-skills/quality-and-anti-patterns.md): skill bloat, the ToxicSkills study, security mitigations
- 🧩 [Interactive skill picker](./06-skills/picker.md): answer 6 questions, get a recommended kit *(site only)*

### [07 — Memory](./07-memory/)
- [What is memory](./07-memory/what-is-memory.md): concept, CoALA taxonomy, interaction vs. artifact memory
- [Vendor-native memory](./07-memory/vendor-native.md): Claude, Copilot, Codex, Cursor, Windsurf
- [Interaction memory tools](./07-memory/interaction-memory.md): claude-mem, Mem0, Letta, Zep/Graphiti, Cognee, ByteRover, Cline Memory Bank, Basic Memory
- [Artifact memory (code KGs)](./07-memory/artifact-memory.md): graphify, GitNexus
- [Practice and risks](./07-memory/practice-and-risks.md): recommended stacks plus memory poisoning, staleness, privacy, cold-start
- 🧠 [Interactive memory picker](./07-memory/picker.md): answer 5 questions, get a stack *(site only)*

### [08 — Quality](./08-quality/)
- [Technical excellence in the AI age](./08-quality/technical-excellence.md)
- [When things go wrong](./08-quality/when-things-go-wrong.md)
- [AI for maintenance](./08-quality/ai-for-maintenance.md)

### [09 — Security](./09-security/)
- [The threat landscape](./09-security/threat-landscape.md): what goes wrong, why AI is bad at security, and the research data
- [Defenses](./09-security/defenses.md): practical mitigations, scanning, review patterns
- [Supply chain & prompt injection](./09-security/supply-chain.md): slopsquatting, malicious skills, prompt injection
- [Regulation & policy](./09-security/regulation.md): EU AI Act, FTC, sector regimes

### [10 — Team & Process](./10-team-and-process/)
- [Measuring what matters](./10-team-and-process/measuring-impact.md)
- [For team leads](./10-team-and-process/for-team-leads.md)
- [Junior developers](./10-team-and-process/junior-developers.md)

### [11 — Frontier](./11-frontier/)
- [Research frontier](./11-frontier/research-frontier.md)
- [Recent updates (April 2026)](./11-frontier/recent-updates-april-2026.md)
- [What's coming next](./11-frontier/whats-coming.md)
- [The bottom line](./11-frontier/bottom-line.md)

### [12 — Adoption](./12-adoption/)
- [Adoption overview](./12-adoption/): 5-min TL;DR for engineering leaders rolling out AI coding
- [AI coding maturity model](./12-adoption/maturity-model.md): Level 0-5 with assessment criteria
- [Risk, governance, policy](./12-adoption/risk-governance-policy.md): threat model, regulatory mapping, AUP template
- [ROI and board narrative](./12-adoption/roi-and-board-narrative.md): DORA + TCO modeling + board talking points
- [Org design + platform team](./12-adoption/org-design.md): platform team, AI champions, hiring/leveling
- [The 90-day roadmap](./12-adoption/90-day-roadmap.md): concrete plans per maturity level
- [Case studies](./12-adoption/case-studies.md): real outcomes at peer companies
- 📊 [Interactive maturity assessment](./12-adoption/assessment.md): 10 questions, get your level *(site only)*
- [Templates](./12-adoption/templates/): AUP, AGENTS.md, code review, vendor evaluation, board slides, incident runbook

### Reference
- [GLOSSARY.md](./GLOSSARY.md): terms (vibe coding, harness, context engineering, EARS, etc.)
- [REFERENCES.md](./REFERENCES.md): every cited study and paper

### Installable artifacts
- 🤖 [`skills/skill-recommender/`](./skills/): an installable AI skill (SKILL.md format) that runs an interactive Q&A and recommends both *existing skills to install* and *custom skills to write yourself*, tailored to your project. Drop into `~/.claude/skills/` or your tool's equivalent.

---

## A note on opinions

The author has been tracking their own AI coding usage since mid-2024 and has read more studies than is healthy. Take everything here as informed opinion, not gospel; the field is changing faster than anyone can keep up with. Some predictions in [What's coming next](./11-frontier/whats-coming.md) will be wrong.

What probably won't change: understanding, judgment, and quality remain valuable, regardless of how much code AI writes for you.
