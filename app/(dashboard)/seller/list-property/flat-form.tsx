'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { X, Upload } from 'lucide-react'

export default function FlatForm() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [flatData, setFlatData] = useState({
    bhk: '',
    price: '',
    state: '',
    city: '',
    landmark: '',
    pincode: '',
    title: '',
    securityAmount: '',
    amenities: [] as string[],
    pictures: [] as File[],
    nocDoc: null as File | null,
    termsOfConditionsDoc: null as File | null,
    video: null as File | null,
  })
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const amenitiesList = ['AC', 'Cooler', 'Refrigerator', 'Washing Machine', 'TV', 'WiFi', 'Geyser', 'Parking', 'Security']

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof flatData
  ) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (key === 'pictures') {
      const fileArray = Array.from(files)
      const newPreviews = fileArray.map(file => URL.createObjectURL(file))
      setImagePreviews(prev => [...prev, ...newPreviews])
      setFlatData(prev => ({ ...prev, pictures: [...prev.pictures, ...fileArray] }))
    } else {
      setFlatData(prev => ({ ...prev, [key]: files[0] }))
    }
  }

  const removeImage = (index: number) => {
    setFlatData(prev => ({
      ...prev,
      pictures: prev.pictures.filter((_, i) => i !== index),
    }))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleAmenityToggle = (amenity: string) => {
    setFlatData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Upload files to Cloudinary via API
      const uploadFile = async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()
        return data.url
      }

      const pictureUrls = await Promise.all(flatData.pictures.map(uploadFile))
      const nocUrl = flatData.nocDoc ? await uploadFile(flatData.nocDoc) : null
      const termsUrl = flatData.termsOfConditionsDoc ? await uploadFile(flatData.termsOfConditionsDoc) : null
      const videoUrl = flatData.video ? await uploadFile(flatData.video) : null

      // Save to database
      const response = await fetch('/api/properties/flat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...flatData,
          pictures: pictureUrls,
          nocDoc: nocUrl,
          termsOfConditionsDoc: termsUrl,
          video: videoUrl,
          userId: user.id,
        }),
      })

      if (!response.ok) throw new Error('Failed to create listing')

      toast.success('Flat listed successfully!')
      router.push('/seller/dashboard')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // Render form UI (same as before, but with Supabase user)
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ... your existing JSX ... */}
    </form>
  )
}