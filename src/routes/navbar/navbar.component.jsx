import { React, Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navbar.styles.scss';

// "Outlet" here will render other components <Home/> & <Shop/> after Navbar
const Navbar = () => {
  return (
    <Fragment>
      <div className="navbar">
        <Link className="logo-container" to={"/"}>
					<CrwnLogo className="logo"/>
				</Link>
        <div className="navbar-link-container">
          <Link className="nav-link" to={"/shop"}>SHOP</Link>
          <Link className="nav-link" to={"/auth"}>SIGN IN</Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
