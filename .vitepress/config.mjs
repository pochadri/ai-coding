import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: "AI Coding Tools",
  description: "An honest practitioner's guide to AI coding tools after two years of daily use.",
  base: '/ai-coding/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: false,

  // Mermaid configuration — brand-matched, dark-mode aware
  // htmlLabels intentionally false: HTML-in-foreignObject wraps unreliably;
  // native SVG labels handle <br/> correctly and size nodes to content.
  mermaid: {
    theme: 'base',
    themeVariables: {
      primaryColor: '#3c8772',
      primaryTextColor: '#ffffff',
      primaryBorderColor: '#2d6b5a',
      lineColor: '#3c8772',
      secondaryColor: '#e8f3ef',
      tertiaryColor: '#f6f8fa',
      mainBkg: '#3c8772',
      secondBkg: '#e8f3ef',
      tertiaryBkg: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      fontSize: '14px',
    },
    flowchart: {
      curve: 'basis',
      htmlLabels: false,
      nodeSpacing: 50,
      rankSpacing: 50,
      diagramPadding: 20,
    },
    sequence: {
      diagramMarginX: 20,
      diagramMarginY: 20,
      boxMargin: 10,
      noteMargin: 10,
      messageMargin: 35,
    },
    securityLevel: 'loose',
  },
  mermaidPlugin: {
    class: 'mermaid-diagram',
  },

  rewrites: {
    'README.md': 'index.md',
    'skills/README.md': 'skills/index.md',
  },

  head: [
    ['link', { rel: 'icon', href: '/ai-coding/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }],
  ],

  markdown: {
    lineNumbers: false,
  },

  themeConfig: {
    nav: [
      { text: 'Quick start', link: '/QUICKSTART' },
      { text: 'Prompts', link: '/PROMPTS' },
      { text: 'Foundations', link: '/01-foundations/' },
      { text: 'Tools', link: '/02-tools/' },
      { text: 'Skills', link: '/06-skills/' },
      { text: 'Memory', link: '/07-memory/' },
      { text: 'Security', link: '/09-security/' },
      { text: 'Adoption', link: '/12-adoption/' },
      {
        text: 'More',
        items: [
          { text: 'Effective use', link: '/03-effective-use/' },
          { text: 'Understanding & context', link: '/04-understanding-and-context/' },
          { text: 'Workflows', link: '/05-workflows/' },
          { text: 'Quality', link: '/08-quality/' },
          { text: 'Team & process', link: '/10-team-and-process/' },
          { text: 'Frontier', link: '/11-frontier/' },
          { text: '—', link: '#' },
          { text: 'Glossary', link: '/GLOSSARY' },
          { text: 'References', link: '/REFERENCES' },
        ]
      },
    ],

    sidebar: [
      {
        text: 'Start here',
        collapsed: false,
        items: [
          { text: '🚀 Quick start', link: '/QUICKSTART' },
          { text: '📋 Prompt library', link: '/PROMPTS' },
        ]
      },
      {
        text: '01 — Foundations',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/01-foundations/' },
          { text: 'Why I wrote this', link: '/01-foundations/why-this-guide' },
          { text: 'The state of the industry', link: '/01-foundations/state-of-industry' },
          { text: 'The research landscape', link: '/01-foundations/research-landscape' },
          { text: 'My personal experience', link: '/01-foundations/my-experience' },
        ]
      },
      {
        text: '02 — Tools',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/02-tools/' },
          { text: 'GitHub Copilot', link: '/02-tools/github-copilot' },
          { text: 'Cursor', link: '/02-tools/cursor' },
          { text: 'Claude Code', link: '/02-tools/claude-code' },
          { text: 'OpenAI Codex', link: '/02-tools/openai-codex' },
          { text: 'Other tools', link: '/02-tools/other-tools' },
          { text: 'Recommended setup', link: '/02-tools/recommended-setup' },
        ]
      },
      {
        text: '03 — Effective use',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/03-effective-use/' },
          { text: 'Where AI helps', link: '/03-effective-use/where-ai-helps' },
          { text: 'Prompting patterns', link: '/03-effective-use/prompting-patterns' },
          { text: 'Review discipline', link: '/03-effective-use/review-discipline' },
          { text: 'Language effectiveness', link: '/03-effective-use/language-effectiveness' },
          { text: 'Failure modes', link: '/03-effective-use/failure-modes' },
        ]
      },
      {
        text: '04 — Understanding & context',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/04-understanding-and-context/' },
          { text: 'The understanding problem', link: '/04-understanding-and-context/understanding-problem' },
          { text: 'Context engineering', link: '/04-understanding-and-context/context-engineering' },
        ]
      },
      {
        text: '05 — Workflows',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/05-workflows/' },
          { text: 'Spec-driven development', link: '/05-workflows/spec-driven-development' },
          { text: 'Agents', link: '/05-workflows/agents' },
          { text: 'Skills (pointer)', link: '/05-workflows/skills-ecosystem' },
        ]
      },
      {
        text: '06 — Skills',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/06-skills/' },
          { text: 'What are skills', link: '/06-skills/what-are-skills' },
          { text: 'Ecosystem landscape', link: '/06-skills/ecosystem-landscape' },
          { text: 'Choosing skills', link: '/06-skills/choosing-skills' },
          { text: 'Building your own', link: '/06-skills/building-your-own' },
          { text: 'Quality and anti-patterns', link: '/06-skills/quality-and-anti-patterns' },
          { text: '🧩 Skill picker (interactive)', link: '/06-skills/picker' },
        ]
      },
      {
        text: '07 — Memory',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/07-memory/' },
          { text: 'What is memory', link: '/07-memory/what-is-memory' },
          { text: 'Vendor-native memory', link: '/07-memory/vendor-native' },
          { text: 'Interaction memory tools', link: '/07-memory/interaction-memory' },
          { text: 'Artifact memory (code KGs)', link: '/07-memory/artifact-memory' },
          { text: 'Practice and risks', link: '/07-memory/practice-and-risks' },
          { text: '🧠 Memory picker (interactive)', link: '/07-memory/picker' },
        ]
      },
      {
        text: '08 — Quality',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/08-quality/' },
          { text: 'Technical excellence', link: '/08-quality/technical-excellence' },
          { text: 'When things go wrong', link: '/08-quality/when-things-go-wrong' },
          { text: 'AI for maintenance', link: '/08-quality/ai-for-maintenance' },
        ]
      },
      {
        text: '09 — Security',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/09-security/' },
          { text: 'The threat landscape', link: '/09-security/threat-landscape' },
          { text: 'Defenses', link: '/09-security/defenses' },
          { text: 'Supply chain & prompt injection', link: '/09-security/supply-chain' },
          { text: 'Regulation & policy', link: '/09-security/regulation' },
        ]
      },
      {
        text: '10 — Team & process',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/10-team-and-process/' },
          { text: 'Measuring impact', link: '/10-team-and-process/measuring-impact' },
          { text: 'For team leads', link: '/10-team-and-process/for-team-leads' },
          { text: 'Junior developers', link: '/10-team-and-process/junior-developers' },
          { text: 'The alignment bottleneck', link: '/10-team-and-process/alignment-bottleneck' },
        ]
      },
      {
        text: '11 — Frontier',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/11-frontier/' },
          { text: 'Research frontier', link: '/11-frontier/research-frontier' },
          { text: 'Recent updates (April 2026)', link: '/11-frontier/recent-updates-april-2026' },
          { text: "What's coming next", link: '/11-frontier/whats-coming' },
          { text: 'The bottom line', link: '/11-frontier/bottom-line' },
        ]
      },
      {
        text: '12 — Adoption',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/12-adoption/' },
          { text: 'AI coding maturity model', link: '/12-adoption/maturity-model' },
          { text: 'Risk, governance, policy', link: '/12-adoption/risk-governance-policy' },
          { text: 'ROI and the case for investment', link: '/12-adoption/roi-and-board-narrative' },
          { text: 'Org design + platform team', link: '/12-adoption/org-design' },
          { text: 'The 90-day roadmap', link: '/12-adoption/90-day-roadmap' },
          { text: 'Case studies', link: '/12-adoption/case-studies' },
          { text: '📊 Maturity assessment (interactive)', link: '/12-adoption/assessment' },
          { text: 'Templates', link: '/12-adoption/templates/' },
        ]
      },
      {
        text: 'Reference',
        collapsed: true,
        items: [
          { text: 'Glossary', link: '/GLOSSARY' },
          { text: 'References', link: '/REFERENCES' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pochadri/ai-coding' },
    ],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/pochadri/ai-coding/edit/main/:path',
      text: 'Suggest an edit on GitHub',
    },

    footer: {
      message: 'A practitioner\'s guide. Opinions are the author\'s.',
      copyright: 'MIT License',
    },

    outline: {
      level: [2, 3],
      label: 'On this page',
    },
  },
}))
