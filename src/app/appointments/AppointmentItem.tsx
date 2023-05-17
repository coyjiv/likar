import { useDeleteAppointment } from '@/hooks/useDeleteAppointment'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Button } from '@mantine/core'
import dayjs from 'dayjs'
import { IAppointment } from '@/types'



const AppointmentItem = ({ appointment }: {appointment:IAppointment}) => {
  const { timeStart, timeEnd, date, id, doctorUid, userUid } = appointment
  const dateN = dayjs.unix(date?.seconds).format('DD/MM/YYYY')
  const removeAppointment = useDeleteAppointment()
  return (
    <div className='rounded-md my-4 bg-slate-400/30 shadow-lg flex items-center gap-3 py-5 px-3'>
      <p className='font-medium'>{dateN}</p>
      <p>{`${timeStart} - ${timeEnd}`}</p>
      <TrashIcon aria-label='Видалити візит' className='ml-auto w-5 h-5 hover:scale-105 transition-all cursor-pointer text-black' onClick={()=>removeAppointment(doctorUid,userUid,id)} />
    </div>
  )
}

export default AppointmentItem
