import Navbar from "./Navbar";
import { motion } from "framer-motion";


function Home() {
    return (
      
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col">
      

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-grow flex flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 drop-shadow-md">
          Welcome to the User Management App
        </h1>
        <p className="text-lg md:text-xl text-gray-800 max-w-xl">
          Manage your profile, update your information, and experience seamless user control.
        </p>

        <motion.div
          className="mt-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            href="/profile"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            Go to Profile
          </a>
        </motion.div>
      </motion.div>
    </div>


    );
  }
  
  export default Home;