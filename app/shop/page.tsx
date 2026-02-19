// app/shop/page.tsx
import { prisma } from '@/lib/prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Assuming you have a Product model in your Prisma schema
// If not, we'll create a placeholder using flats or gardens with a different purpose.
// For now, we'll create a mockup with some sample data or use any existing model.
// Since this is a multiservice platform, "shop" might sell items. Let's create a simple product listing.

// To make this functional, I'll assume there is a Product model. If not, we can adapt.
// But per the project description, it's new, so we'll create minimal placeholder.

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const category = typeof searchParams?.category === 'string' ? searchParams.category : undefined
  const search = typeof searchParams?.search === 'string' ? searchParams.search : undefined

  // Fetch products – placeholder: using a hypothetical Product model.
  // If not present, we'll just show a message. To keep it functional, we'll use a dummy array.
  // In a real app, you'd have prisma.product.findMany(...)
  // For now, let's return a static list to illustrate.

  const products = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format',
      category: 'Electronics',
      description: 'High-quality wireless headphones with noise cancellation.',
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format',
      category: 'Electronics',
      description: 'Track your fitness and stay connected.',
    },
    {
      id: '3',
      name: 'Leather Backpack',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format',
      category: 'Fashion',
      description: 'Stylish and durable leather backpack.',
    },
    {
      id: '4',
      name: 'Coffee Maker',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format',
      category: 'Home',
      description: 'Brew the perfect cup of coffee every morning.',
    },
  ]

  // Filter based on search params (simulated)
  let filteredProducts = products
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase())
  }
  if (search) {
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shop</h1>
        <p className="text-muted-foreground">Discover amazing products</p>
      </div>

      {/* Search and filter */}
      <div className="mb-8 flex flex-wrap gap-4">
        <form className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search products..."
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
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Fashion">Fashion</SelectItem>
            <SelectItem value="Home">Home</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No products found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/shop/${product.id}`}>
              <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  <p className="mt-2 font-semibold">${product.price}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Product
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