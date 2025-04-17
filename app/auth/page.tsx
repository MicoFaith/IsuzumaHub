"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Home } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="min-h-screen bg-blue-500 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-white p-3 border border-white/30 rounded-md inline-flex">
          <Home className="h-5 w-5" />
        </Link>
      </div>

      <div className="text-white mb-8 flex items-center">
        <div className="mr-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold">IsuzumaHub</h1>
      </div>

      <div className="w-full max-w-md perspective">
        <AnimatePresence mode="wait" initial={false}>
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-xl text-gray-600 text-center mb-8">Sign In With Your IsuzumaHub Account</h2>

              <form className="space-y-6">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-colors"
                >
                  Sign IN
                </button>
              </form>

              <div className="mt-6 text-center">
                <button className="text-blue-500 hover:underline text-sm">FORGOT YOUR PASSWORD?</button>

                <div className="mt-4">
                  <span className="text-gray-500 text-sm">Don&apos;t have an account? </span>
                  <button onClick={toggleForm} className="text-blue-500 hover:underline text-sm font-medium">
                    CREATE AN ACCOUNT
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-xl text-gray-600 text-center mb-8">Sign Up For a new Account</h2>

              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Mobile"
                    className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-colors"
                >
                  Register
                </button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-gray-500 text-sm">Do you have an account? </span>
                <button onClick={toggleForm} className="text-blue-500 hover:underline text-sm font-medium">
                  SIGN IN
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
