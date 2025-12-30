"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Search, Users, Mail, Phone, Edit2, MoreVertical } from "lucide-react"

// Mock data
const mockMembers = [
  { id: 1, household: "Anderson Family", primary: "Mike Anderson", email: "anderson@example.com", phone: "651-555-0201", status: "active", memberCount: 3, since: "2018" },
  { id: 2, household: "Brown Family", primary: "David Brown", email: "brown@example.com", phone: "651-555-0202", status: "active", memberCount: 2, since: "2020" },
  { id: 3, household: "Chen Family", primary: "Wei Chen", email: "chen@example.com", phone: "651-555-0203", status: "active", memberCount: 4, since: "2019" },
  { id: 4, household: "Davis Family", primary: "Robert Davis", email: "davis@example.com", phone: "651-555-0204", status: "inactive", memberCount: 3, since: "2015" },
  { id: 5, household: "Garcia Family", primary: "Carlos Garcia", email: "garcia@example.com", phone: "651-555-0205", status: "active", memberCount: 3, since: "2021" },
  { id: 6, household: "Johnson Family", primary: "Tom Johnson", email: "johnson@example.com", phone: "651-555-0206", status: "active", memberCount: 2, since: "2017" },
  { id: 7, household: "Kim Family", primary: "John Kim", email: "kim@example.com", phone: "651-555-0207", status: "active", memberCount: 4, since: "2022" },
  { id: 8, household: "Lee Family", primary: "Richard Lee", email: "lee@example.com", phone: "651-555-0208", status: "active", memberCount: 3, since: "2016" },
]

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [members] = useState(mockMembers)

  const filtered = members.filter((m) => {
    if (statusFilter !== "all" && m.status !== statusFilter) return false
    if (searchTerm && !m.household.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !m.primary.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

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
            <h1 className="text-2xl font-bold">Member Management</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Search & Filters */}
          <div className="bg-white border rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search households..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="text-sm text-muted-foreground">
              {filtered.length} households
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Household</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Primary Contact</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Contact</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Members</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Since</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <Users className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="font-medium text-foreground">{member.household}</span>
                        </div>
                      </td>
                      <td className="p-4 text-foreground">{member.primary}</td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <a href={`mailto:${member.email}`} className="flex items-center gap-1 text-sm text-[#5a7d5d] hover:underline">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </a>
                          <a href={`tel:${member.phone}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                            <Phone className="h-3 w-3" />
                            {member.phone}
                          </a>
                        </div>
                      </td>
                      <td className="p-4 text-foreground">{member.memberCount}</td>
                      <td className="p-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          member.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">{member.since}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Edit2 className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No members found
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            For membership changes, contact{" "}
            <a href="mailto:sallyhite1@gmail.com" className="text-[#5a7d5d] hover:underline">
              Sally Hite
            </a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
