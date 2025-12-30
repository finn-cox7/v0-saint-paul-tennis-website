import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-8 text-balance">
              Your neighborhood club since 1912
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                We&apos;ve been part of the Summit Hill neighborhood since 1912. The Saint Paul Tennis Club is a small,
                friendly place where families come to play tennis, swim, and enjoy summer together. We&apos;re open Memorial
                Day through Labor Day with programs for kids and adults.
              </p>

              <p>
                Our historic clubhouse and courts have that old-school charm, but we keep things relaxed and fun.
                Whether you&apos;re here for a serious match or just want to cool off in the pool, everyone&apos;s welcome.
              </p>

              <p>Stop by and see what makes our little club special. We&apos;d love to have you join our tennis family.</p>
            </div>

            <Button className="mt-8" size="lg">
              Learn More About Us
            </Button>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] bg-muted rounded-lg overflow-hidden">
              <Image
                src="/historic-tennis-club-building.jpg"
                alt="Historic Saint Paul Tennis Club building"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
