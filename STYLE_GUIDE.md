---
title: Style Guide
summary: How this guide is written. Voice, structure, scanning patterns, citation rules, formatting, and the research it's based on. Drawn from NN/g reader-behavior research, modern technical writing best practices, and what's worked in this guide so far.
last_updated: 2026-04-28
---

# Style Guide

This document captures the voice, structure, and editorial decisions that make the guide read the way it does. It exists so future edits land in the same voice the rest of the guide uses, and so when something feels off we have a reference to point at.

If you're editing a page and aren't sure whether a phrasing belongs, this is the document to check.

## What this is based on

The earlier draft of this guide was written from intuition. This version is grounded in three things:

1. **Two decades of NN/g eye-tracking research** on how people actually read web content. Most users scan, don't read. Average page visit is under a minute. The F-shaped reading pattern is 20-year-stable and still applies in 2024.
2. **What modern technical writers and engineers say works.** Sean Goedecke's blunt framing ("almost none of your readers will pay attention") is the operating premise. Will Larson, Julia Evans, Hillel Wayne, and the SRE-book authors are the lineage we're trying to be in.
3. **What's actually landed in this guide.** The pages we know work (the security folder, the alignment-bottleneck page, my-experience, the QUICKSTART) and the patterns inside them are the calibration target.

Sources are listed at the bottom of this page.

## The reality you're writing for

Before any rule about voice or structure, the operating assumption:

**Your reader is not reading. They are scanning.** The data is consistent across two decades of NN/g eye-tracking research: web users read about 25% of the text on a page they visit, and the average page visit is under 60 seconds. They scan in an F-pattern (left-to-right at the top, a shorter left-to-right midway down, then vertical down the left edge), or they layer-cake (subheadings only), or they spot-search (looking for one specific term). Few readers commit to thorough reading.

The implications are concrete:

- **The first sentence is the only sentence you're guaranteed they'll read.** Get the thesis into it. Better, get the thesis into the title.
- **Subheadings have to tell the story by themselves.** A reader who reads only your H2s should still get the argument. If your H2s are "Introduction" / "Background" / "Discussion," you've already lost.
- **The left edge of the page gets disproportionate attention.** Bold the load-bearing words near the start of paragraphs and bullets, not at the end.
- **Short paragraphs win.** Three sentences is plenty. Five-sentence paragraphs lose readers in the middle. Ten-sentence paragraphs don't get read.
- **Inverted pyramid: most important fact first, supporting detail in the middle, background last.** This is the dominant structure for modern web/blog content for a reason — it matches how readers actually consume.
- **TL;DR or lede summary at the top works.** A reader who reads only your summary should walk away with the actionable takeaway.

This isn't about dumbing down. The reader is a senior engineer or CTO who is genuinely intelligent but genuinely time-pressed. They want depth, but they want it organized so they can decide in 10 seconds whether to invest the next two minutes.

## The voice baseline

You are talking to a fellow working engineer. A peer. Sometimes a senior engineer; sometimes a CTO. Never a generic "reader." Never an "audience." Never a "user."

What that sounds like in practice:

- **First-person.** "I do X" / "I've found Y" / "what I do" / "I keep watching teams hit Z." Not "developers should" / "teams need to" / "organizations must."
- **Direct.** Say the thing. "The thing that breaks is speed." Not "It's worth noting that one factor that may contribute is increased speed."
- **Opinionated.** Recommend one thing, not a menu. If two options are close, pick one and say why in one sentence.
- **Honest about limits.** "I haven't verified this." "The exact number varies; the pattern holds." "I'm still uncertain about X." Hedge when the evidence is weak; commit when it's not.
- **Short sentences when possible.** Long sentences when needed. Vary the rhythm so it doesn't read like every sentence has the same length.
- **Casual, not corporate.** You'd use these words on a Slack thread with a peer. You wouldn't use them in a press release.

The reference points: Martin Kleppmann's clarity in *Designing Data-Intensive Applications*, the peer-voice directness of Hunt & Thomas's *The Pragmatic Programmer*, the war-story specificity of Google's *Site Reliability Engineering* book, and the practical opinion of Tanya Reilly's *The Staff Engineer's Path* and Will Larson's writing. None of those books talk down to the reader; none of them perform expertise; none of them dilute their opinions to be inclusive of every audience. That's the target.

## Words and patterns to avoid

These are the AI / consultant / vendor-marketing tells that have crept into earlier drafts.

**Consultant words:**

