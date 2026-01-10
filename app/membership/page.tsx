"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function MembershipPage() {
  const router = useRouter()

  const handleApply = (membershipType: "family" | "single") => {
    const params = new URLSearchParams({
      title: `${membershipType === "family" ? "Family" : "Single"} Membership Waitlist Fee`,
      price: "100",
      description: `Non-refundable waitlist fee for ${membershipType} membership. Your name will be placed on the bottom of the waitlist after payment.`,
      type: "item",
      returnUrl: "/membership",
    })

    router.push(`/checkout?${params.toString()}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/sptc_main.jpg"
          alt="Saint Paul Tennis Club facilities"
          fill
          className="object-cover"
          priority
        />
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-center mb-12">Membership</h1>

          <div className="space-y-12 mb-16">
            {/* Membership Section */}
            <section>
              <div className="max-w-6xl space-y-4 text-lg leading-relaxed">
                <p>
                  Membership at the Saint Paul Tennis Club is limited to 216 families and 68 singles. The club is open to all regardless of age, race, gender, or home address.
                </p>
                <p>
                  <strong>Currently, the waitlist is over 10 years long.</strong>
                </p>
                <p>
                  To join the waitlist, there is a non-refundable fee of $100. After payment, your name will be placed on the bottom of your given list.
                </p>
                <p>
                  Membership is offered first come first serve as it becomes available due to attrition. The waitlist is ordered by date of application.
                </p>
                <p>
                  Membership is generally offered by email in the spring prior to the club opening. Due to the length of the waitlist, prospective members are advised to keep contact information such as emails, addresses, and phone numbers up to date.
                </p>
                <p>
                  <strong>Failure to respond to a membership offer in a timely manner will result in removal from the waitlist.</strong>
                </p>
              </div>
            </section>

            {/* Two Column Membership Details */}
            <section>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Single Membership */}
                <div className="bg-white border rounded-lg p-8 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-4">Single</h2>
                  <div className="space-y-4">
                    <p className="text-lg font-medium text-gray-700">68 memberships</p>
                    <p className="text-gray-700 leading-relaxed">
                      Applies to individual people. All other attendees not holding membership must be marked as guests.
                    </p>
                    <div className="space-y-2 pt-4 border-t">
                      <p className="font-semibold">
                        Initiation fee*: <span className="font-normal">$1,250</span>
                      </p>
                      <p className="font-semibold">
                        Dues**: <span className="font-normal">$630</span>
                      </p>
                      <p className="font-semibold">
                        Capital Improvement Assessment***: <span className="font-normal">$300</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Family Membership */}
                <div className="bg-white border rounded-lg p-8 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-4">Family</h2>
                  <div className="space-y-4">
                    <p className="text-lg font-medium text-gray-700">216 memberships</p>
                    <p className="text-gray-700 leading-relaxed">
                      Applies to married couple/domestic partnerships and children. All other attendees must be marked as guests.
                    </p>
                    <div className="space-y-2 pt-4 border-t">
                      <p className="font-semibold">
                        Initiation fee*: <span className="font-normal">$2,500</span>
                      </p>
                      <p className="font-semibold">
                        Dues**: <span className="font-normal">$1,260</span>
                      </p>
                      <p className="font-semibold">
                        Capital Improvement Assessment***: <span className="font-normal">$600</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Important Notes */}
            <section className="bg-amber-50 border border-amber-200 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Important Notes</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed">
                <p>
                  <strong>*The Initiation fee</strong> is a one-time, non-refundable charge paid at the time membership is accepted.
                </p>
                <p>
                  <strong>**Dues</strong> are charged annually on February 1 to support the operations of the club and must be paid by April 15. Failure to pay will result in suspension of club privileges and termination of membership.
                </p>
                <p>
                  <strong>***The Capital Improvement Assessment</strong> is required to pay for major club improvements and to retire the debt for the new pool, club house, and tennis court watering system. All members are obligated to pay the annual assessment for 15 years.
                </p>
                <p className="pt-4 border-t border-amber-300">
                  <strong>All costs are subject to change at the discretion of the Board of Directors.</strong>
                </p>
              </div>
            </section>

            {/* Application Section */}
            <section className="bg-gray-50 p-8 rounded-lg">
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <h2 className="text-3xl font-semibold">Click Below to Apply for Membership</h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  Please note the wait time and costs of joining the waitlist, and that the wait-list fee is non-refundable.
                </p>
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <Button
                    onClick={() => handleApply("family")}
                    size="lg"
                    className="text-lg py-6 w-full"
                  >
                    Family Membership
                  </Button>
                  <Button
                    onClick={() => handleApply("single")}
                    size="lg"
                    variant="outline"
                    className="text-lg py-6 w-full border-2"
                  >
                    Single Membership
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
