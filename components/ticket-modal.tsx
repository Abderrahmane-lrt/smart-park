"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Download, Share, CheckCircle } from "lucide-react"

interface Booking {
  id: string
  parking: {
    name: string
    address: string
    price: number
  }
  date: string
  startTime: string
  endTime: string
  duration: number
  totalPrice: number
  qrCode: string
  status: string
}

interface TicketModalProps {
  booking: Booking
  isOpen: boolean
  onClose: () => void
}

export function TicketModal({ booking, isOpen, onClose }: TicketModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF ticket
    alert("Ticket download functionality would be implemented here")
  }

  const handleShare = () => {
    // In a real app, this would share the ticket details
    if (navigator.share) {
      navigator.share({
        title: "Parking Ticket",
        text: `Parking booked at ${booking.parking.name}`,
        url: window.location.href,
      })
    } else {
      alert("Share functionality would be implemented here")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md z-[9999]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Booking Confirmed!
          </DialogTitle>
        </DialogHeader>

        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="p-6 space-y-4">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-xl font-bold">ParkSmart Ticket</h2>
              <p className="text-gray-600">Digital Parking Pass</p>
            </div>

            <Separator />

            {/* QR Code */}
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-black/10 rounded grid grid-cols-8 gap-px p-1">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className={`${Math.random() > 0.5 ? "bg-black" : "bg-transparent"} rounded-sm`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">QR Code</p>
                </div>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Ticket ID</p>
                <p className="font-mono font-bold">{booking.id}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Parking Location</p>
                <p className="font-semibold">{booking.parking.name}</p>
                <p className="text-sm text-gray-600">{booking.parking.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <p className="font-semibold text-sm">{formatDate(booking.date)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <p className="font-semibold text-sm">
                      {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold">{booking.duration} hours</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Paid</p>
                  <p className="font-semibold text-green-600">{booking.totalPrice.toFixed(2)} MAD</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Status */}
            <div className="text-center">
              <Badge className="bg-green-100 text-green-800">{booking.status.toUpperCase()}</Badge>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2">Instructions:</h4>
              <ul className="text-xs space-y-1 text-gray-700">
                <li>• Show this QR code at the parking entrance</li>
                <li>• Keep this ticket visible in your vehicle</li>
                <li>• Arrive within 15 minutes of start time</li>
                <li>• Contact support for any issues</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleShare} className="flex-1">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={handleDownload} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        <Button onClick={onClose} className="w-full">
          Done
        </Button>
      </DialogContent>
    </Dialog>
  )
}
