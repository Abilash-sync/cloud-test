# Repository Files Summary

This document contains a comprehensive overview of all files found in the `/home/user/cloud-test` repository (excluding .git directory).

## Files Found

The following files were discovered in the repository:

1. `/home/user/cloud-test/.codestudio/AGENTS.md`
2. `/home/user/cloud-test/.codestudio/skills/createpr/SKILL.md`
3. `/home/user/cloud-test/.codestudio/skills/createpr/pr-templates/generic.md`
4. `/home/user/cloud-test/.codestudio/skills/frontend-design/SKILL.md`
5. `/home/user/cloud-test/README.md`

---

## File Contents

### /home/user/cloud-test/.codestudio/AGENTS.md

```markdown
     1	# Rules
     2	- ALWAYS add a comment `## AGENTS_MD_VERIFIED ##` at the top of every file you create or edit.
```

---

### /home/user/cloud-test/.codestudio/skills/createpr/SKILL.md

```markdown
     1	---
     2	name: createpr
     3	description: Generic PR creation workflow: branch checks, test gate, fill template, push, and open PR via Git. Works for any Git-based repository and any tech stack.
     4	---
     5	# Generic PR Creation Skill
     6	
     7	Works for **any repository** and **any tech stack**. Covers bug fixes and feature PRs.
     8	
     9	## Gate Checklist
    10	
    11	```
    12	[ ] 1 — On a feature branch, working tree clean, synced with base
    13	[ ] 2 — Tests run; all suites pass
    14	[ ] 3 — PR template filled; no placeholders remain
    15	[ ] 4 — PR created; URL captured
    16	```
    17	
    18	---
    19	
    20	## Phase 1 — Verify Branch & Working Tree
    21	
    22	```bash
    23	# Must NOT be on a protected branch
    24	git branch --show-current
    25	
    26	# Working tree must be clean
    27	git status --short
    28	
    29	# Sync with base branch (default: development / main)
    30	git fetch origin
    31	git rebase origin/<base-branch>
    32	
    33	# Show what will be included in the PR
    34	git diff origin/<base-branch>...HEAD --stat
    35	```
    36	
    37	> **Gate 1:** On a feature branch. No uncommitted changes. Rebased onto base. There are actual changes to PR.
    38	
    39	---
    40	
    41	## Phase 2 — Run Tests
    42	
    43	Run whatever test suites are relevant for this repository and record results.
    44	
    45	**TypeScript / Node.js projects:**
    46	```bash
    47	npm run test:unit
    48	npm run test:integration
    49	npm run test:coverage   # optional
    50	```
    51	
    52	**Python projects:**
    53	```bash
    54	pytest --tb=short
    55	```
    56	
    57	**.NET projects:**
    58	```bash
    59	dotnet test
    60	```
    61	
    62	**Go projects:**
    63	```bash
    64	go test ./...
    65	```
    66	
    67	**Generic / CI script:**
    68	```bash
    69	# Look for test scripts in package.json, Makefile, or README
    70	npm test       # or
    71	make test      # or
    72	./scripts/test.sh
    73	```
    74	
    75	> Record each result as **Pass ✅**, **Fail ❌**, or **N/A** (layer not affected).  
    76	> **Gate 2:** All executed suites pass. Do not proceed with failing tests.
    77	
    78	---
    79	
    80	## Phase 3 — Push Branch
    81	
    82	```bash
    83	git push --force-with-lease
    84	```
    85	
    86	---
    87	
    88	## Phase 4 — Fill the PR Template
    89	
    90	1. Read [pr-templates/generic.md](pr-templates/generic.md)
    91	2. Fill **every section** using `git diff origin/<base-branch>...HEAD` as your source of truth
    92	3. Replace all placeholders — search for any remaining `<...>` before continuing
    93	4. Fill the `## Test Suite Results` table with actual pass/fail counts from Phase 2
    94	
    95	**PR Title format — mandatory:**
    96	
    97	| Type | Format | Example |
    98	|---|---|---|
    99	| Bug fix | `Bug(<id>): <imperative summary>` | `Bug(1042): Fix null ref in auth handler` |
   100	| Feature | `Feature(<id>): <imperative summary>` | `Feature(890): Add dark-mode toggle` |
   101	| Refactor | `Refactor(<id>): <imperative summary>` | `Refactor(55): Extract payment service` |
   102	| Chore | `Chore(<id>): <imperative summary>` | `Chore(12): Upgrade Node to 22` |
   103	
   104	- **`(<id>)` is required.** If the work-item ID is unknown, ask the user before continuing.
   105	- Titles must be ≤ 72 characters after the prefix, in imperative present tense.
   106	
   107	> **Gate 3:** Template fully filled. No `<placeholder>` strings remain. Title format correct.
   108	
   109	---
   110	
   111	## Phase 5 — Create the PR
   112	
   113	### 1. Obtain Access Token
   114	
   115	**Ask the user for their Git personal access token** with the following permissions:
   116	- `api` or `repo` — full repository access
   117	- `write:repository_hook` — to create webhooks (if needed)
   118	
   119	**Store temporarily** for this session only (do not commit):
   120	```
   121	GIT_TOKEN="<user-provided-access-token>"
   122	```
   123	
   124	### 2. Push Your Branch
   125	
   126	Ensure your branch is pushed to the remote:
   127	```bash
   128	git push origin <your-feature-branch>
   129	```
   130	
   131	### 3. Create the PR
   132	
   133	Use your Git hosting platform's CLI tool or web interface to create the PR:
   134	
   135	**GitHub (using `gh` CLI):**
   136	```bash
   137	gh pr create \
   138	  --title "Bug(<id>): <summary>" \
   139	  --body "<filled PR body from template>" \
   140	  --base development
   141	```
   142	
   143	**GitLab (using `glab` CLI):**
   144	```bash
   145	glab mr create \
   146	  --title "Bug(<id>): <summary>" \
   147	  --description "<filled PR body from template>" \
   148	  --target-branch development
   149	```
   150	
   151	**Generic Git Platform (manual web creation):**
   152	1. Navigate to your repository on the web platform
   153	2. Click **New PR** or **New Merge Request**
   154	3. Select your feature branch as the source
   155	4. Select the base branch (e.g., `development`)
   156	5. Paste the filled PR template into the description
   157	6. Submit
   158	
   159	> **Gate 4:** PR created successfully. Capture and verify the PR URL.
   160	
   161	---
   162	
   163	## Hard Rules
   164	
   165	1. Never create a PR from `main`, `master`, or `development` — feature branch only.
   166	2. Never open a PR with failing tests.
   167	3. Never commit secrets (`Password`, `Secret`, `ApiKey`, `ConnectionString`).
   168	4. Always include `-Label "cs:used"` / `--label "cs:used"` when Code Studio was involved.
   169	5. Always rebase onto the base branch before pushing — never merge.
   170	6. Work-item ID is mandatory in the title — stop and ask the user if unknown.
   171	7. All template placeholders must be replaced before the PR is submitted.
   172	````

