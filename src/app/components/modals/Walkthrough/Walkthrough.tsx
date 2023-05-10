import React, { memo, useEffect, useMemo, useState } from 'react'
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
import { getAuth, onAuthStateChanged, sendEmailVerification, updateProfile } from 'firebase/auth'
import { useFirestore } from 'react-redux-firebase'

type Props = {
  open: boolean
}

const Walkthrough = memo(function Walkthought({ open }: Props) {
  const auth = getAuth();
  const [isEmailVerified, setEmailVerified] = useState(auth.currentUser?.emailVerified)
  const firestore = useFirestore();
  const profile = useAppSelector((state) => state.firebase.profile)
  const doctors = useAppSelector((state) => state.firestore.data.doctors)
  const doctorsArray = useMemo(() => Object.values(doctors || {}), [doctors])
  console.log(doctorsArray)

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
      assignedDoctor: (value) =>
        value ? null: 'Оберіть лікаря',
    },
  })
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          console.log('User email is verified');
          setEmailVerified(true)
        }
      }
    });
  
    // Clean up the observer when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const [active, setActive] = useState(profile?.lastName?1:0)
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
    return await firestore.collection('users').doc(auth?.currentUser?.uid).set(values, { merge: true })
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
        onClose={close}
        title='Вітаємо!'
        withCloseButton={false}
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
                        if (auth?.currentUser) sendEmailVerification(auth?.currentUser)

                        handleStepChange(active + 1)
                      } catch (error) {
                        console.error('Error updating profile: ', error);
                        
                      }
                     },
                    (validationErrors, _values, _event) => { console.log(validationErrors) }
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
                    classNames={{error:'mt-2'}}
                    label='Оберіть стать'
                    description='Нажаль, їх існує тільки дві'
                    withAsterisk
                  >
                    <Group mt='xs'>
                      <Radio {...form.getInputProps('sex')} classNames={{error:'hidden'}} value='Чоловік' label='Чоловік' />
                      <Radio {...form.getInputProps('sex')} classNames={{error:'hidden'}} value='Жінка' label='Жінка' />
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
                      (doctor:any, i) => ({
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
                    <Button className='bg-black' type='submit'>
                      Далі
                    </Button>
                  </Group>
                </form>
              </Box>
            </Stepper.Step>
            <Stepper.Step label='Другий крок' description='Підтвердіть email'>
              <h1 className='underline cursor-pointer' onClick={()=>{
                if (auth?.currentUser) sendEmailVerification(auth?.currentUser)
              }}>Step 2 content: Verify email</h1>
              {(isEmailVerified || auth?.currentUser?.emailVerified) && <h1>Ви верифіковані!</h1>}
            </Stepper.Step>
            <Stepper.Step label='Фінальний крок' description='Додайте аватар'>
              <h1>Додайте аватар</h1>
            </Stepper.Step>

            <Stepper.Completed>
              <h1>Completed, click back button to get to previous step</h1>
            </Stepper.Completed>
          </Stepper>

          <Group position='center' mt='xl'>
            <Button
              variant='default'
              onClick={() => handleStepChange(active - 1)}
            >
              Back
            </Button>
            <Button onClick={() => handleStepChange(active + 1)}>
              Next step
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
    doctors: state.firestore.data.doctors,
  }))
)(Walkthrough)
