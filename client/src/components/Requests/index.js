import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { RETRIEVE_FRIEND_REQUESTS } from '../../utils/queries';
import { QUERY_SINGLE_PROFILE } from '../../utils/queries';
import {useSelector} from 'react-redux';
import { isNullableType } from 'graphql';
import userImg from '../../pages/assets/images/user.gif'

//THIS COMPONENT NEEDS AN ARRAY OF PROFILEIDs SO that it 
//May prepare a results page of resultant profiles.
//In turn a user can "Add Friend"
//615c5daf9c448d635801ccaa

const Requests = () => {
  const loggedInUser = useSelector((state) => state.userLoggedIn);
  const userId = loggedInUser? loggedInUser.profile._id : null;
  
  const { loading, data } = useQuery(RETRIEVE_FRIEND_REQUESTS,
    {
      variables: { 
        receiver: userId,
        response: "requested" },
    }
  );
  
  if (!data) {
    return <h6><strong>Nobody wants to be your friend.</strong></h6>;
  }
    
  return (
      <div>
        {data.retrieveFriendRequests.map((request) => (
          <div class="ui cards">
              <div class="card">
                  <div class="content">
                      <img class="right floated mini ui image" src={userImg}/>
                      <div class="header">
                          <strong>{request.sender_fName} {request.sender_lName}</strong>
                      </div>
                      <div class="description">
                      {request.sender_fName} wants to friend you
                      </div>
                  </div>
                  <div class="extra content">
                      <div class="resultsBtn">
                        <button class="btn btnApprove">Approve</button>
                        <button class="btn btnDecline">Decline</button>
                      </div>
                  </div>
              </div>
          </div>
        ))}
      </div>
  );
};

export default Requests;
