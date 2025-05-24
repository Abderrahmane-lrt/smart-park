"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Search, Filter, Clock, DollarSign } from "lucide-react"
import { MapView } from "@/components/map-view"
import { ParkingList } from "@/components/parking-list"
import { FilterPanel } from "@/components/filter-panel"
import { BookingModal } from "@/components/booking-modal"
import { AuthModal } from "@/components/auth-modal"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LanguageProvider, useLanguage } from "@/hooks/use-language"

export default function HomePage() {
  return (
    <LanguageProvider>
      <HomePageContent />
    </LanguageProvider>
  )
}

function HomePageContent() {
  const { t } = useLanguage()
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedParking, setSelectedParking] = useState<any>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const mockParkingSpots = [
    {
      id: 1,
      name: "Centre Ville Parking",
      address: "Avenue Mohammed V, Casablanca",
      price: 15,
      rating: 4.5,
      distance: 0.3,
      available: 12,
      total: 50,
      coordinates: [33.5731, -7.5898], // Casablanca city center
      features: ["Covered", "Security", "24/7"],
    },
    {
      id: 2,
      name: "Marina Shopping Parking",
      address: "Boulevard de la Corniche, Casablanca",
      price: 20,
      rating: 4.8,
      distance: 0.8,
      available: 8,
      total: 100,
      coordinates: [33.6061, -7.6331], // Marina area
      features: ["Covered", "Valet", "Electric Charging"],
    },
    {
      id: 3,
      name: "Hassan II Mosque Parking",
      address: "Boulevard Sidi Mohammed Ben Abdallah, Casablanca",
      price: 10,
      rating: 4.2,
      distance: 1.2,
      available: 25,
      total: 75,
      coordinates: [33.6084, -7.6326], // Near Hassan II Mosque
      features: ["Open Air", "Security"],
    },
    {
      id: 4,
      name: "Rabat Agdal Parking",
      address: "Avenue Allal Ben Abdellah, Rabat",
      price: 12,
      rating: 4.3,
      distance: 2.1,
      available: 18,
      total: 60,
      coordinates: [33.9716, -6.8498], // Rabat Agdal
      features: ["Covered", "Security", "Shopping Center"],
    },
    {
      id: 5,
      name: "Marrakech Medina Parking",
      address: "Place Jemaa el-Fnaa, Marrakech",
      price: 8,
      rating: 4.0,
      distance: 5.2,
      available: 5,
      total: 40,
      coordinates: [31.6295, -7.9811], // Marrakech main square
      features: ["Open Air", "Tourist Area"],
    },
    {
      id: 6,
      name: "Fez Medina Parking",
      address: "Bab Boujloud, Fez",
      price: 6,
      rating: 3.8,
      distance: 8.1,
      available: 0,
      total: 30,
      coordinates: [34.0669, -4.9684], // Fez medina entrance
      features: ["Historic Area", "Walking Distance"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        isAuthenticated={isAuthenticated}
        onAuthClick={() => setShowAuth(true)}
        onLogout={() => setIsAuthenticated(false)}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Search and Filter Bar */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {t("filters")}
              </Button>
              <Button variant={viewMode === "map" ? "default" : "outline"} onClick={() => setViewMode("map")}>
                {t("map")}
              </Button>
              <Button variant={viewMode === "list" ? "default" : "outline"} onClick={() => setViewMode("list")}>
                {t("list")}
              </Button>
            </div>
          </div>

          {showFilters && <FilterPanel />}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">{t("availableSpots")}</p>
                  <p className="text-2xl font-bold text-gray-900">45</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">{t("avgDistance")}</p>
                  <p className="text-2xl font-bold text-gray-900">0.7km</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">{t("avgPrice")}</p>
                  <p className="text-2xl font-bold text-gray-900">15 MAD</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        {viewMode === "map" ? (
          <MapView parkingSpots={mockParkingSpots} onSpotSelect={setSelectedParking} />
        ) : (
          <ParkingList parkingSpots={mockParkingSpots} onSpotSelect={setSelectedParking} />
        )}
      </main>

      <Footer />

      {/* Modals */}
      {selectedParking && (
        <BookingModal
          parking={selectedParking}
          isOpen={!!selectedParking}
          onClose={() => setSelectedParking(null)}
          isAuthenticated={isAuthenticated}
          onAuthRequired={() => setShowAuth(true)}
        />
      )}

      {showAuth && (
        <AuthModal
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          onSuccess={() => {
            setIsAuthenticated(true)
            setShowAuth(false)
          }}
        />
      )}
    </div>
  )
}
