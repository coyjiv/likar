'use client';

import React, { use, useEffect } from 'react'
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
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
} from '@mantine/core';
import { type } from 'os'
import Link from 'next/link';
import { useFirebase } from 'react-redux-firebase';
import { firebaseInstance } from '@/app/store/provider';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

type Props = {
  forDoc?: boolean
}

const LoginForm = ({forDoc, ...props}: Props) => {
    const auth = useAuth();
    const router = useRouter();
    const firebase = useFirebase();
    const form = useForm({
      initialValues: {
        email: '',
        name: '',
        password: '',
        terms: true,
      },
  
      validate: {
        email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      },
    });

    useEffect(() => {
        if (auth?.uid) {
            router.push('/')
        }
        console.log(auth);
        
    }, [auth, router])

  return (
    <Paper radius="md" p="xl" className='max-h-[400px] max-w-[80%] sm:w-full sm:mx-20 lg:mx-40 lg:max-w-lg' withBorder {...props}>
      <Text size="lg" weight={500}>
        Вітаємо, щоб продовжити увійдіть у систему
      </Text>

      <form onSubmit={form.onSubmit(() => {
            firebase.auth().signInWithEmailAndPassword(form.values.email, form.values.password)
      })} className='mt-5'>
        <Stack>

          <TextInput
            required
            label="Email"
            placeholder="johndoe@example.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Невірний email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Пароль"
            placeholder="Ваш пароль"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

        </Stack>

        <Group position="apart" mt="xl">
          <Link className='text-sm font-medium text-slate-500 border-b' href={forDoc?'/doc/register':'/register'}>
            Зареєструватися
            </Link>
          <Button type="submit" radius="xl" className='text-black hover:text-white transition-all'>
            {'Увійти'}
          </Button>
        </Group>
      </form>
    </Paper>
  )
}

export default LoginForm