import React, { useState } from 'react';
import axios from 'axios';
function LoginForm() {
  const [login, setLogin] = useState('');
  const [passwd, setPasswd] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login || !passwd) return;
    FindLogin({ login, passwd });
    console.log(login+ " "+ passwd);
  }; 

  const FindLogin = async (wysylanie) => {
    try {
      const odpowiedz = await axios.post('http://127.0.0.1:8000/api/' + 'FindLogin', wysylanie);
      setToken(odpowiedz.data.token);
      console.log(token);
      console.log('User added successfully:', odpowiedz.data);
    } catch (error) {
      console.error('Error adding user:', error);
  };
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="Haslo"
        value={passwd}
        onChange={(e) => setPasswd(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
