"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, CheckCircle, Copy, MapPin } from "lucide-react"
import { useState } from "react"

export function MapboxSetupGuide() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(step)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const steps = [
    {
      title: "Create Mapbox Account",
      description: "Sign up for a free Mapbox account",
      action: "Sign Up",
      link: "https://account.mapbox.com/auth/signup/",
      details: [
        "Create a free account (no credit card required)",
        "Verify your email address",
        "Access your account dashboard",
      ],
    },
    {
      title: "Get Access Token",
      description: "Generate your Mapbox access token",
      action: "Access Tokens",
      link: "https://account.mapbox.com/access-tokens/",
      details: [
        "Go to your Access Tokens page",
        "Copy your 'Default public token' or create a new one",
        "Public tokens start with 'pk.'",
      ],
    },
    {
      title: "Configure Token (Optional)",
      description: "Set up URL restrictions for security",
      action: "Token Settings",
      link: "https://account.mapbox.com/access-tokens/",
      details: [
        "Click on your token to configure it",
        "Add URL restrictions for production",
        "Enable only required scopes",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Mapbox Setup for Morocco Smart Parking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Mapbox is easier to set up than Google Maps and offers excellent Morocco coverage with a generous free
              tier (50,000 map loads per month).
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{index + 1}</Badge>
                        <h3 className="font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                      <ul className="text-sm space-y-1">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={step.link} target="_blank" rel="noopener noreferrer">
                        {step.action}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Environment Variable Setup</h3>
              <p className="text-sm text-gray-600 mb-3">Add your Mapbox access token to your environment variables:</p>

              <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm relative">
                <code>NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_token_here</code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2 h-6 w-6 p-0 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard("NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_token_here", 5)}
                >
                  {copiedStep === 5 ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>

              <div className="mt-3 space-y-2 text-sm">
                <p>
                  • Create a <code className="bg-gray-200 px-1 rounded">.env.local</code> file in your project root
                </p>
                <p>• Add the line above with your actual access token</p>
                <p>• Restart your development server</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-green-800 mb-2">✅ Mapbox Advantages</h3>
                <ul className="text-sm space-y-1 text-green-700">
                  <li>• No credit card required for signup</li>
                  <li>• 50,000 free map loads per month</li>
                  <li>• Excellent Morocco street coverage</li>
                  <li>• Easy token management</li>
                  <li>• Beautiful map styles</li>
                  <li>• Fast loading and smooth animations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-orange-800 mb-2">🔒 Security Tips</h3>
                <ul className="text-sm space-y-1 text-orange-700">
                  <li>• Use public tokens (pk.) for web apps</li>
                  <li>• Add URL restrictions in production</li>
                  <li>• Monitor usage in your dashboard</li>
                  <li>• Rotate tokens periodically</li>
                  <li>• Never commit tokens to version control</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Ready to go!</strong> Once you add your token, the map will automatically load with
              Morocco-focused features including Casablanca, Rabat, Marrakech, and other major cities.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
