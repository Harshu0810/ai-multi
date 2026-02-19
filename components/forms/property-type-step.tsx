// components/forms/property-type-step.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils/cn'

type PropertyType = 'FLAT' | 'MARRIAGE_GARDEN' | 'RESTAURANT' | 'VENUE' | 'OTHER'

interface PropertyTypeStepProps {
  value: PropertyType
  onChange: (value: PropertyType) => void
  onNext?: () => void
  onBack?: () => void
  isLast?: boolean
}

const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: 'FLAT', label: 'Flat / Apartment' },
  { value: 'MARRIAGE_GARDEN', label: 'Marriage Garden' },
  { value: 'RESTAURANT', label: 'Restaurant' },
  { value: 'VENUE', label: 'Venue / Hall' },
  { value: 'OTHER', label: 'Other' },
]

export default function PropertyTypeStep({
  value,
  onChange,
  onNext,
  onBack,
  isLast = false,
}: PropertyTypeStepProps) {
  const [error, setError] = useState<string | null>(null)

  const handleNext = () => {
    if (!value) {
      setError('Please select a property type')
      return
    }
    setError(null)
    onNext?.()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Which of these best describes your place?</h2>
        <p className="text-muted-foreground">
          Pick the most suitable category.
        </p>
      </div>

      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as PropertyType)}
        className="grid gap-3"
      >
        {propertyTypes.map((type) => (
          <div key={type.value} className="flex items-center space-x-2">
            <RadioGroupItem value={type.value} id={type.value} />
            <Label htmlFor={type.value}>{type.label}</Label>
          </div>
        ))}
      </RadioGroup>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
        )}
        <Button type="button" onClick={handleNext} className="flex-1">
          {isLast ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  )
}