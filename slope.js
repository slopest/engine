const SLOPE_INSTRUCTIONS = [
  'Slope',

  'Name',
  'Desc',
  'Grade',
  'Color',
  'Grid',
  'Meta',

  'Hold',
  'Pos',
  'Scale',
  'Rotation'
]

const BLANK = ''
const COMMENT = 'comment'
const BLOCK_START = '('
const BLOCK_END = ')'

const INSTRUCTIONS = [
  {
    name: 'Name',
    type: 'string'
  },
  {
    name: 'Grid',
    type: 'params'
  },
  {
    name: 'Hold',
    type: 'block'
  },
  {
    name: 'Pos',
    type: 'params'
  }
]

class Lexer {
  readCode(code) {
    this.line = -1
    this.instructions = []
    this.lines = code.split('\n')
    
    return this.readProgram()
  }

  readProgram(inBlock = false) {
    let instructions = []
    while (true) {
      let line = this.nextLine()
      if (this.line === this.lines.length) {
        if (inBlock) this.croak('Reached end of file without closing block. Review all the blocks you created and check if you closed them using the ")" statement.')
        else break
      }

      line = line.trim()
      if (inBlock && line === BLOCK_END) break
      if (line === BLANK) continue

      let instruction = this.readInstruction(line)
      if (instruction !== COMMENT) instructions.push(instruction)
    }
    return instructions
  }

  readInstruction(line) {
    let params = line.split(' ')
    if (params[0].charAt(0) === '#') return COMMENT

    let instruction = INSTRUCTIONS.find(i => i.name === params[0])
    if (instruction === undefined) this.croak(`Unknown instruction ${params[0]}. Check the documentation for a complete list of instructions.`)
    else {
      let type = params[0].toLowerCase()
      params.shift()

      switch (instruction.type) {
        case 'string': return this.readStringInstruction(type, params)
        case 'params': return this.readParamsInstruction(type, params)
        case 'block': return this.readBlockInstruction(type, params)
      }
    }
  }

  readStringInstruction(type, args) {
    return {
      type,
      value: args.join(' ')
    }
  }

  readParamsInstruction(type, args) {
    return {
      type,
      params: args
    }
  }

  readBlockInstruction(type, args) {
    let start = args.pop()
    if (start !== BLOCK_START) this.croak('Excepted a block start with the "(" character')
    return {
      type,
      params: args,
      instructions: this.readProgram(true)
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
