import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Form = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const validateForm = () => {
    let valid = true;
    const { name, email, mobile } = formValues;
    const errorsCopy = { name: '', email: '', mobile: '' };

    if (name.trim() === '') {
      errorsCopy.name = 'Name is required';
      valid = false;
    }

    if (!isValidEmail(email)) {
      errorsCopy.email = 'Invalid email address';
      valid = false;
    }

    if (!isValidMobile(mobile)) {
      errorsCopy.mobile = 'Invalid mobile number';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };
  

  return (
    <div className='main'>
        <h2>FORM VALIDATION</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label htmlFor="name" class="form-label">Name:</label>
          <input
          className='form-control'
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email" class="form-label mt-2">Email:</label>
          <input
          className='form-control'
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="mobile" class="form-label mt-2">Mobile Number:</label>
          <input
            className='form-control'
            type="tel"
            id="mobile"
            name="mobile"
            value={formValues.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>
        <button type="submit" class="btn btn-primary mt-4">Submit</button>
      </form>
      {submitted && (
        <div>
          <h2 className='mt-3'>Submitted Values</h2>
          <p>Name: {formValues.name}</p>
          <p>Email: {formValues.email}</p>
          <p>Mobile No. :{formValues.mobile}</p>
        </div>
      )}
    </div>
  );
};

export default Form;
