import { useState, useEffect } from "react";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
const ExpenseReport = () => {
  const [expensesByMonth, setExpensesByMonth] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch("http://localhost:8080/expenses")
      .then((response) => response.json())
      .then((data) => {
        // Organize the data by month
        const groupedByMonth = {};
        data.forEach((expense) => {
          const date = new Date(expense.createdAt);
          const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
          if (!groupedByMonth[monthYear]) {
            groupedByMonth[monthYear] = [];
          }
          groupedByMonth[monthYear].push(expense);
        });

        // Sort the expenses by createdAt within each month
        for (const month in groupedByMonth) {
          groupedByMonth[month].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
        }

        // Convert the object to an array for easier rendering
        const sortedExpenses = Object.keys(groupedByMonth)
          .sort()
          .map((key) => ({
            month: key,
            expenses: groupedByMonth[key],
          }));
        setExpensesByMonth(sortedExpenses);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6'>Monthly Expenses</h1>
      {expensesByMonth.map(({ month, expenses }) => (
        <div key={month} className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>{month}</h2>
          <table className='table-auto'>
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
  );
};

export default ExpenseReport;
