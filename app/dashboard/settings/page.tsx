"use client"

import { DashboardLayout } from "@/components/dashboard-layout"

export default function SettingsPage() {
  return (
    <DashboardLayout userName="Test" userEmail="test-user@gmail.com" pageTitle="Settings">
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-medium mb-6">Settings</h2>

        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Account Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <h4 className="font-medium">Change Password</h4>
                  <p className="text-sm text-gray-500">Update your password for security</p>
                </div>
                <button className="px-4 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <button className="px-4 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
                  Enable
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Notification Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="email-notifications" className="mr-3 h-4 w-4" defaultChecked />
                <div>
                  <label htmlFor="email-notifications" className="font-medium">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500">Receive email notifications for appointments and test results</p>
                </div>
              </div>

              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="sms-notifications" className="mr-3 h-4 w-4" />
                <div>
                  <label htmlFor="sms-notifications" className="font-medium">
                    SMS Notifications
                  </label>
                  <p className="text-sm text-gray-500">Receive SMS notifications for appointments and test results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
