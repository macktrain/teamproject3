import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import {useSelector,useDispatch} from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userLoggedIn);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    dispatch({type: 'LOGOUT'});
  };
  return (
    <header className="bg-danger text-dark mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-dark" to="/">
          <h1 className="m-0" style={{ fontSize: '3rem' }}>
            Friender
          </h1>
        </Link>
        <p className="m-0" style={{ fontSize: '1.25rem', fontWeight: '700' }}>
          The G-Version of Tinder
        </p>
        <div>
          {loggedInUser ? (
            <>
            <Link className="btn btn-lg btn-primary m-2" to="/search">
              Find a Friend
            </Link>
              <Link className="btn btn-lg btn-primary m-2" to="../FriendsList/index.js">
                Friends
              </Link>
              <Link className="btn btn-lg btn-primary m-2" to="/me">
                View My Profile
              </Link>
              <Link className="btn btn-lg btn-primary m-2" onClick={logout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-dark m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
