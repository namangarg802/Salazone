import React, { useEffect, useContext } from "react";
import "../Style.css";
import { Link } from "react-router-dom";
import Home2 from "./Home2";
import Navbar from "./Navbar";
import { CartContext } from "./CartContext";
import { AuthContext } from "./CartContext";
import { NavContext } from "./CartContext";

import Alert from "./Alert";
function Home() {
  const { cart } = useContext(CartContext);
  const { auth, setAuth } = useContext(AuthContext);

  const { showNav, setNav } = useContext(NavContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(true);

      console.log("auth is true");
    } else {
      // history.push("/login")
      console.log("Auth is false");
    }
  });
  useEffect(() => {
    setNav(false);
  }, []);
  return (
    <div>
      <Navbar />

      <div className={showNav ? "mainpage" : ""}>
        <div className="home">
          <Alert />
          <section className="home-content  pl-20 pt-5 ">
            <div>
              <h1 className=" text-4xl md:text-6xl font-bold mb-5 text-white leading-10">
                Creating <br /> Your Beauty <br /> at next level
              </h1>
              <p className="text-xl text-white">
                Providing skin care advice and beauty services <br /> using
                natural products to cater for any skin
              </p>
              <div className="mt-5 ">
                <Link
                  to="/Cart"
                  className="rounded-full  text-black bkbtn  font-bold px-4 py-3 hover:bg-black hover:font-white"
                  style={{
                    backgroundColor: "#f88d8d",
                    textDecoration: "none",
                    fontSize: "24px",
                  }}
                >
                  Book Appointment
                </Link>
              </div>
            </div>
            {/* <Link style={{ textDecoration: "none" }}>
            <div
              className="items-center cartimg w-15 "
              style={{
                position: "fixed",
                right: "30px",
                zIndex: "2000",
                backgroundColor: "#f88d8d",
                display: "flex",
                padding: "6px 12px",
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
          </Link> */}
          </section>
        </div>
        <div style={{ backgroundColor: " #212121" }}>
          <Home2 />
        </div>
      </div>
    </div>
  );
}

export default Home;
