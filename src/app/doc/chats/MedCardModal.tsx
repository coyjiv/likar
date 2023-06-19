import { Button, Group, Modal, Radio, TextInput, Textarea } from '@mantine/core'
import { RadioGroup } from '@mantine/core/lib/Radio/RadioGroup/RadioGroup'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'
import { useFirestore } from 'react-redux-firebase'

type Props = {
  opened: boolean
  userData: any
  close: () => void
}

const MedCardModal = ({ opened, close, userData }: Props) => {
  console.log('userData', userData)
  const firestore = useFirestore()

  const form = useForm({
    initialValues: {
      firstName: userData?.firstName ?? '',
      lastName: userData?.lastName ?? '',
      middleName: userData?.middleName ?? '',
      phoneNumber: userData?.phoneNumber ?? '',
      cardNumber: userData?.cardNumber ?? '',
      sex: userData?.sex ?? '',
      dOB: userData?.dOB ?? '',
      disablityGroup: userData?.disablityGroup ?? '',
      chronicDiseases: userData?.chronicDiseases ?? '',
      intolerance: userData?.intolerance ?? '',
      anamnesis: userData?.anamnesis ?? '',
      diagnosis: userData?.diagnosis ?? '',
      recomendations: userData?.recomendations ?? '',
    },
  })

  return (
    <Modal opened={opened} onClose={close} title='Електронна медична карта'>
      <form
        onSubmit={form.onSubmit((values) => {
          firestore.update(
            { collection: 'users', doc: userData.id },
            {
              medCard: values,
            }
          );
            close()
        })}
      >
        <TextInput
          label='First name'
          placeholder='Your first name'
          required
          {...form.getInputProps('firstName')}
        />
        <TextInput
          label='Last name'
          placeholder='Your last name'
          required
          {...form.getInputProps('lastName')}
        />
        <TextInput
          label='Middle name'
          placeholder='Your middle name'
          required
          {...form.getInputProps('middleName')}
        />
        <TextInput
          label='Phone number'
          placeholder='Your phone number'
          required
          {...form.getInputProps('phoneNumber')}
        />
        <TextInput
          label='Card number'
          placeholder='Your card number'
          required
          {...form.getInputProps('cardNumber')}
        />
        <Radio.Group
          name='sex'
          {...form.getInputProps('sex')}
          my='sm'
          classNames={{ error: 'mt-2' }}
          label='Оберіть стать'
          description=''
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
          label='Група інвалідності'
          {...form.getInputProps('disablityGroup')}
        />
        <TextInput
          label='Хронічні захворювання'
          {...form.getInputProps('chronicDiseases')}
        />
        <TextInput
          label='Непереносимість'
          {...form.getInputProps('intolerance')}
        />
        <Textarea
          autosize
          label='Анамнез'
          {...form.getInputProps('anamnesis')}
        />
        <TextInput label='Діагноз' {...form.getInputProps('diagnosis')} />
        <TextInput
          label='Рекомендації'
          {...form.getInputProps('recomendations')}
        />
        <Group position='right' mt='md'>
          <Button className='bg-[#3d8fd9]' type='submit'>
            Далі
          </Button>
        </Group>
      </form>
    </Modal>
  )
}

export default MedCardModal
