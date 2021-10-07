import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';
import ResultList from '../components/HobbyList';
import Auth from '../utils/auth';
const Search = () => {
  const [formState, setFormState] = useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    age: '',
    locCity: '',
    locState: '',
  });
  const [searchProfile, { error, data }] = useMutation(ADD_PROFILE);
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
      const { data } = await searchProfile({
        variables: { ...formState},
      });
      Auth.login(data.searchProfile.token);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Search For Friends</h4>
          <div className="card-body">
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
              />
                <input
                  className="form-input"
                  placeholder="Location"
                  name="locCity"
                  type="locCity"
                  value={formState.locCity}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-danger"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Search
                </button>
              </form>
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>          
          <ResultList
              profiles={profiles}
              title="These people meet your criteria:"
            />
        </div>
      </div>
    </main>
  );
};
export default Search;