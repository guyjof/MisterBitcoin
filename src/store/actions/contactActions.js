import { ContactService } from "../../services/contact-service";

export function loadContacts() {
    return async (dispatch, getState) => {
        const { filterBy } = getState().contactModule
        try {
            const contacts = await ContactService.getContacts(filterBy)
            dispatch({ type: 'SET_CONTACTS', contacts })
        } catch (err) {
            console.log(err);
        }
    }
}
export function getContactById(contactId) {
    return async dispatch => {
        const contact = await ContactService.getById(contactId)
        try {
            dispatch({ type: 'SET_CONTACT', contact })
        } catch (err) {
            console.log(err);
        }
    }
}

export function saveContact(contact) {
    const type = contact._id ? 'UPDATE_CONTACT' : 'ADD_CONTACT'
    return async dispatch => {
        await ContactService.saveContact(contact)
        dispatch({ type, contact })
    }
}

export function removeContact(contactId) {
    return async dispatch => {
        await ContactService.remove(contactId)
        dispatch({ type: 'REMOVE_CONTACT', contactId })
    }
}

export function setFilterBy(filterBy) {
    return dispatch => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}