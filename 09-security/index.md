---
title: 09 — Security
summary: AI-introduced vulnerabilities, supply chain risk, prompt injection, defenses, and the regulatory reality. The folder I most want you to read.
---

# Security

This folder is its own concern, separate from [08 — Quality](../08-quality/), because the failure modes are different. Quality issues slow you down. Security issues end up in disclosure letters. AI coding tools have made the second category measurably worse, and most teams haven't adjusted.

The numbers behind the move into a dedicated folder:

- 55% of AI-generated code is secure. 45% isn't. ([Veracode Spring 2026](https://www.veracode.com/blog/spring-2026-genai-code-security/))
- Mean vulnerabilities per codebase jumped 107% year-over-year. ([Black Duck 2026 OSSRA](https://www.blackduck.com/resources/analyst-reports/open-source-security-risk-analysis.html))
- Repositories with AI assistants exhibit materially higher rates of secret exposure than comparable repos without them. ([Apiiro research on AI-assisted PRs](https://apiiro.com))
- 1 in 5 production breaches is attributed to AI-generated code in vendor reporting (methodology varies; see [the threat landscape](./threat-landscape.md) for the caveat). ([Aikido](https://www.aikido.dev/state-of-ai-security-development-2026))
- Java fares worse than TypeScript or Python on AI-generated security defects per Veracode's data, what I call the **"Java security paradox"** in this guide. ([Veracode](https://www.veracode.com/blog/spring-2026-genai-code-security/))

If your team treats AI-generated code as if it has the same defect distribution as human-written code, you are operating on a wrong prior.

## Read in order

1. [The threat landscape](./threat-landscape.md), what goes wrong, why AI is bad at security, and what the research actually says
2. [Defenses](./defenses.md), the practices, scanning, and review patterns that actually move the number
3. [Supply chain & prompt injection](./supply-chain.md), slopsquatting, package hallucination, malicious skills, prompt-injection attacks via tool output
4. [Regulation & policy](./regulation.md), EU AI Act, FTC guidance, why "the AI wrote it" defense doesn't exist

## What you should walk away believing

If you read nothing else:

- **Don't trust AI for auth, crypto, input validation, or permissions without explicit second-pass review.** The time saved on naive use isn't worth the risk. The disciplined version (AI drafts, you write the security boundary, separate-model review pass) does survive a deadline; see [defenses](./defenses.md).
- **Run Semgrep / Snyk / CodeQL on every PR.** Non-negotiable. The tools catch most of the obvious classes.
- **Run secret-scanning pre-commit AND in CI** ([gitleaks](https://github.com/gitleaks/gitleaks) / [detect-secrets](https://github.com/Yelp/detect-secrets) / [trufflehog](https://github.com/trufflesecurity/trufflehog)). The cheapest, highest-yield defense most teams aren't running.
- **Verify every dependency the AI suggests** before installing. Slopsquatting is a real attack now, not a theoretical one.
- **Audit any community skill before installing** with `skill-scanner` (published in [Sentry's skills repo](https://github.com/getsentry/skills) but product-agnostic; install standalone if you're not a Sentry user). Any skill can run shell commands; treat them like code review subjects, not blog posts.
- **At Java + SaaS or Java + Regulated, lean harder on Trail of Bits.** The Java security paradox is real and underappreciated.

## Where to go next

- See it cross-referenced into the team practice: **[12 — Risk, governance, policy](../12-adoption/risk-governance-policy.md)**
- See it as a review-discipline concern: **[03 — Review discipline](../03-effective-use/review-discipline.md)**
- Audit the skills you've installed: **[06 — Quality and anti-patterns](../06-skills/quality-and-anti-patterns.md)**
