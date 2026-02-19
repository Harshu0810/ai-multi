// app/(dashboard)/seller/list-property/page.tsx
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Building, Trees, Utensils } from 'lucide-react'

const propertyTypes = [
  {
    title: 'Flat / Apartment',
    description: 'List your flat or apartment for rent',
    icon: Building,
    href: '/seller/list-property/flat-form',
    color: 'text-blue-500',
  },
  {
    title: 'Marriage Garden',
    description: 'List your marriage garden for events',
    icon: Trees,
    href: '/seller/list-property/marriage-garden-form',
    color: 'text-green-500',
  },
  {
    title: 'Restaurant',
    description: 'List your restaurant for dining experiences',
    icon: Utensils,
    href: '/seller/list-property/restaurant-form',
    color: 'text-orange-500',
  },
]

export default async function ListPropertyPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user has seller role (optional, but recommended)
  const role = user.user_metadata?.role
  if (role !== 'seller' && role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">List a new property</h1>
        <p className="text-muted-foreground">
          Choose the type of property you want to list
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {propertyTypes.map((type) => {
          const Icon = type.icon
          return (
            <Link key={type.href} href={type.href}>
              <Card className="transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className={`mb-2 ${type.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle>{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Click to start listing
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}