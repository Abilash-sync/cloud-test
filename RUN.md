## AGENTS_MD_VERIFIED ##

# Cloud Test - RUN Guide

## Project Overview

**cloud-test** is a Code Studio development environment repository managed by Syncfusion Pvt. Ltd. This is a lightweight Git-based project that serves as a workspace for Code Studio agent-based development with built-in skills and agent configuration.

### Project Type
- **Type**: Code Studio Development Environment
- **Language**: Configuration-based (Markdown documentation)
- **Version Control**: Git (branch: `test`)
- **Purpose**: Code Studio workspace with agent skills for PR creation and frontend design

## Project Structure

```
/home/user/cloud-test/
├── .git/                    # Git version control
├── .codestudio/             # Code Studio configuration
│   ├── AGENTS.md           # Agent rules and guidelines
│   └── skills/             # Code Studio skills library
│       ├── createpr/       # PR creation workflow skill
│       └── frontend-design/ # Frontend design skill
└── README.md               # Project description
```

## Prerequisites

### Required Software
- **Git**: Version 2.x or higher
- **Code Studio**: Agent-based development environment
- **Text Editor**: Any markdown-compatible editor (VS Code, Vim, etc.)

### System Requirements
- Linux/Unix-based system (or WSL on Windows)
- Command-line access
- Git configured with user credentials

## Installation Steps

### 1. Clone the Repository (if not already cloned)

```bash
git clone <repository-url> /home/user/cloud-test
cd /home/user/cloud-test
```

### 2. Verify Git Configuration

```bash
# Check current branch
git branch --show-current

# Should show: test
```

### 3. Explore the Project

```bash
# List all files
ls -la

# View project structure
tree -L 3  # or use ls -R for recursive listing
```

## How to Use This Project

This repository serves as a Code Studio workspace and doesn't require traditional "running" like an application. Instead, it provides:

### 1. Code Studio Agent Rules

The `.codestudio/AGENTS.md` file contains agent behavior rules:
- **Rule**: Always add a comment `## AGENTS_MD_VERIFIED ##` at the top of every file created or edited

### 2. Available Skills

#### **createpr** - PR Creation Workflow
Location: `.codestudio/skills/createpr/SKILL.md`

**Purpose**: Generic PR creation workflow for any Git-based repository

**Usage**:
```bash
# Read the skill documentation
cat .codestudio/skills/createpr/SKILL.md
```

**Features**:
- Branch validation and checks
- Test gate verification
- PR template filling
- Push and PR creation automation
- Works with GitHub, GitLab, and other Git platforms

**Gate Checklist**:
1. On feature branch, working tree clean, synced with base
2. Tests run; all suites pass
3. PR template filled; no placeholders remain
4. PR created; URL captured

#### **frontend-design** - Frontend Design Skill
Location: `.codestudio/skills/frontend-design/SKILL.md`

**Purpose**: Create distinctive, production-grade frontend interfaces

**Usage**:
```bash
# Read the skill documentation
cat .codestudio/skills/frontend-design/SKILL.md
```

**Features**:
- Production-grade frontend interface creation
- High design quality with distinctive aesthetics
- Supports web components, pages, dashboards, React components, HTML/CSS layouts
- Avoids generic AI aesthetics
- Focus on typography, color, motion, spatial composition, and visual details

## Git Workflow

### Check Repository Status

```bash
# View current branch
git branch --show-current

# View status
git status

# View recent commits
git log --oneline -10
```

### Working with Branches

```bash
# List all branches
git branch -a

# Create a new feature branch
git checkout -b feature/<your-feature-name>

# Switch branches
git checkout <branch-name>
```

### Syncing with Remote

```bash
# Fetch latest changes
git fetch origin

# Pull changes from test branch
git pull origin test

# Push changes
git push origin <branch-name>
```

## Development Workflow

### For Creating Pull Requests

Follow the workflow defined in `.codestudio/skills/createpr/SKILL.md`:

