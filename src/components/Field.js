import React from "react"

export default function Field ({ style, inputProps, children }) {
  const wrapperStyle = style || {}
  return (
    <div style={wrapperStyle} className="field">
      <input {...inputProps} className="field__input" />
      <label htmlFor={inputProps.id} className="field__label">{children}</label>
    </div>
  )
}
