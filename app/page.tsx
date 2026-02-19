// app/page.tsx
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import Hero from '@/components/landing/hero'
import Features from '@/components/landing/features'
import Listings from '@/components/landing/listings'
import FAQ from '@/components/landing/faq'
import SellSection from '@/components/landing/sell'

export default async function LandingPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main>
      <Hero />
      <Features />
      <Listings />
      <SellSection />
      <FAQ />
    </main>
  )
}