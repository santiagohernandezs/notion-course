import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'astro/zod'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import Input from '../../components/Input'
import cx from '../../utils/cx'
import { sendData } from '../../utils/helpers'

const schema = z.object({
	name: z
		.string()
		.min(5, 'El nombre debe contener al menos 5 carateres')
		.max(30, 'El nombre no puede exceder los 30 caracteres'),
	email: z
		.string()
		.min(5, 'El correo debe contener al menos 5 caracteres')
		.max(40, 'El correo no puede exceder los 40 caracteres')
		.email('El correo debe ser un email válido')
})

type Inputs = z.infer<typeof schema>

export default function Form() {
	const methods = useForm<Inputs>({
		resolver: zodResolver(schema)
	})

	const {
		handleSubmit,
		formState: { isSubmitting, isSubmitSuccessful },
		reset
	} = methods

	const styles = {
		button: cx(
			'bg-black-text text-white-snow font-semibold rounded-lg font-inter gap-1 shadow-md text-base px-4 py-2',
			{
				'bg-black-text opacity-90': isSubmitting
			}
		)
	}

	const onSubmit: SubmitHandler<Inputs> = async data => {
		const { error, status } = await sendData(data)

		if (error) {
			console.error(error)
			return
		} else {
			return reset()
		}
	}

	return (
		<FormProvider {...methods}>
			<form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
				<Input name='name' placeholder='Nombre' icon='user' />
				<Input name='email' placeholder='Email' icon='mail' />

				<button disabled={isSubmitting} type='submit' className={styles.button}>
					{isSubmitting ? 'Enviando...' : 'Enviar'}
				</button>

				{!isSubmitSuccessful && (
					<p className='text-blue-discord text-sm text-center tablet/sm:text-left font-semibold'>
						¡Gracias por inscribirte! Te contactaremos pronto.
					</p>
				)}
			</form>
		</FormProvider>
	)
}
