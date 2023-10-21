import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useRazorpay from "react-razorpay";

const Expenses = () => {
  const [expense, setExpense] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [expenses, setExpenses] = useState([]);

  const [Razorpay] = useRazorpay();

  const handlePayment = useCallback(async () => {
    const order = await axios.post(
      "http://localhost:8080/payment/create-order"
    );

    const options = {
      key: "rzp_test_7Db7bFMnKZjUdl",
      amount: "3000",
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      order_id: order.id,
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/expenses", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  console.log(expenses);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return console.log("Login before creating expense");
    }
    try {
      await axios.post(
        "http://localhost:8080/expenses",
        {
          expense,
          description,
          price,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setExpense("");
      setDescription("");
      setPrice("");
      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <form
          onSubmit={handleAddExpense}
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='expense'
            >
              Expense
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='expense'
              type='text'
              placeholder='Expense'
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='description'
            >
              Description
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='description'
              type='text'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='price'
            >
              Price
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='price'
              type='text'
              placeholder='Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Add Expense
            </button>
          </div>
        </form>

        <table className='table-auto w-full bg-white shadow-md rounded mb-4'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Expense</th>
              <th className='px-4 py-2'>Description</th>
              <th className='px-4 py-2'>Price</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className='border px-4 py-2'>{expense.expense}</td>
                <td className='border px-4 py-2'>{expense.description}</td>
                <td className='border px-4 py-2'>{expense.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handlePayment}>Click</button>
    </div>
  );
};

export default Expenses;
