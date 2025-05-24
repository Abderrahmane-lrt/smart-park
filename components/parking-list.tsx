"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Shield, Zap, Car } from "lucide-react"

interface ParkingSpot {
  id: number
  name: string
  address: string
  price: number
  rating: number
  distance: number
  available: number
  total: number
  coordinates: [number, number]
  features: string[]
}

interface ParkingListProps {
  parkingSpots: ParkingSpot[]
  onSpotSelect: (spot: ParkingSpot) => void
}

export function ParkingList({ parkingSpots, onSpotSelect }: ParkingListProps) {
  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case "security":
        return <Shield className="h-4 w-4" />
      case "electric charging":
        return <Zap className="h-4 w-4" />
      case "covered":
        return <Car className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Available Parking Spots</h2>
        <p className="text-gray-600">{parkingSpots.length} results found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parkingSpots.map((spot) => (
          <Card key={spot.id} className="hover:shadow-lg transition-shadow bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{spot.name}</h3>
                    <p className="text-gray-600 text-sm">{spot.address}</p>
                  </div>
                  <Badge
                    variant={spot.available > 10 ? "default" : spot.available > 5 ? "secondary" : "destructive"}
                    className="ml-2"
                  >
                    {spot.available}/{spot.total}
                  </Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-semibold">{spot.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-blue-500">
                      <MapPin className="h-4 w-4" />
                      <span className="font-semibold">{spot.distance}km</span>
                    </div>
                    <p className="text-xs text-gray-600">Distance</p>
                  </div>
                  <div>
                    <div className="text-green-600 font-bold text-lg">{spot.price} MAD</div>
                    <p className="text-xs text-gray-600">per hour</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {spot.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
                        {getFeatureIcon(feature)}
                        <span className="text-xs text-gray-900">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability Status */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Availability</span>
                    <span
                      className={`text-sm font-semibold ${
                        spot.available > 10 ? "text-green-600" : spot.available > 5 ? "text-yellow-600" : "text-red-600"
                      }`}
                    >
                      {spot.available > 10
                        ? "High"
                        : spot.available > 5
                          ? "Medium"
                          : spot.available > 0
                            ? "Low"
                            : "Full"}
                    </span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        spot.available > 10 ? "bg-green-500" : spot.available > 5 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${(spot.available / spot.total) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full bg-black text-white hover:bg-gray-800"
                  onClick={() => onSpotSelect(spot)}
                  disabled={spot.available === 0}
                  size="lg"
                >
                  {spot.available === 0 ? "Fully Booked" : "Book This Spot"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
