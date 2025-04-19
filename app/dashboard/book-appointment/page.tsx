<<<<<<< HEAD
"use client"

import type React from "react"

import { useState, useRef } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Check } from "lucide-react"

// Sample test data (same as in test-detail page)
const testData = [
  { id: 1, title: "HbA1c", price: 500 },
  { id: 2, title: "TSH", price: 200 },
  { id: 3, title: "KFT", price: 500 },
  { id: 4, title: "Dengue Antigen NS1, IgG & IgM", price: 500 },
  { id: 5, title: "Urine R/M Measure", price: 110 },
  { id: 6, title: "Lipid Profile", price: 300 },
  { id: 7, title: "cxbcsdf", price: 1000 },
]

export default function BookAppointmentPage() {
  const [userName] = useState("Test")
  const [userEmail] = useState("test-user@gmail.com")
  const [formData, setFormData] = useState({
    patientName: "",
    gender: "Male",
    dateOfBirth: "",
    mobileNumber: "",
    email: "",
    appointmentDate: "",
    appointmentTime: "",
  })
  const [selectedTests, setSelectedTests] = useState<number[]>([])
  const [prescription, setPrescription] = useState<File | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [appointmentNumber, setAppointmentNumber] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPrescription(e.target.files[0])
    }
  }

  const toggleTestSelection = (testId: number) => {
    setSelectedTests((prev) => {
      if (prev.includes(testId)) {
        return prev.filter((id) => id !== testId)
      } else {
        return [...prev, testId]
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate a random appointment number
    const randomNumber = Math.floor(Math.random() * 90000000) + 10000000
    setAppointmentNumber(randomNumber.toString())

    // Show success message
    setShowSuccess(true)
  }

  const closeSuccessModal = () => {
    setShowSuccess(false)

    // Reset form
    setFormData({
      patientName: "",
      gender: "Male",
      dateOfBirth: "",
      mobileNumber: "",
      email: "",
      appointmentDate: "",
      appointmentTime: "",
    })
    setSelectedTests([])
    setPrescription(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <DashboardLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Appointment</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Patient Name */}
            <div>
              <label htmlFor="patientName" className="block text-gray-600 mb-2">
                Patient Name
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Patient Gender */}
            <div>
              <label className="block text-gray-600 mb-2">Patient Gender</label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Female
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Male
                </label>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-gray-600 mb-2">
                Date of Birth
              </label>
              <input
                type="text"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                placeholder="dd-mm-yyyy"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="mobileNumber" className="block text-gray-600 mb-2">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Email ID */}
            <div>
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email ID
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Appointment Date */}
            <div>
              <label htmlFor="appointmentDate" className="block text-gray-600 mb-2">
                Appointment Date
              </label>
              <input
                type="text"
                id="appointmentDate"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                placeholder="dd-mm-yyyy"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Appointment Time */}
            <div>
              <label htmlFor="appointmentTime" className="block text-gray-600 mb-2">
                Appointment Time
              </label>
              <input
                type="text"
                id="appointmentTime"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleInputChange}
                placeholder="hh:mm"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Prescription Upload */}
            <div>
              <label htmlFor="prescription" className="block text-gray-600 mb-2">
                Prescription(if any)
              </label>
              <input
                type="file"
                id="prescription"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gray-200 file:text-gray-700
                  hover:file:bg-gray-300"
              />
            </div>

            {/* Select Test */}
            <div>
              <h3 className="text-red-500 font-medium mb-4">Select Test</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-3 px-4 text-left font-medium text-gray-600">#</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Test Name</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Test Price</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testData.map((test) => (
                      <tr key={test.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{test.id}</td>
                        <td className="py-3 px-4">{test.title}</td>
                        <td className="py-3 px-4">{test.price}</td>
                        <td className="py-3 px-4">
                          <label className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={selectedTests.includes(test.id)}
                              onChange={() => toggleTestSelection(test.id)}
                              className="sr-only"
                            />
                            <span
                              className={`w-5 h-5 flex items-center justify-center border rounded ${
                                selectedTests.includes(test.id)
                                  ? "bg-green-500 border-green-500 text-white"
                                  : "bg-white border-gray-300"
                              }`}
                            >
                              {selectedTests.includes(test.id) && <Check className="w-4 h-4" />}
                            </span>
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">localhost says</h3>
            </div>
            <p className="mb-6">
              Your Appointment has been taken successfully. Appointment number is{" "}
              <span className="text-yellow-500 font-bold">{appointmentNumber}</span>
            </p>
            <div className="flex justify-center">
              <button
                onClick={closeSuccessModal}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
=======
import { DashboardLayout } from "@/components/dashboard-layout"

export default function BookAppointmentPage() {
  return (
    <DashboardLayout userName="Test" userEmail="test-user@gmail.com" pageTitle="Book Appointment">
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-medium mb-4">Book a New Appointment</h2>
        <p>This page will allow you to schedule new laboratory appointments.</p>
      </div>
>>>>>>> 78240d95df05eb70a7c1f09f313a3f9211787d64
    </DashboardLayout>
  )
}