- "best-in-class" → "the strongest [I've used]" or "my pick"
- "leverage" (verb) → "use"
- "stakeholder" → "the person / team / customer who cares" (be specific)
- "robust" (as marketing) → "reliable" or describe the actual property
- "mission-critical" → "the thing that breaks the business if it goes down"
- "synergy" → just delete it
- "world-class" / "next-generation" / "cutting-edge" → just delete them
- "drive value" / "deliver value" / "value-add" → describe what actually happens
- "empower" / "unlock" / "unleash" → "let X do Y"
- "seamless" → "smooth" or describe the actual UX
- "paradigm shift" → "step-change" or just describe the change
- "holistic" → use only when literally meaning "whole-system"
- "ecosystem of solutions" → just delete

**AI-tell phrasings:**

- "It's worth noting that..." → just say the thing
- "It's important to remember that..." → just say the thing
- "There are several factors to consider..." → list them directly
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

The guide is one author's perspective. "We" appears only inside template boilerplate (an `AGENTS.md` template uses "we" because the team writing it would). In body prose, it's "I."

## Sentence-level patterns

**The first-sentence rule.** The first sentence determines whether the reader keeps going. Get the point into it. Don't open with scene-setting, throat-clearing, or "It's important to understand that..." The thesis goes in sentence one.

**Rhythm.** Vary sentence length deliberately. Short sentences punch. Long sentences develop. Two long ones in a row drag. Three short ones in a row land like rapid fire when that's the effect you want; otherwise, mix it up.

**Active voice over passive.** "The agent generates code." Not "Code is generated by the agent." Passive is fine occasionally to shift emphasis; default to active.

**Concrete over abstract.** "AI generated the wrong rate-limit key" beats "AI made an architectural error." Always pick the specific over the generic. If you can't make it specific, you might not know enough to write the sentence yet.

**Show, don't tell.** "The agent suggested `pickle` to deserialize user input" beats "the agent often suggests insecure patterns." A worked example with real code beats five paragraphs of principles.

**Cut filler.** "In order to" → "to." "At this point in time" → "now." "Due to the fact that" → "because." "On a regular basis" → "regularly." Run a mental delete on every sentence: which words can go without losing meaning?

**Paragraph length.** Three sentences is the sweet spot. Five is a hard ceiling for most paragraphs. Ten-sentence paragraphs do not get read; if you have one, it's actually two or three paragraphs that need separating.

## Page structure

A typical content page has this skeleton, in this order:

1. **Frontmatter:** `title`, `summary`, `tags`, `related`, `last_updated`. The summary is what shows in search and folder index pages; write it as a sentence that stands alone and would convince a scanner to click.
2. **Lede paragraph (the inverted pyramid top).** The thesis of the page. Should land the main idea in the first 2-3 sentences. If the lede is buried in paragraph 3, restructure.
3. **Optional TL;DR or "If you read nothing else" bullets.** For longer pages, a short bulleted summary right after the lede catches the layer-cake scanner. Use it when the page is long enough that someone will only read the top.
4. **Logical sections in priority order.** Most important first; supporting detail next; nuance and edge cases last. Inverted pyramid all the way down.
5. **Worked examples** where they help. One concrete example often beats a paragraph of theory.
6. **What "good" looks like** (optional). A short list of observable behaviors of a team / project doing this right. Strong choice for how-to pages.
7. **Related reading** at the bottom. Links to adjacent pages.
8. **Sources** at the very bottom (when needed). See the citations rule below.

**Headers and scanning.** Headers are sentence case ("How specs harden over time") not title case ("How Specs Harden Over Time"). Use H2 for major sections, H3 for sub-sections within them. Avoid H4 unless you really need it.

**Critical: subheadings should tell the story by themselves.** A reader who reads only your H2s should walk away with the argument. If your H2s are "Background" / "Discussion" / "Conclusion," you've designed for a thorough reader who doesn't exist. Strong H2s look like "The volume problem (in one paragraph)" or "Things I changed my mind about" or "What teams can do today."

**Section length.** Aim for a subheading every ~300-500 words of body text. Long stretches without a subheading break the layer-cake scanner; they assume you've gone off-topic and bail.

## Writing for scanners, not readers

This is the implication of the F-pattern / layer-cake research, in editing terms.

**Bold the load-bearing word, not the whole sentence.** A scanner's eye lands on bold text. If you bold a five-word phrase, the scanner reads the phrase. If you bold a 30-word sentence, you've turned bold off; nothing pops.

