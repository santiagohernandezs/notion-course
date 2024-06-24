import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import type { APIRoute } from 'astro'
import { prisma } from '../../lib/db'

export const GET: APIRoute = async ({ params }) => {
  try {
    const clients = await prisma.subscriptions_list_view.findMany()
    return new Response(JSON.stringify(clients), {
      status: 200,
      statusText: 'OK'
    })
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return new Response(JSON.stringify({ message: err.message }), {
        status: 400,
        statusText: 'Bad Request'
      })
    } else {
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
        status: 500,
        statusText: 'Internal Server Error'
      })
    }
  }
}
