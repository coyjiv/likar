import React, { ChangeEvent, memo, useEffect, useMemo, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import {
  Modal,
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Avatar,
  Stepper,
  Select,
  Radio,
} from '@mantine/core'

import { useForm } from '@mantine/form'
import { firestoreConnect, useFirebase } from 'react-redux-firebase'
import { useAppSelector } from '@/hooks/redux'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RootState } from '@/app/store'
import {
  getAuth,
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth'
import { useFirestore } from 'react-redux-firebase'
import Lottie from 'lottie-react'
import confirmation from '@/assets/lottie/confirmation.json'

type Props = {
  open: boolean
  close: () => void
}

const Walkthrough = memo(function Walkthought({
  open,
  close: closeModal,
}: Props) {
  //@ts-ignore
  const uid = useAppSelector((state) => state.firebase.auth.uid)
  const auth = getAuth()
  const firebase = useFirebase()
  const [isEmailVerified, setEmailVerified] = useState(
    auth.currentUser?.emailVerified
  )
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const [file, setFile] = useState<File>();

  const firestore = useFirestore()
  //@ts-ignore
  const profile = useAppSelector((state) => state.firebase.profile)
  //@ts-ignore
  const doctors = useAppSelector((state) => state.firestore.data.doctors)
  const doctorsArray = useMemo(() => Object.values(doctors || {}), [doctors])
  console.log(doctorsArray)

  const checkEmailVerification = async () => {
    if (auth.currentUser) {
      await reload(auth.currentUser) // This doesn't cause a full page reload, just refreshes the auth token.
      const isEmailVerified = auth.currentUser.emailVerified
      console.log('Email verification status: ', isEmailVerified)
      setEmailVerified(isEmailVerified) // Assuming setEmailVerified updates a state variable.
    }
  }

  const [opened, { close }] = useDisclosure(false)
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      dOB: '',
      sex: '',
      assignedDoctor: '',
      placeOfResidence: '',
    },
    validateInputOnChange: true,
    validateInputOnBlur: true,
    validate: {
      firstName: (value) => (value.length < 2 ? 'Введіть своє імʼя' : null),
      lastName: (value) => (value.length < 2 ? 'Введіть свою фамілію' : null),
      placeOfResidence: (value) =>
        value.length < 5 ? 'Введіть своє місце проживання' : null,
      sex: (value) => (value.length < 2 ? 'Оберіть свою стать' : null),
      dOB: (value) =>
        /-?\d+(\.\d+)?/.test(value) ? null : 'Виберіть дату народження',
      assignedDoctor: (value) => (value ? null : 'Оберіть лікаря'),
    },
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          console.log('User email is verified')
          setEmailVerified(true)
        }
      }
    })

    // Clean up the observer when the component unmounts
    return () => {
      unsubscribe()
    }
  }, [auth])

  const [active, setActive] = useState(profile?.lastName ? 1 : 0)
  const [highestStepVisited, setHighestStepVisited] = useState(active)

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0

    if (isOutOfBounds) {
      return
    }

    setActive(nextStep)
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep))
  }

  async function updateUserProfile(values: any) {
    return await firestore
      .collection('users')
      .doc(auth?.currentUser?.uid)
      .set(values, { merge: true })
  }

  return (
    <>
      <Modal
        className='z-[99]'
        classNames={{
          body: 'px-10',
          title: 'text-center font-medium text-2xl mt-3 ml-3',
        }}
        size={'auto'}
        opened={open}
        onClose={() => {
          closeModal()
          close()
        }}
        title='Вітаємо!'
        withCloseButton={active === 2}
      >
        <>
          <Stepper mt={10} active={active} breakpoint='sm'>
            <Stepper.Step
              label='Перший крок'
              description='Додайте додаткові дані'
            >
              <Box mx='auto'>
                <form
                  onSubmit={form.onSubmit(
                    (values, _event) => {
                      try {
                        updateUserProfile(values)
                        if (auth?.currentUser)
                          sendEmailVerification(auth?.currentUser)

                        handleStepChange(active + 1)
                      } catch (error) {
                        console.error('Error updating profile: ', error)
                      }
                    },
                    (validationErrors, _values, _event) => {
                      console.log(validationErrors)
                    }
                  )}
                  className='flex flex-col gap-2'
                >
                  <TextInput
                    withAsterisk
                    label="Ім'я"
                    placeholder='Анна'
                    {...form.getInputProps('firstName')}
                  />
                  <TextInput
                    withAsterisk
                    label='Прізвище'
                    placeholder='Зубко'
                    {...form.getInputProps('lastName')}
                  />
                  <Radio.Group
                    name='sex'
                    {...form.getInputProps('sex')}
                    my='sm'
                    classNames={{ error: 'mt-2' }}
                    label='Оберіть стать'
                    description='Нажаль, їх існує тільки дві'
                    withAsterisk
                  >
                    <Group mt='xs'>
                      <Radio
                        {...form.getInputProps('sex')}
                        classNames={{ error: 'hidden' }}
                        value='Чоловік'
                        label='Чоловік'
                      />
                      <Radio
                        {...form.getInputProps('sex')}
                        classNames={{ error: 'hidden' }}
                        value='Жінка'
                        label='Жінка'
                      />
                    </Group>
                  </Radio.Group>
                  <TextInput
                    type='date'
                    withAsterisk
                    label='Дата народження'
                    placeholder=''
                    {...form.getInputProps('dOB')}
                  />
                  <TextInput
                    withAsterisk
                    label='Місце проживання'
                    placeholder='вул. Миколи Грінченка, 1, кв. 1'
                    {...form.getInputProps('placeOfResidence')}
                  />
                  <Select
                    {...form.getInputProps('assignedDoctor')}
                    label='Призначений лікар'
                    withAsterisk
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
                  <Group position='right' mt='md'>
                    <Button className='bg-[#3d8fd9]' type='submit'>
                      Далі
                    </Button>
                  </Group>
                </form>
              </Box>
            </Stepper.Step>
            <Stepper.Step label='Другий крок' description='Підтвердіть email'>
              <div className='flex flex-col items-center justify-center'>
                {isEmailVerified || auth?.currentUser?.emailVerified ? (
                  <div className='my-10 flex flex-col items-center justify-center gap-4'>
                    <h1 className='font-medium'>Ви верифіковані!</h1>
                    <div className='w-10 '>
                      <Lottie animationData={confirmation} loop={false} />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className='font-medium text-center my-10'>
                      Підтвердіть email
                    </h1>
                    <h5>
                      Відкрийте вашу пошту та перейдіть за посиланням для верифікації, а потім натисніть <span onClick={()=>checkEmailVerification()} className='underline font-medium cursor-pointer'>сюди</span>
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
            <Stepper.Step label='Фінальний крок' description='Додайте аватар'>
              <h1>Додайте аватар</h1>
              <div className=' sm:grid sm:grid-cols-3 xl:grid-cols-4 sm:items-center sm:gap-4 sm:py-6'>
              <label
                htmlFor='photo'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Аватар
              </label>
              <div className='mt-2 sm:col-span-2 sm:mt-0'>
                <div className='flex items-center gap-x-3'>
                  <Avatar src={file && URL.createObjectURL(file)} size={40} radius='xl' />
                  <button
                    type='button'
                    className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Змінити
                  </button>
                  {file && 
                  <>
                    <button
                      type='button'
                      className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                      onClick={() => {
                        firebase.uploadFile(`avatars/${uid}`, file).then((res) => {
                          res.uploadTaskSnapshot.ref.getDownloadURL().then((downloadURL) => {
                            updateUserProfile({avatarUrl: downloadURL})
                            setFile(undefined)
                          });
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
                  </>}
                  <input onChange={handleFileChange} ref={fileInputRef} type='file' className='hidden' />
                </div>
              </div>
            </div>
            </Stepper.Step>

            <Stepper.Completed>
              <h1>Completed, click back button to get to previous step</h1>
            </Stepper.Completed>
          </Stepper>

          <Group
            display={active !== 0 ? 'flex' : 'none'}
            position='center'
            mt='xl'
          >
            <Button
              variant='default'
              disabled={active === 1}
              onClick={() => handleStepChange(active - 1)}
            >
              Назад
            </Button>
            <Button
              className='bg-[#3d8fd9]'
              onClick={() => active === 2? closeModal() : handleStepChange(active + 1)}
            >
              {active===2? 'Закінчити' : 'Далі'}
            </Button>
          </Group>
        </>
      </Modal>
    </>
  )
})

export default compose(
  firestoreConnect(() => ['doctors']),
  connect((state: RootState) => ({
    // @ts-ignore
    doctors: state.firestore.data.doctors,
  }))
)(Walkthrough)
