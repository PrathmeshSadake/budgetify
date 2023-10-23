import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useRazorpay from "react-razorpay";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState(10000);
  const [Razorpay] = useRazorpay();

  useEffect(() => {
    // Fetch token from local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);
  const handleLogout = () => {
    // Function to handle logout
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handlePayment = useCallback(async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/razorpay/orders",
        {
          amount,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setOrderId(response.data.id);
      setAmount(response.data.amount);

      const options = {
        key: "rzp_test_7Db7bFMnKZjUdl",
        amount: amount,
        currency: "INR",
        name: "Budgetify",
        description: "Budgetify Premium",
        order_id: orderId,
        handler: function (response) {
          if (response.razorpay_payment_id) {
            console.log(localStorage.getItem("token"));
            axios.put(
              `http://localhost:8080/razorpay/upgradeToPro?payment_id=${response.razorpay_payment_id}`,
              {},
              {
                headers: {
                  "x-auth-token": localStorage.getItem("token"),
                },
              }
            );
          }
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }, [Razorpay, amount, orderId]);

  return (
    <nav className='w-full flex items-center justify-between flex-wrap bg-blue-500 p-2'>
      <Link to='/' className='flex items-center flex-shrink-0 text-white mr-6'>
        <span className='font-semibold text-xl tracking-tight'>Budgetify</span>
      </Link>
      <div className=''>
        <div className='text-sm lg:flex-grow lg:justify-end'>
          {isLoggedIn ? (
            <div className='flex space-x-2'>
              <button
                onClick={handleLogout}
                className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0'
              >
                Logout
              </button>
              <button
                onClick={handlePayment}
                className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-indigo-800 hover:bg-white mt-4 lg:mt-0'
              >
                Pro Version
              </button>
              <Link
                to={"/report"}
                className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-indigo-800 hover:bg-white mt-4 lg:mt-0'
              >
                Download Report
              </Link>
            </div>
          ) : (
            <div className='flex space-x-2'>
              <Link
                to={"/login"}
                className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0'
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0'
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
