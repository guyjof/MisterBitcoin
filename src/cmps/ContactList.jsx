import { ContactPreview } from './ContactPreview'

export function ContactList({ contacts }) {
  return (
    <ul className='contact-list simple-cards-grid'>
      {contacts.map(contact => (
        <ContactPreview contact={contact} key={contact._id} />
      ))}
    </ul>
  )
}
