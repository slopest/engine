const { Lexer } = require('../dist/slope-engine')

const lexer = new Lexer()

test('parsing code to lexer returns good instructions', () => {
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

  console.log(instructions)
  expect(instructions[1].type).toBe('Name')
  expect(instructions[5].instructions[1].value).toBe('Paris, France')
  expect(instructions[7].instructions[2].params).toStrictEqual(['15', '0', '0'])
})

test("throw an error when a block isn't closed", () => {
  expect(() => {
    lexer.readCode(`
      Hold (
        Pos 8 7 9.4
    `)
  }).toThrow('Reached end of file without closing block. Review all the blocks you created and check if you closed them using the ")" statement.')
})

test("throw an error when a block isn't started", () => {
  expect(() => {
    lexer.readCode(`
      Hold
        Pos 8 7 9.4
      )
    `)
  }).toThrow('Excepted a block start with the "(" character')
})

test("throw an error when a dependent instruction is alone", () => {
  expect(() => {
    lexer.readCode(`
      Name this route
      Pos 7 9 6.4
    `)
  }).toThrow('Instruction Pos depends on a Hold block. Try wrap it inside this block.')
})
