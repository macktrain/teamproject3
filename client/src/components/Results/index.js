import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { useMutation } from '@apollo/client';

import { SEND_FRIEND_REQUEST } from '../../utils/mutations';

//THIS COMPONENT NEEDS AN ARRAY OF PROFILEIDs SO that it 
//May prepare a results page of resultant profiles.
//In turn a user can "Add Friend"
//615c5daf9c448d635801ccaa

const ResultList = ({ profiles, title }) => {
  console.log (Object.keys(profiles).length);
  if (Object.keys(profiles).length === 0) {
    return <h3>No Profiles Yet</h3>;
  }

  const hobbyArr = [profiles.hobbies];

  function sendFriendRequest(){
    alert("hey")
  }

  const handleSendRequest = id => {
    try {
        const { data } = sendFriendRequest({
            variables:  { 
                sender: "123",
                receiver: profiles._id,
                message: "requested"
            }
        })
    } catch (err) {
            console.error(err);
        }
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
          <div key={profiles._id} className="col-12 col-xl-6">
            <div className="card mb-3">
              <h4 className="card-header bg-dark text-light p-2 m-0">
                {profiles.fName} {profiles.lName}
              </h4>
              <hr/>
              <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/profiles/${profiles._id}`}
                >
                <div class="blurring dimmable image">
                  <div class="ui dimmer">
                    <div class="content">
                      <div class="center">
                        <div class="ui inverted button">View Profile</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <hr/>
              <div class="blurring dimmable image btn btn-block btn-squared btn-light text-dark">
                <div class="ui dimmer">
                  <div class="content">
                    <div class="center">
                      <div class="ui inverted button"  value={profiles._id} onClick={handleSendRequest} >Add Friend</div>
                    </div>
                  </div>
                </div>
              </div>
              <hr/>
              <br />
              <div>
                <strong>List of hobbies:</strong>
                  {hobbyArr.map(hobby => (<span>{hobby + ","}&nbsp;</span>))}
                </div>
              <br />
            </div>
          </div>
      </div>
    </div>
  );
};

export default ResultList;
