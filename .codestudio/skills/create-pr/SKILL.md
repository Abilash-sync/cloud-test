---
name: create-pr
description: "Generic PR creation workflow: branch checks, test gate, fill template, push, and open PR via Gitea REST API. Works for any stack (bug fix or feature)."
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

### Token setup

Load `GITEA_TOKEN` from a `.env` file at the workspace root:
```
GITEA_TOKEN="your-personal-access-token"
```
Never commit this file.

### Scripts (auto-detect URL and repo from git remote)

**Windows PowerShell:**
```powershell
.\.codestudio\skills\git\scripts\create-pr.ps1 `
  -Title "Bug(<id>): <summary>" `
  -Base development `
  -Label "cs:used" `
  -Message "<filled PR body>"
```

**Unix / macOS / WSL:**
```bash
./.codestudio/skills/git/scripts/create-pr.sh \
  --title "Bug(<id>): <summary>" \
  --base development \
  --label "cs:used" \
  --message "<filled PR body>"
```

Use `--file path/to/filled-template.md` instead of `--message` for longer bodies.

> **Gate 4:** Script prints `PR #N created successfully!` with a URL.

---

## Hard Rules

1. Never create a PR from `main`, `master`, or `development` — feature branch only.
2. Never open a PR with failing tests.
3. Never commit secrets (`Password`, `Secret`, `ApiKey`, `ConnectionString`).
4. Always include `-Label "cs:used"` / `--label "cs:used"` when Code Studio was involved.
5. Always rebase onto the base branch before pushing — never merge.
6. Work-item ID is mandatory in the title — stop and ask the user if unknown.
7. All template placeholders must be replaced before the PR is submitted.
````
