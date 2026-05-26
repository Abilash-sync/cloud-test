# JavaScript Variables

Variables are containers for storing data values. JavaScript provides three keywords to declare variables: `var`, `let`, and `const`.

## 1. let
The `let` keyword declares a block-scoped local variable, optionally initializing it to a value.
- **Scope:** Block-scoped `{}`.
- **Re-declaration:** Cannot be re-declared in the same scope.
- **Assignment:** Can be reassigned.

```javascript
let name = "Code Studio";
name = "AI Assistant"; // Valid
```

## 2. const
The `const` keyword declares a block-scoped local variable that cannot be reassigned.
- **Scope:** Block-scoped `{}`.
- **Re-declaration:** Cannot be re-declared in the same scope.
- **Assignment:** Cannot be reassigned after initial declaration.

```javascript
const pi = 3.14;
// pi = 3.15; // Error: Assignment to constant variable.
```

## 3. var
The `var` keyword declares a function-scoped or globally-scoped variable.
- **Scope:** Function-scoped.
- **Hoisting:** Variables declared with `var` are hoisted to the top of their scope.
- **Assignment:** Can be reassigned and re-declared.

```javascript
var x = 10;
var x = 20; // Valid
```

## Naming Conventions
- Names can contain letters, digits, underscores, and dollar signs.
- Names must begin with a letter, `$`, or `_`.
- Names are case-sensitive (`y` and `Y` are different variables).
- Reserved words (like JavaScript keywords) cannot be used as names.
