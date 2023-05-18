import { useDeleteAppointment } from '@/hooks/useDeleteAppointment'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Button } from '@mantine/core'
import dayjs from 'dayjs'
import { IAppointment } from '@/types'
import { fetchUserById } from '@/utils/fetchUserById'
import { useEffect, useState } from 'react'

const AppointmentItem = ({
  appointment,
  forDoc,
}: {
  appointment: IAppointment
  forDoc?: boolean
}) => {
  const { timeStart, timeEnd, date, id, doctorUid, userUid } = appointment
  const dateN = dayjs.unix(date?.seconds).format('DD/MM/YYYY')
  const removeAppointment = useDeleteAppointment()
  const [data, setData] = useState<any>({})

  useEffect(() => {
    const fetcher = async () => {
      const patientData = await fetchUserById(userUid)
      const doctorData = await fetchUserById(doctorUid)
      setData({ patientData, doctorData })
    }
    fetcher()
  }, [userUid, doctorUid])

  return (
    <div className='rounded-md my-4 bg-slate-400/30 shadow-lg flex items-center gap-3 py-5 px-3'>
      <p className='font-medium'>{dateN}</p>
      <span>|</span>
      <p>{`${timeStart} - ${timeEnd}`}</p>
      <span>|</span>
      <p className='max-w-[300px] whitespace-pre-wrap break-words'>
        Додаткова інформація : {appointment.additionalInfo}
      </p>
      <span>|</span>
      {forDoc ? (
        <p>
          Пацієнт :{' '}
          {data?.patientData?.firstName +
            ' ' +
            data?.patientData?.lastName +
            ' ' +
            data?.patientData?.middleName}
        </p>
      ) : (
        <p>
          Доктор :{' '}
          {data?.doctorData?.firstName +
            ' ' +
            data?.doctorData?.lastName +
            ' ' +
            data?.doctorData?.middleName}
        </p>
      )}
      {forDoc && (
        <>
          <span>|</span>
          <p>
            Доктор :{' '}
            {data?.doctorData?.firstName +
              ' ' +
              data?.doctorData?.lastName +
              ' ' +
              data?.doctorData?.middleName}
          </p>
        </>
      )}

      <TrashIcon
        aria-label='Видалити візит'
        className='ml-auto w-5 h-5 hover:scale-105 transition-all cursor-pointer text-black'
        onClick={() => removeAppointment(doctorUid, userUid, id)}
      />
    </div>
  )
}

export default AppointmentItem
