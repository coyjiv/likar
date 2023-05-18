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

const ViewMedCardModal = ({ opened, close, userData }: Props) => {

  return (
    <Modal opened={opened} onClose={close} title='Мед карта'>
        <div>
            <div className='flex items-center space-x-2'>
                <span>Ім'я: </span>
                <span>{userData?.firstName}</span>
        </div>
        <div className='flex items-center space-x-2'>
                <span>Прізвище: </span>
                <span>{userData?.lastName}</span>
        </div>
        <div className='flex items-center space-x-2'>
                <span>По батькові: </span>
                <span>{userData?.middleName}</span>
        </div>
        <div className='flex items-center space-x-2'>
                <span>Номер телефону: </span>
                <span>{userData?.phoneNumber}</span>
        </div>
        <div className='flex items-center space-x-2'>
                <span>Номер карти: </span>
                <span>{userData?.cardNumber}</span>
        </div>
        <div className='flex items-center space-x-2'>
                <span>Стать: </span>
                <span>{userData?.sex}</span>
        </div>
        <div className='flex items-center space-x-2'>
                <span>Дата народження: </span>
                <span>{userData?.dOB}</span>
        </div>
        <div className='flex items-center space-x-2'>
                <span>Група інвалідності: </span>
                <span>{userData?.disablityGroup}</span>
        </div>
        <div className='flex items-center space-x-2'>
                <span>Хронічні захворювання: </span>
                <span>{userData?.chronicDiseases}</span>
        </div>
        <div className='flex items-center space-x-2'>
                <span>Непереносимість: </span>
                <span>{userData?.intolerance}</span>
        </div>
        <div className='flex items-center space-x-2'>
                <span>Анамнез: </span>
                <span>{userData?.anamnesis}</span>
        </div>
        <div className='flex items-center space-x-2'>
                <span>Діагноз: </span>
                <span>{userData?.diagnosis}</span>
        </div>
        <div className='flex items-center space-x-2'>
                <span>Рекомендації: </span>
                <span>{userData?.recomendations}</span>
        </div>

        </div>
    </Modal>
  )
}

export default ViewMedCardModal
