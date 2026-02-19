'use client'

import type React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'
import { toast } from 'sonner'

interface PhotosStepProps {
  value: string[]
  onChange: (value: string[]) => void
  onNext: () => void
  onBack: () => void
}

export function PhotosStep({ value, onChange, onNext, onBack }: PhotosStepProps) {
  const [dragActive, setDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const uploadFile = async (file: File) => {
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'property')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload file')
      }

      const data = await response.json()
      return data.url
    } catch (error) {
      console.error('Error uploading file:', error)
      toast('Upload failed', {
        description: 'There was an error uploading your file. Please try again.',
      })
      return null
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return

    const newPhotos = [...value]

    for (const file of Array.from(files)) {
      const fileUrl = await uploadFile(file)
      if (fileUrl) {
        newPhotos.push(fileUrl)
      }
    }

    onChange(newPhotos)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...value]
    newPhotos.splice(index, 1)
    onChange(newPhotos)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add photos of your place</h1>
        <p className="text-muted-foreground">
          Upload high-quality photos to showcase your property. You can add multiple images.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div
            className={`mb-6 flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
              dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
            } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => !isUploading && document.getElementById('photo-upload')?.click()}
          >
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="text-sm">Uploading...</p>
              </div>
            ) : (
              <>
                <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                <p className="mb-1 text-sm font-medium">Drag and drop your photos here</p>
                <p className="text-xs text-muted-foreground">or click to browse files</p>
              </>
            )}
            <input
              id="photo-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={e => handleFileUpload(e.target.files)}
              disabled={isUploading}
            />
          </div>

          {value.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {value.map((photo, index) => (
                <div key={index} className="group relative aspect-square overflow-hidden rounded-md">
                  <Image
                    src={photo || '/placeholder.svg?height=200&width=200'}
                    alt={`Property photo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={e => {
                      e.stopPropagation()
                      handleRemovePhoto(index)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={value.length === 0 || isUploading}>
          Next
        </Button>
      </div>
    </div>
  )
}