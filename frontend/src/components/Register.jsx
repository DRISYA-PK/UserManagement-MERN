import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';


function Register() {
  const [userData, setUserData] = useState({ username: '', password: '', email: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const usernameRegex = /^[A-Za-z]+$/;

    if(!usernameRegex.test(userData.username)){
      toast.error("Username should contain only alphabets");
      return;
    }
    if(userData.password.length < 5){
      toast.error("Password must be at least 5 letters");
      return ;
    }

    try {
      await axios.post('/api/auth/register', userData);
      toast.success("Account created  successfully");
      navigate('/login');
    } catch (error) {
      console.error(error);
      
      if (error.response?.status === 409) {
        toast.error("Email already exists. Please use a different one.");
      } else {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Create an Account</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Register
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Already have an account?
          <Link to="/login" className="text-blue-600 hover:underline ml-1">Login</Link>
        </p>
      </motion.div>
    </div>



  );
}

export default Register;