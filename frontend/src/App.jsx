// import React from 'react'

// const App = () => {
//   return (
//     <div>
//        <h1 class="text-3xl font-bold underline">
//         Hello world!
//       </h1>

//     </div>
//   )
// }

// export default App





import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import GuestRoute from './protection/GuestRoute';
import ProtectedRoute from './protection/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { role } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen bg-gray-100">
        {role && <Navbar />}
        <Routes>
          <Route path="/login" element={ <GuestRoute><Login /></GuestRoute> } />
          <Route path="/register" element={ <GuestRoute><Register /></GuestRoute> } />
          <Route path="/" element={ <ProtectedRoute><Home /></ProtectedRoute> } />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute> }  />
          {role === 'admin' && <Route path="/admin" element={ <ProtectedRoute><AdminDashboard /></ProtectedRoute> } />}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;