import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export default function TennisSchedulePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative h-[400px] w-full overflow-hidden">
          <Image
            src="/images/sptc_balcony.jpg"
            alt="Saint Paul Tennis Club tennis courts"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-8">Tennis Schedule</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Court Hours</h2>
              <ul className="list-disc pl-5 text-foreground space-y-2 mb-8">
                <li>
                  <span className="font-bold">7:30 a.m. – Dusk</span> Courts open for play
                </li>
                <li>
                  <span className="font-bold">3:30 – 4:00 p.m.</span> Courts closed for grooming (daily)
                </li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mb-4">Court Availability</h2>
              <ul className="list-disc pl-5 text-foreground space-y-2 mb-8">
                <li>4 Har-Tru clay courts available</li>
                <li>Court 4 has priority for tennis pro instruction</li>
                <li>Courts 1–3 should be reserved before Court 4</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mb-4">Reservation Windows</h2>
              <ul className="list-disc pl-5 text-foreground space-y-2">
                <li>Reservations available up to 3 days in advance</li>
                <li>Maximum 1.5 hours per reservation</li>
                <li>Single membership: 1 court per day</li>
                <li>Family membership: 2 courts per day</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Programming Blocks</h2>
              <p className="text-muted-foreground mb-4">Courts may be blocked for the following activities:</p>
              <ul className="list-disc pl-5 text-foreground space-y-2 mb-8">
                <li>
                  <span className="font-bold">Clinics</span> – Group instruction sessions
                </li>
                <li>
                  <span className="font-bold">Private Lessons</span> – One-on-one instruction
                </li>
                <li>
                  <span className="font-bold">Junior Programs</span> – Youth tennis development
                </li>
                <li>
                  <span className="font-bold">League Play</span> – Organized team matches
                </li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mb-4">Junior Court Times</h2>
              <ul className="list-disc pl-5 text-foreground space-y-2 mb-8">
                <li>
                  <span className="font-bold">Weekdays:</span> 11:00 a.m. – 4:00 p.m.
                </li>
                <li>
                  <span className="font-bold">Weekends:</span> Anytime
                </li>
                <li className="text-muted-foreground">
                  Outside these times, juniors must yield to adult members
                </li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mb-4">Lightning Policy</h2>
              <p className="text-foreground">
                Juniors must leave courts when lifeguards close the pool due to lightning.
                Adults should leave only when lightning is visible and nearby.
              </p>
            </div>
          </div>

          <p className="font-semibold text-foreground mb-6 italic">
            Court availability is subject to change based on programming and weather conditions.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/tennis/court-reservations"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg transition-colors bg-[#5a7d5d] hover:bg-[#4a6d4d]"
            >
              Reserve a Court
            </Link>
            <Link
              href="/tennis/instruction"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg transition-colors bg-[#5a7d5d] hover:bg-[#4a6d4d]"
            >
              View Instruction Programs
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
