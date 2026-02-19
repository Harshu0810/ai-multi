import { prisma } from '@/lib/prisma/client'
import FlatDetailsPage from '@/components/buyer/flatPage' // your existing component

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const flat = await prisma.flat.findUnique({
    where: { id: Number(params.id) },
  })

  if (!flat) return <div>Property not found</div>

  return <FlatDetailsPage property={flat} />
}