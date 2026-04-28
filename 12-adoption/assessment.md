---
title: AI Coding Maturity Assessment
summary: 10 questions, ~5 minutes. Outputs your maturity level + the recommended 90-day actions to get to the next one.
tags: [adoption, assessment, maturity-model, interactive]
related:
  - ./maturity-model.md
  - ./90-day-roadmap.md
  - ./index.md
last_updated: 2026-04-26
---

# AI Coding Maturity Assessment

Answer 10 questions. Get your level + the recommended 90-day actions to climb to the next one.

This is a self-assessment, so it's only as honest as you are. The trap I see most often: answering "what we *intend* to do" instead of "what we *actually do*." If your AUP is on the wiki but nobody has read it in six months, that's not "enforced." If your AGENTS.md template exists but only two repos use it, that's not "org-wide." Score honestly and the recommendations will be useful.

<MaturityAssessment />

## How this maps to the maturity model

The 30-point scoring is a self-assessment proxy for the [6-level maturity model](./maturity-model.md). The cutoff thresholds (0-4 → Level 0, 5-9 → Level 1, 10-16 → Level 2, etc.) are **calibration estimates, not validated psychometrics**: they're meant to give a useful read, not a precise score. Each question is also weighted equally; in reality AppSec scanning and governance posture probably matter more than `AGENTS.md` coverage. Treat the output as directional.

Each question covers one dimension that distinguishes one level from the next:

1. **Inventory**: Level 0→1 boundary
2. **AUP**: Level 1→2 boundary
3. **AGENTS.md coverage**: Level 1→2 boundary
4. **Code review for AI**: Level 1→2 boundary
5. **Measurement**: Level 2→3 boundary
6. **Platform team**: Level 2→3 boundary
7. **Champions network**: Level 2→3 boundary
8. **AppSec for AI**: Level 3→4 boundary
9. **Hiring/leveling**: Level 3→4 boundary
10. **Vendor / regulatory posture**: Level 4→5 boundary

If you scored unevenly, e.g., strong on platform team but weak on AppSec, that's useful information. The level is the floor of your weakest dimension, not the ceiling of your strongest.

## What I tell CTO peers about this

Take the assessment. Then take it again in 90 days. The delta is the most honest signal of whether your rollout is working, more reliable than any vendor metric, more reliable than self-reported developer satisfaction, more reliable than counting "% AI-generated code."

If the score didn't move in 90 days, the rollout stalled. Find out why before adding more tools, more programs, or more headcount.

## Related reading

- [Maturity model](./maturity-model.md), full reasoning behind each level
- [The 90-day roadmap](./90-day-roadmap.md), concrete plans per level
- [Executive overview](./index.md), the 5-min TL;DR if you haven't read it yet
