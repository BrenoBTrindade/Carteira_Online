import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestCashOut, requestBalance } from '../services/main';

function CashOutForm() {
  const [balance, setBalance] = useState(0);
  const [value, setValue] = useState(0);
  const [username, setUsername] = useState('');
  const navigate = useNavigate()

  const request = async () => {
    const result = await requestBalance();
    setBalance(result)  
    request() 
  }

  const requestCash = async () => {
    requestCashOut(value, username)
  }

  useEffect(() => {
    const token = (JSON.parse(localStorage.getItem('token')|| ''));
    if(!token || token === '') navigate({pathname: '/login'})
    request();
  });

  return (
    <div className='cash-out'>
      <form className='cashout-form '>
        <label htmlFor='cashOut'>
          Transferencia:
          <input
            id='cashOut'
            type='number'
            value={ value }
            onChange={(event:any) => setValue(event.target.value) }
          />
        </label>
        <label htmlFor='username'>
          para:
          <input
            id='username'
            type='text'
            value={ username }
            onChange={(event:any) => setUsername(event.target.value) }
          />
        </label>
        <button
          type='button'
          onClick={() => requestCash()}
        >
          Enviar
        </button> 
      </form>
      <div className='balance'>
        <p id='saldo'>
            { ` R$: ${ balance.toFixed(2).replace('.', ',') }` }
        </p>
      </div>
    </div>
  )
}

export default CashOutForm;