import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function LisasBioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full">
        <Image
          src="/sptc_lisa.jpg"
          alt="Saint Paul Tennis Club pool area"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* </CHANGE> */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-8">Lisa's Bio</h1>
          <div className="prose max-w-none">
            <p className="text-muted-foreground">Content for Lisa's Bio will be added here.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
