import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {useSelector} from 'react-redux'
import { ADD_HOBBY } from '../../utils/mutations';

import Auth from '../../utils/auth';

const HobbyForm = () => {
  const [hobby, setHobby] = useState('');
  const loggedInUser = useSelector((state) => state.userLoggedIn);
  const profileId = loggedInUser? loggedInUser.profile._id : null;
  const [addHobby, { error }] = useMutation(ADD_HOBBY);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addHobby({
        variables: { profileId, hobby },
      });
      console.log(profileId)
      setHobby('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Add a New Hobby</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="What are your hobbies..."
              value={hobby}
              className="form-input w-100"
              onChange={(event) => setHobby(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Add
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to endorse hobbies. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default HobbyForm;
