// app/(dashboard)/seller/list-property/marriage-garden-form.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

// Import step components
import LocationStep from '@/components/forms/location-step'
import PhotosStep from '@/components/forms/photos-step'
import BasicsStep from '@/components/forms/basics-step'
import AmenitiesStep from '@/components/forms/amenities-step'
import DescriptionStep from '@/components/forms/description-step'
import PricingStep from '@/components/forms/pricing-step'
import TitleStep from '@/components/forms/title-step'
import SecurityStep from '@/components/forms/security-step'
import VerificationStep from '@/components/forms/verification-step'

type FormData = {
  // Location
  street?: string
  city?: string
  state?: string
  country?: string
  zipCode?: string
  // Photos
  photos: string[]
  // Basics (for garden: area, capacity, etc.)
  area?: number
  capacity?: number
  // Amenities
  amenities: string[]
  // Description
  description?: string
  // Pricing
  basePrice?: number
  // Title
  title?: string
  // Security
  securityFeatures: string[]
  // Verification will be handled separately
}

const steps = [
  { id: 'location', label: 'Location', component: LocationStep },
  { id: 'photos', label: 'Photos', component: PhotosStep },
  { id: 'basics', label: 'Basics', component: BasicsStep },
  { id: 'amenities', label: 'Amenities', component: AmenitiesStep },
  { id: 'title', label: 'Title', component: TitleStep },
  { id: 'description', label: 'Description', component: DescriptionStep },
  { id: 'pricing', label: 'Pricing', component: PricingStep },
  { id: 'security', label: 'Security', component: SecurityStep },
  { id: 'verification', label: 'Verification', component: VerificationStep },
]

export default function MarriageGardenForm() {
  const router = useRouter()
  const supabase = createClient()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    photos: [],
    amenities: [],
    securityFeatures: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateForm = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Prepare data for API
      const payload = {
        ...formData,
        hostId: user.id,
        // Map fields to match Prisma schema
        price: formData.basePrice,
        // Add any garden-specific fields
      }

      const response = await fetch('/api/properties/garden', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create listing')
      }

      toast({
        title: 'Success',
        description: 'Your marriage garden has been listed successfully!',
      })
      router.push('/seller/dashboard')
      router.refresh()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  // For steps that require specific props, we pass them
  const stepProps = {
    value: formData[steps[currentStep].id as keyof FormData] || '',
    onChange: (val: any) => updateForm({ [steps[currentStep].id]: val }),
    onNext: currentStep === steps.length - 1 ? handleSubmit : handleNext,
    onBack: currentStep > 0 ? handleBack : undefined,
    isLast: currentStep === steps.length - 1,
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${
                index <= currentStep ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                  index <= currentStep
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground'
                }`}
              >
                {index + 1}
              </div>
              <span className="ml-2 text-sm hidden md:inline">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step component */}
      <div className="rounded-lg border p-6">
        <CurrentStepComponent {...stepProps} />
      </div>

      {isSubmitting && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Submitting...
        </div>
      )}
    </div>
  )
}