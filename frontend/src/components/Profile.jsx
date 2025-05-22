import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../features/auth/authSlice';
import {motion} from 'framer-motion'
import { toast } from 'react-toastify';

function Profile() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUser(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [token, dispatch]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profileImage', file);
    try {
      await axios.post('/api/users/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const response = await axios.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUser(response.data));
      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    }
  };

  return (
    
  <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl"
    >
      <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-6">
        Profile
      </h1>

      {user && (
        <div className="space-y-6 text-center">
          <div>
            {user.profileImage && (
              <motion.img
                src={`http://localhost:5000/${user.profileImage}`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mx-auto shadow-md border-4 border-blue-300"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
          <div className="text-lg text-gray-700">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          <form onSubmit={handleFileUpload} className="space-y-4">
           
            <div className="relative w-full">
              <input
                id="profileImage"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
                className="hidden"
              />
              <label
                htmlFor="profileImage"
                className="block cursor-pointer w-full py-2 px-4 rounded-full bg-blue-600 text-white font-semibold text-center hover:bg-blue-700 transition"
              >
               Choose Image
              </label>
            </div>


            <motion.button
              type="submit"
              disabled={!file}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                file
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              Upload Profile Image
            </motion.button>
          </form>
        </div>
      )}
    </motion.div>
  </div>



  );
}

export default Profile;