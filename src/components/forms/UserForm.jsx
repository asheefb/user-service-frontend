import React, { useEffect, useState } from 'react';
import { createUser } from '../../api/userApi';
import { getCountries } from '../../api/userApi';
import { getStates } from '../../api/userApi';
import { getCities } from '../../api/userApi';
import '../../css/UserForm.css';

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
    country: '',
    state: '',
    city: '',
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
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

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

  const [loadingCountries, setLoadingCountries] = useState(false); // <-- add loading
  
  const handleCountryFocus = async () => {
    if (!loadingCountries) {  // If not already trying to fetch
      setLoadingCountries(true); 
      try {
        const response = await getCountries();
        setCountryData(response.data);
      } catch (error) {
        alert('Failed to fetch countries.');
        console.error(error);
      } finally {
        setLoadingCountries(false);  // Always reset loading
      }
    }
  };

  const[loadingStates, setLoadingStates] = useState(false); 

  const handleStateFocus = async () => {
    if (!formData.country) {
      alert('Please select a country first!');
      return; // ⛔ Stop here if country not selected
    }
  
    if (!loadingStates) {  
      setLoadingStates(true); 
      try {

        const selectedCountry = countryData.find(
          (country) => country.id === formData.country
        );
        if (!selectedCountry) {
         alert('Please select a country first.');
         setLoadingStates(false); 
          return;
        }

        const coutryIsoCode = selectedCountry.countryCode; 

        const response = await getStates(coutryIsoCode); 
        setStateData(response.data);
      } catch (error) {
        alert('Failed to fetch states.');
        console.error(error);
      }
      finally {
        setLoadingStates(false);  
      }
    }
  }

  const[loadingCities, setLoadingCities] = useState(false);

  const handleCityFocus = async () => {
    if (!formData.state) {
      alert('Please select a state first!');
        return; 
    }
    if (!loadingCities) {
      setLoadingCities(true);
      try {
        const selectedState = stateData.find(
          (state) => state.id ===  formData.state
        );
        if (!selectedState) {
          alert('Please select a state first.');
          setLoadingCities(false); 
          return;
        }

        const stateIsoCode = selectedState.stateIsoCode; 

        const response = await getCities(stateIsoCode); 
        setCityData(response.data);

      } catch (error) {
        alert('Failed to fetch cities.');
        console.error(error);
      } finally {
        setLoadingCities(false);  
      }
    }

  }

  const renderInput = (key) => {
    if (key === 'dateOfBirth') {
      return <input type="date" name={key} id={key} value={formData[key]} onChange={handleChange} required />;
    }

    if (key === 'gender') {
      return (
        <div className="gender-group">
          <label>
            <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
          </label>
          <label>
            <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} /> Other
          </label>
        </div>
      );
    }
    

    if (key === 'country') {
      return (
        <select
          name="country"
          id="country"
          value={formData.country}
          onChange={handleChange}
          onFocus={handleCountryFocus}
          required
        >
          <option value="">Select Country</option>
          {countryData.map((country) => (
            <option key={country.id} value={country.id}>
              {country.countryName}
            </option>
          ))}
        </select>
      );
    }  

    if (key === 'state') {
      return (
        <select name="state" id="state" value={formData.state} onChange={handleChange} onFocus={handleStateFocus} required>
          <option value="">Select State</option>
          {stateData.map((state) => (
            <option key={state.id} value={state.id}>{state.stateName}</option>
          ))}
        </select>
      );
    }  

    if (key === 'city') {
      return (
        <select name="city" id="city" value={formData.city} onChange={handleChange} onFocus={handleCityFocus} required>
          <option value="">Select City</option>
          {cityData.map((city) => (
            <option key={city.id} value={city.id}>{city.cityName}</option>
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
