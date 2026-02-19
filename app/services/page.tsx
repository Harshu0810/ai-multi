// app/services/page.tsx
import { prisma } from '@/lib/prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Services can be of different types: house help, cloud kitchen, etc.
// We'll assume there are models for these. If not, we'll use static data.
// For demonstration, we'll create a static list similar to shop.

const services = [
  {
    id: '1',
    title: 'Professional House Cleaning',
    description: 'Experienced cleaners for your home. Weekly or monthly plans available.',
    price: 80,
    priceUnit: 'per session',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format',
    category: 'House Help',
    rating: 4.8,
    provider: 'CleanPro Services',
  },
  {
    id: '2',
    title: 'Cloud Kitchen - Home Chef',
    description: 'Authentic homemade meals delivered to your doorstep. Choose from daily menus.',
    price: 12,
    priceUnit: 'per meal',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format',
    category: 'Cloud Kitchen',
    rating: 4.5,
    provider: 'TastyBites',
  },
  {
    id: '3',
    title: 'Plumbing Services',
    description: 'Licensed plumbers for repairs and installations. 24/7 emergency service.',
    price: 60,
    priceUnit: 'per hour',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format',
    category: 'House Help',
    rating: 4.3,
    provider: 'FixItNow',
  },
  {
    id: '4',
    title: 'Personal Chef for Events',
    description: 'Hire a professional chef for parties and gatherings. Custom menus available.',
    price: 200,
    priceUnit: 'per event',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&auto=format',
    category: 'Cloud Kitchen',
    rating: 4.9,
    provider: 'Gourmet Events',
  },
]

export default async function ServicesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const category = typeof searchParams?.category === 'string' ? searchParams.category : undefined
  const search = typeof searchParams?.search === 'string' ? searchParams.search : undefined

  let filteredServices = services
  if (category && category !== 'all') {
    filteredServices = filteredServices.filter(s => s.category.toLowerCase() === category.toLowerCase())
  }
  if (search) {
    filteredServices = filteredServices.filter(s => 
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Services</h1>
        <p className="text-muted-foreground">
          Find trusted professionals for your needs
        </p>
      </div>

      {/* Search and filter */}
      <div className="mb-8 flex flex-wrap gap-4">
        <form className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search services..."
            name="search"
            defaultValue={search}
          />
          <Button type="submit">Search</Button>
        </form>
        <Select name="category" defaultValue={category || 'all'}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="House Help">House Help</SelectItem>
            <SelectItem value="Cloud Kitchen">Cloud Kitchen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredServices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No services found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <Link key={service.id} href={`/services/${service.id}`}>
              <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative h-48 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{service.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{service.category} • {service.provider}</p>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold">${service.price} {service.priceUnit}</span>
                    <span className="text-sm text-muted-foreground">★ {service.rating}</span>
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