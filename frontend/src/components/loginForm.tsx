import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/login";
import '../css/login.css'


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const  token  = await loginRequest(username, password);
    console.log(token);
    localStorage.setItem('token', JSON.stringify(token))
    localStorage.setItem('user', JSON.stringify(username))
    navigate({pathname: '/main'})
    
  }

  return (
    <div>
      <form className="login-section">
        <input
          type="text"
          placeholder="Usuário"
          value={ username }
          onChange={ ({ target }) => setUsername(target.value) }
        />
        <input 
          type="password"
          placeholder="Senha"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <div className="login-buttons">
          <button
            type="button"
            onClick={(event) => handleLogin(event) }
            >
              Entrar
          </button>
          <button
            type="button"
            onClick={() => navigate({pathname: '/register'})}
            >
              Registrar
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;