export const charToMorse = {
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}

export const invertObject = (object) => {
  const ret = {}

  for (const key in object) {
    const value = object[key]
    ret[value] = key
  }

  return ret
}

export const morseToChar = invertObject(charToMorse)

export const encode = (sentence, separators) => {
  return sentence
    .toLowerCase()
    .split(" ")
    .map((sentenceWord) => encodeWord(sentenceWord, separators))
    .join(separators.word)
}

export const encodeWord = (sentenceWord, separators) => {
  return sentenceWord
    .split("")
    .map((char) => charToMorse[char] || "")
    .join(separators.letter)
}

export const decode = (sentence, separators) => {
  const { letter, word } = separators

  return sentence
    .split(word)
    .map((morseWord) => morseWord.split(letter).filter((morse) => morse.length > 0).map((morse) => morseToChar[morse] || `?"${morse}"?`).join(""))
    .join(" ")
}

export const isMorseCode = (sentence, separators) => {
  const { letter, word } = separators
  const regx = new RegExp(`^((\\.|\\-)+${letter}?)+$`)
  return regx.test(sentence.replace(word, ""))
}
