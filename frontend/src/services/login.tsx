import axios from 'axios';

const backUrl = 'http://localhost:3001';

export const loginRequest = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${backUrl}/login`, { username, password });
    return response.data.token;

  } catch (error) {
    return '';
  }
};