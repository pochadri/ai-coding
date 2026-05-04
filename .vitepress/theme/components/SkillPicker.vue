<script setup>
import { ref, computed } from 'vue'

const projectType = ref('full-stack')
const stage = ref('mvp')
const team = ref('small')
const risk = ref('saas')
const language = ref('typescript')
const workflow = ref('balanced')

// Skill metadata. Each skill: { id, label, url, category, why }.
const SKILLS = {
  'frontend-design': { label: 'Anthropic frontend-design', url: 'https://github.com/anthropics/skills', why: 'Eliminates AI-default purple-gradient slop' },
  'sentry-code-review': { label: 'Sentry code-review', url: 'https://github.com/getsentry/skills', why: 'Best-in-class for false-positive reduction' },
  'sentry-commit': { label: 'Sentry commit', url: 'https://github.com/getsentry/skills', why: 'Cleaner commits with less effort' },
  'sentry-skill-scanner': { label: 'Sentry skill-scanner', url: 'https://github.com/getsentry/skills', why: 'Audits other skills for security; run on every install' },
  'gstack-design': { label: 'gstack design suite (design-shotgun, design-html)', url: 'https://github.com/garrytan/gstack', why: 'Rapid frontend iteration' },
  'gstack-ship': { label: 'gstack ship', url: 'https://github.com/garrytan/gstack', why: 'Bundles deploy + verify into one command' },
  'gstack-office-hours': { label: 'gstack office-hours', url: 'https://github.com/garrytan/gstack', why: 'Founder-mode product thinking' },
  'gstack-guard': { label: 'gstack freeze/guard', url: 'https://github.com/garrytan/gstack', why: 'Directory-scoped edits to prevent prod blast radius' },
  'gstack-investigate': { label: 'gstack investigate', url: 'https://github.com/garrytan/gstack', why: 'Structured debugging for legacy code' },
  'superpowers-planning': { label: 'Superpowers writing-plans + brainstorming', url: 'https://github.com/obra/superpowers', why: 'Decomposes work into verifiable tasks' },
  'superpowers-tdd': { label: 'Superpowers test-driven-development', url: 'https://github.com/obra/superpowers', why: 'Strict red/green TDD enforcement' },
  'superpowers-subagent': { label: 'Superpowers subagent-driven-development', url: 'https://github.com/obra/superpowers', why: 'Fresh subagent per task with two-stage review' },
  'mongodb': { label: 'MongoDB agent-skills', url: 'https://github.com/mongodb/agent-skills', why: 'Schema, performance, vector search' },
  'supabase': { label: 'Supabase agent-skills', url: 'https://github.com/supabase/agent-skills', why: 'Full Supabase workflow with RLS guardrails' },
  'vercel': { label: 'Vercel agent-skills', url: 'https://github.com/vercel-labs/agent-skills', why: 'Next.js, React, Vercel AI SDK' },
  'cloudflare': { label: 'Cloudflare skills', url: 'https://github.com/cloudflare/skills', why: 'Workers, Durable Objects, Wrangler' },
  'hashicorp': { label: 'HashiCorp agent-skills', url: 'https://github.com/hashicorp/agent-skills', why: 'Terraform + Packer with HashiCorp conventions' },
  'livekit': { label: 'LiveKit agent-skills', url: 'https://github.com/livekit/agent-skills', why: 'Voice AI patterns; architecture-only design' },
  'clickhouse': { label: 'ClickHouse agent-skills', url: 'https://github.com/ClickHouse/agent-skills', why: 'ClickHouse + chdb best practices' },
  'expo': { label: 'Expo skills', url: 'https://github.com/expo/skills', why: 'Build, deploy, debug Expo apps' },
  'figma': { label: 'Figma agent skills', url: 'https://github.com/figma/community-resources/tree/main/agent_skills', why: 'Design-to-code bridge' },
  'matt-pocock': { label: "Matt Pocock's TypeScript skills", url: 'https://github.com/mattpocock/skills', why: 'tdd, triage-issue, setup-pre-commit, write-a-skill' },
  'trail-of-bits': { label: 'Trail of Bits skills', url: 'https://github.com/trailofbits/skills', why: 'Audit-grade security, methodology over checklist' },
  'agents-md': { label: 'Strong AGENTS.md / CLAUDE.md', url: 'https://agentskills.io/specification', why: 'Architectural why, not just what — critical for legacy' },
  'bmad': { label: 'BMAD-METHOD', url: 'https://github.com/bmad-code-org/BMAD-METHOD', why: 'Heavyweight Agile-AI framework — PM/Architect/Dev personas, PRD-first. Best for teams 3+ doing product work that values ceremony.' },
  'compound': { label: 'Compound Engineering plugin', url: 'https://github.com/EveryInc/compound-engineering-plugin', why: 'Tight plan/work/review/compound loop with explicit learning capture. Built by Every for Cora team. Caveat: native harnesses may absorb the pattern in 2026.' },
}

