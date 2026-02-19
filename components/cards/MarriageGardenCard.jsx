'use client'

import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Phone, Check, Music, Image } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const MarriageGardenCard = ({ gardenData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev === gardenData.venueImages.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? gardenData.venueImages.length - 1 : prev - 1))
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="bg-slate-50">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Marriage Garden</CardTitle>
            <CardDescription className="text-sm mt-1">
              <span className="font-medium">{gardenData.propertyType}</span> • Added on {formatDate(gardenData.createdAt)}
            </CardDescription>
          </div>
          <div>
            <Badge variant={gardenData.status === 'approved' ? 'default' : 'outline'} className="text-xs">
              {gardenData.status === 'approved' ? 'Approved' : 'Pending'}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div className="relative w-full h-48 bg-slate-100 rounded-md overflow-hidden">
          {gardenData.venueImages && gardenData.venueImages.length > 0 ? (
            <>
              <img
                src={gardenData.venueImages[currentImageIndex]}
                alt={`Garden View ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              {gardenData.venueImages.length > 1 && (
                <div className="absolute inset-0 flex justify-between items-center px-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full bg-white/70 p-0" onClick={prevImage}>
                    &lt;
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full bg-white/70 p-0" onClick={nextImage}>
                    &gt;
                  </Button>
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-black/60 rounded-full px-2 py-1">
                <span className="text-xs text-white">
                  {currentImageIndex + 1}/{gardenData.venueImages.length}
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Image className="h-12 w-12 text-slate-300" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-slate-500 mr-2" />
              <div>
                <p className="text-xs font-medium">Location</p>
                <p className="text-xs text-slate-500">
                  {gardenData.landmark}, {gardenData.district}, {gardenData.state}, {gardenData.pincode}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-slate-500 mr-2" />
              <div>
                <p className="text-xs font-medium">Contact</p>
                <p className="text-xs text-slate-500">{gardenData.contact}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium mb-1">Hosting Facilities</h3>
          <div className="flex flex-wrap gap-1">
            {gardenData.hostingFacilities &&
              gardenData.hostingFacilities.map((facility, index) => (
                <div key={index} className="flex items-center bg-slate-100 rounded-full px-2 py-1 text-xs">
                  <Music className="h-3 w-3 mr-1 text-slate-500" />
                  {facility}
                </div>
              ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium mb-1">Documentation</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <Check className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs">Property Docs</span>
            </div>
            <div className="flex items-center">
              <Check className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs">NOC</span>
            </div>
            <div className="flex items-center">
              <Check className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs">Fire Certificate</span>
            </div>
            <div className="flex items-center">
              <Check className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs">FSSAI Certificate</span>
            </div>
            <div className="flex items-center">
              <Check className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs">Marriage NOC</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between bg-slate-50 p-3">
        <Button variant="outline" size="sm">
          View Documents
        </Button>
        <Link href={`/venues/${gardenData.id}`} size="sm" className={buttonVariants({ variant: 'default' })}>
          View Details
        </Link>
      </CardFooter>
    </Card>
  )
}

export default MarriageGardenCard