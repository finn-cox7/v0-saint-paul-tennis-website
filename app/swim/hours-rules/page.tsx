"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export default function HoursRulesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative h-[400px] w-full overflow-hidden">
          <Image
            src="/sptc_pool_ariel_2.jpg"
            alt="Saint Paul Tennis Club pool and balcony area with pergola and seating"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-8">Swim Hours & Rules</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">The Saint Paul Tennis Club Pool's Season:</h2>
              <h3 className="text-lg text-foreground mb-6">Memorial Day Weekend through Labor Day Monday</h3>
              <h2 className="text-xl font-semibold text-foreground mb-2">Pool Hours:</h2>
              <h3 className="text-lg text-foreground mb-12">
                Daily from 6:00 a.m. - 9:00 p.m. or Sunset (whichever is earlier)
              </h3>

              <div className="mt-8 flex justify-left mt-8">
                <Link
                  href="/swim/schedule"
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg transition-colors"
                  style={{ backgroundColor: "#5a7d5d" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4a6d4d")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5a7d5d")}
                >
                  Pool Schedule
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Pool Rules:</h2>
              <ul className="list-disc pl-5 text-foreground space-y-2">
                <li>Have fun!</li>
                <li>Enjoy the club and please be respectful to the staff and facility.</li>
                <li>No glass of any kind allowed inside the pool gate.</li>
                <li>Food may be enjoyed in the pergola and clubhouse area only.</li>
                <li>Beverages may be enjoyed on the pool deck, not in the pool.</li>
                <li>Walk at all times on the pool deck.</li>
                <li>No floaties in the deep end of the pool (kickboards, noodles, floaty wings, etc.)</li>
                <li>Sponge balls are the only balls allowed in the pool. Tennis balls are not allowed in the pool.</li>
                <li>Play nice...No horseplay (fighting, hitting, strangling, shoulder rides)</li>
                <li>NO diving in the shallow end. Dive in the deep end only</li>
                <li>Do not swim in front of the diving board when people are jumping off of it.</li>
                <li>One bounce on the board.</li>
                <li>One person on the board at all times.</li>
                <li>Feet have to be the last thing that leave the board.</li>
                <li>Gainers are not permitted off the diving board</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
