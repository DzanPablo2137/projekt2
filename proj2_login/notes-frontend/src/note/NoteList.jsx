import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NoteList({apiUrl, notes}) {

  return (
    <div>
      <h1>All Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.pk}>
            <strong>Note:</strong> {note.note_text} | <strong>User:</strong> {note.owner}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
