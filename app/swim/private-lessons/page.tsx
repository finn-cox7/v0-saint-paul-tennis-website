"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function PrivateLessonsPage() {
  const router = useRouter()
  const [lisaLesson, setLisaLesson] = useState<string>("")
  const [josieLesson, setJosieLesson] = useState<string>("")
  const [danikaLesson, setDanikaLesson] = useState<string>("")

  const handleRegister = (coach: string, lessonType: string, price: number) => {
    const title = `${coach} - ${lessonType}`
    const description = `30 minute ${lessonType.toLowerCase()} with Coach ${coach}`
    router.push(
      `/checkout?type=lesson&title=${encodeURIComponent(title)}&price=${price}&description=${encodeURIComponent(description)}`,
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full">
        <Image
          src="/images/sptc_balcony.jpg"
          alt="Saint Paul Tennis Club pool area"
          fill
          className="object-cover"
          priority
        />
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-8">Private Lessons</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Lisa's Lessons */}
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-2">Lisa - Private Lesson</h2>
              <p className="text-sm text-muted-foreground ml-4 mb-6">30 minutes with coach Lisa</p>

              <div className="space-y-4 mb-6">
                <label className="flex items-start gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="lisa-lesson"
                    className="mt-1"
                    onChange={() => setLisaLesson("individual")}
                  />
                  <div className="flex-1">
                    <div className="font-medium">Individual private lesson</div>
                    <div className="text-lg font-bold text-[#5a7d5d]">$45</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50 transition-colors">
                  <input type="radio" name="lisa-lesson" className="mt-1" onChange={() => setLisaLesson("semi")} />
                  <div className="flex-1">
                    <div className="font-medium">Semi Private Lesson (Two swimmers each)</div>
                    <div className="text-lg font-bold text-[#5a7d5d]">$35</div>
                  </div>
                </label>
              </div>

              <button
                onClick={() =>
                  handleRegister(
                    "Lisa",
                    lisaLesson === "individual" ? "Individual Private Lesson" : "Semi Private Lesson",
                    lisaLesson === "individual" ? 45 : 35,
                  )
                }
                disabled={!lisaLesson}
                className={`w-full px-6 py-3 rounded-md text-white font-medium transition-colors disabled:cursor-not-allowed ${
                  lisaLesson ? "bg-[#5a7d5d] hover:bg-[#4a6d4d]" : "bg-gray-400"
                }`}
              >
                Register
              </button>
            </div>

            {/* Josie's Lessons */}
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-2">Josie - Private Lesson</h2>
              <p className="text-sm text-muted-foreground ml-4 mb-6">30 minutes with coach Josie</p>

              <div className="space-y-4 mb-6">
                <label className="flex items-start gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="josie-lesson"
                    className="mt-1"
                    onChange={() => setJosieLesson("individual")}
                  />
                  <div className="flex-1">
                    <div className="font-medium">Individual private lesson</div>
                    <div className="text-lg font-bold text-[#5a7d5d]">$45</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50 transition-colors">
                  <input type="radio" name="josie-lesson" className="mt-1" onChange={() => setJosieLesson("semi")} />
                  <div className="flex-1">
                    <div className="font-medium">Semi Private Lesson (Two swimmers each)</div>
                    <div className="text-lg font-bold text-[#5a7d5d]">$35</div>
                  </div>
                </label>
              </div>

              <button
                onClick={() =>
                  handleRegister(
                    "Josie",
                    josieLesson === "individual" ? "Individual Private Lesson" : "Semi Private Lesson",
                    josieLesson === "individual" ? 45 : 35,
                  )
                }
                disabled={!josieLesson}
                className={`w-full px-6 py-3 rounded-md text-white font-medium transition-colors disabled:cursor-not-allowed ${
                  josieLesson ? "bg-[#5a7d5d] hover:bg-[#4a6d4d]" : "bg-gray-400"
                }`}
              >
                Register
              </button>
            </div>

            {/* Danika's Lessons */}
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-2">Danika - Private Diving Lesson</h2>
              <p className="text-sm text-muted-foreground ml-4 mb-6">30 Minute diving lesson with Coach Danika</p>

              <div className="space-y-4 mb-6">
                <label className="flex items-start gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="danika-lesson"
                    className="mt-1"
                    onChange={() => setDanikaLesson("diving")}
                  />
                  <div className="flex-1">
                    <div className="font-medium">Private diving lesson</div>
                    <div className="text-lg font-bold text-[#5a7d5d]">$35</div>
                  </div>
                </label>
              </div>

              <button
                onClick={() => handleRegister("Danika", "Private Diving Lesson", 35)}
                disabled={!danikaLesson}
                className={`w-full px-6 py-3 rounded-md text-white font-medium transition-colors disabled:cursor-not-allowed ${
                  danikaLesson ? "bg-[#5a7d5d] hover:bg-[#4a6d4d]" : "bg-gray-400"
                }`}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
