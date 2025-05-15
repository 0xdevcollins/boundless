"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface UserFiltersProps {
  currentRole?: string
  searchQuery?: string
}

export function UserFilters({ currentRole, searchQuery }: UserFiltersProps) {
  const router = useRouter()
  const [search, setSearch] = useState(searchQuery || "")

  // Update search state when searchQuery prop changes
  useEffect(() => {
    setSearch(searchQuery || "")
  }, [searchQuery])

  const handleRoleChange = (value: string) => {
    const searchParams = new URLSearchParams(window.location.search)
    if (value) {
      searchParams.set("role", value)
    } else {
      searchParams.delete("role")
    }
    searchParams.delete("page")
    router.push(`?${searchParams.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams(window.location.search)
    if (search) {
      searchParams.set("search", search)
    } else {
      searchParams.delete("search")
    }
    searchParams.delete("page")
    router.push(`?${searchParams.toString()}`)
  }

  const handleClearFilters = () => {
    router.push("/admin/users")
    setSearch("")
  }

  const hasFilters = currentRole || searchQuery

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users by name or email..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        <div className="flex gap-2">
          <Select value={currentRole || ""} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Roles</SelectItem>
              <SelectItem value="USER">User</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasFilters && (
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-muted-foreground">
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
