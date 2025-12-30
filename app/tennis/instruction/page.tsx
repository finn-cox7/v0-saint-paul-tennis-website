import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export default function TennisInstructionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/images/sptc_balcony.jpg"
          alt="Saint Paul Tennis Club tennis courts"
          fill
          className="object-cover"
          priority
        />
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-8">Tennis Instruction</h1>

          <h2 className="text-xl font-semibold text-foreground mb-4">
            Junior Tennis Programming
          </h2>
          <ul className="list-disc pl-5 text-foreground space-y-2 mb-8">
            <li>
              <span className="font-bold">Beginner Clinics</span> – Introduction to tennis fundamentals for ages 5-8
            </li>
            <li>
              <span className="font-bold">Intermediate Clinics</span> – Stroke development and rally skills for ages 8-12
            </li>
            <li>
              <span className="font-bold">Advanced Junior Training</span> – Competitive preparation for ages 12+
            </li>
            <li>
              Junior court times: Weekdays 11am–4pm, anytime on weekends
            </li>
            <li>
              Contact tennis@saintpaultennisclub.com for junior program details and registration
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mb-4">Adult Tennis Programming</h2>
          <ul className="list-disc pl-5 text-foreground space-y-2 mb-8">
            <li>
              <span className="font-bold">Beginner Clinics</span> – Learn the basics of tennis in a supportive group setting
            </li>
            <li>
              <span className="font-bold">Intermediate Clinics</span> – Improve consistency and develop match play skills
            </li>
            <li>
              <span className="font-bold">Advanced Clinics</span> – Refine strokes, strategy, and competitive play
            </li>
            <li>
              <span className="font-bold">Cardio Tennis</span> – High-energy tennis workout for all skill levels
            </li>
            <li>
              Private and semi-private lessons available – email tennis@saintpaultennisclub.com
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-2">Clinic Format & Structure</h2>
          <p className="text-lg font-normal pl-4 mb-4">
            <span className="font-bold">Class Format:</span> Tennis clinics are organized by skill level. Our USPTA-certified
            professionals evaluate players and group them accordingly to maximize learning and enjoyment. All clinics include
            warm-up, skill development, and match play components.
          </p>
          <ul className="list-disc pl-10 space-y-2 text-foreground mb-4">
            <li>
              <span className="font-bold">Beginner Objective:</span> Develop fundamental strokes (forehand, backhand, serve)
              and learn basic court positioning. Players will learn rally consistency and basic rules of the game.
            </li>
            <li>
              <span className="font-bold">Intermediate Objective:</span> Refine stroke technique, develop net play (volleys),
              and introduce match play tactics. Focus on consistency and court movement.
            </li>
            <li>
              <span className="font-bold">Advanced Objective:</span> Polish all strokes, develop strategic thinking,
              and prepare for competitive play. Emphasis on point construction and match situations.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mb-4">Private & Semi-Private Lessons</h2>
          <p className="text-lg font-normal text-foreground pl-4 mb-4">
            <span className="font-bold">Personalized Instruction:</span> Work one-on-one or with a small group with our
            tennis professionals to accelerate your game improvement. Private lessons are tailored to your specific goals,
            whether you&apos;re a beginner learning the fundamentals or an advanced player preparing for competition.
          </p>
          <ul className="list-disc pl-8 space-y-2 mb-8">
            <li>
              <span className="font-bold">Private Lessons:</span> One-on-one instruction with Greg or Cason Hiers
            </li>
            <li>
              <span className="font-bold">Semi-Private Lessons:</span> 2-4 players of similar skill level
            </li>
            <li>
              Lessons available throughout the tennis season (late April – mid-October)
            </li>
            <li>
              Court 4 priority for professional instruction
            </li>
            <li>
              Contact: tennis@saintpaultennisclub.com to schedule
            </li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mb-4">Our Tennis Professionals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Greg Hiers – Tennis Director</h3>
              <p className="text-foreground mb-2">
                USPTA Elite certified professional with over 25 years of teaching experience.
                Girls Varsity Head Coach at St. Paul Central High School.
              </p>
              <Link
                href="/tennis/gregs-bio"
                className="text-[#5a7d5d] hover:underline font-semibold"
              >
                Read Greg&apos;s Full Bio →
              </Link>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Cason Hiers – Assistant Tennis Pro</h3>
              <p className="text-foreground mb-2">
                Growing up at SPTC, Cason brings passion and energy to junior and adult instruction.
                Also assists with Highland Park High School tennis program.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tennis/private-lessons"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg transition-colors bg-[#5a7d5d] hover:bg-[#4a6d4d]"
            >
              Book Private Lessons
            </Link>
            <Link
              href="/tennis/gregs-bio"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg transition-colors bg-[#5a7d5d] hover:bg-[#4a6d4d]"
            >
              Meet Coach Greg
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
