import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function MembershipPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full">
        <Image
          src="/images/sptc_balcony.jpg"
          alt="Saint Paul Tennis Club facilities"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* </CHANGE> */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-center mb-8">Become a Member</h1>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-center mb-12 leading-relaxed">
              Join the Saint Paul Tennis Club and become part of a vibrant community dedicated to tennis, swimming, and
              lifelong friendships.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Family Membership</h2>
                <p className="text-3xl font-bold mb-6">
                  $2,500<span className="text-lg font-normal text-gray-600">/season</span>
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Access to all tennis courts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Full swimming pool privileges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Includes up to 4 family members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Priority court reservations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Access to social events</span>
                  </li>
                </ul>
                <Button className="w-full">Apply Now</Button>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Individual Membership</h2>
                <p className="text-3xl font-bold mb-6">
                  $1,200<span className="text-lg font-normal text-gray-600">/season</span>
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Access to all tennis courts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Full swimming pool privileges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Single member access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Court reservation privileges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Access to social events</span>
                  </li>
                </ul>
                <Button className="w-full">Apply Now</Button>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg mb-12">
              <h2 className="text-2xl font-semibold mb-4">Membership Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Tennis Facilities</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Enjoy our well-maintained clay and hard courts with professional lighting for evening play.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Swimming Pool</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Olympic-sized pool with dedicated lap lanes and recreational areas for the whole family.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Professional Instruction</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Access to certified tennis and swimming instructors for lessons and clinics.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Social Events</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Regular tournaments, social gatherings, and family-friendly events throughout the season.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Ready to Join?</h2>
              <p className="text-lg mb-6 leading-relaxed">
                Contact us today to learn more about membership options and start your application.
              </p>
              <Button size="lg" className="text-lg px-8 py-6">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
