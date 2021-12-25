import React, { Component } from "react";
import NotesList from "./NotesList.js";
import Header from "./Header.js";
//replace your static JSX by importing and rendering
//the Header and NotesList components
//Add a state section to the App component
//nside of App‘s state, you’ll add the data in the notes property
// as an array of objects by copying the following code
class App extends Component {
  state = {
    notes: [],
    searchText: ""
  };
  //Define an addNote method in App that
  //will add a new object to the notes array in the App state
  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };
  //define an onType event handler method that copies the array of notes currently in state, keeping all note objects the same except for the object matching the id of the note that the user typed in. The object with the matching id should be copied,
  //updating the string value of the edited property.
  onType = (editMeId, updatedKey, updatedValue) => {
    /* this event handler updates sticky note text fields
      - editMeId: the id of the note that the user typed in
      - updatedKey: which field was edited? 'title' or 'description'
      - updatedValue: new value of edited field */
    const updateIdMatch = (note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    };
    const updatedNotes = this.state.notes.map(updateIdMatch);
    this.setState({ notes: updatedNotes });
  };
  //Search Notes in Your UI
  //define an onSearch method that maps over the notes array and for each note object
  //Set the note object’s doesMatchSearch property to true if there is matching text and false if not. Hint: the following two string methods can be very
  //helpful in writing this event handler:
  onSearch = (text) => {
    /* toggle the doesMatchSearch boolean value of each sticky
    note when the user types in the search field.
    set the doesMatchSearch value to true for a sticky note if
    it's title or description matches the search string. */
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        /* If the search field is empty, then
      we set the doesMatchSearch value for every note to true. */
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({ searchText: newSearchText, notes: updatedNotes });
  };
  //Add delete functionality to the app.
  //define a remove method that removes a note object from the App component’s notes array,
  //using the id of the note that the user clicked on.
  onDelete = (deleteId) => {
    const notIdMatch = (note) => note.id !== deleteId;
    const updatedNotes = this.state.notes.filter(notIdMatch);
    this.setState({ notes: updatedNotes });
  };
  //Saving a Note
  //Define the componentDidMount method to read out whatever value is
  //saved in local storage under the key of >savedNotes
  componentDidMount() {
    // TODO: read from local storage, and if we find a message there, log it to the console
    const stateString = localStorage.getItem("savedNotes");
    if (stateString) {
      const savedNotes = JSON.parse(stateString);
      this.setState({ notes: savedNotes });
    }
  }
  //Define the componentDidUpdate method to write to local storage under the key of
  //savedNotes each time the user updates the state of the app.
  componentDidUpdate() { 
    const stateString = JSON.stringify(this.state.notes);

    // TODO: save the message from our component's state to the browser's local storage
    localStorage.setItem("savedNotes", stateString);
  }

  //Passing Props
  //In the App component’s render method:
  //Pass searchText to the Header component
  //Pass notes to the NotesList component
  //Use props to pass a reference to the onType method from App
  render() {
    return (
      <div>
        <Header
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
          //Use props to pass a reference to the onSearch method from App down to
          // the text input element’s onChange event listener
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          onDelete={this.onDelete}
        />
      </div>
    );
  }
}

export default App;
