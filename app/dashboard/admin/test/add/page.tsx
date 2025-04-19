"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"

export default function AddTestPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const router = useRouter()
  const [testData, setTestData] = useState({
    title: "",
    description: "",
    interpretation: "",
    price: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTestData({
      ...testData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would call an API to add the test
    console.log("Adding test:", testData)

    // Redirect to the manage tests page
    router.push("/dashboard/admin/test/manage")
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Add Test Detail</h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-gray-600 mb-2">
                Test Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={testData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-600 mb-2">
                Test Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={testData.description}
                onChange={handleInputChange}
                rows={5}
                className="w-full p-2 border rounded-md"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="interpretation" className="block text-gray-600 mb-2">
                Test Interpretation:
              </label>
              <textarea
                id="interpretation"
                name="interpretation"
                value={testData.interpretation}
                onChange={handleInputChange}
                rows={5}
                className="w-full p-2 border rounded-md"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="price" className="block text-gray-600 mb-2">
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={testData.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
