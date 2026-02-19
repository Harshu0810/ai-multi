import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a test host user (if not exists)
  const hostEmail = 'host@example.com'
  let host = await prisma.user.findUnique({
    where: { email: hostEmail },
  })

  if (!host) {
    host = await prisma.user.create({
      data: {
        email: hostEmail,
        name: 'Test Host',
        role: 'VENDOR',
      },
    })
    console.log('Created test host:', host.email)
  }

  // Sample flats
  const flats = [
    {
      title: 'Cozy Downtown Loft',
      description: 'Beautiful loft in the heart of the city with skyline views.',
      price: 120,
      city: 'New York',
      country: 'USA',
      bedrooms: 1,
      bathrooms: 1,
      area: 65,
      photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500'],
      amenities: ['WiFi', 'Kitchen', 'Air conditioning'],
      status: 'APPROVED',
      hostId: host.id,
    },
    {
      title: 'Modern 2BR Apartment',
      description: 'Spacious apartment near Central Park.',
      price: 200,
      city: 'New York',
      country: 'USA',
      bedrooms: 2,
      bathrooms: 2,
      area: 90,
      photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500'],
      amenities: ['WiFi', 'Kitchen', 'Washer', 'Dryer'],
      status: 'APPROVED',
      hostId: host.id,
    },
    {
      title: 'Beachfront Studio',
      description: 'Wake up to ocean views in this cozy studio.',
      price: 150,
      city: 'Miami',
      country: 'USA',
      bedrooms: 0,
      bathrooms: 1,
      area: 40,
      photos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500'],
      amenities: ['WiFi', 'Pool', 'Beach access'],
      status: 'APPROVED',
      hostId: host.id,
    },
  ]

  // Sample marriage gardens
  const gardens = [
    {
      title: 'Elegant Garden Estate',
      description: 'Perfect for weddings and large gatherings.',
      price: 500,
      city: 'Los Angeles',
      country: 'USA',
      capacity: 200,
      area: 500,
      photos: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500'],
      amenities: ['Parking', 'Catering', 'Lighting'],
      status: 'APPROVED',
      hostId: host.id,
    },
    {
      title: 'Riverside Venue',
      description: 'Scenic garden by the river with beautiful sunset views.',
      price: 350,
      city: 'Austin',
      country: 'USA',
      capacity: 150,
      area: 400,
      photos: ['https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500'],
      amenities: ['River view', 'Tent', 'Heating'],
      status: 'APPROVED',
      hostId: host.id,
    },
  ]

  // Insert flats
  for (const flat of flats) {
    await prisma.flat.create({ data: flat })
    console.log(`Added flat: ${flat.title}`)
  }

  // Insert gardens
  for (const garden of gardens) {
    await prisma.marriageGarden.create({ data: garden })
    console.log(`Added garden: ${garden.title}`)
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })