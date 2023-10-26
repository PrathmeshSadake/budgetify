import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateExpenses = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expenseData, setExpenseData] = useState(null);

  const [expense, setExpense] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    // Fetch token from local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    const getExpense = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/expenses/${id}`,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );

        setExpenseData(data);
        setExpense(data.expense);
        setDescription(data.description);
        setPrice(data.price);
      } catch (error) {
        console.error(error);
      }
    };

    getExpense();
  }, [id, isLoggedIn]);

  if (!isLoggedIn) {
    navigate("/login");
  }

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return console.log("Login before creating expense");
    }
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/expenses/${id}`,
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
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4'>
      {expenseData && (
        <div className='w-full max-w-2xl'>
          <form
            onSubmit={handleUpdateExpense}
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
                Update Expense
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateExpenses;
