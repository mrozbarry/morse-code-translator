import { encode, isMorseCode } from "../morse-code"
import { expect } from "chai"

const separators = { letter: "/", word: " " }

describe("encode", () => {
  it("translates 'a' to '.-'", () => {
    expect(encode("a", separators))
      .to.equal(".-/")
  })

  it("translate an invalid character to an empty string", () => {
    expect(encode("|", separators))
      .to.equal("")
  })

  it("translates an entire sentence", () => {
    expect(encode("hello you", separators))
      .to.equal("...././.-../.-../---/ -.--/---/..-/")
  })
})

describe("isMorseCode", () => {
  it("will return false when we have a letter separator and use that letter in a sentence", () => {
    expect(isMorseCode("Hello", { letter: "H", word: " " }))
      .to.equal(false)
  })

  it("will return true when all characters are morse-y", () => {
    expect(isMorseCode(".----x..---x...--", { letter: "x", word: " " }))
      .to.equal(true)
  })
})
