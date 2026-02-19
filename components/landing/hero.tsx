// components/landing/hero.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 md:py-28">
      <div className="container text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Find Your Perfect Space
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Discover amazing flats, venues, services, and products – all in one place.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/properties">Browse Properties</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/services">Explore Services</Link>
          </Button>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex w-full max-w-md items-center space-x-2 rounded-lg border bg-background p-2">
            <Search className="ml-2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by city, service, or product..."
              className="flex-1 bg-transparent outline-none"
            />
            <Button type="submit">Search</Button>
          </div>
        </div>
      </div>
    </section>
  )
}