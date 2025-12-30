import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"

export default function ClubOverviewPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative h-[400px] w-full overflow-hidden">
          <Image
            src="/images/sptc_balcony.jpg"
            alt="Saint Paul Tennis Club pool and balcony area with pergola and seating"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Club Overview</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              The Saint Paul Tennis Club is a private, member owned tennis and swim club located in the Summit Hill
              neighborhood of Saint Paul. Founded in 1912, SPTC has been a neighborhood gathering spot for over 100
              years. The Club is primarily a summer operation. The swimming pool is open from Memorial Day until Labor
              Day. The tennis courts open in the spring, usually late April and close in mid-October.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              The Club is managed by a member-elected Board of Directors and a small staff including a Club
              Manager/Swimming Director, Tennis Professional, front desk & lifeguarding staff, and assistant tennis
              pros.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              In 2016, the Club undertook a major renovation, resulting in a new 25-yard, 6-lane swimming pool with a
              diving board and shallow well. A new bath house and office/club room was constructed. An underground
              watering system was installed under the four &quot;green clay&quot; tennis courts. We now have a beautiful,
              up-to-date facility.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              SPTC offers a variety of tennis and swim programs for both adults and children.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              The swimming pool is open daily during the summer with times available for lap swim, lessons, and
              open/family swim. The junior swim team practices every morning from mid June until early August and
              competes against other clubs in the Saint Paul area. Swimming lessons are also offered.
            </p>
            <p className="text-lg text-muted-foreground">
              The four tennis courts are open every day from 8 AM until dusk. A professional tennis staff offers a
              variety of drills and lessons for both adults and children. A junior tennis team competes against other
              clubs in the area. There is ample court time available for open play and members can reserve courts in
              advance.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-16 flex justify-center">
          <Link
            href="/membership"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg transition-colors bg-[#5a7d5d] hover:bg-[#4a6d4d]"
          >
            Join Today
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
