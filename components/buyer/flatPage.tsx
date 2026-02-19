'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { Calendar, ExternalLink, FileText, MapPin, Video } from 'lucide-react'
import { Flat } from '@prisma/client'

export default function FlatDetailsPage({ property }: { property: Flat }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <div className="flex items-center mt-2">
            <MapPin className="w-4 h-4 mr-1 text-gray-500" />
            <p className="text-gray-600">
              {property.landmark}, {property.district}, {property.state}
            </p>
          </div>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <Badge className={`mr-2 ${property.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
            {property.isActive ? 'Active' : 'Inactive'}
          </Badge>
          <Badge className={`${property.isApproved ? 'bg-green-500' : 'bg-yellow-500'}`}>
            {property.isApproved ? 'Approved' : 'Pending Approval'}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Property Images</CardTitle>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full">
                <CarouselContent>
                  {property.pictures.map((pic, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex items-center justify-center p-2">
                            <img src={pic} alt={`Property image ${index + 1}`} className="rounded-md object-cover h-64 w-full" />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>

          {property.video && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="w-5 h-5 mr-2" />
                  Property Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <video controls className="w-full rounded-md max-h-96" src={property.video}>
                  Your browser does not support the video tag.
                </video>
              </CardContent>
            </Card>
          )}

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-3 text-blue-600" />
                  <div>
                    <p className="font-medium">NOC Document</p>
                    <p className="text-sm text-gray-500">No Objection Certificate</p>
                  </div>
                </div>
                <a
                  href={property.nocDoc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <span className="mr-1">View</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-3 text-blue-600" />
                  <div>
                    <p className="font-medium">Terms and Conditions</p>
                    <p className="text-sm text-gray-500">Rental agreement terms</p>
                  </div>
                </div>
                <a
                  href={property.termsOfConditionsDoc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <span className="mr-1">View</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Configuration</p>
                <p className="font-medium">{property.bhk}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-gray-500">Monthly Rent</p>
                <p className="font-medium">₹{property.price}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-gray-500">Security Deposit</p>
                <p className="font-medium">₹{property.securityAmount}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">
                  {property.landmark}, {property.district}
                </p>
                <p className="text-sm">
                  {property.state}, {property.pincode}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-gray-500">Amenities</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {property.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-100">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Listing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Listed On</p>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                  <p>{formatDate(property.createdAt.toISOString())}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}