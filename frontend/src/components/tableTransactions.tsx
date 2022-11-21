import React, { useEffect, useState } from 'react';
import { requestTransactions, requestTransactionsByCashIn, requestTransactionsByCashOut, requestTransactionsByDate } from '../services/main';
import '../css/main.css'

function TransactionsTable() {
  const [ transactions, setTransactions ] = useState([]);
  
  const request = async () => {
    const result = await requestTransactions();
    setTransactions(result)
  }

  const requestByDate = async (date: string) => {
    const result = await requestTransactionsByDate(date);
    setTransactions(result)
  }

  const requestByCashOut = async () => {
    const result = await requestTransactionsByCashOut()
    setTransactions(result)
  }

  const requestByCashin = async () => {
    const result = await requestTransactionsByCashIn()
    setTransactions(result)
  }

  useEffect(() => {
    request();
  }, []);

  return (
    <div>
      <form>
        <div className='filter-buttons'>
          <p>Filtrar por </p>
            <input 
                type='date'
                onChange={(event) => requestByDate(event.target.value) }
            />
            <button
                type='button'
                onClick={ () => requestByCashOut() }
            >
                Enviados
            </button>
            <button
                type='button'
                onClick={ () => requestByCashin() }
            >
                Recebidos
            </button>
              <button
                type='button'
                onClick={() => request()}
              >
                limpar Filtros
              </button>
          </div>
       <table>
        <thead>
          <tr>
            <th>enviada</th>
            <th>recebida</th>
            <th>valor</th>
            <th>data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction:any, index) => (
            <tr className="tr-2" key={ index }>
              <td
              >
                {transaction.debitedAccountId}
              </td>
              <td
              >
                {transaction.creditedAccountId}
              </td>
              <td
              >
                {transaction.value.toFixed(2).replace('.', ',')}
              </td>
              <td
              >
                {`${transaction.createdAt}`}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      </form>
    </div>
  )
}

export default TransactionsTable;