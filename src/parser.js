import INSTRUCTIONS from './data/instructions'

// Class Parser is the part that transforms a list of instructions returned by the Lexer, into a JavaScript object that
// we can work with.
class Parser {
  // parse parses a list of instructions into a JavaScript object
  parse(instructions) {
    this.route = {
      holds: []
    }

    this.checkRequired(instructions)

    for (const instruction of instructions) {
      this.line = instruction.line
      switch (instruction.type) {
        case 'Slope':
          // For the moment, the "Slope" instruction isn't used, because there's only one version of the language.
          this.parseSoloInstruction('slope', Number(instruction.params[0]))
          break
        case 'Name':
          this.parseSoloInstruction('name', instruction.value)
          break
        case 'Desc':
          this.parseSoloInstruction('description', instruction.value)
          break
        case 'Grade':
          this.parseSoloInstruction('grade', instruction.value)
          break

        case 'Grid':
          this.parseSoloInstruction('grid', {
            width: Number(instruction.params[0]),
            height: Number(instruction.params[1])
          })
          break

        case 'Meta':
          this.parseMeta(instruction.instructions)
          break
        case 'Hold':
          this.parseHold(instruction)
          break

        default:
          this.croak(`Unknown instruction ${instruction.type}. Check the documentation for a complete list of instructions.`)
      }
    }

    return this.route
  }

  // checkRequired checks into the instructions list if every required instruction is inside
  checkRequired(instructions) {
    const required = INSTRUCTIONS.filter(instruction => instruction.required && instruction.depends === undefined)
    for (const instruction of required) {
      const trial = instructions.find(i => i.type === instruction.name)
      if (trial === undefined)
        this.croak(`At least one ${instruction.name} instruction is required. Please insert one to make your code correct.`)
    }
  }

  // parseSoloInstruction parses an instruction that must be once in all the code
  parseSoloInstruction(name, value) {
    if (this.route[name] === undefined) this.route[name] = value
    else
      this.croak(`A route can only have one ${name}. Remove other instructions of this type in order to leave just one.`)
  }

  // parseMeta parses the Meta block.
  parseMeta(instructions) {
    this.route.meta = {}
    for (const instruction of instructions) {
      this.route.meta[instruction.type] = instruction.value
    }
  }

  // parseHold parses a Hold block, so a block that defines a hold
  parseHold(block) {
    let hold = {
      type: block.params[0]
    }

    for (let prop of block.instructions) {
      switch (prop.type) {
        case 'Pos':
          hold.position = this.parseCoordinates(prop.params)
          break
        case 'Rotation':
          hold.rotation = this.parseCoordinates(prop.params)
          break
        case 'Scale':
          hold.scale = this.parseCoordinates(prop.params)
          break
        default:
          // Only some instructions are accepted inside a Hold block.
          // If another one is inside, throw an error
          this.croak(`Unknown hold property ${prop.type}. Check the documentation for a complete list of instructions.`)
      }
    }

    this.route.holds.push(hold)
  }

  // parseCoordinates parses an instruction that defines coordinates
  // Mainly used for position, rotation and scale instructions to define the complete geometry of the hold
  parseCoordinates(params) {
    return {
      x: Number(params[0]),
      y: Number(params[1]),
      z: Number(params[2]),
    }
  }

  // croak throws an error
  croak(message) {
    throw new Error(`Error in parsing Slope code at line ${this.line}: ${message}`)
  }
}

export default Parser
