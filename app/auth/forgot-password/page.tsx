"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSuccess("Password reset link sent to your email.")
      } else {
        const data = await response.json()
        setError(data.message || "Failed to send reset link.")
      }
    } catch (error) {
      setError(`An error occurred. Please try again: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#dffce8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <Image src="/logo.svg" alt="Boundless" width={180} height={180} className="mb-4" />
          <h2 className="mt-2 text-center text-3xl font-extrabold text-[#194247]">Forgot Password</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Enter your email to receive a password reset link.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#194247] focus:border-[#194247]"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#194247] hover:bg-[#153a3f] focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </form>

        <div className="text-center">
          <button
            onClick={() => router.push("/auth/signin")}
            className="text-sm text-[#194247] hover:underline"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
