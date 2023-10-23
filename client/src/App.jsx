import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Expenses from "./pages/Expenses";
import ExpenseReport from "./pages/Report";
import Navbar from "./ components/Navbar";
import UpdateExpenses from "./pages/UpdateExpenses";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Expenses />} />
        <Route path='/report' element={<ExpenseReport />} />
        <Route path='/update-expense/:id' element={<UpdateExpenses />} />

        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
