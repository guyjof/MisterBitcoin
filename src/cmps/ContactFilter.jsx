import { Component } from 'react'
import { connect } from 'react-redux'
import { setFilterBy, loadContacts } from '../store/actions/contactActions.js'
export class _ContactFilter extends Component {
  state = {
    term: '',
  }

  handleChange = ({ target }) => {
    var field = target.id
    var value = target.value
    this.setState({ [field]: value }, () => {
      this.props.onSetFilter(this.state)
      this.props.loadContacts()
    })
  }

  render() {
    const { term } = this.state
    return (
      <div className='contact-filter'>
        <form>
          <label htmlFor='term'>Filter: </label>
          <input
            type='text'
            id='term'
            value={term}
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setFilterBy,
  loadContacts,
}

export const ContactFilter = connect(
  undefined,
  mapDispatchToProps
)(_ContactFilter)
