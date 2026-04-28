---
title: Prompting Patterns That Work
summary: Specific inputs/outputs, explicit constraints, explanation-before-code, iterate-don't-restart.
tags: [prompting, technique]
related:
  - ./review-discipline.md
  - ../04-understanding-and-context/context-engineering.md
  - ../05-workflows/spec-driven-development.md
last_updated: 2026-04-25
---

# Prompting Patterns That Work

I've tried everything. Here's what actually works.

**Be specific about inputs and outputs.** "Write a function" is bad. "Write a function that takes a list of `User` objects and returns a map from `user_id` to `email` address" is good.

**Include constraints.** "Must handle empty lists" or "Must work with our existing `UserRepository`" or "Must be O(n) or better."

**Ask for explanation first.** For complex stuff, I'll say "Explain your approach before writing the code." This catches bad assumptions early.

**Iterate, don't restart.** If the first output is close but not quite right, say what's wrong specifically and ask for revision. Starting over loses context.

## Related reading

- [Review discipline](./review-discipline.md), what to do with the output
- [Context engineering](../04-understanding-and-context/context-engineering.md), what to set up *once* so you don't have to repeat in every prompt
- [Spec-driven development](../05-workflows/spec-driven-development.md), when prompting graduates into specifying
