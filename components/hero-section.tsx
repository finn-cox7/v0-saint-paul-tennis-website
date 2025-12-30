import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/sptc_main.jpg"
          alt="Saint Paul Tennis Club facilities"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-black mb-8 text-balance">
            Saint Paul Tennis Club
          </h1>

          <p className="text-xl md:text-4xl text-black/80 mb-12 max-w-2xl mx-auto text-pretty leading-relaxed">
            Your summer home for swimming, tennis, and community
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/membership">
              <Button size="lg" className="text-lg px-8 py-6 group">
                Become a Member
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
