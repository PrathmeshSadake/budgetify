import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(""); // Extract token from the URL

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/reset-password", { password, token });
      alert("Password has been reset successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className='w-full py-12 max-w-sm mx-auto' onSubmit={handleSubmit}>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'>
          <label
            className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
            htmlFor='password'
          >
            New Password
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
            id='password'
            type='password'
            value={password}
            onChange={handlePasswordChange}
            placeholder='Enter new password'
          />
        </div>
      </div>
      <div className='md:flex md:items-center'>
        <div className='md:w-1/3'></div>
        <div className='md:w-2/3'>
          <button
            className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
            type='submit'
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ResetPassword;
