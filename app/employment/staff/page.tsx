import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function StaffPage() {
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
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Staff</h1>
          <p className="text-lg text-muted-foreground">
            Meet our dedicated team of professionals at Saint Paul Tennis Club.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
