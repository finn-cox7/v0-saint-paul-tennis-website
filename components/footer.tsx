import { Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Club Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Saint Paul Tennis Club</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>
                  1065 Osceola Avenue
                  <br />
                  Saint Paul, MN 55105
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span>(651) 224-3742</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>info@saintpaultennisclub.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Member Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/member-portal" className="hover:text-primary-foreground/80 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/board-portal" className="hover:text-primary-foreground/80 transition-colors">
                  Board Member Portal
                </Link>
              </li>
              <li>
                <Link href="/member-portal" className="hover:text-primary-foreground/80 transition-colors">
                  Send Pin Reminder
                </Link>
              </li>
              <li>
                <Link href="/member-portal" className="hover:text-primary-foreground/80 transition-colors">
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/membership" className="hover:text-primary-foreground/80 transition-colors">
                  Guest Passes
                </Link>
              </li>
              <li>
                <a
                  href="https://sptcapparel.myshopify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground/80 transition-colors"
                >
                  Apparel
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; 2025 Saint Paul Tennis Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
