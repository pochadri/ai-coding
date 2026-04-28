<script setup>
import { ref, computed } from 'vue'

const tool = ref('claude-code')
const need = ref('continuity')
const stack = ref('typescript')
const privacy = ref('standard')
const team = ref('small')

// Memory layer metadata
const LAYERS = {
  // Vendor-native
  'claude-memory': { label: 'Claude Code /memory + auto-memory', url: 'https://code.claude.com/docs/en/memory', why: 'Free, transparent, edit-friendly. Always leave on; prune ~/.claude/CLAUDE.md monthly.', tier: 'vendor' },
  'cursor-rules': { label: 'Cursor Rules', url: 'https://cursor.com/', why: 'Cursor killed Memories in 2.1.x; Rules are now the only built-in persistence. Static, not learned.', tier: 'vendor' },
  'codex-memories': { label: 'Codex ~/.codex/memories/ + resume', url: 'https://developers.openai.com/codex/memories', why: 'Best vendor-native episodic continuity for OpenAI users.', tier: 'vendor' },
  'copilot-memory': { label: 'GitHub Copilot Memory', url: 'https://docs.github.com/en/copilot/concepts/agents/copilot-memory', why: 'On by default March 2026; 28-day TTL handles staleness automatically.', tier: 'vendor' },
  'cascade': { label: 'Windsurf Cascade Memory', url: 'https://docs.windsurf.com/windsurf/cascade/cascade', why: 'Autonomously generated; less transparent than Claude\'s but works out of box.', tier: 'vendor' },
  'claude-api-mem': { label: 'Claude API /memories tool + context editing', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool', why: 'For building your own agent. Client-side storage; you control where memory lives.', tier: 'vendor' },

  // Interaction memory (third-party)
  'claude-mem': { label: 'claude-mem', url: 'https://github.com/thedotmack/claude-mem', why: 'The flagship for Claude Code users. Auto-captures sessions, AI-compresses, surfaces into future contexts.', tier: 'interaction' },
  'cursor-bank': { label: 'cursor-bank or vanzan01/cursor-memory-bank', url: 'https://github.com/tacticlaunch/cursor-bank', why: 'Community fix for Cursor\'s killed Memories feature.', tier: 'interaction' },
  'mem0': { label: 'Mem0', url: 'https://github.com/mem0ai/mem0', why: 'Drop-in memory API for building your own agent app. Hosted option available.', tier: 'interaction' },
  'letta-code': { label: 'Letta Code', url: 'https://github.com/letta-ai/letta-code', why: 'Memory-first coding agent. Imports past Claude Code/Codex sessions on init (no cold-start).', tier: 'interaction' },
  'graphiti': { label: 'Graphiti / Zep', url: 'https://github.com/getzep/graphiti', why: 'Temporal knowledge graph with validity windows — facts invalidated, not deleted. Gold standard for serious infra.', tier: 'interaction' },
  'cognee': { label: 'Cognee', url: 'https://github.com/topoteretes/cognee', why: 'Graph + vector hybrid for Python apps. 6 lines of code to add memory.', tier: 'interaction' },
  'byterover': { label: 'ByteRover (brv CLI)', url: 'https://github.com/campfirein/byterover-cli', why: 'Git-style commands on agent memory. Markdown Context Tree.', tier: 'interaction' },
  'cline-bank': { label: 'Cline Memory Bank', url: 'https://docs.cline.bot/features/memory-bank', why: 'Six prescribed markdown files in memory-bank/. Pure markdown, no DB.', tier: 'interaction' },
  'basic-memory': { label: 'Basic Memory', url: 'https://github.com/basicmachines-co/basic-memory', why: 'Local-first markdown + Obsidian integration. MCP server.', tier: 'interaction' },
  'mcp-memory': { label: 'Anthropic MCP memory server', url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/memory', why: 'Official reference; entities/relations/observations in local memory.json. Cross-tool.', tier: 'interaction' },

  // Artifact memory (code KGs)
  'gitnexus': { label: 'GitNexus', url: 'https://github.com/abhigyanpatwari/GitNexus', why: 'Code KG with MCP-first design. Multi-repo aware. Best for team monorepos and impact analysis.', tier: 'artifact' },
  'graphify': { label: 'graphify', url: 'https://github.com/safishamsi/graphify', why: 'Multi-modal: code + docs + papers + images + A/V. MIT-licensed. Best for personal /raw-style corpora.', tier: 'artifact' },

  // Lightweight pattern
  'llm-wiki': { label: 'Karpathy LLM Wiki pattern (markdown + git)', url: 'https://gamgee.ai/blogs/karpathy-llm-wiki-memory-pattern/', why: 'Minimal: a directory of markdown the agent reads/writes. Transparent, free, version-controllable.', tier: 'pattern' },
}

function pick(...ids) {
  return ids.map(id => ({ id, ...LAYERS[id] })).filter(s => s.label)
}

const recipe = computed(() => {
  const out = []

  // Layer 1: vendor-native — pick based on tool
  if (tool.value === 'claude-code') out.push(...pick('claude-memory'))
  if (tool.value === 'cursor') out.push(...pick('cursor-rules'))
  if (tool.value === 'codex') out.push(...pick('codex-memories'))
  if (tool.value === 'copilot') out.push(...pick('copilot-memory'))
  if (tool.value === 'windsurf') out.push(...pick('cascade'))
  if (tool.value === 'building-agent') out.push(...pick('claude-api-mem'))

  // Layer 2: interaction memory — based on need + tool
  if (need.value === 'continuity' || need.value === 'all') {
    if (tool.value === 'claude-code') out.push(...pick('claude-mem'))
    else if (tool.value === 'cursor') out.push(...pick('cursor-bank'))
    else if (tool.value === 'codex') out.push(...pick('mcp-memory'))
    else if (tool.value === 'building-agent') out.push(...pick('mem0', 'letta-code'))
    else if (tool.value === 'multi-tool') out.push(...pick('basic-memory', 'mcp-memory'))
    else out.push(...pick('mcp-memory'))
  }

  if (need.value === 'conventions' || need.value === 'all') {
    out.push(...pick('llm-wiki'))
    if (team.value !== 'solo') out.push(...pick('cline-bank'))
  }

  // Layer 3: artifact memory — based on need + team
  if (need.value === 'structure' || need.value === 'all') {
    if (team.value === 'solo' && stack.value !== 'typescript') {
      out.push(...pick('graphify'))
    } else {
      out.push(...pick('gitnexus'))
    }
  }

  // Privacy boost
  if (privacy.value === 'high') {
    out.push(...pick('basic-memory'))
  }

  // Team-scale: graphiti for serious infra
  if (team.value === 'enterprise' && (need.value === 'continuity' || need.value === 'all')) {
    out.push(...pick('graphiti'))
  }

  // Dedupe
  const seen = new Set()
  return out.filter(s => { if (seen.has(s.id)) return false; seen.add(s.id); return true })
})

const toolNote = computed(() => {
  if (tool.value === 'cursor') return 'Note: Cursor killed its built-in Memories in 2.1.x. Rules are now the only first-party persistence. For real memory you\'ll need a third-party MCP-based layer.'
  if (tool.value === 'building-agent') return 'You\'re building an agent app, not using a coding IDE — the API memory tool + Mem0/Letta is the right surface.'
  if (tool.value === 'multi-tool') return 'For portability across multiple tools, prefer MCP-based memory over vendor-native (which is per-tool).'
  return null
})

const privacyNote = computed(() => {
  if (privacy.value === 'high') return 'For high-privacy contexts: prefer local-first tools (Basic Memory, Cline Memory Bank, Karpathy LLM Wiki). Audit any hosted memory service\'s data policies. Avoid opaque memory (ChatGPT-style).'
  if (privacy.value === 'low') return 'Hobby project — anything goes; just don\'t store secrets in memory by accident.'
  return 'Standard: prefer transparent memory (markdown files you can read/edit) over opaque vector DBs. Audit what\'s actually stored before trusting it.'
})

const teamNote = computed(() => {
  if (team.value === 'solo') return 'Solo: keep it simple. Vendor + 1 third-party layer is usually enough. Don\'t build infra you\'ll have to maintain alone.'
  if (team.value === 'small') return 'Small team: check memory layers into Git. PR-review changes to skill/memory configs same as code. One named owner per layer.'
  if (team.value === 'large') return 'Larger team: centralize memory configuration in a platform-team-owned repo. Allowlist of approved memory tools. Treat memory as privileged code.'
  return 'Enterprise: audit logs, rollback, signed configs only. Vendor Team/Enterprise plans for centralized governance. Memory is a regulated data store.'
})

const totalCount = computed(() => recipe.value.length)
const counterClass = computed(() => totalCount.value > 4 ? 'memory-picker__counter--warn' : '')
</script>

<template>
  <div class="memory-picker">
    <div class="memory-picker__row">
      <label for="tool">Primary AI tool</label>
      <select id="tool" v-model="tool">
        <option value="claude-code">Claude Code</option>
        <option value="cursor">Cursor</option>
        <option value="codex">OpenAI Codex CLI</option>
        <option value="copilot">GitHub Copilot (agentic surfaces)</option>
        <option value="windsurf">Windsurf</option>
        <option value="multi-tool">Multiple / portability matters</option>
        <option value="building-agent">Building my own agent app</option>
      </select>
    </div>

    <div class="memory-picker__row">
      <label for="need">Primary need</label>
      <select id="need" v-model="need">
        <option value="continuity">Cross-session continuity (remember decisions)</option>
        <option value="conventions">Project conventions (team patterns the agent should learn)</option>
        <option value="structure">Code structure understanding (architecture/dependencies)</option>
        <option value="all">All of the above</option>
      </select>
    </div>

    <div class="memory-picker__row">
      <label for="stack">Primary language</label>
      <select id="stack" v-model="stack">
        <option value="typescript">TypeScript / JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="rust">Rust</option>
        <option value="polyglot">Polyglot / other</option>
      </select>
    </div>

    <div class="memory-picker__row">
      <label for="privacy">Privacy / sensitivity</label>
      <select id="privacy" v-model="privacy">
        <option value="low">Low (hobby / open source)</option>
        <option value="standard">Standard (internal tool / SaaS)</option>
        <option value="high">High (regulated / proprietary IP)</option>
      </select>
    </div>

    <div class="memory-picker__row">
      <label for="team">Team size</label>
      <select id="team" v-model="team">
        <option value="solo">Solo</option>
        <option value="small">Small (2–10)</option>
        <option value="large">Larger (10+)</option>
        <option value="enterprise">Enterprise</option>
      </select>
    </div>

    <div class="memory-picker__output">
      <h3>
        Recommended memory stack
        <span class="memory-picker__counter" :class="counterClass">
          {{ totalCount }} layer{{ totalCount === 1 ? '' : 's' }}
        </span>
      </h3>

      <ul v-if="recipe.length">
        <li v-for="s in recipe" :key="s.id">
          <a :href="s.url" target="_blank" rel="noopener"><strong>{{ s.label }}</strong></a>
          <em class="memory-picker__tier">[{{ s.tier }}]</em>
          — {{ s.why }}
        </li>
      </ul>
      <p v-else>No specific recommendations — start with vendor-native memory and add layers as needed.</p>

      <p class="memory-picker__caveat" v-if="totalCount > 4">
        ⚠️ This is more than 4 layers. The recommendation in <a href="./practice-and-risks#a-short-rule">Practice and risks</a> is "vendor + 1 interaction + 1 artifact = 3 layers max." Pick the ones that match your actual pain, not the full list.
      </p>

      <div v-if="toolNote" class="memory-picker__note">
        <strong>Tool note:</strong> {{ toolNote }}
      </div>

      <div class="memory-picker__note">
        <strong>Privacy note:</strong> {{ privacyNote }}
      </div>

      <div class="memory-picker__note">
        <strong>Team practice:</strong> {{ teamNote }}
      </div>

      <p class="memory-picker__caveat">
        This picker mirrors the recommendations in <a href="./practice-and-risks">Practice and risks</a>. For nuance and the author's actual stack, read that page.
      </p>
    </div>
  </div>
</template>
