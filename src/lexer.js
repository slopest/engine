import INSTRUCTIONS from './data/instructions'
import { BLANK, BLOCK_START, BLOCK_END, COMMENT } from './data/chars'

class Lexer {
  readCode(code) {
    this.line = -1
    this.lines = code.split('\n')
    
    return this.readProgram()
  }

  readProgram(block = null) {
    let instructions = []
    let inBlock = block !== null
    while (true) {
      let line = this.nextLine()
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

  readInstruction(line, block) {
    let params = line.split(' ')
    if (params[0].charAt(0) === '#') return COMMENT

    let type = params[0]
    params.shift()
  
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

  readStringInstruction(type, args) {
    return {
      type,
      line: this.line + 1,
      value: args.join(' ')
    }
  }

  readParamsInstruction(type, args) {
    return {
      type,
      line: this.line + 1,
      params: args
    }
  }

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

  nextLine() {
    this.line++
    return this.lines[this.line]
  }

  croak(message) {
    throw new Error(`Error in parsing Slope code at line ${this.line + 1} : ${message}`)
  }
}

export default Lexer
