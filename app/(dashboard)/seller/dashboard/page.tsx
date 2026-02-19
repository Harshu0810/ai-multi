// app/(dashboard)/seller/dashboard/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle, Home } from 'lucide-react'

export default async function SellerDashboardPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch seller's listings
  const flats = await prisma.flat.findMany({
    where: { hostId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  const totalListings = flats.length

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <Link href="/seller/list-property">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            List New Property
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalListings}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{flats.filter(f => f.status === 'PENDING').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{flats.filter(f => f.status === 'APPROVED').length}</p>
          </CardContent>
        </Card>
      </div>

      {totalListings === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Home className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-4 text-lg font-medium">No listings yet</p>
            <p className="text-muted-foreground">Get started by listing your first property.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Listings</h2>
          {/* Map flats here – simplified for now */}
          {flats.map(flat => (
            <Card key={flat.id}>
              <CardContent className="py-4">
                <p className="font-medium">{flat.title}</p>
                <p className="text-sm text-muted-foreground">Status: {flat.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}