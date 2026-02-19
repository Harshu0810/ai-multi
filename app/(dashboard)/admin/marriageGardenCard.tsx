// app/(dashboard)/admin/marriageGardenCard.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, X, Eye } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface MarriageGardenCardProps {
  garden: {
    id: string
    title: string
    description: string
    price: number
    city: string
    country: string
    photos: string[]
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
    host?: {
      name?: string
      email?: string
    }
  }
  onStatusChange?: () => void
}

export default function MarriageGardenCard({ garden, onStatusChange }: MarriageGardenCardProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleApprove = async () => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/admin/garden/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: garden.id, action: 'approve' }),
      })

      if (!response.ok) throw new Error('Failed to approve')

      toast({
        title: 'Approved',
        description: 'Marriage garden listing has been approved.',
      })
      onStatusChange?.()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve listing.',
        variant: 'destructive',
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleReject = async () => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/admin/garden/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: garden.id, action: 'reject' }),
      })

      if (!response.ok) throw new Error('Failed to reject')

      toast({
        title: 'Rejected',
        description: 'Marriage garden listing has been rejected.',
      })
      onStatusChange?.()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject listing.',
        variant: 'destructive',
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const statusColor = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        {garden.photos && garden.photos[0] ? (
          <Image
            src={garden.photos[0]}
            alt={garden.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="line-clamp-1">{garden.title}</CardTitle>
            <CardDescription>
              {garden.city}, {garden.country}
            </CardDescription>
          </div>
          <Badge className={statusColor[garden.status]}>{garden.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {garden.description}
        </p>
        <p className="mt-2 font-semibold">${garden.price}/night</p>
        {garden.host && (
          <p className="text-xs text-muted-foreground">
            Host: {garden.host.name || garden.host.email}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Link href={`/admin/property/garden/${garden.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
        </Link>
        {garden.status === 'PENDING' && (
          <>
            <Button
              variant="default"
              size="sm"
              onClick={handleApprove}
              disabled={isUpdating}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Check className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleReject}
              disabled={isUpdating}
              className="flex-1"
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}