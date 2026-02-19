'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  MapPin,
  Phone,
  FileText,
  Calendar,
  Music,
  Check,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Share2,
  Home,
} from 'lucide-react'
import { MarriageGarden } from '@prisma/client'

const MarriageGardenDetailsPage = ({ gardenData }: { gardenData: MarriageGarden }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev === gardenData.venueImages.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? gardenData.venueImages.length - 1 : prev - 1))
  }

  const openDocument = (url: string) => {
    window.open(url, '_blank')
  }

  const DocumentItem = ({ title, url, icon }: { title: string; url: string; icon: React.ReactNode }) => (
    <div
      className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => openDocument(url)}
    >
      <div className="bg-blue-50 p-2 rounded-full mr-3">{icon}</div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-slate-500">Click to view</p>
      </div>
      <ExternalLink className="h-4 w-4 text-slate-400" />
    </div>
  )

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Marriage Garden</h1>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Badge variant="outline" className="font-normal">
              {gardenData.propertyType}
            </Badge>
            <span>•</span>
            <span>Added on {formatDate(gardenData.createdAt.toISOString())}</span>
            <span>•</span>
            <Badge variant={gardenData.status === 'approved' ? 'default' : 'secondary'} className="capitalize">
              {gardenData.status}
            </Badge>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Book Venue
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video w-full bg-slate-100 rounded-t-lg overflow-hidden">
                {gardenData.venueImages && gardenData.venueImages.length > 0 ? (
                  <img
                    src={gardenData.venueImages[currentImageIndex]}
                    alt={`Marriage Garden View ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Home className="h-16 w-16 text-slate-300" />
                  </div>
                )}

                {gardenData.venueImages && gardenData.venueImages.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                    <div className="absolute bottom-4 right-4 bg-black/70 rounded-full px-3 py-1.5">
                      <span className="text-sm text-white font-medium">
                        {currentImageIndex + 1}/{gardenData.venueImages.length}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {gardenData.venueImages && gardenData.venueImages.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {gardenData.venueImages.map((image, index) => (
                    <div
                      key={index}
                      className={`relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border-2 cursor-pointer
                        ${currentImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img src={image} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <div className="bg-blue-50 p-2 rounded-full mr-3">
                        <MapPin className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Location</h4>
                        <p className="text-sm text-slate-600">
                          {gardenData.landmark}, {gardenData.district}, {gardenData.state}, {gardenData.pincode}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-50 p-2 rounded-full mr-3">
                        <Phone className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Contact</h4>
                        <p className="text-sm text-slate-600">{gardenData.contact}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-50 p-2 rounded-full mr-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Type</h4>
                        <p className="text-sm text-slate-600">{gardenData.propertyType}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-50 p-2 rounded-full mr-3">
                        <Calendar className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Listed Since</h4>
                        <p className="text-sm text-slate-600">{formatDate(gardenData.createdAt.toISOString())}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="amenities" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Hosting Facilities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {gardenData.hostingFacilities &&
                      gardenData.hostingFacilities.map((facility, index) => (
                        <div key={index} className="flex items-center bg-slate-50 rounded-lg p-3">
                          <div className="bg-blue-50 p-2 rounded-full mr-3">
                            <Music className="h-4 w-4 text-blue-500" />
                          </div>
                          <span className="text-sm">{facility}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Additional Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center bg-slate-50 rounded-lg p-3">
                      <div className="bg-green-50 p-2 rounded-full mr-3">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-sm">Parking Available</span>
                    </div>
                    <div className="flex items-center bg-slate-50 rounded-lg p-3">
                      <div className="bg-green-50 p-2 rounded-full mr-3">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-sm">Catering Service</span>
                    </div>
                    <div className="flex items-center bg-slate-50 rounded-lg p-3">
                      <div className="bg-green-50 p-2 rounded-full mr-3">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-sm">Air Conditioned</span>
                    </div>
                    <div className="flex items-center bg-slate-50 rounded-lg p-3">
                      <div className="bg-green-50 p-2 rounded-full mr-3">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-sm">Decoration</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Legal Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DocumentItem
                      title="Property Documents"
                      url={gardenData.propertyDocuments}
                      icon={<FileText className="h-5 w-5 text-blue-500" />}
                    />
                    <DocumentItem
                      title="NOC Certificate"
                      url={gardenData.noc || ''}
                      icon={<FileText className="h-5 w-5 text-blue-500" />}
                    />
                    <DocumentItem
                      title="Fire Safety Certificate"
                      url={gardenData.fireCert || ''}
                      icon={<FileText className="h-5 w-5 text-red-500" />}
                    />
                    <DocumentItem
                      title="FSSAI Certificate"
                      url={gardenData.fssaiCert || ''}
                      icon={<FileText className="h-5 w-5 text-green-500" />}
                    />
                    <DocumentItem
                      title="Marriage NOC"
                      url={gardenData.marriageNoc || ''}
                      icon={<FileText className="h-5 w-5 text-purple-500" />}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Book This Venue</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-blue-800 mb-2">Contact for pricing details</p>
                  <div className="text-xl font-bold text-blue-800">{gardenData.contact}</div>
                </div>
                <div className="space-y-3">
                  <Button className="w-full">Book Now</Button>
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call Venue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Property Documents</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">NOC</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Fire Certificate</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">FSSAI Certificate</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Marriage NOC</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Verified
                  </Badge>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Status</span>
                    <Badge variant={gardenData.status === 'approved' ? 'default' : 'secondary'} className="capitalize">
                      {gardenData.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MarriageGardenDetailsPage