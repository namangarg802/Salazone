import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../Style.css";
import { CartContext } from "./CartContext";
import { AuthContext } from "./CartContext";
function Navbar() {
  const { cart } = useContext(CartContext);
  const { auth, setAuth } = useContext(AuthContext);
  const handleClick = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };
  return (
    <nav className="navba">
      <div className="items  flex items-center">
        <div className="navlogo">
          <img className="logo" src="/images/logo.png" alt="" />
        </div>
        <ul className="  flex mt-4 ">
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
                  <div
                    className="items-center cartimg "
                    style={{
                      display: "flex",
                      padding: "6px 12px",
                      border: "3px solid black",
                      borderRadius: "20px",
                    }}
                  >
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
      </div>
    </nav>
  );
}

export default Navbar;
