"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function SwimTeamInfoPage() {
  const router = useRouter()
  const [selectedEnrollment, setSelectedEnrollment] = useState("")

  const enrollmentOptions = [
    { label: "Enroll 1 Child - Swim and Dive", price: 125 },
    { label: "Enroll 2 Children - Swim and Dive", price: 250 },
    { label: "Enroll 3 Children - Swim and Dive", price: 350 },
    { label: "Enroll 4 Children - Swim and Dive", price: 400 },
    { label: "Enroll 5 Children - Swim and Dive", price: 450 },
    { label: "Enroll 6 Children - Swim and Dive", price: 500 },
  ]

  const handleAddToCart = () => {
    if (!selectedEnrollment) return

    const selected = enrollmentOptions.find((opt) => opt.label === selectedEnrollment)
    if (!selected) return

    const params = new URLSearchParams({
      title: selected.label,
      price: selected.price.toString(),
      description: "SPTC Swim and Dive Team enrollment for Summer 2025 season",
      type: "enrollment",
      returnUrl: "/swim/swim-team-info",
    })

    router.push(`/checkout?${params.toString()}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Image */}
      <div className="relative h-[400px]">
        <Image
          src="/images/sptc_balcony.jpg"
          alt="Saint Paul Tennis Club pool area"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-12 text-center mx-auto">
            <h2 className="text-4xl font-bold mb-6">The SPTC Swim and Dive Team Tradition</h2>
            <div className="space-y-4 text-xl leading-relaxed">
              <p>
                The Swimming and Diving Teams are part of a very strong tradition at the St. Paul Tennis Club and have
                enjoyed tremendous success for over 50 years.
              </p>

              <p className="font-semibold">Swimming and Diving Teams are available for Members Only.</p>

              <p className="mb-20">
                The 2025 Summer competition season begins June 9th and ends July 23rd with the Inter-club meet, with
                practices Monday-Thursday and roughly one meet per week.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">Swim Team </h2>
              <ul className="space-y-2">
                <li>
                  <span className="text-xl font-bold"> 12 and up:</span>{" "}
                  <span className="font-semibold"> 9:00-10:00am </span>
                </li>
                <li>
                  This group is made up primarily of those swimmers who have previously been on a swim team ages 11 and
                  over. 10 and under swimmers with team experience may also attend this practice with coaches permission
                </li>
                <li>
                  {" "}
                  <span className="text-xl font-bold"> 11 and under:</span>{" "}
                  <span className="font-semibold"> 10:00-10:45am </span>
                </li>
                <li>
                  This group is intended for 11 & under swimmers who have had previous swim team experience and
                  background on a swim team. Swimmers new to competitive swimming are encouraged to enroll in the Junior
                  Swimmer Instructional group.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">Dive Team </h2>
              <ul className="space-y-2">
                <li>
                  <span className="text-xl font-bold"> All ages mixed: </span>{" "}
                </li>
                <li>
                  <span className="font-semibold"> 10:45-11:30am </span>{" "}
                </li>
                <li>
                  <span className="font-semibold"> 11:30am-12:15pm </span>{" "}
                </li>
              </ul>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-primary">2025 Meet Schedule</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Swim Meets</h3>

              <ul className="list-disc pl-6 space-y-4">
                <li>
                  Thursday, June 19th – Town and Country @SPTC Pool
                  <ul className="list-circle pl-6 mt-1">
                    <li>12:30 Warm ups/1:00 Meet Start</li>
                  </ul>
                </li>
                <li>
                  Thursday, June 26th – White Bear/Dellwood @SPTC Pool
                  <ul className="list-circle pl-6 mt-1">
                    <li>12:30 Warm ups/1:00 Meet Start</li>
                  </ul>
                </li>
                <li>
                  Wednesday, July 2nd – Swim Meet @TCC Pool
                  <ul className="list-circle pl-6 mt-1">
                    <li>8:30 Warm ups / 9:00 Meet Start</li>
                  </ul>
                </li>
                <li>Wednesday, July 9th - Team Photos at 10:00</li>
                <li>
                  Thursday, July 10th – University Club/Brackets @SPTC Pool
                  <ul className="list-circle pl-6 mt-1">
                    <li>12:30 Warm ups/1:00 Meet Start</li>
                  </ul>
                </li>
                <li>
                  Thursday, July 17th – Pool and Yacht/JCC @SPTC Pool
                  <ul className="list-circle pl-6 mt-1">
                    <li>12:30 Warm ups/1:00 Meet Start</li>
                  </ul>
                </li>
                <li>
                  Wednesday, July 23rd – Interclub Meet @ Town and Country Pool
                  <ul className="list-circle pl-6 mt-1">
                    <li>8:30 am - Warm up / 9:30 - Meet Start</li>
                    <li className="font-semibold">Team Party at SPTC @ 5:30-7:00pm: Picnic, awards & swim fun.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Diving Meets</h3>

              <ul className="list-disc pl-6 space-y-4">
                <li>
                  Friday, June 27th – Diving Meet @ TCC
                  <ul className="list-circle pl-6 mt-1">
                    <li>9:30am – warm up / 10:00am – Meet Start</li>
                  </ul>
                </li>
                <li>
                  Friday, July 18th – Diving Meet @ TCC
                  <ul className="list-circle pl-6 mt-1">
                    <li>8:30 am – warm up / 9:00am - Meet Start</li>
                  </ul>
                </li>
                <li>
                  Tuesday, July 22nd – Interclub Diving Meet @ SPTC
                  <ul className="list-circle pl-6 mt-1">
                    <li>5:00 pm – Warm Up / 5:30pm – Meet Start</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 space-y-12">
            {/* Team Suit and Cost Section */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-primary">Registration & Cost</h2>
              <div className="space-y-4 text-lg">
                <p>
                  <span className="font-semibold">Season Cost:</span> $125/member for the season to swim AND dive
                </p>
                <p className="text-base italic">
                  (Swimmers are encouraged to try diving, divers are encouraged to give swimming a try!)
                </p>

                <div className="mt-6 space-y-4">
                  <label htmlFor="enrollment" className="block font-semibold">
                    Select Enrollment:
                  </label>
                  <select
                    id="enrollment"
                    value={selectedEnrollment}
                    onChange={(e) => setSelectedEnrollment(e.target.value)}
                    className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">-- Select Number of Children --</option>
                    {enrollmentOptions.map((option) => (
                      <option key={option.label} value={option.label}>
                        {option.label} - ${option.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                  <Button
                    onClick={handleAddToCart}
                    disabled={!selectedEnrollment}
                    className="bg-primary hover:bg-primary/90 text-white mt-4"
                  >
                    Add to Cart
                  </Button>
                </div>

                <p>
                  <span className="font-semibold">Team Suit and Gear:</span>{" "}
                  <Link
                    href="https://elsmoreswim.com/collections/st-paul-tennis-club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Order from Elsmore Swim
                  </Link>
                </p>
                <p>
                  <span className="font-semibold">Questions?</span> Please email Coach Lisa Thomas:{" "}
                  <a href="mailto:coachlisathomas@gmail.com" className="text-primary hover:underline">
                    coachlisathomas@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Inter-Club Conference Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">Inter-Club Conference</h2>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  We compete in the Inter-Club Conference. Teams we compete with include: The University Club, Town and
                  Country Club, Dellwood Hills Golf Club, White Bear Yacht Club, The St. Paul Jewish Community Center,
                  The Pool and Yacht Club, and Brackett's Crossing Country Club.
                </p>
                <p>
                  The goal of the Inter-Club swimming program is to provide a strong, competitive swimming experience
                  with an emphasis on skill development. The program also strives to provide an experience that develops
                  sportsmanship and encourages the "fun" aspect of this activity.
                </p>
                <p>
                  <span className="font-semibold">Age Groups:</span> The four age-groups for competition in both
                  swimming and diving are: 8 and Under, 9-10, 11-12, and 13-15.
                </p>
              </div>
            </div>

            {/* Requirements Section */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-primary">Requirements for New Swimmers</h2>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Children new to the swimming program need to be able to swim a minimum of two lengths of the pool
                  using two different strokes and be able to perform a standing dive from the edge of the pool.
                </p>
                <p>
                  Swimmers are encouraged to take the Junior Swimmers Class prior to signing up for Swim Team if they
                  have no other swim team experience.
                </p>
                <p>
                  Practices are arranged to encourage and accommodate children taking part in both the swimming and
                  diving competitive programs.
                </p>
              </div>
            </div>

            {/* Program Philosophy Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Program Philosophy</h2>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Parents will find a strong connection between the Instructional Swim Program offered at the Club and
                  the Competitive Swim Program. The coaches believe very strongly in the concept that before a child can
                  swim fast, they have to know how to swim well; we encourage parents to involve their children in the
                  Instructional Swim Classes offered here at the Club.
                </p>
                <p>
                  The great majority of our Swim Team members are products of the SPTC Instructional Swim Program. Our
                  swimmers traditionally have been recognized for their sound stroke technique and competitive swimming
                  skills. They are very recognizable in the water.
                </p>
                <p>
                  We compete in the Inter-Club Swimming Conference with swimming and diving meets scheduled in the
                  afternoons throughout June and July.
                </p>
              </div>
            </div>

            {/* Staff Section */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Swimming Program Staff</h2>
              <div className="space-y-3 text-lg">
                <p>
                  <span className="font-semibold">Swim Coach, Swimming Instructor, Aquatics Director:</span> Lisa Thomas
                </p>
                <p>
                  <span className="font-semibold">Assistant Swim Coaches and Swimming Instructors:</span> SPTC Staff
                </p>
                <p>
                  <span className="font-semibold">Diving Coaches:</span> Lauren O'Donnell & Danika Rubbelke
                </p>
              </div>
            </div>

            {/* Important Note Section */}
            <div className="bg-primary/10 border-l-4 border-primary p-6">
              <p className="text-lg font-semibold mb-2">PLEASE NOTE:</p>
              <p className="text-lg">
                All of our home swim meets have a 12:30 warm-up and 1:00 start time. On Meet days we will be moving the
                12:30 – 1:30 Lap Swim Session to an 11:30 – 12:30 time frame.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
