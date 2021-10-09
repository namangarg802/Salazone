import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { NavContext } from "./CartContext";
import AlertContext from "./AlertContext";
import Calendar from "react-calendar";
import { services } from "./Services";
import { useHistory } from "react-router";
import "react-calendar/dist/Calendar.css";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import Navbar from "./Navbar";
import Alert from "./Alert";

function Appointment() {
  let name = [];
  const history = useHistory();
  const { cart, setCart } = useContext(CartContext);
  const [user, setUser] = useState({});
  const { showNav, setNav } = useContext(NavContext);
  const [value, onChange] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [customer, setCustomer] = useState(false);
  const [edit, setEdit] = useState(false);
  const { isalert, showAlert } = useContext(AlertContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    getUser();
  }, []);
  const getUser = async () => {
    //Api call for getting User details
    const response = await fetch("http://localhost:5000/api/auth/fetchuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUser(json);
    console.log(json);
  };
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
    const json = await response.json();
    console.log("booked", json);
    if (json.success) {
      showAlert("Appointemnt Booked", "success");
      setTimeout(() => {
        history.push("/");
      }, 1500);
      console.log("success");
    } else {
      showAlert(json.error, "danger");
      console.log("invalid");
    }
  };

  return (
    <div>
      <Navbar />
      <div className={showNav ? "mainpage" : ""}>
        <div className="sidenav">
          <h1>Salazone</h1>
          <ul className="outerul">
            <li className="outerli">
              {" "}
              <button onClick={() => setCustomer(!customer)}>
                {" "}
                Customer Details <span className="fas fa-caret-down"></span>{" "}
              </button>
              <ol className="innerol" className={customer ? "show" : "notshow"}>
                <li className="innerli">{user.name}</li>
                <li className="innerli">{user.email}</li>
                <li className="innerli">{user.mobileno}</li>
              </ol>
            </li>
            <li className="outerli">
              <button onClick={() => setEdit(!edit)}>
                {" "}
                Appointment Details <span className="fas fa-caret-down"></span>{" "}
              </button>
              <ol className="innerol" className={edit ? "show" : "notshow"}>
                <li className="innerli">Date:{date ? date : "Not Selected"}</li>
                <li className="innerli">Time:{time ? time : "Not Selected"}</li>
              </ol>
            </li>
          </ul>
        </div>
        <Alert />
        <div className="ml-40 appoint-outer">
          <div className="flex appoint-main ">
            <div className="flex items-center flex-col date-selector ">
              <h1 className=" ">Select Appointment Date</h1>
              <Calendar onChange={onChange} value={value} />
            </div>
            <div className="mt-3 ml-20 time-selector">
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
          <div className="flex items-center justify-center mt-4 ">
            {" "}
            {date && time ? (
              <button
                onClick={handleClick}
                to="/"
                className="no-underline py-3 px-3 mb-4 rounded-full text-black font-bold book-btn"
                style={{ backgroundColor: "#f88d8d" }}
              >
                Conform Booking At {` ${time} on ${date}`}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
