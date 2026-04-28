<script setup>
import { ref, computed } from 'vue'

// 10 questions, each with 0-3 score. Total 0-30 maps to maturity level 0-5.
const answers = ref({
  inventory: 0,
  aup: 0,
  agentsmd: 0,
  review: 0,
  measurement: 0,
  platform: 0,
  champions: 0,
  appsec: 0,
  hiring: 0,
  governance: 0,
})

const questions = [
  { id: 'inventory', q: '1. Do you have an inventory of AI coding tools in use across the org?', options: [
    { v: 0, t: 'No — and I suspect there\'s shadow AI we don\'t see' },
    { v: 1, t: 'Partial — we know about sanctioned tools' },
    { v: 2, t: 'Yes — sanctioned + shadow AI catalogued' },
    { v: 3, t: 'Yes — continuously updated; integrated with EU AI Act classification' },
  ]},
  { id: 'aup', q: '2. Acceptable Use Policy (AUP) for AI coding tools?', options: [
    { v: 0, t: 'None' },
    { v: 1, t: 'Published on the wiki, lightly enforced' },
    { v: 2, t: 'Enforced — incidents documented, refreshed quarterly' },
    { v: 3, t: 'Policy-as-code where possible; signed configs' },
  ]},
  { id: 'agentsmd', q: '3. AGENTS.md / CLAUDE.md coverage in repos?', options: [
    { v: 0, t: 'Almost no repos have one' },
    { v: 1, t: 'Some teams; no template' },
    { v: 2, t: 'Org-wide template; required in main repos' },
    { v: 3, t: 'Required, reviewed quarterly, treated like code (PR review on changes)' },
  ]},
  { id: 'review', q: '4. Code review practices updated for AI-generated code?', options: [
    { v: 0, t: 'No — we review the same way we always did' },
    { v: 1, t: 'Some teams have informal AI-aware checklists' },
    { v: 2, t: 'Org-wide checklist; AI authorship labelled in PRs' },
    { v: 3, t: 'Automated checks for AI-specific patterns + human review' },
  ]},
  { id: 'measurement', q: '5. What do you measure?', options: [
    { v: 0, t: 'Self-report / developer surveys only' },
    { v: 1, t: 'DORA metrics' },
    { v: 2, t: 'DX Core 4 (or DORA + daily-active-usage)' },
    { v: 3, t: 'DX Core 4 + cost-per-active-dev + 6-month productivity trend' },
  ]},
  { id: 'platform', q: '6. Who owns AI coding tools as a system?', options: [
    { v: 0, t: 'Nobody — individual teams' },
    { v: 1, t: 'Part of someone\'s job (~0.5 FTE)' },
    { v: 2, t: 'A DevEx team owns it as part of their charter' },
    { v: 3, t: 'Dedicated platform team (2+ FTE) with explicit charter' },
  ]},
  { id: 'champions', q: '7. AI champions network?', options: [
    { v: 0, t: 'Just a few enthusiasts' },
    { v: 1, t: 'Informal Slack channel' },
    { v: 2, t: 'Designated champions with time allocation; regular sync' },
    { v: 3, t: '5–10% of engineers as champions; 1 lead per 10–20; pattern library maintained' },
  ]},
  { id: 'appsec', q: '8. AppSec scanning for AI-introduced patterns?', options: [
    { v: 0, t: 'No — same scanning we always had' },
    { v: 1, t: 'General SAST; not AI-tuned' },
    { v: 2, t: 'Rules tuned for AI patterns (privilege escalation, hallucinated deps)' },
    { v: 3, t: 'AI-aware scanning + audit trail integration + cyber insurance review' },
  ]},
  { id: 'hiring', q: '9. AI fluency in hiring / leveling?', options: [
    { v: 0, t: 'Not in any rubric' },
    { v: 1, t: 'Mentioned in interviews informally' },
    { v: 2, t: 'In the leveling rubric as a competency' },
    { v: 3, t: 'Fully integrated; rubric calibrated; junior pipeline strategy documented' },
  ]},
  { id: 'governance', q: '10. Vendor / regulatory posture?', options: [
    { v: 0, t: 'Not reviewed at board level' },
    { v: 1, t: 'Annual vendor risk review' },
    { v: 2, t: 'EU AI Act inventory + classification; SOC 2 audit-ready for AI changes' },
    { v: 3, t: 'Continuously audit-ready; cyber insurance with explicit AI coverage; ZDR negotiated' },
  ]},
]

