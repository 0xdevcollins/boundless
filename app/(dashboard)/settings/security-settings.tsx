"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoaderIcon } from "@/components/settings/components/icons"


const toast = (props: { title: string; description: string }) => {
  console.log(`Toast: ${props.title} - ${props.description}`)
  alert(`${props.title}: ${props.description}`)
}

interface PasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface PasswordFormErrors {
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
}

export function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<PasswordFormErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = (): boolean => {
    const newErrors: PasswordFormErrors = {}

    if (formData.currentPassword.length < 8) {
      newErrors.currentPassword = "Password must be at least 8 characters."
    }

    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters."
    }

    if (formData.confirmPassword.length < 8) {
      newErrors.confirmPassword = "Password must be at least 8 characters."
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      console.log(formData)
    }, 1000)
  }

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setErrors({})
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Update your password to keep your account secure.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              placeholder="••••••••"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
            />
            {errors.currentPassword && <p className="text-sm font-medium text-red-500">{errors.currentPassword}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              placeholder="••••••••"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && <p className="text-sm font-medium text-red-500">{errors.newPassword}</p>}
            <p className="text-sm text-gray-500">Password must be at least 8 characters long.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="text-sm font-medium text-red-500">{errors.confirmPassword}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <LoaderIcon className="mr-2 h-4 w-4" />}
            Update Password
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

