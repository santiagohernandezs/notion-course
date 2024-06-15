import type { APIRoute } from 'astro'
import { Resend } from 'resend'

const resend = new Resend('re_bjzVB7qk_KdZtXmnY7CYgbiWPxiVk4AAw')

export const POST: APIRoute = async ({ params, request }) => {
  const { to, from, html, subject, text } = await request.json()
  console.info({ to, from, html, subject, text })

  if (!to || !from || !html || !subject || !text) {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields'
      }),
      {
        status: 400,
        statusText: 'Bad Request'
      }
    )
  }

  const response = await resend.emails.send({
    from,
    to,
    subject,
    text,
    html
  })

  if (response.data) {
    return new Response(JSON.stringify(response.data), {
      status: 200,
      statusText: 'OK'
    })
  } else {
    return new Response(
      JSON.stringify({
        message: response.error
      }),
      {
        status: 500,
        statusText: 'Internal Server Error'
      }
    )
  }
}
