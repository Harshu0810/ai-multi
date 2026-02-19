// app/venues/[id]/page.tsx
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma/client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: {
    id: string
  }
}

export default async function VenueDetailPage({ params }: PageProps) {
  const garden = await prisma.marriageGarden.findUnique({
    where: { id: params.id, status: 'APPROVED' },
    include: {
      host: {
        select: { name: true, email: true },
      },
    },
  })

  if (!garden) {
    notFound()
  }

  return (
    <div className="container py-8">
      <div className="mb-4">
        <Link href="/venues">
          <Button variant="ghost">← Back to Venues</Button>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content - images and details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image gallery */}
          {garden.photos && garden.photos.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {garden.photos.map((photo, index) => (
                <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={photo}
                    alt={`${garden.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{garden.title}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {garden.street && `${garden.street}, `}{garden.city}, {garden.country} {garden.zipCode}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{garden.description}</p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-medium">{garden.capacity || 'N/A'} guests</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Area</p>
                    <p className="font-medium">{garden.area || 'N/A'} sq ft</p>
                  </div>
                </div>
              </div>

              {garden.amenities && garden.amenities.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {garden.amenities.map((amenity, i) => (
                      <Badge key={i} variant="outline">{amenity}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - booking/pricing */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>${garden.price}</CardTitle>
              <CardDescription>per night</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" size="lg">
                Check Availability
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                You won't be charged yet
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hosted by</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{garden.host?.name || 'Anonymous'}</p>
              <p className="text-sm text-muted-foreground">{garden.host?.email}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}