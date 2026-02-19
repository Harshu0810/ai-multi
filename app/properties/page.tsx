// app/properties/page.tsx
import { prisma } from '@/lib/prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const city = typeof searchParams?.city === 'string' ? searchParams.city : undefined
  const propertyType = typeof searchParams?.type === 'string' ? searchParams.type : undefined

  // Fetch approved flats (and optionally gardens if needed)
  const flats = await prisma.flat.findMany({
    where: {
      status: 'APPROVED',
      ...(city ? { city: { contains: city, mode: 'insensitive' } } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })

  // If you want to include gardens, you can fetch them and merge
  // For simplicity, we'll just show flats

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Properties for Rent</h1>
        <p className="text-muted-foreground">
          Find your perfect flat or apartment
        </p>
      </div>

      {/* Search and filter */}
      <div className="mb-8 flex flex-wrap gap-4">
        <form className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search by city..."
            name="city"
            defaultValue={city}
          />
          <Button type="submit">Search</Button>
        </form>
        <Select name="type" defaultValue={propertyType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="flat">Flat/Apartment</SelectItem>
            <SelectItem value="garden">Marriage Garden</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {flats.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No properties found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {flats.map((flat) => (
            <Link key={flat.id} href={`/properties/${flat.id}`}>
              <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative h-48 w-full">
                  {flat.photos && flat.photos[0] ? (
                    <Image
                      src={flat.photos[0]}
                      alt={flat.title}
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
                  <CardTitle className="line-clamp-1">{flat.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {flat.city}, {flat.country}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {flat.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold">${flat.price}/night</span>
                    <span className="text-sm text-muted-foreground">
                      {flat.bedrooms} bed • {flat.bathrooms} bath
                    </span>
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