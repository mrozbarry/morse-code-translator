import React, { Component } from "react"
import Field from "./components/Field"
import { encode, decode, isMorseCode } from "./morse-code"

export default class App extends Component {
  constructor (props) {
    super(props)

    const separators = {
      word: ";",
      letter: "/"
    }

    const sentence = "...././.-../.-../---/--..--;.--/---/.-./.-../-.."

    this.state = {
      translation: this.translate(sentence, separators, true),
      sentence,
      wordSeparator: separators.word,
      letterSeparator: separators.letter,
      output: "",
      isMorseCode: false
    }
  }

  onSentenceChanged (e) {
    const { wordSeparator, letterSeparator } = this.state
    const separators = {
      word: wordSeparator,
      letter: letterSeparator
    }

    const _isMorseCode = isMorseCode(e.target.value, separators)
    const sentence = e.target.value

    this.setState({
      sentence,
      isMorseCode: _isMorseCode,
      translation: this.translate(sentence, separators, _isMorseCode)
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
      letterSeparator: e.target.value,
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
    if (!separators.word || !separators.letter) return this.state.translation

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
            style={{ flexGrow: 1 }}
            inputProps={{
              type: "text",
              id: "sentence",
              value: this.state.sentence,
              onChange: this.onSentenceChanged.bind(this),
              autoComplete: "off"
            }}
          >Sentence (Either morse code or regular text)</Field>

          <Field
            style={{ width: "120px" }}
            inputProps={{
              type: "text",
              id: "word-separator",
              value: this.state.wordSeparator,
              onChange: this.onWordSeparatorChanged.bind(this),
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
            style={{ width: "120px" }}
            inputProps={{
              type: "text",
              id: "letter-separator",
              value: this.state.letterSeparator,
              onChange: this.onLetterSeparatorChanged.bind(this),
              onBlur: (e) => e.target.form.checkValidity(),
              maxLength: 1,
              pattern: "[^\\.\\-]",
              required: true,
              autoComplete: "off",
              style: {
                textAlign: "center"
              }
            }}
          >Letter Separator</Field>
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
