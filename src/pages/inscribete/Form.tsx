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
    mode: 'all',
    resolver: zodResolver(schema)
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, isValid },
    reset
  } = methods

  const styles = {
    form: cx(
      'flex flex-col w-[80%] tablet/sm:w-[50%] laptop/sm:w-1/2 desktop/sm:w-2/5 h-auto rounded-xl gap-6 bg-white-default ring-1 p-7 ring-gray-200',
      {
        'ring-blue-discord ring-4': isSubmitSuccessful
      }
    ),
    button: cx(
      'bg-black-text text-white-snow font-semibold rounded-lg font-inter gap-1 shadow-md text-base px-4 py-2 trnasition-colors duration-150 cursor-pointer',
      {
        'bg-black-text opacity-90': isSubmitting
      },
      {
        'bg-gray-500 cursor-not-allowed': !isValid
      }
    )
  }

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const { error, status } = await sendData(data)

    if (error) {
      console.error('Error:', error)
    } else {
      reset()
    }
  }

  return (
    <FormProvider {...methods}>
      <div className={styles.form}>
        <div className='flex flex-col gap-2 w-full'>
          <h1 className='text-2xl font-bold text-center laptop/sm:text-3xl text-black-text'>
            Inscríbete
          </h1>
          <p className='text-gray-500 text-center text-sm mobile/md:text-base'>
            Regístrate para recibir información sobre nuestros productos y servicios
          </p>
        </div>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          <Input helperText='Tu nombre completo' name='name' placeholder='Nombre' icon='user' />
          <Input helperText='Tu correo electrónico' name='email' placeholder='Email' icon='mail' />

          <button disabled={isValid} type='submit' className={styles.button}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>

          {isSubmitSuccessful && (
            <p className='text-blue-discord text-sm mx-auto text-center tablet/sm:text-left font-semibold'>
              ¡Gracias por inscribirte! Te contactaremos pronto.
            </p>
          )}
        </form>
      </div>
    </FormProvider>
  )
}