**Lead the bullet with the noun, not the qualifier.** "**Logging.** Is there structured logging at the right level?" beats "Is there structured logging at the right level? **(Logging)**." The scanner reads the lead word.

**Front-load the paragraph.** First sentence states the point. Subsequent sentences develop it. A reader who reads only your first sentences should still get the gist.

**Front-load the bullet.** Same rule, smaller scale. The first phrase of each bullet should be the load-bearing one.

**Use lists when you have ≥3 things that share a structure.** Don't use lists as a way to avoid writing prose. A bullet list of single-word items is a sign the prose was abandoned mid-sentence. A bullet list of full paragraphs is a sign the items wanted to be sub-sections instead.

**Tables for comparisons across ≥3 dimensions.** Don't use a table for a 2-row 2-column comparison; that's just a sentence.

**Visuals as cognitive-load reducers.** A diagram, table, or worked-example code block can convey in a glance what three paragraphs of prose convey slowly. Use them where they actually help; don't decorate.

## Visual hierarchy and cognitive load

NN/g and cognitive-load research consistently find that the same information presented with strong visual hierarchy is retained better than information presented as a wall of prose, even when the prose is well-written.

**Practical implications:**

- **Chunk into smaller sections** rather than one long flowing piece. Five sub-sections of 200 words each are more readable than one 1,000-word section.
- **Use diagrams for processes, decision trees, and state changes.** A Mermaid flowchart with five nodes communicates faster than three paragraphs describing the same flow.
- **Caption every diagram** so the scanner who only reads captions still gets the point. Use the established `<p class="mermaid-caption">▴ Caption text.</p>` pattern.
- **Use code blocks for code, not screenshots of code.** Searchable, copyable, accessible.
- **Tables aid comparison.** Use them for "X vs Y vs Z across these dimensions" content.

## Citations and references

The rule we landed on, and the rule that should hold from here on:

**Inline citations only when the link is the proof for a specific load-bearing claim.** If the body sentence works without the citation (which is most of the time), put the citation in the page-bottom Sources section.

What counts as load-bearing:

- Quoting a specific finding ("Veracode's 55% number")
- Pointing at the primary source for a contested claim
- Linking to a tool the reader needs to install

What doesn't count:

- Generic "see the literature" gestures
- Links pasted to look credible
- Citations for things that are common knowledge in the field

The Sources section at the bottom of a page is a short bullet list. Each bullet is a link plus a short description of what the source proves. No need to format like an academic citation.

If a page draws all its data from another page in the guide, the Sources section can simply point at the other page rather than re-listing the citations.

The full registry of sources lives in `REFERENCES.md` at the repo root; per-page Sources sections are short pointers, not exhaustive lists.

## Linking

Links should flow with the prose, not tack onto the end of sentences as afterthoughts.

**Good:** "I now treat horizontal-concern lines in [my spec template](./05-workflows/spec-driven-development.md) the way I used to treat security-review checklists."

**Bad:** "I now treat horizontal-concern lines in my spec template the way I used to treat security-review checklists. (See: spec-driven development.)"

When a link is to another page in this guide, prefer the descriptive in-text form. When a link is to an external URL that's the source of a claim, the load-bearing pattern above applies (inline if it's the proof; otherwise footer).

Don't link to the same page repeatedly within one page. The first reference is enough.

Cross-folder links use relative paths (`../09-security/defenses.md`). Don't use absolute paths.

## Punctuation

**Em-dashes.** Used sparingly. The AI tell is "X — Y" patterns where X and Y could be joined with a period or comma. Convert most em-dashes to periods, commas, parens, or colons depending on context. The em-dashes that stay are in section headers (`### Phase 1 — Tool & language`) and the rare dramatic-aside use in body prose. If a page has more than ~10 em-dashes in body prose, it's overusing them.

**Commas.** Oxford comma yes ("X, Y, and Z").

**Colons.** Use for setups: a sentence introducing what follows. Don't use as a poor substitute for an em-dash.

**Parentheses.** Fine for asides. Don't nest them. Don't put load-bearing claims inside them.

**Quotes.** Double quotes for direct quotes from people; single quotes only inside double quotes. Italics for emphasis on words; bold for *load-bearing* terms or emphasis you want to actually scan-pop.

## Formatting

**Bold** — emphasis you want to actually pop visually. Sparingly. If everything is bold, nothing is. Bold the load-bearing 1-3 words, not full sentences.

*Italic* — for emphasis on a single word, or for terms-of-art on first introduction. Don't italicize entire sentences except in rare quotes.

