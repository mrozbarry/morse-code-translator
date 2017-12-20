import React from "react"

export default function Field ({ width, inputProps, children }) {
  return (
    <div style={{ width: width || "auto" }} className="field">
      <input {...inputProps} className="field__input" />
      <label htmlFor={inputProps.id} className="field__label">{children}</label>
    </div>
  )
}
