import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

const leadership = [
  {
    name: "Lisa Thomas",
    role: "Aquatics Program Director",
    email: "swimming@saintpaultennisclub.com",
    description: "Oversees all swimming programs, swim team, and pool operations.",
    bioLink: "/swim/lisas-bio",
  },
  {
    name: "Greg Hiers",
    role: "Tennis Pro / Director",
    email: "tennis@saintpaultennisclub.com",
    description: "USPTA Elite certified. Manages tennis programs and instruction.",
    bioLink: "/tennis/gregs-bio",
  },
  {
    name: "Sally Hite",
    role: "Club Coordinator",
    email: "sallyhite1@gmail.com",
    description: "Handles club administration, membership, and general operations.",
    bioLink: null,
  },
  {
    name: "Cason Hiers",
    role: "Assistant Tennis Pro",
    email: null,
    description: "Assists with tennis instruction and junior development programs.",
    bioLink: null,
  },
]

const headLifeguards = [
  { name: "Andrew Woodage", role: "Head Lifeguard" },
  { name: "AJ Hite", role: "Head Lifeguard" },
  { name: "Josie Hiers", role: "Head Lifeguard" },
]

const lifeguards = [
  "Lindsay Browne", "Fred Myers", "Finn Cox", "Violet Benson",
  "Liv Reeder", "Cecily Jones", "Eli Wachlarowicz", "Blake Woodage",
  "Genevieve Thomas", "Finn Sullivan", "Laura Kimmel", "Sam Galarneault",
  "Kiki Sullivan", "Kai Walker", "Oliver Stitzel", "Max Illiff",
  "Adele Diebel", "Eve Wachlarowicz", "James Alt", "Tatum Nooney",
  "Asha Peckosh", "Avital Coleman", "Sam Hilton"
]

export default function StaffPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/images/sptc_balcony.jpg"
          alt="Saint Paul Tennis Club facilities"
          fill
          className="object-cover"
          priority
        />
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Our Staff</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Meet the dedicated team that makes Saint Paul Tennis Club a special place for our members.
          </p>

          {/* Leadership Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {leadership.map((person) => (
                <div key={person.name} className="bg-white border rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-foreground">{person.name}</h3>
                  <p className="text-[#5a7d5d] font-medium mb-2">{person.role}</p>
                  <p className="text-foreground text-sm mb-3">{person.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="text-sm text-[#5a7d5d] hover:underline"
                      >
                        {person.email}
                      </a>
                    )}
                    {person.bioLink && (
                      <Link
                        href={person.bioLink}
                        className="text-sm text-[#5a7d5d] hover:underline font-medium"
                      >
                        View Full Bio →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Head Lifeguards Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Head Lifeguards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {headLifeguards.map((person) => (
                <div key={person.name} className="bg-muted/30 rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-foreground">{person.name}</h3>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Lifeguards Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Lifeguards & Support Staff</h2>
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {lifeguards.map((name) => (
                  <div key={name} className="text-foreground text-sm">
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Join Our Team */}
          <section className="bg-[#5a7d5d] text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Interested in working at Saint Paul Tennis Club? We&apos;re always looking for
              enthusiastic individuals to join our summer staff. Positions include lifeguards,
              swim instructors, and more.
            </p>
            <Link
              href="/employment/apply"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold bg-white text-[#5a7d5d] rounded-lg hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
