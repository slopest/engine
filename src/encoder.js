import FIELDS from './data/fields'

// Class Encoder is the part that transforms an object into actual Slope code
class Encoder {
  // encode transforms an object into Slope code
  // The entry object must be close to what the parser returns
  encode(data) {
    this.checkRequired(data)

    this.code = ''
    this.appendInstruction('Slope', 1)

    this.appendInstruction('Name', data.name)
    this.appendInstruction('Desc', data.description)
    this.appendInstruction('Grade', data.grade)

    if (data.grid !== undefined)
      this.appendInstruction('Grid', `${data.grid.width} ${data.grid.height}`)

    let meta = []
    Object.keys(data.meta).forEach(instruction => {
      meta.push({
        name: instruction,
        value: data.meta[instruction]
      })
    })
    this.appendBlock('Meta', '', meta)

    data.holds.forEach(hold => {
      this.appendBlock('Hold', hold.type, [
        { name: 'Pos', value: `${hold.position.x} ${hold.position.y} ${hold.position.z}` },
        { name: 'Rotation', value: `${hold.rotation.x} ${hold.rotation.y} ${hold.rotation.z}` },
        { name: 'Scale', value: `${hold.scale.x} ${hold.scale.y} ${hold.scale.z}` }
      ])
    })

    return this.code
  }

  // appendInstruction adds an instruction to the code
  appendInstruction(instruction, value) {
    this.code += `${instruction} ${value}\n`
  }

  // appendBlock adds a block with its instructions to the code
  appendBlock(name, params, instructions) {
    this.appendInstruction(name, `${params} (`)
    instructions.forEach(instruction => {
      this.appendInstruction(`  ${instruction.name}`, instruction.value)
    })
    this.code += `)\n\n`
  }

  // checkRequired checks in the object if all the required fields are here
  checkRequired(data) {
    for (const field of FIELDS) {
      if (!Object.keys(data).includes(field))
        this.croak(`At least one ${name} instruction is required. Please insert one to make your code correct.`)
    }
  }

  // croak throws an error
  croak(message) {
    throw new Error(`Error in encoding Slope data: ${message}`)
  }
}

export default Encoder