1. **Verify Branch & Working Tree**
   ```bash
   git branch --show-current
   git status --short
   git fetch origin
   git rebase origin/test
   git diff origin/test...HEAD --stat
   ```

2. **Run Tests** (if applicable to your changes)
   - Follow project-specific test commands
   - Ensure all tests pass before PR creation

3. **Push Branch**
   ```bash
   git push --force-with-lease
   ```

4. **Create PR**
   - Use PR template from `.codestudio/skills/createpr/pr-templates/generic.md`
   - Follow title format: `Bug(<id>): <summary>` or `Feature(<id>): <summary>`

### For Frontend Development

Follow the guidelines in `.codestudio/skills/frontend-design/SKILL.md`:

1. **Design Thinking**: Understand purpose, tone, constraints
2. **Implementation**: Create production-grade, visually striking code
3. **Focus Areas**: Typography, color, motion, spatial composition, backgrounds

## File Management

### Reading Documentation

```bash
# Read README
cat README.md

# Read agent rules
cat .codestudio/AGENTS.md

# Read PR creation skill
cat .codestudio/skills/createpr/SKILL.md

# Read frontend design skill
cat .codestudio/skills/frontend-design/SKILL.md

# Read PR template
cat .codestudio/skills/createpr/pr-templates/generic.md
```

### Creating/Editing Files

When creating or editing files in this repository, remember to follow the agent rule:
- Add `## AGENTS_MD_VERIFIED ##` comment at the top of every file

## Common Commands

### Repository Information

```bash
# View remote URLs
git remote -v

# View repository configuration
git config --list

# View file tree
find . -type f -not -path './.git/*' | sort
```

### Documentation Access

```bash
# Quick access to all skill documentation
grep -r "description:" .codestudio/skills/*/SKILL.md

# List all markdown files
find . -name "*.md" -not -path './.git/*'
```

## Troubleshooting

### Issue: Git Permission Denied

**Solution**:
```bash
# Check Git configuration
git config user.name
git config user.email

# Set if not configured
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Issue: Cannot Switch Branches

**Solution**:
```bash
# Check for uncommitted changes
git status

# Stash changes if needed
git stash

# Switch branch
git checkout <branch-name>

# Restore stashed changes
git stash pop
```

### Issue: Merge Conflicts

**Solution**:
```bash
# View conflicts
git status

# Resolve conflicts in editor, then:
git add <resolved-files>
git rebase --continue

# Or abort rebase
git rebase --abort
```

### Issue: Lost Uncommitted Changes

**Solution**:
```bash
# View stash list
git stash list

# Apply most recent stash
git stash apply

# Apply specific stash
git stash apply stash@{n}
```

## Additional Resources

### Code Studio Integration

This repository is designed to work with Code Studio's agent-based development:
- Agents follow rules defined in `.codestudio/AGENTS.md`
- Skills provide specialized workflows and capabilities
- All development should respect the verification comment requirement

### Skills Documentation

For detailed information about available skills:
- **PR Creation**: See `.codestudio/skills/createpr/SKILL.md`
- **Frontend Design**: See `.codestudio/skills/frontend-design/SKILL.md`

### Git Best Practices

1. Always work on feature branches, never on `test` directly
2. Keep commits atomic and well-described
3. Rebase instead of merge to maintain clean history
4. Run tests before creating PRs
5. Follow PR title conventions when using the createpr skill

## Project Metadata

- **Repository**: cloud-test
- **Organization**: Syncfusion Pvt. Ltd.
- **Primary Branch**: test
- **Last Commit**: fdab21d - "login removed"
- **Skills Version**: Current as of repository state

## Notes

- This is a lightweight repository focused on Code Studio configuration
- No traditional build, test, or deployment processes required
- Primary usage is through Code Studio agent interactions
- Skills are self-documenting and can be extended

---

**Created**: 2024
**Maintained by**: Code Studio Development Team
**License**: As per Syncfusion Pvt. Ltd. policies
