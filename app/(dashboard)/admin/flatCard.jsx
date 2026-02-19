// app/(dashboard)/admin/flatCard.tsx
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

interface FlatCardProps {
  flat: {
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

export default function FlatCard({ flat, onStatusChange }: FlatCardProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleApprove = async () => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/admin/flat/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: flat.id, action: 'approve' }),
      })

      if (!response.ok) throw new Error('Failed to approve')

      toast({
        title: 'Approved',
        description: 'Flat listing has been approved.',
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
      const response = await fetch(`/api/admin/flat/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: flat.id, action: 'reject' }),
      })

      if (!response.ok) throw new Error('Failed to reject')

      toast({
        title: 'Rejected',
        description: 'Flat listing has been rejected.',
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
        {flat.photos && flat.photos[0] ? (
          <Image
            src={flat.photos[0]}
            alt={flat.title}
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
            <CardTitle className="line-clamp-1">{flat.title}</CardTitle>
            <CardDescription>
              {flat.city}, {flat.country}
            </CardDescription>
          </div>
          <Badge className={statusColor[flat.status]}>{flat.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {flat.description}
        </p>
        <p className="mt-2 font-semibold">${flat.price}/night</p>
        {flat.host && (
          <p className="text-xs text-muted-foreground">
            Host: {flat.host.name || flat.host.email}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Link href={`/admin/property/flat/${flat.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
        </Link>
        {flat.status === 'PENDING' && (
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