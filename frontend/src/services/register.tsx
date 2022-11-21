import axios from 'axios';

const backUrl = 'http://localhost:3001';

export const registerRequest = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${backUrl}/register`, { username, password });
    
    return response.data;
  } catch (error) {
    return '';
  }
};