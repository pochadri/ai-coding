# Custom skill templates

Loaded on demand by `skill-recommender` when generating the "write these yourself"
recommendations. Each template is a complete starter `SKILL.md` scaffold the user can fork.

> Convention: every recommended custom skill is named `your-X` so it's clear which entries
> are templates the user must fill in. The user should rename to `[org]-X` (e.g.,
> `acme-design-system-conventions`) when they author it.

---

## Project-type-driven templates

### `your-design-system-conventions` (Frontend)

```markdown
---
name: your-design-system-conventions
description: |
  Use this skill when generating any frontend code (React, Vue, Svelte, etc.) to ensure
  it matches our design system: components, spacing, typography, color usage, and copy
  voice. Triggers: "create a [page/component]", "add a [button/form/modal]",
  "style this", "make it match our design".
license: MIT
---

# Your design system conventions

## Components
- Use `<Button>` from `[path/to/components]`. Variants: primary, secondary, ghost.
  Never inline button styles.
- [List your atomic component inventory]

## Spacing
- Spacing scale: [4, 8, 12, 16, 24, 32, 48, 64] px. Don't use values outside this scale.
- [Padding conventions, gap conventions]

## Typography
- Font family: [your stack]. Never override.
- Size scale: [12, 14, 16, 20, 24, 32, 48], use the type ramp, not arbitrary sizes.

## Color
- Use semantic tokens (`color.text.primary`, not `#1a1a1a`). Tokens live in `[path]`.
- Brand color: `[hex]`. Never use AI-default purple gradients.

## Copy voice
- [Your voice guidelines, friendly/formal, sentence-case headings, oxford-comma policy,
  exclamation-point allergy, etc.]

## Gotchas
- [Add as you find them, patterns AI keeps missing]
```

### `your-api-contract-style` (Backend)

```markdown
---
name: your-api-contract-style
description: |
  Use this skill when designing or implementing any API endpoint. Enforces our
  conventions for naming, error envelopes, pagination, versioning, and status codes.
  Triggers: "add an endpoint", "create an API", "fix the response shape", "design a route".
license: MIT
---

# Your API contract style

## Naming
- REST: nouns for resources, verbs only for actions (`POST /users` for create,
  `POST /users/:id/archive` for action). Plural collection names.
- [Your specific conventions]

## Error envelope
- All errors return: `{ error: { code: string, message: string, details?: object,
  correlation_id: string } }`
- Use `[your AppError class]`, not raw throws.
- [List your error codes]

## Pagination
- Cursor-based by default: `?cursor=<opaque>&limit=<n>`. Never `?page=`/`?offset=`.
- Max page size: [N].

## Versioning
- Major version in path (`/v1/`). Minor versions via headers.
- [Your deprecation policy]

## Status codes
- [Your conventions for 4xx vs 5xx, when to return 422 vs 400, etc.]

## Gotchas
- [Common AI mistakes specific to your API]
```

### `your-feature-shape-template` (Full-stack)

```markdown
---
name: your-feature-shape-template
description: |
  Use this skill when implementing any new feature end-to-end. Defines how features
  are wired in our codebase: route → handler → service → DB. Triggers: "add a feature",
  "implement [feature name]", "create the [X] flow", "wire up [Y]".
license: MIT
---

# Your feature shape template

## File layout
A typical feature `feature-x` lives at:
- `routes/feature-x/route.ts` — HTTP layer, minimal logic
- `services/feature-x/service.ts`, business logic
- `db/queries/feature-x.ts` — DB queries
- `tests/feature-x/`, colocated tests

## Layer responsibilities
- **Route:** parsing, validation, authn/authz, calls service, formats response
- **Service:** all business logic; uses queries; returns plain data
- **Queries:** raw DB access; no business logic; never imports from services/

## Common patterns
- [How you handle pagination across layers]
- [How you handle transactions]
- [How you handle background jobs vs sync]

## Gotchas
- [The specific mistakes AI makes when scaffolding features in your codebase]
```

### `your-platform-targeting-rules` (Mobile)

```markdown
---
name: your-platform-targeting-rules
description: |
  Use this skill when writing any mobile code. Enforces our minimum OS versions,
  accessibility baselines, dark-mode and dynamic-type support. Triggers: "add a screen",
  "implement [mobile feature]", "create the [X] view".
license: MIT
---

# Your platform targeting rules

## Min versions
- iOS: [version]. Android: [API level].
- React Native: [version range].

## Accessibility (always)
- All interactive elements have `accessibilityLabel`.
- Min touch target: 44x44pt iOS / 48x48dp Android.
- [Your contrast/screen-reader requirements]

