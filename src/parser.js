import INSTRUCTIONS from './data/instructions'

class Parser {
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

  checkRequired(instructions) {
    const required = INSTRUCTIONS.filter(instruction => instruction.required && instruction.depends === undefined)
    for (const instruction of required) {
      const trial = instructions.find(i => i.type === instruction.name)
      if (trial === undefined)
        this.croak(`At least one ${instruction.name} instruction is required. Please insert one to make your code correct.`)
    }
  }

  parseSoloInstruction(name, value) {
    if (this.route[name] === undefined) this.route[name] = value
    else
      this.croak(`A route can only have one ${name}. Remove other instructions of this type in order to leave just one.`)
  }

  parseMeta(instructions) {
    this.route.meta = {}
    for (const instruction of instructions) {
      this.route.meta[instruction.type] = instruction.value
    }
  }

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
          this.croak(`Unknown hold property ${prop.type}. Check the documentation for a complete list of instructions.`)
      }
    }

    this.route.holds.push(hold)
  }

  parseCoordinates(params) {
    return {
      x: Number(params[0]),
      y: Number(params[1]),
      z: Number(params[2]),
    }
  }

  croak(message) {
    throw new Error(`Error in parsing Slope code at line ${this.line}: ${message}`)
  }
}

export default Parser
