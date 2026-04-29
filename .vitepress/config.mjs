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
      { text: 'Skills & Memory', link: '/06-skills-and-memory/' },
      { text: 'Quality & Security', link: '/07-quality-and-security/' },
      { text: 'Team & Adoption', link: '/08-team-and-adoption/' },
      {
        text: 'More',
        items: [
          { text: 'Effective use', link: '/03-effective-use/' },
          { text: 'Understanding & context', link: '/04-understanding-and-context/' },
          { text: 'Workflows', link: '/05-workflows/' },
          { text: 'Frontier', link: '/09-frontier/' },
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
        text: '06 — Skills & Memory',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/06-skills-and-memory/' },
          { text: 'Skills, what are they', link: '/06-skills-and-memory/what-are-skills' },
          { text: 'Skills, ecosystem landscape', link: '/06-skills-and-memory/ecosystem-landscape' },
          { text: 'Skills, choosing', link: '/06-skills-and-memory/choosing-skills' },
          { text: 'Skills, building your own', link: '/06-skills-and-memory/building-your-own' },
          { text: 'Skills, quality and anti-patterns', link: '/06-skills-and-memory/quality-and-anti-patterns' },
          { text: '🧩 Skill picker (interactive)', link: '/06-skills-and-memory/skill-picker' },
          { text: 'Memory, what is it', link: '/06-skills-and-memory/what-is-memory' },
          { text: 'Memory, vendor-native', link: '/06-skills-and-memory/vendor-native' },
          { text: 'Memory, interaction tools', link: '/06-skills-and-memory/interaction-memory' },
          { text: 'Memory, artifact (code KGs)', link: '/06-skills-and-memory/artifact-memory' },
          { text: 'Memory, practice and risks', link: '/06-skills-and-memory/practice-and-risks' },
          { text: '🧠 Memory picker (interactive)', link: '/06-skills-and-memory/memory-picker' },
        ]
      },
      {
        text: '07 — Quality & Security',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/07-quality-and-security/' },
          { text: 'Technical excellence', link: '/07-quality-and-security/technical-excellence' },
          { text: 'When things go wrong', link: '/07-quality-and-security/when-things-go-wrong' },
          { text: 'AI for maintenance', link: '/07-quality-and-security/ai-for-maintenance' },
          { text: 'The threat landscape', link: '/07-quality-and-security/threat-landscape' },
          { text: 'Defenses', link: '/07-quality-and-security/defenses' },
          { text: 'Supply chain & prompt injection', link: '/07-quality-and-security/supply-chain' },
          { text: 'Regulation & policy', link: '/07-quality-and-security/regulation' },
        ]
      },
      {
        text: '08 — Team & Adoption',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/08-team-and-adoption/' },
          { text: 'Measuring impact', link: '/08-team-and-adoption/measuring-impact' },
          { text: 'For team leads', link: '/08-team-and-adoption/for-team-leads' },
          { text: 'Junior developers', link: '/08-team-and-adoption/junior-developers' },
          { text: 'The alignment bottleneck', link: '/08-team-and-adoption/alignment-bottleneck' },
          { text: 'AI coding maturity model', link: '/08-team-and-adoption/maturity-model' },
          { text: 'Risk, governance, policy', link: '/08-team-and-adoption/risk-governance-policy' },
          { text: 'ROI and the case for investment', link: '/08-team-and-adoption/roi-and-board-narrative' },
          { text: 'Org design + platform team', link: '/08-team-and-adoption/org-design' },
          { text: 'The 90-day roadmap', link: '/08-team-and-adoption/90-day-roadmap' },
          { text: 'Case studies', link: '/08-team-and-adoption/case-studies' },
          { text: '📊 Maturity assessment (interactive)', link: '/08-team-and-adoption/assessment' },
          { text: 'Templates', link: '/08-team-and-adoption/templates/' },
        ]
      },
      {
        text: '09 — Frontier',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/09-frontier/' },
          { text: 'Research frontier', link: '/09-frontier/research-frontier' },
          { text: 'Recent updates (April 2026)', link: '/09-frontier/recent-updates-april-2026' },
          { text: "What's coming next", link: '/09-frontier/whats-coming' },
          { text: 'The bottom line', link: '/09-frontier/bottom-line' },
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