`Code formatting` — for any code, command, file path, environment variable, or product name when referring to it as a noun. `Claude Code` is fine in body text without code formatting; `claude-code` (the CLI invocation) gets backticks.

**Bullet bold-leads.** The "**Topic:** description" pattern works because the scanner's eye lands on the bold lead. Use it where bullets share a structure (e.g., "**Logging.** ... / **Observability.** ... / **Error handling.** ..."). Don't overuse; if every list on the page is bold-led, the page reads as AI-generated.

**Tables.** For comparisons across ≥3 dimensions.

**Diagrams.** Mermaid for processes, decision trees, state changes. Caption them.

**Code blocks.** Triple backticks with a language hint (`python`, `bash`, `markdown`). Real code over pseudo-code wherever possible. If the snippet is illustrative not literal, say so.

## Honesty patterns

These are the moves that make the guide trustworthy. Use them deliberately.

- **Flag your own coinage.** "What I call X in this guide" or "the term is mine, not the source's." Don't present made-up terminology as established jargon.
- **Hedge factual claims when unsure.** "The exact multiplier varies; the pattern holds." "I haven't independently verified this." Don't claim precision you don't have.
- **Acknowledge what you changed your mind about.** This is the most-trustworthy section any page can have. Use it where applicable.
- **Acknowledge what you're still uncertain about.** Same.
- **Cite when challenging a claim.** If you're going to say "Vendor X says Y, but I don't buy it," link to the vendor's claim so the reader can see both.
- **Don't dismiss tools in language stronger than the evidence.** "Disqualified" is too strong; "two governance signals worth knowing" is honest. (Lesson learned with the GSD reframing.)

## Length and depth

Match the depth to the topic's importance, not to a uniform target.

- **A folder index** (e.g., `08-quality/index.md`) is appropriately ~30-50 lines. It's a router.
- **A short personal-setup statement** (e.g., `02-tools/recommended-setup.md`) is appropriately ~30-50 lines.
- **A typical content page** is ~100-200 lines.
- **A heavyweight topic page** (e.g., `09-security/defenses.md`) can be ~200-400 lines.

Don't pad. If you have nothing more to say, stop.

Don't truncate. If a topic warrants depth and you cut it short, the page reads as a stub.

When in doubt, calibrate against the strongest pages: `09-security/defenses.md`, `09-security/threat-landscape.md`, `01-foundations/my-experience.md`, `12-adoption/index.md`, `10-team-and-process/alignment-bottleneck.md`.

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

The pattern: a real situation, the diff or output the agent produced, what was wrong with it, what the fix was, and the lesson generalized. Three-to-five paragraphs of worked example beats ten paragraphs of theory.

## Closing patterns

Pages can end in a few ways. Pick one that fits — and **vary across pages**. Closing patterns get formulaic at scale; if every page in the same folder ends with the same shape, the reader notices.

- **A single paragraph summarizing the practical action.** Don't label it "What I'd tell a peer" — the whole guide is in that voice already; calling out the closer announces what should be obvious. Just write the paragraph and let it close the page.
- **"What 'good' looks like"** — a short list of observable behaviors of a team / project doing this right. Strong choice for how-to pages, but don't put it on every how-to page.
- **"What I'm still uncertain about"** — honest reflection on open questions. Strong choice for opinion-heavy pages.
- **Just stop.** When the page has said what it needs to say, stop. No "in conclusion." No labeled section announcing the page is wrapping up.

After the closing, you can add `Related reading` and `Sources` sections, in that order.

**TL;DR or summary at the bottom?** For most pages, the inverted-pyramid structure means the summary is the lede; you don't need to repeat it at the bottom. For very long pages (300+ lines), a closing TL;DR can land for the reader who scrolled past the middle. Use sparingly.

## Editing pass: what to look for

Run these checks before declaring a page done.

1. **First-sentence test.** Does the lede land the thesis, or is it scene-setting filler? Would a reader who only reads the first sentence get the point?
2. **Subheading-only test.** Read only the H2s. Do they tell the argument? If not, rewrite headings.
3. **Read-aloud test.** Does this sound like a peer talking, or a corporate doc?
4. **Consultant-words grep.** Scan for the avoid-list above; cut any matches.
5. **Em-dash count.** More than ~10 in body prose is a sign to convert most.
6. **Bullet bold-lead count.** More than ~6-8 in one page is a sign to restructure — *but it's a heuristic, not a hard cap*. Pages that are info-dense reference material (like `09-security/defenses.md`) legitimately exceed it when the bullets are doing real definitional or comparison work. Convert the *structural tics*, keep the *structural work*.
7. **Citation density.** More than ~3 inline citations per page is usually too many; move to footer.
8. **Meta-narration scan.** Any sentence that's about the page rather than the content of the page should be cut.
9. **"We" scan.** "We" should not appear in body prose (only in template boilerplate).
10. **Paragraph length.** Any paragraph over five sentences? Split it. Any paragraph over ten? It's actually two paragraphs.
11. **Length check.** Does the depth match the topic? See the length section above.
12. **Closing check.** Does the page actually end, or does it taper off?

