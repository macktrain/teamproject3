import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_HOBBY } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const HobbiesList = ({ hobbies, isLoggedInUser }) => {
  const [removeHobby, { error }] = useMutation(REMOVE_HOBBY, {
    update(cache, { data: { removeHobby } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeHobby },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveHobby = async (hobby) => {
    try {
      const { data } = await removeHobby({
        variables: { hobby },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!hobbies.length) {
    return <h3>No Hobbies Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {hobbies &&
          hobbies.map((hobby) => (
            <div key={hobby} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{hobby}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveHobby (hobby)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default HobbiesList;
