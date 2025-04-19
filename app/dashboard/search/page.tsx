<<<<<<< HEAD
"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SearchIcon } from "lucide-react"

export default function SearchPage() {
  const [userName] = useState("Test")
  const [userEmail] = useState("test-user@gmail.com")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("test")
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setHasSearched(true)
  }

  return (
    <DashboardLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Search</h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for tests, appointments, or reports..."
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full md:w-auto p-2 border rounded-md"
                >
                  <option value="test">Tests</option>
                  <option value="appointment">Appointments</option>
                  <option value="report">Reports</option>
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

          {hasSearched && searchQuery && (
            <div className="bg-gray-50 p-6 rounded-md">
              <h3 className="text-lg font-medium mb-4">Search Results for "{searchQuery}"</h3>
              <div className="text-center py-8 text-gray-500">
                {searchType === "test" && "No tests found matching your search criteria."}
                {searchType === "appointment" && "No appointments found matching your search criteria."}
                {searchType === "report" && "No reports found matching your search criteria."}
              </div>
            </div>
          )}

          {!hasSearched && (
            <div className="text-center py-12">
              <SearchIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Enter a search term to find tests, appointments, or reports</p>
            </div>
          )}
        </div>
=======
import { DashboardLayout } from "@/components/dashboard-layout"

export default function SearchPage() {
  return (
    <DashboardLayout userName="Test" userEmail="test-user@gmail.com" pageTitle="Search">
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-medium mb-4">Search</h2>
        <p>This page will allow you to search for tests, appointments, and reports.</p>
>>>>>>> 78240d95df05eb70a7c1f09f313a3f9211787d64
      </div>
    </DashboardLayout>
  )
}
