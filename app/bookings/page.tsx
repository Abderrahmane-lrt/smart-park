"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Calendar, Clock, MapPin, QrCode, MoreHorizontal, Star } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Footer } from "@/components/footer"

export default function BookingsPage() {
  const [isAuthenticated] = useState(true) // For demo purposes

  const currentBookings = [
    {
      id: "PKG-001",
      parking: {
        name: "Centre Ville Parking",
        address: "Avenue Mohammed V, Casablanca",
        rating: 4.5,
      },
      date: "2024-01-15",
      startTime: "14:00",
      endTime: "18:00",
      duration: 4,
      totalPrice: 60,
      status: "active",
    },
    {
      id: "PKG-002",
      parking: {
        name: "Marina Shopping Parking",
        address: "Boulevard de la Corniche, Casablanca",
        rating: 4.8,
      },
      date: "2024-01-16",
      startTime: "10:00",
      endTime: "12:00",
      duration: 2,
      totalPrice: 40,
      status: "upcoming",
    },
  ]

  const pastBookings = [
    {
      id: "PKG-003",
      parking: {
        name: "Medina Parking",
        address: "Rue des Consuls, Rabat",
        rating: 4.2,
      },
      date: "2024-01-10",
      startTime: "09:00",
      endTime: "17:00",
      duration: 8,
      totalPrice: 80,
      status: "completed",
    },
    {
      id: "PKG-004",
      parking: {
        name: "Airport Parking",
        address: "Mohammed V Airport, Casablanca",
        rating: 4.6,
      },
      date: "2024-01-05",
      startTime: "06:00",
      endTime: "22:00",
      duration: 16,
      totalPrice: 240,
      status: "completed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const BookingCard = ({ booking, showActions = true }: { booking: any; showActions?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{booking.parking.name}</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{booking.parking.address}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
              {showActions && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <QrCode className="h-4 w-4 mr-2" />
                      Show QR Code
                    </DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    {booking.status === "upcoming" && (
                      <DropdownMenuItem className="text-red-600">Cancel Booking</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold">{formatDate(booking.date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-semibold">
                  {booking.startTime} - {booking.endTime}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold">{booking.duration} hours</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-semibold text-green-600">{booking.totalPrice} MAD</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{booking.parking.rating} rating</span>
          </div>

          {/* Booking ID */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">Booking ID</p>
            <p className="font-mono font-semibold">{booking.id}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isAuthenticated={isAuthenticated} onAuthClick={() => {}} onLogout={() => {}} />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your parking reservations</p>
        </div>

        <Tabs defaultValue="current" className="space-y-6">
          <TabsList>
            <TabsTrigger value="current">Current & Upcoming</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {currentBookings.length > 0 ? (
              <div className="grid gap-4">
                {currentBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No current bookings</h3>
                  <p className="text-gray-600 mb-4">You don't have any active or upcoming parking reservations.</p>
                  <Button>Find Parking</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {pastBookings.length > 0 ? (
              <div className="grid gap-4">
                {pastBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} showActions={false} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No booking history</h3>
                  <p className="text-gray-600">Your completed bookings will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
