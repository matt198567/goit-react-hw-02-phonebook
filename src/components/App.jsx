import { Component } from 'react';
import { ContactForm } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Box } from './Box';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmitForm = contact => {
    this.state.contacts.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    )
      ? alert(` ${contact.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onDeleteContact = contactID => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactID),
    }));
  };

  render() {
    const normalFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalFilter)
    );
    return (
      <Box p={10}>
        <h2>Phonebook</h2>

        <ContactForm onSubmit={this.handleSubmitForm} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />

        <ContactList
          contacts={visibleContacts}
          onDeleteBtn={this.onDeleteContact}
        />
      </Box>
    );
  }
}
