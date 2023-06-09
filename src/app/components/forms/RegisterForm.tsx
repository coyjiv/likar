'use client'

import React, { useEffect } from 'react'
import { useToggle, upperFirst } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core'
import Link from 'next/link'
import { useFirebase } from 'react-redux-firebase'
import { firebaseInstance } from '@/app/store/provider'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import DocRegistrationStepper from '@/app/doc/register/DocRegistrationStepper'

type Props = {
  forDoc?: boolean
}

const RegisterForm = ({ forDoc }: Props) => {
  const firebase = useFirebase()
  const auth = useAuth()
  const router = useRouter()
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  })

  useEffect(() => {
    if (auth?.uid) {
      if(forDoc && auth.currentUser?.emailVerified){
        router.push('/doc')
      }
      else if(!forDoc){
        router.push('/')
      }
    }
  }, [auth, forDoc, router])

  return (
    <Paper
      radius='md'
      p='xl'
      className={`${forDoc? 'max-h-[500px]' :'max-h-[400px]'} sm:w-full sm:mx-20 lg:mx-40 lg:max-w-lg`}
      withBorder
    >
      <Text size='lg' weight={500}>
        Реєстрація
      </Text>
      {forDoc ? (
        <DocRegistrationStepper />
      ) : (
        <form
          onSubmit={form.onSubmit(() => {
            firebase.createUser(
              {
                email: form.values.email,
                password: form.values.password,
              },
              {
                username: form.values.name,
                email: form.values.email,
                isDoctor: false,
              }
            )
          })}
          className='mt-5'
        >
          <Stack>
            <TextInput
              label="Ім'я"
              placeholder="Ваше ім'я"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue('name', event.currentTarget.value)
              }
              radius='md'
            />

            <TextInput
              required
              label='Email'
              placeholder='johndoe@example.com'
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Невірний email'}
              radius='md'
            />

            <PasswordInput
              required
              label='Пароль'
              placeholder='Ваш пароль'
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
              radius='md'
            />

            <Checkbox
              label='Я погоджуюсь з умовами використання'
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue('terms', event.currentTarget.checked)
              }
            />
          </Stack>

          <Group position='apart' mt='xl'>
            <Link
              href={'/login'}
              className='text-sm font-medium text-slate-500 border-b'
            >
              Увійдіть у систему
            </Link>

            <Button
              type='submit'
              radius='xl'
              className='transition-all text-black hover:text-white hover:border-white border-black'
            >
              {upperFirst('зареєструйтеся')}
            </Button>
          </Group>
        </form>
      )}
    </Paper>
  )
}

export default RegisterForm
