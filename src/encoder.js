import FIELDS from './data/fields'

class Encoder {
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

  appendInstruction(instruction, value) {
    this.code += `${instruction} ${value}\n`
  }

  appendBlock(name, params, instructions) {
    this.appendInstruction(name, `${params} (`)
    instructions.forEach(instruction => {
      this.appendInstruction(`  ${instruction.name}`, instruction.value)
    })
    this.code += `)\n\n`
  }

  checkRequired(data) {
    for (const field of FIELDS) {
      if (!Object.keys(data).includes(field))
        this.croak(`At least one ${name} instruction is required. Please insert one to make your code correct.`)
    }
  }

  croak(message) {
    throw new Error(`Error in encoding Slope data: ${message}`)
  }
}

export default Encoder
