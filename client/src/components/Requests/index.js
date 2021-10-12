import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { RETRIEVE_FRIEND_REQUESTS } from '../../utils/queries';
// import { ADD_FRIEND } from '../../utils/mutations';
import { DECLINE_FRIEND } from '../../utils/mutations';
import {useSelector} from 'react-redux';
import { isNullableType } from 'graphql';
import userImg from '../assets/usrImg.png'

//THIS COMPONENT NEEDS AN ARRAY OF PROFILEIDs SO that it 
//May prepare a results page of resultant profiles.
//In turn a user can "Add Friend"
//615c5daf9c448d635801ccaa

const Requests = () => {
  const loggedInUser = useSelector((state) => state.userLoggedIn);
  const userId = loggedInUser? loggedInUser.profile._id : null;

  // const [ addFriend ] = useMutation(ADD_FRIEND, {
  //   onError(error) {
  //     console.log('DETAILED ADD_FRIEND errors');
  //     console.log(JSON.stringify(error, null, 2));
  //   },
  // });

  const [ declineFriend ] = useMutation(DECLINE_FRIEND, {
    onCompleted() {
      window.location.replace("/");
    },
    onError(error) {
      console.log('DETAILED DECLINE_FRIEND errors');
      console.log(JSON.stringify(error, null, 2));
    },
  });

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
                        <button class="btn btnApprove" >Approve</button>
                        {/* <button class="btn btnApprove" onClick={() => { 
                              addFriend({ variables:  { _id: request._id } }); declineFriend({ variables:  { _id: request._id } });}} >Approve</button> */}
                        <button class="btn btnDecline" onClick={() => { 
                              declineFriend({ variables:  { _id: request._id } }); }} >Decline</button>
                      </div>
                  </div>
              </div>
          </div>
        ))}
      </div>
  );
};

export default Requests;
