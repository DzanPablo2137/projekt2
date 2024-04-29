import React, { useState, useEffect } from 'react';
import axios from "axios";

function NoteForm({ addNote, apiUrl }) {
    const [text, setText] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(apiUrl + 'users');
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    console.error('Error: Users data is not an array');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchToken = async () => {
            try {
                const response = await axios.post(apiUrl + 'find-login', {
                    login: 'username',
                    passwd: 'password' 
                });
                setToken(response.data.token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchUsers();
        fetchToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text || !selectedUser || !token) {
            console.error('Missing required data');
            return;
        }

        try {
            const response = await axios.post(apiUrl + 'create-note', {
                note_text: text,
                token: token,
                owner: selectedUser
            });
            console.log('Note added successfully:', response.data);
            addNote()
            setText('');
            setSelectedUser('');
        } catch (error) {
            console.error('Error adding note:', error);
        }
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
  