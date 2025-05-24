"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export function FilterPanel() {
  const [priceRange, setPriceRange] = useState([0, 50])
  const [maxDistance, setMaxDistance] = useState([5])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [minRating, setMinRating] = useState([0])

  const features = [
    "Covered Parking",
    "Security Camera",
    "24/7 Access",
    "Electric Charging",
    "Valet Service",
    "Disabled Access",
    "Car Wash",
    "Online Payment",
  ]

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
  }

  const clearAllFilters = () => {
    setPriceRange([0, 50])
    setMaxDistance([5])
    setSelectedFeatures([])
    setMinRating([0])
  }

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-gray-900">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-1 text-gray-600" />
            <span className="text-gray-900">Clear All</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="text-sm font-medium mb-3 block text-gray-900">
            Price Range: {priceRange[0]} - {priceRange[1]} MAD/hour
          </label>
          <Slider value={priceRange} onValueChange={setPriceRange} max={100} min={0} step={5} className="w-full" />
        </div>

        {/* Distance */}
        <div>
          <label className="text-sm font-medium mb-3 block text-gray-900">Maximum Distance: {maxDistance[0]} km</label>
          <Slider value={maxDistance} onValueChange={setMaxDistance} max={10} min={0.1} step={0.1} className="w-full" />
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm font-medium mb-3 block text-gray-900">Minimum Rating: {minRating[0]} stars</label>
          <Slider value={minRating} onValueChange={setMinRating} max={5} min={0} step={0.5} className="w-full" />
        </div>

        {/* Features */}
        <div>
          <label className="text-sm font-medium mb-3 block text-gray-900">Features</label>
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature}
                  checked={selectedFeatures.includes(feature)}
                  onCheckedChange={() => toggleFeature(feature)}
                />
                <label
                  htmlFor={feature}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900"
                >
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {selectedFeatures.length > 0 && (
          <div>
            <label className="text-sm font-medium mb-2 block text-gray-900">Active Filters</label>
            <div className="flex flex-wrap gap-2">
              {selectedFeatures.map((feature) => (
                <Badge key={feature} variant="secondary" className="cursor-pointer">
                  {feature}
                  <X className="h-3 w-3 ml-1" onClick={() => toggleFeature(feature)} />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Apply Filters Button */}
        <Button className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  )
}
