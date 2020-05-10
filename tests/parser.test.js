const { Lexer, Parser } = require('../dist/slope-engine')

const lexer = new Lexer()
const parser = new Parser()

test('parse the code to a readable object', () => {
  let instructions = lexer.readCode(
    `Slope 1
  
    Name Slab #3
    Desc A cool route to practice agility... and fingers!
    Grid 5 14
    Grade 6B+
    Meta (
      Color b71c1c
      Location Paris, France
      Notes Corner isn't authorized.
    )
    
    Hold sloper (
      Pos 1 2 0
      Scale 1 1 1
      Rotation 0 45 0
    )
    Hold undercut (
      Pos 2 3 0
      Scale 1 1 1
      Rotation 15 0 0
    )
    Hold module_rock_2 (
      Pos 1 4 0.5
      Scale 0.5 1 0.5
      Rotation 0 0 0
    )`)

  let route = parser.parse(instructions)

  expect(route.name).toBe('Slab #3')
  expect(route.holds[0].type).toBe('sloper')
  expect(route.holds[1].scale).toStrictEqual({
    x: 1,
    y: 1,
    z: 1
  })
})

test('throw an error if an instruction is unknown', () => {
  // Assuming we didn't pass through the built-in lexer
  let instructions = [
    { type: 'Name', value: 'route' },
    { type: 'Desc', value: 'route' },
    { type: 'Slope', params: ['1'] },
    { type: 'Grade', value: '5B' },
    { type: 'Color', value: 'red' }
  ]

  expect(() => {
    parser.parse(instructions)
  }).toThrow('Unknown instruction Color. Check the documentation for a complete list of instructions.')
})

test('throw an error if a required instruction is missing', () => {
  let instructions = lexer.readCode(`
    Slope 1
    
    Name route`)

  expect(() => {
    parser.parse(instructions)
  }).toThrow('At least one Desc instruction is required. Please insert one to make your code correct.')
})

test('throw an error if a solo instruction is doubled', () => {
  let instructions = lexer.readCode(`
    Slope 1
    Name route
    Desc route
    Grade route
    
    Name otherRoute`)

  expect(() => {
    parser.parse(instructions)
  }).toThrow('A route can only have one name. Remove other instructions of this type in order to leave just one.')
})

test('throw an error if a hold property is unknown', () => {
  let instructions = lexer.readCode(`
    Slope 1
    Name route
    Desc route
    Grade route
    
    Hold sloper (
      Pos 8 7 4
      Name thisone
    )`)

  expect(() => {
    parser.parse(instructions)
  }).toThrow('Unknown hold property Name. Check the documentation for a complete list of instructions.')
})