## Dark mode
- Use semantic colors (`color.background`, `color.text`), not hard-coded hex.
- Test both modes; never ship without dark variant.

## Dynamic type
- Support font scaling [N]% to [M]%. Test with largest accessibility size.

## Gotchas
- [Platform-specific behaviors AI gets wrong in your codebase]
```

### `your-iac-conventions` (Infra)

```markdown
---
name: your-iac-conventions
description: |
  Use this skill when writing or modifying any Terraform / Pulumi / OpenTofu code.
  Enforces our module layout, naming, tagging, and state-management rules. Triggers:
  "add infra for [X]", "create a [resource]", "modify the [module] module".
license: MIT
---

# Your IaC conventions

## Module layout
- One module per logical resource group at `modules/[name]/`.
- Each module: `main.tf`, `variables.tf`, `outputs.tf`, `versions.tf`, `README.md`.

## Naming
- Resources: `[env]-[service]-[resource]-[purpose]` (e.g., `prod-api-rds-primary`).
- Modules: `[provider]-[function]` (e.g., `aws-api-stack`).

## Tagging (mandatory)
- Every resource: `Environment`, `Service`, `Owner`, `CostCenter`.
- [Any compliance tags]

## State management
- One state file per environment per service. Never share state across services.
- Backend: [your remote state config].
- [Locking, encryption requirements]

## Gotchas
- [The specific TF mistakes AI makes, count vs for_each, lifecycle blocks, etc.]
```

### `your-schema-evolution-pattern` (Data)

```markdown
---
name: your-schema-evolution-pattern
description: |
  Use this skill when proposing or implementing any schema change (DDL, migration,
  backfill). Enforces our zero-downtime / backward-compatibility policy. Triggers:
  "add a column", "change the schema", "create a migration", "backfill [data]".
license: MIT
---

# Your schema evolution pattern

## The cardinal rule
Schema changes happen in three deploys, never one:
1. **Add the new shape** (NULL-able column, new table), code reads old or new
2. **Backfill data**: separate job, idempotent, observable
3. **Switch reads + drop old**: only after backfill is verified

## Migration framework
- We use [tool]. Migrations live in `[path]`.
- [Naming convention, ordering rules]

## Forbidden in one deploy
- DROP COLUMN
- RENAME COLUMN
- Change column type without compatibility shim
- ALTER TABLE on tables > [N] rows during business hours

## Backfill jobs
- Always idempotent. Re-running must be safe.
- Always observable: emit progress metrics.
- [Your backfill framework / pattern]

## Gotchas
- [The specific data-migration mistakes AI makes]
```

### `your-prompt-template-conventions` (Voice)

```markdown
---
name: your-prompt-template-conventions
description: |
  Use this skill when writing or modifying any voice agent prompt. Enforces our
  system prompt structure, tool definition style, and turn-taking conventions.
  Triggers: "create a voice agent", "modify the agent prompt", "add a tool to [X]".
license: MIT
---

# Your prompt template conventions

## System prompt structure
1. Identity (who the agent is)
2. Capabilities (what it can do)
3. Constraints (what it MUST NOT do)
4. Conversation style (turn-taking, interruption handling, ambiguity resolution)
5. Tool list (described separately, never inline)

## Tool definitions
- One tool, one job. No multi-purpose tools.
- Description starts with verb, includes when to use *and* when NOT to use.
- [Your max-args, naming conventions]

## Turn-taking
- [Your interruption handling]
- [Your silence handling]
- [Your fallback behavior on tool failure]

## Gotchas
- [Voice-specific patterns AI tends to miss]
```

### `your-public-api-style` (Library)

```markdown
---
name: your-public-api-style
description: |
  Use this skill when designing or modifying any public API surface in the library.
  Enforces our backward-compat rules, documentation conventions, and breaking-change
  policy. Triggers: "add a public method", "deprecate [X]", "release a new version".
license: MIT
---

# Your public API style

## What's public
- Anything exported from `index.[ts|py|java]` is public. Anything internal lives in
  `_internal/` and is never exported.
- [Your public-vs-internal convention]

## Backward compatibility
- Major version bumps for breaking changes ONLY.
- Deprecations: 1 minor version warning + 1 major version removal.
- [Your specific deprecation tooling]

## Documentation
- Every public function has [JSDoc / docstring / Javadoc] with @param, @returns, @example.
- [Your README structure expectations]

## Versioning
- SemVer strictly.
- [Your release cadence and process]

