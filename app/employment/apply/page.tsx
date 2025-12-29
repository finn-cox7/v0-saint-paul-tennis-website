import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function ApplyPage() {
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
          <h1 className="text-4xl font-bold mb-8">Apply</h1>
          <p className="text-lg text-muted-foreground">
            Join our team at Saint Paul Tennis Club. Submit your application today.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
