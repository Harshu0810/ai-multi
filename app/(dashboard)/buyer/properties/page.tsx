import { prisma } from '@/lib/prisma/client'
import { FlatCard } from '@/components/cards/FlatCard'
import MarriageGardenCard from '@/components/cards/MarriageGardenCard'

export default async function PropertiesPage() {
  const flats = await prisma.flat.findMany({
    where: { isActive: true, isApproved: true },
  })
  const gardens = await prisma.marriageGarden.findMany({
    where: { status: 'approved' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Properties</h1>
      
      <h2 className="text-2xl font-semibold mb-4">Flats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flats.map(flat => (
          <FlatCard key={flat.id} flatData={flat} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Marriage Gardens</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gardens.map(garden => (
          <MarriageGardenCard key={garden.id} gardenData={garden} />
        ))}
      </div>
    </div>
  )
}