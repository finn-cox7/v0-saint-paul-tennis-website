import { Card, CardContent } from "@/components/ui/card"
import { Users, Trophy, Waves, type LucideIcon } from "lucide-react"
import Image from "next/image"

type FeatureIcon = LucideIcon | "whistle-svg"

interface Feature {
  icon: FeatureIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Trophy,
    title: "Great Tennis Courts",
    description: "Clay courts groomed twice daily available for both open play and private lessons",
  },
  {
    icon: Waves,
    title: "Swimming & Pool Fun",
    description: "A full sized pool available for both lap swim and open swim throughout the day",
  },
  {
    icon: Users,
    title: "Tight-Knit Community",
    description: "Get to know your neighbors through social events, friendly matches, and family activities.",
  },
  {
    icon: "whistle-svg",
    title: "Education",
    description: "Both swim and tennis lessons available for people of all skill sets and ages, all summer long",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-6">What we&apos;re all about</h2>
          <div className="w-24 h-px bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const isWhistleSvg = feature.icon === "whistle-svg"

            return (
              <Card key={index} className="border-0 shadow-none bg-transparent group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                      {isWhistleSvg ? (
                        <Image
                          src="/whistle-smooth.svg"
                          alt="Whistle"
                          width={32}
                          height={32}
                          className="group-hover:brightness-0 group-hover:invert transition-all"
                        />
                      ) : (
                        (() => {
                          const Icon = feature.icon as LucideIcon
                          return <Icon className="h-8 w-8 group-hover:text-white transition-colors" />
                        })()
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>

                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
