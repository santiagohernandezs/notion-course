import { zodResolver } from '@hookform/resolvers/zod'
import { render } from '@react-email/render'
import { z } from 'astro/zod'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import Input from '../../components/Input'
import OnboardingEmail from '../../emails/onboardingEmail'
import cx from '../../utils/cx'
import { sendData } from '../../utils/helpers'

const schema = z.object({
  name: z
    .string()
    .min(5, 'El nombre debe contener al menos 5 carateres')
    .max(70, 'El nombre es demasiado largo'),
  email: z
    .string()
    .min(5, 'El correo debe contener al menos 5 caracteres')
    .max(254, 'El correo es demasiado largo')
    .email('El correo debe ser un email válido')
})

type Inputs = z.infer<typeof schema>

export default function Form() {
  const methods = useForm<Inputs>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: ''
    }
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, isValid, errors },
    reset,
    setError,
    getValues
  } = methods

  const styles = {
    form: cx(
      'flex flex-col w-[80%] tablet/sm:w-[50%] laptop/sm:w-1/2 desktop/sm:w-2/5 h-auto rounded-xl gap-6 bg-white-default outline-2 p-7 ring-gray-200',
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

  const sendEmail = async (data: Inputs) => {
    const { name, email } = data

    const finalHtml = render(<OnboardingEmail name={name} email={email} />, {
      pretty: true
    })

    const finalText = render(<OnboardingEmail name={name} email={email} />, {
      plainText: true
    })

    try {
      const res = await fetch('/api/sendEmail.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'tao@onboarding.notionvenezuela.com',
          to: data.email,
          subject: '¡Bienvenido a Notion Venezuela!',
          html: finalHtml,
          text: finalText
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const { email, name } = getValues()
    const { status, errors, message } = await sendData(data)

    if (errors && errors.includes('email')) {
      setError('email', {
        message: 'El correo ya está registrado'
      })
    } else if (status === 500) {
      setError('root', {
        message: 'Error al enviar el formulario'
      })
    } else {
      reset()
      // sendEmail({ email, name })
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

          <button disabled={!isValid} type='submit' className={styles.button}>
            {isSubmitting ? (
              <svg
                aria-hidden='true'
                className='inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
            ) : (
              'Enviar'
            )}
          </button>

          {errors.root && <p className='text-red-500 text-sm'>{errors.root.message}</p>}

          {isSubmitSuccessful && (
            <p className='text-blue-discord text-md text-center'>Formulario enviado con éxito</p>
          )}

          <p className='text-xs text-gray-500 text-center'>
            Al hacer clic en "Enviar", aceptas nuestras Condiciones, la Política de datos y la
            Política de cookies.
          </p>

          <p className='text-sm text-gray-500 text-center'>
            ¿Quieres volver a la página de inicio?{' '}
            <a href='/' className='text-blue-discord'>
              Click aquí
            </a>
          </p>
        </form>
      </div>
      <Toaster />
    </FormProvider>
  )
}
