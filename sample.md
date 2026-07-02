## AGENTS_MD_VERIFIED ##

# Cloud-Test Repository - Comprehensive Documentation

## Table of Contents

1. [Repository Overview](#repository-overview)
2. [Repository Structure](#repository-structure)
3. [File Descriptions](#file-descriptions)
   - [README.md](#readmemd)
   - [.codestudio Directory](#codestudio-directory)
   - [AGENTS.md](#agentsmd)
   - [Skills System](#skills-system)
4. [Available Skills](#available-skills)
   - [CreatePR Skill](#createpr-skill)
   - [Frontend-Design Skill](#frontend-design-skill)
5. [Skill Usage Examples](#skill-usage-examples)
6. [PR Creation Workflow](#pr-creation-workflow)
7. [Frontend Design Principles](#frontend-design-principles)
8. [Best Practices](#best-practices)

---

## Repository Overview

The **cloud-test** repository is a Code Studio product developed under Syncfusion Pvt Ltd. This repository serves as a testing and development environment that includes specialized skills for automated workflows and frontend development.

### Key Features:
- 🤖 Automated PR creation workflow
- 🎨 Production-grade frontend design guidance
- 📋 Structured PR templates
- 🔄 Multi-tech stack support
- ✅ Built-in testing gates and quality checks

---

## Repository Structure

```
cloud-test/
├── README.md                              # Project description
├── sample.md                              # This comprehensive documentation
├── .git/                                  # Git version control
└── .codestudio/                          # Code Studio configuration
    ├── AGENTS.md                         # Agent behavior rules
    └── skills/                           # Custom skills directory
        ├── createpr/                     # PR creation skill
        │   ├── SKILL.md                 # Skill documentation
        │   └── pr-templates/            # PR template files
        │       └── generic.md           # Generic PR template
        └── frontend-design/              # Frontend design skill
            └── SKILL.md                 # Design guidelines
```

---

## File Descriptions

### README.md
**Location:** `/home/user/cloud-test/README.md`

A brief project descriptor indicating that this is a Code Studio product developed by Syncfusion Pvt Ltd.

```markdown
# cloud-test
code studio product is comes under syncfusion pvt lmt
```

### .codestudio Directory

The `.codestudio` directory contains configuration files and custom skills that extend the functionality of Code Studio agents working within this repository.

### AGENTS.md
**Location:** `/home/user/cloud-test/.codestudio/AGENTS.md`

Defines rules that agents must follow when working in this repository:

```markdown
# Rules
- ALWAYS add a comment `## AGENTS_MD_VERIFIED ##` at the top of every file you create or edit.
```

This ensures all files created or modified by agents are properly marked for tracking and verification purposes.

### Skills System

The skills directory contains specialized capabilities that provide structured workflows and domain knowledge for specific tasks.

---

## Available Skills

### CreatePR Skill

**Location:** `/home/user/cloud-test/.codestudio/skills/createpr/`

**Purpose:** Generic PR creation workflow that works for any Git-based repository and any tech stack.

#### Features:
- ✅ Branch verification and validation
- ✅ Test gate enforcement
- ✅ Structured PR template filling
- ✅ Multi-platform support (GitHub, GitLab, Generic Git)
- ✅ Automated quality checks

#### Gate Checklist:
```
[ ] 1 — On a feature branch, working tree clean, synced with base
[ ] 2 — Tests run; all suites pass
[ ] 3 — PR template filled; no placeholders remain
[ ] 4 — PR created; URL captured
```

#### Supported Tech Stacks:
- **TypeScript/Node.js**: `npm run test:unit`, `npm run test:integration`
- **Python**: `pytest --tb=short`
- **.NET**: `dotnet test`
- **Go**: `go test ./...`
- **Generic**: `npm test`, `make test`, custom scripts

#### PR Title Format:
| Type | Format | Example |
|------|--------|---------|
| Bug fix | `Bug(<id>): <summary>` | `Bug(1042): Fix null ref in auth handler` |
| Feature | `Feature(<id>): <summary>` | `Feature(890): Add dark-mode toggle` |
| Refactor | `Refactor(<id>): <summary>` | `Refactor(55): Extract payment service` |
| Chore | `Chore(<id>): <summary>` | `Chore(12): Upgrade Node to 22` |

#### Hard Rules:
1. Never create a PR from `main`, `master`, or `development` — feature branch only
2. Never open a PR with failing tests
3. Never commit secrets (`Password`, `Secret`, `ApiKey`, `ConnectionString`)
4. Always include `-Label "cs:used"` when Code Studio was involved
5. Always rebase onto the base branch before pushing — never merge
6. Work-item ID is mandatory in the title
7. All template placeholders must be replaced before submission

---

### Frontend-Design Skill

**Location:** `/home/user/cloud-test/.codestudio/skills/frontend-design/`

**Purpose:** Create distinctive, production-grade frontend interfaces with exceptional design quality that avoids generic AI aesthetics.

#### Design Philosophy:

**Before coding, commit to a BOLD aesthetic direction:**
- **Purpose**: Understand the problem and user
- **Tone**: Choose an extreme aesthetic (brutalist, maximalist, retro-futuristic, organic, luxury, industrial, etc.)
- **Constraints**: Consider technical requirements and accessibility
- **Differentiation**: Create something UNFORGETTABLE

#### Core Focus Areas:

##### 1. Typography
- Choose beautiful, unique, and interesting fonts
- Avoid generic fonts (Arial, Inter, Roboto)
- Pair distinctive display fonts with refined body fonts
- Create typographic hierarchy

##### 2. Color & Theme
- Commit to cohesive aesthetics
- Use CSS variables for consistency
- Dominant colors with sharp accents
- Avoid timid, evenly-distributed palettes

##### 3. Motion & Animation
- High-impact moments over scattered micro-interactions
- Orchestrated page loads with staggered reveals
- CSS-only solutions for HTML
- Motion library for React
- Scroll-triggering and surprising hover states

##### 4. Spatial Composition
- Unexpected layouts
- Asymmetry and overlap
- Diagonal flow
- Grid-breaking elements
- Generous negative space OR controlled density

##### 5. Backgrounds & Visual Details
- Create atmosphere and depth
- Contextual effects and textures
- Gradient meshes, noise textures, geometric patterns
- Layered transparencies and dramatic shadows
- Decorative borders and grain overlays

#### Anti-Patterns to Avoid:
- ❌ Generic AI aesthetics
- ❌ Overused fonts (Inter, Roboto, Arial, Space Grotesk)
- ❌ Cliched color schemes (purple gradients on white)
- ❌ Predictable layouts and components
- ❌ Cookie-cutter designs lacking context

#### Implementation Principles:
- Match complexity to aesthetic vision
- Maximalist designs need elaborate code
- Minimalist designs need precision and restraint
- Execute the vision with intentionality

---

## Skill Usage Examples

### Example 1: Creating a PR for a Bug Fix

```bash
# Step 1: Verify you're on a feature branch
git branch --show-current
# Output: feature/fix-auth-bug

# Step 2: Check working tree is clean
git status --short
# Output: (empty - clean)

# Step 3: Sync with base branch
git fetch origin
git rebase origin/development

# Step 4: Run tests
npm run test:unit
pytest --tb=short

# Step 5: Push branch
git push --force-with-lease

# Step 6: Fill PR template with actual data
# See pr-templates/generic.md for structure

# Step 7: Create PR
gh pr create \
  --title "Bug(1042): Fix null reference in auth handler" \
  --body "<filled template>" \
  --base development \
  --label "cs:used"
```

### Example 2: Using Frontend-Design Skill

#### Scenario: Build a landing page for a SaaS product

**Design Thinking:**
```
Purpose: Showcase product features and convert visitors
Tone: Modern, confident, slightly futuristic
Constraints: Must work on mobile, accessibility AA compliant
Differentiation: Bold typography with dynamic scroll animations
```

**Implementation Strategy:**
```html
<!-- Distinctive typography choice -->
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;700;900&family=Space+Mono&display=swap" rel="stylesheet">

<style>
  :root {
    --primary: #00ff94;
    --bg: #0a0a0f;
    --text: #e0e0e8;
    --accent: #ff006e;
  }
  
  body {
    font-family: 'Outfit', sans-serif;
    background: var(--bg);
    color: var(--text);
  }
  
  h1 {
    font-weight: 900;
    font-size: clamp(3rem, 8vw, 8rem);
    line-height: 0.9;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: slideUp 0.8s ease-out;
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
```

---

## PR Creation Workflow

### Phase 1: Verify Branch & Working Tree
```bash
git branch --show-current        # Must be on feature branch
git status --short               # Must be clean
git fetch origin
git rebase origin/development    # Sync with base
git diff origin/development...HEAD --stat  # Review changes
```

### Phase 2: Run Tests
Execute all relevant test suites based on your tech stack and record results:

| Tech Stack | Command | Result |
|------------|---------|--------|
| TypeScript/Node.js | `npm run test:unit` | Pass ✅ |
| Python | `pytest --tb=short` | Pass ✅ |
| .NET | `dotnet test` | N/A |
| Go | `go test ./...` | N/A |

### Phase 3: Push Branch
```bash
git push --force-with-lease
```

### Phase 4: Fill PR Template
Use the template at `.codestudio/skills/createpr/pr-templates/generic.md`:

**Template Sections:**
- ✅ Description
- ✅ Type of Change
- ✅ Root Cause/Motivation
- ✅ Solution Description
- ✅ Areas Affected
- ✅ Breaking Changes
- ✅ Output/Screenshots
- ✅ Test Suite Results
- ✅ Manual Testing
- ✅ Additional Checklist
- ✅ Code Studio Usage

### Phase 5: Create the PR
```bash
# GitHub
gh pr create \
  --title "Feature(890): Add dark-mode toggle" \
  --body "<filled template>" \
  --base development \
  --label "cs:used"

# GitLab
glab mr create \
  --title "Feature(890): Add dark-mode toggle" \
  --description "<filled template>" \
  --target-branch development
```

---

## Frontend Design Principles

### 1. Start with Design Thinking

Before writing any code, answer:
- What problem does this interface solve?
- Who is the user and what is their context?
- What emotion should this evoke?
- What will make this memorable?

### 2. Choose a Bold Direction

Don't settle for "clean and modern." Pick something distinctive:
- **Brutalist**: Raw, utilitarian, high-contrast
- **Maximalist**: Rich textures, layered elements, abundance
- **Retro-Futuristic**: Neon colors, geometric shapes, 80s/90s vibes
- **Organic**: Natural textures, soft curves, earthy tones
- **Editorial**: Magazine-style layouts, large typography, white space
- **Industrial**: Dark metals, mechanical details, technical aesthetics

### 3. Typography Sets the Tone

```css
/* Bad - Generic */
font-family: 'Inter', sans-serif;

/* Good - Distinctive */
font-family: 'Playfair Display', serif;  /* For luxury/editorial */
font-family: 'Bebas Neue', sans-serif;   /* For bold/sporty */
font-family: 'Space Mono', monospace;    /* For tech/retro */
font-family: 'Crimson Pro', serif;       /* For refined/classic */
```

### 4. Motion Creates Delight

```css
/* Orchestrated entrance animation */
.hero-title {
  animation: slideUp 0.8s ease-out;
}

.hero-subtitle {
  animation: slideUp 0.8s ease-out 0.2s backwards;
}

.hero-cta {
  animation: slideUp 0.8s ease-out 0.4s backwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 5. Create Atmosphere with Backgrounds

```css
/* Bad - Flat color */
background: #ffffff;

/* Good - Atmospheric */
background: 
  radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent),
  radial-gradient(circle at 80% 80%, rgba(250, 128, 114, 0.2), transparent),
  linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 100%);
```

---

## Best Practices

### For PR Creation:
1. ✅ Always work on feature branches
2. ✅ Run and pass all tests before creating PR
3. ✅ Fill every section of the PR template
4. ✅ Include work-item ID in PR title
5. ✅ Rebase (don't merge) before pushing
6. ✅ Never commit secrets or credentials
7. ✅ Mark PRs with `cs:used` label when Code Studio was used

### For Frontend Design:
1. ✅ Choose a clear aesthetic direction upfront
2. ✅ Use distinctive, context-appropriate typography
3. ✅ Create cohesive color systems with CSS variables
4. ✅ Orchestrate animations for maximum impact
5. ✅ Build atmospheric backgrounds, not flat colors
6. ✅ Test on multiple devices and screen sizes
7. ✅ Ensure accessibility (contrast, keyboard navigation, ARIA)
8. ✅ Match implementation complexity to design ambition

### For Repository Work:
1. ✅ Always add `## AGENTS_MD_VERIFIED ##` comment at the top of files
2. ✅ Follow existing code style and conventions
3. ✅ Document changes clearly
4. ✅ Test thoroughly before committing
5. ✅ Use semantic commit messages

---

## Additional Resources

### PR Template Location
```
/home/user/cloud-test/.codestudio/skills/createpr/pr-templates/generic.md
```

### Skills Documentation
- CreatePR: `/home/user/cloud-test/.codestudio/skills/createpr/SKILL.md`
- Frontend Design: `/home/user/cloud-test/.codestudio/skills/frontend-design/SKILL.md`

### Agent Rules
```
/home/user/cloud-test/.codestudio/AGENTS.md
```

---

## Quick Reference Commands

```bash
# Check current branch
git branch --show-current

# Check working tree status
git status --short

# Sync with base branch
git fetch origin && git rebase origin/development

# Run tests (examples)
npm test                    # Node.js
pytest --tb=short          # Python
dotnet test                # .NET
go test ./...              # Go

# Push changes
git push --force-with-lease

# Create PR (GitHub)
gh pr create --title "Type(ID): Description" --body "..." --base development --label "cs:used"
```

---

## Summary

This repository provides:
- 🚀 Automated workflows for PR creation across any tech stack
- 🎨 Professional frontend design guidance for creating memorable interfaces
- 📋 Structured templates and checklists for quality assurance
- 🔧 Extensible skills system for future capabilities
- ✅ Built-in quality gates to prevent common mistakes

**Key Philosophy:** Combine rigorous engineering practices (testing, code review, structured workflows) with bold creative vision (distinctive design, memorable interfaces) to build exceptional software products.

---

*This documentation is maintained as part of the cloud-test repository under Syncfusion Pvt Ltd.*
