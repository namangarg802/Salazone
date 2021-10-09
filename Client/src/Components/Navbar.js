import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import "../Style.css";
import { CartContext } from "./CartContext";
import { AuthContext } from "./CartContext";
import { NavContext } from "./CartContext";
import AlertContext from "./AlertContext";
import { useHistory } from "react-router";

function Navbar() {
  const history = useHistory();
  const { cart } = useContext(CartContext);
  const { isalert, showAlert } = useContext(AlertContext);
  const { auth, setAuth } = useContext(AuthContext);
  const { showNav, setNav } = useContext(NavContext);

  const handleClick = () => {
    localStorage.removeItem("token");
    setAuth(false);

    showAlert("Logged Out Susscessfuly", "success");
    history.push("/");
  };
  return (
    <nav className="navba">
      <div className="items  flex items-center">
        <div className="navlogo">
          <img className="logo" src="/images/logo.png" alt="" />
        </div>
        {!showNav ? (
          <ul className="  flex mt-4 h-ul">
            <Link to="/" style={{ textDecoration: "none" }}>
              <li className="navitem ">Home</li>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <li className="navitem">About Us</li>
            </Link>
            <Link to="Services" style={{ textDecoration: "none" }}>
              <li className="navitem">Services</li>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <li className="navitem">Contact Us</li>
            </Link>
            {auth ? (
              <div className="flex logout">
                {" "}
                <Link
                  to="/Cart"
                  style={{ textDecoration: "none", marginBottom: "2px" }}
                >
                  <li className="">
                    <div className="items-center cartimg ">
                      <span>{cart.totalItems ? cart.totalItems : 0}</span>
                      <img
                        style={{ height: 40, width: 20, marginLeft: "10px" }}
                        className="object-contain h-48 w-full ..."
                        src="/images/cart.png"
                        alt="cart"
                      />
                    </div>
                  </li>
                </Link>
                <button
                  onClick={handleClick}
                  className="bg-black text-white rounded-full h-12  p-2 mt-3"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex  ">
                <Link
                  to="/login"
                  className="no-underline  bg-black text-white rounded-full h-12 flex items-center  p-4 mt-3 mr-4 "
                >
                  Login
                </Link>{" "}
                <Link
                  to="/Signup"
                  className="no-underline bg-black text-white rounded-full h-12 flex items-center p-4 mt-3"
                >
                  Signup
                </Link>
              </div>
            )}
          </ul>
        ) : (
          <div className="v-nav flex ">
            <ul className=" items-center nav-links" id="hidden">
              <Link to="/" style={{ textDecoration: "none" }}>
                <li className="navitem-2 ">Home</li>
              </Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                <li className="navitem-2">About Us</li>
              </Link>
              <Link to="Services" style={{ textDecoration: "none" }}>
                <li className="navitem-2">Services</li>
              </Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                <li className="navitem-2">Contact Us</li>
              </Link>
              {auth ? (
                <div className="flex ">
                  {" "}
                  <Link
                    to="/Cart"
                    style={{ textDecoration: "none", marginBottom: "2px" }}
                  >
                    <li className="">
                      <div className="items-center cartimg ">
                        <span>{cart.totalItems ? cart.totalItems : 0}</span>
                        <img
                          style={{ height: 40, width: 20, marginLeft: "10px" }}
                          className="object-contain h-48 w-full ..."
                          src="/images/cart.png"
                          alt="cart"
                        />
                      </div>
                    </li>
                  </Link>
                  <button
                    onClick={handleClick}
                    className="rounded-full h-12  p-2 mt-3 "
                    style={{
                      backgroundColor: "#f88d8d",
                      color: "white",
                      fontSize: "24px",
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex  ">
                  <Link
                    to="/login"
                    className="no-underline  bg-black text-white rounded-full h-12 flex items-center  p-4 mt-3 mr-4 "
                  >
                    Login
                  </Link>{" "}
                  <Link
                    to="/Signup"
                    className="no-underline bg-black text-white rounded-full h-12 flex items-center p-4 mt-3"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={() => {
          setNav(!showNav);
        }}
        className="navbutton"
      >
        <i className="fas fa-bars "></i>
      </button>
    </nav>
  );
}

export default Navbar;
