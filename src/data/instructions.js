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
