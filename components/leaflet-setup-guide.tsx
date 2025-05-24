"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, MapPin, Zap, Shield, Globe, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LeafletSetupGuide() {
  const advantages = [
    {
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      title: "Zero Configuration",
      description: "No API keys, tokens, or accounts required. Just works out of the box!",
    },
    {
      icon: <Shield className="h-5 w-5 text-green-500" />,
      title: "Completely Free",
      description: "Open source with no usage limits, billing, or restrictions.",
    },
    {
      icon: <Globe className="h-5 w-5 text-blue-500" />,
      title: "Excellent Morocco Coverage",
      description: "OpenStreetMap provides detailed, up-to-date maps of all Moroccan cities.",
    },
    {
      icon: <MapPin className="h-5 w-5 text-purple-500" />,
      title: "Lightweight & Fast",
      description: "Small library size with excellent performance on all devices.",
    },
  ]

  const features = [
    "Interactive maps with zoom and pan",
    "Custom markers for parking spots",
    "User location detection",
    "Rich popup content with booking",
    "Responsive design for mobile",
    "Multiple tile layer options",
    "No external dependencies",
    "Privacy-friendly (no tracking)",
    "Nearby parking detection",
    "Adjustable search radius",
    "Real-time distance calculation",
    "Animated markers and indicators",
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            Leaflet.js - Perfect for Morocco Smart Parking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Great news!</strong> Your map is already working! Leaflet.js requires no setup, API keys, or
              configuration. It's completely free and open source.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advantages.map((advantage, index) => (
              <Card key={index} className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {advantage.icon}
                    <div>
                      <h3 className="font-semibold mb-1">{advantage.title}</h3>
                      <p className="text-sm text-gray-600">{advantage.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">✨ Features Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-green-800 mb-2">🗺️ Map Data</h3>
                <ul className="text-sm space-y-1 text-green-700">
                  <li>• OpenStreetMap (collaborative, up-to-date)</li>
                  <li>• Detailed Morocco street coverage</li>
                  <li>• Arabic and French place names</li>
                  <li>• Community-maintained accuracy</li>
                  <li>• Regular updates from local contributors</li>
                  <li>• No data usage restrictions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-purple-800 mb-2">🚀 Performance</h3>
                <ul className="text-sm space-y-1 text-purple-700">
                  <li>• ~40KB gzipped library size</li>
                  <li>• Fast tile loading and caching</li>
                  <li>• Smooth animations and interactions</li>
                  <li>• Mobile-optimized touch controls</li>
                  <li>• Works offline with cached tiles</li>
                  <li>• No API rate limits</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-orange-800 mb-2">🔧 Technical Details</h3>
              <div className="space-y-2 text-sm text-orange-700">
                <p>
                  <strong>Library:</strong> Leaflet.js v1.9.4 (latest stable)
                </p>
                <p>
                  <strong>Tiles:</strong> OpenStreetMap (free, no limits)
                </p>
                <p>
                  <strong>CDN:</strong> Loaded from unpkg.com (reliable, fast)
                </p>
                <p>
                  <strong>Fallback:</strong> Static map if library fails to load
                </p>
                <p>
                  <strong>Privacy:</strong> No tracking, no data collection
                </p>
                <p>
                  <strong>Deployment:</strong> No environment variables needed
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-cyan-50 border-cyan-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-cyan-800 mb-2">🎯 Smart Features</h3>
                <ul className="text-sm space-y-1 text-cyan-700">
                  <li>• Automatic nearby parking detection</li>
                  <li>• Adjustable search radius (0.5-10km)</li>
                  <li>• Real-time distance calculation</li>
                  <li>• Visual proximity indicators</li>
                  <li>• Animated markers for nearby spots</li>
                  <li>• GPS location with Morocco validation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-indigo-50 border-indigo-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-indigo-800 mb-2">🌍 Morocco Focus</h3>
                <ul className="text-sm space-y-1 text-indigo-700">
                  <li>• Casablanca, Rabat, Marrakech coverage</li>
                  <li>• Fez, Tangier, Agadir support</li>
                  <li>• Local currency (MAD) integration</li>
                  <li>• Morocco bounds validation</li>
                  <li>• Arabic/French place names</li>
                  <li>• Cultural landmarks included</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Ready to deploy!</strong> Your Morocco Smart Parking map is fully functional with interactive
              markers, user location, nearby detection, and booking integration. No additional setup or environment
              variables required!
            </AlertDescription>
          </Alert>

          <div className="flex gap-4">
            <Button asChild className="flex-1">
              <a href="https://leafletjs.com/" target="_blank" rel="noopener noreferrer">
                Learn More About Leaflet
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">
                Explore OpenStreetMap
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
