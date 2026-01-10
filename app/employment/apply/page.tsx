import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function ApplyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/sptc_employment_staff.jpeg"
          alt="Saint Paul Tennis Club facilities"
          fill
          className="object-cover object-[center_40%]"
          priority
        />
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left Column - Employment Information */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-foreground">Employment at the SPTC</h1>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Interested in working with us?</h2>
                
                <div className="space-y-2">
                  <p className="text-lg text-foreground font-medium">Lifeguards/maintenance workers</p>
                </div>
                
                <div className="space-y-3 text-foreground">
                  <p>Please fill out this application and email it to Lisa Thomas</p>
                  <p>
                    <a 
                      href="mailto:swimming@saintpaultennisclub.com" 
                      className="text-[#5a7d5d] hover:underline font-medium"
                    >
                      swimming@saintpaultennisclub.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - PDF Application */}
            <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
              <div className="w-full h-[800px] bg-white rounded border border-gray-200 overflow-hidden">
                <iframe
                  src="/apply/SPTC-Application.pdf"
                  className="w-full h-full"
                  title="SPTC Employment Application"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