## Gotchas
- [Library-specific patterns, mutation vs return, async vs sync conventions]
```

---

## Stage-driven templates

### `your-feature-flag-pattern` (MVP)

```markdown
---
name: your-feature-flag-pattern
description: |
  Use this skill when adding any new feature behind a flag, modifying flag state,
  or planning flag cleanup. Triggers: "feature flag", "behind a flag", "[feature]
  is shipping", "flip [X] on/off".
license: MIT
---

# Your feature flag pattern

## Tool
We use [LaunchDarkly / Unleash / homegrown]. SDK lives at `[path]`.

## Naming
`[team]-[feature]-[date]` (e.g., `auth-passkey-202604`). Date helps with cleanup audits.

## Defaults
- New flags default OFF in prod, ON in staging.
- [Your environments and their defaults]

## Cleanup
- Every flag has an expiration date in [tracking system].
- Cleanup PR removes flag check + dead branch.

## Gotchas
- [Common flag mistakes, race conditions, default behavior on flag-service outage]
```

### `your-incident-runbook-skeleton` (Growth-stage)

```markdown
---
name: your-incident-runbook-skeleton
description: |
  Use this skill when responding to an active incident or writing a postmortem. Mirrors
  our IR process: detect → contain → investigate → remediate → comms → learn. Triggers:
  "incident", "outage", "postmortem", "PIR", "RCA".
license: MIT
---

# Your incident runbook skeleton

## Detect
- Sources we monitor: [list]. P1 escalation criteria: [list].

## Contain
- [Your contain-first playbook]

## Investigate
- [Where logs live, how to query, our forensics conventions]

## Remediate
- [Your rollback procedure, hotfix policy]

## Comms
- Internal cadence: [every X min for P1].
- External cadence: [your status-page conventions].

## Learn
- Postmortem template at [path]. Blameless. Action items get owners + dates.

## Gotchas
- [Common incident-handling mistakes specific to your stack]
```

### `your-deprecation-process` (Mature)

```markdown
---
name: your-deprecation-process
description: |
  Use this skill when sunsetting any code path, API, or feature. Enforces our
  deprecation timeline, comms requirements, and removal checklist. Triggers:
  "deprecate", "sunset", "remove [old X]", "migrate off [Y]".
license: MIT
---

# Your deprecation process

## Timeline
- Announcement: T+0
- Customer comms: T+0 (internal docs), T+30 days (external)
- New-use disabled: T+90 days
- Removal: T+180 days
- [Adjust to your reality]

## Required artifacts
- Deprecation notice in [docs path]
- Migration guide
- Code-level deprecation annotations
- [Your tracking dashboard / metric]

## Communication
- Internal: [channel, cadence]
- External: [docs, email, in-app banner]

## Removal checklist
- [ ] Migration guide published 90+ days ago
- [ ] Usage telemetry shows < [threshold]% remaining
- [ ] All known external customers notified
- [ ] Removal PR includes rollback plan

## Gotchas
- [Common patterns AI misses, orphaned consumers, internal-only deps]
```

### `your-codebase-archeology-prompts` (Legacy)

```markdown
---
name: your-codebase-archeology-prompts
description: |
  Use this skill when investigating ancient code in this codebase. Tells the agent how to
  ask the right questions, where to look for context, and which patterns to recognize.
  Triggers: "what does [old code] do", "investigate [legacy module]", "why is [X] this way".
license: MIT
---

# Your codebase archeology prompts

## Where context lives
- Architecture decisions: [path to ADRs]
- Historical incident reports: [path]
- Tribal knowledge wiki: [URL]
- Deprecated-but-still-running modules: [list]

## How to investigate
1. Check git log for the file: `git log --oneline --follow [file]`
2. Look for the original PR (often in commit message)
3. Check linked tickets / ADRs / incident reports
4. Ask whoever wrote it (use `git blame`)

## Patterns specific to this codebase
- [The "we did X for historical reason Y" patterns AI keeps missing]
- [Modules deprecated but still depended on by legacy clients]

