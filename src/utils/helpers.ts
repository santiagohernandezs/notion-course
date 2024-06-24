const upperCaseFirstLetter = (word: string) => {
  const words = word.split(' ')
  const capitalizedWords = words.map(w => w.charAt(0).toUpperCase() + w.slice(1))
  return capitalizedWords.join(' ')
}

const formatMail = (mail: string) => {
  const mailFormatted = mail.toLowerCase()
  return mailFormatted.trim()
}

export type Payload = {
  name: string
  email: string
}

type ApiResponse = {
  status: number
  message?: string
  errors?: Array<keyof Payload>
}

export const sendData = async (payload: Payload): Promise<ApiResponse> => {
  const name = upperCaseFirstLetter(payload.name)
  const email = formatMail(payload.email)

  const response = await fetch('/api/sendFormData.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email })
  })
  const data = await response.json()

  if (response.ok) {
    return { status: response.status }
  } else {
    return { status: response.status, message: data.message, errors: [...data.meta.target] }
  }
}
