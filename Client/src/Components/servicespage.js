import React, { useContext } from "react";
import Home2 from "./Home2";
import Navbar from "./Navbar";
import { NavContext } from "./CartContext";
import { useEffect } from "react/cjs/react.development";

import "../Style.css";
function Servicespage() {
  const { showNav, setNav } = useContext(NavContext);

  useEffect(() => {
    setNav(false);
  }, []);
  return (
    <div style={{ backgroundColor: " #212121" }}>
      <Navbar />
      <div className={showNav ? "mainpage" : ""}>
        <div>
          {" "}
          <Home2 />
        </div>
      </div>
    </div>
  );
}

export default Servicespage;
