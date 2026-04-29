---
title: Regulation & Policy
summary: EU AI Act, FTC guidance, and why "the AI wrote it" is not a legal defense. The compliance landscape every team writing AI-generated code should know about.
tags: [security, regulation, compliance, eu-ai-act, ftc]
related:
  - ./threat-landscape.md
  - ./defenses.md
  - ../08-team-and-adoption/risk-governance-policy.md
last_updated: 2026-04-27
---

# Regulation & Policy

The legal context is moving faster than most teams realize. Two key facts to anchor on:

1. **You are legally responsible for code your AI generates.** There is no "the AI wrote it" defense.
2. **The EU AI Act is now enforceable**, and AI coding pipelines whose output lands in safety-critical contexts inherit the high-risk regime.

For the policy frame and template artifacts, see [Risk, governance, policy](../08-team-and-adoption/risk-governance-policy.md) in the adoption folder.

## EU AI Act

The [EU AI Act (Regulation 2024/1689)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng) is the world's first comprehensive AI law. Key dates relevant to AI coding tools:

- **February 2025.** Prohibited-use rules took effect (social scoring, manipulative AI, etc.).
- **August 2025.** General-purpose AI model rules took effect for foundation-model providers.
- **February 2026.** The European Commission published guidelines clarifying the high-risk classification (Article 6 + Annex III). AI coding tools are not high-risk by themselves, but **AI coding pipelines whose output is used in Annex III-listed contexts** (medical devices, transportation, critical infrastructure, employment screening, law enforcement, etc.) inherit the high-risk obligations as part of the deployer's compliance posture.
- **August 2, 2026.** Full applicability of the high-risk regime arrives. After this date, providers and deployers of high-risk AI systems must be in compliance.

What "high-risk" means for coding tools in practice: the classification is **use-case-driven**, not tool-driven. If your AI coding pipeline produces a recipe app, you are not in the high-risk regime. If it produces flight-control software, code in a medical device, or screening logic for hiring, you are, regardless of which AI coding tool you used. The obligations attach to you as the deployer, not just to the model provider.

Concrete obligations to plan for:

- **Risk management system.** Documented identification and mitigation of risks introduced by AI in your build process.
- **Data governance.** Provenance and quality controls for training data the system relies on (relevant if you fine-tune on internal code).
- **Technical documentation,** including the AI's role in producing the deployed software.
- **Logging and traceability.** Auditable trail of which AI-generated commits landed in which release.
- **Human oversight.** Review and override capabilities at meaningful checkpoints, not just rubber-stamp approval.
- **Conformity assessment.** Third-party or self-assessment depending on the use case.

Most of this is achievable with disciplined engineering practice (signed commits, attested CI, mandatory PR review, immutable audit logs). It becomes painful if you discover the requirement *after* shipping a high-risk system without the audit trail.

For the full citation see [REFERENCES.md](../REFERENCES.md#eu-ai-act).

## FTC guidance (United States)

The US Federal Trade Commission has been clear in its 2025-2026 guidance: **companies bear full legal responsibility for AI-generated code quality and security.** The "AI wrote it" defense does not exist.

Practical implications:

- A breach caused by an AI-generated SQL injection is your breach, not the model provider's. Disclosure obligations attach to you.
- A consumer-facing product that ships AI-generated dark patterns or deceptive flows is your liability, regardless of whether a human reviewed every line.
- A claim you make about your product's capabilities ("secure by design", "AI-reviewed", "compliant with X") is a claim the FTC can hold you to. Don't claim you do AI-aware security review unless you actually do.

The FTC has signaled it will treat AI-generated harms as a substantive area of enforcement, not a novel defense category.

## Sector-specific regimes worth knowing

Beyond EU AI Act and FTC, three regimes that overlap with AI-generated code in production:

- **HIPAA (US healthcare).** AI-generated code touching protected health information needs the same Business Associate Agreement coverage and breach-notification machinery as any other code path. The Office for Civil Rights has not issued AI-specific guidance, but enforcement applies.
- **PCI-DSS (payment data).** AI-generated code in scope for cardholder data environments must meet the same secure SDLC requirements PCI-DSS v4.0 imposes on any other code path (the Requirement 6 family covers secure software development; verify the current section number against the live PCI Security Standards Council documents). Auditors will ask how AI-assisted commits are reviewed.
- **SOC 2 / ISO 27001.** Change management controls extend to AI-generated changes. Your SOC 2 report needs to reflect how AI participates in your SDLC, not pretend it doesn't.

Sector-specific regulators (FDA, FAA, EBA, FCA) are issuing AI-specific guidance at varying speeds. If your industry has one, assume it applies to your AI coding workflow even if the guidance doesn't mention coding tools by name.

## What this means in practice

A short list of things every team should be able to answer if asked by an auditor, regulator, or legal team:

1. **Which AI tools do your developers use, and on which projects?** (You should have an inventory.)
2. **What is your policy on AI use for security-critical code?** (See [Defenses](./defenses.md). There should be a written, enforced policy.)
3. **How is AI-generated code reviewed before merge?** (Standard PR review may be insufficient. Document the security-aware pass.)
4. **How is provenance tracked?** (Signed commits, CI-attested builds, audit-grade logs of which agent/model/commit produced what.)
5. **Who is accountable per repository for AI-generated security findings?** (CODEOWNERS, named owner per skill, named owner per AGENTS.md.)
6. **What happens when an AI tool you use changes its terms or breaks?** (Vendor risk, runbook for migration.)

If you can't answer these, you have a documentation gap before you have a technical gap.

## Where to go for the policy artifacts

The [Risk, governance, policy](../08-team-and-adoption/risk-governance-policy.md) page in the adoption folder ships:

- An Acceptable Use Policy template
- A STRIDE-flavored AI threat model
- A regulatory mapping table (EU AI Act articles ↔ engineering controls)
- An incident response runbook

Use those as a starting point and customize for your risk profile and jurisdiction.

## Related reading

- [The threat landscape](./threat-landscape.md), what the regulators are responding to
- [Defenses](./defenses.md), the practices that satisfy most of the obligations
- [Risk, governance, policy](../08-team-and-adoption/risk-governance-policy.md), the adoption-tier policy frame
- [REFERENCES.md](../REFERENCES.md), full citations for the regulations and reports
