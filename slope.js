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
  instructions
  line
  lines

  croak(message) {
    throw new Error(`Error in parsing Slope code at line ${this.line + 1} : ${message}`)
  }

  parseCode(code) {
    this.line = 0
    this.instructions = []
    this.lines = code.split('\n')
    
    while (this.line < this.lines.length) {
      console.log(this.instructions)
      let line = this.lines[this.line].trim()
      let instruction = this.parseInstruction(line)
      if (instruction !== null) this.instructions.push(instruction)
      this.line++
    }

    return this.instructions
  }

  parseInstruction(line) {
    let params = line.split(' ')
    if (params[0].charAt(0) === '#') {
      return null
    }

    let instruction = INSTRUCTIONS.find(i => i.name === params[0])
    if (instruction === undefined) this.croak(`Unknown instruction ${params[0]}`)
    else {
      switch (instruction.type) {
        case 'string':
          return this.parseStringInstruction(params)
        case 'params':
          return this.parseParamsInstruction(params)
        case 'block':
          return this.parseBlockInstruction(params)
      }
    }
  }

  parseStringInstruction(params) {
    return {
      type: params[0],
      value: params.slice(1).join(' ')
    }
  }

  parseParamsInstruction(params) {
    return {
      type: params[0],
      params: params.slice(1)
    }
  }

  parseBlockInstruction(params) {
    let head = {
      type: params[0],
      params: params.slice(1, -1)
    }
    let instructions = []
    while (true) {
      this.line++
      let line = this.lines[this.line]
      if (line === undefined)
        this.croak('Reached end of file without closing block')

      line = line.trim()
      if (line === ')')
        break
      
      let toAdd = this.parseInstruction(line)
      if (toAdd !== null) instructions.push(toAdd)
    }
    head.instructions = instructions
    return head
  }
}
