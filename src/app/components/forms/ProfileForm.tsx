import React, { ChangeEvent, useMemo, useState } from 'react'
import { useForm } from '@mantine/form'
import { Avatar, Select, TextInput } from '@mantine/core'
import {
  firestoreConnect,
  useFirebase,
  useFirestore,
} from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { useAppSelector } from '@/hooks/redux'
import { getAuth } from 'firebase/auth'

type Props = {}

const ProfileForm = (props: Props) => {
  const firestore = useFirestore()
  const firebase = useFirebase()
  const auth = getAuth()
  //@ts-ignore
  const uid = useAppSelector((state) => state.firebase.auth.uid)
  //@ts-ignore
  const profile = useAppSelector((state) => state.firebase.profile)
  //@ts-ignore

  const doctors = useAppSelector((state) => state.firestore.data.doctors)
  const doctorsArray = useMemo(() => Object.values(doctors || {}), [doctors])
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()
  const form = useForm({
    initialValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      middleName: profile.middleName,
      placeOfResidence: profile.placeOfResidence,
      email: profile.email,
      dOB: profile.dOB,
      assignedDoctor: profile.assignedDoctor,
    },
  })


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  async function updateUserProfile(values: any) {
    return await firestore
      .collection('users')
      .doc(auth?.currentUser?.uid)
      .set(values, { merge: true })
  }
  return (
    <form
      onSubmit={form.onSubmit(
        (values, _event) => {
          try {
            updateUserProfile(values)
          } catch (error) {
            console.error('Error updating profile: ', error)
          }
        },
        (validationErrors, _values, _event) => {
          console.log(validationErrors)
        }
      )}
      className='pl-5'
    >
      <div className='mt-10 space-y-12 sm:space-y-3'>
        <div>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Деталі вашого аккаунта
          </h2>
          <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-600'>
            Тут ви можете змінити свої особисті дані.
          </p>
        </div>

        <div>
          <div className='mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0'>
            <div className=' sm:grid sm:grid-cols-3 xl:grid-cols-4 sm:items-center sm:gap-4 sm:py-6'>
              <label
                htmlFor='photo'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Аватар
              </label>
              <div className='mt-2 sm:col-span-2 sm:mt-0'>
                <div className='flex items-center gap-x-3'>
                  <Avatar
                    src={file && URL.createObjectURL(file)}
                    size={40}
                    radius='xl'
                  />
                  <button
                    type='button'
                    className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Змінити
                  </button>
                  {file && (
                    <>
                      <button
                        type='button'
                        className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                        onClick={() => {
                          firebase
                            .uploadFile(`avatars/${uid}`, file)
                            .then((res) => {
                              res.uploadTaskSnapshot.ref
                                .getDownloadURL()
                                .then((downloadURL) => {
                                  updateUserProfile({ avatarUrl: downloadURL })
                                  setFile(undefined)
                                })
                            })
                        }}
                      >
                        Зберегти
                      </button>
                      <button
                        type='button'
                        className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                        onClick={() => setFile(undefined)}
                      >
                        Скинути
                      </button>
                    </>
                  )}
                  <input
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    type='file'
                    className='hidden'
                  />
                </div>
              </div>
            </div>
            <div className=' sm:grid sm:grid-cols-3 xl:grid-cols-4 sm:items-start sm:gap-4 sm:py-6'>
              <label
                htmlFor='first-name'
                className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
              >
                Ім&apos;я
              </label>
              <div className='mt-2 sm:col-span-2 sm:mt-0'>
                <TextInput
                  value={form.values.firstName}
                  onChange={(event) =>
                    form.setFieldValue('firstName', event.currentTarget.value)
                  }
                  error={form.errors.firstName && "Некорректне ім'я"}
                  radius='md'
                />
              </div>
            </div>

            <div className=' sm:grid sm:grid-cols-3 xl:grid-cols-4 sm:items-start sm:gap-4 sm:py-6'>
              <label
                htmlFor='last-name'
                className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
              >
                Прізвище
              </label>
              <div className='mt-2 sm:col-span-2 sm:mt-0'>
                <TextInput
                  value={form.values.lastName}
                  onChange={(event) =>
                    form.setFieldValue('lastName', event.currentTarget.value)
                  }
                  error={form.errors.lastName && 'Некорректне прізвище'}
                  radius='md'
                />
              </div>
            </div>

            <div className=' sm:grid sm:grid-cols-3 xl:grid-cols-4 sm:items-start sm:gap-4 sm:py-6'>
              <label
                htmlFor='last-name'
                className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
              >
                По батькові
              </label>
              <div className='mt-2 sm:col-span-2 sm:mt-0'>
                <TextInput
                  value={form.values.middleName}
                  onChange={(event) =>
                    form.setFieldValue('middleName', event.currentTarget.value)
                  }
                  error={
                    form.errors.middleName &&
                    'Перевірте на коректність введені дані'
                  }
                  radius='md'
                />
              </div>
            </div>

            <div className=' sm:grid sm:grid-cols-3 xl:grid-cols-4 sm:items-start sm:gap-4 sm:py-6'>
              <label
                htmlFor='dOB'
                className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
              >
                Дата народження
              </label>
              <div className='mt-2 sm:col-span-2 sm:mt-0'>
                <TextInput
                  type='date'
                  id='dOB'
                  withAsterisk
                  radius={'md'}
                  placeholder=''
                  {...form.getInputProps('dOB')}
                />
              </div>
            </div>

            <div className=' sm:grid sm:grid-cols-3 xl:grid-cols-4 sm:items-start sm:gap-4 sm:py-6'>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
              >
                Email
              </label>
              <div className='mt-2 sm:col-span-2 sm:mt-0'>
                <TextInput
                  disabled
                  value={form.values.email}
                  onChange={(event) =>
                    form.setFieldValue('email', event.currentTarget.value)
                  }
                  error={form.errors.email && 'Невірний email'}
                  radius='md'
                />
              </div>
            </div>

            <div className=' sm:grid sm:grid-cols-3 xl:grid-cols-4 sm:items-start sm:gap-4 sm:py-6'>
              <label
                htmlFor='assignedDoctor'
                className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
              >
                Призначений лікар
              </label>
              <div className='mt-2 sm:col-span-2 sm:mt-0'>
                <Select
                  {...form.getInputProps('assignedDoctor')}
                  withAsterisk
                  value={form.values.assignedDoctor}
                  placeholder='Почніть вводити ФІО лікаря щоб знайти його в базі даних'
                  data={doctorsArray.map(
                    (doctor: any, i) => ({
                      value: doctor.id,
                      label: `${doctor.lastName} ${doctor.firstName} ${doctor.middleName}`,
                    }),
                    []
                  )}
                  searchable
                  nothingFound='Нікого не знайдено'
                  maxDropdownHeight={280}
                />
              </div>
            </div>

            <div className=' sm:grid sm:grid-cols-3 xl:grid-cols-4 sm:items-start sm:gap-4 sm:py-6'>
              <label
                htmlFor='street-address'
                className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
              >
                Місце проживання
              </label>
              <div className='mt-2 sm:col-span-2 sm:mt-0'>
                <TextInput
                  value={form.values.placeOfResidence}
                  onChange={(event) =>
                    form.setFieldValue(
                      'placeOfResidence',
                      event.currentTarget.value
                    )
                  }
                  error={
                    form.errors.placeOfResidence &&
                    'Неправильне місце проживання'
                  }
                  radius='md'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button
          type='button'
          className='text-sm font-semibold leading-6 text-gray-900'
        >
          Cancel
        </button>
        <button
          type='submit'
          className='inline-flex justify-center rounded-md bg-brightBlue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brightBlue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brightBlue'
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default compose(
  firestoreConnect(() => ['doctors']),
  connect((state: RootState) => ({
    //@ts-ignore
    doctors: state.firestore.data.doctors,
  }))
)(ProfileForm)
