"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
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
}

export default function TestDetailView() {
  const params = useParams()
  const testId = Number(params.id)
  const [loading, setLoading] = useState(true)
  const [test, setTest] = useState<any>(null)
  const [userName] = useState("Test")
  const [userEmail] = useState("test-user@gmail.com")

  useEffect(() => {
    // Simulate API call to fetch test details
    const timer = setTimeout(() => {
      setTest(testDetails[testId as keyof typeof testDetails] || null)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [testId])

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
      <DashboardLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-medium mb-4">Test Not Found</h2>
          <p>The requested test details could not be found.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">View Test Detail</h2>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-red-500 mb-4">Test Name: {test.title}</h3>
          </div>

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
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
