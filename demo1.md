## AGENTS_MD_VERIFIED ##
# Demo1 - Repository File Summary

This document contains a summary of all files found in the cloud-test repository.

## Repository Structure

### Root Level Files

#### README.md
- **Location**: `/home/user/cloud-test/README.md`
- **Content**: 
  - Project name: cloud-test
  - Description: code studio product is comes under syncfusion pvt lmt

### .codestudio Directory

#### AGENTS.md
- **Location**: `/home/user/cloud-test/.codestudio/AGENTS.md`
- **Content**: 
  - Rules for file creation
  - Requires comment `## AGENTS_MD_VERIFIED ##` at the top of every file created or edited

### Skills Directory

The repository contains two skills in the `.codestudio/skills/` directory:

#### 1. createpr Skill
- **Location**: `/home/user/cloud-test/.codestudio/skills/createpr/`
- **Main File**: `SKILL.md` (4676 bytes)
- **Description**: Generic PR creation workflow that works for any Git-based repository and tech stack
- **Key Features**:
  - Branch checks and validation
  - Test gate requirements
  - PR template management
  - Push and PR creation workflow
  - Works with GitHub, GitLab, and generic Git platforms

**Gate Checklist**:
1. On a feature branch, working tree clean, synced with base
2. Tests run; all suites pass
3. PR template filled; no placeholders remain
4. PR created; URL captured

**Phases**:
- Phase 1: Verify Branch & Working Tree
- Phase 2: Run Tests
- Phase 3: Push Branch
- Phase 4: Fill the PR Template
- Phase 5: Create the PR

**Hard Rules**:
- Never create a PR from main, master, or development
- Never open a PR with failing tests
- Never commit secrets
- Always include label "cs:used" when Code Studio was involved
- Always rebase before pushing
- Work-item ID is mandatory in title

**PR Template**:
- **Location**: `/home/user/cloud-test/.codestudio/skills/createpr/pr-templates/generic.md` (2859 bytes)
- **Sections**:
  - Description
  - Type of Change
  - Root Cause / Motivation
  - Solution Description
  - Areas Affected
  - Breaking Changes
  - Output / Screenshots
  - Test Suite Results
  - Manual Testing
  - Additional Checklist
  - Code Studio usage tracking

#### 2. frontend-design Skill
- **Location**: `/home/user/cloud-test/.codestudio/skills/frontend-design/`
- **Main File**: `SKILL.md` (4440 bytes)
- **Description**: Create distinctive, production-grade frontend interfaces with high design quality
- **Use Cases**: Web components, pages, artifacts, posters, applications, websites, landing pages, dashboards, React components, HTML/CSS layouts

**Design Thinking Approach**:
- Purpose: What problem does the interface solve?
- Tone: Choose a bold aesthetic direction (minimal, maximalist, retro-futuristic, etc.)
- Constraints: Technical requirements
- Differentiation: What makes it unforgettable?

**Frontend Aesthetics Guidelines**:
- **Typography**: Choose beautiful, unique fonts; avoid generic fonts like Arial and Inter
- **Color & Theme**: Use cohesive aesthetics with CSS variables
- **Motion**: Animations and micro-interactions using CSS or Motion library
- **Spatial Composition**: Unexpected layouts, asymmetry, overlap, diagonal flow
- **Backgrounds & Visual Details**: Create atmosphere with gradients, textures, patterns

**Key Principles**:
- Avoid generic AI aesthetics
- Match implementation complexity to aesthetic vision
- Execute vision with precision
- Be creative and make unexpected choices
- No two designs should be the same

## Summary

The cloud-test repository is a Code Studio product from Syncfusion Pvt Ltd. It contains:
- 1 README file
- 1 AGENTS configuration file
- 2 skills (createpr and frontend-design)
- 1 PR template file

Total files read: 5 files
- README.md
- .codestudio/AGENTS.md
- .codestudio/skills/createpr/SKILL.md
- .codestudio/skills/frontend-design/SKILL.md
- .codestudio/skills/createpr/pr-templates/generic.md
