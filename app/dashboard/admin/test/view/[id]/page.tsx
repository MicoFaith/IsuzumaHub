"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Cog } from "lucide-react"

// Sample test details data
const testDetails = {
  1: {
    id: 1,
    title: "HbA1c",
    price: 500,
    description:
      "Glycosylated Hemoglobin Test measures the percentage of glycosylated hemoglobin in blood which reflects the average blood glucose over a period of past two to three months (8-12 weeks).",
    interpretation:
      "Interpreting HbA1c results Interpretations: Normal: Below 5.7% (39 mmol/mol approx.) Prediabetic: 5.7% - 6.4% (39 to 46 mmol/mol approx.) Diabetic: Above 6.5% (above 48 mmol/mol approx.) Less than 5.7% Glycated Hemoglobin indicates normal levels of blood sugar. Increased risk of developing Diabetes is found in Prediabetic patients with blood sugar level between 5.7% and 6.4%. Patients with a HbA1c level greater than 6.5% are usually diagnosed with Diabetes.",
  },
  2: {
    id: 2,
    title: "TSH",
    price: 200,
    description:
      "Thyroid Stimulating Hormone (TSH) test measures the amount of TSH in the blood, which is produced by the pituitary gland and tells the thyroid gland to make and release thyroid hormones.",
    interpretation:
      "Normal TSH range: 0.4 - 4.0 mIU/L. Values above this range may indicate hypothyroidism (underactive thyroid), while values below may indicate hyperthyroidism (overactive thyroid).",
  },
  3: {
    id: 3,
    title: "KFT",
    price: 500,
    description:
      "Kidney Function Test (KFT) is a group of tests that evaluate how well your kidneys are functioning by measuring the levels of waste products in your blood and urine.",
    interpretation:
      "KFT includes tests for Blood Urea Nitrogen (BUN), Creatinine, eGFR, and Electrolytes. Normal ranges vary by test. Elevated levels may indicate kidney dysfunction or disease.",
  },
  4: {
    id: 4,
    title: "Dengue Antigen NS1, IgG & IgM",
    price: 500,
    description:
      "This test detects dengue virus infection by identifying the NS1 antigen and antibodies (IgG and IgM) produced in response to the infection.",
    interpretation:
      "Positive NS1 indicates early acute infection (1-7 days). Positive IgM indicates recent infection (5-7 days to 2-3 months). Positive IgG indicates past infection or secondary infection.",
  },
  5: {
    id: 5,
    title: "Urine R/M Measure",
    price: 110,
    description:
      "Urine Routine and Microscopic Examination analyzes physical, chemical, and microscopic properties of urine to detect abnormalities.",
    interpretation:
      "Evaluates color, clarity, specific gravity, pH, protein, glucose, ketones, blood, and microscopic elements like cells, casts, and crystals. Abnormal findings may indicate various conditions.",
  },
  6: {
    id: 6,
    title: "Lipid Profile",
    price: 300,
    description:
      "Lipid Profile measures the levels of lipids (fats) in your blood, including total cholesterol, HDL, LDL, and triglycerides.",
    interpretation:
      "Desirable ranges: Total Cholesterol < 200 mg/dL, HDL > 40 mg/dL (men) or > 50 mg/dL (women), LDL < 100 mg/dL, Triglycerides < 150 mg/dL. Higher values may indicate increased risk of heart disease.",
  },
  7: {
    id: 7,
    title: "cxbcsdf",
    price: 1000,
    description: "Test description not available.",
    interpretation: "Test interpretation not available.",
  },
  8: {
    id: 8,
    title: "Full body check up",
    price: 1500,
    description: "This is a sample text for testing",
    interpretation:
      "This is a sample text for testing. This is a sample text for testing.This is a sample text for testing.This is a sample text for testing.",
  },
}

export default function ViewTestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const testId = Number(params.id)
  const [loading, setLoading] = useState(true)
  const [test, setTest] = useState<any>(null)
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    interpretation: "",
    price: "",
  })

  useEffect(() => {
    // Simulate API call to fetch test details
    const timer = setTimeout(() => {
      const testDetail = testDetails[testId as keyof typeof testDetails] || null
      setTest(testDetail)
      if (testDetail) {
        setEditData({
          title: testDetail.title,
          description: testDetail.description,
          interpretation: testDetail.interpretation,
          price: String(testDetail.price),
        })
      }
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [testId])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // In a real app, this would call an API to update the test
    console.log("Saving test:", editData)

    // Update the local state to reflect changes
    setTest({
      ...test,
      title: editData.title,
      description: editData.description,
      interpretation: editData.interpretation,
      price: Number(editData.price),
    })

    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset edit data to original values
    setEditData({
      title: test.title,
      description: test.description,
      interpretation: test.interpretation,
      price: String(test.price),
    })
    setIsEditing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditData({
      ...editData,
      [name]: value,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin">
          <Cog className="h-8 w-8 text-blue-500" />
        </div>
      </div>
    )
  }

  if (!test) {
    return (
      <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-medium mb-4">Test Not Found</h2>
          <p>The requested test details could not be found.</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">View Test Detail</h2>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-red-500 mb-4">Test Name: {test.title}</h3>
          </div>

          {isEditing ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-gray-600 mb-2">
                  Test Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editData.title}
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
                  value={editData.description}
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
                  value={editData.interpretation}
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
                  value={editData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Test Description:</div>
                <div className="p-3">{test.description}</div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Test Interpretation:</div>
                <div className="p-3">{test.interpretation}</div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Price:</div>
                <div className="p-3">{test.price}</div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={handleEdit}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
