"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { SearchIcon } from "lucide-react"

export default function AdminSearchPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("user")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would perform a search
    console.log({ searchQuery, searchType })
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Search">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Search</h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full md:w-auto p-2 border rounded-md"
                >
                  <option value="user">Users</option>
                  <option value="appointment">Appointments</option>
                  <option value="test">Tests</option>
                  <option value="employee">Employees</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <SearchIcon className="w-4 h-4 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </form>

          <div className="text-center py-12">
            <SearchIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Enter a search term to find users, appointments, tests, or employees</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
