import type { APIRoute } from 'astro'
import { prisma } from '../../lib/db'

export const DELETE: APIRoute = async ({ request }) => {
  const { id } = await request.json()

  try {
    const deletedClient = await prisma.clients.delete({
      where: { id }
    })

    const clients = await prisma.clients.findMany()

    return new Response(JSON.stringify(clients), {
      status: 200,
      statusText: 'OK'
    })
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      statusText: 'Internal Server Error'
    })
  }
}
