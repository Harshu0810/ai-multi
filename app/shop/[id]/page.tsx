// app/shop/[id]/page.tsx
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
import { ShoppingCart, ArrowLeft } from 'lucide-react'

// This would normally come from a database
// For now, we'll use a static product list
const products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format',
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation.',
    longDescription:
      'Experience crystal-clear sound with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for travel, work, or relaxation.',
    inStock: true,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format',
    category: 'Electronics',
    description: 'Track your fitness and stay connected.',
    longDescription:
      'Stay connected and healthy with our latest smart watch. Track your heart rate, steps, and sleep patterns. Receive notifications, control music, and more. Water-resistant and long battery life.',
    inStock: true,
    rating: 4.2,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Leather Backpack',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format',
    category: 'Fashion',
    description: 'Stylish and durable leather backpack.',
    longDescription:
      'Handcrafted from genuine leather, this backpack combines style and durability. Features multiple compartments, padded laptop sleeve, and adjustable shoulder straps. Perfect for daily commute or travel.',
    inStock: true,
    rating: 4.7,
    reviews: 56,
  },
  {
    id: '4',
    name: 'Coffee Maker',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format',
    category: 'Home',
    description: 'Brew the perfect cup of coffee every morning.',
    longDescription:
      'Start your day with the perfect cup of coffee. This programmable coffee maker features a 12-cup capacity, auto-shutoff, and a permanent filter. Sleek design fits any kitchen.',
    inStock: false,
    rating: 4.0,
    reviews: 34,
  },
]

interface PageProps {
  params: {
    id: string
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = products.find(p => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container py-8">
      <div className="mb-4">
        <Link href="/shop">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.category}</Badge>
              {!product.inStock && (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold mt-2">${product.price}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{product.longDescription}</p>
          </div>

          <div className="pt-4">
            <Button
              size="lg"
              className="w-full md:w-auto"
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}