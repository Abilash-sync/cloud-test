---
name: create-pr
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
````
