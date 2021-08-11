import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { signup } from '../store/actions/userActions'
import { useDispatch } from 'react-redux'

export const Signup = () => {
  const [fields, setFields] = useState({ name: '' })
  // const inputRef = useRef(null)
  const dispatch = useDispatch()
  const history = useHistory()

  // useEffect(() => {
  //   inputRef.current.foucs()
  // }, [inputRef])

  const handleChange = ({ target }) => {
    var field = target.id
    var value = target.type === 'number' ? +target.value : target.value
    setFields({ [field]: value })
  }

  const onSignup = async () => {
    const { name } = fields
    if (!name) return
    await dispatch(signup(name))
    history.push('/')
  }

  return (
    <section className='signup'>
      <label htmlFor='name'>Please enter your name:</label>
      <input
        type='text'
        value={fields.name}
        id='name'
        onChange={handleChange}
        autoComplete='off'
        // ref={inputRef}
      />
      <button onClick={onSignup}>Sign Up</button>
    </section>
  )
}
