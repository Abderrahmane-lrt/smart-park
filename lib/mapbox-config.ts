export const MAPBOX_CONFIG = {
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "",
  style: "mapbox://styles/mapbox/streets-v12", // Good for Morocco
  region: "MA", // Morocco
}

export const MOROCCO_BOUNDS = {
  north: 35.9,
  south: 27.6,
  east: -1.0,
  west: -13.2,
}

export const MOROCCO_CITIES = {
  casablanca: { lng: -7.5898, lat: 33.5731 },
  rabat: { lng: -6.8416, lat: 34.0209 },
  marrakech: { lng: -7.9811, lat: 31.6295 },
  fez: { lng: -5.0078, lat: 34.0181 },
  tangier: { lng: -5.834, lat: 35.7595 },
  agadir: { lng: -9.5981, lat: 30.4278 },
  meknes: { lng: -5.5473, lat: 33.8935 },
  oujda: { lng: -1.9086, lat: 34.6814 },
}

export const isLocationInMorocco = (lat: number, lng: number): boolean => {
  return (
    lat >= MOROCCO_BOUNDS.south &&
    lat <= MOROCCO_BOUNDS.north &&
    lng >= MOROCCO_BOUNDS.west &&
    lng <= MOROCCO_BOUNDS.east
  )
}

export const MAPBOX_STYLES = {
  streets: "mapbox://styles/mapbox/streets-v12",
  satellite: "mapbox://styles/mapbox/satellite-v9",
  outdoors: "mapbox://styles/mapbox/outdoors-v12",
  light: "mapbox://styles/mapbox/light-v11",
  dark: "mapbox://styles/mapbox/dark-v11",
}
