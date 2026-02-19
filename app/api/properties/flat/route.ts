// app/api/properties/flat/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { prisma } from '@/lib/prisma/client'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    // Get the authorization header
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
      bedrooms,
      bathrooms,
      area,
      photos,
      amenities,
      securityFeatures,
      // ... other fields
    } = body

    // Validate required fields
    if (!title || !description || !price || !city || !country) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create the flat listing
    const flat = await prisma.flat.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        street,
        city,
        state,
        country,
        zipCode,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        area: area ? parseInt(area) : null,
        photos: photos || [],
        amenities: amenities || [],
        securityFeatures: securityFeatures || [],
        hostId: user.id,
        status: 'PENDING',
      },
    })

    return NextResponse.json(flat, { status: 201 })
  } catch (error) {
    console.error('Error creating flat:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}