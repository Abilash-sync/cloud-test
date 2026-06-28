# Cloud-Test Repository Documentation

## Repository Overview

**Repository Name:** cloud-test  
**Owner:** Syncfusion Pvt Ltd  
**GitHub URL:** https://github.com/Abilash-sync/cloud-test.git  
**Current Branch:** test  
**Purpose:** Code Studio product development repository

This repository contains configuration and documentation for the Code Studio product, including agent rules, skills, and development workflows.

---

## Repository Structure

```
/home/user/cloud-test/
├── .git/                          # Git version control directory
├── .codestudio/                   # Code Studio configuration and skills
│   ├── AGENTS.md                  # Agent behavior rules
│   └── skills/                    # Custom skills directory
│       ├── createpr/              # PR creation skill
│       │   ├── SKILL.md           # PR creation workflow documentation
│       │   └── pr-templates/      # PR template files
│       │       └── generic.md     # Generic PR template
│       └── frontend-design/       # Frontend design skill
│           └── SKILL.md           # Frontend design guidelines
└── README.md                      # Repository description
```

---

## File Contents and Details

### 1. README.md

**Location:** `/home/user/cloud-test/README.md`

```markdown
# cloud-test
code studio product is comes under syncfusion pvt lmt
```

**Summary:** Basic repository identification indicating this is a Code Studio product repository owned by Syncfusion Private Limited.

---

### 2. .codestudio/AGENTS.md

**Location:** `/home/user/cloud-test/.codestudio/AGENTS.md`

