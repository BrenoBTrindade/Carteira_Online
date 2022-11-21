import React from 'react';
import CashOutForm from '../components/cashOutForm';
import Header from '../components/header';
import TransactionsTable from '../components/tableTransactions';
import '../css/main.css'

function Main() {

  return (
    <section>
      <div className='header-section'>
        <Header/>
      </div>
      <div>
        <div>
          <CashOutForm/>
        </div>
        <div className='table-transactions'>
          <TransactionsTable/>
        </div>
      </div>
    </section>
  );
}

export default Main;