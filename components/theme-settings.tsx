"use client"
import { useTheme } from "./theme-context"
import { Moon, Sun, X } from "lucide-react"

interface ThemeSettingsProps {
  isOpen: boolean
  onClose: () => void
}

export function ThemeSettings({ isOpen, onClose }: ThemeSettingsProps) {
  const { theme, setTheme } = useTheme()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-medium">Theme Settings</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="theme"
                checked={theme === "light"}
                onChange={() => setTheme("light")}
                className="h-4 w-4 text-blue-500"
              />
              <div className="flex items-center">
                <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                <span>Light</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="theme"
                checked={theme === "dark"}
                onChange={() => setTheme("dark")}
                className="h-4 w-4 text-blue-500"
              />
              <div className="flex items-center">
                <Moon className="h-5 w-5 text-blue-500 mr-2" />
                <span>Dark</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
