import DefaultTheme from 'vitepress/theme'
import SkillPicker from './components/SkillPicker.vue'
import MemoryPicker from './components/MemoryPicker.vue'
import MaturityAssessment from './components/MaturityAssessment.vue'
import './custom.css'

// Mermaid diagrams render with inline style="...!important" attributes that
// CSS cannot override. Swap colors at runtime when .dark toggles.
// Single-pass replace via combined regex to avoid cascading flips
// (e.g., #18181B -> #FAFAFA and #FAFAFA -> #27272A would otherwise loop).
const MERMAID_DARK_MAP = {
  '#FAFAFA': '#27272A',
  '#F4F4F5': '#1F1F23',
  '#E4E4E7': '#3F3F46',
  '#1A1614': '#3F3F46',
  '#18181B': '#FAFAFA',
  '#9F2D24': '#E25647',
  '#71717A': '#A1A1AA',
  '#7A1F18': '#C8503D',
  '#000000': '#52525B',
  '#52525B': '#A1A1AA',
}
const MERMAID_DARK_RE = new RegExp(
  Object.keys(MERMAID_DARK_MAP).map(k => k.replace('#', '\\#')).join('|'),
  'gi',
)

function applyMermaidTheme() {
  if (typeof document === 'undefined') return
  const isDark = document.documentElement.classList.contains('dark')
  document.querySelectorAll('.mermaid-diagram [style]').forEach(el => {
    if (!el.dataset.mermaidOrig) {
      el.dataset.mermaidOrig = el.getAttribute('style') || ''
    }
    const original = el.dataset.mermaidOrig
    if (!isDark) {
      if (el.getAttribute('style') !== original) el.setAttribute('style', original)
      return
    }
    const swapped = original.replace(MERMAID_DARK_RE, m => MERMAID_DARK_MAP[m.toUpperCase()] || m)
    if (el.getAttribute('style') !== swapped) el.setAttribute('style', swapped)
  })
}

if (typeof window !== 'undefined') {
  const tryApply = () => applyMermaidTheme()
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryApply)
  } else {
    tryApply()
  }
  // Mermaid SVG arrives async after page load; poll a few times to catch it
  setTimeout(tryApply, 200)
  setTimeout(tryApply, 800)
  setTimeout(tryApply, 2000)

  // Theme toggle: re-apply when <html class> changes
  new MutationObserver(tryApply).observe(document.documentElement, {
    attributes: true, attributeFilter: ['class'],
  })

  // Watch for any mutation inside or adding a .mermaid-diagram
  new MutationObserver(muts => {
    for (const m of muts) {
      // Mutation target inside an existing mermaid-diagram (SVG render)
      if (m.target?.closest?.('.mermaid-diagram')) {
        tryApply()
        return
      }
      // New mermaid-diagram added (route change)
      for (const n of m.addedNodes) {
        if (n.nodeType !== 1) continue
        if (
          n.classList?.contains('mermaid-diagram') ||
          n.querySelector?.('.mermaid-diagram') ||
          n.closest?.('.mermaid-diagram')
        ) {
          tryApply()
          return
        }
      }
    }
  }).observe(document.body, { childList: true, subtree: true })
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SkillPicker', SkillPicker)
    app.component('MemoryPicker', MemoryPicker)
    app.component('MaturityAssessment', MaturityAssessment)
  },
}
