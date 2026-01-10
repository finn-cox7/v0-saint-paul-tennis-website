import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function SchedulePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative h-[400px] w-full overflow-hidden">
          <Image
            src="/sptc_swim_schedule.webp"
            alt="Saint Paul Tennis Club pool and balcony area with pergola and seating"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-8">Swimming Schedule</h1>
          <h2 className="text-xl font-semibold text-foreground mb-4">Monday-Thursday (Excluding Holidays)</h2>
          <ul className="list-disc pl-5 text-foreground space-y-2 mb-8">
            <li>
              <span className="font-bold">6:00*-9:00</span> Lap Swim/Open Swim in the shallow square
            </li>
            <li>
              <span className="font-bold">9:00-12:30</span> Programming
            </li>
            <li>
              <span className="font-bold">12:30-1:30</span> Lap Swim/Open Swim in the shallow square (Lane 3 open for
              drop-in)
            </li>
            <li>
              <span className="font-bold">1:30-9:00**</span> Family Swim
              <ul className="list-disc pl-8 space-y-1">
                <li>Children Under 13 acompanied by adult on site</li>
                <li>
                  <span className="font-bold">4:30-6:30</span> Two lanes open for lap swim open and Diving Board closed
                </li>
              </ul>
            </li>
          </ul>
          <h2 className="text-xl font-semibold text-foreground mb-4">Friday-Sunday (and Holidays)</h2>
          <ul className="list-disc pl-5 text-foreground space-y-2 mb-8">
            <li>
              <span className="font-bold">6:00*-11:00</span> Lap Swim/Open Swim in the shallow square
            </li>
            <li>
              <span className="font-bold">11:00-4:30</span> Open Swim
              <ul className="list-disc pl-8 space-y-1 mb-8">
                <li>Children under 10 must be accompanied by adult</li>
              </ul>
            </li>
            <li>
              <span className="font-bold">4:30-9:00**</span> Family Swim
              <ul className="list-disc pl-8 space-y-1">
                <li>Children under 13 must be accompanied by adult</li>
                <li>
                  <span className="font-bold">4:30-7:30</span> One lane open for lap swim
                </li>
              </ul>
            </li>
          </ul>
          <p className="font-semibold text-foreground mb-4">
            <i>All Lap Swim times are reservable on the SPTC website up to 3 days in advance, 2 sign ups per lane.</i>
          </p>
          <ul className="font-normal text-foreground space-y-4 mb-4">
            <li>* The pool does not opens until 6:30 in Late August</li>
            <li>** Beginning in August, the pool closes at Sunset</li>
            <li>
              *** Based on member feedback and pool usage, the SPTC swim committee works to the meet the needs of member
              pool use. We will continue to evaluate the pool schedule and use each season.
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}
