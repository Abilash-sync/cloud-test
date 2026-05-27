---
name: camelcase
description: Convert text to camelCase format for JavaScript/TypeScript conventions. Use this skill when users need to convert variable names, function names, or any text to camelCase (e.g., "hello world" → "helloWorld"). Handles multiple input formats including snake_case, kebab-case, PascalCase, and space-separated text.
license: MIT
---

This skill provides robust text conversion to camelCase format, following JavaScript and TypeScript naming conventions. Implements intelligent word boundary detection and handles edge cases for production-grade code formatting.

The user provides text to convert: variable names, function names, phrases, or any string that needs camelCase formatting. They may specify the source format or provide mixed-case input.

## Conversion Strategy

Before converting, analyze the input format and apply the appropriate transformation:
- **Input Analysis**: Detect current format (snake_case, kebab-case, PascalCase, space-separated, mixed)
- **Word Boundaries**: Identify where words split using delimiters, capital letters, or transitions
- **Preservation Rules**: Maintain numbers, handle acronyms intelligently
- **Output Quality**: Ensure valid JavaScript/TypeScript identifier compatibility

**CRITICAL**: Handle edge cases gracefully. Empty strings, single characters, and numeric prefixes all require special consideration for valid identifier generation.

## Implementation Guidelines

Focus on:
- **Word Detection**: Smart splitting that recognizes multiple delimiter types simultaneously. Handle transitions between lowercase→uppercase, letter→number boundaries.
- **Case Transformation**: First word always lowercase, subsequent words capitalize first letter only. Preserve internal capitalizations intelligently (XMLParser → xmlParser, not xmlparser).
- **Special Characters**: Strip non-alphanumeric except during parsing phase. Numbers remain inline but can't start identifiers.
- **Acronym Handling**: Common acronyms (API, URL, XML, HTML, JSON) treated as single words. APIKey → apiKey, not aPIKey.

**Common Patterns**:
```javascript
// Function implementation
function toCamelCase(input) {
    if (!input || typeof input !== 'string') return '';
    
    // Normalize and split on word boundaries
    const words = input
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[^a-zA-Z]+/, '') // Remove leading non-letters
        .split(/(?=[A-Z])|[\s_-]+/);
    
    // Process words
    return words.map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
}
```

## Edge Cases & Examples

**Standard Conversions**:
- "hello world" → "helloWorld"
- "hello_world_example" → "helloWorldExample"  
- "hello-world-example" → "helloWorldExample"
- "HelloWorldExample" → "helloWorldExample"

**Complex Cases**:
- "XML HTTP request" → "xmlHttpRequest"
- "get API_KEY value" → "getApiKeyValue"
- "parse-JSON-data" → "parseJsonData"
- "user.profile.name" → "userProfileName"
- "2023_year_report" → "_2023YearReport" (numbers can't start identifiers)

**Special Handling**:
- Empty string → ""
- Single character → lowercase character
- Numbers only → prefix with underscore
- Mixed delimiters → unified processing

## Usage Context

Apply this skill when:
- Converting database column names to JavaScript variables
- Transforming API responses to frontend models
- Creating consistent naming from user input
- Refactoring code from other languages/conventions
- Building configuration objects from external sources

Remember: camelCase is THE standard for JavaScript/TypeScript. This skill ensures consistent, readable, and convention-compliant code across any codebase.