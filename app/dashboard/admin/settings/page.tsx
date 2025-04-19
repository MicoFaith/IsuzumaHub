"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { useTheme } from "@/components/theme-context"
import { Moon, Sun, Save, Bell, Clock, Globe, Shield, Database } from "lucide-react"

export default function AdminSettingsPage() {
  const { theme, setTheme } = useTheme()
  const [userName] = useState("Admin User")
  const [userEmail] = useState("admin@isuzumahub.com")
  const [notifications, setNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [timezone, setTimezone] = useState("UTC")
  const [language, setLanguage] = useState("en")
  const [backupFrequency, setBackupFrequency] = useState("daily")
  const [securityLevel, setSecurityLevel] = useState("high")
  const [saving, setSaving] = useState(false)

  const handleSaveSettings = () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      alert("Settings saved successfully!")
    }, 1000)
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Settings">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Admin Settings</h1>

          <div className="space-y-6">
            {/* Appearance */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Appearance</h2>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4">
                      {theme === "dark" ? (
                        <Moon className="h-6 w-6 text-blue-500" />
                      ) : (
                        <Sun className="h-6 w-6 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">Theme</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Choose between light and dark theme</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-500"
                        name="theme"
                        checked={theme === "light"}
                        onChange={() => setTheme("light")}
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Light</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-500"
                        name="theme"
                        checked={theme === "dark"}
                        onChange={() => setTheme("dark")}
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Dark</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Notifications</h2>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Bell className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">System Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive notifications about system events
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications}
                      onChange={() => setNotifications(!notifications)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Mail className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">Email Alerts</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive email notifications about important events
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={emailAlerts}
                      onChange={() => setEmailAlerts(!emailAlerts)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* System Settings */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">System Settings</h2>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Database className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">Database Backup</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Set the frequency of automatic database backups
                      </p>
                    </div>
                  </div>
                  <select
                    className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300"
                    value={backupFrequency}
                    onChange={(e) => setBackupFrequency(e.target.value)}
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Shield className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">Security Level</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Set the security level for the system</p>
                    </div>
                  </div>
                  <select
                    className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300"
                    value={securityLevel}
                    onChange={(e) => setSecurityLevel(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="extreme">Extreme</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Regional Settings */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Regional Settings</h2>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Clock className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">Timezone</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Set the system default timezone</p>
                    </div>
                  </div>
                  <select
                    className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                  >
                    <option value="UTC">UTC (Coordinated Universal Time)</option>
                    <option value="EST">EST (Eastern Standard Time)</option>
                    <option value="CST">CST (Central Standard Time)</option>
                    <option value="MST">MST (Mountain Standard Time)</option>
                    <option value="PST">PST (Pacific Standard Time)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Globe className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">Language</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Set the system default language</p>
                    </div>
                  </div>
                  <select
                    className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Settings</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

// Mail icon component
function Mail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
