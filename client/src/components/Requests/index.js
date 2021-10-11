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
  
  console.log ("CHECKING USERID")
  console.log (userId)

  const { loading, data } = useQuery(RETRIEVE_FRIEND_REQUESTS,
    {
      variables: { 
        receiver: userId,
        response: "requested" },
    }
  );

  console.log ("CHECKING DATA");
  console.log (data);
  
  if (data) {
    return <h6><strong>Nobody wants to be your friend.</strong></h6>;
  }

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};
  
  return (
    <div class="ui cards">
        <div class="card">
            <div class="content">
                <img class="right floated mini ui image" src={userImg}/>
                <div class="header">
                    Elliot Fu
                </div>
                <div class="meta">
                    Friends of Veronika
                </div>
                <div class="description">
                Elliot requested permission to view your contact details
                </div>
            </div>
            <div class="extra content">
                <div class="ui two buttons">
                <div class="ui basic green button">Approve</div>
                <div class="ui basic red button">Decline</div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Requests;
