// app/api/properties/garden/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { prisma } from '@/lib/prisma/client'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      description,
      price,
      street,
      city,
      state,
      country,
      zipCode,
      capacity,
      area,
      photos,
      amenities,
      securityFeatures,
      // ... other fields
    } = body

    if (!title || !description || !price || !city || !country) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const garden = await prisma.marriageGarden.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        street,
        city,
        state,
        country,
        zipCode,
        capacity: capacity ? parseInt(capacity) : null,
        area: area ? parseInt(area) : null,
        photos: photos || [],
        amenities: amenities || [],
        securityFeatures: securityFeatures || [],
        hostId: user.id,
        status: 'PENDING',
      },
    })

    return NextResponse.json(garden, { status: 201 })
  } catch (error) {
    console.error('Error creating garden:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}