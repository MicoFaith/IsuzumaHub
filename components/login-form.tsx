"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, Lightbulb } from "lucide-react";
import axios from "axios";

interface LoginFormProps {
  title: string;
  redirectTo?: string;
  showSignUpLink?: boolean;
  expectedRole?: string;
}

export function LoginForm({
  title,
  redirectTo = "/dashboard",
  showSignUpLink = true,
  expectedRole,
}: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log(
      "[DEBUG] Current form state - email:",
      email,
      "password:",
      password,
      "rememberMe:",
      rememberMe
    );
  }, [email, password, rememberMe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) {
      console.log("[DEBUG] Form submission blocked: already submitting");
      return;
    }

    setIsSubmitting(true);
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      setIsSubmitting(false);
      return;
    }

    let loginEndpoint = "http://localhost:8081/api/login";
    if (expectedRole === "ADMIN") {
      loginEndpoint = "http://localhost:8081/api/admin-login";
    } else if (expectedRole === "EMPLOYEE") {
      loginEndpoint = "http://localhost:8081/api/employee-login";
    }

    try {
      const loginData = {
        email: email.trim().toLowerCase(),
        password: password,
      };

      console.log("[DEBUG] Sending login request to:", loginEndpoint);
      console.log("[DEBUG] Login payload:", loginData);

      const response = await axios.post(loginEndpoint, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      console.log("[DEBUG] Response received:", response.status, response.data);
      console.log("[DEBUG] Response headers:", response.headers);

      if (response.status === 200) {
        const { email, role, fullName, token } = response.data;

        if (expectedRole && role !== expectedRole) {
          setError(`This page is for ${expectedRole.toLowerCase()}s only. Your role is ${role.toLowerCase()}.`);
          setLoading(false);
          setIsSubmitting(false);
          return;
        }

        let finalRedirect = redirectTo;
        if (role === "ADMIN") {
          finalRedirect = "/dashboard/admin";
        } else if (role === "EMPLOYEE") {
          finalRedirect = "/dashboard/employee";
        } else if (role === "USER") {
          finalRedirect = "/dashboard";
        } else {
          setError("Invalid role received from server.");
          setLoading(false);
          setIsSubmitting(false);
          return;
        }

        console.log("[DEBUG] Storing user data in sessionStorage");
        sessionStorage.setItem("user_email", email);
        sessionStorage.setItem("user_fullName", fullName);
        sessionStorage.setItem("user_role", role);
        sessionStorage.setItem("auth_token", token);

        if (rememberMe) {
          sessionStorage.setItem("isuzumahub_remember_me", "true");
        } else {
          sessionStorage.removeItem("isuzumahub_remember_me");
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log("[DEBUG] Set Axios Authorization header with token");

        console.log("[DEBUG] Redirecting to:", finalRedirect);
        router.push(finalRedirect);
      } else {
        setError("Invalid response from server. Please try again.");
        setLoading(false);
        setIsSubmitting(false);
      }
    } catch (err: any) {
      console.error("[ERROR] Login error details:", {
        message: err.message,
        code: err.code,
        response: err.response?.data,
        status: err.response?.status,
      });

      if (err.code === "ECONNABORTED") {
        setError("Request timed out. Please check if the server is running.");
      } else if (err.code === "ERR_NETWORK") {
        setError(
          "Cannot connect to the server. Please ensure the backend is running on port 8081."
        );
      } else if (err.response) {
        switch (err.response.status) {
          case 401:
            setError("Invalid email or password. Please try again.");
            break;
          case 403:
            setError(err.response.data?.message || "Access denied.");
            break;
          case 404:
            setError("Account not found. Please check your email.");
            break;
          default:
            setError(
              err.response.data?.message ||
                "An error occurred during login. Please try again."
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
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset your password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setError(response.data.message);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to send password reset request."
      );
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
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors pr-10 bg-white text-black"
                required
                disabled={loading}
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
                className="w-full p-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors bg-white text-black"
                required
                disabled={loading}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                disabled={loading}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-600"
              >
                Keep me signed in
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-colors flex items-center justify-center disabled:opacity-50"
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
          <button
            onClick={handleForgotPassword}
            className="text-white hover:underline text-sm"
            disabled={loading}
          >
            FORGOT YOUR PASSWORD?
          </button>
          {showSignUpLink && (
            <p className="text-white">
              Don’t have an account?{" "}
              <Link href="/auth/signup" className="font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}