---
title: Defenses
summary: What I actually do. What never to AI-generate, what to scan, what to verify, and how to set guardrails that survive a deadline.
tags: [security, defenses, scanning, review, guardrails]
related:
  - ./threat-landscape.md
  - ./supply-chain.md
  - ../03-effective-use/review-discipline.md
  - ../12-adoption/risk-governance-policy.md
last_updated: 2026-04-27
---

# Defenses

The threat landscape is depressing. The defenses are tractable. What follows is the practical "what I do" companion to [The threat landscape](./threat-landscape.md), the page I most want team leads to read.

## Tier 1: the non-negotiables

These are not opinions. They are the floor. Honest version, not the pious version: every developer I know uses AI on security-relevant code at least sometimes. The defenses below are what makes that survivable.

### 1. Treat AI-generated security-critical code as untrusted by default

The realistic policy isn't "never use AI for security code." That policy doesn't survive a deadline. The policy that *does* survive is:

- **Use AI to draft.** Auth flows, input validators, deserializers, crypto helpers are fine to scaffold with AI.
- **Hand-write the security boundary.** The actual decision points (does this user have access; is this input safe; is this token valid) get written or reviewed by hand. Don't let AI invent the boundary.
- **Run an explicit security review pass on the result.** A separate prompt to a separate session, ideally a different model, framed as a security engineer reviewing the diff. Not the generation session asked "is this secure?". Confidence-graded findings, blocking on High.

What "security-critical" includes that people forget:

- Anything that decides what data a user can see (authorization, not just authentication)
- Anything that parses untrusted input (request bodies, query strings, file uploads, message payloads)
- Anything that handles secrets (env vars, key derivation, JWT signing)
- Deserialization paths of any flavor (`pickle`, `ObjectInputStream`, Jackson with default typing, XStream)
- Anything generating SQL, shell commands, or HTML from variable input

The pattern that works: **AI generates, you read the security boundary line by line, a separate AI pass reviews as a security engineer, CI scanners catch what humans miss.**

### 2. Static analysis in CI on every PR

Semgrep, Snyk, or CodeQL: pick one and wire it into PR gates. The investment is small relative to the risk. You will catch SQL injection, hardcoded credentials, weak crypto, common deserialization mistakes, and most of the OWASP-top-10 patterns just from running the tool with default rules.

Honest about limits: scanners won't catch business-logic auth bugs (your authorization rules are codebase-specific), they have false-positive rates that produce alert fatigue if not tuned, and CodeQL specifically has a steep setup cost. Pick the lowest-friction option that runs on every PR. A less-thorough scan that *runs* beats a perfect scan that doesn't.

This tier scales with AI's code-generation speed. Human review does not.

### 3. Secret-scanning pre-commit AND in CI

The cheapest, highest-yield defense most teams don't run. Two layers:

