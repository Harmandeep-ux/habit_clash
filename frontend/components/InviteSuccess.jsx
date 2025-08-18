import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const InviteSuccess = () => {
  const location = useLocation();
  const { username, challengeId } = location.state || {};

  // Fallback if accessed directly without state
  useEffect(() => {
    if (!username) {
      // You might want to redirect or handle this case differently
      console.warn("No invite data found");
    }
  }, [username]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 max-w-md w-full text-center relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500 rounded-full opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500 rounded-full opacity-10"></div>
        
        <div className="relative z-10">
          <div className="mb-6">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-4 inline-block"
            >
              🎉
            </motion.div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
              Invite Sent!
            </h1>
            <p className="text-gray-300 mb-1">
              Your invitation is on its way
            </p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 mb-6 border border-gray-600">
            <p className="mb-2">
              To: <span className="font-semibold text-orange-400">{username || "Friend"}</span>
            </p>
            {challengeId && (
              <p>
                Challenge: <span className="font-semibold text-yellow-400">{challengeId}</span>
              </p>
            )}
          </div>

          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 hover:from-orange-600 hover:to-yellow-600 transition-all group"
          >
            Go Back Home
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-sm text-gray-400"
      >
        The invitation will expire in 7 days
      </motion.p>
    </motion.div>
  );
};

export default InviteSuccess;