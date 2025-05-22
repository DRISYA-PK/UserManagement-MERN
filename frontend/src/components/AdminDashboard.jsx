import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';

function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [newUser, setNewUser] = useState({ username: '', password: '', email: '', role: 'user' });
  const [editUser, setEditUser] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const [debouncedSearch] = useDebounce(search, 500);

  const fetchUsers = async () => {
    try {

      const response = await axios.get(`/api/users?search=${search}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearch]);


  const handleCreate = async (e) => {
    e.preventDefault();
    const usernameRegex = /^[A-Za-z]+$/;
    if(!usernameRegex.test(newUser.username)){
      toast.error("User name should be alphabets");
      return;
    }
    if(newUser.password.length < 5){
      toast.error("Password must have at least 5 letters");
      return;
    }

    try {

      await axios.post('/api/users', newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User created successfully");
      setNewUser({ username: '', password: '', email: '', role: 'user' });
      fetchUsers();
    } catch (error) {
      console.error(error);

      if (error.response?.status === 409) {
        toast.error("Email already exists. Please use a different one.");
      } else {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${editUser._id}`, editUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User updated successfully');
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update user');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete user');
    }
  };

  return (
   
    <div className="container mx-auto p-4 max-w-6xl">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center text-blue-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h1>

     
      <motion.div
        className="mb-12 bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Create New User</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Create User
          </button>
        </form>
      </motion.div>

      {/* Search */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </motion.div>

     
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-blue-600">User List</h2>
        <div className="overflow-auto">
          <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-blue-100 text-blue-800 text-left">
                <th className="p-3 border">Username</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <motion.tr
                  key={user._id}
                  className="hover:bg-blue-50 transition"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="p-3 border">{user.username}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.role}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => setEditUser(user)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

     
      <AnimatePresence>
        {editUser && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-blue-600">Edit User</h2>
              <form onSubmit={handleEdit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={editUser.username}
                  onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <select
                  value={editUser.role}
                  onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditUser(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>





  );
}

export default AdminDashboard;