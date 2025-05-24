"use client"

import { useEffect, useState } from "react"
import { GOOGLE_MAPS_CONFIG } from "@/lib/google-maps-config"

export function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!GOOGLE_MAPS_CONFIG.apiKey) {
      setError("Google Maps API key is not configured")
      return
    }

    if (window.google && window.google.maps) {
      setIsLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=${GOOGLE_MAPS_CONFIG.libraries.join(",")}&region=${GOOGLE_MAPS_CONFIG.region}&language=${GOOGLE_MAPS_CONFIG.language}&callback=initGoogleMaps`
    script.async = true
    script.defer = true

    window.initGoogleMaps = () => {
      setIsLoaded(true)
    }

    script.onerror = () => {
      setError("Failed to load Google Maps API")
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`)
      if (existingScript) {
        existingScript.remove()
      }
      delete window.initGoogleMaps
    }
  }, [])

  return { isLoaded, error }
}
