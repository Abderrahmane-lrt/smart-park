"use client"

import { Navigation } from "@/components/navigation"
import { LeafletSetupGuide } from "@/components/leaflet-setup-guide"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowLeft, ExternalLink, CheckCircle, Zap, Shield } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isAuthenticated={false} onAuthClick={() => {}} onLogout={() => {}} />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to App
            </Link>
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <MapPin className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold">ParkSmart Setup</h1>
          </div>
          <p className="text-gray-600">Morocco Smart Parking System powered by Leaflet.js & OpenStreetMap</p>
        </div>

        <div className="max-w-4xl">
          {/* Success Banner */}
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <h2 className="text-xl font-bold text-green-800">🎉 Setup Complete!</h2>
                  <p className="text-green-700">
                    Your map is ready to use. No API keys, tokens, or configuration required!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-800">Zero Config</h3>
                <p className="text-sm text-blue-600">No environment variables needed</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-800">Completely Free</h3>
                <p className="text-sm text-green-600">No usage limits or billing</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-800">Morocco Ready</h3>
                <p className="text-sm text-purple-600">Optimized for Moroccan cities</p>
              </CardContent>
            </Card>
          </div>

          <LeafletSetupGuide />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Leaflet.js?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>Perfect choice for this project because:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>No API key management hassles</li>
                    <li>No billing or usage limits</li>
                    <li>Excellent Morocco map coverage</li>
                    <li>Lightweight and fast performance</li>
                    <li>Open source and privacy-friendly</li>
                    <li>Deploy anywhere without restrictions</li>
                  </ul>
                  <div className="pt-3">
                    <Button asChild className="w-full">
                      <Link href="/">
                        <MapPin className="h-4 w-4 mr-2" />
                        View Interactive Map
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deployment Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>Your app is ready for production:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>No sensitive environment variables</li>
                    <li>No external API dependencies</li>
                    <li>Works on any hosting platform</li>
                    <li>No configuration required</li>
                    <li>Scales automatically</li>
                    <li>Privacy-compliant by design</li>
                  </ul>
                  <div className="pt-3 space-y-2">
                    <Button variant="outline" asChild className="w-full">
                      <a href="https://leafletjs.com/" target="_blank" rel="noopener noreferrer">
                        Leaflet.js Documentation
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                      <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">
                        OpenStreetMap
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Deployment Success */}
          <Card className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready for Production!</h2>
                <p className="text-gray-600 mb-4">
                  Your Morocco Smart Parking system is fully functional and can be deployed to any platform without
                  additional configuration.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button size="sm" variant="outline">
                    Vercel
                  </Button>
                  <Button size="sm" variant="outline">
                    Netlify
                  </Button>
                  <Button size="sm" variant="outline">
                    AWS
                  </Button>
                  <Button size="sm" variant="outline">
                    Railway
                  </Button>
                  <Button size="sm" variant="outline">
                    DigitalOcean
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
