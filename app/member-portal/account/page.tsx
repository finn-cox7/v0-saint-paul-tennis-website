"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, CreditCard, Gift, Receipt, ChevronRight, Plus } from "lucide-react"

// Mock data
const mockAccount = {
  balance: 45.00,
  guestPasses: 3,
  purchaseHistory: [
    { id: 1, date: "2025-06-01", description: "Guest Pass (3-pack)", amount: 52.50, type: "purchase" },
    { id: 2, date: "2025-05-15", description: "Private Tennis Lesson - Greg Hiers", amount: 75.00, type: "purchase" },
    { id: 3, date: "2025-05-10", description: "Swim Team Registration - Emma", amount: 150.00, type: "purchase" },
    { id: 4, date: "2025-04-20", description: "Account Credit", amount: -50.00, type: "credit" },
  ],
  guestPassUsage: [
    { id: 1, date: "2025-06-08", guestName: "Tom Wilson", usedBy: "John Smith" },
    { id: 2, date: "2025-05-25", guestName: "Mary Johnson", usedBy: "Sarah Smith" },
  ],
}

export default function AccountPage() {
  const [account] = useState(mockAccount)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

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
            <h1 className="text-2xl font-bold">Account & Billing</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Account Balance</p>
              <p className="text-3xl font-bold text-foreground">${account.balance.toFixed(2)}</p>
              <button className="mt-4 text-sm text-[#5a7d5d] hover:underline flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Add Credit
              </button>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Gift className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Guest Passes</p>
              <p className="text-3xl font-bold text-foreground">{account.guestPasses} <span className="text-lg font-normal text-muted-foreground">remaining</span></p>
              <Link href="/shop" className="mt-4 text-sm text-[#5a7d5d] hover:underline flex items-center gap-1">
                Buy More Passes <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Purchase History */}
          <section className="bg-white border rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Receipt className="h-5 w-5 text-gray-600" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Purchase History</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Description</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {account.purchaseHistory.map((item) => (
                    <tr key={item.id} className="border-b last:border-0">
                      <td className="py-3 text-sm text-muted-foreground">{formatDate(item.date)}</td>
                      <td className="py-3 text-sm text-foreground">{item.description}</td>
                      <td className={`py-3 text-sm text-right font-medium ${item.amount < 0 ? "text-green-600" : "text-foreground"}`}>
                        {item.amount < 0 ? "-" : ""}${Math.abs(item.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Guest Pass Usage */}
          <section className="bg-white border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Gift className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Guest Pass Usage</h2>
            </div>

            {account.guestPassUsage.length > 0 ? (
              <div className="space-y-3">
                {account.guestPassUsage.map((pass) => (
                  <div key={pass.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{pass.guestName}</p>
                      <p className="text-sm text-muted-foreground">Hosted by {pass.usedBy}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{formatDate(pass.date)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">No guest passes used yet</p>
            )}
          </section>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            Questions about your account? Contact{" "}
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
