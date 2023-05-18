import React from 'react'

type Props = {
    fromName: string
    message: string
    timeSent: string
    userId: string
    messag: any
}

const MessageItem = ({fromName, message, messag, userId, timeSent,...props}: Props) => {
  return (
    <div className={`flex flex-col w-80 ${userId===messag.senderId? 'ml-auto mr-4': 'ml-4'}`}>
         <span className='mr-auto translate-y-2 text-center text-sm text-gray-500'>{userId===messag.senderId?'Ви':'Ваш лікар'}</span>
        <div className='flex flex-col items-start bg-white rounded-lg p-3 mt-3'>
            <span className='text-sm text-gray-500'>{message}</span>
            <span className='text-xs text-gray-500'>{ timeSent}</span>
            </div>
    </div>
  )
}

export default MessageItem