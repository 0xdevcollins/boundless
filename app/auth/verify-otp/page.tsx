"use client"

import { useState, type FormEvent, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  // Protect the route
  useEffect(() => {
    if (!email) {
      router.push("/auth/signin")
    }
  }, [email, router])

  // Handle resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOTP = [...otp]
    newOTP[index] = value
    setOtp(newOTP)

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleResendOTP = async () => {
    if (resendTimer > 0 || !email) return

    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setResendTimer(30) // Start 30 second countdown
      } else {
        const data = await response.json()
        setError(data.message || "Failed to resend OTP.")
      }
    } catch (error) {
      setError("An error occurred while resending OTP.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

    setError("")
    setIsLoading(true)
    const otpString = otp.join("")

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpString }),
      })

      if (response.ok) {
        const data = await response.json()
        router.push("/dashboard")
      } else {
        const data = await response.json()
        setError(data.message || "Invalid OTP. Please try again.")
      }
    } catch (error) {
      setError("An error occurred during OTP verification.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!email) {
    return null 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#dffce8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <Image src="/logo.svg" alt="Boundless" width={180} height={180} className="mb-4" />
          <h2 className="mt-2 text-center text-3xl font-extrabold text-[#194247]">Verify Your Email</h2>
          <p className="mt-2 text-center text-sm text-gray-600">We sent a code to {email}</p>
          <p className="mt-1 text-center text-xs text-gray-500">The OTP will expire in 10 minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-semibold border-2 border-[#194247] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#194247] focus:border-transparent"
                whileFocus={{ scale: 1.05 }}
                required
                disabled={isLoading}
              />
            ))}
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <div>
            <motion.button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#194247] hover:bg-[#194247]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#194247] disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </motion.button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendTimer > 0 || isLoading}
              className="text-sm text-[#194247] hover:text-[#194247]/80 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Didn't receive the code? Resend"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

