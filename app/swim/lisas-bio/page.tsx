import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export default function LisasBioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/sptc_swim_lisa.jpg"
          alt="Coach Lisa at Saint Paul Tennis Club pool"
          fill
          className="object-cover"
          priority
        />
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-2">Lisa Thomas</h1>
          <h2 className="text-xl text-muted-foreground mb-8">Aquatics Program Director</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <section>
                <h3 className="text-xl font-semibold text-foreground mb-3">About Coach Lisa</h3>
                <p className="text-foreground leading-relaxed mb-4">
                  Lisa Thomas has been a fifth grade teacher at Nativity of Our Lord Catholic School for over 20 years,
                  in addition to coaching their swim team. Since 2020, she has served as head coach for Cretin Derham Hall
                  High School&apos;s Girls Swim and Dive Team.
                </p>
                <p className="text-foreground leading-relaxed">
                  In 2022, Lisa took over as the Aquatics Program Director and Swim Team Head Coach at Saint Paul Tennis Club.
                  Her extensive experience in both education and competitive swimming coaching brings a unique perspective
                  to our aquatics program, helping swimmers of all ages and abilities achieve their goals.
                </p>
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:swimming@saintpaultennisclub.com" className="text-[#5a7d5d] hover:underline font-medium">
                      swimming@saintpaultennisclub.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Club Phone (In Season)</p>
                    <p className="font-medium">651-224-3742</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Programs Offered</h3>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[#5a7d5d] mt-1">•</span>
                    Beginner Swim Classes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5a7d5d] mt-1">•</span>
                    Intermediate Swim Classes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5a7d5d] mt-1">•</span>
                    Junior Swimmers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5a7d5d] mt-1">•</span>
                    Swim & Dive Team
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5a7d5d] mt-1">•</span>
                    Private Lessons
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5a7d5d] mt-1">•</span>
                    Adult Lessons
                  </li>
                </ul>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link
                    href="/swim/private-lessons"
                    className="block text-[#5a7d5d] hover:underline font-medium"
                  >
                    Book a Private Lesson →
                  </Link>
                  <Link
                    href="/swim/instruction"
                    className="block text-[#5a7d5d] hover:underline font-medium"
                  >
                    View Swim Programs →
                  </Link>
                  <Link
                    href="/swim/swim-team-info"
                    className="block text-[#5a7d5d] hover:underline font-medium"
                  >
                    Swim Team Information →
                  </Link>
                  <Link
                    href="/swim/schedule"
                    className="block text-[#5a7d5d] hover:underline font-medium"
                  >
                    Pool Schedule →
                  </Link>
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
