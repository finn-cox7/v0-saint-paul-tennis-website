import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function ContactUsPage() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/SPTC_contact.jpg"
          alt="Saint Paul Tennis Club facilities"
          fill
          className="object-cover"
          priority
        />
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-8">Contact Us</h1>
          
          <p className="text-foreground leading-relaxed mb-12 max-w-full">
            We&apos;d love to hear from you! Whether you have questions about membership,
            programs, or general inquiries, please reach out using the information below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-3">Club Phone</h3>
                <p className="text-foreground">
                  <span className="font-medium">In Season:</span>{" "}
                  <a href="tel:651-224-3742" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm">
                    651-224-3742
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Memorial Day through Labor Day
                </p>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-3">Email Contacts</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Tennis Inquiries</p>
                    <a href="mailto:tennis@saintpaultennisclub.com" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm">
                      tennis@saintpaultennisclub.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Swimming Inquiries</p>
                    <a href="mailto:swimming@saintpaultennisclub.com" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm">
                      swimming@saintpaultennisclub.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Club Coordinator</p>
                    <a href="mailto:sallyhite1@gmail.com" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm">
                      sallyhite1@gmail.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Please email only in season
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-3">Location</h3>
                <p className="text-foreground">
                  1065 Osceola Avenue<br />
                  55105<br />
                  St. Paul, MN
                </p>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-3">Hours of Operation</h3>
                <div className="space-y-2 text-foreground">
                  <div>
                    <span className="font-medium">Pool:</span> 6:00 AM – 9:00 PM (Memorial Day – Labor Day)
                  </div>
                  <div>
                    <span className="font-medium">Tennis Courts:</span> 7:30 AM – Dusk (Late April – Mid-October)
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Courts closed 3:30–4:00 PM daily for grooming
                  </div>
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