function pick(...ids) {
  return ids.map(id => ({ id, ...SKILLS[id] })).filter(s => s.label)
}

const recipe = computed(() => {
  const out = []

  // Anti-AI-slop frontend default — almost universal
  if (['full-stack', 'frontend'].includes(projectType.value)) {
    out.push(...pick('frontend-design'))
  }

  // Methodology system — pick at most ONE primary; mixing is worse than either alone.
  // Order of precedence: BMAD (heavy ceremony) > Superpowers (process discipline) > gstack (vibe) > Compound (loop tightening) > balanced default
  const isProductTeam = ['large', 'enterprise'].includes(team.value) ||
                        (team.value === 'small' && ['mvp', 'growth', 'mature'].includes(stage.value))
  const isClaudeCodeFit = workflow.value !== 'vibe' && team.value !== 'enterprise'

  if (workflow.value === 'spec-driven' && isProductTeam) {
    // BMAD's sweet spot: spec-driven + team + product work + ceremony tolerance
    out.push(...pick('bmad'))
  } else if (workflow.value === 'tdd' || workflow.value === 'spec-driven') {
    out.push(...pick('superpowers-planning', 'superpowers-subagent'))
    if (workflow.value === 'tdd') out.push(...pick('superpowers-tdd'))
  } else if (workflow.value === 'vibe' && (stage.value === 'prototype' || stage.value === 'mvp')) {
    out.push(...pick('gstack-design', 'gstack-office-hours', 'gstack-ship'))
  } else if (workflow.value === 'balanced' && isClaudeCodeFit && ['solo', 'small'].includes(team.value)) {
    // Compound Engineering's sweet spot: solo/small team, balanced workflow, Claude-Code-friendly
    out.push(...pick('compound'))
  } else {
    // Default fallback for balanced workflow at scale OR vibe in later stages
    out.push(...pick('superpowers-planning'))
  }

  // General code review / commit hygiene — useful from MVP onward
  if (['mvp', 'growth', 'mature', 'legacy'].includes(stage.value)) {
    out.push(...pick('sentry-code-review', 'sentry-commit'))
  }

  // Vendor skills by project type + stage
  if (projectType.value === 'full-stack') {
    out.push(...pick('supabase', 'vercel'))
  }
  if (projectType.value === 'backend' && language.value === 'python') {
    out.push(...pick('mongodb'))
  }
  if (projectType.value === 'backend' && language.value === 'typescript') {
    out.push(...pick('supabase'))
  }
  if (projectType.value === 'infra') {
    out.push(...pick('hashicorp', 'cloudflare'))
  }
  if (projectType.value === 'data') {
    out.push(...pick('clickhouse', 'mongodb'))
  }
  if (projectType.value === 'mobile') {
    out.push(...pick('expo'))
  }
  if (projectType.value === 'voice') {
    out.push(...pick('livekit'))
  }
  if (projectType.value === 'frontend') {
    out.push(...pick('vercel', 'figma'))
  }
  if (projectType.value === 'library') {
    // Libraries live and die by API contracts and conventions; emphasize strong context + planning
    out.push(...pick('agents-md'))
  }

  // Language-specific
  if (language.value === 'typescript') {
    out.push(...pick('matt-pocock'))
  }
  if (language.value === 'java') {
    // Enterprise Java: strong AGENTS.md is critical (conventions matter), and the
    // Veracode "Java Paradox" finding (AI worse on Java security than other languages)
    // means audit-grade security review is more important than for TS/Python.
    out.push(...pick('agents-md'))
    if (['saas', 'regulated'].includes(risk.value)) {
      out.push(...pick('trail-of-bits'))
    }
  }

  // Risk-driven additions
  if (['saas', 'regulated'].includes(risk.value)) {
    out.push(...pick('sentry-skill-scanner'))
  }
  if (risk.value === 'regulated') {
    out.push(...pick('trail-of-bits', 'gstack-guard'))
  }

  // Legacy stage gets investigation tools
  if (stage.value === 'legacy') {
    out.push(...pick('gstack-investigate', 'agents-md'))
  }

  // Dedupe by id, preserving first occurrence
  const seen = new Set()
  return out.filter(s => {
    if (seen.has(s.id)) return false
    seen.add(s.id)
    return true
  })
})