```markdown
# Rules
- ALWAYS add a comment `## AGENTS_MD_VERIFIED ##` at the top of every file you create or edit.
```

**Summary:** Defines agent behavior rules requiring verification comments in all created/edited files.

---

### 3. .codestudio/skills/createpr/SKILL.md

**Location:** `/home/user/cloud-test/.codestudio/skills/createpr/SKILL.md`

**Metadata:**
- **Name:** createpr
- **Description:** Generic PR creation workflow: branch checks, test gate, fill template, push, and open PR via Git. Works for any Git-based repository and any tech stack.

**Key Features:**

#### Gate Checklist
1. On a feature branch, working tree clean, synced with base
2. Tests run; all suites pass
3. PR template filled; no placeholders remain
4. PR created; URL captured

#### Five-Phase Workflow

**Phase 1 — Verify Branch & Working Tree**
- Ensure not on protected branch
- Confirm clean working tree
- Sync with base branch (development/main)
- Show PR changes with git diff

**Phase 2 — Run Tests**
- Supports multiple tech stacks:
  - TypeScript/Node.js: npm test suites
  - Python: pytest
  - .NET: dotnet test
  - Go: go test
- All tests must pass before proceeding

**Phase 3 — Push Branch**
- Use `git push --force-with-lease` for safety

**Phase 4 — Fill the PR Template**
- Read and complete generic.md template
- Use git diff as source of truth
- Remove all placeholders
- Follow mandatory PR title format:
  - Bug fixes: `Bug(<id>): <imperative summary>`
  - Features: `Feature(<id>): <imperative summary>`
  - Refactors: `Refactor(<id>): <imperative summary>`
  - Chores: `Chore(<id>): <imperative summary>`

**Phase 5 — Create the PR**
- Obtain access token
- Push branch to remote
- Create PR using platform CLI (gh, glab) or web interface

#### Hard Rules
1. Never create PR from main/master/development branches
2. Never open PR with failing tests
3. Never commit secrets
4. Always include label "cs:used" when Code Studio involved
5. Always rebase onto base branch before pushing
6. Work-item ID mandatory in title
7. All template placeholders must be replaced

---

### 4. .codestudio/skills/createpr/pr-templates/generic.md

**Location:** `/home/user/cloud-test/.codestudio/skills/createpr/pr-templates/generic.md`

**Template Structure:**

#### Sections

1. **PR Title Format** (with examples)
   - Bug/Feature/Refactor/Chore with work-item ID

2. **Description**
   - Clear description of what PR does
   - Problem solved or capability added

3. **Type of Change** (checklist)
   - Bug fix, new feature, refactor, performance improvement
   - Tests only, documentation only, build/CI/dependency update
   - Other

4. **Root Cause / Motivation**
   - Bug: root cause analysis
   - Feature: user need or business motivation
   - Refactor/Chore: justification

5. **Solution Description**
   - Implementation approach details

6. **Areas Affected**
   - Modules, pages, services, APIs touched

7. **Breaking Changes**
   - Yes/No with migration plan if applicable

8. **Output / Screenshots**
   - Before/after screenshots, curl output, log snippets

9. **Test Suite Results** (table)
   - Unit tests, integration tests, E2E tests, linter/type check
   - Each marked Pass ✅, Fail ❌, or N/A

10. **Manual Testing**
    - Link to manual test document or description

11. **Additional Checklist**
    - Test suites pass
    - New tests added
    - No secrets committed
    - No unintentional changes
    - Dependencies justified
    - Environment variables documented
    - Breaking changes have migration plan

12. **Code Studio Usage Tracking**
    - Was Code Studio used (Yes/No)
    - Primary use case identification

---

### 5. .codestudio/skills/frontend-design/SKILL.md

**Location:** `/home/user/cloud-test/.codestudio/skills/frontend-design/SKILL.md`

**Metadata:**
- **Name:** frontend-design
- **Description:** Create distinctive, production-grade frontend interfaces with high design quality
- **Use Cases:** Web components, pages, artifacts, posters, applications, websites, landing pages, dashboards, React components, HTML/CSS layouts
- **License:** Complete terms in LICENSE.txt

**Core Philosophy:**
Guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implements real working code with exceptional attention to aesthetic details and creative choices.

#### Design Thinking Framework

**Pre-coding considerations:**
1. **Purpose:** Problem solving and user identification
2. **Tone:** Choose extreme aesthetic direction:
   - Brutally minimal
   - Maximalist chaos
   - Retro-futuristic
   - Organic/natural
   - Luxury/refined
   - Playful/toy-like
   - Editorial/magazine
   - Brutalist/raw
   - Art deco/geometric
   - Soft/pastel
   - Industrial/utilitarian
3. **Constraints:** Technical requirements (framework, performance, accessibility)
4. **Differentiation:** Unforgettable elements that users will remember

**Critical Principle:** Choose clear conceptual direction and execute with precision. Bold maximalism and refined minimalism both work - key is intentionality, not intensity.

#### Frontend Aesthetics Guidelines

**Typography:**
- Choose beautiful, unique, interesting fonts
- Avoid generic fonts (Arial, Inter)
- Use distinctive choices that elevate aesthetics
- Pair distinctive display font with refined body font

**Color & Theme:**
- Commit to cohesive aesthetic
- Use CSS variables for consistency
- Dominant colors with sharp accents
- Avoid timid, evenly-distributed palettes

**Motion:**
- Use animations for effects and micro-interactions
- Prioritize CSS-only solutions for HTML
- Use Motion library for React when available
- Focus on high-impact moments
- Orchestrated page load with staggered reveals
- Use scroll-triggering and hover states that surprise

**Spatial Composition:**
- Unexpected layouts
- Asymmetry and overlap
- Diagonal flow
- Grid-breaking elements
- Generous negative space OR controlled density

**Backgrounds & Visual Details:**
- Create atmosphere and depth
- Add contextual effects and textures
- Gradient meshes, noise textures, geometric patterns
- Layered transparencies, dramatic shadows
- Decorative borders, custom cursors, grain overlays

#### Anti-Patterns to Avoid

**NEVER use generic AI-generated aesthetics:**
- Overused font families (Inter, Roboto, Arial, system fonts)
- Cliched color schemes (purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design lacking context-specific character
- Common font choices (e.g., Space Grotesk) across generations

#### Implementation Principles

- Interpret creatively with unexpected choices
- Match complexity to aesthetic vision
- Maximalist designs need elaborate code with extensive animations
- Minimalist designs need restraint, precision, careful spacing
- Elegance comes from executing vision well
- Vary between light/dark themes, different fonts, different aesthetics
- No two designs should be the same

**Philosophy:** Claude is capable of extraordinary creative work. Don't hold back - show what can truly be created when thinking outside the box and committing fully to a distinctive vision.

---

## Git Configuration

**Remote Repository:** https://github.com/Abilash-sync/cloud-test.git  
**Current Branch:** test  
**Git User:** CodeStudio (agent@codestudio.dev)  
**Repository Format Version:** 0

---

## Key Patterns and Configurations

### 1. Skills System Architecture

The repository implements a skills-based architecture where:
- Skills are modular capabilities stored in `.codestudio/skills/`
- Each skill has a `SKILL.md` file with metadata and instructions
- Skills follow progressive disclosure pattern
- Skills are self-documenting with name, description, and license info

### 2. Quality Gates

Both skills emphasize quality gates and checkpoints:
- **createpr skill:** 4-gate system ensuring branch cleanliness, test passing, template completion, PR creation
- **frontend-design skill:** Pre-coding design thinking phase ensures intentionality before implementation

### 3. Development Workflow Standards

**PR Creation Workflow:**
- Feature branch mandatory (no direct commits to protected branches)
- All tests must pass before PR submission
- Comprehensive PR templates with multiple sections
- Work-item ID tracking mandatory
- Code Studio usage tracking for analytics

**Frontend Development Workflow:**
- Design thinking precedes implementation
- Intentional aesthetic direction selection
- Production-grade code quality
- Anti-pattern awareness and avoidance
- Creative differentiation as core requirement

### 4. Agent Behavior Rules

The `AGENTS.md` file establishes behavioral contracts:
- Verification comments required (`## AGENTS_MD_VERIFIED ##`)
- Ensures traceability of agent-created/modified files

---

## Technology Stack Indicators

Based on the skill documentation, this Code Studio product supports:

**Backend/General:**
- Python (pytest)
- .NET (dotnet test)
- Go (go test)
- Generic Make/shell scripts

**Frontend:**
- TypeScript/Node.js (npm test suites)
- React (with Motion library)
- Vue
- HTML/CSS/JavaScript
- CSS-in-JS

**Version Control:**
- Git-based workflows
- GitHub/GitLab integration
- Branch protection and rebasing strategies

**Development Tools:**
- GitHub CLI (gh)
- GitLab CLI (glab)
- Standard git commands
- Test runners for multiple platforms

---

## Summary

This repository serves as a configuration and skill library for the Code Studio product by Syncfusion Pvt Ltd. It contains:

1. **Two comprehensive skills:**
   - **createpr:** A generic, multi-phase PR creation workflow with quality gates
   - **frontend-design:** Production-grade frontend interface creation guidelines with aesthetic excellence

2. **Development standards:**
   - Mandatory testing before PR submission
   - Comprehensive PR documentation requirements
   - Anti-pattern awareness (generic AI aesthetics)
   - Quality gate systems

3. **Agent rules:**
   - File verification requirements
   - Traceability mechanisms

The repository emphasizes quality, intentionality, and creative excellence in both process (PR creation) and output (frontend design). It's designed to work across multiple tech stacks and provides detailed, actionable guidance for maintaining high standards in software development.
