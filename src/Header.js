import React from "react";
////Add an onClick event listener to the button element.
//Add an onChange event listener to the Header’s text input
const Header = (props) => {
  const callSearch = (e) => {
    props.onSearch(e.target.value);
  };

  return (
    <header className="app-header">
      <h1 className="app-header__title">Super Sticky Notes</h1>
      <aside className="app-header__controls">
        <button className="add-new" onClick={props.addNote}>
          + New Note
        </button>
        <input
          type="text"
          placeholder="Type here to search..."
          className="search"
          value={props.searchText}
          onChange={callSearch}
          //Add an onChange event listener to the Header’s text input
        />
      </aside>
    </header>
  );
};
export default Header;