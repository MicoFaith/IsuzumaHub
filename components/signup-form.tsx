"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, User, Mail, Lock, Phone } from "lucide-react";
import axios from "axios";

interface SignupFormProps {
  title: string;
  redirectTo?: string;
}

export function SignupForm({ title, redirectTo = "/auth" }: SignupFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !mobileNumber || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const signupData = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        mobileNumber: mobileNumber.trim(),
        password: password,
        confirmPassword: confirmPassword,
      };

      const response = await axios.post(
        "http://localhost:8081/api/signup",
        signupData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        router.push(redirectTo); // Redirects to /auth (login page)
      } else {
        setError("Failed to create account. Please try again.");
      }
    } catch (err: any) {
      console.error("Signup error:", err);

      if (err.response) {
        switch (err.response.status) {
          case 400:
            setError(
              err.response.data?.message ||
                "Invalid input data. Please check your information."
            );
            break;
          case 409:
            setError("An account with this email already exists.");
            break;
          default:
            setError(
              err.response.data?.message ||
                "Failed to create account. Please try again."
            );
        }
      } else if (err.request) {
        setError(
          "Unable to connect to the server. Please check if the backend is running on port 8081."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="text-white p-3 border border-white/30 rounded-md inline-flex"
        >
          <Home className="h-5 w-5" />
        </Link>
      </div>

      <div className="text-white mb-8 flex items-center">
        <div className="mr-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold">IsuzumaHub</h1>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl text-gray-600 text-center mb-8">{title}</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors pr-10"
              />
              <div className="absolute right-2 top-3 text-gray-400">
                <User size={20} />
              </div>
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors pr-10"
              />
              <div className="absolute right-2 top-3 text-gray-400">
                <Mail size={20} />
              </div>
            </div>

            <div className="relative">
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors pr-10"
              />
              <div className="absolute right-2 top-3 text-gray-400">
                <Phone size={20} />
              </div>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors pr-10"
              />
              <div className="absolute right-2 top-3 text-gray-400">
                <Lock size={20} />
              </div>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors pr-10"
              />
              <div className="absolute right-2 top-3 text-gray-400">
                <Lock size={20} />
              </div>
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
                  Creating account...
                </>
              ) : (
                "SIGN UP"
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white">
            Already have an account?{" "}
            <Link href="/auth" className="font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}