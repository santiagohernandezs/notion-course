import { Prisma } from '@prisma/client'
import type { APIRoute } from 'astro'
import { prisma } from '../../lib/db'

export const POST: APIRoute = async ({ request }) => {
  const { name, email } = await request.json()

  try {
    const newClient = await prisma.clients.create({ data: { name, email } })
    const response = JSON.stringify({ data: newClient })

    return new Response(response, {
      status: 200,
      statusText: 'OK'
    })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return new Response(JSON.stringify(err), {
        status: err.code === 'P2002' ? 409 : 400,
        statusText: err.code === 'P2002' ? 'Conflict' : 'Bad Request'
      })
    } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
      return new Response(JSON.stringify(err), {
        status: 400,
        statusText: 'Bad Request'
      })
    } else {
      return new Response(JSON.stringify(err), {
        status: 500,
        statusText: 'Internal Server Error'
      })
    }
  }
}
