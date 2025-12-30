"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Search, UserCheck, Users, Clock, CheckCircle } from "lucide-react"

// Mock data
const mockRecentCheckins = [
  { id: 1, household: "Smith Family", members: ["John", "Sarah"], time: "2:35 PM", type: "member" },
  { id: 2, household: "Anderson Family", members: ["Mike"], time: "2:28 PM", type: "member" },
  { id: 3, household: "Chen Family", members: ["Wei", "Mei", "Lily"], time: "2:15 PM", type: "member" },
  { id: 4, household: "Guest of Johnson", members: ["Tom Wilson"], time: "2:10 PM", type: "guest" },
  { id: 5, household: "Garcia Family", members: ["Carlos", "Sofia"], time: "1:55 PM", type: "member" },
]

const mockSearchResults = [
  { id: 1, household: "Brown Family", members: ["David", "Sarah", "Emma"], hasGuestPasses: 2 },
  { id: 2, household: "Miller Family", members: ["Steve", "Karen", "Jack"], hasGuestPasses: 5 },
]

export default function CheckInPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedHousehold, setSelectedHousehold] = useState<typeof mockSearchResults[0] | null>(null)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [isGuest, setIsGuest] = useState(false)
  const [guestName, setGuestName] = useState("")
  const [checkInSuccess, setCheckInSuccess] = useState(false)

  const handleCheckIn = () => {
    // TODO: Implement actual check-in via Supabase
    setCheckInSuccess(true)
    setTimeout(() => {
      setCheckInSuccess(false)
      setSelectedHousehold(null)
      setSelectedMembers([])
      setIsGuest(false)
      setGuestName("")
      setSearchTerm("")
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="bg-[#5a7d5d] text-white py-6">
          <div className="container mx-auto px-4">
            <Link href="/board-portal" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold">Member Check-In</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Check-In Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border rounded-lg p-6">
                {checkInSuccess ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-green-800">Checked In!</h2>
                  </div>
                ) : (
                  <>
                    {/* Search */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Search Member</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search by household or member name..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Search Results */}
                    {searchTerm && !selectedHousehold && (
                      <div className="mb-6 border rounded-lg divide-y">
                        {mockSearchResults.map((result) => (
                          <button
                            key={result.id}
                            onClick={() => setSelectedHousehold(result)}
                            className="w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between"
                          >
                            <div>
                              <p className="font-semibold text-foreground">{result.household}</p>
                              <p className="text-sm text-muted-foreground">{result.members.join(", ")}</p>
                            </div>
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                              {result.hasGuestPasses} passes
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Selected Household */}
                    {selectedHousehold && (
                      <div className="space-y-6">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-foreground">{selectedHousehold.household}</h3>
                            <button
                              onClick={() => setSelectedHousehold(null)}
                              className="text-sm text-[#5a7d5d] hover:underline"
                            >
                              Change
                            </button>
                          </div>

                          {/* Member Selection */}
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Select members checking in:</p>
                            {selectedHousehold.members.map((member) => (
                              <label key={member} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedMembers.includes(member)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedMembers([...selectedMembers, member])
                                    } else {
                                      setSelectedMembers(selectedMembers.filter((m) => m !== member))
                                    }
                                  }}
                                  className="rounded"
                                />
                                <span>{member}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Guest Option */}
                        <div className="p-4 border rounded-lg">
                          <label className="flex items-center gap-2 cursor-pointer mb-3">
                            <input
                              type="checkbox"
                              checked={isGuest}
                              onChange={(e) => setIsGuest(e.target.checked)}
                              className="rounded"
                            />
                            <span className="font-medium">Include Guest</span>
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                              {selectedHousehold.hasGuestPasses} passes available
                            </span>
                          </label>
                          {isGuest && (
                            <input
                              type="text"
                              placeholder="Guest name"
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              className="w-full border rounded px-3 py-2"
                            />
                          )}
                        </div>

                        <button
                          onClick={handleCheckIn}
                          disabled={selectedMembers.length === 0 && !isGuest}
                          className="w-full bg-[#5a7d5d] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#4a6d4d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <UserCheck className="h-6 w-6" />
                          Check In
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Recent Check-ins */}
            <div>
              <div className="bg-white border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <h2 className="font-semibold text-foreground">Recent Check-ins</h2>
                </div>
                <div className="space-y-3">
                  {mockRecentCheckins.map((checkin) => (
                    <div key={checkin.id} className="flex items-start justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium text-foreground text-sm">{checkin.household}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          {checkin.members.join(", ")}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{checkin.time}</p>
                        {checkin.type === "guest" && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">Guest</span>
                        )}
                      </div>
                    </div>
                  ))}
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
