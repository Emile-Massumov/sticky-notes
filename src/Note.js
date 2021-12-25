import React from "react";
//Add updateTitle and updateDescription functions to the Note component that are called by the event listeners added to the text input and textbox elements.
//These methods call the onType method passed down from App component as a prop, calling it with the Note’s id, either title or description for the updatedKey parameter, and the updatedValue which you will get by
//interrogating the change event from the text input or textbox element.

const Note = (props) => {
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "title", updatedValue);
  };
  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "description", updatedValue);
  };
  //Add a clickDelete methods to the Note component that
  // is called by the onClick event listener
  const clickDelete = () => props.onDelete(props.note.id);

  return (
    <li className="note">
      <input
        type="text"
        value={props.note.title}
        onChange={updateTitle}
        placeholder="Title"
        className="note__title"
      />
      <textarea
        className="note__description"
        placeholder="Description..."
        value={props.note.description}
        //Add an onChange event listener to the input and textbox
        onChange={updateDescription}
      />
      <span onClick={clickDelete} className="note__delete">
        X
      </span>
    </li>
  );
};

export default Note;
