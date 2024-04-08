import React, { useState } from 'react';

function LoginForm({ addUser }) {
  const [login, setLogin] = useState('');
  const [passwd, setPasswd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    loginUser({ username, password });
    getLogin('');
    getPasswd('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Login"
        value={username}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="Haslo"
        value={password}
        onChange={(e) => setPasswd(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
