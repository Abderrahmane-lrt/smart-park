"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, User, Menu, Car, Calendar, CreditCard, Settings } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { LanguageSelector } from "@/components/language-selector"

interface NavigationProps {
  isAuthenticated: boolean
  onAuthClick: () => void
  onLogout: () => void
}

export function Navigation({ isAuthenticated, onAuthClick, onLogout }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">ParkSmart</span>
            <Badge variant="secondary" className="hidden md:inline-flex bg-blue-100 text-blue-700">
              Morocco
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              {t("findParking")}
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/bookings" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  {t("myBookings")}
                </Link>
                <Link href="/history" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  {t("history")}
                </Link>
              </>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <LanguageSelector />

            {/* User Actions */}
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative hover:bg-blue-50">
                      <Bell className="h-5 w-5 text-gray-600" />
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-blue-600">2</Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 border-blue-200">
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 text-gray-800">Notifications</h3>
                      <div className="space-y-2">
                        <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-sm font-medium text-blue-800">Booking Confirmed</p>
                          <p className="text-xs text-blue-600">Centre Ville Parking - Today 2:00 PM</p>
                        </div>
                        <div className="p-2 bg-orange-50 rounded-lg border border-orange-100">
                          <p className="text-sm font-medium text-orange-800">Reminder</p>
                          <p className="text-xs text-orange-600">Your parking expires in 30 minutes</p>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                      <User className="h-5 w-5 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="border-blue-200">
                    <DropdownMenuItem className="hover:bg-blue-50">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-gray-700">My Bookings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-blue-50">
                      <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-gray-700">Payment Methods</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-blue-50">
                      <Settings className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-gray-700">Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onLogout} className="hover:bg-red-50">
                      <span className="text-red-600">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={onAuthClick}
                  className="bg-gray-800 border-gray-800 text-white hover:bg-gray-900 hover:border-gray-900"
                >
                  {t("signUp")}
                </Button>
                <Button onClick={onAuthClick} className="bg-gray-800 text-white hover:bg-gray-900">
                  {t("signIn")}
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              <Link href="/" className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded">
                {t("findParking")}
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    href="/bookings"
                    className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded"
                  >
                    {t("myBookings")}
                  </Link>
                  <Link
                    href="/history"
                    className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded"
                  >
                    {t("history")}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
