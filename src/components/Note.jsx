import React from "react";
import {Delete} from '@mui/icons-material';

function Note({ title, content, id, onClickDelete }) {
  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={() => onClickDelete(id)}>
        <Delete />
      </button>
    </div>
  );
}

export default Note;
