---
title: Style Guide
summary: How this guide is written and how to keep it consistent. Voice, structure, words to avoid, citation rules, formatting. Drawn from what's actually worked across the last few months of edits and from technical writing I admire.
last_updated: 2026-04-28
---

# Style Guide

This document captures the voice, structure, and editorial decisions that make the guide read the way it does. It exists so future edits land in the same voice the rest of the guide uses, and so when something feels "off" we have a reference to point at.

If you're editing a page and aren't sure whether a phrasing belongs, this is the document to check.

## The voice baseline

You are talking to a fellow working engineer. A peer. Sometimes a senior engineer; sometimes a CTO. Never a generic "reader." Never an "audience." Never a "user."

What that sounds like in practice:

- **First-person.** "I do X" / "I've found Y" / "what I do" / "I keep watching teams hit Z." Not "developers should" / "teams need to" / "organizations must."
- **Direct.** Say the thing. "The thing that breaks is speed." Not "It's worth noting that one factor that may contribute is increased speed."
- **Opinionated.** Recommend one thing, not a menu. If two options are close, pick one and say why in one sentence.
- **Honest about limits.** "I haven't verified this." "The exact number varies; the pattern holds." "I'm still uncertain about X." Hedge when the evidence is weak; commit when it's not.
- **Short sentences when possible.** Long sentences when needed. Vary the rhythm so it doesn't read like every sentence has the same length.
- **Casual, not corporate.** You'd use these words on a Slack thread with a peer. You wouldn't use them in a press release.

The reference points I keep in mind: Martin Kleppmann's clarity in *Designing Data-Intensive Applications*, the peer-voice directness of Hunt & Thomas's *The Pragmatic Programmer*, the war-story specificity of Google's *Site Reliability Engineering* book, and the practical opinion of Tanya Reilly's *The Staff Engineer's Path* and Will Larson's writing. None of those books talk down to the reader; none of them perform expertise; none of them dilute their opinions to be inclusive of every audience. That's the target.

## Words and patterns to avoid

These are the AI / consultant / vendor-marketing tells that have crept into earlier drafts. They get caught and stripped on every audit pass. Don't write them in the first place.

**Consultant words:**

- "best-in-class" → "the strongest [I've used]" or "my pick"
- "leverage" (verb) → "use"
- "stakeholder" → "the person / team / customer who cares" (be specific)
- "robust" (as marketing) → "reliable" or just describe the property
- "mission-critical" → "the thing that breaks the business if it goes down"
- "synergy" → just delete it
- "world-class" / "next-generation" / "cutting-edge" → just delete them
- "drive value" / "deliver value" / "value-add" → describe what actually happens
- "empower" / "unlock" / "unleash" → "let X do Y"
- "seamless" → "smooth" or describe the actual UX
- "paradigm shift" → "step-change" or just describe the change
- "holistic" → use only when literally meaning "whole-system"
- "comprehensive" (in marketing sense) → just describe what it covers
- "ecosystem of solutions" → just delete

**AI-tell phrasings:**

- "It's worth noting that..." → just say the thing
- "It's important to remember that..." → just say the thing
- "There are several factors to consider..." → list the factors directly
- "Depending on your context..." → say what to do; let the reader adjust
- "In conclusion..." / "To summarize..." → if you need to summarize, you wrote too much; cut instead
- "This page will cover..." / "In this section we'll discuss..." → just start covering it

**Meta-narration about the page itself:**

