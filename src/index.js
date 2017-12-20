import React from "react"
import { render } from "react-dom"
import App from "./App"

render(<App />, document.getElementById("app"))

// import { encode } from "./morse-code"
//
// const outputDiv = document.getElementById("morse-code")
// const sentenceInput = document.getElementById("sentences")
// const letterSepInput = document.getElementById("letter-sep")
// const wordSepInput = document.getElementById("word-sep")
// const translatorForm = document.getElementById("translator")
//
// translatorForm.addEventListener("submit", function (e) {
//   e.preventDefault()
//
//   const sentence = sentenceInput.value
//   const letterSep = letterSepInput.value
//   const wordSep = wordSepInput.value
//
//   const encoded = encode(sentence, { letter: letterSep, word: wordSep })
//   outputDiv.innerText = encoded
// }, false)
