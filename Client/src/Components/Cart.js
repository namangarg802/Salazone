import { useContext, useEffect, useState } from "react";

import { CartContext } from "./CartContext";
import { arrayContext } from "./CartContext";
import { NavContext } from "./CartContext";
import { Link } from "react-router-dom";
import { services } from "./Services";
import AlertContext from "./AlertContext";
import Alert from "./Alert";
import "../Style.css";
import Navbar from "./Navbar";
function Cart() {
  const [products, setproducts] = useState([]);
  let total = 0;
  const { isalert, showAlert } = useContext(AlertContext);
  const { cart, setCart } = useContext(CartContext);
  const { showNav, setNav } = useContext(NavContext);
  const { array } = useContext(arrayContext);
  const [itemsName, setItemsName] = useState([""]);
  // const {OrderPrice,setOrderPrice}= useContext(PriceContext)
  console.log(cart.totalItems);
  console.log(cart);
  useEffect(() => {
    setNav(false);
  }, []);
  useEffect(() => {
    if (cart.totalItems === 0) {
      console.log("empty");
      return (
        <img
          className="mx-auto w-3/4 mt-12"
          src="/images/emptycart.jpg"
          alt=""
        />
      );
    } else {
      //    console.log(Object.keys(cart.items));

      Object.keys(cart.items).map((m, i) => {
        services.map((service, j) => {
          if (service._id === m) {
            array.push(service.name);
            console.log(service.name, "jkj");
            console.log(array);

            if (products) {
              products.push(service);
              console.log("naman", i, j);
            }
            console.log(service.name);
          }
        });
      });
    }
    console.log("jioi", array);
  }, [cart]);

  console.log(services);

  const getquantity = (product) => {
    return cart.items[product._id];
  };

  const increment = (product) => {
    console.log(itemsName);
    const oldqty = cart.items[product._id];
    const _cart = { ...cart };
    _cart.items[product._id] = oldqty + 1;
    _cart.totalItems++;
    setCart(_cart);
  };
  const decrement = (product) => {
    const oldqty = cart.items[product._id];
    const _cart = { ...cart };

    if (oldqty === 1) {
      return;
    }
    _cart.items[product._id] = oldqty - 1;
    _cart.totalItems--;
    setCart(_cart);
  };
  const getSum = (product) => {
    const p = product.discountedRate;
    const _cart = { ...cart };
    const sum = p * getquantity(product);
    let t = 0;
    sum ? (total = total + sum) : (t = 1);
    // setOrderPrice(total);
    //   OrderPrice=sum;
    return sum;
  };
  const Ondelete = (productid) => {
    showAlert("Item Deleted From Cart", "success");
    const _cart = { ...cart };
    const oldqty = _cart.items[productid];
    delete _cart.items[productid];
    console.log(cart.items);

    _cart.totalItems = _cart.totalItems - oldqty;

    setCart(_cart);
  };
  const orderNow = () => {
    <paymentForm />;
  };
  console.log(products);
  return (
    <div>
      <Navbar />
      <Alert />
      {cart.totalItems ? (
        <div>
          <div
            className="container mb-10 pr-20 "
            className={showNav ? "mainpage" : ""}
          >
            <h1 className="font-bold my-5  mx-40 font">Cart Items</h1>
            <ul>
              {services.map((service, i) => {
                if (cart.items[service._id]) {
                  return (
                    <li className="mb-12" key={i}>
                      <div className="maincart ">
                        <div className=" maincontent  ">
                          <img
                            className="maincartimg ml-5 "
                            src={service.url[0]}
                            alt=""
                          />
                          <span className="ml-5 font-bold text-xl font ">
                            {service.name}
                          </span>
                        </div>
                        <div className="cartcontainer">
                          <button
                            onClick={() => decrement(service)}
                            className=" py-2 px-4 rounded-full addbtn leading-none hover:bg-black"
                          >
                            -
                          </button>
                          <span className="font-bold px-4">
                            {getquantity(service) ? getquantity(service) : 0}
                          </span>
                          <button
                            onClick={() => increment(service)}
                            className=" py-2 px-4 rounded-full addbtn leading-none"
                          >
                            +
                          </button>
                        </div>
                        <div className="cartbtn">
                          <span className="font m-10">
                            {getquantity(service) ? getSum(service) : 0}
                          </span>
                          <button
                            onClick={() => Ondelete(service._id)}
                            className="bg-red-500 px-4 py-2 rounded-full addbtn leading-none"
                          >
                            <i class="fas fa-trash mr-2"></i>Delete
                          </button>
                        </div>
                      </div>

                      {}
                    </li>
                  );
                }
              })}
            </ul>
            <hr className="my-6" />
            <div className="order">
              <div className="text-right pr-20">
                {" "}
                <span className="font-bold">
                  {" "}
                  <b>TOTAL PRICE:</b>
                  {total}
                </span>
              </div>
              <div className="text-right mt-6 pr-20 mb-5">
                <Link
                  to="/BookAppointment"
                  className=" addbtn px-4 py-4 rounded-full "
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={showNav ? "mainpage" : ""}>
          <div style={{ fontFamily: "sans-serif" }} className="emptycart">
            <h1 className=" mt-3 text-4xl font-bold">Cart Empty</h1>
            <div
              style={{ backgroundColor: "#f88d8d" }}
              className=" rounded-full  font-bold p-2 hover:bg-black hover:text-white"
            >
              <Link to="/Services" className=" text-black no-underline">
                Add Items
              </Link>
            </div>

            <img
              className="mx-auto mb-5 emptycartimg mt-5"
              src="/images/emptycart.jpg"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
