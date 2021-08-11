import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ContactService } from '../services/contact-service.js'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import {
  loadContacts,
  removeContact,
  setFilterBy,
} from '../store/actions/contactActions.js'

export const ContactApp = () => {
  const { contacts, filterBy } = useSelector(state => state.contactModule)
  const dispatch = useDispatch()

  useEffect(async () => {
    await dispatch(loadContacts())
  }, [])

  const onSetFilter = async filterBy => {
    await dispatch(setFilterBy(filterBy))
    dispatch(loadContacts())
  }

  const onRemoveContact = async id => {
    await ContactService.deleteContact(id)
    dispatch(loadContacts())
  }

  return (
    <main className='contact-app'>
      <nav>
        <ContactFilter onSetFilter={onSetFilter} />
        <Link to={'/contact/edit/'}>Add Contact</Link>
      </nav>
      <ContactList contacts={contacts} onRemoveContact={removeContact} />
    </main>
  )
}
