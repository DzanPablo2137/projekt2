import React, { useState, useEffect } from 'react';
import UserForm from './user/UserForm';
import NoteForm from './note/NoteForm';
import NoteList from './note/NoteList';
import axios from "axios";

export const API_URL = "http://localhost:8000/api/";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(API_URL + 'notes');
        if (Array.isArray(response.data)) {
            setNotes(response.data);
          } else {
              console.log("Response data: ", response.data);
            console.error('Error: Notes data is not an array');
          }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
    fetchNotes();
  }, []);

  const addUser = async (userData) => {
    try {
      const response = await axios.post(API_URL + 'create-user', userData);
      console.log('User added successfully:', response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const addNote = async (noteData) => {
    try {
      const response = await axios.post(API_URL + 'create-note', noteData);
      console.log('Note added successfully:', response.data);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <UserForm addUser={addUser} />
      <h1>Add Note</h1>
      <NoteForm addNote={addNote} apiUrl={API_URL} />
      <NoteList apiUrl={API_URL} notes={notes}/>
    </div>
  );
}

export default App;