- "This page is about X." (The reader knows; they clicked it.)
- "In the next section we'll cover Y." (Just put it in the next section.)
- "I cover this elsewhere in folder Z." (Use a `Related reading` link at the bottom.)
- "This page focuses on the *do* side; the data side lives in [other page]." (If both exist, just link; don't narrate the structural division.)

A peer doesn't read out the table of contents while talking. Neither should this guide.

**Pious absolutism:**

- "Never use AI for X." → "Don't trust AI for X without [the discipline]."
- "You must always Y." → "I'd Y, every time. Here's why."

The pious version doesn't survive a deadline. The honest version does.

**"We" voice in body prose:**

- The guide is one author's perspective. "We" appears only inside template boilerplate (an `AGENTS.md` template uses "we" because the team writing it would). In body prose, it's "I."

## Sentence-level patterns

**Rhythm.** Vary sentence length deliberately. Short sentences punch. Long sentences develop. Two long ones in a row drag. Three short ones in a row can land like rapid fire when that's the effect you want; otherwise, mix it up.

**Active voice over passive.** "The agent generates code." Not "Code is generated by the agent." Passive is fine occasionally to shift emphasis; default to active.

**Concrete over abstract.** "AI generated the wrong rate-limit key" beats "AI made an architectural error." Always pick the specific thing over the generic category. If you can't make it specific, you might not know enough to write the sentence yet.

**Show, don't tell.** "The agent suggested `pickle` to deserialize user input" beats "the agent often suggests insecure patterns." A worked example with real code beats five paragraphs of principles.

**Cut filler.** "In order to" → "to". "At this point in time" → "now". "Due to the fact that" → "because". "On a regular basis" → "regularly". Run a mental delete on every sentence: which words can go without losing meaning?

## Page structure

A typical content page has this skeleton:

1. **Frontmatter:** `title`, `summary`, `tags`, `related`, `last_updated`. The summary is what shows in search and in folder index pages; write it as a sentence that stands alone.
2. **Lede paragraph.** The thesis of the page. Should land the main idea in the first 2-3 sentences. If the lede is buried in paragraph 3, restructure.
3. **Logical sections.** Problem → response → action. Or chronological. Or principle → counterexample → resolution. Pick a structure and stick with it.
4. **Worked examples** where they help. One concrete example often beats a paragraph of theory.
5. **What "good" looks like** (optional, but lands well at the end of how-to pages). A short list of things you'd see in a team / project doing this right.
6. **Related reading** at the bottom. Links to adjacent pages. Use prose-style ("Defenses, the practical mitigations") not bare titles.
7. **Sources** at the very bottom (when needed). Citations and references for any claims that need them. See the citations rule below.

Headers are sentence case ("How specs harden over time") not title case ("How Specs Harden Over Time"). Use H2 for major sections, H3 for sub-sections within them. Avoid H4 unless you really need it; if you do, the H3 above probably wants splitting.

## Citations and references

The rule we landed on, and the rule that should hold from here on:

**Inline citations only when the link is the proof for a specific load-bearing claim.** If the body sentence works without the citation (which is most of the time), put the citation in the page-bottom Sources section.

What counts as "load-bearing":
- Quoting a specific finding ("Veracode's 55% number")
- Pointing at the primary source for a contested claim
- Linking to a tool the reader needs to install

What doesn't count:
- Generic "see the literature" gestures
- Links pasted to look credible
- Citations for things that are common knowledge in the field

The Sources section at the bottom of a page should be a short bullet list:

```markdown
## Sources

- Veracode Spring 2026 GenAI Code Security Report, 55% secure baseline (link)
- Black Duck 2026 OSSRA Report, 107% YoY vulnerability jump (link)
```

Each bullet is a link plus a short description of what the source proves. No need to format like an academic citation.

If a page draws all its data from another page in the guide, the Sources section can simply point at the other page rather than re-listing the citations. Example: the quality folder pages can say "for the underlying numbers, see [09 — The threat landscape](./09-security/threat-landscape.md)" rather than re-citing Veracode, Black Duck, etc.

The full registry of sources lives in `REFERENCES.md` at the repo root; per-page Sources sections are short pointers, not exhaustive lists.

## Linking

Links should flow with the prose, not tack onto the end of sentences as afterthoughts.

**Good:** "I now treat horizontal-concern lines in [my spec template](./05-workflows/spec-driven-development.md) the way I used to treat security-review checklists."

**Bad:** "I now treat horizontal-concern lines in my spec template the way I used to treat security-review checklists. (See: spec-driven development.)"

When a link is to another page in this guide, prefer the descriptive in-text form. When a link is to an external URL that's the source of a claim, the load-bearing pattern above applies (inline if it's the proof; otherwise footer).

