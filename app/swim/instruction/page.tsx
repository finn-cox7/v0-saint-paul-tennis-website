import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export default function InstructionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full">
        <Image src="/sptc_lessons.jpg" alt="Saint Paul Tennis Club pool area" fill className="object-cover" priority />
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-8">Instruction</h1>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Youth Programming Pool Schedule: Monday-Thursday
          </h2>
          <ul className="list-disc pl-5 text-foreground space-y-2 mb-8">
            <li>
              <span className="font-bold">9:00-10:00</span> Swim Team 12+
            </li>
            <li>
              <span className="font-bold">10:00-10:45</span> Swim Team 11 & Under
            </li>
            <li>
              <span className="font-bold">10:45-11:30</span> Lessons: Junior Swimmers Class (no meets unless coaches
              approval)
            </li>
            <li>
              <span className="font-bold">10:45-12:25</span> Diving Team Groups{" "}
            </li>
            <li>
              {" "}
              <span className="font-bold">10:45-12:20</span> Lessons: Beginner/Intermediate Classes (4+){" "}
            </li>
            <li>
              {" "}
              <span className="font-bold">Saturday & Sunday</span> 9:00 & 9:30 - (3+) Beginner/Intermediate Youth
              Lessons{" "}
            </li>
            <ul className="list-disc pl-8 text-foreground space-y-2 mb-4">
              <li> Sign ups posted when teachers are available </li>
            </ul>
            <li> Youth Private Lessons available daily during lap swim times - email coachlisathomas@gmail.com </li>
          </ul>
          <h2 className="text-xl font-semibold text-foreground mb-4">Adult Programming Pool Schedule:</h2>
          <ul className="list-disc pl-5 text-foreground space-y-2 mb-8">
            <li> Lap Swim Morning, Afternoon and Evening Hours, see schedule </li>
            <li> Adult Private and Semi-Private Lessons available- email coachlisathomas@gmail.com </li>
            <ul className="list-disc pl-8 space-y-2 mb-8">
              <li>As scheduled - Drills, stroke work, Speed work</li>
            </ul>
          </ul>
          <h2 className="text-xl font-bold mb-2">
            Beginner (11:40-12:15)/Intermediate Classes: (11:40-12:20) (M-Th)/ 9&amp;9:30 (Sat &amp; Sun).
          </h2>
          <p className="text-lg font-normal pl-4 mb-2">
            {" "}
            <span className="font-bold">Class Format:</span> Beginner and Intermediate Swim Classes. Skill levels are
            anticipated to range from beginner level through Intermediate level skills. We will evaluate and group kids
            accordingly, divide and teach to the skill level and needs of each participant.{" "}
            <span className="text-sm"> *New: Weekly Beginner level will end at 12:20 </span>{" "}
          </p>
          <ul className="list-disc pl-10 space-y-2 text-foreground mb-4">
            <li>
              {" "}
              <span className="font-bold"> Beginner Class Objective: </span> Teach the skills necessary to enable the
              participants to be deep-water safe. Our goal is to have children leaving this instructional group safely
              swimming 1-length of the pool using at least one stroke and advance to the intermediate class. Beginner
              level class will end at 12:15.
            </li>
            <li>
              {" "}
              <span className="font-bold"> Intermediate Class Objective: </span> Teach the skills necessary to enable
              the participants to become deep-water safe. Our goal is to have children leaving this instructional group
              being able to swim 2-lengths of the pool using two different strokes and potentially advance to the Junior
              Swimmer Class. Intermediate level class will end at 12:20.{" "}
            </li>
          </ul>
          <ul className="list-disc pl-8 space-y-2 mb-4">
            <li>
              {" "}
              <span className="font-bold"> Mon-Thurs Classes: </span>{" "}
            </li>
            <ul className="list-disc pl-10 space-y-2">
              <li>
                {" "}
                <span className="font-bold"> Minimum age requirement - 4 years of age. </span>{" "}
              </li>
              <li> Cost: $80 for members/$100 for nonmembers for the 4-day weekly class (Mon. - Thurs.). </li>
              <li> New 4-day sessions begin each Monday continuing through Mid-Aug. </li>
              <li> Open to Members, Wait List, Non-Members as space is available. </li>
            </ul>
            <li>
              {" "}
              <span className="font-bold"> Saturday and Sunday Classes </span>{" "}
            </li>
            <ul className="list-disc pl-10 space-y-2">
              <li>
                {" "}
                <span className="font-bold"> Minimum age requirement 3+ </span>{" "}
              </li>
              <li> Single day classes and cost $30 per class and are limited to 3-4/ class size limited </li>
              <li> Members register via website for dates available. </li>
              <ul className="list-disc pl-12 space-y-2">
                <li> (wait-list and nonmembers as space available) / nonmembers cost $30+ SPTC guest fee. </li>
                <li> email coachlisathomas@gmail.com with inquires </li>
              </ul>
            </ul>
          </ul>
          <h2 className="text-xl font-bold text-foreground mb-4">Junior Swimmers Class: 10:45-11:30 (M-TH) </h2>
          <p className="text-lg font-normal text-foreground pl-4 mb-4">
            {" "}
            <span className="font-bold"> Class Format: </span> This class teaches and refines the four primary swimming
            strokes; crawl stroke, butterfly, backstroke, and breaststroke, along with a number of basic swim skills and
            are taught using many of the stroke drills used in competitive swimming. Please note that this class does
            involve primarily deep-water swimming, and practice swimming lengths of the pool. Parents wishing to have
            their children participate on the SPTC Swim Team, but who do not have a swim team background, are encouraged
            to start that experience with this group - this is very much a Swim Team Prep offering. As swimming skills
            progress, participants who are members, will have the opportunity to then move on to and participate in the
            SPTC Swim Team Program. Children moving on from this class will have many of the basic skills needed to have
            a successful experience with a competitive swim program.{" "}
          </p>
          <ul className="list-disc pl-8 space-y-2 mb-4">
            <li>
              {" "}
              Added &quot;Bonus&quot;: Members moving from this group up to the swim team have the Swim Team Fee discounted.{" "}
            </li>
            <ul className="list-disc pl-12 space-y-2 mb-4">
              <li>
                {" "}
                Participants need to be able to swim at least two full lengths of the pool using two different strokes{" "}
              </li>
              <li> Class taught on a Monday through Thursday basis </li>
              <li>
                {" "}
                Cost: $80 for members and $100 for nonmembers with a 4-day weekly reservation (Monday - Thursday).{" "}
              </li>
              <li>
                {" "}
                Available to Members: register via the website, Wait List and Non-Members as space is available.{" "}
              </li>
              <li> Nonmembers register via email: coachlisathomas@gmail.com </li>
            </ul>
          </ul>
        </div>
        <div className="mb-8 flex justify-center">
          <Link
            href="/swim/lisas-bio"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg transition-colors bg-[#5a7d5d] hover:bg-[#4a6d4d]"
          >
            Meet Coach Lisa
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
