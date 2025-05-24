export const LEAFLET_CONFIG = {
  defaultCenter: { lat: 33.5731, lng: -7.5898 }, // Casablanca
  defaultZoom: 12,
  maxZoom: 19,
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}

export const TILE_LAYERS = {
  openStreetMap: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  cartoPositron: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  },
  cartoVoyager: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  },
}

export const MOROCCO_BOUNDS = {
  north: 35.9,
  south: 27.6,
  east: -1.0,
  west: -13.2,
}

export const MOROCCO_CITIES = {
  casablanca: { lat: 33.5731, lng: -7.5898 },
  rabat: { lat: 34.0209, lng: -6.8416 },
  marrakech: { lat: 31.6295, lng: -7.9811 },
  fez: { lat: 34.0181, lng: -5.0078 },
  tangier: { lat: 35.7595, lng: -5.834 },
  agadir: { lat: 30.4278, lng: -9.5981 },
  meknes: { lat: 33.8935, lng: -5.5473 },
  oujda: { lat: 34.6814, lng: -1.9086 },
}

export const isLocationInMorocco = (lat: number, lng: number): boolean => {
  return (
    lat >= MOROCCO_BOUNDS.south &&
    lat <= MOROCCO_BOUNDS.north &&
    lng >= MOROCCO_BOUNDS.west &&
    lng <= MOROCCO_BOUNDS.east
  )
}

export const MARKER_COLORS = {
  available: "#2563EB", // Blue for 5+ spots
  limited: "#F59E0B", // Orange for 1-5 spots
  full: "#DC2626", // Red for 0 spots
  user: "#10B981", // Green for user location
}

// Leaflet library configuration
export const LEAFLET_CDN = {
  css: {
    url: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
    integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",
  },
  js: {
    url: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
    integrity: "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=",
  },
}
