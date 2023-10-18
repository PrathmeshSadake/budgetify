import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Expenses from "./pages/Expenses";

const App = () => {
  return (
    <Routes>
      <Route exact path='/' component={Expenses} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
    </Routes>
  );
};

export default App;
