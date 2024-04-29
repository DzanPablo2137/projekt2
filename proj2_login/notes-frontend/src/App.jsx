import React, { useState, useEffect } from 'react';
import axios from "axios";
import LoginForm from './Login/LoginForm';
import UserForm from './user/UserForm';
import NoteForm from './note/NoteForm';
import NoteList from './note/NoteList';

export const API_URL = "http://localhost:8000/api/";

function App() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(API_URL + 'notes', {params: {"token":token}});
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

    const fetchToken = async () => {
      try {
        const response = await axios.post(API_URL + 'find-login', {
          login: 'username',
          passwd: 'password' 
        });
        setToken(response.data.token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchNotes();
    fetchToken();
  }, []);

  const addUser = async (userData) => {
    try {
      const response = await axios.post(API_URL + 'create-user', userData);
      console.log('User added successfully:', response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const addNote = async () => {
    try {
        const response = await axios.post(API_URL + 'create-note', {
            note_text: text,
            token: token,
            owner: selectedUser
        });
        console.log('Note added successfully:', response.data);
        setNotes(prevNotes => [...prevNotes, response.data]);
        setText('');
        setSelectedUser('');
    } catch (error) {
        console.error('Error adding note:', error);
    }
};

  return (
    <div id='front'>
      <h1>Logowanie</h1>
      <LoginForm setToken={setToken}/>
      <h1>Add User</h1>
      <UserForm addUser={addUser} />
      <h1>Add Note</h1>
      <NoteForm addNote={addNote} apiUrl={API_URL} token={token} />
      <NoteList apiUrl={API_URL} notes={notes}/>
    </div>
  );
}

export default App;
