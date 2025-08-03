import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../src/context/AuthContext";
import {useNavigate} from 'react-router-dom'


const Landing = () => {
  const [activeText, setActiveText] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
 const { isAuthenticated } = useAuth();
const navigate = useNavigate()

  const phrases = [
    "CHALLENGE FRIENDS.",
    "BUILD STREAKS.",
    "BECOME THE LEADER.",
    "HABIT CLASH."
  ];


  const handleStartClick = ()=>{
    if(isAuthenticated){
      navigate('/home')
    }else{
      navigate('/login')
    }
  }
  // Pre-calculated streak positions for better performance
  const streaks = useMemo(() => 
    Array.from({ length: 10 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 100 + 20}%`,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
      xMovement: Math.random() * 200 - 100
    }))
  , []);

  // Rotate phrases every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveText((prev) => (prev + 1) % phrases.length);
      if (activeText === phrases.length - 1) setShowCTA(true);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeText]);

  return (
    <div className="relative bg-black h-screen overflow-hidden flex items-center justify-center">
      {/* Optimized Background: Reduced number of streaks and simplified animation */}
      <div className="absolute inset-0">
        {streaks.map((streak, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 bg-gradient-to-r from-yellow-500 to-orange-600"
            style={{
              top: streak.top,
              left: streak.left,
              width: streak.width,
              opacity: 0.7,
            }}
            initial={{ x: 0, opacity: 0.3 }}
            animate={{ x: streak.xMovement, opacity: 0.8 }}
            transition={{
              duration: streak.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: streak.delay,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        <AnimatePresence mode="wait">
          <motion.h1
            key={activeText}
            className="text-6xl md:text-8xl font-extrabold mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              {phrases[activeText]}
            </span>
          </motion.h1>
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button onClick={handleStartClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold py-4 px-8 rounded-full text-xl shadow-lg shadow-orange-500/30"
              >
                 START CLASHING NOW
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute bottom-10 right-10 text-6xl"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🏆
      </motion.div>

      <motion.div
        className="absolute top-10 left-10 text-5xl"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        🔥
      </motion.div>
    </div>
  );
};

export default Landing;