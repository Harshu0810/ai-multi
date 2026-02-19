// components/admin/PropertyActions.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Check, X } from 'lucide-react'

interface PropertyActionsProps {
  propertyId: string
  propertyType: 'flat' | 'garden' | 'restaurant'
  currentStatus: string
}

export default function PropertyActions({ propertyId, propertyType, currentStatus }: PropertyActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = async (action: 'approve' | 'reject') => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/${propertyType}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: propertyId, action }),
      })

      if (!response.ok) throw new Error(`Failed to ${action}`)

      toast({
        title: action === 'approve' ? 'Approved' : 'Rejected',
        description: `Property has been ${action}d.`,
      })
      router.refresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${action} property.`,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={() => handleAction('approve')}
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700"
      >
        <Check className="mr-2 h-4 w-4" />
        Approve
      </Button>
      <Button
        onClick={() => handleAction('reject')}
        disabled={isLoading}
        variant="destructive"
      >
        <X className="mr-2 h-4 w-4" />
        Reject
      </Button>
    </div>
  )
}