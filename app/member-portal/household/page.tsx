"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Users, Mail, Phone, Edit2, Plus } from "lucide-react"

// Mock data
const mockHousehold = {
  name: "The Smith Family",
  address: "123 Summit Ave, Saint Paul, MN 55102",
  membershipType: "Family",
  memberSince: "2019",
  members: [
    { id: 1, firstName: "John", lastName: "Smith", email: "john.smith@example.com", phone: "651-555-0101", role: "Primary", isPrimary: true },
    { id: 2, firstName: "Sarah", lastName: "Smith", email: "sarah.smith@example.com", phone: "651-555-0102", role: "Spouse", isPrimary: false },
    { id: 3, firstName: "Emma", lastName: "Smith", email: null, phone: null, role: "Child", isPrimary: false, age: 14 },
    { id: 4, firstName: "Jack", lastName: "Smith", email: null, phone: null, role: "Child", isPrimary: false, age: 11 },
  ],
}

export default function HouseholdPage() {
  const [household] = useState(mockHousehold)
  const [editMode, setEditMode] = useState(false)

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
            <h1 className="text-2xl font-bold">My Household</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Household Info */}
          <div className="bg-white border rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{household.name}</h2>
                  <p className="text-sm text-muted-foreground">{household.membershipType} Membership • Since {household.memberSince}</p>
                </div>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className="text-sm text-[#5a7d5d] hover:underline flex items-center gap-1"
              >
                <Edit2 className="h-4 w-4" />
                {editMode ? "Done" : "Edit"}
              </button>
            </div>
            <p className="text-foreground">{household.address}</p>
          </div>

          {/* Members */}
          <div className="bg-white border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Household Members</h2>
              {editMode && (
                <button className="text-sm bg-[#5a7d5d] text-white px-3 py-1.5 rounded-md hover:bg-[#4a6d4d] flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Add Member
                </button>
              )}
            </div>

            <div className="space-y-4">
              {household.members.map((member) => (
                <div key={member.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {member.firstName} {member.lastName}
                        </h3>
                        {member.isPrimary && (
                          <span className="text-xs bg-[#5a7d5d] text-white px-2 py-0.5 rounded">Primary</span>
                        )}
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{member.role}</span>
                      </div>
                      {member.age && (
                        <p className="text-sm text-muted-foreground mt-1">Age: {member.age}</p>
                      )}
                      <div className="flex flex-wrap gap-4 mt-2">
                        {member.email && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            {member.email}
                          </div>
                        )}
                        {member.phone && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            {member.phone}
                          </div>
                        )}
                      </div>
                    </div>
                    {editMode && !member.isPrimary && (
                      <button className="text-sm text-[#5a7d5d] hover:underline">Edit</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <p className="text-sm text-muted-foreground mt-6 text-center">
            Need to make changes to your membership? Contact{" "}
            <a href="mailto:sallyhite1@gmail.com" className="text-[#5a7d5d] hover:underline">
              the club coordinator
            </a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
