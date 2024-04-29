import React, { useState, useEffect } from 'react';
import axios from "axios";

function NoteForm({ addNote, apiUrl, token }) {
    const [text, setText] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

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

        fetchUsers();
    }, [apiUrl]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Text:', text);
        console.log('Token:', token);
        if (!text || !token) {
            console.error('Missing required data');
            return;
        }

        try {
            const response = await axios.post(apiUrl + 'create-note', {
                note_text: text,
                token: token
            });
            console.log('Note added successfully:', response.data);
            addNote();
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
            <button type="submit">Add Note</button>
        </form>
    );
}

export default NoteForm;
