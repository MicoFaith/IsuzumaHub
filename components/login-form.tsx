"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Home, Lightbulb } from "lucide-react"
import axios from "axios"

axios.defaults.withCredentials = true

interface LoginFormProps {
  title: string
  redirectTo?: string
}

export function LoginForm({ title, redirectTo = "/dashboard" }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    console.log("[DEBUG] Current form state - email:", email, "password:", password);
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password.")
      setLoading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append("email", email.trim().toLowerCase())
      formData.append("password", password)

      console.log("[DEBUG] Sending login request with email:", email, "password:", password)

      const response = await axios.post("http://localhost:8081/auth", formData, {
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400,
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      console.log("[DEBUG] Login response status:", response.status)
      console.log("[DEBUG] Login response headers:", response.headers)

      if (response.status === 302) {
        const redirectUrl = response.headers.location
        console.log("[DEBUG] Redirected to:", redirectUrl)

        const normalizedRedirectUrl = new URL(redirectUrl, "http://localhost:8081").pathname
        console.log("[DEBUG] Normalized redirect URL:", normalizedRedirectUrl)

        const redirectResponse = await axios.get(`http://localhost:8081${normalizedRedirectUrl}`, {
          withCredentials: true,
        })

        console.log("[DEBUG] Redirect response:", redirectResponse.data)

        if (normalizedRedirectUrl === "/auth/success") {
          console.log("[DEBUG] Login successful, redirecting to:", redirectTo)
          
          if (rememberMe) {
            localStorage.setItem("isuzumahub_remember_me", "true")
          } else {
            localStorage.removeItem("isuzumahub_remember_me")
          }

          router.push(redirectTo)
        } else if (normalizedRedirectUrl === "/auth/error") {
          setError(redirectResponse.data.message || "Invalid email or password. Please try again.")
        } else {
          setError("Unexpected redirect URL: " + normalizedRedirectUrl)
        }
      } else {
        console.log("[DEBUG] Unexpected response data:", response.data)
        setError("Unexpected response from server: " + response.status)
      }
    } catch (err: any) {
      console.error("[ERROR] Login error:", err)
      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please check your connection and try again."
      )
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset your password.")
      return
    }

    try {
      const response = await axios.post("http://localhost:8081/auth/forgot-password", { email }, {
        withCredentials: true,
      })
      setError(response.data.message)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send password reset request.")
    }
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

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors pr-10"
                required
              />
              <div className="absolute right-2 top-3 text-yellow-400">
                <Lightbulb size={20} />
              </div>
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                required
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
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center space-y-3">
          <button onClick={handleForgotPassword} className="text-white hover:underline text-sm">
            FORGOT YOUR PASSWORD?
          </button>
          <p className="text-white">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}