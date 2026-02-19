// app/venues/page.tsx
import { prisma } from '@/lib/prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default async function VenuesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const city = typeof searchParams?.city === 'string' ? searchParams.city : undefined
  const type = typeof searchParams?.type === 'string' ? searchParams.type : undefined

  // Fetch approved venues (marriage gardens and maybe other venue types)
  // For now, we'll show marriage gardens as venues
  const gardens = await prisma.marriageGarden.findMany({
    where: {
      status: 'APPROVED',
      ...(city ? { city: { contains: city, mode: 'insensitive' } } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Venues for Events</h1>
        <p className="text-muted-foreground">
          Discover beautiful spaces for weddings, parties, and gatherings
        </p>
      </div>

      {/* Search and filter */}
      <div className="mb-8 flex gap-4">
        <form className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search by city..."
            name="city"
            defaultValue={city}
          />
          <Button type="submit">Search</Button>
        </form>
        <Select name="type" defaultValue={type}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Venue type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="garden">Marriage Garden</SelectItem>
            <SelectItem value="hall">Banquet Hall</SelectItem>
            <SelectItem value="outdoor">Outdoor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {gardens.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No venues found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gardens.map((garden) => (
            <Link key={garden.id} href={`/venues/${garden.id}`}>
              <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative h-48 w-full">
                  {garden.photos && garden.photos[0] ? (
                    <Image
                      src={garden.photos[0]}
                      alt={garden.title}
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
                  <CardTitle className="line-clamp-1">{garden.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {garden.city}, {garden.country}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {garden.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold">${garden.price}/night</span>
                    {garden.capacity && (
                      <span className="text-sm text-muted-foreground">
                        Up to {garden.capacity} guests
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}