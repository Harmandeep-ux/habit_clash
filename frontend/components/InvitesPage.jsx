import { useEffect, useState } from "react";
import { acceptInvite, rejectInvite } from "../api/ChallengeApi";
import axiosInstance from "../api/api";
import { motion } from "framer-motion";
import { Mail, CheckCircle, XCircle } from "lucide-react";

const InvitesPage = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // fetch pending invites
  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const { data } = await axiosInstance.get("/challenge/my-invites");
        setInvites(data); // backend should return only pending invites
      } catch (err) {
        console.error(err);
      }
    };
    fetchInvites();
  }, []);

  const handleAccept = async (id) => {
    try {
      setLoading(true);
      const res = await acceptInvite(id);
      setMessage(res); // "invite accepted"
      setInvites(invites.filter((inv) => inv._id !== id)); // remove from list
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error accepting invite");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id) => {
    try {
      setLoading(true);
      const res = await rejectInvite(id);
      setMessage(res?.msg || "Invite rejected");
      setInvites(invites.filter((inv) => inv._id !== id)); // remove from list
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error rejecting invite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <motion.h1 
        className="text-3xl font-extrabold mb-6 flex items-center gap-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Mail className="text-orange-400" /> My Invites
      </motion.h1>

      {message && (
        <motion.p 
          className="mb-6 text-green-400 font-medium bg-green-900/40 px-4 py-2 rounded-lg inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message}
        </motion.p>
      )}

      {invites.length === 0 ? (
        <motion.p 
          className="text-gray-400 text-lg mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🎉 No pending invites. You're all caught up!
        </motion.p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {invites.map((inv, i) => (
            <motion.div
              key={inv._id}
              className="bg-gray-800/80 border border-gray-700 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div>
                <h2 className="text-xl font-semibold text-orange-300">
                  {inv.name}
                </h2>
                <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                  {inv.description}
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <motion.button
                  onClick={() => handleAccept(inv._id)}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-black shadow hover:scale-105 transition"
                  whileTap={{ scale: 0.95 }}
                >
                  <CheckCircle size={18} /> Accept
                </motion.button>
                <motion.button
                  onClick={() => handleReject(inv._id)}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-red-500 to-rose-600 text-black shadow hover:scale-105 transition"
                  whileTap={{ scale: 0.95 }}
                >
                  <XCircle size={18} /> Reject
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvitesPage;
