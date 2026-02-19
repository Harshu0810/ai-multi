// components/forms/description-step.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils/cn'

interface DescriptionStepProps {
  value: string
  onChange: (value: string) => void
  onNext?: () => void
  onBack?: () => void
  isLast?: boolean
}

export default function DescriptionStep({
  value,
  onChange,
  onNext,
  onBack,
  isLast = false,
}: DescriptionStepProps) {
  const [error, setError] = useState<string | null>(null)
  const maxLength = 500

  const handleNext = () => {
    if (!value.trim()) {
      setError('Description is required')
      return
    }
    if (value.length < 20) {
      setError('Description must be at least 20 characters')
      return
    }
    setError(null)
    onNext?.()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Describe your place</h2>
        <p className="text-muted-foreground">
          Write a compelling description that highlights the best features.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Guests will love staying at my place because..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(error && 'border-destructive')}
          rows={6}
          maxLength={maxLength}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{error && <span className="text-destructive">{error}</span>}</span>
          <span>
            {value.length}/{maxLength}
          </span>
        </div>
      </div>

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