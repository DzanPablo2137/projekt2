import React, { useState, useEffect } from 'react';
import axios from "axios";

function NoteForm({ addNote, apiUrl}) {
    const [text, setText] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
  

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            console.log("apiUrl: ", apiUrl);
            const response = await axios.get(apiUrl + 'users');
            if (Array.isArray(response.data)) {
              setUsers(response.data);
            } else {
                console.log("Response data: ", response.data);
              console.error('Error: Users data is not an array');
            }
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
        fetchUsers();
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text || !selectedUser) return;
        addNote({"note_text": text, "owner": selectedUser});
        setText('');
        setSelectedUser('');
    };

    return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Note Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
          <button type="submit">Add Note</button>
        </form>
      );
    }

export default NoteForm;
