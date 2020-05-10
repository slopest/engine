import INSTRUCTIONS from './data/instructions'
import { BLANK, BLOCK_START, BLOCK_END, COMMENT } from './data/chars'

// Class Lexer is the part that transforms a string containing code into a list of instructions.
// This list is an array that stores objects, with different values :
// - type: the type of the instruction (Name, Meta, Hold...)
// - value: if the instruction requires a string as a parameter, it'll be stored inside this prop
// - params: if the instruction requires different parameters, they'll be stored inside this prop as an array
// - instructions: if the instruction is a block, contains the list of sub-instructions with the same format as described
class Lexer {
  // readCode reads a raw string containing the code and returns the list of instructions
  readCode(code) {
    this.line = -1
    this.lines = code.split('\n')
    
    return this.readProgram()
  }

  // readProgram reads a list of instructions, in a block or in the main stream
  readProgram(block = null) {
    let instructions = []
    let inBlock = block !== null
    while (true) {
      let line = this.nextLine()

      // Test if we reached the end of the file
      if (this.line === this.lines.length) {
        if (inBlock) this.croak('Reached end of file without closing block. Review all the blocks you created and check if you closed them using the ")" statement.')
        else break
      }

      line = line.trim()
      if (inBlock && line === BLOCK_END) break
      if (line === BLANK) continue

      let instruction = this.readInstruction(line, block)
      if (instruction !== COMMENT) instructions.push(instruction)
    }
    return instructions
  }

  // readInstruction reads and returns an instruction
  readInstruction(line, block) {
    let params = line.split(' ')

    // Omitting comments
    if (params[0].charAt(0) === '#') return COMMENT

    let type = params[0]
    params.shift()

    // If we're inside a Meta block, return all the instructions as strings without checking in the language definition
    let try_meta = INSTRUCTIONS.find(i => i.name === block)
    if (try_meta !== undefined && try_meta.name === 'Meta')
      return this.readStringInstruction(type, params)

    let instruction = INSTRUCTIONS.find(i => i.name === type)
    if (instruction === undefined)
    this.croak(`Unknown instruction ${type}. Check the documentation for a complete list of instructions.`)

    if (instruction.depends !== undefined && instruction.depends !== block)
    this.croak(`Instruction ${instruction.name} depends on a ${instruction.depends} block. Try wrap it inside this block.`)

    switch (instruction.type) {
      case 'string': return this.readStringInstruction(type, params)
      case 'params': return this.readParamsInstruction(type, params)
      case 'block': return this.readBlockInstruction(type, params)
    }
  }

  // readStringInstruction returns the object corresponding to a string instruction
  readStringInstruction(type, args) {
    return {
      type,
      line: this.line + 1,
      value: args.join(' ')
    }
  }

  // readStringInstruction returns the object corresponding to a params instruction
  readParamsInstruction(type, args) {
    return {
      type,
      line: this.line + 1,
      params: args
    }
  }

  // readStringInstruction returns the object corresponding to a block instruction
  // All the instructions inside this block pass through the regular process of readProgram. This allow for multiple block nesting
  readBlockInstruction(type, args) {
    let start = args.pop()
    if (start !== BLOCK_START) this.croak('Excepted a block start with the "(" character')
    return {
      type,
      line: this.line + 1,
      params: args,
      instructions: this.readProgram(type)
    }
  }

  // nextLine passes to the next code line and returns the current line value
  nextLine() {
    this.line++
    return this.lines[this.line]
  }

  // croak throws an error
  croak(message) {
    throw new Error(`Error in parsing Slope code at line ${this.line + 1} : ${message}`)
  }
}

export default Lexer
