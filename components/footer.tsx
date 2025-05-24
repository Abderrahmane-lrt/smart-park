"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Car, MapPin, Phone, Mail, Facebook, Twitter, Instagram, ExternalLink } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Safety", href: "/safety" },
      { name: "Community Guidelines", href: "/guidelines" },
    ],
    legal: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Accessibility", href: "/accessibility" },
    ],
    cities: [
      { name: "Casablanca", href: "/casablanca" },
      { name: "Rabat", href: "/rabat" },
      { name: "Marrakech", href: "/marrakech" },
      { name: "Fez", href: "/fez" },
    ],
  }

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Car className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">ParkSmart</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Morocco's leading smart parking solution. Find, book, and pay for parking spots across major Moroccan
              cities with ease.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Available in 8+ Moroccan cities</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+212 5XX-XXXX-XX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@parksmart.ma</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-200">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-200">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-200">Cities</h3>
            <ul className="space-y-2">
              {footerLinks.cities.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-600" />

        {/* App Download Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4 text-gray-200">Download Our App</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the ParkSmart mobile app for the best parking experience in Morocco.
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="bg-transparent border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-blue-400"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                App Store
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-blue-400"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Google Play
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-200">Follow Us</h3>
            <p className="text-gray-400 text-sm mb-4">Stay updated with the latest news and parking tips.</p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent border-gray-500 text-gray-300 hover:bg-blue-600 hover:border-blue-600"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent border-gray-500 text-gray-300 hover:bg-blue-400 hover:border-blue-400"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent border-gray-500 text-gray-300 hover:bg-pink-600 hover:border-pink-600"
              >
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-600" />

        {/* Legal Links */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4 text-gray-200">Legal</h3>
          <div className="flex flex-wrap gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-gray-600" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} ParkSmart Morocco. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>🇲🇦 Made in Morocco</span>
            <span>•</span>
            <span>Powered by OpenStreetMap</span>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-blue-600 py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <p className="text-white text-sm mb-2 md:mb-0">
              🎉 <strong>New!</strong> Now available in Tangier and Agadir. Book your parking spot today!
            </p>
            <Button size="sm" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Explore Cities
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
