"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Home, Lightbulb } from "lucide-react"

interface LoginFormProps {
  title: string
}

export function LoginForm({ title }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log({ username, password, rememberMe })
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

      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl text-gray-600 text-center mb-8">{title}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors pr-10"
              />
              <div className="absolute right-2 top-3 text-yellow-400">
                <Lightbulb size={20} />
              </div>
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                Keep me signed in
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-colors"
            >
              SIGN IN
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <button className="text-white hover:underline text-sm">FORGOT YOUR PASSWORD?</button>
        </div>
      </div>
    </div>
  )
}
