// app/(dashboard)/buyer/dashboard/page.tsx
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
import { Heart, Calendar, Clock } from 'lucide-react'

export default async function BuyerDashboardPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user's bookings (if any) and saved properties
  // Assuming you have a bookings table and a saved_properties junction table
  // For now, we'll show placeholder data

  // Example: Fetch bookings (you'll need to adjust based on your schema)
  // const bookings = await prisma.booking.findMany({
  //   where: { userId: user.id },
  //   include: { property: true },
  //   orderBy: { createdAt: 'desc' }
  // })

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your activity.
        </p>
      </div>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="saved">Saved Properties</TabsTrigger>
          <TabsTrigger value="reviews">My Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          {true ? ( // Replace with bookings.length === 0
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-lg font-medium">No bookings yet</p>
                <p className="text-sm text-muted-foreground">
                  Start exploring properties and make your first booking.
                </p>
                <Link href="/properties" className="mt-4">
                  <Button>Browse Properties</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {/* Map bookings here */}
              <p>Bookings will appear here</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Heart className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">No saved properties</p>
              <p className="text-sm text-muted-foreground">
                Save properties you're interested in to view them later.
              </p>
              <Link href="/properties" className="mt-4">
                <Button>Explore Properties</Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Clock className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">No reviews yet</p>
              <p className="text-sm text-muted-foreground">
                After your bookings, you can leave reviews for properties.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}