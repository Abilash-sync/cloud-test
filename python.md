# Python Variables

## What is a Variable?

A variable is a named reference to a value stored in memory. In Python, variables are created the moment you assign a value to them — no explicit declaration is needed.

## Creating Variables

```python
name = "Alice"
age = 30
price = 19.99
is_active = True
```

Python infers the type automatically based on the assigned value.

## Variable Naming Rules

- Must start with a letter or underscore (`_`)
- Can contain letters, digits, and underscores
- Case-sensitive (`name` and `Name` are different variables)
- Cannot use Python reserved keywords (`if`, `for`, `class`, etc.)

```python
my_var = 10       # valid
_private = 20     # valid
var2 = 30         # valid
# 2var = 40       # invalid — starts with a digit
```

## Data Types

Variables can hold values of different types:

| Type      | Example              |
|-----------|----------------------|
| `int`     | `x = 5`              |
| `float`   | `x = 3.14`           |
| `str`     | `x = "hello"`        |
| `bool`    | `x = True`           |
| `list`    | `x = [1, 2, 3]`      |
| `tuple`   | `x = (1, 2, 3)`      |
| `dict`    | `x = {"a": 1}`       |
| `None`    | `x = None`           |

Use `type()` to check a variable's type:

```python
x = 42
print(type(x))  # <class 'int'>
```

## Multiple Assignment

```python
a, b, c = 1, 2, 3
x = y = z = 0
```

## Reassignment and Dynamic Typing

Python variables can be reassigned to a value of a different type at any time:

```python
x = 10        # int
x = "hello"   # now a str
```

## Variable Scope

- **Local** — defined inside a function, accessible only within that function.
- **Global** — defined at the module level, accessible throughout the module.
- **`global` keyword** — used inside a function to modify a global variable.

```python
count = 0  # global

def increment():
    global count
    count += 1
```

## Constants

Python has no built-in constant type. By convention, use uppercase names to indicate a value should not change:

```python
MAX_RETRIES = 5
PI = 3.14159
```
