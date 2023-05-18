'use client';

import { useAppSelector } from '@/hooks/redux';
import useMessages from '@/hooks/useMessages';
import withAuth from '@/hooks/withAuth';
import { IDoctor } from '@/types';
import { sendMessage } from '@/utils/sendMessage';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Button, Menu, Modal, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import { useFirestore } from 'react-redux-firebase';
import DoctorHeader from '../appointments/DoctorHeader';
import withApplicationShell from '../components/AppShell';
import MessageItem from './MessageItem';

type Props = {}

const ChatPage = (props: Props) => {
  const [doctor, setDoctor] = useState<IDoctor | null>(null)
  const firestore = useFirestore()
  const userUID = useAppSelector(state=>state.firebase.auth?.uid)
  const doctorUID = useAppSelector(state=>state.firebase.profile.assignedDoctor)

  const [opened, { open, close }] = useDisclosure(false);

  const [message, setMessage] = React.useState('')
  const messages = useMessages(userUID, doctorUID)
  console.log(messages)

  useEffect(() => {
    if(!userUID) return
    const fetchDoctor = async () => {
      const userDoc = await firestore.collection('users').doc(userUID).get()
      const userData = userDoc.data()
      const doctorDoc: any = await firestore
        .collection('doctors')
        .doc(userData?.assignedDoctor)
        .get()
      if (doctorDoc != null) setDoctor(doctorDoc.data())
    }

    fetchDoctor()
  }, [firestore, userUID])

  if (!doctor || !userUID) return null // Loading
  
  
  return (
    <div className='h-screen'>
      <div className='sticky top-5'>
      <DoctorHeader
        avatar=''
        email={doctor?.email ?? ''}
        name={`${doctor?.firstName ?? ''} ${doctor?.lastName ?? ''} ${
          doctor?.middleName ?? ''
        }`}
        phone={doctor?.phoneNumber ?? ''}
        title='Ваш лікар'
      />
        <div className='absolute top-10 right-5'>
           
        </div>
      </div>

      <div className='min-h-[95vh] bg-sky-300 rounded-lg'>
        {messages.length > 0 ? (<>
        {messages.reverse().map((message:any)=>{
          return <MessageItem key={message.id} messag={message} userId={userUID} fromName={message.fromName} message={message.message} timeSent={message.timeSent} />
        })
        }
        </>) : <h2 className='translate-y-32 text-center'>Немає повідомлень</h2>}
        </div>
      
      <div className='fixed bottom-5 flex items-center'>
        <Textarea value={message} onChange={e=>setMessage(e.target.value)} autosize w={'60vw'} className='translate-x-24' placeholder='Введіть повідомлення' />
        <Button className='-translate-x-5' disabled={message.length===0} onClick={()=>{sendMessage(userUID, doctorUID, message); setMessage('')}} variant='light'>Відправити</Button>
      </div>
    </div>
  )
}

export default withAuth(withApplicationShell(ChatPage))