const teamGuidance = computed(() => {
  if (team.value === 'solo') {
    return 'Personal `~/.claude/skills/`. Iterate fast, copy generously.'
  }
  if (team.value === 'small') {
    return 'Project-local `.claude/skills/` checked into Git. One named owner per skill. PR review on changes.'
  }
  if (team.value === 'large') {
    return 'Centralized skills repo. Draft/publish workflow with tech-lead review. Org-wide allowlist.'
  }
  return 'Anthropic Team/Enterprise plan. Audit logs, rollback, agent-owner role. Skills provisioned centrally.'
})

const installNote = computed(() => {
  if (risk.value === 'regulated') {
    return 'First-party + internally authored only. Mandatory security review on every skill change. Pin every version.'
  }
  if (risk.value === 'saas') {
    return 'First-party preferred. For any third-party skill, run Sentry skill-scanner before install. Pin versions.'
  }
  if (risk.value === 'internal') {
    return 'First-party publishers only.'
  }
  return 'Try anything; uninstall what doesn\'t help.'
})

const counterClass = computed(() => {
  return recipe.value.length > 8 ? 'skill-picker__counter--warn' : ''
})

// Custom skills the user should *write themselves* — the highest-leverage skills are
// always the ones that capture *your* codebase's specific conventions and gotchas.
// This generates 2-4 starter skill names based on the inputs.
const customSkills = computed(() => {
  const out = []

  // Project-type-driven custom skills
  const byType = {
    'frontend': { name: 'your-design-system-conventions', why: 'Component patterns, spacing scale, and copy voice your design system mandates that AI defaults won\'t know.' },
    'backend': { name: 'your-api-contract-style', why: 'Endpoint naming, error envelope shape, pagination conventions — the patterns reviewers will reject deviations from.' },
    'full-stack': { name: 'your-feature-shape-template', why: 'How a typical feature is wired end-to-end in your codebase (route → handler → service → DB pattern).' },
    'mobile': { name: 'your-platform-targeting-rules', why: 'Min OS versions, accessibility baselines, dark-mode and dynamic-type expectations specific to your app.' },
    'infra': { name: 'your-iac-conventions', why: 'Terraform module layout, naming, tagging, and state-management rules your platform team enforces.' },
    'data': { name: 'your-schema-evolution-pattern', why: 'How you do migrations, backfills, and zero-downtime schema changes — easy to get subtly wrong.' },
    'voice': { name: 'your-prompt-template-conventions', why: 'How you structure system prompts, tool definitions, and turn-taking for your voice agents.' },
    'library': { name: 'your-public-api-style', why: 'What\'s public vs internal, deprecation rules, breaking-change policy, doc-comment conventions.' },
  }
  if (byType[projectType.value]) out.push(byType[projectType.value])

  // Stage-driven custom skill (the operational pattern most relevant for the stage)
  const byStage = {
    'prototype': null, // no required custom skill at prototype stage
    'mvp': { name: 'your-feature-flag-pattern', why: 'How features ship behind flags, who can toggle, and how flags get cleaned up.' },
    'growth': { name: 'your-incident-runbook-skeleton', why: 'The shape of a real incident response — escalation, comms, postmortem cadence — your team uses.' },
    'mature': { name: 'your-deprecation-process', why: 'How you sunset old code paths and APIs without breaking customers — the muscle that compounds.' },
    'legacy': { name: 'your-codebase-archeology-prompts', why: 'How to ask the agent to investigate ancient code: what to grep for, where to look for context, who owns what.' },
  }
  if (byStage[stage.value]) out.push(byStage[stage.value])

  // Risk-driven custom skill (the security/compliance pattern matching the risk profile)
  const byRisk = {
    'hobby': null,
    'internal': { name: 'your-data-classification-rules', why: 'Which data classes go through which approved tools — the rule the AUP encodes for *your* org.' },
    'saas': { name: 'your-tenant-isolation-pattern', why: 'How tenant boundaries are enforced in your codebase — easy for AI to miss without an explicit skill.' },
    'regulated': { name: 'your-audit-trail-fields', why: 'Required fields, retention periods, redaction rules for audit logs in your regulated context.' },
  }
  if (byRisk[risk.value]) out.push(byRisk[risk.value])

  // Java-specific custom skill (Java teams' conventions matter disproportionately)
  if (language.value === 'java') {
    out.push({ name: 'your-spring-conventions', why: 'Bean wiring, annotation usage, package layout, transaction boundaries — Java/Spring teams\' conventions outweigh public training data.' })
  }

  return out.slice(0, 4) // cap at 4 to avoid overwhelming
})
</script>

