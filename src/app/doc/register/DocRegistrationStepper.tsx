import {
  Stepper,
  Group,
  Button,
  Checkbox,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { upperFirst } from '@mantine/hooks'
import Link from 'next/link'
import React from 'react'
import { useFirebase, useFirestore } from 'react-redux-firebase'
import Lottie from 'lottie-react'
import successAnimation from '@/assets/lottie/confirmation.json'
import { getAuth, reload, sendEmailVerification } from 'firebase/auth'
import { useRouter } from 'next/navigation'

type Props = {}

const DocRegistrationStepper = (props: Props) => {
  const firebase = useFirebase()
  const firestore = useFirestore()
  const auth = getAuth()
  const router = useRouter()

  const [activeStep, setActiveStep] = React.useState(0)
  const [isEmailVerified, setEmailVerified] = React.useState(
    auth.currentUser?.emailVerified
  )

  const nextStep = () =>
    setActiveStep((current) => (current < 3 ? current + 1 : current))
  const prevStep = () =>
    setActiveStep((current) => (current > 0 ? current - 1 : current))

  const form = useForm({
    initialValues: {
      name: '',
      middleName: '',
      lastName: '',
      phoneNumber: '',
      dOB: '',
      placeOfWork: '',
      email: '',
      password: '',
    },

    validate: {
      name: (val) =>
        val.length >= 2 && /^[А-ЩЬЮЯЄІЇҐа-щьюяєіїґ]+$/.test(val)
          ? null
          : "Неправильне ім'я",
      lastName: (val) =>
        val.length <= 2
          ? 'Прізвище є обовязковим'
          : /^[А-ЩЬЮЯЄІЇҐа-щьюяєіїґ]+$/.test(val)
          ? null
          : 'Перевірте ваше прізвище',
      middleName: (val) =>
        val.length <= 2
          ? 'Перевірте корректність'
          : /^[А-ЩЬЮЯЄІЇҐа-щьюяєіїґ]+$/.test(val)
          ? null
          : 'Перевірте корректність',
      phoneNumber: (val) =>
        /^\+?3?8?(0\d{9})$/.test(val) ? null : 'Некорректний номер',
      dOB: (val) => (val.length <= 2 ? "Дата народження є обов'язковою" : null),
      placeOfWork: (val) =>
        val.length <= 2 ? "Місце роботи є обов'язковим" : null,
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Некорректний email'),
      password: (val) =>
        val.length <= 6 ? 'Пароль має мати якнайменш 6 символів' : null,
    },
  })

  const checkEmailVerification = async () => {
    if (auth.currentUser) {
      await reload(auth.currentUser) // This doesn't cause a full page reload, just refreshes the auth token.
      const isEmailVerified = auth.currentUser.emailVerified
      console.log('Email verification status: ', isEmailVerified)
      setEmailVerified(isEmailVerified) // Assuming setEmailVerified updates a state variable.
    }
  }

  console.log(activeStep)

  return (
    <>
      <Stepper active={activeStep} breakpoint='sm' className='mt-4'>
        <Stepper.Step label='Створіть аккаунт' description=''>
          <form
            onSubmit={form.onSubmit(async () => {
              const response = await firebase.createUser(
                {
                  email: form.values.email,
                  password: form.values.password,
                },
                {
                  firstName: form.values.name,
                  lastName: form.values.lastName,
                  middleName: form.values.middleName,
                  phoneNumber: form.values.phoneNumber,
                  dOB: form.values.dOB,
                  placeOfWork: form.values.placeOfWork,
                  email: form.values.email,
                  isDoctor: true,
                }
              )
              const uid = firebase?.auth()?.currentUser?.uid
          
              await firestore.set(`doctors/${uid}`, {
                firstName: form.values.name,
                lastName: form.values.lastName,
                middleName: form.values.middleName,
                phoneNumber: form.values.phoneNumber,
                dOB: form.values.dOB,
                placeOfWork: form.values.placeOfWork,
                email: form.values.email,
                appointments: [],
              })
              nextStep()
              if (auth?.currentUser) sendEmailVerification(auth?.currentUser)
            })}
            className='mt-2 overflow-y-scroll max-h-[300px] pr-4'
          >
            <Stack>
              <TextInput
                label="Ім'я"
                placeholder="Ваше ім'я"
                withAsterisk
                radius='md'
                {...form.getInputProps('name')}
              />

              <TextInput
                label='Прізвище'
                placeholder='Ваше прізвище'
                withAsterisk
                radius='md'
                {...form.getInputProps('lastName')}
              />

              <TextInput
                withAsterisk
                label='По батькові'
                placeholder='Сергійович'
                radius='md'
                {...form.getInputProps('middleName')}
              />

              <TextInput
                withAsterisk
                label='Номер телефону'
                type={'tel'}
                placeholder='+380 000 000 000'
                radius='md'
                {...form.getInputProps('phoneNumber')}
              />

              <TextInput
                type='date'
                withAsterisk
                label='Дата народження'
                placeholder=''
                {...form.getInputProps('dOB')}
              />

              <TextInput
                withAsterisk
                type={
                  'text'
                }
                label='Місце роботи'
                placeholder='Ваше місце роботи'
                radius='md'
                {...form.getInputProps('placeOfWork')}
              />

              <TextInput
                required
                label='Email'
                placeholder='johndoe@example.com'
                radius='md'
                {...form.getInputProps('email')}
              />

              <PasswordInput
                required
                label='Пароль'
                placeholder='Ваш пароль'
                {...form.getInputProps('password')}
                radius='md'
              />
            </Stack>

            <Group position='apart' mt='xl'>
              <Link
                href={'/doc/login'}
                className='text-sm font-medium text-slate-500 border-b'
              >
                Увійдіть у систему
              </Link>

              <Button
                type='submit'
                radius='xl'
                className='transition-all text-black hover:text-white hover:border-white border-black'
              >
                {upperFirst('Далі')}
              </Button>
            </Group>
          </form>
        </Stepper.Step>
        <Stepper.Step label='Підтвердіть email'>
          <div className='flex flex-col items-center justify-center'>
            {isEmailVerified || auth?.currentUser?.emailVerified ? (
              <div className='my-10 flex flex-col items-center justify-center gap-4'>
                <h1 className='font-medium'>Ви верифіковані!</h1>
                <div className='w-10 '>
                  <Lottie animationData={successAnimation} loop={false} />
                </div>
              </div>
            ) : (
              <div>
                <h1 className='font-medium text-center my-10'>
                  Підтвердіть email
                </h1>
                <h5>
                  Відкрийте вашу пошту та перейдіть за посиланням для
                  верифікації, а потім натисніть{' '}
                  <span
                    onClick={() => checkEmailVerification()}
                    className='underline font-medium cursor-pointer'
                  >
                    сюди
                  </span>
                </h5>
                <h4
                  className='cursor-pointer text-sm text-slate-400'
                  onClick={() => {
                    if (auth?.currentUser)
                      sendEmailVerification(auth?.currentUser)
                  }}
                >
                  Не прийшов емейл?{' '}
                  <span className='underline'>Надіслати ще раз</span>
                </h4>
              </div>
            )}
          </div>
        </Stepper.Step>
        <Stepper.Completed>
          <div className='flex flex-col items-center gap-2'>
            Готово! Ви успішно зареєструвалися
            <div className='w-10 '>
              <Lottie animationData={successAnimation} loop={false} />
            </div>
          </div>
        </Stepper.Completed>
      </Stepper>

      {activeStep > 0 && (
        <Group position='center' mt='xl'>
          <Button
            disabled={activeStep > 0}
            variant='default'
            onClick={prevStep}
          >
            Назад
          </Button>
          <Button
            variant='default'
            onClick={() =>
              activeStep === 2 ? router.replace('/doc') : nextStep()
            }
          >
            Далі
          </Button>
        </Group>
      )}
    </>
  )
}

export default DocRegistrationStepper
