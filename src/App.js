import React, { Component } from "react"
import Field from "./components/Field"
import { encode, decode, isMorseCode } from "./morse-code"

export default class App extends Component {
  constructor (props) {
    super(props)

    const separators = {
      word: " ",
      letter: "/"
    }

    this.state = {
      translation: this.translate("hello, world", separators, false),
      sentence: "",
      wordSeparator: separators.word,
      letterSeparator: separators.letter,
      output: "",
      isMorseCode: false
    }
  }

  onSentenceChanged (e) {
    const { wordSeparator, letterSeparator } = this.state

    this.setState({
      sentence: e.target.value,
      isMorseCode: isMorseCode(e.target.value, {
        word: wordSeparator,
        letter: letterSeparator
      })
    })
  }

  onWordSeparatorChanged (e) {
    const { sentence, letterSeparator } = this.state

    this.setState({
      wordSeparator: e.target.value,
      isMorseCode: isMorseCode(sentence, {
        word: e.target.value,
        letter: letterSeparator
      })
    })
  }

  onLetterSeparatorChanged (e) {
    const { sentence, wordSeparator } = this.state

    this.setState({
      letterSeparator: sentence,
      isMorseCode: isMorseCode(sentence, {
        word: wordSeparator,
        letter: e.target.value
      })
    })
  }

  onFormSubmit (e) {
    e.preventDefault()

    const separators = {
      word: this.state.wordSeparator,
      letter: this.state.letterSeparator
    }

    this.setState({
      translation: this.translate(this.state.sentence, separators, this.state.isMorseCode)
    })
  }

  translate (text, separators, morseCode) {
    return [
      text,
      morseCode
        ? decode(text, separators)
        : encode(text, separators)
    ]
  }

  render () {
    return (
      <div className="layout">
        <div className="layout__content">
          {this.state.translation[0]}
          <span className="translation">{this.state.translation[1]}</span>
        </div>
        <form className="layout__input" onSubmit={this.onFormSubmit.bind(this)}>
          <Field
            inputProps={{
              type: "text",
              id: "sentence",
              value: this.state.sentence,
              onChange: this.onSentenceChanged.bind(this),
              autoComplete: "off"
            }}
          >Sentence (Either morse code or regular text)</Field>

          <Field
            width="120px"
            inputProps={{
              type: "text",
              id: "word-separator",
              value: this.state.wordSeparator,
              onChange: this.onWordSeparatorChanged.bind(this),
              minLength: 1,
              maxLength: 1,
              pattern: "[^\\.\\-]",
              required: true,
              autoComplete: "off",
              style: {
                textAlign: "center"
              }
            }}
          >Word Separator</Field>

          <Field
            width="120px"
            inputProps={{
              type: "text",
              id: "letter-separator",
              value: this.state.letterSeparator,
              onChange: this.onLetterSeparatorChanged.bind(this),
              minLength: 1,
              maxLength: 1,
              pattern: "[^\\.\\-]",
              required: true,
              autoComplete: "off",
              style: {
                textAlign: "center"
              }
            }}
          >Letter Separator</Field>

          <button className="layout__input-translate">{this.buttonText()}</button>
        </form>
      </div>
    )
  }

  buttonText () {
    if (this.state.isMorseCode) {
      return "Translate from morse code"
    }
    return "Translate to morse code"
  }
}
