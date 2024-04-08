import React, { } from 'react';

function LoginForm(login, passwd, returnLogin, returnPasswd) {
  //const [login, setLogin] = useState('');
  //const [passwd, setPasswd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login || !passwd) return;
    //loginUser({ username, password });
    console.log(login+ " "+ passwd);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => returnLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="Haslo"
        value={passwd}
        onChange={(e) => returnPasswd(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
