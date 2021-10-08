import React, { useState } from "react";
import "../Style.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
function Signup() {
  const history = useHistory();
  const [details, setDetais] = useState({
    name: "",
    email: "",
    password: "",
    mobileno: "",
  });

  const handleChange = (e) => {
    setDetais({ ...details, [e.target.name]: e.target.value });
    console.log(details);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: details.name,
        email: details.email,
        password: details.password,
        mobileno: details.mobileno,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save auth token in local storage and redirect
      localStorage.setItem("token", json.jwttoken);
      setTimeout(() => {
        history.push("/");
      }, 1500);
      console.log("success");
    } else {
      console.log("invalid");
    }
    console.log(details);
  };
  return (
    <section className="flex   Login  " style={{ backgroundColor: "#f88d8d" }}>
      <img
        style={{
          height: "400px",
          width: "400px",
          margin: "100px 40px 0px 50px",
        }}
        src="/images/logo.png"
        alt="Pizza House"
      />
      <div
        className="modalbox mt-8  flex flex-col justify-center "
        style={{ backgroundColor: "#fff" }}
      >
        <h3
          style={{
            color: "#999999",
            fontSize: "30px",
            marginLeft: "70px",
          }}
        >
          INTRODUCE YOURSELF
        </h3>
        <form action="" onSubmit={handleSubmit} style={{ marginLeft: "100px" }}>
          <label htmlFor="" style={{ fontSize: "24px" }}>
            Hi there! My name is
          </label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={details.name}
            onChange={handleChange}
            required
            className="shadow"
          />
          <br />
          <label htmlFor="" style={{ fontSize: "24px" }}>
            Here’s my email address:
          </label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            value={details.email}
            onChange={handleChange}
            required
            className="shadow"
          />
          <br />
          <label htmlFor="" style={{ fontSize: "24px" }}>
            And here’s my password:
          </label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={details.password}
            onChange={handleChange}
            required
            className="shadow"
          />
          <br />
          <label htmlFor="" style={{ fontSize: "24px" }}>
            And here’s my Mobile No:
          </label>
          <br />
          <input
            type="number"
            id="mobileno"
            name="mobileno"
            value={details.mobileno}
            onChange={handleChange}
            required
            className="shadow"
          />

          <br />
          <div className="mt-3 ml-40">
            <button
              className="rounded-full  text-black  font-bold px-4 py-3 hover:bg-black hover:font-white"
              style={{
                backgroundColor: "#f88d8d",
                textDecoration: "none",
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="ml-40 ">
          Already have an account? <Link to="Login">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;
