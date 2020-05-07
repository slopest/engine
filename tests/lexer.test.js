const Lexer = require('../dist/slope-engine')

test('parsing code to lexer returns good instructions', () => {
  let lexer = new Lexer()
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
})

