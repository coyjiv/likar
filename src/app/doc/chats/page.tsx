'use client'

import withApplicationShell from '@/app/components/AppShell'
import NoPatients from '@/app/components/NoPatients/NoPatients'
import useDoctorPatients from '@/hooks/useDoctorPatients'
import withDocAuth from '@/hooks/withDocAuth'
import { TextInput } from '@mantine/core'
import Image from 'next/image'
import { useState } from 'react'

type Props = {}

const ChatsPageDoc = (props: Props) => {
  const patients = useDoctorPatients()
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

  return (
    <div>
      {patients.length > 0 ? (
        <div className='flex'>
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
            <h1 className='text-xl my-10 font-medium text-white'>
              Чат з пацієнтом
            </h1>
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
                  <div className='flex flex-col gap-3 mt-5'>
                    </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <NoPatients />
      )}
    </div>
  )
}

export default withDocAuth(withApplicationShell(ChatsPageDoc))
