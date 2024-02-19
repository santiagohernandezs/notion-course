import { supabase } from '../supabase'

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

type Payload = {
	name: string
	email: string
}

export const sendData = async (payload: Payload) => {
	const name = upperCaseFistLetter(payload.name)
	const email = formatMail(payload.email)

	const { error, status } = await supabase.from('clients').insert([{ name, email }])

	return { status, error }
}

export const onSubmit = async (e: SubmitEvent, payload: Payload) => {
	e.preventDefault()
	await sendData(payload)
}