## Gotchas
- [Things that look like dead code but aren't]
- [Things that look like bugs but are intentional workarounds]
```

---

## Risk-driven templates

### `your-data-classification-rules` (Internal tool)

```markdown
---
name: your-data-classification-rules
description: |
  Use this skill when handling any data, designing schemas, building APIs, writing
  integrations. Enforces our data classification levels (Public, Internal, Confidential,
  Restricted) and which AI tools can see which class. Triggers: "store [data]",
  "send [data] to [vendor/AI]", "log [data]".
license: MIT
---

# Your data classification rules

## Classes
| Class | Examples | Allowed in AI tool? |
|---|---|---|
| Public | Marketing copy, public docs | All approved tools |
| Internal | Source code, internal docs | Approved tools with ZDR |
| Confidential | Financials, customer lists | First-party only, ZDR mandatory |
| Restricted | PII, payment data, secrets | Never in AI tools |

## Patterns to enforce
- Never paste customer data into ChatGPT / personal Claude / etc.
- Always check class before sending fixtures to an AI tool.
- [Your specific data flows and where they cross AI boundaries]

## Gotchas
- [Edge cases, anonymized data that's still re-identifiable, etc.]
```

### `your-tenant-isolation-pattern` (SaaS)

```markdown
---
name: your-tenant-isolation-pattern
description: |
  Use this skill when writing any code that touches tenant-scoped data. Enforces our
  isolation boundaries, query scoping, cache keys, log redaction. Triggers: "query
  [tenant data]", "add [tenant feature]", "fix the [scoped X]".
license: MIT
---

# Your tenant isolation pattern

## Query scoping
- Every query touching tenant data MUST include `tenant_id = :current_tenant`.
- We use [framework / pattern] to enforce this. Bypass requires [approval].

## Cache keys
- All cache keys prefixed with `[env]:[tenant_id]:`. Never share cache across tenants.

## Logs
- Tenant ID is a structured field (`tenant_id`), not in the message body.
- PII is redacted before logging, use `[your logger's redaction]`.

## Auth boundaries
- Cross-tenant access requires explicit `is_admin` check + audit log entry.
- [Your specific cross-tenant operations]

## Gotchas
- [Common isolation leaks, joined queries, async jobs, exports]
```

### `your-audit-trail-fields` (Regulated)

```markdown
---
name: your-audit-trail-fields
description: |
  Use this skill when writing any code that creates, modifies, or accesses regulated
  data. Enforces our audit-log requirements, required fields, retention, immutability.
  Triggers: "add audit log", "modify [regulated data]", "compliance event".
license: MIT
---

# Your audit trail fields

## Required fields (every audit entry)
- `event_id` (UUID v4)
- `event_type` (enum from [list])
- `actor.user_id`, `actor.role`, `actor.ip`
- `target.type`, `target.id`
- `before_state`, `after_state` (JSONB)
- `timestamp` (UTC, ms precision)
- `correlation_id` (links to request)
- `compliance_context` (e.g., `["HIPAA", "SOC2"]`)

## Retention
- [Your retention period, typically 7+ years for regulated data]
- Audit table is append-only; updates and deletes are forbidden at the DB level.

## Immutability
- Audit table has [your tamper-evidence pattern, write-once trigger, hash chain, etc.]

## Gotchas
- [Common audit-log mistakes, missing actor for system events, dropped events under load]
```

---

## Java framework templates

Pick the one matching the user's Phase 1 Java framework follow-up. **Spring is the
dominant default**, if the user didn't specify, use `your-spring-conventions`.

The "Java security paradox" section is mandatory in all four variants: Veracode found
AI is *worse* on Java security than on TS/Python (auth flows, deserialization, and
reflection paths need extra human review).

### `your-spring-conventions` (Java — Spring / Spring Boot, default)

```markdown
---
name: your-spring-conventions
description: |
  Use this skill when writing any Spring (or Spring Boot) code. Enforces our package
  layout, annotation usage, transaction boundaries, and bean wiring conventions.
  Triggers: any code change in Java/Spring source files; "add a [controller/service/
  repository]", "wire up [X]".
license: MIT
---

# Your Spring conventions

## Package layout
- Top-level: `com.[org].[service]`
- Subpackages: `controller/`, `service/`, `repository/`, `model/`, `config/`, `exception/`
- One feature per package; never one giant `services` package with 200 classes.

## Annotation usage
- Prefer constructor injection (`@RequiredArgsConstructor` from Lombok or manual
  constructor). Never `@Autowired` fields.
- `@Service` for business logic. `@Repository` for DB. `@Component` only when nothing
  else fits.

## Transaction boundaries
- `@Transactional` on the service layer, NEVER on the controller or repository.
- Read-only by default: `@Transactional(readOnly = true)` unless writing.

## Bean wiring
- Use `@Configuration` classes; avoid XML.
- One config per concern (`DatabaseConfig`, `SecurityConfig`, `WebConfig`).

## Spring Boot specifics
- [Your version, profile conventions, property file structure]

## Java security paradox, extra-careful zone
- AI is *worse* on Java security than on TS/Python (per Veracode).
- Auth/authz code: *always* human-reviewed; AI may suggest patterns from 2010-era Java
  that bypass Spring Security defaults.
- Deserialization: never trust AI suggestions involving Jackson, XStream, or Java
  serialization without security review.

## Gotchas
- [Specific bean/config mistakes AI makes in your codebase]
- [Spring version-specific deprecations AI keeps suggesting]
```

### `your-quarkus-conventions` (Java — Quarkus)

```markdown
---
name: your-quarkus-conventions
description: |
  Use this skill when writing any Quarkus code. Enforces our extension choices, native
  vs JVM build conventions, CDI usage, and reactive vs imperative endpoint style.
  Triggers: any code change in `src/main/java/`; "add a [resource/service]",
  "wire up [X]", "make this reactive", "add a Quarkus extension".
license: MIT
---

# Your Quarkus conventions

## Build mode (native vs JVM)
- Default: [native | JVM]: pick one and document why.
- If native: never add reflection-heavy libraries without `@RegisterForReflection`.
- Profile-specific config in `application-{prod,dev,test}.properties`, never inline.

## Extension policy
- Only extensions in our approved list: [list yours]. New extensions need PR review —
  they affect native image size and startup.
- Prefer `quarkus-rest` over `quarkus-resteasy-classic` for new code.

## Endpoint style
- Reactive (`Uni<T>` / `Multi<T>`) for I/O-bound paths.
- Imperative for simple CRUD; don't reactive-ify just because Quarkus supports it.
- Never mix blocking and reactive in the same endpoint without `@Blocking`.

## CDI usage
- Constructor injection only; never `@Inject` on fields.
- `@ApplicationScoped` for stateless services. `@RequestScoped` only when truly needed
  (it's a perf trap if overused on hot paths).

## Persistence
- [Hibernate ORM with Panache | reactive Panache | jOOQ, pick one and document]
- Transactions: `@Transactional` on the service layer, never on the resource.

## Java security paradox, extra-careful zone
- AI is *worse* on Java security than on TS/Python (per Veracode).
- Auth/authz: always human-reviewed; Quarkus Security defaults differ from Spring's —
  AI may suggest Spring patterns that don't apply.
- Native-image deserialization: extra dangerous — Jackson/JSON-B paths must be reviewed.

## Gotchas
- [Native-build failures AI keeps causing, reflection, dynamic class loading, etc.]
- [Extension version drift AI suggests]
```

### `your-micronaut-conventions` (Java — Micronaut)

```markdown
---
name: your-micronaut-conventions
description: |
  Use this skill when writing any Micronaut code. Enforces compile-time DI conventions,
  AOT vs runtime trade-offs, declarative HTTP client usage, and our config style.
  Triggers: any code change in Micronaut source files; "add a [controller/client/
  bean]", "wire up [X]".
license: MIT
---

# Your Micronaut conventions

## Compile-time DI mindset
- Micronaut wires at compile time, no runtime reflection needed for DI.
- Don't pull in Spring patterns that assume runtime proxying. AOT will silently break.
- Use `@Singleton` (not `@Component`); `@Factory` for complex wiring.

## Configuration
- `application.yml` per environment (`application-prod.yml`, etc.).
- Type-safe config via `@ConfigurationProperties` records, not raw `@Value`.

## HTTP clients
- Use `@Client` declarative interfaces, never write a manual HTTP client.
- One client interface per upstream service; group by domain, not by endpoint.

## Endpoint style
- `@Controller` returns POJOs (auto-serialized) or `HttpResponse<T>`.
- For reactive: `Mono<T>` / `Flux<T>` (Project Reactor); be consistent across the codebase.

## Build / native
- GraalVM native is a first-class target, every dependency added is checked against
  the native-build matrix in CI before merge.

## Java security paradox, extra-careful zone
- AI is *worse* on Java security than on TS/Python (per Veracode).
- Micronaut Security is *not* Spring Security — AI may suggest annotations or filters
  that look right but apply different defaults. Always human-review auth flows.
- Reflection-based libraries (e.g., Jackson custom deserializers) are doubly dangerous
  in native builds.

## Gotchas
- [AOT-incompatible patterns AI keeps suggesting]
- [Spring patterns that look right but break Micronaut DI]
```

### `your-java-package-structure` (Java, plain Java / no framework)

```markdown
---
name: your-java-package-structure
description: |
  Use this skill when writing any Java code in this codebase (no framework, plain JDK
  or library project). Enforces our package layout, module boundaries, build conventions,
  and dependency policy. Triggers: any code change in `src/main/java/`; "add a [class
  /module/package]"; "should this go in [package X or Y]".
