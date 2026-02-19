'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface AmenitiesStepProps {
  value: string[]
  onChange: (value: string[]) => void
  onNext: () => void
  onBack: () => void
}

export function AmenitiesStep({ value, onChange, onNext, onBack }: AmenitiesStepProps) {
  const amenities = [
    { id: 'wifi', label: 'WiFi' },
    { id: 'tv', label: 'TV' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'washing-machine', label: 'Washing Machine' },
    { id: 'free-parking', label: 'Free Parking on Premises' },
    { id: 'paid-parking', label: 'Paid Parking on Premises' },
    { id: 'air-conditioning', label: 'Air Conditioning' },
    { id: 'workspace', label: 'Dedicated Workspace' },
    { id: 'pool', label: 'Pool' },
    { id: 'hot-tub', label: 'Hot Tub' },
    { id: 'patio', label: 'Patio' },
  ]

  const handleToggle = (amenityId: string) => {
    if (value.includes(amenityId)) {
      onChange(value.filter((id) => id !== amenityId))
    } else {
      onChange([...value, amenityId])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tell guests what your place has to offer</h1>
        <p className="text-muted-foreground">Select the amenities available at your property.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity.id}
                  checked={value.includes(amenity.id)}
                  onCheckedChange={() => handleToggle(amenity.id)}
                />
                <Label htmlFor={amenity.id} className="cursor-pointer">
                  {amenity.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}