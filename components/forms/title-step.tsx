// components/forms/title-step.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils/cn'

interface TitleStepProps {
  value: string
  onChange: (value: string) => void
  onNext?: () => void
  onBack?: () => void
  isLast?: boolean
}

export default function TitleStep({
  value,
  onChange,
  onNext,
  onBack,
  isLast = false,
}: TitleStepProps) {
  const [error, setError] = useState<string | null>(null)
  const maxLength = 100

  const handleNext = () => {
    if (!value.trim()) {
      setError('Title is required')
      return
    }
    if (value.length < 5) {
      setError('Title must be at least 5 characters')
      return
    }
    setError(null)
    onNext?.()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Now, give your place a title</h2>
        <p className="text-muted-foreground">
          Short titles work best. Have fun with it – you can always change it later.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Cozy downtown loft with skyline view"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(error && 'border-destructive')}
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