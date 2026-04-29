---
title: 07 — Quality & Security
summary: The two highest-stakes concerns of AI-generated code, treated together. Quality slows you down; security ends up in disclosure letters. The disciplines and worked examples that move the numbers.
---

# Quality & Security

Two co-equal concerns that this folder treats together because the disciplines overlap heavily — same review patterns, same spec-driven defenses, same "AI-vs-AI cross-session review" practice on either side. Quality issues slow your team down. Security issues end up in disclosure letters. AI coding has made the second category measurably worse, and most teams haven't adjusted.

The numbers behind the urgency:

- 55% of AI-generated code is secure. 45% isn't. ([Veracode Spring 2026](https://www.veracode.com/blog/spring-2026-genai-code-security/))
- Mean vulnerabilities per codebase jumped 107% year-over-year. ([Black Duck 2026 OSSRA](https://www.blackduck.com/resources/analyst-reports/open-source-security-risk-analysis.html))
- Repositories with AI assistants exhibit materially higher rates of secret exposure than comparable repos without them. ([Apiiro research on AI-assisted PRs](https://apiiro.com))
- 1 in 5 production breaches is attributed to AI-generated code in vendor reporting. ([Aikido](https://www.aikido.dev/state-of-ai-security-development-2026))
- Java fares worse than TypeScript or Python on AI-generated security defects (the **Java security paradox**). ([Veracode](https://www.veracode.com/blog/spring-2026-genai-code-security/))

## Quality side

The thesis: AI raises the cost of low quality more than it raises the cost of low velocity. The teams that win invest more in quality discipline as their generation rate goes up, not less.

- [Technical excellence in the AI age](./technical-excellence.md), why excellence matters more, not less
- [When things go wrong](./when-things-go-wrong.md), debugging AI-generated bugs, large-diff impact analysis, post-mortem patterns
- [AI for maintenance](./ai-for-maintenance.md), what AI does well on legacy code; what it still fails at

## Security side

If your team treats AI-generated code as if it has the same defect distribution as human-written code, you are operating on a wrong prior.

- [The threat landscape](./threat-landscape.md), what goes wrong, why AI is bad at security, the research data
- [Defenses](./defenses.md), the practices, scanning, and review patterns that actually move the number
- [Supply chain & prompt injection](./supply-chain.md), slopsquatting, malicious skills, prompt-injection via tool output, MCP risk
- [Regulation & policy](./regulation.md), EU AI Act, FTC, sector regimes, "the AI wrote it" defense doesn't exist

## What you should walk away believing

If you read nothing else in this folder:

- **Don't trust AI for auth, crypto, input validation, or permissions without explicit second-pass review.** The disciplined version (AI drafts, human writes the security boundary, separate-model review pass) survives a deadline; see [defenses](./defenses.md).
- **Run Semgrep / Snyk / CodeQL on every PR.** Non-negotiable.
- **Run secret-scanning pre-commit AND in CI** ([gitleaks](https://github.com/gitleaks/gitleaks) / [detect-secrets](https://github.com/Yelp/detect-secrets) / [trufflehog](https://github.com/trufflesecurity/trufflehog)).
- **Verify every dependency the AI suggests** before installing. Slopsquatting is a real attack now.
- **Audit any community skill before installing** with `skill-scanner`. Any skill can run shell commands; treat them like code review subjects, not blog posts.
- **At Java + SaaS or Java + Regulated, lean harder on Trail of Bits.** The Java security paradox is real and underappreciated.

## Where to go next

- Encode quality into team practice: **[08 — Team & Adoption](../08-team-and-adoption/)**
- Strengthen the upstream review pass: **[03 — Review discipline](../03-effective-use/review-discipline.md)**
- See it cross-referenced into adoption-level policy: **[12 — Risk, governance, policy](../08-team-and-adoption/risk-governance-policy.md)**
