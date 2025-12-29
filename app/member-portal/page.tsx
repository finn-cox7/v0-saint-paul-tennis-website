import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function MemberPortalPage() {
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
          <h1 className="text-4xl font-bold mb-8">Member Portal</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-muted-foreground">
              Welcome to the Saint Paul Tennis Club Member Portal. Access your account, view schedules, make
              reservations, and manage your membership.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
