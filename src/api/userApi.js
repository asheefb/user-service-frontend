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

// If GET with no body:
export const getCountries = async () => {
  const response = await fetch(`${API_BASE_URL}/countries`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }
  return await response.json();
};

export const getStates = async (countryIsoCode) => {
  const response = await fetch(`${API_BASE_URL}/states?type=STATE&countryCode=${countryIsoCode}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch states');
  }
  return await response.json();
}


export const getCities = async (stateIsoCode) => {
  const response = await fetch(`${API_BASE_URL}/cities?type=CITY&stateIsoCode=${stateIsoCode}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }
  return await response.json();
};
