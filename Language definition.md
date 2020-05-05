# Slope v1 definition

## Introduction

Slope is a simple modeling language that aims to represent climbing routes.

## Syntax

### Comments

A comment is any string that user doesn't want to be parsed as Slope code. It starts with the `#` character and lasts until the end of the line.

```slope
# This is a comment
```

### Instructions

An instruction is a capitalized keyword only composed of uppercase and lowercase letters (e.g: `Hold`). It takes different parameters that have types.

```slope
Instruction param1 param2...
```

### Types

A parameter has a type, defining what it holds :

- `string` : plain text surrounded by double quotes (`"`)
- `integer` : a positive or negative number
- `float` : integer with a floating point
- `block` : a set of instructions to be categorized

```slope
Instruction "string"
Instruction 15
Instruction 5.9

Instruction (
  Instruction param
  Instruction param
  ...
)
```

## Instructions list

- Slope
- Name
- Desc
- Grade
- Color

- Grid `width` `height`
- Pos `x` `y` `z`
- Rotation `x` `y` `z`
- Scale `x` `y` `z`

- Meta
  - Any string instruction
- Hold
  - Pos
  - Rotation
  - Scale
