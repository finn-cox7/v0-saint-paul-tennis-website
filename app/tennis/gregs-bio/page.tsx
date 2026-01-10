import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export default function GregsBioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/sptc_greg.jpeg"
          alt="Saint Paul Tennis Club tennis courts"
          fill
          className="object-cover object-[center_40%]"
          priority
        />
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-2">Greg Hiers</h1>
          <h2 className="text-xl text-muted-foreground mb-8">Tennis Director</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <section>
                <h3 className="text-xl font-semibold text-foreground mb-3">Professional Credentials</h3>
                <p className="text-foreground leading-relaxed">
                  Greg Hiers holds <span className="font-semibold">USPTA Elite level certification</span>, the highest
                  teaching classification excluding &quot;Master Pro&quot; status. He has completed the USTA High-Performance
                  Coaching course and achieved USTA Level I Competency for Sport Science. Throughout his career, he has
                  attended numerous tennis industry workshops and seminars to stay current with the latest teaching methods
                  and techniques.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-foreground mb-3">Current Roles</h3>
                <p className="text-foreground leading-relaxed mb-4">
                  At Saint Paul Tennis Club, Greg serves as Tennis Director during the spring through fall months, overseeing
                  all tennis programming, instruction, and court operations. During the winter months, he teaches at Baseline
                  Tennis Center and works as a part-time substitute teacher in the community.
                </p>
                <p className="text-foreground leading-relaxed">
                  Greg is also the <span className="font-semibold">Girls Varsity Head Coach at St. Paul Central High School</span> and
                  assists with Highland Park High School&apos;s tennis program under his son Cason.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-foreground mb-3">Coaching Background</h3>
                <p className="text-foreground leading-relaxed mb-4">
                  Greg previously held the Boys Head Coach position at North St. Paul High School for two seasons. Before
                  relocating to Minnesota in 1996, he served as Tennis Director at Fred Wells Tennis & Education Center and
                  as assistant then head coach for Northern California&apos;s Area Training Center, developing elite junior players.
                </p>
                <p className="text-foreground leading-relaxed">
                  From 2013 to 2022, Greg spent winter months working seasonally as Tennis Director at Breckenridge Golf & Tennis
                  in Florida and as a part-time pro at Gulf Harbour Country Club, returning to SPTC each summer.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-foreground mb-3">Education & Early Career</h3>
                <p className="text-foreground leading-relaxed mb-4">
                  Greg graduated from <span className="font-semibold">Ferris State University</span> with a B.S. in Marketing,
                  majoring in Professional Tennis Management. He attended Webber College in Florida before a shoulder injury
                  ended his collegiate playing career.
                </p>
                <p className="text-foreground leading-relaxed">
                  As an assistant coach for Ferris State&apos;s Division II women&apos;s team during his senior year, Greg also worked
                  summers at prestigious clubs in Boca Raton, Greenwich, Louisville, and Honolulu.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-foreground mb-3">Personal Background</h3>
                <p className="text-foreground leading-relaxed">
                  Originally from Jacksonville, Florida, Greg lived in Tampa through junior high before settling in Boca Raton.
                  He currently resides in Minnesota with his wife Joele, son Cason (who serves as Assistant Tennis Pro at SPTC),
                  and daughter Josie (who serves as a Head Lifeguard at the club).
                </p>
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:tennis@saintpaultennisclub.com" className="text-[#5a7d5d] hover:underline font-medium">
                      tennis@saintpaultennisclub.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Club Phone (In Season)</p>
                    <p className="font-medium">651-224-3742</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Certifications</h3>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[#5a7d5d] mt-1">•</span>
                    USPTA Elite Level
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5a7d5d] mt-1">•</span>
                    USTA High-Performance Coaching
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5a7d5d] mt-1">•</span>
                    USTA Level I Sport Science
                  </li>
                </ul>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link
                    href="/tennis/private-lessons"
                    className="block text-[#5a7d5d] hover:underline font-medium"
                  >
                    Book a Private Lesson →
                  </Link>
                  <Link
                    href="/tennis/instruction"
                    className="block text-[#5a7d5d] hover:underline font-medium"
                  >
                    View Tennis Programs →
                  </Link>
                  <Link
                    href="/tennis/court-reservations"
                    className="block text-[#5a7d5d] hover:underline font-medium"
                  >
                    Reserve a Court →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
