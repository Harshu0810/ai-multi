'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin } from 'lucide-react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const mapContainerStyle = {
  width: '100%',
  height: '240px',
}

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
}

interface LocationStepProps {
  value: {
    address: {
      line1: string
      line2: string
      district: string
      city: string
      state: string
      pincode: string
    }
    coordinates: {
      lat: number
      lng: number
    }
  }
  onChange: (value: any) => void
  onNext: () => void
  onBack: () => void
}

export function LocationStep({ value, onChange, onNext, onBack }: LocationStepProps) {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  const handleAddressChange = (field: string, fieldValue: string) => {
    onChange({
      ...value,
      address: {
        ...value.address,
        [field]: fieldValue,
      },
    })
  }

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          onChange({
            ...value,
            coordinates: { lat, lng },
          })
          setUseCurrentLocation(true)
        },
        error => {
          console.error('Error getting current location:', error)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat()
    const lng = e.latLng?.lng()
    if (lat && lng) {
      onChange({
        ...value,
        coordinates: {
          lat,
          lng,
        },
      })
    }
  }

  const isFormValid = () => {
    const { line1, district, city, state, pincode } = value.address
    return line1 && district && city && state && pincode
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Where is your place located?</h1>
        <p className="text-muted-foreground">Your address is only shared with guests after they've made a reservation.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <Button type="button" variant="outline" className="flex items-center gap-2" onClick={handleUseCurrentLocation}>
              <MapPin className="h-4 w-4" />
              Use my current location
            </Button>
          </div>

          <div className="space-y-4">
            {['line1', 'line2', 'district', 'city', 'state', 'pincode'].map(field => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>
                  {field === 'line1'
                    ? 'Flat, House, etc.'
                    : field === 'line2'
                    ? 'Nearby address'
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={field}
                  value={(value.address as any)[field]}
                  onChange={e => handleAddressChange(field, e.target.value)}
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 h-60 rounded-md bg-gray-200 p-4">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={value.coordinates.lat ? value.coordinates : defaultCenter}
              >
                <Marker position={value.coordinates} draggable={true} onDragEnd={handleMarkerDragEnd} />
              </GoogleMap>
            ) : (
              <p className="text-muted-foreground">
                {useCurrentLocation
                  ? 'Loading map...'
                  : 'Map will appear here after you enter your address or use current location.'}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!isFormValid()}>
          Next
        </Button>
      </div>
    </div>
  )
}