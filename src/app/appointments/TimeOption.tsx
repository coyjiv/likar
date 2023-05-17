import { Button } from '@mantine/core'
import React from 'react'

type Props = {
    timeStart: string
  timeEnd: string
  setTime: React.Dispatch<React.SetStateAction<{
    timeStart: string;
    timeEnd: string;
  }>>
  selectedTime: {
    timeStart: string
    timeEnd: string
  }
  disabled?: boolean
}

const TimeOption = ({timeStart, timeEnd, setTime, selectedTime, disabled}: Props) => {
  const isSelected = selectedTime.timeStart === timeStart && selectedTime.timeEnd === timeEnd
    return (
      <>
        <div className='flex flex-col gap-3 items-center'>
          <Button disabled={disabled} variant={isSelected? 'outline' :'default'} onClick={() => setTime({
            timeStart,
            timeEnd
          })}>
          {`${timeStart} - ${timeEnd}`}
          </Button>
        </div>
        
      </>
    )
}

export default TimeOption