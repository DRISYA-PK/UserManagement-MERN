import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAuth } from '../features/auth/authSlice';
import { toast } from 'react-toastify';


function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', credentials);

      const authData = { token: response.data.token, role: response.data.role }; //new added to persist state

      dispatch(setAuth({ token: response.data.token, role: response.data.role }));

      
      localStorage.setItem('auth', JSON.stringify(authData));

      toast.success('Login successful !');
      navigate(response.data.role === 'admin' ? '/admin' : '/',{replace:true});
    } catch (error) {
      console.error(error);
      toast.error("Invalid username or password");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
    <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Welcome Back</h1>
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Login
      </button>
    </form>
    <p className="mt-6 text-center text-sm text-gray-700">
      Don’t have an account?
      <Link to="/register" className="text-blue-600 hover:underline ml-1">Register</Link>
    </p>
   </div>
  </div>

  );
}

export default Login;