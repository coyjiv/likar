import { useAppSelector } from '@/hooks/redux'
import useCurrentDoctor from '@/hooks/useCurrentDoctor'
import { useState } from 'react'
import TimeOption from './TimeOption'
import { Stepper, Button, Group, Textarea } from '@mantine/core'
import { ChevronRightIcon } from '../components/icons'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { Calendar } from '@mantine/dates'
import dayjs from 'dayjs'
import { useCreateAppointment } from '@/hooks/useCreateAppointment'
import { alert } from '@/utils/alert'
import useBusyAppointment from '@/hooks/useBusyAppointment'

type Props = {
  setCreationMode: (value: boolean) => void
}

const CreateAppointment = ({ setCreationMode }: Props) => {
  // const doctorSchedule = useCurrentDoctor()?.appointments
  // @ts-ignore
  const doctorId = useAppSelector((state) => state.firebase.profile.assignedDoctor)
  // @ts-ignore
  const userId = useAppSelector((state) => state.firebase.auth.uid)
  const [activeStep, setActiveStep] = useState(0)
  const [selectedDate, setDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState({
    timeStart: '',
    timeEnd: '',
  })
  const [additionalInfo, setAdditionalInfo] = useState('')

  // console.log('doc shchedule',doctorSchedule);
  
  const createAppointment = useCreateAppointment()
  const busyAppointments = useBusyAppointment(doctorId)
  console.log('busy',busyAppointments);
  

  const nextStep = () =>
    setActiveStep((current) => (current < 3 ? current + 1 : current))
  const prevStep = () =>
    setActiveStep((current) => (current > 0 ? current - 1 : current))

    const currentTime = new Date();

    const isTimeSlotDisabled = (timeSlot:{
      timeStart: string;
      timeEnd: string;
    }) => {
      if (dayjs(selectedDate).isSame(currentTime, 'date')){
        const [hours, minutes] = timeSlot.timeStart.split(':');
        const timeSlotDate = new Date();
        timeSlotDate.setHours(+hours, +minutes, 0, 0);
    
        return timeSlotDate < currentTime; // Compare time slot with current time
      } 
      //todo: check if there are some appointments on this date
      // else if(busyAppointments && busyAppointments.length>0 ){
      //   console.log('there are some');
      //   console.log(dayjs(selectedDate).format('DD/MM/YYYY') in busyAppointments.map(el=>el.date))
        
      // }
      
    };

  const timeForAppointments = [
    { timeStart: '08:00', timeEnd: '08:30' },
    { timeStart: '08:30', timeEnd: '09:00' },
    { timeStart: '09:00', timeEnd: '09:30' },
    { timeStart: '09:30', timeEnd: '10:00' },
    { timeStart: '10:00', timeEnd: '10:30' },
    { timeStart: '10:30', timeEnd: '11:00' },
    { timeStart: '11:00', timeEnd: '11:30' },
    { timeStart: '11:30', timeEnd: '12:00' },
    { timeStart: '12:00', timeEnd: '12:30' },
    { timeStart: '12:30', timeEnd: '13:00' },
    { timeStart: '14:00', timeEnd: '14:30' },
    { timeStart: '14:30', timeEnd: '15:00' },
    { timeStart: '15:00', timeEnd: '15:30' },
    { timeStart: '15:30', timeEnd: '16:00' },
    { timeStart: '16:00', timeEnd: '16:30' },
    { timeStart: '16:30', timeEnd: '17:00' },
    { timeStart: '17:00', timeEnd: '17:30' },
    { timeStart: '17:30', timeEnd: '18:00' },
  ]

  return (
    <>
      <Stepper active={activeStep} breakpoint='sm'>
        <Stepper.Step label='Виберіть дату' description='Виберіть день запису'>
          <p className='my-5 ml-5 font-medium'>Виберіть дату</p>
          <Calendar
            size={'lg'}
            className='flex justify-center'
            
            getDayProps={(date) => ({
              selected: dayjs(selectedDate).isSame(date, 'date'),
              onClick: () =>
                date.getDay() !== 6 && date.getDay() !== 0 && !dayjs(date).isBefore(dayjs(), 'day') && setDate(date),
            })}
          />
        </Stepper.Step>
        <Stepper.Step label='Виберіть час' description='Зі списку доступних'>
          <p className='my-5 ml-5 font-medium'>
            Виберіть час зі списку доступних
          </p>
          <div className='grid justify-center grid-cols-2 lg:grid-cols-3 gap-3'>
            {timeForAppointments.map(({ timeStart, timeEnd }, index) => {
              return (
                <TimeOption
                  key={index}
                  timeStart={timeStart}
                  timeEnd={timeEnd}
                  selectedTime={selectedTime}
                  setTime={setSelectedTime}
                  disabled={isTimeSlotDisabled({timeStart, timeEnd})}
                />
              )
            })}
          </div>
        </Stepper.Step>
        <Stepper.Step
          label='Додаткова інформація'
          description='Деталі з приводу візиту'
        >
          <Textarea
            onChange={e=>setAdditionalInfo(e.currentTarget.value)}
            value={additionalInfo}
            placeholder='Укажіть про те, що вас хвилює'
            label='Додаткова інформація'
            autosize
            minRows={2}
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
      <div className='flex justify-center gap-3 mt-5 ml-5'>
        <Button
          variant={'default'}
          onClick={() =>
            activeStep === 0 ? setCreationMode(false) : prevStep()
          }
        >
          Назад
        </Button>
        <Button
          variant={'default'}
          disabled={activeStep === 0 ? false : activeStep!==2? !selectedTime.timeStart : additionalInfo.length === 0 }
          onClick={() => {
            switch (activeStep) {
              case 0:
                if (selectedDate) {
                  nextStep()
                }
                break
              case 1:
                if (selectedTime.timeStart) {
                  nextStep()
                }
                break
              case 2:
                if (additionalInfo) {
                  createAppointment(doctorId, userId, {
                    date: selectedDate,
                    timeStart: selectedTime.timeStart,
                    timeEnd: selectedTime.timeEnd,
                    additionalInfo
                  })
                  alert('Ви успішно записались на прийом','success')
                  setCreationMode(false)
                  setAdditionalInfo('')
                  
                }
                break

              default:
                break
            }
          }}
        >
          {activeStep === 2 ? 'Записатися' : 'Далі'}
        </Button>
      </div>
    </>
  )
}

export default CreateAppointment
