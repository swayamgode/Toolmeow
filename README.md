# AllToolsHub — IDE Kit

Drop these files into your project and let your AI IDE (Cursor, Windsurf, Claude Code, Copilot, etc.) build from them.

## Setup

```
alltoolshub/
├── AGENTS.md              ← copy from this kit (Cursor: also save as .cursorrules; Claude Code: CLAUDE.md)
└── docs/
    ├── 01_MASTER_PROMPT.md
    ├── 02_DESIGN_SYSTEM.md
    ├── 03_ARCHITECTURE.md
    ├── 04_TOOLS_SPEC.md
    ├── 05_SEO_ADSENSE_LEGAL.md
    └── 06_BUILD_PLAN_AND_QA.md
```

## How to use

1. Create the empty folder, copy the files in as shown above.
2. Open the folder in your IDE.
3. Paste this as your first message:

> Read AGENTS.md and every file in /docs. Then execute Phase 0 and Phase 1 from docs/06_BUILD_PLAN_AND_QA.md. Stop at the end of each phase, run lint + typecheck + build, and report what was verified before starting the next phase.

4. After each phase, say: `Proceed to Phase N.`
5. Never ask the IDE to "build everything" in one shot. Phase gating is what keeps quality high.

## Design reference
Your Selly screenshot is the visual reference. Keep it in `/docs/reference/selly.png` and tell the IDE to look at it when building the hero and the tool-card mockups.
