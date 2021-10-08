import React from "react";
import { services } from "./Services";
import Item from "./Item";
function Home2() {
  return (
    <div className=" mx-auto pb-24  px-12">
      <h1 className="text-xxl font-bold pt-5 text-white ">Our Services</h1>
      <div className="grid grid-cols-4 griditem my-8 gap-24 gridcontainer">
        {services.map((service, i) => {
          return <Item service={service} />;
        })}
      </div>
    </div>
  );
}

export default Home2;
