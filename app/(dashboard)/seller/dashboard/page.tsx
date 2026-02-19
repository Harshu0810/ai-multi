// app/(dashboard)/seller/dashboard/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlusCircle, Home, Calendar, DollarSign } from 'lucide-react'

export default async function SellerDashboardPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch seller's listings from different property types
  const [flats, gardens, restaurants] = await Promise.all([
    prisma.flat.findMany({
      where: { hostId: user.id },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.marriageGarden.findMany({
      where: { hostId: user.id },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.restaurant.findMany({
      where: { hostId: user.id },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  const totalListings = flats.length + gardens.length + restaurants.length
  const pendingApprovals = flats.filter(f => f.status === 'PENDING').length +
                          gardens.filter(g => g.status === 'PENDING').length +
                          restaurants.filter(r => r.status === 'PENDING').length

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your properties and listings
          </p>
        </div>
        <Link href="/seller/list-property">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Property
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalListings}</div>
            <p className="text-xs text-muted-foreground">
              {pendingApprovals} pending approval
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalListings - pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">
              Currently published
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0</div>
            <p className="text-xs text-muted-foreground">
              From all bookings
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="flats">Flats</TabsTrigger>
          <TabsTrigger value="gardens">Marriage Gardens</TabsTrigger>
          <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {totalListings === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Home className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-lg font-medium">No listings yet</p>
                <p className="text-sm text-muted-foreground">
                  Get started by adding your first property.
                </p>
                <Link href="/seller/list-property" className="mt-4">
                  <Button>Add Property</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {flats.map((flat) => (
                <Card key={flat.id}>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{flat.title}</CardTitle>
                    <CardDescription>
                      {flat.city}, {flat.country}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant={flat.status === 'APPROVED' ? 'default' : 'secondary'}>
                        {flat.status}
                      </Badge>
                      <span className="font-semibold">${flat.price}/night</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {/* Similar cards for gardens and restaurants */}
            </div>
          )}
        </TabsContent>

        <TabsContent value="flats">
          {/* Similar content filtered */}
        </TabsContent>
        <TabsContent value="gardens">
          {/* Similar content filtered */}
        </TabsContent>
        <TabsContent value="restaurants">
          {/* Similar content filtered */}
        </TabsContent>
      </Tabs>
    </div>
  )
}