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

### Code structure

#### `Slope <version:integer>`

Specify the version of Slope that the parser will use. For the moment, only the version 1 exists.

#### `Unit <unit:string>`

Speficy a unit for lengths. Supported values are: `m`, `cm`.

### Route definition

#### `Name <name:string>`

Specify a name for the route.

#### `Desc <description:string>`

Specify a description for the route.

#### `Grade <grade:string>`

Specify the grade of the route

#### `Color <color:string>`

Specify a global color for the route

#### `Meta (block)`

Add as many fields as you want to the route. These fields can serve to specify additional details such as notes, photos, location...

#### `Grid <width:integer> <height:integer>`

Specify the grid size for the route

### Holds definition

#### `Hold <type:string> (block)`

Add a new hold to the route. The block contains the following instructions :

#### `Pos <x:float> <y:float> <z:float>`

The three-dimensional position of the hold.

#### `Rotation <x:float> <y:float> <z:float>`

The three-dimensional rotation of the hold.

#### `Scale <x:float> <y:float> <z:float>`

The three-dimensional scale of the hold.
