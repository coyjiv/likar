import { useAppSelector } from '@/hooks/redux'
import { Avatar } from '@mantine/core'
import Link from 'next/link'
import React, { memo } from 'react'
import { ChevronRightIcon } from '../icons'

type Props = {
  image: string
  name: string
  email: string
}

const UserButton = ({ image, name, email }: Props) => {
  return (
    <Link href={'/profile'} className='flex gap-3 items-center relative sm:hover:bg-white/30 py-5 px-3 rounded-md cursor-pointer transition-all'>
      <Avatar src={image ?? ''} className='absolute scale-90 sm:scale-100 sm:static left-0' alt='user avatar' radius={30} />
      <div className='hidden sm:flex flex-col text-white'>
        <span className='text-sm font-semibold'>{name}</span>
        <span className='text-xs'>{email}</span>
      </div>
      <ChevronRightIcon className='hidden sm:block absolute right-2 w-3 text-white'/>
    </Link>
  )
}

export default memo(UserButton)
