import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';
import {useSelector,useDispatch} from 'react-redux';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    age: '',
    locCity: '',
    locState: '',
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);
  const dispatch = useDispatch();

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addProfile({
        variables: { ...formState}, 
      });

      Auth.login(data.addProfile);
      dispatch({type: 'LOGIN', payload: data.addProfile});
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="First Name"
                  name="fName"
                  type="fName"
                  value={formState.fName}
                  onChange={handleChange}
                /><input
                  className="form-input"
                  placeholder="Last Name"
                  name="lName"
                  type="lName"
                  value={formState.lName}
                  onChange={handleChange}
              /><input
                  className="form-input"
                  placeholder="How old are you?"
                  name="age"
                  type="age"
                  value={formState.age}
                  onChange={handleChange}>
              </input>
              <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="What city are you from?"
                  name="locCity"
                  type="locCity"
                  value={formState.locCity}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="What state are you from?"
                  name="locState"
                  type="locState"
                  value={formState.locState}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
