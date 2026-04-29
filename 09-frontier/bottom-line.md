---
title: The Bottom Line
summary: Closing summary. Nine principles for using AI coding tools responsibly.
tags: [summary, conclusion, principles]
related:
  - ../
  - ./whats-coming.md
last_updated: 2026-04-25
---

# The Bottom Line

AI coding tools are transforming how software is built. The question isn't whether to use them. **It's how to use them responsibly.**

**[Understanding](../04-understanding-and-context/understanding-problem.md) matters, but differently.** You don't need to understand every line. You need to understand systems, behaviors, and failure modes. Level 1 and 2 understanding. Level 3 is optional for more code than before.

**[Spec-driven development](../05-workflows/spec-driven-development.md) is emerging as the standard.** Write specifications. Let AI implement. Review against the spec. Tools like GitHub Spec Kit, Amazon Kiro, and others are making this workflow concrete.

**[Context engineering](../04-understanding-and-context/context-engineering.md) is the new core skill.** Curating what the AI sees determines the quality of what it produces. This is becoming as important as the code itself.

**[Technical excellence](../07-quality-and-security/technical-excellence.md) matters more, not less.** AI generates mediocre code by default. You need the judgment to recognize mediocrity, the knowledge to catch security vulnerabilities, and the discipline to prevent technical debt.

**[Security](../07-quality-and-security/threat-landscape.md) is a real problem.** 55% of AI-generated code is secure. That means 45% isn't. AI introduces the same vulnerabilities as junior developers, but at scale. Scan everything. Verify dependencies. Review systematically.

**[Agents](../05-workflows/agents.md) are getting more autonomous.** Automations, auto mode, computer use. The trend is toward agents that act without being prompted. This is powerful and risky. The teams that figure out how to harness this safely will have an advantage.

**The skills that matter are shifting.** Less syntax and typing. More design, judgment, specification, and review. The implementation is faster. The thinking isn't.

**Horizontal concerns need explicit attention.** Observability, security, error handling. AI doesn't think about what you'll need at 2am when production breaks. Specify these explicitly in your specs and context files.

**The [research](./research-frontier.md) is ongoing.** Context engineering, multi-agent systems, formal verification, spec-driven workflows. The academic community is catching up to what practitioners are discovering.

**Stay curious.** The field is changing faster than anyone predicted. What's true today may not be true in six months. But the fundamentals, understanding, judgment, quality, will remain valuable.

## If you do five things from this guide

If everything above is too much and you want the actionable version, here are the five things that compound the most for the least effort:

1. **Pick one tool, pay for it, stop deliberating.** Indecision costs more than picking the "wrong" one. See [recommended setup](../02-tools/recommended-setup.md).
2. **Write an AGENTS.md in your repo root.** Even thirty lines. Iterate on it forever; the first version doesn't need to be good. See [the org-level template](../08-team-and-adoption/templates/agents-md-org-template.md).
3. **Set up the security floor.** Static analysis in CI, secret-scanning pre-commit, `skill-scanner` before any community skill. See [Defenses, Tier 1](../07-quality-and-security/defenses.md).
4. **Adopt spec-driven development for non-trivial work.** A 100-word markdown spec before the agent touches code. See [spec-driven development](../05-workflows/spec-driven-development.md).
5. **Run a separate-session security review pass on anything touching auth, deserialization, or external input.** Different session, ideally different model. See [the AI-vs-AI pattern](../07-quality-and-security/defenses.md#ai-vs-ai-review-a-separate-model-reviews-the-first-models-output).

The rest of the guide is the longer version of those five.

---

*Written April 2026, after two years of daily AI coding tool usage, many experiments, some failures, a lot of reading, and watching the field evolve in real time.*
