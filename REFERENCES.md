# References

Every study, paper, report, tool, and external source cited in the guide. URLs verified via web search in April 2026.

> **Notes on verification:**
> - Most citations are verified to a primary source. A handful couldn't be — those are listed in [Summary of unverified or flagged items](#summary-of-unverified-or-flagged-items) at the bottom of this page.
> - Two factual issues in the original guide are flagged inline (Atlassian 59% stat, EU AI Act effective date) — the original prose is preserved in the content files; the corrected attribution is here.
> - Where multiple URLs exist (HTML + PDF, blog + paper, etc.), the primary/canonical link is listed first.

## How this page is organized

Topical sections first (productivity, security, academic, regulatory), then folder-specific deep dives (Memory, Leadership), then the meta "Summary of unverified" at the end. Use the page search (Cmd/Ctrl-F) — it's faster than scrolling.

---

## Productivity studies

### METR — Early-2025 AI Productivity Study
- **Title:** "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity"
- **Author/Org:** METR
- **Year:** July 2025
- **Finding:** 16 experienced developers, 246 real tasks (repos averaging 22k+ stars, 1M+ LOC). Developers were **19% slower** with AI tools — yet expected a 24% speedup, and *thought* afterwards they had been 20% faster.
- **Primary source:** https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- **Paper:** [arXiv:2507.09089](https://arxiv.org/abs/2507.09089)
- **Code/data:** https://github.com/METR/Measuring-Early-2025-AI-on-Exp-OSS-Devs
- **Cited in:** [Research landscape](./01-foundations/research-landscape.md), [Measuring impact](./08-team-and-adoption/measuring-impact.md)

### DORA — 2025 State of AI-Assisted Software Development
- **Author/Org:** Google Cloud / DORA
- **Year:** September 2025
- **Finding:** 90% of developers now use AI tools.
- **URL:** https://cloud.google.com/resources/content/2025-dora-ai-assisted-software-development-report
- **Announcement:** https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report
- **Cited in:** [State of industry](./01-foundations/state-of-industry.md)

### Stack Overflow Developer Survey 2025
- **Author/Org:** Stack Overflow
- **Year:** 2025
- **Findings cited in guide:** 82% use weekly; 29% trust AI code (down from 40%); 45% find debugging AI code time-consuming.
- **URL:** https://survey.stackoverflow.co/2025/ai
- **Note:** The headline numbers in the survey are 84% use/plan-to-use and 51% daily. The "82% weekly" framing in the source guide may conflate two different stats — verify directly if reproducing.
- **Cited in:** [State of industry](./01-foundations/state-of-industry.md), [Language effectiveness](./03-effective-use/language-effectiveness.md)

### GitHub / Microsoft — Copilot "55% Faster" Study
- **Title:** "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot"
- **Authors:** Peng, Kalliamvakou, Cihon, Demirer (Microsoft / GitHub)
- **Year:** Experiment May–June 2022; published February 2023
- **Finding:** 55% faster on a greenfield HTTP-server task — the guide's critique is that this isn't representative of real work.
- **URL:** [arXiv:2302.06590](https://arxiv.org/abs/2302.06590)
- **Cited in:** [Research landscape](./01-foundations/research-landscape.md)

### GitClear — AI Code Quality / 4× Duplication
- **Title:** "AI Copilot Code Quality: 2025 Data Suggests 4x Growth in Code Clones"
- **Author/Org:** Bill Harding, GitClear
- **Year:** 2025
- **URL:** https://www.gitclear.com/ai_assistant_code_quality_2025_research
- **Full PDF:** https://gitclear-public.s3.us-west-2.amazonaws.com/AI-Copilot-Code-Quality-2025.pdf
- **Cited in:** [Research landscape](./01-foundations/research-landscape.md), [Failure modes](./03-effective-use/failure-modes.md)

### Uplevel — 41% More Bugs
- **Title:** "AI for Developer Productivity: What Now?"
- **Author/Org:** Uplevel
- **Year:** 2024
- **URL:** https://uplevelteam.com/blog/ai-for-developer-productivity
- **Cited in:** [Research landscape](./01-foundations/research-landscape.md)

### Faros AI — 91% More PR Review Time
- **Title:** "The AI Productivity Paradox Research Report"
- **Author/Org:** Faros AI
- **Year:** 2025
- **URL:** https://www.faros.ai/blog/ai-software-engineering
- **Cited in:** [Research landscape](./01-foundations/research-landscape.md), [Measuring impact](./08-team-and-adoption/measuring-impact.md)

### Atlassian — Developer Survey (59% stat)
- **Author/Org:** Source guide attributes to Atlassian, but verification suggests the actual source is **Clutch.co**.
- **Likely correct citation:** Clutch.co, June 2025 survey of 800 software professionals — "Devs Use AI-Generated Code They Don't Understand"
- **Clutch URL:** https://clutch.co/resources/devs-use-ai-generated-code-they-dont-understand
- **Atlassian's actual 2025 report (for reference):** [State of Developer Experience Report 2025](https://www.atlassian.com/teams/software-development/state-of-developer-experience-2025) — does not contain the "59% shipped code they didn't fully understand" stat.
- **Note:** ⚠️ The source guide may have misattributed this finding. The 59% figure traces to Clutch.co, not Atlassian.
- **Cited in:** [Failure modes](./03-effective-use/failure-modes.md)

### McKinsey — Feb 2026 Developer Productivity Study (4,500 developers)
- **Author/Org:** McKinsey & Company
- **Year:** 2026 (claimed)
- **Finding cited in guide:** 46% reduction in routine coding time across 4,500 developers.
- **URL:** **NOT FOUND** as a primary McKinsey source. Referenced only via secondary coverage.
- **Closest verified McKinsey work:** ["Unleashing developer productivity with generative AI"](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/unleashing-developer-productivity-with-generative-ai)
- **Note:** ⚠️ Could not locate a primary McKinsey publication matching the guide's claim. Treat with caution; verify before citing externally.
- **Cited in:** [Research landscape](./01-foundations/research-landscape.md)

---

## Reports & industry analysis

### Menlo Ventures — 2025 State of Generative AI in the Enterprise
- **Author/Org:** Menlo Ventures
- **Year:** December 2025
- **Finding:** $37B GenAI spend in 2025, up from $11.5B in 2024.
- **URL:** https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/
- **PDF:** https://menlovc.com/wp-content/uploads/2025/12/menlo_ventures_enterprise_ai_report-2025-123125.pdf
- **Cited in:** [State of industry](./01-foundations/state-of-industry.md)

### Anthropic — 2026 Agentic Coding Trends Report
- **Author/Org:** Anthropic
- **Year:** 2026
- **Finding:** Coined the term "repository intelligence."
- **URL:** https://resources.anthropic.com/2026-agentic-coding-trends-report
- **PDF:** https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf
- **Cited in:** [Understanding problem](./04-understanding-and-context/understanding-problem.md), [Context engineering](./04-understanding-and-context/context-engineering.md)

### Thoughtworks Technology Radar — Spec-Driven Development
- **Title:** Technology Radar Vol. 34 — entry on spec-driven development
- **Author/Org:** Thoughtworks
- **Year:** April 2026
- **URL:** https://www.thoughtworks.com/radar/techniques/spec-driven-development
- **PDF (Vol 34):** https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/04/tr_technology_radar_vol_34_en.pdf
- **Cited in:** [Spec-driven development](./05-workflows/spec-driven-development.md)

### Gartner — Multi-Agent Inquiry Surge
- **Source guide claim:** +1,445% increase in multi-agent system inquiries Q1 2024 → Q2 2025.
- **URL:** **NOT FOUND** as a primary Gartner publication via this verification pass.
- **Cited in:** [Research frontier](./09-frontier/research-frontier.md)

### GitHub — AI Code Stats (early 2026)
- **Source guide claim:** 51% of all code committed in early 2026 was AI-generated or substantially assisted.
- **URL:** **NOT FOUND** as a single primary GitHub publication this pass — could be an executive talk or blog. Verify before reproducing.
- **Cited in:** [State of industry](./01-foundations/state-of-industry.md)

---

## Security studies

### Veracode — State of Software Security 2026 / Spring GenAI Update
- **Title:** "2026 State of Software Security" + "Spring 2026 GenAI Code Security Update"
- **Author/Org:** Veracode
- **Year:** 2026
- **Finding:** Only 55% of AI-generated code is secure (newer models do not improve on this).
- **Main report:** https://www.veracode.com/resources/analyst-reports/state-of-software-security-2026/
- **GenAI update (where 55% lives):** https://www.veracode.com/blog/spring-2026-genai-code-security/
- **Cited in:** [Technical excellence](./07-quality-and-security/technical-excellence.md), [Bottom line](./09-frontier/bottom-line.md)

### Black Duck — 2026 OSSRA Report
- **Title:** "2026 Open Source Security and Risk Analysis (OSSRA) Report"
- **Author/Org:** Black Duck
- **Year:** February 2026
- **Finding:** Mean vulnerabilities per codebase up 107% YoY; OSS components up 30%.
- **URL:** https://www.blackduck.com/resources/analyst-reports/open-source-security-risk-analysis.html
- **Blog:** https://www.blackduck.com/blog/open-source-trends-ossra-report.html
- **Cited in:** [Technical excellence](./07-quality-and-security/technical-excellence.md)

### Georgia Tech — Vibe Security Radar
- **Author/Org:** Hanqing Zhao, Systems Software & Security Lab (SSLab), Georgia Tech
- **Year:** 2026
- **Finding:** 35 CVEs from AI tools in March 2026 (vs. 6 in January). Claude Code "always leaves a signature."
- **Direct project URL:** Not found this pass. SSLab: https://gts3.org/
- **Coverage:** https://www.futurity.org/ai-generated-code-vulnerable-3330542/
- **Note:** Verified via secondary coverage; project page not surfaced.
- **Cited in:** [Technical excellence](./07-quality-and-security/technical-excellence.md), [Recent updates](./09-frontier/recent-updates-april-2026.md)

### Opsera — AI Coding Impact 2026 Benchmark
- **Author/Org:** Opsera
- **Year:** 2026
- **Finding:** AI-generated code introduces 15–18% more vulnerabilities per line vs. human-written.
- **URL:** https://opsera.ai/resources/report/ai-coding-impact-2026-benchmark-report/
- **Cited in:** [Technical excellence](./07-quality-and-security/technical-excellence.md)

### Aikido Security — State of AI in Security & Development 2026
- **Author/Org:** Aikido Security
- **Year:** 2026
- **Finding:** 1 in 5 breaches caused by AI-generated code; 24% of production code globally is AI-generated (29% US).
- **URL:** https://www.aikido.dev/state-of-ai-security-development-2026
- **Alt URL:** https://www.aikido.dev/reports/2026-state-of-ai-in-security-development
- **Cited in:** [Technical excellence](./07-quality-and-security/technical-excellence.md)

---

## Academic papers

### Lulla et al. — `AGENTS.md` Impact Study (ETH Zurich)
- **Title:** "On the Impact of `AGENTS.md` Files on the Efficiency of AI Coding Agents"
- **Author/Org:** Lulla et al. (ETH Zurich-affiliated)
- **Year:** 2026
- **URL:** [arXiv:2601.20404](https://arxiv.org/abs/2601.20404) — HTML: https://arxiv.org/html/2601.20404v1
- **Companion paper:** "Evaluating AGENTS.md..." (Gloaguen et al.) — [arXiv:2602.11988](https://arxiv.org/abs/2602.11988)
- **Cited in:** [Spec-driven development](./05-workflows/spec-driven-development.md), [Context engineering](./04-understanding-and-context/context-engineering.md), [Skills ecosystem](./05-workflows/skills-ecosystem.md), [Research frontier](./09-frontier/research-frontier.md)

### Tao et al. — RAG for Code Survey
- **Title:** "Retrieval-Augmented Code Generation: A Survey with Focus on Repository-Level Approaches"
- **Author:** Yicheng Tao et al.
- **Year:** Last revised January 2026
- **URL:** [arXiv:2510.04905](https://arxiv.org/abs/2510.04905)
- **Cited in:** [Research frontier](./09-frontier/research-frontier.md)

### Seo et al. — Paper2Code
- **Title:** "Paper2Code: Automating Code Generation from Scientific Papers in Machine Learning"
- **Authors:** Minju Seo, Jinheon Baek, Seongyun Lee, Sung Ju Hwang
- **Year:** v5 last revised February 2026
- **URL:** [arXiv:2504.17192](https://arxiv.org/abs/2504.17192)
- **Cited in:** [Research frontier](./09-frontier/research-frontier.md)

### Mohsenimofidi et al. — Context Engineering for AI Agents in OSS
- **Title:** "Context Engineering for AI Agents in Open-Source Software"
- **Authors:** Seyedmoein Mohsenimofidi, Matthias Galster, Christoph Treude, Sebastian Baltes
- **Year:** 2025
- **URL:** [arXiv:2510.21413](https://arxiv.org/abs/2510.21413)
- **Cited in:** [Research frontier](./09-frontier/research-frontier.md)

### Vasilopoulos — Codified Context
- **Title:** "Codified Context: Infrastructure for AI Agents in a Complex Codebase"
- **Author:** Aristidis Vasilopoulos
- **Year:** February 2026
- **URL:** [arXiv:2602.20478](https://arxiv.org/abs/2602.20478)
- **Cited in:** [Research frontier](./09-frontier/research-frontier.md)

### MSR 2026 paper on `.cursorrules`
- **Source guide claim:** A paper at MSR 2026 conference analyzing `.cursorrules` files across thousands of repos.
- **Verification:** No exact match found. Closest is "Configuring Agentic AI Coding Tools: An Exploratory Study" (Galster et al.) which covers `.cursorrules` among 8 mechanisms across 2,926 repos.
- **Closest URL:** [arXiv:2602.14690](https://arxiv.org/abs/2602.14690)
- **Also relevant:** "Decoding the Configuration of AI Coding Agents: Insights from Claude Code Projects" — [arXiv:2511.09268](https://arxiv.org/abs/2511.09268)
- **Note:** ⚠️ Could not locate the specific MSR 2026 paper. The Galster et al. preprint above is the most likely match.
- **Cited in:** [Research frontier](./09-frontier/research-frontier.md)

---

## Tools & products

### IDEs and assistants
- **GitHub Copilot:** https://github.com/features/copilot
- **Cursor:** https://cursor.com/
- **Claude Code:** https://www.anthropic.com/product/claude-code
  - Docs: https://code.claude.com/docs/en/overview
  - GitHub: https://github.com/anthropics/claude-code
- **OpenAI Codex (GPT-5.3-Codex):** Verify product page directly with OpenAI; no single canonical URL surfaced.
- **Amazon Kiro:** https://kiro.dev/
- **Google Antigravity:** https://antigravity.google/
- **Windsurf:** Verify directly (post-OpenAI acquisition status unclear).
- **Codeium / Cline / Aider:** Verify directly via their respective sites.

### Spec-driven tools
- **GitHub Spec Kit:** https://github.com/github/spec-kit
  - Docs: https://github.github.com/spec-kit/
- **Tessl:** https://tessl.io/
- **Intent (Augment Code):** https://www.augmentcode.com/product/intent
  - **Note:** ⚠️ The source guide refers to "Intent" generically. Augment Code's product is the most likely referent, but Sean Grove (OpenAI) has separately discussed an "intent-as-spec" philosophy. Worth disambiguating.
- **OpenSpec:** https://github.com/Fission-AI/OpenSpec — site: https://openspec.dev/

### Collaborative-agent / multiplayer-agent tools
- **ACE — Agent Collaboration Environment (GitHub Labs):** the research prototype Maggie (staff researcher engineer at GitHub Labs) presented in the talk *"One Developer, Two Dozen Agents, Zero Alignment."* Multiplayer chat sessions backed by isolated cloud microVMs, shared prompt history, live previews, integrated PR creation, multiplayer code editing, summary/dashboard views.
  - **URL:** ⚠️ No primary URL verified at time of writing. The talk's framing and ACE's feature set are documented in the source notes the guide draws from; treat as directional until GitHub Labs publishes an official ACE landing page or repo.
  - **Cited in:** [The alignment bottleneck](./08-team-and-adoption/alignment-bottleneck.md), [What's coming next](./09-frontier/whats-coming.md), [Maturity model](./08-team-and-adoption/maturity-model.md)

### Skill libraries (extensive — see [folder 06 — Skills](./06-skills-and-memory/) for full coverage)

**Methodology systems**
- **gstack (Garry Tan):** https://github.com/garrytan/gstack — site: https://gstacks.org/
- **Superpowers (Jesse Vincent / obra):** https://github.com/obra/superpowers — plugin page: https://claude.com/plugins/superpowers
- **Superpowers blog post (canonical):** [Vincent, Oct 9, 2025](https://blog.fsck.com/2025/10/09/superpowers/)
- **BMAD-METHOD (Brian Madison + community):** https://github.com/bmad-code-org/BMAD-METHOD (~46K stars). Issue showing workflow rigidity: [#1332](https://github.com/bmad-code-org/BMAD-METHOD/issues/1332).
- **Compound Engineering (Every Inc.):** https://github.com/EveryInc/compound-engineering-plugin (~16K stars). Background: [Compound Engineering — How Every Codes With Agents](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents). Critical analysis: [Will Larson on Compound Engineering](https://lethain.com/everyinc-compound-engineering/).
- **GSD / get-shit-done:** https://github.com/gsd-build/get-shit-done (~57K stars; MIT, actively maintained, supports 15+ runtimes — a legitimate primary methodology choice. Two narrow caveats — a `$GSD` Solana token in the README header (matters if you have a no-crypto-dependency policy) and a "Welcome Back" banner referencing a prior Anthropic ToS event (largely mitigated by multi-runtime support) — see [ecosystem-landscape.md](./06-skills-and-memory/ecosystem-landscape.md#two-things-worth-knowing-about-gsd)). Comparative analysis: [Superpowers, GSD, and gstack: What Each Claude Code Framework Actually Constrains](https://medium.com/@tentenco/superpowers-gsd-and-gstack-what-each-claude-code-framework-actually-constrains-12a1560960ad).

**Anthropic official**
- **`anthropics/skills`:** https://github.com/anthropics/skills (~124K stars; includes `frontend-design`, `skill-creator`, document skills)
- **`anthropics/claude-plugins-official`:** https://github.com/anthropics/claude-plugins-official (Claude Marketplace manifest)
- **frontend-design plugin page:** https://claude.com/plugins/frontend-design (~277K installs March 2026)

**Vendor skills (first-party)**
- **MongoDB:** https://github.com/mongodb/agent-skills — [announcement](https://www.mongodb.com/company/blog/product-release-announcements/introducing-mongodb-agent-skills)
- **Supabase:** https://github.com/supabase/agent-skills — [announcement](https://supabase.com/blog/supabase-agent-skills)
- **Vercel skills:** https://github.com/vercel-labs/agent-skills · CLI: https://github.com/vercel-labs/skills — [changelog](https://vercel.com/changelog/introducing-skills-the-open-agent-skills-ecosystem)
- **Cloudflare:** https://github.com/cloudflare/skills — [Code Mode blog](https://blog.cloudflare.com/code-mode-mcp/)
- **HashiCorp:** https://github.com/hashicorp/agent-skills — [announcement](https://www.hashicorp.com/en/blog/introducing-hashicorp-agent-skills)
- **LiveKit:** https://github.com/livekit/agent-skills — [LiveKit blog](https://livekit.com/blog/voice-agent-skills-for-coding-assistants)
- **ClickHouse:** https://github.com/ClickHouse/agent-skills
- **Expo:** https://github.com/expo/skills
- **Figma:** https://github.com/figma/community-resources/tree/main/agent_skills
- **Stripe / Polar / Netlify:** No single first-party `agent-skills` repo found as of April 2026 (community skills exist; see [Ecosystem landscape](./06-skills-and-memory/ecosystem-landscape.md#stripe-polar-netlify-state-of-play))

**Security-focused**
- **Trail of Bits:** https://github.com/trailofbits/skills (CC BY-SA 4.0)
- **Sentry:** https://github.com/getsentry/skills (active) and https://github.com/getsentry/sentry-for-ai (canonical home)
- **Sentry `skill-scanner`:** https://github.com/getsentry/skills/blob/main/plugins/sentry-skills/skills/skill-scanner/SKILL.md (skill that audits other skills for security issues)

**Personal / influencer**
- **Matt Pocock:** https://github.com/mattpocock/skills (~16.1K stars) — also `mattpocock/total-typescript-monorepo`
- **Simon Willison `claude-skills`:** https://github.com/simonw/claude-skills (mirror of Claude code-interpreter skills)
- **Simon Willison's October 2025 post:** [*Claude Skills are awesome, maybe a bigger deal than MCP*](https://simonwillison.net/2025/Oct/16/claude-skills/) — the post that brought skills mainstream

**Community catalogs**
- **Antigravity Awesome Skills:** https://github.com/sickn33/antigravity-awesome-skills · catalog: https://sickn33.github.io/antigravity-awesome-skills/ — Community-maintained, *not* an official Google project despite the name. ~35K stars, 1,435+ skills
- **VoltAgent awesome-agent-skills:** https://github.com/VoltAgent/awesome-agent-skills (1,400+ curated)
- **`travisvn/awesome-claude-skills`:** https://github.com/travisvn/awesome-claude-skills
- **`hesreallyhim/awesome-claude-code`:** https://github.com/hesreallyhim/awesome-claude-code

### Skill format and authoring
- **`SKILL.md` open standard:** https://agentskills.io/specification (Anthropic announcement Dec 18, 2025)
- **Anthropic skill authoring best practices:** https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
- **Anthropic *Complete Guide to Building Skills for Claude* (PDF):** https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf
- **Claude Code skills docs:** https://code.claude.com/docs/en/skills
- **Anthropic engineering blog: Equipping agents for the real world with Agent Skills:** https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
- **VentureBeat coverage:** https://venturebeat.com/technology/anthropic-launches-enterprise-agent-skills-and-opens-the-standard
- **SKILL.md format reference (Agensi):** https://www.agensi.io/learn/skill-md-format-reference
- **Progressive disclosure pattern (SwirlAI):** https://www.newsletter.swirlai.com/p/agent-skills-progressive-disclosure
- **GitHub CLI manages agent skills (April 16, 2026):** https://github.blog/changelog/2026-04-16-manage-agent-skills-with-github-cli/

### Skill security research
- **Snyk *ToxicSkills* study (Feb 2026):** https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/ — 36% of 3,984 skills had prompt injection
- **Repello AI: Auditing skills before install:** https://repello.ai/blog/claude-code-skill-security
- **TimOnWeb: I checked 5 security skills, only one is worth installing:** https://timonweb.com/ai/i-checked-5-security-skills-for-claude-code-only-one-is-worth-installing/
- **VentureBeat: Claudy Day (Oasis Security, March 2026):** https://venturebeat.com/security/ai-agent-runtime-security-system-card-audit-comment-and-control-2026
- **SecurityWeek: Coding agents vulnerable to PR-comment injection:** https://www.securityweek.com/claude-code-gemini-cli-github-copilot-agents-vulnerable-to-prompt-injection-via-comments/

### Skill anti-patterns and team practice
- **MindStudio: Common skill mistakes:** https://www.mindstudio.ai/blog/claude-code-skills-common-mistakes-guide
- **MindStudio: Context rot in bloated skills:** https://www.mindstudio.ai/blog/context-rot-claude-code-skills-bloated-files
- **MindStudio: Self-improving workflows:** https://www.mindstudio.ai/blog/claude-code-skills-self-improving-workflows
- **Karakambaka: Stop stuffing your custom instructions:** https://medium.com/@kdineshkvkl/stop-stuffing-your-custom-instructions-the-definitive-guide-to-claude-skills-mcp-0edda444fcda
- **Skiln: Plugins vs skills vs MCP decision guide:** https://skiln.co/blog/claude-code-plugins-vs-skills-vs-mcp-decision-guide
- **Pulumi: Picking the right Claude Code orchestration framework:** https://www.pulumi.com/blog/claude-code-orchestration-frameworks/
- **Verdent: What are Claude Skills (2026 guide):** https://www.verdent.ai/guides/what-are-claude-skills-guide-2026
- **Portkey: Who owns Claude Code at your company:** https://portkey.ai/blog/platfrom-guide-to-coding-agents/
- **Aigentic Lab: Skills at enterprise scale:** https://newsletter.aigenticlab.com/p/skills-at-enterprise-scale-governance-at-zero
- **Gend: Claude Skills enterprise guide:** https://www.gend.co/blog/claude-skills-enterprise-guide
- **Anandbg: Claude Skills 2026 comprehensive guide:** https://anandbg.com/blog/claude-skills-comprehensive-guide-2026
- **Welcome Developer: 10 Claude Code skills I actually use (Matt Pocock):** https://www.welcomedeveloper.com/posts/the-10-claude-code-skills/
- **TechCrunch: Why Garry Tan's Claude Code setup got so much love and hate:** https://techcrunch.com/2026/03/17/why-garry-tans-claude-code-setup-has-gotten-so-much-love-and-hate/
- **SitePoint: gstack tutorial:** https://www.sitepoint.com/gstack-garry-tan-claude-code/
- **Augment Code: Garry Tan opens gstack:** https://www.augmentcode.com/learn/garry-tan-gstack-claude-code
- **Anthropic Skilljar course: Introduction to agent skills:** https://anthropic.skilljar.com/introduction-to-agent-skills
- **tl;dr sec #316 (Trail of Bits + Claude Code):** https://tldrsec.com/p/tldr-sec-316
- **Addy Osmani: My LLM coding workflow going into 2026:** https://addyosmani.com/blog/ai-coding-workflow/
- **Snyk: Top Claude skills for UI/UX engineers:** https://snyk.io/articles/top-claude-skills-ui-ux-engineers/

### `AGENTS.md` standard
- **`AGENTS.md` open standard:** Stewarded by the Linux Foundation's Agentic AI Foundation. Adopters: Sourcegraph, OpenAI, Google, Cursor, Factory, Anthropic.
- **thepromptshelf comparison:** https://thepromptshelf.dev/blog/cursorrules-vs-claude-md/
- **serenitiesai comparison:** https://serenitiesai.com/articles/cursorrules-vs-agents-md-vs-claude-md-comparison

### Open Claude Code issue (skill name shadowing)
- https://github.com/anthropics/claude-code/issues/33080 (built-in skills shadow custom skills with the same name)

### Security & scanning (referenced)
- **Semgrep:** https://semgrep.dev
- **Snyk:** https://snyk.io
- **CodeQL:** https://codeql.github.com

---

## People & posts

### Andrej Karpathy — "vibe coding"
- **Original post:** https://x.com/karpathy/status/1886192184808149383
- **Date:** February 2, 2025

### Andrej Karpathy — "agentic engineering"
- **Follow-up post:** https://x.com/karpathy/status/2026731645169185220
- **Date:** February 2026
- **Coverage:** https://thenewstack.io/vibe-coding-is-passe/

### Andrej Karpathy — observations on LLM coding pitfalls
- **Original post:** https://x.com/karpathy/status/2015883857489522876
- **Topic:** LLMs make wrong assumptions silently, overcomplicate code and APIs, change/remove code they don't fully understand, and "are exceptionally good at looping until they meet specific goals." The post that inspired the `andrej-karpathy-skills` CLAUDE.md template (~95K stars; see [06 — Ecosystem landscape](./06-skills-and-memory/ecosystem-landscape.md#forrest-changs-andrej-karpathy-skills)).
- **Cited in:** [Failure modes / overcomplication](./03-effective-use/failure-modes.md), [Prompting patterns / success criteria over imperatives](./03-effective-use/prompting-patterns.md), [Review discipline / surgical changes](./03-effective-use/review-discipline.md)

### Forrest Chang — `andrej-karpathy-skills` repository
- **Repo:** https://github.com/forrestchang/andrej-karpathy-skills
- **License:** MIT · ~95K stars (April 2026) · created January 27, 2026
- **What it is:** a single `CLAUDE.md` (also packaged as a Claude Code plugin) distilling four behavioral principles from Karpathy's tweet above. The single-file format and meteoric star growth make it a noteworthy data point on what the community is reaching for.
- **Cited in:** [Ecosystem landscape](./06-skills-and-memory/ecosystem-landscape.md), [Choosing skills](./06-skills-and-memory/choosing-skills.md), [QUICKSTART](./QUICKSTART.md)

### Collins Dictionary — Word of the Year 2025
- **WOTY page:** https://www.collinsdictionary.com/us/woty
- **Announcement post:** https://blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025-ai-meets-authenticity-as-society-shifts/
- **Date:** Announced November 6, 2025

### Martin Fowler — on context engineering
- Reference in source guide to Fowler's framing ("curating what the model sees"). No specific URL surfaced this pass — verify on https://martinfowler.com/articles/ before quoting externally.

### Birgitta Boeckeler (Thoughtworks) — on context engineering as developer experience
- Reference in source guide. No specific URL surfaced this pass — verify on Thoughtworks publications before quoting.

---

## Regulatory

### EU AI Act
- **Title:** Regulation (EU) 2024/1689 — Artificial Intelligence Act
- **Author/Org:** European Parliament & Council
- **Status:**
  - Entered into force: **August 1, 2024**
  - February 2, 2026: Commission guidelines deadline for Article 6 (high-risk classification)
  - Full applicability: **August 2, 2026**
- **Note:** ⚠️ The source guide's phrase "took full effect in February" is misleading. February 2026 is a guidelines milestone, not a major effective date. Full applicability of the high-risk regime is August 2026.
- **Official text:** https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng
- **Commission portal:** https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- **Cited in:** [Security](./07-quality-and-security/threat-landscape.md), [Recent updates](./09-frontier/recent-updates-april-2026.md)

### FTC Guidance
- **Source guide claim:** Companies bear full legal responsibility for AI-generated code quality and security.
- **URL:** No single primary FTC publication surfaced this pass. Verify against https://www.ftc.gov/business-guidance/.
- **Cited in:** [Security](./07-quality-and-security/threat-landscape.md), [Recent updates](./09-frontier/recent-updates-april-2026.md)

---

## Memory for AI coding (folder 07)

### claude-mem (the flagship)
- **Repo:** https://github.com/thedotmack/claude-mem (~67.8K stars, AGPL-3.0)
- **Author:** thedotmack (Alex Mack); homepage https://claude-mem.ai
- **Architecture docs:** https://docs.claude-mem.ai/architecture/overview
- **DeepWiki:** https://deepwiki.com/thedotmack/claude-mem/1-overview
- **Augment Code writeup at 65k stars:** https://www.augmentcode.com/learn/claude-mem-65k-stars

### Vendor-native memory
- **Anthropic memory tool API:** https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool
- **Anthropic context management announcement:** https://www.anthropic.com/news/context-management
- **Claude Code memory docs:** https://code.claude.com/docs/en/memory
- **Claude memory free tier launch (March 2 2026):** https://www.macrumors.com/2026/03/02/anthropic-memory-import-tool/
- **Anthropic auto-memory (Oct 2025):** https://www.macrumors.com/2025/10/23/anthropic-automatic-memory-claude/
- **GitHub Copilot memory engineering blog:** https://github.blog/ai-and-ml/github-copilot/building-an-agentic-memory-system-for-github-copilot/
- **Copilot Memory docs:** https://docs.github.com/en/copilot/concepts/agents/copilot-memory
- **Copilot Memory on by default (March 4 2026):** https://github.blog/changelog/2026-03-04-copilot-memory-now-on-by-default-for-pro-and-pro-users-in-public-preview/
- **Copilot Memory public preview (Jan 15 2026):** https://github.blog/changelog/2026-01-15-agentic-memory-for-github-copilot-is-in-public-preview/
- **Codex Memories docs:** https://developers.openai.com/codex/memories
- **Cursor "Memories killed in 2.1.x" forum thread:** https://forum.cursor.com/t/persistent-ai-memory-for-cursor/145660
- **Windsurf Cascade docs:** https://docs.windsurf.com/windsurf/cascade/cascade
- **OpenAI ChatGPT Memory FAQ:** https://help.openai.com/en/articles/8590148-memory-faq
- **Simon Willison: ChatGPT memory dossier critique:** https://simonwillison.net/2025/May/21/chatgpt-new-memory/

### Interaction memory tools (third-party)
- **Mem0:** https://github.com/mem0ai/mem0 — paper [arXiv:2504.19413](https://arxiv.org/abs/2504.19413) — [State of AI Agent Memory 2026](https://mem0.ai/blog/state-of-ai-agent-memory-2026) — [Context window vs persistent memory](https://mem0.ai/blog/context-window-vs-persistent-memory-why-1m-tokens-isn-t-enough)
- **Letta + Letta Code:** https://github.com/letta-ai/letta · https://github.com/letta-ai/letta-code · [launch blog](https://www.letta.com/blog/letta-code) · [Letta v1 agent loop](https://www.letta.com/blog/letta-v1-agent)
- **Zep + Graphiti:** https://www.getzep.com/ · https://github.com/getzep/graphiti · paper [arXiv:2501.13956](https://arxiv.org/abs/2501.13956) · [KG MCP](https://www.getzep.com/product/knowledge-graph-mcp/)
- **Cognee:** https://github.com/topoteretes/cognee · [How Cognee Builds AI Memory](https://www.cognee.ai/blog/fundamentals/how-cognee-builds-ai-memory) · [CoALA explainer](https://www.cognee.ai/blog/fundamentals/cognitive-architectures-for-language-agents-explained)
- **MemOS:** https://github.com/MemTensor/MemOS · paper [arXiv:2507.03724](https://huggingface.co/papers/2507.03724)
- **MemoryOS (separate project):** https://github.com/BAI-LAB/MemoryOS
- **ByteRover (formerly Cipher):** https://github.com/campfirein/byterover-cli · [ByteRover 2.0 blog](https://www.byterover.dev/blog/byterover-2-0)
- **Cline Memory Bank:** https://docs.cline.bot/features/memory-bank
- **Basic Memory:** https://github.com/basicmachines-co/basic-memory
- **Anthropic MCP memory server (reference):** https://github.com/modelcontextprotocol/servers/tree/main/src/memory
- **Honcho (social/peer memory):** https://github.com/plastic-labs/honcho
- **Supermemory.ai:** https://blog.supermemory.ai/best-memory-apis-stateful-ai-agents/
- **Cursor Memory Bank (community):** https://github.com/tacticlaunch/cursor-bank · https://github.com/vanzan01/cursor-memory-bank

### Artifact memory (code knowledge graphs)
- **graphify:** https://github.com/safishamsi/graphify (~35K stars, MIT) — site https://graphify.net/ — [Issue #152: agentmemory integration](https://github.com/safishamsi/graphify/issues/152)
- **GitNexus:** https://github.com/abhigyanpatwari/GitNexus (~30K stars, PolyForm Noncommercial) — [ARCHITECTURE.md](https://github.com/abhigyanpatwari/GitNexus/blob/main/ARCHITECTURE.md) — [MarkTechPost coverage](https://www.marktechpost.com/2026/04/24/meet-gitnexus-an-open-source-mcp-native-knowledge-graph-engine-that-gives-claude-code-and-cursor-full-codebase-structural-awareness/) — [Big Hat Group: zero-server code intelligence](https://www.bighatgroup.com/blog/gitnexus-zero-server-code-intelligence-ai-development/) — [DeepWiki](https://deepwiki.com/abhigyanpatwari/GitNexus)
- **agentmemory (graphify's interaction-memory companion):** https://github.com/rohitg00/agentmemory

### Framework memory primitives
- **LangChain memory migration guide:** https://python.langchain.com/docs/versions/migrating_memory/conversation_buffer_memory/
- **LlamaIndex memory docs:** https://developers.llamaindex.ai/python/framework/module_guides/deploying/agents/memory/
- **LlamaIndex improved long-and-short-term memory:** https://www.llamaindex.ai/blog/improved-long-and-short-term-memory-for-llamaindex-agents
- **Vercel AI SDK Mem0 integration:** https://docs.mem0.ai/integrations/vercel-ai-sdk
- **Letta Vercel AI SDK provider:** https://github.com/letta-ai/vercel-ai-sdk-provider
- **AI SDK Memory tools:** https://ai-sdk-tools.dev/memory
- **Cloudflare Agent Memory:** https://blog.cloudflare.com/introducing-agent-memory/ · [Agents Week 2026](https://www.cloudflare.com/agents-week/updates/)
- **Augment Code Context Engine:** https://www.augmentcode.com/context-engine · [Agent Memory vs Context Engineering](https://www.augmentcode.com/guides/agent-memory-vs-context-engineering)

### Memory security
- **Microsoft AI Recommendation Poisoning (Feb 2026):** https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/
- **Swarm Signal: AI Agent Security 2026:** https://swarmsignal.net/ai-agent-security-2026/
- **Memory in the Age of AI Agents survey:** [arXiv:2512.13564](https://arxiv.org/abs/2512.13564)

### Concepts and writeups
- **CoALA paper / framework (Princeton, 2023):** referenced widely; [IBM overview](https://www.ibm.com/think/topics/ai-agent-memory) · [Atlan: Types of AI Agent Memory](https://atlan.com/know/types-of-ai-agent-memory/)
- **Karpathy LLM Wiki pattern (April 2026):** [Gamgee writeup](https://gamgee.ai/blogs/karpathy-llm-wiki-memory-pattern/) · [LevelUp deep dive](https://levelup.gitconnected.com/beyond-rag-how-andrej-karpathys-llm-wiki-pattern-builds-knowledge-that-actually-compounds-31a08528665e) · [Epsilla writeup](https://www.epsilla.com/blogs/karpathy-agentic-wiki-beyond-rag-enterprise-memory)
- **Simon Willison: 2025 Year in LLMs:** https://simonwillison.net/2025/Dec/31/the-year-in-llms/
- **Simon Willison on agent definition:** https://simonw.substack.com/p/i-think-agent-may-finally-have-a
- **NimblePros: Why context windows won't grow forever:** https://blog.nimblepros.com/blogs/context-windows-wont-grow-forever/
- **Spring AI Agentic Patterns: AutoMemoryTools:** https://spring.io/blog/2026/04/07/spring-ai-agentic-patterns-6-memory-tools/
- **Oracle: Agent Memory Why Amnesia:** https://blogs.oracle.com/developers/agent-memory-why-your-ai-has-amnesia-and-how-to-fix-it

### Curated memory lists
- **TeleAI-UAGI/Awesome-Agent-Memory:** https://github.com/TeleAI-UAGI/Awesome-Agent-Memory
- **TsinghuaC3I/Awesome-Memory-for-Agents:** https://github.com/TsinghuaC3I/Awesome-Memory-for-Agents
- **topoteretes/awesome-ai-memory:** https://github.com/topoteretes/awesome-ai-memory
- **Shichun-Liu/Agent-Memory-Paper-List:** https://github.com/Shichun-Liu/Agent-Memory-Paper-List

---

## Leadership content (folder 11)

### Real CTO / engineering leader case studies
- **Tobi Lütke / Shopify "Reflexive AI Usage" mandate (April 2025):** [Tobi's tweet](https://x.com/tobi/status/1909251946235437514) · [CNBC coverage](https://www.cnbc.com/2025/04/07/shopify-ceo-prove-ai-cant-do-jobs-before-asking-for-more-headcount.html) · [Forrester analysis](https://www.forrester.com/blogs/what-you-can-learn-from-shopifys-ceos-memo-on-workforce-ai/)
- **Klarna AI-then-rehiring reversal (Feb 2024 → May 2025):** [Entrepreneur](https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396) · [MLQ.ai](https://mlq.ai/news/klarna-ceo-admits-aggressive-ai-job-cuts-went-too-far-starts-hiring-again-after-us-ipo/)
- **Anthropic internal Claude Code data (2026):** [How AI is transforming work at Anthropic](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic) · [Complete Guide PDF](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf)
- **Microsoft GitHub Copilot RCT (Peng et al., 2023):** [arXiv 2302.06590](https://arxiv.org/abs/2302.06590) · [Microsoft customer-zero blog](https://www.microsoft.com/insidetrack/blog/inside-microsoft-being-customer-zero-in-an-ai-powered-world/) · [MIT Genai pubpub](https://mit-genai.pubpub.org/pub/v5iixksv)
- **Cloudflare internal AI engineering stack (2026):** [blog](https://blog.cloudflare.com/internal-ai-engineering-stack/)
- **Booking.com adoption rollout via DX:** [DX customer story](https://getdx.com/customers/booking-uses-dx-to-measure-impact-of-genai/) · [Booking drives AI adoption with DX](https://getdx.com/customers/booking-drives-ai-adoption-with-dx/)
- **Goldman Sachs Devin pilot (July 2025):** [CNBC](https://www.cnbc.com/2025/07/11/goldman-sachs-autonomous-coder-pilot-marks-major-ai-milestone.html)
- **YC W25 "95% AI code" (Garry Tan, March 2025):** [CNBC](https://www.cnbc.com/2025/03/15/y-combinator-startups-are-fastest-growing-in-fund-history-because-of-ai.html)
- **Anthropic-published customer stories (ServiceNow, Behavox, Altana, TELUS, Epic):** [claude.com/customers](https://claude.com/customers)
- **Replit / SaaStr production database deletion (July 2025):** [Fortune](https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/) · [AI Incident Database #1152](https://incidentdatabase.ai/cite/1152/)
- **Lovable security crisis (Dec 2025):** [The Next Web](https://thenextweb.com/news/lovable-vibe-coding-security-crisis-exposed)
- **Apiiro Fortune 50 study — 322% privilege escalation (June 2025):** [report](https://apiiro.com/blog/4x-velocity-10x-vulnerabilities-ai-coding-assistants-are-shipping-more-risks/)

### Maturity models (sources for the synthesis in 08-team-and-adoption/maturity-model.md)
- **Gartner AI maturity toolkit:** https://www.gartner.com/en/chief-information-officer/research/ai-maturity-model-toolkit
- **Gartner AI-Native Software Engineering:** https://www.gartner.com/en/documents/7586633
- **Gartner: only 45% of high-AI-maturity orgs sustain projects 3+ years (June 2025):** https://www.gartner.com/en/newsroom/press-releases/2025-06-30-gartner-survey-finds-forty-five-percent-of-organizations-with-high-artificial-intelligence-maturity-keep-artificial-intelligence-projects-operational-for-at-least-three-years
- **BCG AI Maturity Matrix (Nov 2024):** https://web-assets.bcg.com/fe/61/6962e74b44328f148c8a9ac1002d/ai-maturity-matrix-nov-2024.pdf
- **A16z 2025 Enterprise report:** https://a16z.com/ai-enterprise-2025/ · [Where enterprises are actually adopting AI](https://a16z.com/where-enterprises-are-actually-adopting-ai/)

### Productivity measurement frameworks
- **SPACE framework (Forsgren, Storey, Maddila, Zimmermann, Houck, Butler — ACM Queue 2021):** https://queue.acm.org/detail.cfm?id=3454124
- **DX Core 4 (Tacho, Noda + Forsgren/Storey/Zimmermann advisors, Jan 2025):** https://getdx.com/research/measuring-developer-productivity-with-the-dx-core-4/ · [LeadDev coverage](https://leaddev.com/reporting/dx-core-4-aims-to-unify-developer-productivity-frameworks)
- **McKinsey Developer Velocity Index:** https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/developer-velocity-how-software-excellence-fuels-business-performance
- **LeadDev critique of McKinsey DVI:** https://leaddev.com/career-development/what-mckinsey-got-wrong-about-developer-productivity
- **Atlassian acquires DX (~$1B, 2026):** https://www.atlassian.com/blog/announcements/atlassian-acquires-dx · [Faros AI analysis](https://www.faros.ai/blog/atlassian-dx-acquisition-developer-productivity-strategy)
- **METR follow-up study (Feb 2026):** https://metr.org/blog/2026-02-24-uplift-update/

### Vendor pricing (April 2026 verified)
- **GitHub Copilot pricing:** https://github.com/features/copilot/plans · [Token-based billing transition June 2026 (Where's Your Ed At)](https://www.wheresyoured.at/exclusive-microsoft-moving-all-github-copilot-subscribers-to-token-based-billing-in-june/)
- **Cursor pricing:** https://cursor.com/pricing
- **Claude Enterprise pricing (Feb 2026 restructure):** https://claude.com/pricing/enterprise
- **Verdent Claude Code pricing 2026:** https://www.verdent.ai/guides/claude-code-pricing-2026

### IP indemnification, governance, regulatory
- **Microsoft Copilot Copyright Commitment:** https://blogs.microsoft.com/on-the-issues/2023/09/07/copilot-copyright-commitment-ai-legal-concerns/
- **Kate Downing's legal analysis of Copilot indemnity:** https://katedowninglaw.com/2023/11/02/yes-github-finally-offered-to-indemnify-for-copilot-suggestions-but/
- **Sourcegraph Cody Enterprise (uncapped indemnity, ZDR):** https://sourcegraph.com/blog/cody-is-enterprise-ready
- **Anthropic data residency / ZDR:** https://privacy.claude.com/en/articles/7996890-where-are-your-servers-located-do-you-host-your-models-on-eu-servers · [Claude Code EU data residency issue](https://github.com/anthropics/claude-code/issues/40526)
- **EU AI Act practical summary (Software Improvement Group):** https://www.softwareimprovementgroup.com/blog/eu-ai-act-summary/
- **EU AI Act 6 steps before Aug 2 2026 (Orrick):** https://www.orrick.com/en/Insights/2025/11/The-EU-AI-Act-6-Steps-to-Take-Before-2-August-2026
- **Anthropic Responsible Scaling Policy v3 (Feb 2026):** https://www.anthropic.com/responsible-scaling-policy · [v3 announcement](https://www.anthropic.com/news/responsible-scaling-policy-v3)
- **AGENTS.md as open standard (Linux Foundation Agentic AI Foundation):** https://agents.md/ · [GitHub: lessons from 2,500 repositories](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)

### SOC 2 and audit
- **Goteleport: AI agents and SOC 2 (CC8.1):** https://goteleport.com/blog/ai-agents-soc-2/
- **Axiom Studio SOC 2 / AI compliance:** https://axiomstudio.ai/compliance/soc-2

### Cyber insurance & shadow AI
- **Coalition AI endorsements (2025):** [Insurance Business Mag coverage](https://www.insurancebusinessmag.com/us/news/cyber/cyber-insurance-enters-the-ai-risk-era-as-limits-wording-and-underwriting-models-shift-565329.aspx)
- **HUB International: AI risk and insurance:** https://www.hubinternational.com/products/proex/the-advocate/2025/12/ai-risk-and-insurance/
- **Netskope 2025 Cloud and Threat Report (47% personal-account AI usage):** [The Hacker News coverage](https://thehackernews.com/2026/04/the-hidden-security-risks-of-shadow-ai.html)
- **IBM 2025 Cost of a Data Breach Report (shadow AI +$650K):** https://www.ibm.com/think/topics/shadow-ai

### Org design and the AI champions network
- **Citi 4,000+ AI Accelerators / 70%+ adoption:** [GitHub Resources](https://resources.github.com/enterprise/activating-internal-ai-champions/)
- **CSO: AI Champions Network success requirements:** https://www.csoonline.com/article/4080674/gen-ai-success-requires-an-ai-champions-network.html
- **BCG Rebuilding the Engineering Growth Ladder for an AI-First World:** https://www.bcg.com/x/the-multiplier/rebuilding-the-engineering-growth-ladder-with-ai
- **Modern engineering career ladders (Ledwith):** https://ledwith.tech/blog/2025/07/07/building-modern-engineering-career-ladders/

### The junior-pipeline question
- **Camille Fournier — Things I Currently Believe About AI and Tech Employment:** https://skamille.medium.com/things-i-currently-believe-about-ai-and-tech-employment-3e712df1dc51
- **GitHub: Junior developers aren't obsolete (in the age of AI):** https://github.blog/ai-and-ml/generative-ai/junior-developers-arent-obsolete-heres-how-to-thrive-in-the-age-of-ai/
- **Stack Overflow: AI vs Gen Z:** https://stackoverflow.blog/2025/12/26/ai-vs-gen-z/

### Quotable practitioners
- **Gergely Orosz — AI Tooling 2026 survey (Pragmatic Engineer):** https://newsletter.pragmaticengineer.com/p/ai-tooling-2026
- **Charity Majors — Honeycomb on engineering leadership in the AI era:** https://creators.spotify.com/pod/profile/galileoai/episodes/AI-Wont-Solve-Your-Toughest-Engineering-Problems--Honeycombs-Charity-Majors-e319rmo
- **Will Larson — lethain.com:** https://lethain.com/
- **Sean Goedecke — staff eng at GitHub on AI workflow:** https://newsletter.pragmaticengineer.com/p/shipping-projects-at-big-tech-with
- **Dario Amodei (Anthropic) on AI writing 90% of code:** https://www.entrepreneur.com/business-news/anthropic-ceo-predicts-ai-will-take-over-coding-in-12-months/488533

### 90-day playbook references
- **Stanford Digital Economy Lab — Enterprise AI Playbook (51 deployments, March 2026):** https://digitaleconomy.stanford.edu/app/uploads/2026/03/EnterpriseAIPlaybook_PereiraGraylinBrynjolfsson.pdf
- **Baytech Consulting 90-day AI roadmap:** https://www.baytechconsulting.com/blog/enterprise-ai-implementation-plan-90-day-roadmap
- **Particle41 CTO priorities first 90 days:** https://particle41.com/insights/cto-priorities-first-90-days-ai-transformation/
- **Coder to CTO — AI coding tools guide 2026:** https://codertocto.com/insights/2026/04/cto-guide-ai-coding-tools/

---

## Summary of unverified or flagged items

A handful of citations couldn't be verified to a primary source during the verification pass, or were flagged for misleading framing in the source guide. Listed here for transparency.

| Item | Issue |
|---|---|
| Atlassian "59% shipped code they didn't understand" | Likely misattributed — the figure traces to Clutch.co's June 2025 survey of 800 software professionals, not Atlassian. |
| McKinsey Feb 2026 (4,500 devs / 46% routine coding reduction) | Found only via secondary coverage; no direct McKinsey URL located. |
| Georgia Tech Vibe Security Radar | Verified via secondary coverage (Futurity, Brightcast); direct project URL not surfaced. |
| MSR 2026 `.cursorrules` paper | Specific paper not located; closest match is Galster et al. arXiv:2602.14690. |
| EU AI Act "full effect Feb 2026" | Misleading phrasing — Feb 2026 is a Commission guidelines deadline, not full applicability (which is Aug 2, 2026). |
| GitHub "51% of code is AI" | No primary GitHub publication located this pass — could be an executive talk or blog. |
| Gartner +1,445% multi-agent inquiries | No primary Gartner publication located this pass. |
| FTC "AI wrote it" defense doesn't exist | No specific FTC publication located. Verify against ftc.gov/business-guidance/. |
| Martin Fowler / Birgitta Boeckeler quotes | Direct source URLs not located; verify on martinfowler.com / Thoughtworks publications before quoting externally. |
