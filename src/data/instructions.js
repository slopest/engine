// This file defines all the instructions that are available in Slope.
// Objects with instructions contains the following properties:
// - name: the common name of the instruction, that is written as this into the code
// - type: the type of the instruction - string, params or block
// - required: set if the instruction is required in the code
// - arbitrary: set if the instruction is a block and the instructions inside aren't defined in Slope (e.g: Meta)
// - depends: set if the instruction has to be placed inside a specific block

export default [
  { name: 'Slope', type: 'params', required: true },

  { name: 'Name', type: 'string', required: true },
  { name: 'Desc', type: 'string', required: true },
  { name: 'Grade', type: 'string', required: true },
  { name: 'Grid', type: 'params' },
  { name: 'Meta', type: 'block', arbitrary: true },

  { name: 'Hold', type: 'block' },
  { name: 'Pos', type: 'params', depends: 'Hold' },
  { name: 'Scale', type: 'params', depends: 'Hold' },
  { name: 'Rotation', type: 'params', depends: 'Hold' }
]
