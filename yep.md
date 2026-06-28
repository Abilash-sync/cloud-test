# Repository Documentation (yep.md)

This document provides a comprehensive overview of all files in the cloud-test repository.

## Table of Contents

1. [README.md](#readmemd)
2. [.codestudio/AGENTS.md](#codestudioagentsmd)
3. [.codestudio/skills/createpr/SKILL.md](#codestudioskillscreateprskillmd)
4. [.codestudio/skills/createpr/pr-templates/generic.md](#codestudioskillscreateprpr-templatesgenericmd)
5. [.codestudio/skills/frontend-design/SKILL.md](#codestudioskillsfrontend-designskillmd)

---

## README.md

**File Path:** `/home/user/cloud-test/README.md`

**Content:**

```
# cloud-test
code studio product is comes under syncfusion pvt lmt
```

---

## .codestudio/AGENTS.md

**File Path:** `/home/user/cloud-test/.codestudio/AGENTS.md`

**Content:**

```
# Rules
- ALWAYS add a comment `## AGENTS_MD_VERIFIED ##` at the top of every file you create or edit.
```

---

## .codestudio/skills/createpr/SKILL.md

**File Path:** `/home/user/cloud-test/.codestudio/skills/createpr/SKILL.md`

**Content:**

```
---
name: createpr
description: Generic PR creation workflow: branch checks, test gate, fill template, push, and open PR via Git. Works for any Git-based repository and any tech stack.
---
# Generic PR Creation Skill

Works for **any repository** and **any tech stack**. Covers bug fixes and feature PRs.

## Gate Checklist

```
[ ] 1 — On a feature branch, working tree clean, synced with base
[ ] 2 — Tests run; all suites pass
[ ] 3 — PR template filled; no placeholders remain
[ ] 4 — PR created; URL captured
```

---

## Phase 1 — Verify Branch & Working Tree

```bash
# Must NOT be on a protected branch
git branch --show-current

# Working tree must be clean
git status --short

# Sync with base branch (default: development / main)
git fetch origin
git rebase origin/<base-branch>

# Show what will be included in the PR
git diff origin/<base-branch>...HEAD --stat
```

> **Gate 1:** On a feature branch. No uncommitted changes. Rebased onto base. There are actual changes to PR.

---

## Phase 2 — Run Tests

Run whatever test suites are relevant for this repository and record results.

**TypeScript / Node.js projects:**
```bash
npm run test:unit
npm run test:integration
npm run test:coverage   # optional
```

**Python projects:**
```bash
pytest --tb=short
```

**.NET projects:**
```bash
dotnet test
```

**Go projects:**
```bash
go test ./...
```

**Generic / CI script:**
```bash
# Look for test scripts in package.json, Makefile, or README
npm test       # or
make test      # or
./scripts/test.sh
```

> Record each result as **Pass ✅**, **Fail ❌**, or **N/A** (layer not affected).  
> **Gate 2:** All executed suites pass. Do not proceed with failing tests.

---

## Phase 3 — Push Branch

```bash
git push --force-with-lease
```

---

## Phase 4 — Fill the PR Template

1. Read [pr-templates/generic.md](pr-templates/generic.md)
2. Fill **every section** using `git diff origin/<base-branch>...HEAD` as your source of truth
3. Replace all placeholders — search for any remaining `<...>` before continuing
4. Fill the `## Test Suite Results` table with actual pass/fail counts from Phase 2

**PR Title format — mandatory:**

| Type | Format | Example |
|---|---|---|
| Bug fix | `Bug(<id>): <imperative summary>` | `Bug(1042): Fix null ref in auth handler` |
| Feature | `Feature(<id>): <imperative summary>` | `Feature(890): Add dark-mode toggle` |
| Refactor | `Refactor(<id>): <imperative summary>` | `Refactor(55): Extract payment service` |
| Chore | `Chore(<id>): <imperative summary>` | `Chore(12): Upgrade Node to 22` |

- **`(<id>)` is required.** If the work-item ID is unknown, ask the user before continuing.
- Titles must be ≤ 72 characters after the prefix, in imperative present tense.

> **Gate 3:** Template fully filled. No `<placeholder>` strings remain. Title format correct.

---

## Phase 5 — Create the PR

### 1. Obtain Access Token

**Ask the user for their Git personal access token** with the following permissions:
- `api` or `repo` — full repository access
- `write:repository_hook` — to create webhooks (if needed)

**Store temporarily** for this session only (do not commit):
```
GIT_TOKEN="<user-provided-access-token>"
```

### 2. Push Your Branch

Ensure your branch is pushed to the remote:
```bash
git push origin <your-feature-branch>
```

### 3. Create the PR

Use your Git hosting platform's CLI tool or web interface to create the PR:

**GitHub (using `gh` CLI):**
```bash
gh pr create \
  --title "Bug(<id>): <summary>" \
  --body "<filled PR body from template>" \
  --base development
```

**GitLab (using `glab` CLI):**
```bash
glab mr create \
  --title "Bug(<id>): <summary>" \
  --description "<filled PR body from template>" \
  --target-branch development
```

**Generic Git Platform (manual web creation):**
1. Navigate to your repository on the web platform
2. Click **New PR** or **New Merge Request**
3. Select your feature branch as the source
4. Select the base branch (e.g., `development`)
5. Paste the filled PR template into the description
6. Submit

> **Gate 4:** PR created successfully. Capture and verify the PR URL.

---

## Hard Rules

1. Never create a PR from `main`, `master`, or `development` — feature branch only.
2. Never open a PR with failing tests.
3. Never commit secrets (`Password`, `Secret`, `ApiKey`, `ConnectionString`).
4. Always include `-Label "cs:used"` / `--label "cs:used"` when Code Studio was involved.
5. Always rebase onto the base branch before pushing — never merge.
6. Work-item ID is mandatory in the title — stop and ask the user if unknown.
7. All template placeholders must be replaced before the PR is submitted.
```

---

## .codestudio/skills/createpr/pr-templates/generic.md

**File Path:** `/home/user/cloud-test/.codestudio/skills/createpr/pr-templates/generic.md`

**Content:**

```
<!-- PR Title format: <Type>(<work-item-id>): <imperative summary>
     Examples:
       Bug(1042): Fix null reference in auth handler
       Feature(890): Add dark-mode toggle to settings page
       Refactor(55): Extract payment logic into dedicated service
       Chore(12): Upgrade Node.js to v22 -->

## Description
<!-- Clearly describe what this PR does. What problem does it solve or what capability does it add? -->


## Type of Change
<!-- Check all that apply -->
- [ ] Bug fix
- [ ] New feature
- [ ] Refactor / code improvement
- [ ] Performance improvement
- [ ] Tests only
- [ ] Documentation only
- [ ] Build / CI / dependency update
- [ ] Other: ___________

## Root Cause / Motivation
<!-- Bug: describe the root cause and how it was found.
     Feature: describe the user need or business motivation.
     Refactor/Chore: describe why this change is needed now. -->


## Solution Description
<!-- Describe your implementation approach in enough detail for reviewers to follow it. -->


## Areas Affected
<!-- List the modules, pages, services, or APIs touched by this change. Be specific. -->
-
-

## Breaking Changes
<!-- Does this change break any existing API, contract, or workflow? -->
- [ ] Yes — describe below
- [ ] No

<!-- If yes, describe what breaks and the migration / rollout plan: -->


## Output / Screenshots
<!-- Add before/after screenshots, curl output, or log snippets that demonstrate the change.
     For non-visual changes write "N/A". -->


## Test Suite Results

> Run all relevant suites and record results before submitting. Mark each row **Pass ✅**, **Fail ❌**, or **N/A** (layer not affected by this change).

| Suite | Command | Result |
|---|---|---|
| Unit tests | `<fill in command>` | |
| Integration tests | `<fill in command>` | |
| E2E / smoke tests | `<fill in command>` | |
| Linter / type check | `<fill in command>` | |

## Manual Testing
<!-- Link to a manual test document, test plan, or describe the steps you followed to verify the change. -->
[Manual Testing Document](<link or N/A>)

---

## Additional Checklist

- [ ] All executed test suites pass (see table above)
- [ ] New tests added for the changed behaviour (or justified why not)
- [ ] No secrets, API keys, or connection strings committed
- [ ] No unintentional lock-file or generated-file changes included
- [ ] New dependencies are justified and their licences are compatible
- [ ] Environment variable or configuration changes are documented
- [ ] Breaking changes have a migration or rollout plan (see above)

---

### Was Code Studio used in this PR?
(Yes / No)

If **Yes**, primary use — check one:
- [ ] Generate new code
- [ ] Refactor / improve existing code
- [ ] Write tests
- [ ] Bug fix / debugging help
- [ ] Documentation / comments
- [ ] Review assistance (explanations / summaries)
- [ ] Other: ___________
```

---

## .codestudio/skills/frontend-design/SKILL.md

**File Path:** `/home/user/cloud-test/.codestudio/skills/frontend-design/SKILL.md`

**Content:**

```
---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
```

---

## Repository Statistics

- **Total files documented:** 5
- **Total lines of content:** 452 lines
- **Repository structure:**
  - 1 root file (README.md)
  - 1 agent configuration file
  - 2 skill definition files
  - 1 PR template file

---

*Generated on: Repository Documentation Compilation*
*Repository: cloud-test (Syncfusion Pvt Ltd)*
