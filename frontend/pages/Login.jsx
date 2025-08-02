import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { loginUser, registerUser } from '../api/authapi'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [login, setLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (formData) => {
    setIsLoading(true)
    try {
      const res = login ? await loginUser(formData) : await registerUser(formData)
      console.log(login ? 'Login success' : 'Register success', res)
      if (res.token) {
        localStorage.setItem('token', res.token)
        // In a real app, you'd redirect to dashboard here
      }
    } catch (err) {
      console.log(`Error:`, err.response?.data || err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative bg-black h-screen overflow-hidden flex items-center justify-center">
      {/* Animated streaks background */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 bg-gradient-to-r from-yellow-500 to-orange-600"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 20}%`,
              opacity: 0.7,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Login/Register Form */}
      <motion.div 
        className="relative z-10 bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            HABIT CLASH
          </motion.h1>
          <p className="text-orange-200">{login ? "Login to continue your streak!" : "Start your journey!"}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {!login && (
            <div className="mb-4">
              <label className="block text-orange-300 mb-2">Username</label>
              <input
                {...register("username", { required: true })}
                className="w-full px-4 py-2 bg-gray-800 border border-orange-500/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your username"
              />
              {errors.username && <span className="text-red-400 text-sm">Username is required</span>}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-orange-300 mb-2">Email</label>
            <input
              {...register("email", { required: true })}
              className="w-full px-4 py-2 bg-gray-800 border border-orange-500/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
            />
            {errors.email && <span className="text-red-400 text-sm">Email is required</span>}
          </div>

          <div className="mb-6">
            <label className="block text-orange-300 mb-2">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 bg-gray-800 border border-orange-500/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"
            />
            {errors.password && <span className="text-red-400 text-sm">Password is required</span>}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold py-3 px-4 rounded-lg shadow-lg mb-4"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : login ? "LOGIN" : "REGISTER"}
          </motion.button>

          <div className="text-center">
            <button 
              type="button"
              onClick={() => setLogin(!login)}
              className="text-orange-200 hover:text-yellow-400 text-sm"
            >
              {login ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute bottom-10 right-10 text-4xl"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🔥
      </motion.div>
      <motion.div
        className="absolute top-10 left-10 text-4xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        🏆
      </motion.div>
    </div>
  )
}

export default Login