import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';
import {useSelector, useDispatch} from "react-redux";
import flogo from '../assets/flogo.png';


const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "40px",
    color: "grey"
  },
  navlinks: {
    marginLeft: theme.spacing(1),
    display: "flex",
  },
 logo: {
    height:'65px',
    diplay: 'flex'
  },
  link: {
    textDecoration: "none",
    textShaddow: "3px 3px grey",
    color: "grey",
    fontSize: "20px",
    marginLeft: theme.spacing(4),
    "&:hover": {
      color: "black",
      border: "none",
    },
    bar: {
      color:"white"
    }
  },
}));

function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggedInUser =useSelector((state) => state.userLoggedIn);
  const logout = (event) => {
    Auth.logout();
    dispatch({type: 'LOGOUT'})
  }

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar className={classes.bar} >
        <Link variant="h1" className={classes.title} to= "/">
          Friender
        </Link>
        <img className={classes.logo} src={flogo} alt={flogo}/>

          <div>
{loggedInUser ? (
  <>
  <div className = {classes.navlinks}>
    <Link className= {classes.link} to="/search">
      Search 
    </Link>
    <Link className={classes.link} to="../FriendsList/index.js">
      Friends
    </Link>
    <Link className={classes.link} to="/me">
      View Me
    </Link>
    <Link className={ classes.link} to="/inbox" >
      Inbox
    </Link>
    <Link className={ classes.link} onClick={logout} >
      Logout
    </Link>
    </div>
  </>
) : (
  <>
    <Link className={classes.link} to="/login">
      Login
    </Link>
    <Link className={classes.link} to="/signup">
      Signup
    </Link>
  </>
)}
</div>
         
      </Toolbar>
    </AppBar> 
  );
}
export default Header;


