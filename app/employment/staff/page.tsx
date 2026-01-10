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
    image: "/Staff/Lisa.png",
  },
  {
    name: "Greg Hiers",
    role: "Tennis Pro / Director",
    email: "tennis@saintpaultennisclub.com",
    description: "USPTA Elite certified. Manages tennis programs and instruction.",
    bioLink: "/tennis/gregs-bio",
    image: "/Staff/Greg.png", 
    imagePosition: "object-[center_10%]",
  },
  {
    name: "Sally Hite",
    role: "Club Coordinator",
    email: "sallyhite1@gmail.com",
    description: "Handles club administration, membership, and general operations.",
    bioLink: null,
    image: "/Staff/Sally.jpg",
    
  },
  {
    name: "Cason Hiers",
    role: "Assistant Tennis Pro",
    email: null,
    description: "Assists with tennis instruction and junior development programs.",
    bioLink: null,
    image: "/Staff/Cason.png",
    imagePosition: "object-[center_5%]",
  },
]

const headLifeguards = [
  { name: "Andrew Woodage", role: "Head Lifeguard", image: "/staff/Andrew.jpg" },
  { name: "AJ Hite", role: "Head Lifeguard", image: "/staff/AJ.jpg" },
  { name: "Josie Hiers", role: "Head Lifeguard", image: "/staff/Josie.jpg" },
]

const lifeguards = [
  { name: "Lindsay Browne", image: "/staff/Lindsay.jpg" },
  { name: "Fred Myers", image: "/staff/Fred.jpg" },
  { name: "Finn Cox", image: "/staff/FinnC.jpg" },
  { name: "Violet Benson", image: "/staff/Violet.jpg" },
  { name: "Liv Reeder", image: "/staff/Liv.jpg" },
  { name: "Cecily Jones", image: "/staff/Cecily.jpg" },
  { name: "Eli Wachlarowicz", image: "/staff/Eli.jpg" },
  { name: "Blake Woodage", image: "/staff/Blake.jpg" },
  { name: "Genevieve Thomas", image: "/staff/GG.jpg" },
  { name: "Finn Sullivan", image: "/staff/FinnS.jpg" },
  { name: "Laura Kimmel", image: "/staff/Laura.jpg" },
  { name: "Sam Galarneault", image: "/staff/SamG.jpg" },
  { name: "Kiki Sullivan", image: "/staff/Kiki.jpg" },
  { name: "Kai Walker", image: "/staff/Kai.jpg" },
  { name: "Max Illiff", image: "/staff/Max.jpg" },
  { name: "Adele Diebel", image: "/staff/Adele.jpg" },
  { name: "Eve Wachlarowicz", image: "/staff/Eve.jpg" },
  { name: "James Alt", image: "/staff/James.jpg" },
  { name: "Tatum Nooney", image: "/staff/Tatum.jpg" },
  { name: "Asha Peckosh", image: "/staff/Asha.jpg" },
  { name: "Sam Hilton", image: "/staff/SamH.jpg" },
]

export default function StaffPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/sptc_staff.jpeg"
          alt="Saint Paul Tennis Club facilities"
          fill
          className="object-cover object-[center_50%]"
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
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Leadership</h2>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                {leadership.map((person) => (
                  <div key={person.name} className="bg-white border rounded-lg p-6 shadow-sm">
                    <div className="flex gap-4 mb-4">
                      <div className="relative w-32 h-32 flex-shrink-0 rounded-full overflow-hidden">
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          className={`object-cover${person.imagePosition ? ` ${person.imagePosition}` : ''}`}
                          
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground">{person.name}</h3>
                        <p className="text-[#5a7d5d] font-medium mb-2">{person.role}</p>
                      </div>
                    </div>
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
            </div>
          </section>

          {/* Head Lifeguards Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Head Lifeguards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {headLifeguards.map((person) => (
                <div key={person.name} className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  </div>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {lifeguards.map((person) => (
                  <div key={person.name} className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-2 rounded-full overflow-hidden">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-foreground text-sm">{person.name}</div>
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