license: MIT
---

# Your Java package structure

## Package layout
- Top-level: `com.[org].[product]`
- Subpackages by feature, not by layer (`user/`, `billing/`), not (`controllers/`,
  `services/`). Layer-by-feature ages better than feature-by-layer.
- Internal classes: `package-private` by default; `public` requires intent.

## Module boundaries (JPMS or Maven multi-module)
- One `module-info.java` (or one Maven module) per bounded context.
- `exports` only what's part of the public API. `requires transitive` is a contract —
  use sparingly.

## Build
- [Maven | Gradle, pick one]. Java toolchain version: [pin it].
- Plugins/dependencies versioned via [BOM | version catalog]. Never inline-version a
  dep in a sub-module.

## Dependency policy
- Bias toward the JDK. Adding a transitive heavyweight (e.g., Guava for one method) is
  a smell, file a PR-comment instead.
- For HTTP: `java.net.http.HttpClient` (JDK 11+) over Apache HttpClient unless there's
  a documented reason.

## Concurrency
- Virtual threads (Java 21+) for I/O-bound work. Platform threads only for CPU-bound or
  legacy code paths.
- Never spawn threads inline, use a named `ExecutorService` or `StructuredTaskScope`.

## Java security paradox, extra-careful zone
- AI is *worse* on Java security than on TS/Python (per Veracode).
- Deserialization (Jackson, ObjectInputStream, XStream): never trust AI suggestions
  without security review. Many AI-suggested deserialization patterns predate the
  serialization vulnerabilities of the late 2010s.
