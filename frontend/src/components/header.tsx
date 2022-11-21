import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/header.css'

function Header() {
 const user = localStorage.getItem('user')|| '';
 const userName = JSON.parse(user)
 const navigate = useNavigate()
  return (
    <section className='header-container'>
       <img src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg" alt="foto" />
        <div className='section-2'>
          <h4>{userName}</h4>
          <button
            type='button'
            onClick={() => navigate({pathname: '/login'})}
          >
            Sair
          </button>
      </div>
    </section>
  );
}

export default Header;