- **Pre-commit:** [`gitleaks`](https://github.com/gitleaks/gitleaks), [`detect-secrets`](https://github.com/Yelp/detect-secrets), or [`trufflehog`](https://github.com/trufflesecurity/trufflehog) wired via `pre-commit` framework. Catches the leak before it ever lands in git history.
- **CI:** the same tool runs on every PR. Catches what bypasses the pre-commit hook (developers can disable hooks; CI cannot be disabled by the developer).

Plus: **scan your git history once.** Most teams have legacy secrets buried; flag and rotate them now before they show up in an incident report.

### 4. Verify every dependency before installing

Slopsquatting (covered in [Supply chain](./supply-chain.md)) is a real attack now. Before installing anything AI suggests:

- Confirm the package exists in the real registry, not just one that sounds plausible
- Check download counts and maintainer history. A 3-day-old package with 12 downloads is a yellow flag.
- Compare the suggested name against the actual canonical name (typosquatting still works)
- For internal/private registries: check that the name doesn't shadow a public package (dependency confusion)

For Regulated profiles, add **SBOM generation** (Syft, CycloneDX) and **supply-chain attestation** (SLSA, in-toto) on top of the verification habit. Auditors will eventually ask for both.

### 5. Scan installed skills before using them

Anthropic's skill system is powerful precisely because skills can run shell commands. That's a feature, but it's also a remote-code-execution surface waiting for a bad actor. Use [Sentry's `skill-scanner`](https://github.com/getsentry/skills) to audit any community skill before you install it. The ToxicSkills research demonstrated the attack class is real, not theoretical. See [Quality and anti-patterns](../06-skills/quality-and-anti-patterns.md) for the reproducible cases.

This is mandatory for any non-hobby project and especially for anything customer-facing.

### 6. Run agents in sandboxed or restricted modes where available

Modern AI coding tools ship sandbox modes that constrain what the agent can actually do without explicit approval. Use them:

- **Claude Code:** permission modes constrain shell, file-write, and network access; the safest mode requires per-action approval.
- **Cursor:** restricted mode limits the agent to the workspace.
- **Codex CLI:** approval modes (`suggest` / `auto-edit` / `full-auto`). Pick the most restrictive that lets you actually work.

Default to the most restrictive mode that's tolerable. Loosen it deliberately, not by accident. The sandbox is your last line of defense against prompt-injection attacks (see [supply chain](./supply-chain.md)). If it's wide open, those attacks have full reach.

## Tier 2: practices that compound

Once the floor is in place, these are what move the number on real projects.

### Spec-driven security (the highest-leverage Tier 2 practice)

Specs are a security control. If your spec doesn't mention security, the agent will not include security. The single highest-leverage security practice I've adopted: **make security requirements first-class in the spec, alongside functional requirements.**

Concrete spec lines I now include by default:

- "All endpoints must enforce authn/authz before invoking business logic; show the middleware in the diff"
- "All public methods must validate input against the schema; reject unknown fields"
- "All errors must return a generic message to the client; the detailed error goes only to logs with a correlation ID"
- "All database queries must be parameterized; flag any string concatenation in the diff"
- "Never use `pickle` / `ObjectInputStream` / Jackson default typing for untrusted input"
- "Every secret read goes through the config layer, never `process.env.X` inline"
- "Every outbound HTTP call from user-controlled URL goes through the SSRF allowlist"

These read as obvious in a security review. They are not obvious to a model generating code, and the model will skip them silently if you don't say them. See [05 — Spec-driven development](../05-workflows/spec-driven-development.md) for the broader workflow this fits into.

### AI-vs-AI review (a separate model reviews the first model's output)

The pattern that has materially raised my catch rate: **after generating code with one model in one session, run a focused security review pass with a different model in a different session**, ideally a different model family entirely. The reviewer doesn't share the generator's context, so it doesn't share the generator's blind spots.

A reviewer prompt I use:

> *"You are a senior security engineer reviewing a PR. The diff is below. Look specifically for: injection risks (SQL, shell, HTML), missing authorization checks, secrets handling violations, deserialization paths, unvalidated input, SSRF, race conditions, missing rate limits. Grade each finding High / Medium / Low confidence. Block-level High findings; flag Medium for human review; ignore Low for triage."*

Why a different model: same training data ≈ same blind spots. Cross-family review (e.g., generate with Claude, review with GPT or Gemini) catches systematic biases the same model would have missed in self-review. This is one place where multi-vendor isn't paranoia. It's a real defense.

This is not a substitute for the scanner. The scanner catches patterns; the review catches *missing* checks the scanner can't see. They catch different things and you want both.

### Use confidence-graded findings

Don't accept "this looks fine" from an agent doing security review. Use Trail of Bits-style confidence grading: every finding gets High / Medium / Low confidence. Grading forces the model to commit to a position rather than hedging, and surfaces uncertainty cleanly for humans to triage.

### Periodic external review

For any startup or team handling sensitive data, an external review periodically (annually at minimum, quarterly if regulated) catches things internal review misses. AI-generated code creates blind spots specifically because the team that wrote it sometimes didn't read it carefully.

### Worked example: the security review pass on a real auth endpoint

Here's a recent diff the agent gave me for a "rate-limited password-reset endpoint." It looked fine. The functional review approved it. The security review pass (a separate Claude session, no shared context, prompted as the security-engineer review prompt above) returned three findings, one High.

**The diff (abridged):**

```python
@app.post("/auth/password-reset")
async def password_reset(req: ResetRequest, request: Request):
    user = await db.users.find_one({"email": req.email})
    if not user:
        return {"ok": True}  # don't leak whether email exists

    rate_key = f"pwreset:{req.email}"
    count = await redis.incr(rate_key)
    if count == 1:
        await redis.expire(rate_key, 3600)
    if count > 5:
        return {"error": "rate_limited"}, 429

    token = secrets.token_urlsafe(32)
    await db.reset_tokens.insert_one({
        "user_id": user["_id"],
        "token": token,
        "expires_at": datetime.utcnow() + timedelta(hours=1),
    })
    await send_reset_email(user["email"], token)
    return {"ok": True}
```

**What the security review pass returned:**

> *Three findings. One High, two Medium.*
>
> *1. **High confidence: rate-limit key allows enumeration bypass.** The rate-limit key is `pwreset:{email}` — keyed on the email the attacker submits. An attacker can rotate emails freely; rate-limiting per-email means there's effectively no limit on total requests an attacker can issue. To slow down enumeration and email-bombing, also rate-limit per-source-IP (and consider a global rate limit). Recommended: add `pwreset_ip:{ip}` keyed at a stricter limit than `pwreset:{email}`.*
>
> *2. **Medium confidence: token storage is unhashed.** The reset token is stored verbatim in `db.reset_tokens.token`. If the database is dumped or read by an attacker (read-only DB compromise, backup leak, log capture), every active reset token becomes usable. Hash with a fast HMAC at insert time and compare against the hash on consumption.*
>
> *3. **Medium confidence: no replay protection on token consumption.** The diff doesn't show the consumption side, but tokens should be single-use (deleted or marked-consumed atomically on first use). If consumption isn't atomic, a token can be redeemed twice in a race.*

**What I did:** all three were real. I'd missed the rate-limit-key issue completely on my own pass. The token-hashing one I'd been meaning to do. The replay-protection one was caught further along the diff (the consumption code did handle it, but the review correctly flagged that it wasn't visible from this diff slice).

**The lesson:** the *generator* session would not have caught the rate-limit-key issue if I'd asked it "is this secure?" because the same training-data biases that produced the bug also produce its rationalization. Cross-session review with a different model (I used Claude here for both, but a different session is the load-bearing part; cross-family is even better) catches what self-review misses. This pattern has caught real defects on every project I've used it on; it is the single highest-leverage Tier 2 practice on this page.

## Tier 3: stack-specific tooling

### Trail of Bits skills

[Trail of Bits' skills repo](https://github.com/trailofbits/skills) is the most serious security skill collection in the ecosystem: methodology over checklist, confidence-graded findings, variant-analysis, semgrep rule creation. Mandatory at Regulated risk profiles. Strongly recommended at SaaS for Java specifically (the Java security paradox makes Java teams need it more than they think).

### `code-review` and `skill-scanner` (published by Sentry, product-agnostic)

These two skills live in [Sentry's skills repo](https://github.com/getsentry/skills) but neither requires using Sentry as your error monitoring vendor. `code-review` catches the boring high-frequency stuff at PR time. `skill-scanner` audits the skills you're about to install.

Install patterns:
- **If you don't use Sentry's product:** install each skill standalone via git clone; don't install the full `sentry-skills` plugin (it bundles Sentry-product-specific skills you won't use).
- **If you use Sentry's product:** install the full `sentry-skills` plugin — you'll also get the Sentry-flavored debugging and observability skills.
- **If you have your own commit conventions:** skip Sentry's `commit` skill and write `your-commit-conventions` instead.

### Java + SaaS or Java + Regulated

This combination warrants extra investment. Rough order of priority:

1. Trail of Bits skills installed and used on every PR touching auth/deserialization
2. A custom `your-spring-conventions` (or `your-quarkus-conventions` etc.) skill with the Java security paradox section made mandatory
3. CodeQL or Semgrep with Java rule packs. Java's tooling is mature; use it.
4. Manual review of every reflection, deserialization, and class-loading path

The cost looks high. The cost of a Veracode-style finding shipping to production looks higher.

## What "good" looks like at each maturity level

Lifted from the [Maturity model](../12-adoption/maturity-model.md), specialized for security:

- **L0-1 (no AI policy):** at least one CI scanner running on every PR; no AI use for auth; no skills installed without `skill-scanner` audit
- **L2 (early adoption):** above plus dependency-verification habit; security review pass on every AI PR; AGENTS.md includes the security do-not-AI list
- **L3 (org-wide):** above plus named security owner per repo; quarterly external review; `your-X` security skills authored and committed; mandatory skill-scanner in CI for any new community skill
- **L4-5 (platform stage):** above plus threat-modeling integrated with spec-driven workflow; security skills versioned alongside infra-as-code; security findings auto-routed to ticketing; SLA on time-to-fix critical findings

## Related reading

- [The threat landscape](./threat-landscape.md), what you're defending against
- [Supply chain & prompt injection](./supply-chain.md), the second-order risks
- [Review discipline](../03-effective-use/review-discipline.md), security is a review discipline first
- [Risk, governance, policy](../12-adoption/risk-governance-policy.md), the policy frame for these defenses
