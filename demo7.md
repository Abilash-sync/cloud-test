## AGENTS_MD_VERIFIED ##

# Demo7 - Repository File Summary

This document provides a comprehensive overview of all files in the cloud-test repository.

## Repository Overview
- **Repository Name**: cloud-test
- **Owner**: Syncfusion Pvt Ltd
- **Purpose**: Code Studio product repository

---

## File Structure

### 1. README.md
**Location**: `/home/user/cloud-test/README.md`

**Content**:
```
# cloud-test
code studio product is comes under syncfusion pvt lmt
```

**Summary**: Main repository readme file that identifies the project as a Code Studio product under Syncfusion Pvt Ltd.

---

### 2. AGENTS.md
**Location**: `/home/user/cloud-test/.codestudio/AGENTS.md`

**Content**:
```
# Rules
- ALWAYS add a comment `## AGENTS_MD_VERIFIED ##` at the top of every file you create or edit.
```

**Summary**: Configuration file that defines rules for agents working in this repository. Requires a specific verification comment at the top of all created/edited files.

---

### 3. createpr Skill
**Location**: `/home/user/cloud-test/.codestudio/skills/createpr/SKILL.md`

**Summary**: A generic PR creation workflow skill that works for any Git-based repository and tech stack. 

**Key Features**:
- Branch verification and working tree checks
- Test gate requirements (must pass before PR creation)
- Template-based PR creation
- Support for multiple tech stacks (TypeScript/Node.js, Python, .NET, Go)

**Gate Checklist**:
1. On a feature branch, working tree clean, synced with base
2. Tests run; all suites pass
3. PR template filled; no placeholders remain
4. PR created; URL captured

**Phases**:
- **Phase 1**: Verify branch & working tree
- **Phase 2**: Run tests (specific commands for different tech stacks)
- **Phase 3**: Push branch (using `--force-with-lease`)
- **Phase 4**: Fill PR template

**PR Title Format**:
- Bug fix: `Bug(<id>): <imperative summary>`
- Feature: `Feature(<id>): <imperative summary>`

---

### 4. PR Template
**Location**: `/home/user/cloud-test/.codestudio/skills/createpr/pr-templates/generic.md`

**Summary**: A comprehensive PR template that includes:

**Sections**:
- **Description**: What the PR does and what problem it solves
- **Type of Change**: Checkboxes for bug fix, feature, refactor, performance, tests, docs, build/CI, other
- **Root Cause / Motivation**: Why this change is needed
- **Solution Description**: Implementation approach details
- **Areas Affected**: Specific modules/pages/services/APIs touched
- **Breaking Changes**: Whether the PR introduces breaking changes
- **Output / Screenshots**: Before/after demonstrations
- **Test Suite Results**: Table for recording test results (unit, integration, e2e, linter)
- **Manual Testing**: Link to test document or description
- **Additional Checklist**: Security, dependencies, configuration checks
- **Code Studio Usage**: Whether and how Code Studio was used

---

### 5. frontend-design Skill
**Location**: `/home/user/cloud-test/.codestudio/skills/frontend-design/SKILL.md`

**Summary**: A skill for creating distinctive, production-grade frontend interfaces with high design quality.

**Purpose**: Generate creative, polished UI designs that avoid generic AI aesthetics when building web components, pages, dashboards, or applications.

**Design Thinking Framework**:
1. **Purpose**: Understand the problem and users
2. **Tone**: Choose a bold aesthetic direction (minimalist, maximalist, retro-futuristic, brutalist, etc.)
3. **Constraints**: Consider technical requirements
4. **Differentiation**: Create something unforgettable

**Key Principles**:
- **Typography**: Use distinctive, beautiful fonts; avoid generic choices like Arial, Inter
- **Color & Theme**: Commit to cohesive aesthetics using CSS variables
- **Motion**: High-impact animations with CSS or Motion library
- **Spatial Composition**: Unexpected layouts with asymmetry, overlap, diagonal flow
- **Backgrounds & Visual Details**: Create atmosphere with gradients, textures, patterns

**Anti-Patterns to Avoid**:
- Generic font families (Inter, Roboto, Arial)
- Cliched color schemes (purple gradients on white)
- Predictable layouts
- Cookie-cutter designs

**Philosophy**: Match implementation complexity to aesthetic vision. Execute designs with precision and intention.

---

## Summary Statistics

- **Total Files Documented**: 5
- **Configuration Files**: 1 (AGENTS.md)
- **Documentation Files**: 1 (README.md)
- **Skill Files**: 2 (createpr, frontend-design)
- **Template Files**: 1 (generic.md)

---

## Key Takeaways

1. **Code Studio Product**: This is a repository for Code Studio, a product under Syncfusion Pvt Ltd
2. **Agent Rules**: All files created/edited must include the `## AGENTS_MD_VERIFIED ##` comment
3. **PR Workflow**: Comprehensive PR creation process with testing gates and detailed templates
4. **Design Focus**: Strong emphasis on creating distinctive, production-grade frontend interfaces
5. **Tech Stack Agnostic**: Skills support multiple programming languages and frameworks

---

*Document created by reading all repository files systematically.*
*Date: Generated during repository exploration*