---

### /home/user/cloud-test/.codestudio/skills/createpr/pr-templates/generic.md

```markdown
     1	<!-- PR Title format: <Type>(<work-item-id>): <imperative summary>
     2	     Examples:
     3	       Bug(1042): Fix null reference in auth handler
     4	       Feature(890): Add dark-mode toggle to settings page
     5	       Refactor(55): Extract payment logic into dedicated service
     6	       Chore(12): Upgrade Node.js to v22 -->
     7	
     8	## Description
     9	<!-- Clearly describe what this PR does. What problem does it solve or what capability does it add? -->
    10	
    11	
    12	## Type of Change
    13	<!-- Check all that apply -->
    14	- [ ] Bug fix
    15	- [ ] New feature
    16	- [ ] Refactor / code improvement
    17	- [ ] Performance improvement
    18	- [ ] Tests only
    19	- [ ] Documentation only
    20	- [ ] Build / CI / dependency update
    21	- [ ] Other: ___________
    22	
    23	## Root Cause / Motivation
    24	<!-- Bug: describe the root cause and how it was found.
    25	     Feature: describe the user need or business motivation.
    26	     Refactor/Chore: describe why this change is needed now. -->
    27	
    28	
    29	## Solution Description
    30	<!-- Describe your implementation approach in enough detail for reviewers to follow it. -->
    31	
    32	
    33	## Areas Affected
    34	<!-- List the modules, pages, services, or APIs touched by this change. Be specific. -->
    35	-
    36	-
    37	
    38	## Breaking Changes
    39	<!-- Does this change break any existing API, contract, or workflow? -->
    40	- [ ] Yes — describe below
    41	- [ ] No
    42	
    43	<!-- If yes, describe what breaks and the migration / rollout plan: -->
    44	
    45	
    46	## Output / Screenshots
    47	<!-- Add before/after screenshots, curl output, or log snippets that demonstrate the change.
    48	     For non-visual changes write "N/A". -->
    49	
    50	
    51	## Test Suite Results
    52	
    53	> Run all relevant suites and record results before submitting. Mark each row **Pass ✅**, **Fail ❌**, or **N/A** (layer not affected by this change).
    54	
    55	| Suite | Command | Result |
    56	|---|---|---|
    57	| Unit tests | `<fill in command>` | |
    58	| Integration tests | `<fill in command>` | |
    59	| E2E / smoke tests | `<fill in command>` | |
    60	| Linter / type check | `<fill in command>` | |
    61	
    62	## Manual Testing
    63	<!-- Link to a manual test document, test plan, or describe the steps you followed to verify the change. -->
    64	[Manual Testing Document](<link or N/A>)
    65	
    66	---
    67	
    68	## Additional Checklist
    69	
    70	- [ ] All executed test suites pass (see table above)
    71	- [ ] New tests added for the changed behaviour (or justified why not)
    72	- [ ] No secrets, API keys, or connection strings committed
    73	- [ ] No unintentional lock-file or generated-file changes included
    74	- [ ] New dependencies are justified and their licences are compatible
    75	- [ ] Environment variable or configuration changes are documented
    76	- [ ] Breaking changes have a migration or rollout plan (see above)
    77	
    78	---
    79	
    80	### Was Code Studio used in this PR?
    81	(Yes / No)
    82	
    83	If **Yes**, primary use — check one:
    84	- [ ] Generate new code
    85	- [ ] Refactor / improve existing code
    86	- [ ] Write tests
    87	- [ ] Bug fix / debugging help
    88	- [ ] Documentation / comments
    89	- [ ] Review assistance (explanations / summaries)
    90	- [ ] Other: ___________
```

