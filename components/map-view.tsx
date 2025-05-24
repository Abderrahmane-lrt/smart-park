"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { MapPin, Star, Navigation, Loader2, CheckCircle, Target, Filter } from "lucide-react"

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

interface MapViewProps {
  parkingSpots: ParkingSpot[]
  onSpotSelect: (spot: ParkingSpot) => void
}

declare global {
  interface Window {
    L: any
  }
}

export function MapView({ parkingSpots, onSpotSelect }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const userMarkerRef = useRef<any>(null)
  const radiusCircleRef = useRef<any>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [searchRadius, setSearchRadius] = useState([2]) // 2km default radius
  const [nearbySpots, setNearbySpots] = useState<ParkingSpot[]>([])
  const [showRadiusFilter, setShowRadiusFilter] = useState(false)

  // Morocco center coordinates (Casablanca)
  const moroccoCenter = { lat: 33.5731, lng: -7.5898 }

  useEffect(() => {
    initializeLeaflet()
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (mapLoaded && parkingSpots.length > 0) {
      updateParkingMarkers()
    }
  }, [mapLoaded, parkingSpots, userLocation, searchRadius])

  useEffect(() => {
    if (userLocation) {
      calculateNearbySpots()
    }
  }, [userLocation, parkingSpots, searchRadius])

  const initializeLeaflet = async () => {
    try {
      // Load Leaflet if not already loaded
      if (!window.L) {
        await loadLeafletLibrary()
      }

      if (!mapContainer.current) return

      // Initialize map
      map.current = window.L.map(mapContainer.current, {
        center: [moroccoCenter.lat, moroccoCenter.lng],
        zoom: 12,
        zoomControl: true,
        attributionControl: true,
      })

      // Add OpenStreetMap tiles
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map.current)

      setMapLoaded(true)
      setIsLoading(false)
      getUserLocation()
    } catch (err: any) {
      console.error("Map initialization error:", err)
      setError(`Failed to initialize map: ${err.message}`)
      setIsLoading(false)
    }
  }

  const loadLeafletLibrary = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Load CSS
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      link.crossOrigin = ""
      document.head.appendChild(link)

      // Load JS
      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      script.crossOrigin = ""
      script.onload = () => resolve()
      script.onerror = () => reject(new Error("Failed to load Leaflet library"))
      document.head.appendChild(script)
    })
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          setUserLocation(userPos)
          addUserLocationMarker(userPos)

          // Center map on user location if in Morocco
          if (isInMorocco(userPos)) {
            map.current.setView([userPos.lat, userPos.lng], 14)
          }
        },
        (error) => {
          console.warn("Geolocation error:", error)
          // Use default location (Casablanca) for demo
          const defaultPos = { lat: 33.5731, lng: -7.5898 }
          setUserLocation(defaultPos)
          addUserLocationMarker(defaultPos)
        },
      )
    } else {
      // Fallback to default location
      const defaultPos = { lat: 33.5731, lng: -7.5898 }
      setUserLocation(defaultPos)
      addUserLocationMarker(defaultPos)
    }
  }

  const addUserLocationMarker = (userPos: { lat: number; lng: number }) => {
    if (userMarkerRef.current) {
      map.current.removeLayer(userMarkerRef.current)
    }

    // Create custom user location icon
    const userIcon = window.L.divIcon({
      html: `
        <div style="
          width: 20px;
          height: 20px;
          background-color: #10B981;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          position: relative;
          animation: pulse 2s infinite;
        ">
          <div style="
            width: 8px;
            height: 8px;
            background-color: white;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          "></div>
        </div>
        <style>
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
          }
        </style>
      `,
      className: "user-location-marker",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    })

    // Add user location marker
    userMarkerRef.current = window.L.marker([userPos.lat, userPos.lng], { icon: userIcon })
      .addTo(map.current)
      .bindPopup(
        `<div style="padding: 8px; text-align: center; color: black;">
          <strong>📍 Your Location</strong><br>
          <small>Searching ${searchRadius[0]}km radius</small>
        </div>`,
      )

    // Add search radius circle
    updateRadiusCircle(userPos)
  }

  const updateRadiusCircle = (userPos: { lat: number; lng: number }) => {
    if (radiusCircleRef.current) {
      map.current.removeLayer(radiusCircleRef.current)
    }

    radiusCircleRef.current = window.L.circle([userPos.lat, userPos.lng], {
      color: "#3B82F6",
      fillColor: "#3B82F6",
      fillOpacity: 0.1,
      radius: searchRadius[0] * 1000, // Convert km to meters
      weight: 2,
      dashArray: "5, 5",
    }).addTo(map.current)
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const calculateNearbySpots = () => {
    if (!userLocation) return

    const spotsWithDistance = parkingSpots.map((spot) => ({
      ...spot,
      distance: calculateDistance(userLocation.lat, userLocation.lng, spot.coordinates[0], spot.coordinates[1]),
    }))

    const nearby = spotsWithDistance
      .filter((spot) => spot.distance <= searchRadius[0])
      .sort((a, b) => a.distance - b.distance)

    setNearbySpots(nearby)
  }

  const isInMorocco = (position: { lat: number; lng: number }) => {
    return position.lat >= 27.6 && position.lat <= 35.9 && position.lng >= -13.2 && position.lng <= -1.0
  }

  const updateParkingMarkers = () => {
    // Clear existing markers
    markersRef.current.forEach((marker) => map.current.removeLayer(marker))
    markersRef.current = []

    parkingSpots.forEach((spot) => {
      const distance = userLocation
        ? calculateDistance(userLocation.lat, userLocation.lng, spot.coordinates[0], spot.coordinates[1])
        : spot.distance

      const isNearby = userLocation ? distance <= searchRadius[0] : false
      const markerColor = spot.available > 5 ? "#2563EB" : spot.available > 0 ? "#F59E0B" : "#DC2626"
      const opacity = isNearby ? 1 : 0.4
      const scale = isNearby ? 1 : 0.8

      // Create custom parking marker
      const parkingIcon = window.L.divIcon({
        html: `
          <div style="
            width: ${40 * scale}px;
            height: ${40 * scale}px;
            background-color: ${markerColor};
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: ${12 * scale}px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: transform 0.2s;
            opacity: ${opacity};
            ${isNearby ? "animation: bounce 2s infinite;" : ""}
          " 
          onmouseover="this.style.transform='scale(1.1)'"
          onmouseout="this.style.transform='scale(1)'"
          >
            ${spot.available}
            ${
              isNearby
                ? `<div style="
              position: absolute;
              top: -8px;
              right: -8px;
              width: 16px;
              height: 16px;
              background-color: #10B981;
              border: 2px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 8px;
            ">✓</div>`
                : ""
            }
          </div>
          <style>
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-5px); }
              60% { transform: translateY(-3px); }
            }
          </style>
        `,
        className: `parking-marker ${isNearby ? "nearby" : "distant"}`,
        iconSize: [40 * scale, 40 * scale],
        iconAnchor: [20 * scale, 20 * scale],
      })

      // Create popup content
      const popupContent = `
        <div style="padding: 12px; max-width: 280px; font-family: system-ui, -apple-system, sans-serif; color: black;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: bold; color: black;">${spot.name}</h3>
            ${
              isNearby
                ? `<span style="
              background: #10B981;
              color: white;
              padding: 2px 6px;
              border-radius: 8px;
              font-size: 10px;
              font-weight: bold;
            ">NEARBY</span>`
                : ""
            }
          </div>
          
          <p style="margin: 0 0 8px 0; color: black; font-size: 14px;">${spot.address}</p>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="color: #F59E0B; font-size: 14px;">★</span>
                <span style="font-size: 14px; color: black;">${spot.rating}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="color: black; font-size: 14px;">📍</span>
                <span style="font-size: 14px; color: black;">${distance.toFixed(1)}km</span>
              </div>
            </div>
            <span style="font-size: 16px; font-weight: bold; color: #2563EB;">${spot.price} MAD/h</span>
          </div>
          
          <div style="margin-bottom: 12px;">
            <span style="
              background: ${markerColor}; 
              color: white; 
              padding: 4px 8px; 
              border-radius: 12px; 
              font-size: 12px;
              font-weight: 500;
            ">
              ${spot.available}/${spot.total} available
            </span>
          </div>
          
          <div style="margin-bottom: 12px; display: flex; flex-wrap gap: 4px;">
            ${spot.features
              .map(
                (feature) =>
                  `<span style="
                background: #F3F4F6; 
                color: black;
                padding: 2px 6px; 
                border-radius: 8px; 
                font-size: 11px;
              ">${feature}</span>`,
              )
              .join("")}
          </div>
          
          <button 
            onclick="window.selectParking && window.selectParking(${spot.id})" 
            style="
              width: 100%; 
              padding: 8px 16px; 
              background: ${spot.available === 0 ? "#9CA3AF" : isNearby ? "#10B981" : "#2563EB"}; 
              color: white; 
              border: none; 
              border-radius: 6px; 
              font-weight: bold; 
              cursor: ${spot.available === 0 ? "not-allowed" : "pointer"};
              font-size: 14px;
            "
            ${spot.available === 0 ? "disabled" : ""}
          >
            ${spot.available === 0 ? "Full" : isNearby ? "Book Nearby Spot" : "Book Now"}
          </button>
        </div>
      `

      // Create marker
      const marker = window.L.marker([spot.coordinates[0], spot.coordinates[1]], { icon: parkingIcon })
        .addTo(map.current)
        .bindPopup(popupContent, {
          maxWidth: 300,
          closeButton: true,
        })

      markersRef.current.push(marker)
    })

    // Set up global function for booking
    window.selectParking = (spotId: number) => {
      const spot = parkingSpots.find((s) => s.id === spotId)
      if (spot) {
        onSpotSelect(spot)
        map.current.closePopup()
      }
    }

    // Update radius circle if user location exists
    if (userLocation) {
      updateRadiusCircle(userLocation)
    }
  }

  const centerOnUserLocation = () => {
    if (userLocation && map.current) {
      map.current.setView([userLocation.lat, userLocation.lng], 16)
      if (userMarkerRef.current) {
        userMarkerRef.current.openPopup()
      }
    }
  }

  const fitMapToParkingSpots = () => {
    if (map.current && nearbySpots.length > 0) {
      const group = new window.L.featureGroup(
        markersRef.current.filter((_, index) => {
          const spot = parkingSpots[index]
          return nearbySpots.some((nearby) => nearby.id === spot.id)
        }),
      )

      if (userMarkerRef.current) {
        group.addLayer(userMarkerRef.current)
      }

      map.current.fitBounds(group.getBounds().pad(0.1))
    }
  }

  const handleRadiusChange = (newRadius: number[]) => {
    setSearchRadius(newRadius)
    if (userLocation) {
      updateRadiusCircle(userLocation)
    }
  }

  // Fallback map component
  const FallbackMap = () => (
    <div className="h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-20"></div>
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
        <p className="text-sm font-medium text-black">📍 Morocco - Smart Parking (Fallback Mode)</p>
      </div>
      {/* Simplified fallback content */}
    </div>
  )

  if (error) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[500px]">
            <CardContent className="p-6 h-full">
              <Alert className="mb-4">
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-semibold text-black">Map Loading Error</p>
                    <p className="text-sm text-black">{error}</p>
                  </div>
                </AlertDescription>
              </Alert>
              <FallbackMap />
            </CardContent>
          </Card>
        </div>
        <ParkingSidebar parkingSpots={nearbySpots} onSpotSelect={onSpotSelect} userLocation={userLocation} />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Container */}
      <div className="lg:col-span-2">
        <Card className="h-[500px]">
          <CardContent className="p-0 h-full relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-black">Loading Morocco map...</p>
                  <p className="text-xs text-black mt-1">Detecting nearby parking...</p>
                </div>
              </div>
            )}

            {/* Leaflet Map Container */}
            <div ref={mapContainer} className="w-full h-full rounded-lg" />

            {/* Map Controls */}
            {mapLoaded && (
              <div className="absolute top-4 left-4 space-y-2 z-[1000]">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-md">
                  <p className="text-sm font-medium text-black">📍 Morocco - Smart Parking</p>
                  {nearbySpots.length > 0 && (
                    <p className="text-xs text-green-600">{nearbySpots.length} spots nearby</p>
                  )}
                </div>

                {userLocation && (
                  <Button
                    size="sm"
                    onClick={centerOnUserLocation}
                    className="bg-white/90 backdrop-blur-sm text-black hover:bg-white shadow-md"
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    My Location
                  </Button>
                )}

                <Button
                  size="sm"
                  onClick={fitMapToParkingSpots}
                  className="bg-white/90 backdrop-blur-sm text-black hover:bg-white shadow-md"
                >
                  <Target className="h-4 w-4 mr-1" />
                  Show Nearby
                </Button>

                <Button
                  size="sm"
                  onClick={() => setShowRadiusFilter(!showRadiusFilter)}
                  className="bg-white/90 backdrop-blur-sm text-black hover:bg-white shadow-md"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Radius
                </Button>
              </div>
            )}

            {/* Radius Filter */}
            {showRadiusFilter && mapLoaded && (
              <div className="absolute top-4 left-48 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md z-[1000] min-w-[200px]">
                <h4 className="text-sm font-semibold mb-2 text-black">Search Radius: {searchRadius[0]}km</h4>
                <Slider
                  value={searchRadius}
                  onValueChange={handleRadiusChange}
                  max={10}
                  min={0.5}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-black mt-1">
                  <span>0.5km</span>
                  <span>10km</span>
                </div>
              </div>
            )}

            {/* Legend */}
            {mapLoaded && (
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md z-[1000]">
                <h4 className="text-sm font-semibold mb-2 text-black">Legend</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full relative">
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                    </div>
                    <span className="text-black">Nearby parking (within radius)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full opacity-40"></div>
                    <span className="text-black">Distant parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
                    <span className="text-black">Limited spots (1-5)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                    <span className="text-black">Full</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-black">Your location</span>
                  </div>
                </div>
              </div>
            )}

            {/* Nearby Spots Summary */}
            {mapLoaded && nearbySpots.length > 0 && (
              <div className="absolute top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-3 shadow-md z-[1000]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">{nearbySpots.length} Nearby Spots</p>
                    <p className="text-xs text-green-600">
                      {nearbySpots.filter((s) => s.available > 0).length} available within {searchRadius[0]}km
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Parking List Sidebar */}
      <ParkingSidebar parkingSpots={nearbySpots} onSpotSelect={onSpotSelect} userLocation={userLocation} />
    </div>
  )
}

// Enhanced sidebar component
function ParkingSidebar({
  parkingSpots,
  onSpotSelect,
  userLocation,
}: {
  parkingSpots: ParkingSpot[]
  onSpotSelect: (spot: ParkingSpot) => void
  userLocation: { lat: number; lng: number } | null
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-black">
          {userLocation ? "Nearby Parking" : "All Parking"} ({parkingSpots.length})
        </h3>
        {userLocation && parkingSpots.length > 0 && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Within radius
          </Badge>
        )}
      </div>

      {parkingSpots.length === 0 && userLocation && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-orange-800">No parking spots nearby</p>
            <p className="text-xs text-orange-600">Try increasing the search radius</p>
          </CardContent>
        </Card>
      )}

      {parkingSpots.map((spot) => (
        <Card key={spot.id} className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-black">{spot.name}</h4>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      NEARBY
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{spot.address}</p>
                </div>
                <Badge variant={spot.available > 5 ? "default" : "destructive"}>
                  {spot.available}/{spot.total}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-black">{spot.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-green-600">{spot.distance.toFixed(1)}km</span>
                  </div>
                </div>
                <span className="font-bold text-blue-600">{spot.price} MAD/h</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {spot.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => onSpotSelect(spot)}
                disabled={spot.available === 0}
              >
                {spot.available === 0 ? "Full" : "Book Nearby Spot"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
