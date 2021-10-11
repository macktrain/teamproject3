import React from 'react';
import {useSelector} from 'react-redux';
import Mailbox from '../components/Mailbox';

const Home = () => {
  const loggedInUser = useSelector((state) => state.userLoggedIn);
  const userId = loggedInUser? loggedInUser.profile._id : null;

  let mailbox = "";
  if (userId) {
    mailbox = <Mailbox />
  }

  return (
    <div className="flex-row justify-center">
      <div id='homeMain'>
        <div id='homeLeft'>
          well
        </div>
        <div id='homeRight'>
          {mailbox}
        </div>
      </div>
    </div>
  );
};

export default Home;
