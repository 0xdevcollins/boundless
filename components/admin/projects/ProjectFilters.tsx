"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface ProjectFiltersProps {
  categories: string[]
  currentCategory?: string
  currentStatus?: string
  searchQuery?: string
}

export function ProjectFilters({ categories, currentCategory, currentStatus, searchQuery }: ProjectFiltersProps) {
  const router = useRouter()
  const [search, setSearch] = useState(searchQuery || "")

  // Update search state when searchQuery prop changes
  useEffect(() => {
    setSearch(searchQuery || "")
  }, [searchQuery])

  const handleCategoryChange = (value: string) => {
    const searchParams = new URLSearchParams(window.location.search)
    if (value) {
      searchParams.set("category", value)
    } else {
      searchParams.delete("category")
    }
    searchParams.delete("page")
    router.push(`?${searchParams.toString()}`)
  }

  const handleStatusChange = (value: string) => {
    const searchParams = new URLSearchParams(window.location.search)
    if (value) {
      searchParams.set("status", value)
    } else {
      searchParams.delete("status")
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
    router.push("/admin/projects")
    setSearch("")
  }

  const hasFilters = currentCategory || currentStatus || searchQuery

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        <div className="flex gap-2">
          <Select value={currentCategory || ""} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={currentStatus || ""} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
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
