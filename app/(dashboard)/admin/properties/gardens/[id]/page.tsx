// app/(dashboard)/admin/property/garden/[id]/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
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
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PropertyActions from '@/components/admin/PropertyActions'

interface PageProps {
  params: {
    id: string
  }
}

export default async function GardenDetailPage({ params }: PageProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const role = user.user_metadata?.role
  if (role !== 'admin') redirect('/dashboard')

  const garden = await prisma.marriageGarden.findUnique({
    where: { id: params.id },
    include: {
      host: true,
    },
  })

  if (!garden) {
    notFound()
  }

  const statusColor = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/admin/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{garden.title}</CardTitle>
                  <CardDescription>
                    {garden.city}, {garden.country} {garden.zipCode}
                  </CardDescription>
                </div>
                <Badge className={statusColor[garden.status]}>{garden.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Photos */}
              {garden.photos && garden.photos.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  {garden.photos.map((photo, index) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{garden.description}</p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Price</h3>
                  <p className="text-muted-foreground">${garden.price}/night</p>
                </div>
                <div>
                  <h3 className="font-semibold">Capacity</h3>
                  <p className="text-muted-foreground">{garden.capacity} people</p>
                </div>
                <div>
                  <h3 className="font-semibold">Area</h3>
                  <p className="text-muted-foreground">{garden.area} sq ft</p>
                </div>
              </div>

              {/* Amenities */}
              {garden.amenities && garden.amenities.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {garden.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Host Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{garden.host?.name || 'No name'}</p>
              <p className="text-sm text-muted-foreground">{garden.host?.email}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {garden.status === 'PENDING' && (
                <PropertyActions
                  propertyId={garden.id}
                  propertyType="garden"
                  currentStatus={garden.status}
                />
              )}
              {garden.status !== 'PENDING' && (
                <p className="text-sm text-muted-foreground">
                  This listing has been {garden.status.toLowerCase()}.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}