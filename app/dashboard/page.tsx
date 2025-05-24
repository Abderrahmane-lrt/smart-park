"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Calendar, Clock, MapPin, DollarSign, Car, Bell, TrendingUp, Star, CreditCard } from "lucide-react"
import { Footer } from "@/components/footer"

export default function DashboardPage() {
  const [isAuthenticated] = useState(true)

  const stats = {
    totalBookings: 24,
    totalSpent: 1250,
    favoriteSpot: "Centre Ville Parking",
    avgRating: 4.6,
  }

  const recentActivity = [
    {
      id: 1,
      type: "booking",
      title: "Parking booked at Marina Shopping",
      time: "2 hours ago",
      amount: 40,
    },
    {
      id: 2,
      type: "payment",
      title: "Payment successful",
      time: "2 hours ago",
      amount: 40,
    },
    {
      id: 3,
      type: "reminder",
      title: "Parking expires in 30 minutes",
      time: "3 hours ago",
    },
  ]

  const quickActions = [
    { title: "Find Parking", icon: MapPin, href: "/" },
    { title: "My Bookings", icon: Calendar, href: "/bookings" },
    { title: "Payment Methods", icon: CreditCard, href: "/payment" },
    { title: "Notifications", icon: Bell, href: "/notifications" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isAuthenticated={isAuthenticated} onAuthClick={() => {}} onLogout={() => {}} />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your parking overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-3xl font-bold">{stats.totalBookings}</p>
                </div>
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">+12% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-3xl font-bold">{stats.totalSpent} MAD</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">+8% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Favorite Spot</p>
                  <p className="text-lg font-bold">{stats.favoriteSpot}</p>
                </div>
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-sm text-gray-600 mt-2">5 visits this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-3xl font-bold">{stats.avgRating}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <p className="text-sm text-gray-600 mt-2">Based on your reviews</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activity.type === "booking"
                              ? "bg-blue-500"
                              : activity.type === "payment"
                                ? "bg-green-500"
                                : "bg-orange-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.time}</p>
                        </div>
                      </div>
                      {activity.amount && <Badge variant="secondary">{activity.amount} MAD</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action) => (
                    <Button key={action.title} variant="outline" className="w-full justify-start" asChild>
                      <a href={action.href}>
                        <action.icon className="h-4 w-4 mr-2" />
                        {action.title}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Booking */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Current Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold">Centre Ville Parking</p>
                    <p className="text-sm text-gray-600">Avenue Mohammed V</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">14:00 - 18:00</span>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-800">Active</p>
                    <p className="text-xs text-green-600">Expires in 2 hours</p>
                  </div>
                  <Button size="sm" className="w-full">
                    View QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
