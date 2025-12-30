"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Search, Mail, Phone, Users } from "lucide-react"

// Mock data
const mockMembers = [
  { id: 1, household: "The Anderson Family", members: ["Mike", "Lisa", "Jake"], phone: "651-555-0201", email: "anderson@example.com" },
  { id: 2, household: "The Brown Family", members: ["David", "Sarah"], phone: "651-555-0202", email: "brown@example.com" },
  { id: 3, household: "The Chen Family", members: ["Wei", "Mei", "Lily", "James"], phone: "651-555-0203", email: "chen@example.com" },
  { id: 4, household: "The Davis Family", members: ["Robert", "Emily", "Max"], phone: "651-555-0204", email: "davis@example.com" },
  { id: 5, household: "The Garcia Family", members: ["Carlos", "Maria", "Sofia"], phone: "651-555-0205", email: "garcia@example.com" },
  { id: 6, household: "The Johnson Family", members: ["Tom", "Nancy"], phone: "651-555-0206", email: "johnson@example.com" },
  { id: 7, household: "The Kim Family", members: ["John", "Grace", "Ethan", "Chloe"], phone: "651-555-0207", email: "kim@example.com" },
  { id: 8, household: "The Lee Family", members: ["Richard", "Jennifer", "Alex"], phone: "651-555-0208", email: "lee@example.com" },
  { id: 9, household: "The Miller Family", members: ["Steve", "Karen", "Emma", "Jack"], phone: "651-555-0209", email: "miller@example.com" },
  { id: 10, household: "The Wilson Family", members: ["Chris", "Amanda"], phone: "651-555-0210", email: "wilson@example.com" },
]

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [members] = useState(mockMembers)

  const filteredMembers = members.filter(
    (m) =>
      m.household.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.members.some((name) => name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="bg-[#5a7d5d] text-white py-6">
          <div className="container mx-auto px-4">
            <Link href="/member-portal" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Portal
            </Link>
            <h1 className="text-2xl font-bold">Member Directory</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by household or member name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white"
            />
          </div>

          {/* Results */}
          <div className="bg-white border rounded-lg divide-y">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((household) => (
                <div key={household.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{household.household}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Users className="h-4 w-4" />
                        {household.members.join(", ")}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <a
                        href={`mailto:${household.email}`}
                        className="text-sm text-[#5a7d5d] hover:underline flex items-center gap-1"
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </a>
                      <a
                        href={`tel:${household.phone}`}
                        className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                      >
                        <Phone className="h-4 w-4" />
                        {household.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No members found matching &quot;{searchTerm}&quot;
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            Showing {filteredMembers.length} of {members.length} households.
            Contact information is for member use only.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
