const { Lexer, Parser, Encoder } = require('../dist/slope-engine')

const lexer = new Lexer()
const parser = new Parser()
const encoder = new Encoder()

test('two-way data parsing and encoding', () => {
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
  console.log(route)
  console.log(encoder.encode(route))
})
