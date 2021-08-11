import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { ContactService } from '../services/contact-service'
import { TransferFund } from '../cmps/TransferFund.jsx'
import { MovesList } from '../cmps/MovesList'

export const ContactDetails = () => {
  const [contact, setContact] = useState({})
  const dispatch = useDispatch()
  const history = useHistory()
  const { loggedInUser } = useSelector(state => state.userModule)
  const { Id } = useParams()

  useEffect(async () => {
    try {
      console.log(Id)
      const contact = await ContactService.getContactById(Id)
      setContact(contact)
    } catch (err) {
      console.log(err)
    }
  }, [])

  if (!loggedInUser)
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  const { name, email, phone } = contact
  const { moves } = loggedInUser
  return (
    <main className='contact-page'>
      <img className='profile-pic' src={'https://robohash.org/' + Id} alt='' />
      <p>{name}</p>
      <p>{email}</p>
      <p>{phone}</p>
      <Link to={'/contact/edit/' + Id}>Edit</Link>
      <Link to='/contact'>Back</Link>
      <TransferFund contact={contact} />
      <MovesList title={'Your Moves:'} moves={moves} />
    </main>
  )
}
