'use client'

import MessageItem from '@/app/chat/MessageItem'
import withApplicationShell from '@/app/components/AppShell'
import NoPatients from '@/app/components/NoPatients/NoPatients'
import { useAppSelector } from '@/hooks/redux'
import useDocMessages from '@/hooks/useDocMessages'
import useDoctorPatients from '@/hooks/useDoctorPatients'
import useMessages from '@/hooks/useMessages'
import withDocAuth from '@/hooks/withDocAuth'
import { sendMessage } from '@/utils/sendMessage'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Button, Menu, Textarea, TextInput } from '@mantine/core'
import Image from 'next/image'
import { useState } from 'react'
import MedCardModal from './MedCardModal'
import ViewMedCardModal from './ViewMedCardModal'

type Props = {}

const ChatsPageDoc = (props: Props) => {
  const patients = useDoctorPatients()
  const userUID = useAppSelector((state) => state.firebase.auth?.uid)
  const [modalOpened, setModalOpened] = useState(false)
  const [modalViewOpened, setModalViewOpened] = useState(false)
  const [search, setSearch] = useState('')
  const [choosenPatient, setChoosenPatient] = useState<any>(null)

  const filteredPatients = patients
    .filter(
      (patient) =>
        patient?.lastName.toLowerCase().includes(search.toLowerCase()) ||
        patient?.firstName.toLowerCase().includes(search.toLowerCase()) ||
        patient?.middleName.toLowerCase().includes(search.toLowerCase())
    )
    .map((patient) => (
      <li
        onClick={() => setChoosenPatient(patient)}
        key={patient.id}
        className='flex items-center space-x-2'
      >
        <Image
          width={30}
          height={30}
          src={patient.avatarUrl}
          alt=''
          className='w-10 h-10 rounded-full'
        />
        <span>
          {patient?.lastName +
            ' ' +
            patient?.firstName +
            ' ' +
            patient?.middleName}
        </span>
      </li>
    ))

  const [message, setMessage] = useState('')
  const messages = useDocMessages(userUID)
  console.log('messages', messages)
  const getRelatedMessages = (messages, choosenPatientId) => {
    return messages.filter(
      (message) =>
        message.recipientId === choosenPatientId ||
        message.senderId === choosenPatientId
    );
  };
  const relatedMessages = getRelatedMessages(messages, choosenPatient?.id);

  return (
    <div>
      {patients.length > 0 ? (
        <div className='flex overflow-clip'>
          {/* Вибір пацієнта  */}
          <div className='w-1/3 bg-sky-300 h-[95vh] px-3 rounded-lg rounded-tr-none rounded-br-none'>
            <h1 className='text-xl my-10 font-medium text-white'>
              Ваші пацієнти
            </h1>
            <TextInput
              placeholder='Пошук пацієнта'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              radius={'md'}
              className='w-full'
            />
            <ul className='space-y-2 p-3 mt-3 bg-slate-100 rounded-xl'>
              {search.length > 0
                ? filteredPatients
                : patients.map((patient) => (
                    <li
                      onClick={() => setChoosenPatient(patient)}
                      key={patient.id}
                      className='flex items-center space-x-2'
                    >
                      <Image
                        width={30}
                        height={30}
                        src={patient.avatarUrl}
                        alt=''
                        className='w-10 h-10 rounded-full'
                      />
                      <span>
                        {patient?.lastName +
                          ' ' +
                          patient?.firstName +
                          ' ' +
                          patient?.middleName}
                      </span>
                    </li>
                  ))}
            </ul>
          </div>
          {/* Чат з пацієнтом  */}
          <div className='w-2/3 border-l-4 border-sky-800/20 bg-sky-300 h-[95vh] px-3 rounded-lg rounded-tl-none rounded-bl-none'>
            <div className='flex justify-between items-center'>
              <h1 className='text-xl my-10 font-medium text-white'>
                Чат з пацієнтом
              </h1>
              <Menu shadow='md' width={200}>
                <Menu.Target>
                  <Button
                    disabled={!choosenPatient}
                    variant={'default'}
                    className='flex justify-center'
                  >
                    <EllipsisVerticalIcon className='w-5 h-5  text-black' />
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item onClick={() => setModalOpened(true)}>
                    Заповнити мед.карту
                  </Menu.Item>
                  <Menu.Item disabled={!choosenPatient?.medCard} onClick={() => setModalViewOpened(true)}>Переглянути мед.карту</Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <MedCardModal
                opened={modalOpened}
                close={() => setModalOpened(false)}
                userData={choosenPatient}
              />
              <ViewMedCardModal opened={modalViewOpened} close={()=>setModalViewOpened(false)} userData={choosenPatient?.medCard} />
            </div>
            {choosenPatient ? (
              <>
                <div className='flex flex-col gap-3'>
                  <div className='flex items-center space-x-2'>
                    <Image
                      width={30}
                      height={30}
                      src={choosenPatient.avatarUrl}
                      alt=''
                      className='w-10 h-10 rounded-full'
                    />
                    <span>
                      {choosenPatient?.lastName +
                        ' ' +
                        choosenPatient?.firstName +
                        ' ' +
                        choosenPatient?.middleName}
                    </span>
                  </div>
                </div>
                <div className='min-h-[95vh] bg-sky-300 rounded-lg'>
                  {relatedMessages.length > 0 ? (
                    <>
                      {relatedMessages.reverse().map((message: any) => {
                        return (
                          <MessageItem
                            key={message.id}
                            messag={message}
                            userId={userUID}
                            fromName={message.fromName}
                            message={message.message}
                            timeSent={message.timeSent}
                          />
                        )
                      })}
                    </>
                  ) : (
                    <h2 className='translate-y-32 text-center'>
                      Немає повідомлень
                    </h2>
                  )}
                </div>
              </>
            ) : (
              <>
              </>
            )}
            <div className='fixed bottom-5 flex items-center'>
        <Textarea value={message} onChange={e=>setMessage(e.target.value)} autosize w={'40vw'} className='-translate-x-20' placeholder='Введіть повідомлення' />
        <Button className='-translate-x-5' disabled={message.length===0 || !choosenPatient} onClick={()=>{sendMessage(userUID, choosenPatient.id, message); setMessage('')}} variant='light'>Відправити</Button>
      </div>
          </div>
        </div>
      ) : (
        <NoPatients />
      )}
    </div>
  )
}

export default withDocAuth(withApplicationShell(ChatsPageDoc))
