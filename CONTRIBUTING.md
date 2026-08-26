<!-- referred by instructions.md -->
## AGENTS_MD_VERIFIED ##

# Pull Request (PR) Guide

This guide explains how to prepare, open, and land high‑quality pull requests.

## Before You Start
- Check for an existing issue. If none exists, consider opening one to discuss scope and approach.
- Keep changes focused. Prefer several small, reviewable PRs over one large PR.
- Search the repo for similar code or patterns and follow the existing style.

## Branching
- Create a feature branch from the main development branch (usually `main`):
  - feature/<short-topic>
  - fix/<short-topic>
  - chore/<short-topic>
  - You may append an issue number, e.g. `feature/auth-#123`.
- Keep your branch up to date with `main` (prefer rebase for a clean history unless the team prefers merge).

## Commits
- Write clear, descriptive commit messages. Use present tense and explain why when it isn’t obvious.
- Consider Conventional Commits:
  - feat: add X
  - fix: correct Y
  - docs: update Z
  - chore:, refactor:, test:, build:, ci:
- Keep commits logically grouped and small; avoid unrelated changes.

## Opening a Pull Request
1. Push your branch to the remote.
2. Open a PR from your branch into `main`.
3. Use the template below for your PR description.
4. Mark as Draft if still in progress; mark Ready for Review when all acceptance checks pass.

### PR Description Template (copy into your PR)
Title: <short, descriptive title>

Summary
- What does this change do? Why is it needed?

Related Issues
- Closes #<id> (or) Relates to #<id>

Changes
- [ ] Key change 1
- [ ] Key change 2

Screenshots/Recordings (if UI)
- Before/After visuals or a short clip

Breaking Changes
- [ ] None
- [ ] Describe impact and migration steps

Testing
- Steps to verify (commands, URLs, inputs, expected results)

Checklist
- [ ] Code compiles locally
- [ ] Lint/format passes
- [ ] Tests added/updated and passing
- [ ] Docs updated (README/inline/docs) if needed
- [ ] Self‑reviewed (naming, comments, dead code removed)
- [ ] Security/privacy considered (no secrets, safe handling of data)
- [ ] Linked related issues and added labels

## Reviews
- Request reviews from relevant owners.
- Address feedback promptly; prefer follow‑up commits instead of force‑pushing after reviews start (unless rebasing to resolve conflicts is required by your workflow).
- Resolve or reply to every comment; don’t leave ambiguous threads open.

## CI and Quality Gates
- Ensure CI is green before requesting final review.
- Run local checks that apply to this repo (examples):
  - Formatting/linting
  - Unit/integration tests
  - Type checks/build
- If the repository uses a CHANGELOG, add an entry for user‑visible changes.

## PR Size and Scope
- Aim for PRs under ~300 lines of non‑generated changes when possible.
- If a PR grows large or mixed in scope, split it into smaller, sequential PRs.

## Security and Privacy
- Never commit secrets, API keys, or credentials.
- Sanitize logs and screenshots; avoid exposing PII.

## Merging
- Prefer Squash and merge to keep history clean, unless the project requires another strategy.
- Ensure the final squash message is clear and references issues (e.g., "feat: add X (closes #123)").
- Delete your branch after merge.

## After Merge
- Monitor CI/CD and production (if applicable) for regressions.
- Be ready to follow up with fixes based on real‑world feedback.

## Tips for Great PRs
- Explain trade‑offs and alternatives considered in the description.
- Include tests that fail before your change and pass after.
- Add comments in complex code paths to help reviewers.

---
If you want this guide tailored to repository‑specific commands (lint/test/build) or templates, let us know and we’ll update it accordingly.