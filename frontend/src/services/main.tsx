import axios from 'axios';

const backUrl = 'http://localhost:3001';

const requestBalance = async () => {
  const user = localStorage.getItem('token');
  if (!user) return null
  const token = JSON.parse(user);
  
  try {
    const response = await axios
      .get(`${backUrl}/balance`,  { headers: { authorization: token } });
    return response.data.account.balance;
    
  } catch (error) {
    return '';
  }
};

const requestCashOut = async (value: number, username: string) => {
  const user = localStorage.getItem('token');
  if (!user) return null
  const token = JSON.parse(user);
  
  try {
    const response = await axios
      .put(`${backUrl}/cashout`, 
        { value, username }, 
        { headers: { authorization: token } });
    console.log(response);      
  } catch (error) {
    return '';
  }
};

const requestTransactions = async () => {
  const user = localStorage.getItem('token');
  if (!user) return null
  const token = JSON.parse(user);
  
  try {
    const response = await axios
      .get(`${backUrl}/transactions`, 
        { headers: { authorization: token } }); 
    return response.data  
  } catch (error) {
    return '';
  }
};

const requestTransactionsByDate = async ( date: string ) => {
  const user = localStorage.getItem('token');
  if (!user) return null
  const token = JSON.parse(user);
  try {
    const response = await axios
      .get(`${backUrl}/transactions/date?date=${date}`, 
        { headers: { authorization: token } });
        
    return response.data  
  } catch (error) {
    return '';
  }
};

const requestTransactionsByCashOut = async () => {
  const user = localStorage.getItem('token');
  if (!user) return null
  const token = JSON.parse(user);
  try {
    const response = await axios
      .get(`${backUrl}/transactionsbycashout`, 
        { headers: { authorization: token } }); 
       
    return response.data  
  } catch (error) {
    return '';
  }
};

const requestTransactionsByCashIn = async () => {
  const user = localStorage.getItem('token');
  if (!user) return null
  const token = JSON.parse(user);
  try {
    const response = await axios
      .get(`${backUrl}/transactionsbycashIn`, 
        { headers: { authorization: token } }); 
       
    return response.data  
  } catch (error) {
    return '';
  }
};


export { 
  requestBalance,
  requestCashOut,
  requestTransactions,
  requestTransactionsByDate,
  requestTransactionsByCashOut,
  requestTransactionsByCashIn }