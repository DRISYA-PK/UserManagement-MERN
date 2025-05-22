import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { Menu, X } from 'lucide-react'; // for toggle icons
import { useState } from 'react';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem('auth');
    
    navigate('/login');
  };

  return (
   
    <nav className="bg-blue-700 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        
        <Link to="/" className="text-white text-2xl font-bold">UserApp</Link>

       
        <div className="hidden md:flex space-x-6 text-white items-center font-medium">
          <Link to="/" className="hover:text-blue-200 transition">Home</Link>
          <Link to="/profile" className="hover:text-blue-200 transition">Profile</Link>
          {role === 'admin' && (
            <Link to="/admin" className="hover:text-blue-200 transition">Admin Dashboard</Link>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>

       
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-blue-600 text-white px-4 pb-4 space-y-3 font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-blue-200 transition">Home</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)} className="block hover:text-blue-200 transition">Profile</Link>
          {role === 'admin' && (
            <Link to="/admin" onClick={() => setMenuOpen(false)} className="block hover:text-blue-200 transition">Admin Dashboard</Link>
          )}
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>




  );
}

export default Navbar;