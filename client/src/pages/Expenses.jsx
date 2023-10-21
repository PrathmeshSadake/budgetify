import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Expenses = () => {
  const [expense, setExpense] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/expenses?page=${currentPage}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      setExpenses(response.data.expenses);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
      <div className='w-full max-w-2xl'>
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
              <th className='px-4 py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className='border px-4 py-2'>{expense.expense}</td>
                <td className='border px-4 py-2'>{expense.description}</td>
                <td className='border px-4 py-2'>{expense.price}</td>
                <td className='border px-4 py-2'>
                  <button
                    // onClick={() => handleUpdate(item.id)}
                    className='text-blue-500 hover:text-blue-700'
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    // onClick={() => handleDelete(item.id)}
                    className='text-red-500 hover:text-red-700 ml-2'
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-center my-4'>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-2 px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
