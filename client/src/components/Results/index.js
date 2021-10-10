import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { SEND_FRIEND_REQUEST } from '../../utils/mutations';
import {useSelector} from 'react-redux';

//THIS COMPONENT NEEDS AN ARRAY OF PROFILEIDs SO that it 
//May prepare a results page of resultant profiles.
//In turn a user can "Add Friend"
//615c5daf9c448d635801ccaa

const ResultList = ({ profiles, title }) => {
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [btnDisable, setbtnDisable] = useState(false);
  
  const [ sendFriendRequest ] = useMutation(SEND_FRIEND_REQUEST, {
    onCompleted() {
      setbtnDisable(true);
      setRequestLoading(false);
      setRequestSuccess(true);
    },
    onError(error) {
      console.log('DETAILED SEND_FRIEND_REQUEST errors');
      console.log(JSON.stringify(error, null, 2));
      
      setbtnDisable(false);
      setRequestLoading(false);
      setRequestError(true);
    },
  });
  
  const loggedInUser = useSelector((state) => state.userLoggedIn);
  const userId = loggedInUser? loggedInUser.profile._id : null;
  
  if (Object.keys(profiles).length === 0) {
    return <h6><strong>No results returned</strong></h6>;
  }

  const hobbyArr = [profiles.hobbies];
  
  return (
    <div>
      <div className="flex-row justify-space-between my-4">
          <div key={profiles._id} className="col-12 col-xl-6">
            <div className="card mb-3">
              <h4 className="card-header bg-dark text-light p-2 m-0">
                {profiles.fName} {profiles.lName}
              </h4>
              <hr/>
              <Link className="btn btn-block btn-squared btn-light text-dark"
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
                      <div class="ui inverted button" disabled={btnDisable} value={profiles._id}
                           onClick={() => { 
                              setRequestLoading(true);
                              setRequestSuccess(false);
                              sendFriendRequest({
                              variables:  { 
                                  sender: userId,
                                  receiver:profiles._id,
                                  response: "requested"
                              }
                          }); }} > {requestLoading ? 'Sending ...' : 'Add Friend'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {requestSuccess && <p>Request sent!</p>}
              {requestError && <p>Request failed!</p>}
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
