import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function TennisInstructionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full">
        <Image
          src="/images/sptc_balcony.jpg"
          alt="Saint Paul Tennis Club tennis courts"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* </CHANGE> */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Instruction</h1>
        <p className="text-lg text-muted-foreground">Tennis instruction information coming soon.</p>
      </main>
      <Footer />
    </div>
  )
}
