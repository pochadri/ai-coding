---
title: Interactive Memory Picker
summary: Pick your tool, need, stack, privacy, and team. Get a recommended memory stack.
tags: [memory, picker, interactive]
related:
  - ./practice-and-risks.md
  - ./vendor-native.md
  - ./interaction-memory.md
last_updated: 2026-04-26
---

# Interactive Memory Picker

Answer five questions and you'll get a recommended memory stack, vendor-native baseline + interaction memory + artifact memory where appropriate.

<MemoryPicker />

## How this works

The picker mirrors the recipes in [Practice and risks](./practice-and-risks.md). It's deliberately opinionated, it gives you *one* answer per combination, not "here are five options." The output is a starting point, not a destination.

A few notes:

- **The "3 layers max" rule applies.** [Practice and risks / A short rule](./practice-and-risks.md#a-short-rule) explains why, vendor + 1 interaction + 1 artifact is the right baseline, and more than that usually means you're fighting your own tooling. The picker warns you if it outputs more than 4.
- **Vendor-native is always layer 1.** Whatever your tool, leave its built-in memory on. The cost is zero and the value is real.
- **The interaction layer is where most of the leverage is.** Choose it to match your *actual* pain (not your aspirational workflow).
- **The artifact layer is optional.** If you don't routinely hit "the agent doesn't understand my codebase's structure," skip it.
- **Privacy matters.** For regulated / high-sensitivity contexts, prefer transparent (markdown-based) memory over opaque vector DBs.

For the security situation around memory poisoning, staleness, and privacy, see [Practice and risks / Risks](./practice-and-risks.md#risks).

## Related reading

- [What is memory](./what-is-memory.md), concept and the interaction-vs-artifact distinction
- [Vendor-native memory](./vendor-native.md), what's already in your IDE
- [Interaction memory tools](./interaction-memory.md), third-party episodic/semantic
- [Artifact memory](./artifact-memory.md), code knowledge graphs
- [Practice and risks](./practice-and-risks.md), the full reasoning behind these recipes
