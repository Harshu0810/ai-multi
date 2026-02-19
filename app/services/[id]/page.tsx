// app/services/[id]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Star, ArrowLeft } from 'lucide-react'

// Static service data (same as in services page)
const services = [
  {
    id: '1',
    title: 'Professional House Cleaning',
    description: 'Experienced cleaners for your home. Weekly or monthly plans available.',
    longDescription:
      'Our professional cleaning service ensures your home sparkles. We provide eco-friendly products and trained staff. Choose from one-time deep cleaning or regular maintenance plans.',
    price: 80,
    priceUnit: 'per session',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format',
    category: 'House Help',
    rating: 4.8,
    reviews: 124,
    provider: 'CleanPro Services',
    providerBio: 'With over 10 years of experience, CleanPro Services has been trusted by thousands of homes.',
    availability: 'Mon-Fri, 9am-5pm',
    location: 'Citywide',
  },
  {
    id: '2',
    title: 'Cloud Kitchen - Home Chef',
    description: 'Authentic homemade meals delivered to your doorstep. Choose from daily menus.',
    longDescription:
      'Enjoy delicious, home-cooked meals without the effort. Our cloud kitchen offers a rotating menu of cuisines. Fresh ingredients, hygienic preparation, and timely delivery.',
    price: 12,
    priceUnit: 'per meal',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format',
    category: 'Cloud Kitchen',
    rating: 4.5,
    reviews: 89,
    provider: 'TastyBites',
    providerBio: 'Passionate chefs bringing you the taste of homemade food.',
    availability: 'Daily, 11am-9pm',
    location: 'Delivery within 5 miles',
  },
  {
    id: '3',
    title: 'Plumbing Services',
    description: 'Licensed plumbers for repairs and installations. 24/7 emergency service.',
    longDescription:
      'Fast and reliable plumbing solutions. Our licensed plumbers handle leaks, clogs, installations, and emergencies. Transparent pricing and guaranteed work.',
    price: 60,
    priceUnit: 'per hour',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format',
    category: 'House Help',
    rating: 4.3,
    reviews: 56,
    provider: 'FixItNow',
    providerBio: 'Emergency plumbing services available 24/7.',
    availability: '24/7',
    location: 'Citywide',
  },
  {
    id: '4',
    title: 'Personal Chef for Events',
    description: 'Hire a professional chef for parties and gatherings. Custom menus available.',
    longDescription:
      'Impress your guests with a personal chef. We create custom menus based on your preferences, handle shopping, cooking, and cleanup. Perfect for birthdays, anniversaries, and dinner parties.',
    price: 200,
    priceUnit: 'per event',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&auto=format',
    category: 'Cloud Kitchen',
    rating: 4.9,
    reviews: 34,
    provider: 'Gourmet Events',
    providerBio: 'Award-winning chef with experience in fine dining and private events.',
    availability: 'Weekends, evenings',
    location: 'Within city limits',
  },
]

interface PageProps {
  params: {
    id: string
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const service = services.find(s => s.id === params.id)

  if (!service) {
    notFound()
  }

  return (
    <div className="container py-8">
      <div className="mb-4">
        <Link href="/services">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-80 rounded-lg overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{service.category}</Badge>
              </div>
              <CardTitle className="text-2xl">{service.title}</CardTitle>
              <CardDescription>
                Provided by {service.provider}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{service.longDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <p className="font-medium">{service.rating} ({service.reviews} reviews)</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Provider</p>
                    <p className="font-medium">{service.provider}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Availability</p>
                    <p className="font-medium">{service.availability}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">About the provider</h3>
                <p className="text-muted-foreground">{service.providerBio}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Booking/Pricing */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>${service.price}</CardTitle>
              <CardDescription>{service.priceUnit}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" size="lg">
                Book Now
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                No cancellation fees within 24 hours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span>{service.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span>{service.category}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}