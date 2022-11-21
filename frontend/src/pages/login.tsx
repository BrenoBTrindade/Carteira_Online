import React from 'react';
import LoginForm from '../components/loginForm';
import '../css/app.css'

function Login() {
  return (
    <section className="login-page">
      <img src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg" alt="foto" />
      <LoginForm/>
    </section>
  );
}

export default Login;