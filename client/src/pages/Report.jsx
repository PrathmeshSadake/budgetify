import axios from "axios";
import { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
const ExpenseReport = () => {
  const tableRef = useRef();
  const [expensesByMonth, setExpensesByMonth] = useState([]);

  useEffect(() => {
    try {
      const getExpenses = async () => {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/expenses/report`,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        setExpensesByMonth(data);
      };
      getExpenses();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return (
    <div className='py-12 max-w-7xl mx-auto'>
      <ReactToPrint
        trigger={() => (
          <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Download PDF
          </button>
        )}
        content={() => tableRef.current}
      />

      <div className='p-6 bg-white' ref={tableRef}>
        <h1 className='text-3xl font-bold mb-6'>Monthly Expenses</h1>
        {expensesByMonth.map(({ month, expenses }) => (
          <div key={month} className='mb-8'>
            <h2 className='text-2xl font-bold mb-4'>{month}</h2>
            <table className='table-auto w-full'>
              <thead>
                <tr>
                  <th className='px-4 py-2'>Date</th>
                  <th className='px-4 py-2'>Expense</th>
                  <th className='px-4 py-2'>Description</th>
                  <th className='px-4 py-2'>Expense Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index}>
                    <td className='border px-4 py-2'>
                      {formatDate(expense.createdAt)}
                    </td>
                    <td className='border px-4 py-2'>{expense.expense}</td>
                    <td className='border px-4 py-2'>{expense.description}</td>
                    <td className='border px-4 py-2'>{expense.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseReport;
