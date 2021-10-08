import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
function Login() {
  const history = useHistory();
  const [details, setDetais] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setDetais({ ...details, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: details.email,
        password: details.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // save auth token in local storage and redirect
      localStorage.setItem("token", json.jwttoken);
      console.log(json);
      // showAlert("Logged In successfully","success")
      history.push("/");
    } else {
      // showAlert("Invalid Credentials","danger")
      console.log("error");
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
        className="loginmodalbox mt-10  flex flex-col  "
        style={{ backgroundColor: "#fff" }}
      >
        <h3
          style={{
            color: "#999999",
            fontSize: "30px",
            marginLeft: "40px",
            marginTop: "40px",
          }}
        >
          Enter Your Login Credentials
        </h3>
        <div className="ml-20 mt-10">
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="" style={{ fontSize: "24px" }}>
              Enter your email address:
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
              Enter Your Password:
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
            <br />

            <button
              className="rounded-full  text-black  font-bold px-4 py-3 ml-40 hover:bg-black hover:font-white"
              style={{
                backgroundColor: "#f88d8d",
                textDecoration: "none",
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              Log In
            </button>
          </form>
          <p className="ml-40 ">
            Don't have an account? <Link to="Signup">Signup</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
