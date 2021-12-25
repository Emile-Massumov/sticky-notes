import React from "react";
import Note from "./Note.js";
const keepSearchMatches = (note) => note.doesMatchSearch;

//In the NotesList component import and render the Note component three times,
//which will replace your static JSX sticky notes
//Passing Props
//pass a note object in the notes array
//to each Note component by mapping over props.notes
//render a Note component for each object in the notes
//array that is passed to the NotesList component
const NotesList = (props) => {
  const renderNote = (note) => (
    <Note
      note={note}
      key={note.id}
      onType={props.onType}
      onDelete={props.onDelete}
    />
  );
  //Use the .filter() method to remove any objects from the notes array
  //that have a doesMatchSearch value of false.
  const searchMatches = props.notes.filter(keepSearchMatches);

  const NoteElements = searchMatches.map(renderNote);
  return <ul className="notes-list">{NoteElements}</ul>;
};

export default NotesList;
