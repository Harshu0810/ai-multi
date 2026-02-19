// app/(dashboard)/seller/list-success/page.tsx
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export default async function ListSuccessPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Listing Submitted!</CardTitle>
          <CardDescription>
            Your property has been submitted for review. We'll notify you once it's approved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            In the meantime, you can manage your listings or add another property.
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/seller/dashboard">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
            <Link href="/seller/list-property">
              <Button variant="outline" className="w-full">List Another Property</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}