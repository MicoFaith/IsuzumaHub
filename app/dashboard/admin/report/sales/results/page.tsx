"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Cog } from "lucide-react"

export default function SalesReportResultsPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const [loading, setLoading] = useState(true)
  const [salesData, setSalesData] = useState<any[]>([])
  const [totalSales, setTotalSales] = useState(0)
  const searchParams = useSearchParams()

  const fromDate = searchParams.get("from") || ""
  const toDate = searchParams.get("to") || ""
  const reportType = searchParams.get("type") || "month"

  useEffect(() => {
    // Simulate API call to fetch sales data
    const timer = setTimeout(() => {
      const data = [
        {
          id: 1,
          period: reportType === "month" ? "1/2020" : "2020",
          sales: 5520,
        },
      ]

      setSalesData(data)
      setTotalSales(data.reduce((sum, item) => sum + item.sales, 0))
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [fromDate, toDate, reportType])

  const formatDate = (date: string) => {
    // In a real app, this would properly format the date
    return date
  }

  const title = reportType === "month" ? "Sales Report Month Wise" : "Sales Report Year Wise"
  const periodLabel = reportType === "month" ? "Month / Year" : "Year"

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin">
          <Cog className="h-8 w-8 text-blue-500" />
        </div>
      </div>
    )
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Reports">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-sm text-purple-600 mt-2 text-center">
            Sales Report from {formatDate(fromDate)} to {formatDate(toDate)}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left font-medium text-gray-600">S NO</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">{periodLabel}</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Sales</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{item.period}</td>
                  <td className="py-3 px-4">{item.sales}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-medium">
                <td className="py-3 px-4" colSpan={2}>
                  Total
                </td>
                <td className="py-3 px-4">{totalSales}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-600">S NO</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">{periodLabel}</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Sales</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
