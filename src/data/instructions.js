export default [
  { name: 'Slope', type: 'params' },

  { name: 'Name', type: 'string' },
  { name: 'Desc', type: 'string' },
  { name: 'Grade', type: 'string' },
  { name: 'Color', type: 'string' },
  { name: 'Grid', type: 'params' },
  { name: 'Meta', type: 'block', arbitrary: true },

  { name: 'Hold', type: 'block' },
  { name: 'Pos', type: 'params', depends: 'Hold' },
  { name: 'Scale', type: 'params', depends: 'Hold' },
  { name: 'Rotation', type: 'params', depends: 'Hold' }
]
