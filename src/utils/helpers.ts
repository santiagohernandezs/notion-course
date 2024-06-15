import { supabase } from '../lib/supabase'

const upperCaseFistLetter = (word: string) => {
  const words = word.split(' ')
  const capitalizedWords = words.map(w => w.charAt(0).toUpperCase() + w.slice(1))
  const result = capitalizedWords.join(' ')
  return result
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
  errors?: Partial<Payload>
}

export const sendData = async (payload: Payload): Promise<ApiResponse> => {
  const name = upperCaseFistLetter(payload.name)
  const email = formatMail(payload.email)

  const { data: isAlreadyRegistred, error: isAlreadyRegistredError } = await supabase
    .from('clients')
    .select('email')
    .eq('email', email)

  if (isAlreadyRegistred && isAlreadyRegistred.length > 0) {
    return {
      status: 409,
      errors: { email: 'Este correo ya ha sido registrado' }
    }
  }

  if (isAlreadyRegistredError) {
    return {
      status: 500,
      message: isAlreadyRegistredError.message
    }
  }

  const { status, error } = await supabase.from('clients').insert([{ name, email }])

  if (error) {
    return { status: 500, message: 'Error al enviar el formulario' }
  }

  return { status, message: 'Formulario enviado con éxito' }
}
