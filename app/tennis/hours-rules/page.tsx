import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export default function TennisHoursRulesPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-8">Tennis Hours & Rules</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Tennis Season:</h2>
              <h3 className="text-lg text-foreground mb-6">Late April through Mid-October</h3>
              <h2 className="text-xl font-semibold text-foreground mb-2">Court Hours:</h2>
              <h3 className="text-lg text-foreground mb-4">
                Daily from 7:30 a.m. until dusk
              </h3>
              <p className="text-muted-foreground mb-12">
                Courts are closed 3:30–4:00 p.m. daily for grooming.
              </p>

              <div className="mt-8 flex justify-left">
                <Link
                  href="/tennis/schedule"
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg transition-colors bg-[#5a7d5d] hover:bg-[#4a6d4d]"
                >
                  Tennis Schedule
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Court Rules:</h2>
              <ul className="list-disc pl-5 text-foreground space-y-2">
                <li>Proper tennis attire is required. Shirts and smooth-soled tennis shoes must be worn at all times.</li>
                <li>Cleated or grooved-sole shoes are prohibited as they damage court surfaces.</li>
                <li>Smoking is not permitted anywhere on club grounds.</li>
                <li>Wait until points finish before crossing courts.</li>
                <li>Remain outside fencing until your reserved court is ready.</li>
                <li>Reserve Court 4 only after courts 1–3 are booked, unless accommodating beginner instruction with divider nets.</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Reservation Rules:</h2>
              <ul className="list-disc pl-5 text-foreground space-y-2">
                <li>Maximum playing time of 1.5 hours per reservation.</li>
                <li>Reservations may be made up to three days in advance.</li>
                <li>Single memberships allow one court per day; family memberships allow two courts.</li>
                <li>Must complete play before reserving additional court time the same day.</li>
                <li>If a reserved court remains unused 15 minutes past start time, it becomes available to other members.</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Junior Policy:</h2>
              <ul className="list-disc pl-5 text-foreground space-y-2">
                <li>Juniors may reserve courts 11am–4pm weekdays and anytime on weekends.</li>
                <li>At other times, juniors must yield courts to adult members.</li>
                <li>Juniors must leave courts when lifeguards close the pool due to lightning.</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Guest Policy:</h2>
              <ul className="list-disc pl-5 text-foreground space-y-2">
                <li>Guests must be registered through the court reservation system.</li>
                <li>Guest fee: $15 plus tax (April–October court season).</li>
                <li>Guests must play on the same courts as their member hosts.</li>
                <li>No private party court reservations permitted.</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Court Priority:</h2>
              <ul className="list-disc pl-5 text-foreground space-y-2">
                <li>Tennis professional staff has priority use of Court 4.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
