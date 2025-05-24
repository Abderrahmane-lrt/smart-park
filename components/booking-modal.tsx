"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, MapPin, Star, CreditCard, Shield } from "lucide-react"
import { TicketModal } from "@/components/ticket-modal"
import { useLanguage } from "@/hooks/use-language"

interface ParkingSpot {
  id: number
  name: string
  address: string
  price: number
  rating: number
  distance: number
  available: number
  total: number
  features: string[]
}

interface BookingModalProps {
  parking: ParkingSpot
  isOpen: boolean
  onClose: () => void
  isAuthenticated: boolean
  onAuthRequired: () => void
}

export function BookingModal({ parking, isOpen, onClose, isAuthenticated, onAuthRequired }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [showTicket, setShowTicket] = useState(false)
  const [bookingData, setBookingData] = useState<any>(null)

  const { t } = useLanguage()

  const calculateDuration = () => {
    if (!startTime || !endTime) return 0
    const start = new Date(`2024-01-01 ${startTime}`)
    const end = new Date(`2024-01-01 ${endTime}`)
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60)
  }

  const duration = calculateDuration()
  const totalPrice = duration * parking.price

  const handleBooking = () => {
    if (!isAuthenticated) {
      onAuthRequired()
      return
    }

    const booking = {
      id: `PKG-${Date.now()}`,
      parking,
      date: selectedDate,
      startTime,
      endTime,
      duration,
      totalPrice,
      qrCode: `QR-${Date.now()}`,
      status: "confirmed",
    }

    setBookingData(booking)
    setShowTicket(true)
    onClose()
  }

  const isFormValid = selectedDate && startTime && endTime && duration > 0

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto z-[9999]">
          <DialogHeader>
            <DialogTitle>{t("bookParkingSpot")}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Parking Details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{parking.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{parking.address}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{parking.rating}</span>
                    </div>
                    <Badge variant="secondary">
                      {parking.available}/{parking.total} available
                    </Badge>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{parking.price} MAD/hour</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {parking.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date">{t("date")}</Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="start-time">{t("startTime")}</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-time">{t("endTime")}</Label>
                    <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                  </div>
                </div>

                {duration > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Booking Summary</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>{t("duration")}:</span>
                        <span>
                          {duration} {t("hours")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("rate")}:</span>
                        <span>
                          {parking.price} MAD/{t("perHour")}
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>{t("total")}:</span>
                        <span>{totalPrice.toFixed(2)} MAD</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {t("paymentMethod")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <input type="radio" name="payment" defaultChecked />
                    <div className="flex-1">
                      <p className="font-medium">{t("creditCard")}</p>
                      <p className="text-sm text-gray-600">{t("comingSoon")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg opacity-50">
                    <input type="radio" name="payment" disabled />
                    <div className="flex-1">
                      <p className="font-medium">PayPal</p>
                      <p className="text-sm text-gray-600">Coming soon</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg opacity-50">
                    <input type="radio" name="payment" disabled />
                    <div className="flex-1">
                      <p className="font-medium">Mobile Payment</p>
                      <p className="text-sm text-gray-600">Orange Money, Inwi Money</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <Shield className="h-4 w-4" />
              <span>Your payment information is encrypted and secure</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                {t("cancel")}
              </Button>
              <Button onClick={handleBooking} disabled={!isFormValid} className="flex-1">
                {!isAuthenticated ? t("signInToBook") : `${t("bookNow")} ${totalPrice.toFixed(2)} MAD`}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showTicket && bookingData && (
        <TicketModal booking={bookingData} isOpen={showTicket} onClose={() => setShowTicket(false)} />
      )}
    </>
  )
}
