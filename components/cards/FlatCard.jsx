'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { MapPin, FileText, FileArchive } from 'lucide-react'
import Link from 'next/link'

export const FlatCard = ({ flatData }) => {
  const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const documents = [flatData.nocDoc, flatData.termsOfConditionsDoc, flatData.video].filter(Boolean)

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="bg-slate-50">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">{flatData.title}</CardTitle>
            <CardDescription className="text-sm mt-1">
              <span className="font-medium">{flatData.bhk}</span> • Added on {formatDate(flatData.createdAt)}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant={flatData.isApproved ? 'default' : 'outline'} className="text-xs">
              {flatData.isApproved ? 'Approved' : 'Approval Pending'}
            </Badge>
            <Badge variant={flatData.isActive ? 'default' : 'destructive'} className="text-xs">
              {flatData.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div className="relative w-full h-48">
          <Carousel className="w-full">
            <CarouselContent>
              {flatData.pictures &&
                flatData.pictures.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <img src={img} alt="Property Image" className="w-full h-40 object-cover rounded-md" />
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-slate-500 mr-2" />
              <div>
                <p className="text-xs font-medium">Location</p>
                <p className="text-xs text-slate-500">
                  {flatData.landmark}, {flatData.district}, {flatData.state}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center">
              <FileText className="h-4 w-4 text-slate-500 mr-2" />
              <div>
                <p className="text-xs font-medium">Price Details</p>
                <p className="text-xs text-slate-500">Rent: ₹{flatData.price}/month</p>
                <p className="text-xs text-slate-500">Security: ₹{flatData.securityAmount}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium mb-1">Amenities</h3>
          <div className="flex flex-wrap gap-1">
            {flatData.amenities &&
              flatData.amenities.map((amenity, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))}
          </div>
        </div>

        {flatData.hostingFacilities && flatData.hostingFacilities.length > 0 && (
          <div>
            <h3 className="text-xs font-medium mb-1">Hosting Facilities</h3>
            <div className="flex flex-wrap gap-1">
              {flatData.hostingFacilities.map((facility, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {facility}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between bg-slate-50 p-3">
        <div className="flex gap-2">
          {documents.map((document, index) => (
            <Link target="_blank" key={index} className="w-3" href={document}>
              <FileArchive />
            </Link>
          ))}
        </div>
        <Link href={`/properties/flat/${flatData.id}`} className="text-sm text-primary hover:underline">
          View Details
        </Link>
      </CardFooter>
    </Card>
  )
}