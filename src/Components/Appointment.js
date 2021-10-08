import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import Calendar from "react-calendar";
import { services } from "./Services";
import "react-calendar/dist/Calendar.css";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import Navbar from "./Navbar";

function Appointment() {
  let name = [];
  const { cart, setCart } = useContext(CartContext);
  useEffect(() => {
    Object.keys(cart.items).map((m, i) => {
      console.log(i, m);
      services.map((service) => {
        if (service._id == m) {
          name.push(service.name);
          console.log(name);
        }
      });
    });
  }, []);
  const [value, onChange] = useState(new Date());
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(value)
    );
  }, [value]);
  console.log(date);
  //   const location = useLocation;
  //   const { itemsName } = location.itemsname;
  //   console.log(itemsName);
  const selectTime = (e) => {
    console.log(e.target.value);
    setTime(e.target.value);
  };
  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:5000/api/BookAppointment/BookAppointment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          services: name,
          AppointmentDate: date,
          AppointmentTime: time,
        }),
      }
    );
    const appointment = await response.json();
    console.log("booked", appointment);
  };

  return (
    <div style={{ backgroundColor: "" }}>
      <Navbar />
      <div className="flex ">
        <div className="mt-3 flex items-center flex-col ml-40">
          <h1 className=" ">Select Appointment Date</h1>
          <Calendar onChange={onChange} value={value} />
        </div>
        <div className="mt-3 ml-20">
          <h1>Select Time</h1>
          <select
            name=""
            id=""
            onChange={(e) => {
              selectTime(e);
            }}
          >
            <option value="10 A.M.">10 A.M.</option>
            <option value="11 A.M.">11 A.M.</option>
            <option value="12 P.M.">12 P.M.</option>
            <option value="01 P.M.">01 P.M.</option>
            <option value="02 P.M.">02 P.M.</option>
            <option value="03 P.M.">03 P.M.</option>
            <option value="04 P.M.">04 P.M.</option>
            <option value="05 P.M.">05 P.M.</option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5 ">
        {" "}
        {date && time ? (
          <button
            onClick={handleClick}
            to="/"
            className="no-underline py-3 px-3 rounded-full text-black font-bold"
            style={{ backgroundColor: "#f88d8d" }}
          >
            Conform Booking At {` ${time} on ${date}`}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Appointment;
