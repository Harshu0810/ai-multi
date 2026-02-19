// components/forms/place-type-step.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils/cn'

type PlaceType = 'ENTIRE_PLACE' | 'PRIVATE_ROOM' | 'SHARED_ROOM'

interface PlaceTypeStepProps {
  value: PlaceType
  onChange: (value: PlaceType) => void
  onNext?: () => void
  onBack?: () => void
  isLast?: boolean
}

const placeTypes: { value: PlaceType; label: string; description: string }[] = [
  {
    value: 'ENTIRE_PLACE',
    label: 'An entire place',
    description: 'Guests have the whole place to themselves.',
  },
  {
    value: 'PRIVATE_ROOM',
    label: 'A private room',
    description: 'Guests have their own private room, but share common areas.',
  },
  {
    value: 'SHARED_ROOM',
    label: 'A shared room',
    description: 'Guests sleep in a shared space (e.g., dorm).',
  },
]

export default function PlaceTypeStep({
  value,
  onChange,
  onNext,
  onBack,
  isLast = false,
}: PlaceTypeStepProps) {
  const [error, setError] = useState<string | null>(null)

  const handleNext = () => {
    if (!value) {
      setError('Please select a place type')
      return
    }
    setError(null)
    onNext?.()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">What kind of place will guests have?</h2>
        <p className="text-muted-foreground">
          Select the type of space you're offering.
        </p>
      </div>

      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as PlaceType)}
        className="grid gap-4"
      >
        {placeTypes.map((type) => (
          <div key={type.value} className="flex items-start space-x-3">
            <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
            <div className="grid gap-1.5">
              <Label htmlFor={type.value} className="font-medium">
                {type.label}
              </Label>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </div>
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