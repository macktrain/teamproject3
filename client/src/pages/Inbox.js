import React from 'react';
import {useSelector} from 'react-redux';
import Requests from '../components/Requests';
const Request = () => {
  const loggedInUser = useSelector((state) => state.userLoggedIn);
  const userId = loggedInUser? loggedInUser.profile._id : null;
  let requests = "";
  if (userId) {
    requests = <Requests />
  }
  return (
    <div className="flex-row justify-center">
      <div id='homeMain'>
        <div id='homeLeft'>
        </div>
        <div id='homeRight'>
          {requests}
        </div>
      </div>
    </div>
  );
};
export default Request;