const totalScore = computed(() => Object.values(answers.value).reduce((a, b) => a + b, 0))

// Map total score (0-30) to maturity level (0-5)
const level = computed(() => {
  const s = totalScore.value
  if (s <= 4) return 0
  if (s <= 9) return 1
  if (s <= 16) return 2
  if (s <= 22) return 3
  if (s <= 27) return 4
  return 5
})

const levelInfo = computed(() => {
  const info = {
    0: {
      name: 'Level 0 — Unmanaged',
      summary: 'Personal accounts, ad hoc, shadow AI dominant.',
      next: 'Get to Level 1: 30-day shadow-AI inventory; pick approved tools; publish a starter AUP.',
      roadmap: '/12-adoption/90-day-roadmap#if-youre-at-level-0-or-1--90-days-to-operational',
    },
    1: {
      name: 'Level 1 — Sanctioned',
      summary: 'Approved tools available; AUP exists but lightly enforced; no measurement.',
      next: 'Get to Level 2: deploy DX Core 4 (or DORA + daily-active-usage); require AGENTS.md per repo; update code review for AI.',
      roadmap: '/12-adoption/90-day-roadmap#if-youre-at-level-0-or-1--90-days-to-operational',
    },
    2: {
      name: 'Level 2 — Operational',
      summary: 'Measurement live; AUP enforced; AGENTS.md per repo; DevEx team owns AI.',
      next: 'Get to Level 3: stand up the platform team (2-3 FTE); deploy AI Gateway; integrate AppSec scanning for AI patterns.',
      roadmap: '/12-adoption/90-day-roadmap#if-youre-at-level-2--90-days-to-platformed',
    },
    3: {
      name: 'Level 3 — Platformed',
      summary: 'Centralized AI Gateway; tool catalog; champions network; security integrated.',
      next: 'Get to Level 4: hold the discipline 6+ months; bake AI into hiring/leveling; junior pipeline strategy; cyber insurance review.',
      roadmap: '/12-adoption/90-day-roadmap#if-youre-at-level-3--90-days-to-compounding',
    },
    4: {
      name: 'Level 4 — Compounding',
      summary: 'Productivity gains held over 6+ months; hiring reflects AI fluency; junior pipeline preserved.',
      next: 'Most orgs should treat this as the destination. Level 5 is for orgs where AI coding is core to the operating model.',
      roadmap: '/12-adoption/maturity-model#level-5--native',
    },
    5: {
      name: 'Level 5 — Native',
      summary: 'Autonomous agents in bounded domains; EU AI Act / SOC 2 audit-ready continuously; AI is operating-model infrastructure.',
      next: 'You\'re at the frontier. Anything beyond this is research, not engineering management.',
      roadmap: '/12-adoption/maturity-model#level-5--native',
    },
  }
  return info[level.value]
})

const completion = computed(() => {
  return Object.values(answers.value).filter(v => v > 0).length
})
</script>

<template>
  <div class="maturity-assessment">
    <div class="maturity-assessment__progress">
      <span>Progress: {{ completion }} / 10 questions answered</span>
      <span class="maturity-assessment__counter">Score: {{ totalScore }} / 30</span>
    </div>

    <div v-for="q in questions" :key="q.id" class="maturity-assessment__q">
      <p class="maturity-assessment__qtext">{{ q.q }}</p>
      <div class="maturity-assessment__options">
        <label v-for="o in q.options" :key="o.v" class="maturity-assessment__option">
          <input type="radio" :name="q.id" :value="o.v" v-model="answers[q.id]" />
          <span>{{ o.t }}</span>
        </label>
      </div>
    </div>

    <div class="maturity-assessment__output">
      <h3>Your maturity level</h3>
      <p class="maturity-assessment__level">{{ levelInfo.name }}</p>
      <p>{{ levelInfo.summary }}</p>

      <h4>What's next</h4>
      <p>{{ levelInfo.next }}</p>

      <p class="maturity-assessment__cta">
        <a :href="levelInfo.roadmap"><strong>→ See the recommended 90-day plan for your level</strong></a>
      </p>

      <p class="maturity-assessment__caveat">
        This is a self-assessment. The 30-point scoring maps to the 6-level model in <a href="./maturity-model">AI coding maturity model</a> — for the full reasoning behind each level, read that page.
      </p>
    </div>
  </div>
</template>