<template>
  <div class="skill-picker">
    <div class="skill-picker__row">
      <label for="project-type">Project type</label>
      <select id="project-type" v-model="projectType">
        <option value="full-stack">Full-stack web</option>
        <option value="frontend">Frontend SPA</option>
        <option value="backend">Backend API</option>
        <option value="mobile">Mobile</option>
        <option value="infra">Infra / DevOps</option>
        <option value="data">ML / data</option>
        <option value="voice">Voice / realtime</option>
        <option value="library">CLI / library</option>
      </select>
    </div>

    <div class="skill-picker__row">
      <label for="stage">Stage</label>
      <select id="stage" v-model="stage">
        <option value="prototype">Greenfield prototype</option>
        <option value="mvp">MVP</option>
        <option value="growth">Growth-stage with customers</option>
        <option value="mature">Mature production</option>
        <option value="legacy">Legacy maintenance</option>
      </select>
    </div>

    <div class="skill-picker__row">
      <label for="team">Team size</label>
      <select id="team" v-model="team">
        <option value="solo">Solo</option>
        <option value="small">Small (2–10)</option>
        <option value="large">Larger (10+)</option>
        <option value="enterprise">Enterprise</option>
      </select>
    </div>

    <div class="skill-picker__row">
      <label for="risk">Risk profile</label>
      <select id="risk" v-model="risk">
        <option value="hobby">Hobby</option>
        <option value="internal">Internal tool</option>
        <option value="saas">Customer-facing SaaS</option>
        <option value="regulated">Fintech / health / regulated</option>
      </select>
    </div>

    <div class="skill-picker__row">
      <label for="language">Primary language</label>
      <select id="language" v-model="language">
        <option value="typescript">TypeScript / JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="rust">Rust</option>
        <option value="polyglot">Polyglot / other</option>
      </select>
    </div>

    <div class="skill-picker__row">
      <label for="workflow">Workflow style</label>
      <select id="workflow" v-model="workflow">
        <option value="balanced">Balanced (default)</option>
        <option value="tdd">Test-driven (strict)</option>
        <option value="spec-driven">Spec-driven</option>
        <option value="vibe">Vibe coding (fast iteration)</option>
      </select>
    </div>

    <div class="skill-picker__output">
      <h3>
        Recommended kit
        <span class="skill-picker__counter" :class="counterClass">
          {{ recipe.length }} skill{{ recipe.length === 1 ? '' : 's' }}
        </span>
      </h3>

      <ul v-if="recipe.length">
        <li v-for="s in recipe" :key="s.id">
          <a :href="s.url" target="_blank" rel="noopener"><strong>{{ s.label }}</strong></a>
          — <em>{{ s.why }}</em>
        </li>
      </ul>
      <p v-else>No specific recommendations for this combination — start with <a href="https://github.com/anthropics/skills" target="_blank" rel="noopener">Anthropic's official skills</a> and add as needed.</p>

      <p class="skill-picker__caveat" v-if="recipe.length > 8">
        ⚠️ This is more than 8 skills. Most experienced practitioners settle on 3 or fewer active skills. Consider this a menu — pick the ones that match how you actually work, not the full list.
      </p>

      <h3 style="margin-top: 1.5rem;">🛠 Custom skills to write yourself</h3>
      <p class="skill-picker__hint">Community skills are generic. Your codebase isn't. The highest-leverage skills are the ones that capture *your* team's specific conventions and gotchas. Based on your inputs, here are 2-4 starter skills worth authoring (use Anthropic's <a href="https://github.com/anthropics/skills" target="_blank" rel="noopener"><code>skill-creator</code></a> as the template):</p>

      <ul v-if="customSkills.length" class="skill-picker__custom">
        <li v-for="s in customSkills" :key="s.name">
          <code>{{ s.name }}</code> — <em>{{ s.why }}</em>
        </li>
      </ul>
      <p v-else class="skill-picker__caveat">No specific custom skills suggested for this combination — start by extracting prompts you find yourself repeating.</p>

      <h3 style="margin-top: 1.5rem;">Team practice</h3>
      <p>{{ teamGuidance }}</p>

      <h3>Install policy</h3>
      <p>{{ installNote }}</p>

      <p class="skill-picker__caveat">
        This picker mirrors the recipes from <a href="./choosing-skills">Choosing skills</a>. For nuance and the author's actual install, read that page.
      </p>
    </div>
  </div>
</template>
