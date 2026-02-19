// components/landing/features.tsx
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, Shield, DollarSign, Clock, Heart, Users } from 'lucide-react'

const features = [
  {
    icon: Home,
    title: 'Wide Selection',
    description: 'Choose from flats, gardens, restaurants, and more.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Your transactions are always safe and protected.',
  },
  {
    icon: DollarSign,
    title: 'Best Prices',
    description: 'Competitive pricing with no hidden fees.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'We are here to help you anytime, day or night.',
  },
  {
    icon: Heart,
    title: 'Verified Listings',
    description: 'All properties and services are thoroughly vetted.',
  },
  {
    icon: Users,
    title: 'Community Trust',
    description: 'Join thousands of happy users and hosts.',
  },
]

export default function Features() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose Spotly?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We make it easy to find and book the perfect space or service.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-0 shadow-none bg-transparent">
                <CardHeader>
                  <div className="mb-2">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}