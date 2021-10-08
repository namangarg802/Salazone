import React, { useState, useContext } from "react";
import { CartContext } from "./CartContext";
function Item(props) {
  const { cart, setCart } = useContext(CartContext);
  const { name, product, originalRate, discountedRate, url, _id } =
    props.service;
  console.log(name, product);
  const [added, setAdded] = useState(false);
  const handleClick = (e) => {
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
            <img src={url[0]} className="d-block w-60 h-40" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={url[1]} className="d-block w-60 h-40" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={url[2]} className="d-block  w-60 h-40" alt="..." />
          </div>
        </div>
      </div>
      <div
        className="h-40"
        style={{ backgroundColor: "#f88d8d", color: "black" }}
      >
        <div>
          <h2 className="text-lg font-bold py-1 text-center">{name}</h2>
          <div className=" py-2 rounded-full  text-center">{product}</div>
        </div>
        <div className="flex  mt-2 ml-10">
          <b className="line-through">₹{originalRate}</b>
          {"  "}
          <p className="ml-2">₹{discountedRate}</p>
          <button
            className={`${added ? "bg-white text-black" : "bg-black text-white"}
                py-1    py-1 px-4 rounded-full font-bold`}
            style={{ position: "absolute", bottom: "3px", left: "70px" }}
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
