// components/forms/verification-step.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Shield, Upload } from 'lucide-react'

interface VerificationStepProps {
  onNext?: () => void
  onBack?: () => void
  isLast?: boolean
}

export default function VerificationStep({
  onNext,
  onBack,
  isLast = false,
}: VerificationStepProps) {
  const [isVerified, setIsVerified] = useState(false)

  // In a real app, you might integrate with a verification service
  // Here we just simulate that the user has verified their identity
  const handleVerify = () => {
    // Simulate verification process
    setIsVerified(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Verify your identity</h2>
        <p className="text-muted-foreground">
          To help build trust in our community, we need to verify your identity.
        </p>
      </div>

      {!isVerified ? (
        <div className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              We'll need to confirm your identity. This usually takes a few minutes.
            </AlertDescription>
          </Alert>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium">How would you like to verify?</h3>
            <div className="mt-3 space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={handleVerify}>
                <Upload className="mr-2 h-4 w-4" />
                Upload government ID
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleVerify}>
                <Shield className="mr-2 h-4 w-4" />
                Verify with phone number
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Alert className="border-green-500 bg-green-50">
            <Shield className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Your identity has been verified successfully!
            </AlertDescription>
          </Alert>
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Verified
          </Badge>
        </div>
      )}

      <div className="flex gap-3">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
        )}
        <Button
          type="button"
          onClick={onNext}
          className="flex-1"
          disabled={!isVerified}
        >
          {isLast ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  )
}