- Reflection: AI loves it; reviewers should be skeptical. Prefer `MethodHandles` or
  static dispatch.

## Gotchas
- [Specific patterns AI keeps suggesting that don't fit this codebase]
- [JDK version-specific APIs AI uses incorrectly]
```

---

## Quality templates

These are recommended at Growth and Mature stages. They capture what "good" means
for *this* codebase which is the highest-leverage thing AI keeps getting wrong.

### `your-test-quality-rules` (Quality, default)

```markdown
---
name: your-test-quality-rules
description: |
  Use this skill when writing or reviewing any tests in this codebase. Enforces what
  counts as a meaningful test here, naming, structure, coverage targets, and the
  patterns AI keeps generating that don't count. Triggers: "add tests for [X]",
  "write a test", "review test coverage", any new file under `tests/`, `__tests__/`,
  or `*.spec.*`.
license: MIT
---

# Your test quality rules

## Test framework
- [Pick: Jest / Vitest / Pytest / JUnit / Go test, name it and link to setup docs]
- Test files live at: [path convention; colocated vs separate folder]

## What counts as a meaningful test
- One assertion per behavior; multiple assertions per *test* are fine if they're
  about one logical outcome.
- Test the contract, not the implementation. If refactoring changes the test, the
  test was testing the wrong thing.
- Edge cases must be covered: empty, null, max-size, off-by-one, concurrent access,
  failure-mode of every external call.

## Coverage targets
- Service layer: [N]%, with branches.
- Routes / controllers: [N]%, with auth-failure paths.
- Repositories / queries: integration tests only, no mocks for DB layer.

## What AI keeps generating that DOESN'T count
- "Test that the function returns", without checking the return value matches anything.
- Snapshot tests for trivial render output (snapshots that nobody will ever read).
- Mocking the unit-under-test (mocking your own service, then "testing" the mock).
- Tests that pass even when the implementation is deleted (the test isn't testing it).

## Gotchas
- [Specific framework pitfalls AI keeps hitting in your codebase]
- [Async/await timing patterns AI gets wrong]
```

### `your-observability-baseline` (Quality, when AI code is hard to debug in prod)

```markdown
---
name: your-observability-baseline
description: |
  Use this skill when writing or reviewing any service code (route, service,
  background job, message handler). Enforces our logging / metrics / tracing
  conventions so production debugging is possible. Triggers: any new endpoint,
  service method, or background task; "add logging", "instrument [X]", "why is
  [Y] hard to debug".
license: MIT
---

# Your observability baseline

## Logging
- Library: [pick, pino / winston / structlog / slf4j / zap]. Never `console.log`
  in production code paths.
- Every log line: structured (JSON), with `correlation_id`, `user_id` (if present
  and non-PII-restricted), `service`, `method`.
- Levels: TRACE for inner-loop, DEBUG for normal path, INFO for state transitions,
  WARN for recoverable errors, ERROR for unrecoverable.
- Never log: secrets, tokens, full request bodies, full PII payloads.

## Metrics
- Latency histogram per endpoint / per outbound call.
- Error rate counter, broken down by error type.
- Business-meaningful counters: signups, conversions, etc.

## Tracing
- Every request gets a trace ID. Outbound calls propagate it via [header convention].
- Background jobs get their own trace, linked to the originating request via
  `parent_trace_id` if applicable.

## Patterns AI keeps missing
- Outbound HTTP calls with no timing metric.
- Caught-and-swallowed exceptions with no log line.
- Background jobs that succeed silently, no "job completed" INFO line.
- Retry loops with no metric on retry count.

## Gotchas
- [Library-specific instrumentation gotchas in your codebase]
```

### `your-horizontal-concerns` (Quality, for AI regressions in cross-cutting concerns)

```markdown
---
name: your-horizontal-concerns
description: |
  Use this skill when generating any new feature or reviewing any non-trivial PR.
  Enforces our cross-cutting concerns: accessibility, i18n, performance budgets,
  error handling, the things AI consistently forgets. Triggers: "implement [feature]",
  "add a [page/component/endpoint]", any PR touching user-visible code.
license: MIT
---

# Your horizontal concerns checklist

## Accessibility (always, never optional)
- All interactive elements have keyboard handlers AND screen-reader labels.
- Color contrast meets WCAG AA minimum.
- Focus order matches visual order.
- [Your specific a11y testing tool, axe, pa11y, etc.]

## Internationalization
- All user-visible strings go through [your i18n function]. Never hard-code.
- Date/number/currency formatting goes through locale-aware helpers.
- Right-to-left layouts must work; test with [`dir="rtl"`].

## Performance budgets
- [Page] LCP under [N]ms, INP under [N]ms.
- API endpoints under [N]ms p95.
- Bundle size budget per route: [N]kb gzipped.

## Error handling
- Every async path has explicit error handling, never bare `await` without try/catch
  or a `.catch()` at the call site.
- User-visible errors are generic; detailed errors go to logs with correlation ID.
- Retries are explicit and bounded; no infinite retry loops.

## Patterns AI keeps regressing
- Generates a button without a keyboard handler.
- Hard-codes English strings.
- Adds a synchronous loop that blocks for >100ms.
- Catches and silently swallows errors.

## Gotchas
- [Codebase-specific cross-cutting traps]
```

---

## Security templates

These are mandatory at SaaS+ and any Java profile (the Java security paradox makes
the security skill more important for Java teams, not less).

### `your-secret-handling-pattern` (Security, default at SaaS+)

```markdown
---
name: your-secret-handling-pattern
description: |
  Use this skill when writing any code that touches credentials, API keys, tokens,
  database passwords, signing keys, or PII. Enforces how we manage, rotate, and
  log around secrets and what we never do with them. Triggers: any code touching
  `process.env`, `os.environ`, secret managers; "add an integration with [API]",
  "store a token", "encrypt [X]".
license: MIT
---

# Your secret handling pattern

## Where secrets live
- Production: [secret manager — AWS Secrets Manager / GCP Secret Manager / Vault /
  Doppler, name it and link to docs].
- Local dev: `.env.local` only; `.env.local` is git-ignored.
- CI: [your CI's secret store; never hard-coded in workflow YAML].

## How code reads secrets
- Always via [your config layer], never `process.env.FOO` inline in business logic.
- Config layer fails fast if a required secret is missing, never default to a
  placeholder value that "works" in dev.
- Secrets are loaded once at startup; never re-read on every request.

## Rotation
- All secrets have a rotation policy: [N days for service tokens, [M] days for
  user-facing API keys].
- Rotation is automated where possible; documented runbook where not.

## What we NEVER do
- Hard-code secrets in source, even "test" or "placeholder" values that look fake.
- Log secrets, even at TRACE level. Even partial secrets (last 4 chars), they
  combine across log lines.
- Send secrets in error messages to clients.
- Commit `.env` files (use `.env.example` with empty values for documentation).
- Use deterministic test secrets that match the production format.

## Patterns AI keeps generating
- `const apiKey = "sk_test_abc123..."`, looks fake, often isn't.
- `console.log({ apiKey })` for "debugging", secrets land in CloudWatch / Datadog.
- Defaulting to a hardcoded fallback when env var is missing.
- Catching credential errors and retrying without backoff.

## Gotchas
- [Specific patterns AI hits in your codebase]
- [Vault/secret-manager idioms AI gets wrong]
```

### `your-security-review-checklist` (Security, mandatory at Regulated)

> **Scope distinction:** This is the **review-time** skill, it fires *after* code is
> written, ideally in a separate session using a different model from the one that
> generated the code (the AI-vs-AI review pattern; see the guide's `09-security/defenses.md`
> page on the website). The companion **authoring-time** skill below
> (`your-input-validation-rules`) fires when *writing* an input handler. They overlap
> on the input-validation surface deliberately, review-time catches what
> authoring-time missed.

```markdown
---
name: your-security-review-checklist
description: |
  Use this skill when reviewing ANY PR that touches request-handling, data access,
  auth, or external integrations. Forces a separate security pass distinct from
  functional review. Triggers: "review this PR", "security review", any diff
  touching `auth/`, `routes/`, `controllers/`, `middleware/`, `db/`, `models/`.
license: MIT
---

# Your security review checklist

Run as a SEPARATE pass after the functional review. Use confidence-graded findings
(High / Medium / Low). High-confidence findings block merge.

## Authentication & authorization
- Is every endpoint reachable from outside the trust boundary protected?
- Is authorization checked BEFORE business logic runs (not after)?
- Are object-level permission checks present (not just "is the user logged in")?
- Are admin/internal endpoints behind a separate check, not just role-based?

## Input validation
- Is every external input validated against a schema?
- Are unknown fields rejected (not silently ignored)?
- Are size limits enforced (request body, array length, string length)?
- Is content-type strictly checked?

## Injection surfaces
- Every SQL query parameterized? (Flag any string interpolation in queries.)
- Every shell/exec call avoided or strictly allowlisted? (Flag any shell composition.)
- Every HTML render escaped or via a safe template? (Flag any raw `dangerouslySetInnerHTML`,
  `v-html`, `Html.Raw`, etc.)
- Every redirect URL validated against allowlist? (Open-redirect risk.)

## Deserialization
- Any `pickle`, `ObjectInputStream`, Jackson with default typing, XStream, or YAML
  with non-safe loader on untrusted input? **Flag and require human review.**

## Secrets handling
- No secrets in diff (search for likely patterns)?
- No new logging of secret values?
- New secrets added to secret manager and not committed?

## Dependency hygiene
- Any newly-added dependency? Verified in real registry, with maintainer history?
- Lockfile updated correctly?

## Confidence-graded reporting
- HIGH: confirmed vulnerability or known dangerous pattern.
- MEDIUM: suspicious, needs human verification.
- LOW: defense-in-depth note; not blocking.

## Gotchas
- [Codebase-specific security patterns AI commonly misses]
- [Framework-specific traps, e.g., Spring Security default behaviors]
```

### `your-input-validation-rules` (Security, customer-facing UI + SaaS)

> **Scope distinction:** This is the **authoring-time** skill, it fires when *writing*
> an input handler so the patterns are correct from the first commit. The companion
> **review-time** skill above (`your-security-review-checklist`) catches what slipped
> past at authoring time. Both skills overlap on input-validation surfaces
> deliberately, defense in depth across two execution moments (write + review).

```markdown
---
name: your-input-validation-rules
description: |
  Use this skill when writing any code that handles untrusted input from a browser
  or external client, request bodies, query params, file uploads, third-party
  webhooks, postMessage, etc. Enforces XSS / CSRF / SSRF / CORS conventions.
  Triggers: any new endpoint, any new form, any code reading from `request.*` /
  `req.*` / `params`.
license: MIT
---

# Your input validation rules

## Request body validation
- Schema library: [pick, zod / pydantic / class-validator / Bean Validation].
- Reject unknown fields by default; never use "passthrough" / "extra='allow'" on
  externally-facing schemas.
- Enforce max sizes, max array lengths, max string lengths.

## Query / path params
- Same schema rules as request bodies.
- Numeric IDs validated as numbers, not parsed from arbitrary strings.
- UUIDs validated against UUID regex.

## File uploads
- Allowlist content types; never use a denylist.
- Strict size limits enforced server-side, not just client-side.
- Files written to a non-executable path; randomized filenames.
- Virus scan if accepting arbitrary user uploads.

## XSS
- All HTML rendering goes through the framework's safe template engine.
- `dangerouslySetInnerHTML` / `v-html` / `Html.Raw` requires a comment justifying it
  and a sanitizer call.
- Content-Security-Policy headers configured: [your CSP config].

## CSRF
- All state-changing endpoints require either an anti-CSRF token or a non-cookie
  authentication header (e.g., `Authorization: Bearer ...`).
- Same-site cookie policy: `SameSite=Lax` minimum, `Strict` where possible.

## SSRF
- Any code that makes outbound HTTP from a user-controlled URL goes through an
  allowlist of permitted hosts.
- Block private/loopback/link-local addresses by default.

## CORS
- Allow-origin allowlist, not `*`. Credentials never combined with `*`.
- Preflight cache time bounded.

## Patterns AI keeps generating
- Passing user input directly into a `fetch(url)` call.
- Using `cors()` with no options (allows everything).
- Echoing query params into HTML response without escaping.
- Trusting `X-Forwarded-For` for security decisions without checking the chain.

## Gotchas
- [Framework-specific defaults that need overriding in your codebase]
```
