import { Component } from 'react'
import { ContactService } from '../services/contact-service'

export class ContactEdit extends Component {
  state = {
    contact: null,
    errMsg: '',
    contactId: '',
  }

  async componentDidMount() {
    try {
      const id = this.props.match.params.Id
      this.setState({ contactId: id })
      const contact = id
        ? await ContactService.getContactById(id)
        : ContactService.getEmptyContact()
      this.setState({ contact })
    } catch (err) {
      this.setState({ errMsg: 'Cannot Find Contact' })
    }
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    this.setState(prevState => ({
      contact: { ...prevState.contact, [field]: value },
    }))
  }

  onSaveContact = async ev => {
    ev.preventDefault()
    const { contact } = this.state
    await ContactService.saveContact(contact)
    this.props.history.push('/contact')
  }

  onDeleteContact = async ev => {
    try {
      ev.preventDefault()
      const id = this.props.match.params.Id
      await ContactService.deleteContact(id)
      this.props.history.push('/contact')
    } catch (err) {
      this.setState({ errMsg: 'Cannot Delete Contact' })
    }
  }

  render() {
    if (!this.state.contact)
      return <div>{this.state.errMsg || 'Lodaing...'}</div>
    const { name, email, phone } = this.state.contact
    const { contactId } = this.state
    return (
      <div className='contact-edit'>
        <form>
          <div>
            <label htmlFor='name'>Name:</label>
            <input
              ref={this.inputRef}
              value={name}
              type='text'
              name='name'
              id='name'
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input
              value={email}
              type='email'
              name='email'
              id='email'
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='phone'>Phone:</label>
            <input
              value={phone}
              type='tel'
              name='phone'
              id='phone'
              onChange={this.handleChange}
            />
          </div>

          <button onClick={this.onSaveContact}>Save</button>
        </form>
        {contactId && (
          <button className='deleteBtn' onClick={this.onDeleteContact}>
            Delete
          </button>
        )}
      </div>
    )
  }
}
