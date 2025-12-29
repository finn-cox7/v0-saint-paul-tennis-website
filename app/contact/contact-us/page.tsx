import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function ContactUsPage() {
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
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <div className="prose max-w-none">
          <p>Get in touch with Saint Paul Tennis Club.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
