'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Minus, Plus } from 'lucide-react'

interface BasicsStepProps {
  value: {
    guests: number
    bedrooms: number
    beds: number
    bathrooms: number
  }
  onChange: (value: any) => void
  onNext: () => void
  onBack: () => void
}

export function BasicsStep({ value, onChange, onNext, onBack }: BasicsStepProps) {
  const handleIncrement = (field: string) => {
    onChange({
      ...value,
      [field]: value[field] + 1,
    })
  }

  const handleDecrement = (field: string) => {
    if (value[field] > 1) {
      onChange({
        ...value,
        [field]: value[field] - 1,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Share some basics about your place</h1>
        <p className="text-muted-foreground">Tell guests about the capacity of your property.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label>Guests</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrement('guests')}
                  disabled={value.guests <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{value.guests}</span>
                <Button type="button" variant="outline" size="icon" onClick={() => handleIncrement('guests')}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label>Bedrooms</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrement('bedrooms')}
                  disabled={value.bedrooms <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{value.bedrooms}</span>
                <Button type="button" variant="outline" size="icon" onClick={() => handleIncrement('bedrooms')}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label>Beds</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrement('beds')}
                  disabled={value.beds <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{value.beds}</span>
                <Button type="button" variant="outline" size="icon" onClick={() => handleIncrement('beds')}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label>Bathrooms</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrement('bathrooms')}
                  disabled={value.bathrooms <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{value.bathrooms}</span>
                <Button type="button" variant="outline" size="icon" onClick={() => handleIncrement('bathrooms')}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
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