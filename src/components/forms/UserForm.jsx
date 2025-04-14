import React, { useState } from 'react';
import { createUser } from '../../api/userApi';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createUser(formData);
      alert('User created successfully!');
      console.log(result);
    } catch (error) {
      alert(ERROR_MESSAGES.FAILED_TO_CREATE);
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <h2>Add User</h2>
      {Object.keys(formData).map((key) => (
        <div key={key} style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            type={key === 'dateOfBirth' ? 'date' : 'text'}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
      ))}
      <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
        Submit
      </button>
    </form>
  );
};

export default UserForm;