Don't link to the same page repeatedly within one page. The first reference is enough; later references can use the term without the link.

Cross-folder links use relative paths (`../09-security/defenses.md`). Don't use absolute paths.

## Punctuation

**Em-dashes.** Used sparingly. The AI tell is "X — Y" patterns where X and Y could be joined with a period or comma. Convert most em-dashes to periods, commas, parens, or colons depending on context. The em-dashes that stay are in section headers (`### Phase 1 — Tool & language`) and the rare dramatic-aside use in body prose. If a page has more than ~10 em-dashes in body prose, it's overusing them.

**Commas.** Oxford comma yes ("X, Y, and Z"). Vary comma placement to control rhythm.

**Colons.** Use for setups: a sentence introducing what follows. Don't use as a poor substitute for an em-dash.

**Parentheses.** Fine for asides. Don't nest them. Don't put load-bearing claims inside them.

**Quotes.** Double quotes for direct quotes from people; single quotes only inside double quotes. Italics for emphasis on words; bold for *load-bearing* terms or emphasis you want to actually scan-pop.

## Formatting

**Bold** — emphasis you want to actually pop visually. Sparingly. If everything is bold, nothing is.

*Italic* — for emphasis on a single word, or for terms-of-art on first introduction. Don't italicize entire sentences except in rare quotes.

`Code formatting` — for any code, command, file path, environment variable, or product/tool name when referring to it as a noun. `Claude Code` is fine in body text without code formatting; `claude-code` (the CLI invocation) gets backticks.

**Lists.** Use them when you have ≥3 things that share a structure. Don't use them as a way to avoid writing actual prose. A bullet list of single-word items is a sign the prose was abandoned mid-sentence.

**Bullet bold-leads.** The "**Topic:** description" pattern is fine occasionally. Overusing it is a clear AI tell. If the page has more than ~6-8 of them, restructure.

**Tables.** For comparisons across ≥3 dimensions. Don't use a table for a 2-row 2-column comparison; that's just a sentence.

**Diagrams.** Mermaid diagrams for processes / decision trees / state changes. Caption them with `<p class="mermaid-caption">▴ Caption text.</p>`. Diagrams aren't a substitute for prose; they're a complement.

**Code blocks.** Triple backticks with a language hint (`python`, `bash`, `markdown`). Real code over pseudo-code wherever possible. If the snippet is illustrative not literal, say so.

## Honesty patterns

These are the moves that make the guide trustworthy. Use them deliberately.

- **Flag your own coinage.** "What I call X in this guide" or "the term is mine, not the source's." Don't present made-up terminology as established jargon.
- **Hedge factual claims when unsure.** "The exact multiplier varies; the pattern holds." "I haven't independently verified this." Don't claim precision you don't have.
- **Acknowledge what you changed your mind about.** This is the most-trustworthy section any page can have. Use it where applicable.
- **Acknowledge what you're still uncertain about.** Same.
- **Cite when challenging a claim.** If you're going to say "Vendor X says Y, but I don't buy it," link to the vendor's claim so the reader can see both.
- **Don't dismiss tools in language stronger than the evidence.** "Disqualified" is too strong; "two governance signals worth knowing" is honest. We learned this with the GSD reframing.

## Length and depth

Match the depth to the topic's importance, not to a uniform target.

- **A folder index** (e.g., `08-quality/index.md`) is appropriately ~30-50 lines. It's a router.
- **A short personal-setup statement** (e.g., `02-tools/recommended-setup.md`) is appropriately ~30-50 lines.
- **A typical content page** is ~100-200 lines.
- **A heavyweight topic page** (e.g., `09-security/defenses.md`) can be ~200-400 lines.
- **An exhaustive reference** (`REFERENCES.md`) has its own length logic.

Don't pad. If you have nothing more to say, stop. The reader will respect it.

Don't truncate either. If a topic warrants depth and you cut it short to fit a self-imposed length budget, the page will read as a stub.

