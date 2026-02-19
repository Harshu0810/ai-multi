// components/forms/pricing-step.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils/cn'

interface PricingStepProps {
  value: {
    basePrice: number | ''
    currency?: string
  }
  onChange: (value: { basePrice: number | ''; currency?: string }) => void
  onNext?: () => void
  onBack?: () => void
  isLast?: boolean
}

export default function PricingStep({
  value,
  onChange,
  onNext,
  onBack,
  isLast = false,
}: PricingStepProps) {
  const [error, setError] = useState<string | null>(null)

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // Allow empty string or valid positive number
    if (val === '') {
      onChange({ ...value, basePrice: '' })
    } else {
      const num = Number(val)
      if (!isNaN(num) && num >= 0) {
        onChange({ ...value, basePrice: num })
      }
    }
  }

  const handleNext = () => {
    if (value.basePrice === '' || value.basePrice <= 0) {
      setError('Please enter a valid price greater than 0')
      return
    }
    setError(null)
    onNext?.()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Set your price</h2>
        <p className="text-muted-foreground">
          How much do you want to charge per night?
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Base price per night</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            $
          </span>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={value.basePrice}
            onChange={handlePriceChange}
            className={cn('pl-8', error && 'border-destructive')}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <p className="text-sm text-muted-foreground">
          You can always adjust this later.
        </p>
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