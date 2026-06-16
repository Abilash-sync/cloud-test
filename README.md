# cloud-test

Code Studio is a product under Syncfusion Pvt. Ltd.

## Overview
This repository contains a simple, static login page prototype for Code Studio. It is implemented with plain HTML, CSS, and a small amount of vanilla JavaScript (no build tools or backend required).

## Project Structure
- `README.md` — Project overview and usage instructions
- `REVERT.md` — Reference note for reverting a specific commit
- `login.html` — Standalone login page (HTML + inline CSS/JS)

## Features
- Modern, responsive layout with gradient background
- Accessible form labels and inputs
- "Remember me" option
- Links for "Forgot Password" and "Sign up"
- Lightweight JS submit handler stub you can extend with real auth

## Getting Started
You can open the page directly in your browser or serve it locally.

### Option 1: Open directly
1. Double-click `login.html` to open it in your default browser

### Option 2: Serve locally (recommended)
Serving files eliminates any browser security limitations you might hit when expanding functionality.

Using Python 3:
```bash
python -m http.server 8080
```
Then open http://localhost:8080/login.html

Using Node (if you have http-server):
```bash
npx http-server . -p 8080
```
Then open http://localhost:8080/login.html

## Development Notes
- All styles are in the `<style>` block inside `login.html`. For larger projects, consider extracting to `styles.css`.
- The basic submit handler is at the bottom of `login.html`. Replace the alert with your authentication flow or API call.
- Keep accessibility in mind: maintain proper labels, focus states, and contrast ratios.

## Contributing
If you plan to contribute, please follow standard Git workflows (feature branches, clear commit messages, and concise PRs). If this is for internal use, follow your team's contribution guidelines.

## License
Copyright (c) Syncfusion Pvt. Ltd. All rights reserved.

This repository does not currently include a public license. Please contact Syncfusion for usage permissions or licensing details.
