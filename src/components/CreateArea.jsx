import React, { useState, useEffect } from "react";
import { Add } from "@mui/icons-material";
import { Fab, Zoom } from "@mui/material";
import Note from "./Note";
import { getUUID } from "./../common";

function CreateArea() {
  const newNote = {
    id: null,
    title: "",
    content: "",
  };
  const [note, setNote] = useState(newNote);
  const [notes, setNotes] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  // for getting saved favourites movies from the browser local storage
  useEffect(() => {
    const savedNotes =
      JSON.parse(localStorage.getItem("localNotes")) || [];
      setNotes([...savedNotes]);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const handleNote = { ...note, [name]: value };
    setNote(handleNote);
  };

  const addNote = (e) => {
    e.preventDefault();
    note.id = getUUID();
    const addedNote = [...notes, note];
    setNotes(addedNote);
    localStorage.setItem("localNotes", JSON.stringify(addedNote));
    setNote(newNote);
  };

  const deleteNote = (id) => {
    const deletedNote = notes.filter((note) => note.id !== id);
    setNotes([...deletedNote]);
    localStorage.setItem("localNotes", JSON.stringify(deletedNote));
  };

  return (
    <div>
      <form onSubmit={addNote} className="create-note">
        {isClicked && (
          <input
            name="title"
            placeholder="Title"
            required="required"
            onChange={handleChange}
            value={note.title}
          />
        )}
        <textarea
          name="content"
          placeholder="Take a note..."
          required="required"
          rows={isClicked ? 3 : 1}
          onChange={handleChange}
          value={note.content}
          onClick={() => setIsClicked(true)}
        />
        <Zoom in={isClicked}>
          <Fab type="submit" color="red">
            <Add />
          </Fab>
        </Zoom>
      </form>
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onClickDelete={deleteNote}
        />
      ))}
    </div>
  );
}

export default CreateArea;