## After any bulk transformation: critical re-pass

Mechanical sweeps across many files (search-and-replace, bulk em-dash conversion, bulk meta-narration deletion) catch the obvious instances and *introduce new tics*. Two examples from this guide's own history:

- A bulk replacement of "This page is about X" with "What follows is X" looked like a fix and was actually substituting one tic for another. Caught and reverted on the next critical re-pass.
- A bulk em-dash → comma replacement sometimes left run-on sentences where the em-dash had been doing real syntactic work. Caught by reading the resulting prose paragraph by paragraph.

The discipline: **after any bulk transformation, do a focused re-pass on a sample of pages and look for what the bulk operation broke or created.** Not the same as the original audit — the re-pass is hunting for *new* problems the operation introduced. Skip this and the cleanup work just shifts from one tic to another.

The same principle applies to any agentic mechanical work, not just editorial sweeps. After an agent does a large mechanical refactor, a re-pass looking for *what the refactor created that wasn't there before* catches a different class of problem than reviewing the original change.

## What modern technical readers expect (and don't)

Synthesizing the research, in order of confidence:

- **They expect a TL;DR or strong lede in the first 100 words.** Without it, they bounce.
- **They expect to scan first, commit later.** Make scanning productive: strong subheadings, bold pulls, short paragraphs, visuals where they help.
- **They do not expect every claim to be footnoted.** They expect *the load-bearing claims* to be backed by a link. Over-citation reads as defensive.
- **They expect opinionated voice.** Surveys read as content marketing; opinions read as expertise.
- **They expect concrete examples.** A diff, a real prompt, a war story, a specific number.
- **They expect respect for their time.** Don't recap. Don't repeat. Don't pad. If a page can be 80% as long with the same value, make it 80% as long.
- **They do not expect academic register.** Plain prose with technical precision.
- **They expect mobile readability.** Even "I'll read this at my desk" readers actually skim it on the phone first.
- **They do not expect uniform depth.** A page that's intentionally short signals confidence (the author had nothing to pad with). A page that's intentionally long signals investment.

## Influences

The technical writing this guide tries to be in the lineage of:

- Martin Kleppmann, *Designing Data-Intensive Applications* — for opinionated clarity on hard topics
- Hunt & Thomas, *The Pragmatic Programmer* — for peer voice and density of practical advice
- Google SRE team, *Site Reliability Engineering* — for war-story specificity
- Tanya Reilly, *The Staff Engineer's Path* — for accessible voice on senior-engineer topics
- Will Larson, *Staff Engineer* / *An Elegant Puzzle* — for opinionated brevity
- Julia Evans' zines and blog posts — for concrete examples and curious tone
- Hillel Wayne's blog — for opinionated, well-grounded technical writing
- Sean Goedecke's writing on technical communication — for the blunt "lower your expectations" framing this guide adopts as its operating premise

What these have in common: they talk to a working engineer, not "the audience"; they commit to opinions; they use concrete examples; they acknowledge limits; they don't perform expertise.

When in doubt about voice, re-read a page from one of those books and ask: would this fit there? If yes, you're probably on the baseline.

## Sources

The reader-behavior research and modern best-practices guidance this style guide is grounded in:

- [Nielsen Norman Group: F-Shaped Pattern of Reading on the Web (still relevant in 2024)](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/) — eye-tracking evidence; ~25% of text read; <60-second average page visit
- [Nielsen Norman Group: Inverted Pyramids in Cyberspace](https://www.nngroup.com/articles/inverted-pyramids-in-cyberspace/) — front-loading principle for web content
- [Nielsen Norman Group: Text Scanning Patterns](https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/) — F-pattern, spotted, layer-cake, commitment patterns
- [Sean Goedecke: To get better at technical writing, lower your expectations](https://www.seangoedecke.com/technical-communication/) — the first-sentence rule and operating premise
- [Google for Developers: Audience (Technical Writing)](https://developers.google.com/tech-writing/one/audience) — audience-first writing for engineers
