// Here we need "currentUser" value & not "setCurrentUser" setter function

import { React, Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navbar.styles.scss";

// "Outlet" here will render other components <Home/> & <Shop/> after Navbar
const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log(currentUser); // When sign-in happens, this is logged, as re-rendering happens because of useContext hook, It tells, "whenever the value inside a context, 'currentUser' is changed, re-render me."
  // This value is updated because of useState in UserContext comp. (state is updated because of setter function 'setCurrentUser'");
  // as we know comp. re-renders when it's state updates or props changed.
  // In this case, useState's "setCurrentUser" is called which updates "currentUser" value;
  // Then any comp. listening the "currentUser" should inturn update & re-render.
  // This "navbar" comp. is listening to "currentUser" from UserContext's useState; on sign-in it updates & hence, "navbar" is re-rendered;
  // because if "currentUser" value is updating, we most-likey need it to use in UI.

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  }
  // Whenever user is signed out, we don't know that it's actually signed out or not on the basis of context; becaause context was not hooked to it yet.
  // Here we're leveraging context in order to store user & track authentication state of "user".

  return (
    <Fragment>
      <div className="navbar">
        <Link className="logo-container" to={"/"}>
          <CrwnLogo className="logo" />
        </Link>
        <div className="navbar-link-container">
          <Link className="nav-link" to={"/shop"}>
            SHOP
          </Link>
          {currentUser ? (
            <Link className="nav-link" onClick={signOutHandler}>SIGN OUT</Link>
          ) : (
            <Link className="nav-link" to={"/auth"}>
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
