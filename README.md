## This is from .codestudio/codestudio-instructions.md
## AGENTS_MD_VERIFIED ##

# cloud-test

## Overview
Code Studio product is a comprehensive development platform provided by Syncfusion Pvt Ltd. It empowers developers to build, test, and deploy cloud-native applications with enhanced productivity and collaboration features.

## Description
This project contains the Code Studio product suite, which offers a modern, efficient development environment for building and managing cloud-based applications. The platform integrates seamlessly with popular development workflows and provides robust tooling for teams of all sizes.

## Features
- **Advanced Code Editing**: Full-featured IDE capabilities with intelligent code completion
- **Integrated Development Tools**: Built-in debugging, testing, and deployment pipelines
- **Cloud-Based Architecture**: Access your development environment from anywhere
- **Enterprise-Grade Support**: Professional support and SLA guarantees
- **AI-Powered Assistance**: Integrated AI tools to accelerate development
- **Real-Time Collaboration**: Work together with your team in real-time

## Prerequisites
Before getting started, ensure you have:
- Node.js (v16 or higher)
- Git
- A modern web browser (Chrome, Firefox, or Edge)

## Getting Started
To get started with the cloud-test project, follow these steps:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cloud-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Review the documentation**
   - Explore the `.codestudio/` directory for configuration details
   - Check out the skills library in `.codestudio/skills/`

4. **Begin development**
   ```bash
   npm start
   ```

## Project Structure
```
cloud-test/
├── README.md              # Project documentation
├── AGENTS.md             # Agent configuration and verification
├── .codestudio/          # Code Studio configuration and skills
│   ├── codestudio-instructions.md
│   └── skills/           # Available skills library
├── .claude/              # Claude AI configuration
│   └── skills/
└── .github/              # GitHub-specific configurations
    ├── copilot-instructions.md
    └── skills/
```

## Available Skills
This project includes several integrated skills:
- **camelcase** - Convert text to camelCase format
- **pascalcase** - Convert text to PascalCase format
- **frontend-design** - Create production-grade UI interfaces

For more details, check the `.codestudio/skills/` directory.

## Contributing
We welcome contributions! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support
For more information and support:
- Visit [Syncfusion Documentation](https://www.syncfusion.com)
- Contact our support team
- Check the issue tracker for known issues

## License
This project is provided by Syncfusion Pvt Ltd. All rights reserved.

---

**Version**: 1.0.0  
**Last Updated**: 2024