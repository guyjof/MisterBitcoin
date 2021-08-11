import React from 'react'

export function Input({ type, id, value, onSetFilter }) {
  return <input id={id} value={value} onChange={handleChange} />
}
