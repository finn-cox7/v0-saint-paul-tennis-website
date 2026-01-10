"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function TennisPrivateLessonsPage() {
  const router = useRouter()
  const [gregLesson, setGregLesson] = useState<string>("")
  const [casonLesson, setCasonLesson] = useState<string>("")

  const handleRegister = (coach: string, lessonType: string, price: number, duration: string) => {
    const title = `${coach} - ${lessonType}`
    const description = `${duration} ${lessonType.toLowerCase()} with ${coach}`
    router.push(
      `/checkout?type=lesson&title=${encodeURIComponent(title)}&price=${price}&description=${encodeURIComponent(description)}`,
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/sptc_tennis_lessons.png"
          alt="Saint Paul Tennis Club tennis courts"
          fill
          className="object-cover object-[center_5%]"
          priority
        />
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Tennis Private Lessons</h1>
          <p className="text-muted-foreground mb-8">
            Work one-on-one with our USPTA-certified professionals to improve your game.
            Lessons take place on Court 4 and are available throughout the tennis season (late April – mid-October).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Greg's Lessons */}
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-2">Greg Hiers</h2>
              <p className="text-sm text-muted-foreground mb-1">Tennis Director</p>
              <p className="text-sm text-muted-foreground ml-4 mb-6">
                USPTA Elite certified professional
              </p>

              <div className="space-y-4 mb-6">
                <label className="flex items-start gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="greg-lesson"
                    className="mt-1"
                    onChange={() => setGregLesson("individual-60")}
                  />
                  <div className="flex-1">
                    <div className="font-medium">Private Lesson (1 hour)</div>
                    <div className="text-sm text-muted-foreground">One-on-one instruction</div>
                    <div className="text-lg font-bold text-[#5a7d5d]">$75</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="greg-lesson"
                    className="mt-1"
                    onChange={() => setGregLesson("semi-60")}
                  />
                  <div className="flex-1">
                    <div className="font-medium">Semi-Private Lesson (1 hour)</div>
                    <div className="text-sm text-muted-foreground">2-4 players, per person</div>
                    <div className="text-lg font-bold text-[#5a7d5d]">$45</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="greg-lesson"
                    className="mt-1"
                    onChange={() => setGregLesson("individual-30")}
                  />
                  <div className="flex-1">
                    <div className="font-medium">Private Lesson (30 min)</div>
                    <div className="text-sm text-muted-foreground">Quick tune-up session</div>
                    <div className="text-lg font-bold text-[#5a7d5d]">$45</div>
                  </div>
                </label>
              </div>

              <button
                onClick={() => {
                  if (gregLesson === "individual-60") {
                    handleRegister("Greg Hiers", "Private Lesson", 75, "1 hour")
                  } else if (gregLesson === "semi-60") {
                    handleRegister("Greg Hiers", "Semi-Private Lesson", 45, "1 hour")
                  } else if (gregLesson === "individual-30") {
                    handleRegister("Greg Hiers", "Private Lesson", 45, "30 minute")
                  }
                }}
                disabled={!gregLesson}
                className={`w-full px-6 py-3 rounded-md text-white font-medium transition-colors disabled:cursor-not-allowed ${
                  gregLesson ? "bg-[#5a7d5d] hover:bg-[#4a6d4d]" : "bg-gray-400"
                }`}
              >
                Register
              </button>
            </div>

            {/* Cason's Lessons */}
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-2">Cason Hiers</h2>
              <p className="text-sm text-muted-foreground mb-1">Assistant Tennis Pro</p>
              <p className="text-sm text-muted-foreground ml-4 mb-6">
                Specializing in junior development
              </p>

              <div className="space-y-4 mb-6">
                <label className="flex items-start gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="cason-lesson"
                    className="mt-1"
                    onChange={() => setCasonLesson("individual-60")}
                  />
                  <div className="flex-1">
                    <div className="font-medium">Private Lesson (1 hour)</div>
                    <div className="text-sm text-muted-foreground">One-on-one instruction</div>
                    <div className="text-lg font-bold text-[#5a7d5d]">$60</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="cason-lesson"
                    className="mt-1"
                    onChange={() => setCasonLesson("semi-60")}
                  />
                  <div className="flex-1">
                    <div className="font-medium">Semi-Private Lesson (1 hour)</div>
                    <div className="text-sm text-muted-foreground">2-4 players, per person</div>
                    <div className="text-lg font-bold text-[#5a7d5d]">$35</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="cason-lesson"
                    className="mt-1"
                    onChange={() => setCasonLesson("junior-60")}
                  />
                  <div className="flex-1">
                    <div className="font-medium">Junior Private Lesson (1 hour)</div>
                    <div className="text-sm text-muted-foreground">Ages 6-18</div>
                    <div className="text-lg font-bold text-[#5a7d5d]">$50</div>
                  </div>
                </label>
              </div>

              <button
                onClick={() => {
                  if (casonLesson === "individual-60") {
                    handleRegister("Cason Hiers", "Private Lesson", 60, "1 hour")
                  } else if (casonLesson === "semi-60") {
                    handleRegister("Cason Hiers", "Semi-Private Lesson", 35, "1 hour")
                  } else if (casonLesson === "junior-60") {
                    handleRegister("Cason Hiers", "Junior Private Lesson", 50, "1 hour")
                  }
                }}
                disabled={!casonLesson}
                className={`w-full px-6 py-3 rounded-md text-white font-medium transition-colors disabled:cursor-not-allowed ${
                  casonLesson ? "bg-[#5a7d5d] hover:bg-[#4a6d4d]" : "bg-gray-400"
                }`}
              >
                Register
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Questions about lessons? Contact our tennis staff at{" "}
              <a href="mailto:tennis@saintpaultennisclub.com" className="text-[#5a7d5d] hover:underline font-medium">
                tennis@saintpaultennisclub.com
              </a>
            </p>
            <p className="text-sm text-muted-foreground">
              Lesson times are subject to court and instructor availability.
              Please arrive 5 minutes early to warm up.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