When in doubt, look at the depth of the strongest pages in the guide as calibration: `09-security/defenses.md`, `09-security/threat-landscape.md`, `01-foundations/my-experience.md`, `12-adoption/index.md`, `10-team-and-process/alignment-bottleneck.md`. These are the depth baseline for "comprehensive."

## Recommendations: be opinionated

The guide is opinionated. Recommendations should be specific, not menu-style.

**Good:** "Default to Sentry's general-purpose `code-review` standalone if you're not a Sentry user; install the full bundle if you are."

**Bad:** "Various code-review skills are available; consider your team's needs and select accordingly."

When you have to surface multiple options because the right answer truly depends on context, name the deciding factor and tell the reader which option fits which side. Don't leave them to figure it out.

Cap the number of recommendations. The "3 active skills" guidance is a typical example: a recommendation that says "use 3" lands; one that says "consider 5-10" doesn't. Constraints are part of the advice.

## Worked examples beat principles

Whenever a principle could be illustrated with a real example, use the example. Examples that have landed well in this guide:

- The `your-app-error-wrapper` skill (in [building your own skills](./06-skills/building-your-own.md))
- The password-reset endpoint security review (in [defenses](./09-security/defenses.md))
- The rate-limiting spec evolution (in [spec-driven development](./05-workflows/spec-driven-development.md))
- The endpoint-that-worked-but-had-no-logs example (in [technical excellence](./08-quality/technical-excellence.md))

The pattern: a real situation, the diff or output the agent produced, what was wrong with it, what the fix was, and the lesson generalized. Three-to-five paragraphs of worked example beats ten paragraphs of theory every time.

## Closing patterns

Pages can end in a few ways. Pick one that fits:

- **"What I'd tell a peer"** — a single paragraph summarizing the practical action, in the voice you'd use over coffee. Strong choice for advice-heavy pages.
- **"What 'good' looks like"** — a short list of observable behaviors of a team / project doing this right. Strong choice for how-to pages.
- **"What I'm still uncertain about"** — honest reflection on open questions. Strong choice for opinion-heavy pages.
- **Just stop.** When the page has said what it needs to say, stop. No "in conclusion."

After the closing, you can add `Related reading` and `Sources` sections, in that order.

## Editing pass: what to look for

When reviewing a draft, run these checks:

1. **First sentence test:** does the lede land the thesis, or is it scene-setting filler?
2. **Read-aloud test:** does this sound like a peer talking, or a corporate doc?
3. **Consultant-words grep:** scan for the avoid-list above; cut any matches.
4. **Em-dash count:** more than ~10 in body prose is a sign to convert most.
5. **Bullet-bold-lead count:** more than ~6-8 in one page is a sign to restructure.
6. **Citation density:** more than ~3 inline citations per page is usually too many; move to footer.
7. **Meta-narration scan:** any sentence that's about the page rather than the content of the page should be cut.
8. **"We" scan:** "we" should not appear in body prose (only in template boilerplate).
9. **Length check:** does the depth match the topic? See the length section above.
10. **Closing check:** does the page actually end, or does it taper off?

## Influences

The technical writing this guide tries to be in the lineage of:

- Martin Kleppmann, *Designing Data-Intensive Applications* — for opinionated clarity on hard topics
- Hunt & Thomas, *The Pragmatic Programmer* — for peer voice and density of practical advice
- Google SRE team, *Site Reliability Engineering* — for war-story specificity
- Tanya Reilly, *The Staff Engineer's Path* — for accessible voice on senior-engineer topics
- Will Larson, *Staff Engineer* and *An Elegant Puzzle* — for opinionated brevity
- Julia Evans' zines and blog posts — for concrete examples and curious tone
- Hillel Wayne's blog — for opinionated, well-grounded technical writing

What these have in common, and what this guide is trying to keep:
- They talk to a working engineer, not "the audience"
- They commit to opinions and explain the reasoning
- They use concrete examples, not just principles
- They acknowledge limits and uncertainty
- They don't perform expertise; they share it

When in doubt about voice, re-read a page from one of those books and ask: would this fit there? If yes, you're probably on the baseline.
