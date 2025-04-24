import React, { useEffect, useState } from 'react';
import { createUser } from '../../api/userApi';
import { getCountries } from '../../api/userApi';
import '../../css/UserForm.css';

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
const states = ['California', 'Texas', 'New York', 'Florida', 'Illinois'];
// const countries = ['United States', 'Canada', 'Mexico', 'India', 'United Kingdom'];

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [countryData, setCountryData] = useState([]); 

  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     try {
  //       const fetchedCountries = await getCountries();
  //       setCountryData(fetchedCountries);
  //     } catch (error) {
  //       alert('Failed to fetch countries.');
  //     }
  //   };
  
  //   fetchCountries();
  // }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createUser(formData);
      alert('User created successfully!');
      console.log(result);
    } catch (error) {
      alert('Failed to create user.');
      console.error(error);
    }
  };

  const renderInput = (key) => {
    if (key === 'dateOfBirth') {
      return <input type="date" name={key} id={key} value={formData[key]} onChange={handleChange} required />;
    }

    if (key === 'country') {
      return (
        <select name="country" id="country" value={formData.country} onChange={handleChange} required>
          <option value="">Select Country</option>
          {countryData.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      );
    }

  
    if (key === 'state') {
      return (
        <select name="state" id="state" value={formData.state} onChange={handleChange} required>
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      );
    }

    if (key === 'country') {
      const handleCountryFocus = async () => {
        if (countryData.length === 0) { // Avoid fetching again if data is already loaded
          try {
            const fetchedCountries = await getCountries();
            setCountryData(fetchedCountries);
          } catch (error) {
            alert('Failed to fetch countries.');
            console.error(error);
          }
        }
      };
    
      return (
        <select
          name="country"
          id="country"
          value={formData.country}
          onChange={handleChange}
          onFocus={handleCountryFocus} // Trigger API call on focus
          required
        >
          <option value="">Select Country</option>
          {countryData.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      );
    }
    
    return <input type="text" name={key} id={key} value={formData[key]} onChange={handleChange} required />;
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Add User</h2>
        <div className="form-grid">
          {Object.keys(formData).map((key) => (
            <div className="form-group" key={key}>
              <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
              {renderInput(key)}
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
