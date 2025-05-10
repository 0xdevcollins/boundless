"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import type { UseFormReturn } from "react-hook-form"
import type { ProjectFormValues } from "../types"
import { Search, UserPlus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  name: string
  image?: string
  email: string
}

interface TeamMember {
  userId: string
  role: string
  user?: User
}

interface TeamStepProps {
  form: UseFormReturn<ProjectFormValues>
}

export function TeamStep({ form }: TeamStepProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [openMembers, setOpenMembers] = useState<Record<number, boolean>>({})
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Load team members with user data on initial render
  useEffect(() => {
    const formTeamMembers = form.getValues("teamMembers") || []

    // If we already have team members, fetch their complete user data
    if (formTeamMembers.length > 0) {
      const fetchMembersData = async () => {
        try {
          const userIds = formTeamMembers.map((member) => member.userId)
          const response = await fetch(`/api/users/batch?ids=${userIds.join(",")}`)

          if (!response.ok) throw new Error("Failed to fetch team members data")

          const usersData = await response.json()

          // Merge the existing team members with the fetched user data
          const updatedMembers = formTeamMembers.map((member) => ({
            ...member,
            user: usersData.find((user: User) => user.id === member.userId),
          }))

          setTeamMembers(updatedMembers)
        } catch (error) {
          console.error("Error loading team members:", error)
          toast.error("Failed to load team members data")
        }
      }

      fetchMembersData()
    } else {
      setTeamMembers([])
    }
  }, [form])

  // Update form value when team members change
  useEffect(() => {
    // Only update if the team members array has content
    if (teamMembers.length > 0) {
      const formattedMembers = teamMembers.map(({ userId, role }) => ({ userId, role }))
      form.setValue("teamMembers", formattedMembers, { shouldValidate: true })
    }
  }, [teamMembers, form])

  const searchUsers = async (query: string) => {
    // Clear previous timeout to prevent multiple requests
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)

    // Add debounce to prevent excessive API calls
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`)

        if (!response.ok) throw new Error("Search failed")

        const data = await response.json()

        // Filter out users that are already team members
        const filteredResults = data.filter((user: User) => !teamMembers.some((member) => member.userId === user.id))

        setSearchResults(filteredResults)
      } catch (error) {
        console.error("Failed to search users:", error)
        toast.error("Failed to retrieve users. Please try again.")
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }, 300) // 300ms debounce
  }

  const addTeamMember = (user: User) => {
    const newMember = {
      userId: user.id,
      role: "",
      user: user, // Store the full user object
    }

    setTeamMembers((prev) => [...prev, newMember])

    // Open the newly added member's collapsible
    setOpenMembers((prev) => ({
      ...prev,
      [teamMembers.length]: true,
    }))

    setSearchQuery("")
    setSearchResults([])
    setIsPopoverOpen(false)
  }

  const removeTeamMember = (index: number) => {
    setTeamMembers((prev) => {
      const updated = [...prev]
      updated.splice(index, 1)
      return updated
    })
  }

  const updateMemberRole = (index: number, role: string) => {
    setTeamMembers((prev) => {
      const updated = [...prev]
      updated[index].role = role
      return updated
    })
  }

  const toggleMember = (index: number) => {
    setOpenMembers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Team Information</h3>
        <p className="text-sm text-muted-foreground">Add your team members and their roles</p>
        <Separator className="my-3" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                role="combobox"
                className="w-full justify-between h-9"
                aria-expanded={isPopoverOpen}
              >
                <Search className="mr-2 h-4 w-4" />
                {searchQuery || "Search for team members..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onValueChange={(value: string) => {
                    setSearchQuery(value)
                    searchUsers(value)
                  }}
                />
                <CommandList>
                  <CommandEmpty>
                    {isSearching ? (
                      <div className="flex items-center justify-center py-6">
                        <span className="text-sm text-muted-foreground">Searching...</span>
                      </div>
                    ) : searchQuery.trim() ? (
                      "No users found."
                    ) : (
                      "Start typing to search for users."
                    )}
                  </CommandEmpty>
                  <CommandGroup heading="Results">
                    {searchResults.map((user) => (
                      <CommandItem
                        key={user.id}
                        onSelect={() => addTeamMember(user)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-accent"
                      >
                        <Avatar className="h-6 w-6 flex-shrink-0">
                          <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col overflow-hidden">
                          <span className="font-medium truncate text-sm">{user.name}</span>
                          <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button
            onClick={() => setIsPopoverOpen(true)}
            variant="secondary"
            size="icon"
            type="button"
            className="flex-shrink-0 h-9 w-9"
            aria-label="Add team member"
          >
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>

        {teamMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 border border-dashed rounded-lg bg-muted/30">
            <UserPlus className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-sm">No team members added yet</p>
            <Button type="button" variant="outline" size="sm" className="mt-3" onClick={() => setIsPopoverOpen(true)}>
              Add Team Member
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {teamMembers.map((member, index) => (
              <Collapsible
                key={`${member.userId}-${index}`}
                open={openMembers[index]}
                onOpenChange={() => toggleMember(index)}
                className="border rounded-lg overflow-hidden transition-all duration-200 hover:border-primary/50"
              >
                <div className="flex items-center justify-between p-3 bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage
                        src={member.user?.image || "/placeholder.svg"}
                        alt={member.user?.name || "Team member"}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {member.user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                      <h4 className="font-medium truncate text-sm">{member.user?.name || "Loading..."}</h4>
                      {member.role && (
                        <Badge variant="outline" className="text-xs mt-1">
                          {member.role}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-destructive"
                      onClick={() => removeTeamMember(index)}
                      aria-label="Remove team member"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <CollapsibleTrigger asChild>
                      <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0">
                        {openMembers[index] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent>
                  <div className="p-3 border-t">
                    <FormLabel htmlFor={`member-role-${index}`} className="text-xs font-medium">
                      Role
                    </FormLabel>
                    <Input
                      id={`member-role-${index}`}
                      value={member.role}
                      onChange={(e) => updateMemberRole(index, e.target.value)}
                      placeholder="Enter team member's role"
                      className="mt-1 h-8 text-sm"
                    />
                    <div className="mt-2 text-xs text-muted-foreground">
                      <p className="truncate">{member.user?.email || ""}</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
