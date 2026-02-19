// app/(dashboard)/dashboard/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const role = user.user_metadata?.role || 'buyer'

  // Redirect based on role
  switch (role) {
    case 'admin':
      redirect('/admin/dashboard')
    case 'seller':
      redirect('/seller/dashboard')
    case 'buyer':
    default:
      redirect('/buyer/dashboard')
  }
}