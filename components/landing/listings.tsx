// components/landing/listings.tsx
import { prisma } from '@/lib/prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default async function Listings() {
  // Fetch a few featured/approved properties (mix of flats and gardens)
  const [flats, gardens] = await Promise.all([
    prisma.flat.findMany({
      where: { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
    prisma.marriageGarden.findMany({
      where: { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
  ])

  const listings = [...flats, ...gardens].slice(0, 6) // limit to 6

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Listings</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover amazing places to stay and events to attend.
          </p>
        </div>

        {listings.length === 0 ? (
          <p className="text-center text-muted-foreground">No listings available.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => {
              // Determine if it's a flat or garden to link correctly
              const isFlat = 'bedrooms' in listing
              const href = isFlat ? `/properties/${listing.id}` : `/venues/${listing.id}`
              const imageUrl = listing.photos?.[0] || ''
              return (
                <Link key={listing.id} href={href}>
                  <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="relative h-48 w-full">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={listing.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-muted">
                          <span className="text-muted-foreground">No image</span>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{listing.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {listing.city}, {listing.country}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {listing.description}
                      </p>
                      <p className="mt-2 font-semibold">${listing.price}/night</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}

        <div className="text-center mt-10">
          <Button asChild>
            <Link href="/properties">
              Browse All Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}