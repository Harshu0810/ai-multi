// components/landing/sell.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, DollarSign, Users, Zap } from 'lucide-react'

const features = [
  {
    icon: Home,
    title: 'List your space',
    description: 'Easily list your flat, garden, or restaurant with our step-by-step form.',
  },
  {
    icon: DollarSign,
    title: 'Earn money',
    description: 'Set your own prices and earn extra income from your property.',
  },
  {
    icon: Users,
    title: 'Reach millions',
    description: 'Get exposure to a large audience of potential guests.',
  },
  {
    icon: Zap,
    title: 'Fast & easy',
    description: 'Our platform makes it simple to manage bookings and payments.',
  },
]

export default function SellSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to become a host?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of hosts who are earning extra income by sharing their spaces.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
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

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/seller/list-property">Get Started</Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            No fees to list. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  )
}