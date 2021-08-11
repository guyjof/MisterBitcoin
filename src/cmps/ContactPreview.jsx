import { Link } from 'react-router-dom'
export function ContactPreview({ contact }) {
  return (
    <li className='contact-preview'>
      <img src={'https://robohash.org/' + contact._id} alt='' />
      <p>{contact.name}</p>
      <Link to={`/contact/${contact._id}`}>Details</Link>
    </li>
  )
}
