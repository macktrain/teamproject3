import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import HobbiesList from '../components/HobbyList';
import HobbyForm from '../components/HobbyForm';
import HobbyList from '../components/HobbyList'
import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';
import {useSelector,useDispatch} from 'react-redux';
import biopic from '../components/assets/biopic.png';
// import Auth from '../utils/auth';
const Profile = () => {
  const loggedInUser = useSelector((state) => state.userLoggedIn);
  const profileId = loggedInUser? loggedInUser.profile._id : null;
  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );
  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};
  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
  //   return <Redirect to="/me" />;
  // }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!profile?.fName) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }
  return (
    <main className="flex-row justify-center mb-4">
      <div className=" col-9 col-lg-8">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2 text-center">
            {profile.fName} {profile.lName}
              <h4 className="bg-dark text-light p-2 text-center">Hand Out your id: {profile._id}</h4>
          </h4>
          <div id="biopic" >
            <img className="bio justify-content-md-center" src={biopic} alt={biopic} />
          </div>
          <hr/>
          <h5 className= "bg-dark text-light p-2 text-center " >
          {profile.locCity},{profile.locState} Age: {profile.age}
          </h5>
          <hr/>
          <h5 className= "bg-dark text-light p-2 text-center " >
            My Hobbies are: {profile.hobbies}
          </h5>
          <HobbyForm />
        </div>
      </div>
    </main>
  );
};
export default Profile;