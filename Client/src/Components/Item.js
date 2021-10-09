import React, { useState, useContext } from "react";
import { CartContext } from "./CartContext";
import { AuthContext } from "./CartContext";
import AlertContext from "./AlertContext";
function Item(props) {
  const { isalert, showAlert } = useContext(AlertContext);
  const { auth, setAuth } = useContext(AuthContext);
  const { cart, setCart } = useContext(CartContext);
  const { name, product, originalRate, discountedRate, url, _id } =
    props.service;
  console.log(name, product);
  const [added, setAdded] = useState(false);
  const handleClick = (e) => {
    if (auth) {
      let _cart = { ...cart };
      if (!_cart.items) {
        _cart.items = {};
      }
      if (_cart.items[_id]) {
        _cart.items[_id] = _cart.items[_id] + 1;
      } else {
        _cart.items[_id] = 1;
      }
      if (!_cart.totalItems) {
        _cart.totalItems = 0;
      }
      _cart.totalItems++;

      console.log(_cart);
      setCart(_cart);
      e.preventDefault();
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 1500);
    } else {
      window.scrollTo(0, 0);
      showAlert("Please Login/Signup To Add Items To Cart", "danger");
    }
  };
  return (
    <div className="card  ">
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={url[0]} className="d-block " alt="..." />
          </div>
          <div className="carousel-item">
            <img src={url[1]} className="d-block " alt="..." />
          </div>
          <div className="carousel-item">
            <img src={url[2]} className="d-block  " alt="..." />
          </div>
        </div>
      </div>
      <div
        className="item-card"
        style={{ backgroundColor: "#f88d8d", color: "black" }}
      >
        <div>
          <h2 className="text-lg font-bold py-1 text-center">{name}</h2>
          <div className=" py-1 rounded-full  text-center">{product}</div>
        </div>
        <div className="flex  ml-10">
          <b className="line-through">₹{originalRate}</b>
          {"  "}
          <p className="ml-2">₹{discountedRate}</p>
        </div>
        <div className="flex  justify-center">
          {" "}
          <button
            className={`${added ? "bg-white text-black" : "bg-black text-white"}
                py-1   py-1 px-4 rounded-full font-bold absolute bottom-4`}
            onClick={handleClick}
          >
            ADD{added ? "ED" : ""}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
