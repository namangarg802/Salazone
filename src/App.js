import "./App.css";
import { useState, useEffect, useContext } from "react";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { CartContext } from "./Components/CartContext";
import { AuthContext } from "./Components/CartContext";
import Cart from "./Components/Cart";
import Appointment from "./Components/Appointment";
import servicespage from "./Components/servicespage";
function App() {
  const [auth, setAuth] = useState(false);
  const [cart, setCart] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem("makeupcart")) || { items: {} }
    );
  });
  useEffect(() => {
    const cart = window.localStorage.getItem("makeupcart");
    console.log(JSON.parse(cart));
    if (localStorage.getItem("token")) {
      setAuth(true);
      console.log("auth is true");
    } else {
      // history.push("/login")
      console.log("Auth is false");
    }
  });
  console.log(auth);
  useEffect(() => {
    window.localStorage.setItem("makeupcart", JSON.stringify(cart));
    // const my = window.localStorage.getItem("makeupcart");
  }, [cart]);
  return (
    <div>
      <Router>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <CartContext.Provider value={{ cart, setCart }}>
            <Switch>
              <Route path="/" component={Home} exact></Route>
              <Route path="/Signup" exact component={Signup}></Route>
              <Route path="/Login" exact component={Login}></Route>
              <Route path="/Cart" exact component={Cart}></Route>
              <Route path="/Services" exact component={servicespage}></Route>
              <Route
                path="/BookAppointment"
                exact
                component={Appointment}
              ></Route>
            </Switch>
          </CartContext.Provider>
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
