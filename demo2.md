## AGENTS_MD_VERIFIED ##

# Repository Files Summary

This document provides a comprehensive overview of all files in the cloud-test repository.

## Repository Structure

```
/home/user/cloud-test/
├── README.md
├── .codestudio/
│   ├── AGENTS.md
│   └── skills/
│       ├── createpr/
│       │   ├── SKILL.md
│       │   └── pr-templates/
│       │       └── generic.md
│       └── frontend-design/
│           └── SKILL.md
└── demo2.md (this file)
```

---

## File Contents Overview

### 1. README.md
**Location:** `/home/user/cloud-test/README.md`  
**Size:** 66 bytes

```markdown
# cloud-test
code studio product is comes under syncfusion pvt lmt
```

**Purpose:** Main repository README explaining that Code Studio is a Syncfusion Private Limited product.

---

### 2. .codestudio/AGENTS.md
**Location:** `/home/user/cloud-test/.codestudio/AGENTS.md`

**Content:**
```markdown
# Rules
- ALWAYS add a comment `## AGENTS_MD_VERIFIED ##` at the top of every file you create or edit.
```

**Purpose:** Contains rules for agent behavior. Specifies that all created or edited files must include an `## AGENTS_MD_VERIFIED ##` comment header.

---

### 3. .codestudio/skills/createpr/SKILL.md
**Location:** `/home/user/cloud-test/.codestudio/skills/createpr/SKILL.md`

**Description:** Generic PR creation workflow skill that works for any Git-based repository and tech stack.

**Key Components:**

#### Gate Checklist
1. On a feature branch, working tree clean, synced with base
2. Tests run; all suites pass
3. PR template filled; no placeholders remain
4. PR created; URL captured

#### Phases
- **Phase 1:** Verify Branch & Working Tree
- **Phase 2:** Run Tests (TypeScript/Node.js, Python, .NET, Go, Generic)
- **Phase 3:** Push Branch
- **Phase 4:** Fill the PR Template
- **Phase 5:** Create the PR

#### PR Title Format
| Type | Format | Example |
|---|---|---|
| Bug fix | `Bug(<id>): <imperative summary>` | `Bug(1042): Fix null ref in auth handler` |
| Feature | `Feature(<id>): <imperative summary>` | `Feature(890): Add dark-mode toggle` |
| Refactor | `Refactor(<id>): <imperative summary>` | `Refactor(55): Extract payment service` |
| Chore | `Chore(<id>): <imperative summary>` | `Chore(12): Upgrade Node to 22` |

#### Hard Rules
1. Never create a PR from main/master/development branches
2. Never open a PR with failing tests
3. Never commit secrets
4. Always include "cs:used" label when Code Studio was involved
5. Always rebase onto base branch before pushing
6. Work-item ID is mandatory in title
7. All template placeholders must be replaced

**Purpose:** Provides a standardized workflow for creating pull requests with proper checks and documentation.

---

### 4. .codestudio/skills/createpr/pr-templates/generic.md
**Location:** `/home/user/cloud-test/.codestudio/skills/createpr/pr-templates/generic.md`

**Structure:** A comprehensive PR template with the following sections:

- **Description:** What the PR does and what problem it solves
- **Type of Change:** Checkboxes for bug fix, feature, refactor, performance, tests, docs, build/CI, etc.
- **Root Cause / Motivation:** Why the change is needed
- **Solution Description:** Implementation approach details
- **Areas Affected:** Modules, pages, services, or APIs touched
- **Breaking Changes:** Checklist and description
- **Output / Screenshots:** Visual demonstrations of changes
- **Test Suite Results:** Table for recording test results (unit, integration, e2e, linter)
- **Manual Testing:** Links to test documentation
- **Additional Checklist:** Tests pass, no secrets committed, dependencies justified, etc.
- **Code Studio Usage:** Tracking if Code Studio was used and how

**Purpose:** Standardized template ensuring all PRs contain comprehensive information for reviewers.

---

### 5. .codestudio/skills/frontend-design/SKILL.md
**Location:** `/home/user/cloud-test/.codestudio/skills/frontend-design/SKILL.md`

**Description:** Skill for creating distinctive, production-grade frontend interfaces with high design quality.

#### Design Thinking Framework
Before coding, consider:
- **Purpose:** What problem does the interface solve? Who uses it?
- **Tone:** Pick a bold aesthetic (minimal, maximalist, retro-futuristic, organic, luxury, playful, editorial, brutalist, art deco, soft/pastel, industrial, etc.)
- **Constraints:** Technical requirements (framework, performance, accessibility)
- **Differentiation:** What makes this unforgettable?

#### Frontend Aesthetics Guidelines

**Typography:**
- Choose beautiful, unique, and interesting fonts
- Avoid generic fonts like Arial and Inter
- Use distinctive display fonts paired with refined body fonts

**Color & Theme:**
- Commit to a cohesive aesthetic
- Use CSS variables for consistency
- Dominant colors with sharp accents

**Motion:**
- Use animations for effects and micro-interactions
- Prioritize CSS-only solutions for HTML
- Use Motion library for React
- Focus on high-impact moments with staggered reveals

**Spatial Composition:**
- Unexpected layouts with asymmetry
- Overlap and diagonal flow
- Grid-breaking elements
- Generous negative space OR controlled density

**Backgrounds & Visual Details:**
- Create atmosphere and depth
- Add contextual effects and textures
- Use gradient meshes, noise textures, geometric patterns
- Apply layered transparencies, dramatic shadows, decorative borders

#### What to Avoid
- Generic AI aesthetics
- Overused font families (Inter, Roboto, Arial, system fonts)
- Cliched color schemes (purple gradients on white)
- Predictable layouts and component patterns
- Cookie-cutter designs lacking context-specific character

**Purpose:** Guides creation of memorable, production-grade frontend interfaces that avoid generic "AI slop" aesthetics.

---

## Repository Summary

This repository contains:

1. **Project Documentation** - README explaining the Code Studio product
2. **Agent Configuration** - Rules for AI agent behavior
3. **Skills System** - Two specialized skills:
   - **createpr** - Comprehensive PR creation workflow
   - **frontend-design** - High-quality frontend interface design guidelines

The repository appears to be a configuration and documentation repository for the Code Studio AI coding assistant, providing guidelines and workflows for creating pull requests and designing frontend interfaces.

---

*Document generated by reading all repository files one by one*