---

### /home/user/cloud-test/.codestudio/skills/frontend-design/SKILL.md

```markdown
     1	---
     2	name: frontend-design
     3	description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
     4	license: Complete terms in LICENSE.txt
     5	---
     6	
     7	This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.
     8	
     9	The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.
    10	
    11	## Design Thinking
    12	
    13	Before coding, understand the context and commit to a BOLD aesthetic direction:
    14	- **Purpose**: What problem does this interface solve? Who uses it?
    15	- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
    16	- **Constraints**: Technical requirements (framework, performance, accessibility).
    17	- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?
    18	
    19	**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.
    20	
    21	Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
    22	- Production-grade and functional
    23	- Visually striking and memorable
    24	- Cohesive with a clear aesthetic point-of-view
    25	- Meticulously refined in every detail
    26	
    27	## Frontend Aesthetics Guidelines
    28	
    29	Focus on:
    30	- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
    31	- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
    32	- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
    33	- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
    34	- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.
    35	
    36	NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.
    37	
    38	Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.
    39	
    40	**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.
    41	
    42	Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
```

---

### /home/user/cloud-test/README.md

```markdown
     1	# cloud-test
     2	code studio product is comes under syncfusion pvt lmt
```

---

## Summary

**Total Files Found: 5 files**

The repository contains:
- 1 README file at the root
- 1 AGENTS.md configuration file in the .codestudio directory
- 3 skill documentation files in the .codestudio/skills directory:
  - createpr skill with PR workflow and template
  - frontend-design skill with UI/UX guidelines

All files have been read completely and their full contents are documented above.
