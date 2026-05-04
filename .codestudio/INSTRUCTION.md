## AGENTS_MD_VERIFIED ##
## VERIFIED_BY_INSTRUCTION_MD ##

# Code Studio Instructions

This document provides guidelines for the Code Studio project structure and agent behavior.

## Directory Structure

Following the [LangChain OSS directory structure guidelines](https://docs.langchain.com/oss/javascript/deepagents/data-locations#directory-structure), the project maintains the following organization:

```
.codestudio/
├── AGENTS.md          # Agent rules and guidelines
├── INSTRUCTION.md     # This file - Instructions and setup
├── skills/            # Reusable skills and modules
│   ├── frontend-design/
│   │   └── SKILL.md
│   └── create-pr/
│       ├── SKILL.md
│       └── pr-templates/
└── [other resources]
```

## Key Instructions

1. **Verification**: Always add the following comments at the top of every file created or modified:
   ```
   ## AGENTS_MD_VERIFIED ##
   ## VERIFIED_BY_INSTRUCTION_MD ##
   ```
   This ensures traceability back to both AGENTS.md and INSTRUCTION.md requirements.

2. **File Organization**: 
   - Keep all configuration and guidelines in the `.codestudio` folder
   - Organize skills in dedicated subdirectories under `skills/`
   - Each skill should have a `SKILL.md` descriptor

3. **Documentation**: 
   - Refer to `AGENTS.md` for agent rules and guidelines
   - Refer to this `INSTRUCTION.md` for project structure and setup
   - Each skill contains detailed implementation guidelines in its `SKILL.md`

4. **Agent Guidelines**: See [AGENTS.md](./AGENTS.md) for complete agent rules and verification requirements.

## Quick Links

- [AGENTS.md](./AGENTS.md) - Agent rules and requirements
- [Skills Directory](./skills/) - Available skills and modules
- [LangChain Documentation](https://docs.langchain.com/oss/javascript/deepagents/data-locations#directory-structure) - External reference for project structure best practices
