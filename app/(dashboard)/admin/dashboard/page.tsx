// app/(dashboard)/admin/dashboard/page.tsx
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
import { Building, Trees, Utensils, Users, CheckCircle, XCircle } from 'lucide-react'

export default async function AdminDashboardPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user is admin
  const role = user.user_metadata?.role
  if (role !== 'admin') {
    redirect('/dashboard')
  }

  // Fetch counts for dashboard stats
  const [
    totalFlats,
    totalGardens,
    totalRestaurants,
    pendingFlats,
    pendingGardens,
    pendingRestaurants,
    totalUsers,
  ] = await Promise.all([
    prisma.flat.count(),
    prisma.marriageGarden.count(),
    prisma.restaurant.count(),
    prisma.flat.count({ where: { status: 'PENDING' } }),
    prisma.marriageGarden.count({ where: { status: 'PENDING' } }),
    prisma.restaurant.count({ where: { status: 'PENDING' } }),
    prisma.user.count(), // assuming you have a User model or use auth.users via Supabase
  ])

  const totalPending = pendingFlats + pendingGardens + pendingRestaurants

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and approve property listings
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFlats + totalGardens + totalRestaurants}</div>
            <p className="text-xs text-muted-foreground">Across all types</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <CheckCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPending}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(totalFlats + totalGardens + totalRestaurants) - totalPending}
            </div>
            <p className="text-xs text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="flats">Flats</TabsTrigger>
          <TabsTrigger value="gardens">Marriage Gardens</TabsTrigger>
          <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {totalPending === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <p className="mt-4 text-lg font-medium">All caught up!</p>
                <p className="text-sm text-muted-foreground">
                  No properties pending approval.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Here you would list pending flats, gardens, restaurants with approve/reject buttons */}
              <p className="text-muted-foreground">Pending items will be listed here.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="flats">
          <Card>
            <CardHeader>
              <CardTitle>Flats Management</CardTitle>
              <CardDescription>View and manage all flat listings</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/properties/flat">
                <Button variant="outline">Manage Flats</Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gardens">
          <Card>
            <CardHeader>
              <CardTitle>Marriage Gardens Management</CardTitle>
              <CardDescription>View and manage all marriage garden listings</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/properties/garden">
                <Button variant="outline">Manage Gardens</Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restaurants">
          <Card>
            <CardHeader>
              <CardTitle>Restaurants Management</CardTitle>
              <CardDescription>View and manage all restaurant listings</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/properties/restaurant">
                <Button variant="outline">Manage Restaurants</Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}