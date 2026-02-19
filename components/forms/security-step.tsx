// components/forms/security-step.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils/cn'

interface SecurityStepProps {
  value: string[] // selected security features
  onChange: (value: string[]) => void
  onNext?: () => void
  onBack?: () => void
  isLast?: boolean
}

const securityFeatures = [
  { id: 'smoke-alarm', label: 'Smoke alarm' },
  { id: 'carbon-monoxide-alarm', label: 'Carbon monoxide alarm' },
  { id: 'fire-extinguisher', label: 'Fire extinguisher' },
  { id: 'first-aid-kit', label: 'First aid kit' },
  { id: 'security-cameras', label: 'Security cameras on property' },
  { id: 'safe', label: 'Safe' },
  { id: 'lock-on-bedroom-door', label: 'Lock on bedroom door' },
  { id: 'well-lit-path', label: 'Well-lit path to entrance' },
]

export default function SecurityStep({
  value = [],
  onChange,
  onNext,
  onBack,
  isLast = false,
}: SecurityStepProps) {
  const [error, setError] = useState<string | null>(null)

  const toggleFeature = (featureId: string) => {
    if (value.includes(featureId)) {
      onChange(value.filter(id => id !== featureId))
    } else {
      onChange([...value, featureId])
    }
  }

  const handleNext = () => {
    // Optional: require at least one security feature
    if (value.length === 0) {
      setError('Please select at least one security feature')
      return
    }
    setError(null)
    onNext?.()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Safety & security</h2>
        <p className="text-muted-foreground">
          Select the safety features available at your place.
        </p>
      </div>

      <div className="grid gap-4">
        {securityFeatures.map((feature) => (
          <div key={feature.id} className="flex items-center space-x-2">
            <Checkbox
              id={feature.id}
              checked={value.includes(feature.id)}
              onCheckedChange={() => toggleFeature(feature.id)}
            />
            <Label htmlFor={feature.id}>{feature.label}</Label>
          </div>
        ))}
      </div>

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