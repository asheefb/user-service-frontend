import { API_BASE_URL } from '../constants/appConstants';

export const createUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if(!response.ok){
    throw new Error("Failed to create user");
  }

  return await response.json();
};
