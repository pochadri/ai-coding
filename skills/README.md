# Installable skills

This directory contains **installable artifacts**: actual skills you can drop into your
AI coding tool (Claude Code, Cursor, Codex CLI, etc.) and use immediately. They're
distinct from the documentation in folders 01–11, which is meant to be read; these are
meant to be installed.

## What's here

### `skill-recommender/`

A meta-skill that runs a phased Q&A and recommends the right skill stack for your
project, both *existing skills to install* and *custom skills to write yourself*. It's
the conversational version of [the web-based picker](../06-skills-and-memory/skill-picker.md).

**Triggers** (any of these phrases):
- *"recommend skills for my project"*
- *"what skills should I install"*
- *"which skill stack"*
- *"what custom skills should I write"*

**What you'll get back:**
1. A short discovery conversation in 2-3 phases (~3 min): tool + language → project
   shape → team + workflow.
2. A recommended **install set** of 2-5 existing skills, with install commands matched
   to your AI tool.
3. A recommended **custom-write set** of 2-4 starter skills to author yourself, each
   with a complete `SKILL.md` scaffold ready to fork. Includes Java framework variants
   (Spring / Quarkus / Micronaut / plain Java) when applicable.
4. A "What to ignore" section explaining what's specifically *not* recommended for your
   profile and why.

The recommendation logic mirrors the SkillPicker decision tree but the conversational
form lets the agent ask follow-ups based on context (e.g., "you mentioned you're touching
legacy auth code, let me adjust").

## How to install

The install steps below assume you have `git` available. Pick the path for your tool.

### Claude Code (macOS / Linux)

```bash
# Clone into a working directory you keep around (NOT /tmp, that disappears)
git clone https://github.com/pochadri/ai-coding.git ~/src/ai-coding

# Install the skill into Claude Code's user skill dir
mkdir -p ~/.claude/skills
cp -r ~/src/ai-coding/skills/skill-recommender ~/.claude/skills/
```

Then in any Claude Code session, type a trigger phrase like:
*"recommend skills for my project"*

### Claude Code (Windows / PowerShell)

```powershell
git clone https://github.com/pochadri/ai-coding.git $HOME\src\ai-coding
New-Item -ItemType Directory -Force -Path $HOME\.claude\skills | Out-Null
Copy-Item -Recurse $HOME\src\ai-coding\skills\skill-recommender $HOME\.claude\skills\
```

### Cursor / Codex CLI / Other tools using SKILL.md open standard

```bash
git clone https://github.com/pochadri/ai-coding.git ~/src/ai-coding

# Pick the path for your tool:
#   Cursor:        ~/.cursor/skills/
#   Codex CLI:     ~/.codex/skills/
#   OpenCode / Goose / Amp / Aider: see your tool's docs for the skills path

mkdir -p ~/.cursor/skills            # adjust target dir per tool
cp -r ~/src/ai-coding/skills/skill-recommender ~/.cursor/skills/
```

### Verify the install loaded

After installing, ask your tool exactly this:

> *"recommend skills for my project — I'm on Claude Code, Java, Spring Boot backend,
> growth-stage SaaS, small team."*

**If the skill loaded:** the response begins by walking you through the recommendation
phases, then ends with the structured 5-section output (`📦 Install these / 🛠 Write these
yourself / Where to put them / What to ignore / Caveats`) and includes Spring-specific
custom-skill scaffolds.

**If you got a generic, free-form answer instead:** the skill didn't load. Check that
`SKILL.md` exists at the install path you used (e.g., `~/.claude/skills/skill-recommender/SKILL.md`),
and that your tool reads from that location.

## How to keep it fresh

The recommendations are sourced from `references/install-catalog.md` and
`references/custom-skill-templates.md` in the skill folder. These files mirror
[`06-skills-and-memory/ecosystem-landscape.md`](../06-skills-and-memory/ecosystem-landscape.md), the same
catalog that drives the website. **Refresh quarterly** (or whenever you notice the
ecosystem has moved) by re-syncing from this repo:

```bash
cd ~/src/ai-coding && git pull
cp -r ~/src/ai-coding/skills/skill-recommender ~/.claude/skills/   # adjust target dir
```

The install commands inside `references/install-catalog.md` are the most likely thing
to drift between refreshes, vendor marketplaces and plugin formats change. If a
recommended install command fails, fall back to `git clone <repo> + cp` into your
tool's skills directory; that pattern works for any SKILL.md-format skill regardless
of marketplace state.

## License

MIT (matches the rest of the repo).

## How this skill was made

This is itself an example of the "build your own skill" pattern this guide recommends.
The decision rules in `SKILL.md` are extracted from prompts the author was repeating;
the references files separate static catalog data from instructions; progressive
disclosure keeps the always-loaded `SKILL.md` portion lean. If you're learning to author
skills, read `SKILL.md` here as a working example, then read
[Building your own skills](../06-skills-and-memory/building-your-own.md) for the full pattern.
