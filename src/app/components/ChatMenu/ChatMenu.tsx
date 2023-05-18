import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Button, Menu } from '@mantine/core'
import React from 'react'

type Props = {}

const ChatMenu = (props: Props) => {
  return (
    <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button variant={'default'} className='flex justify-center'><EllipsisVerticalIcon className='w-5 h-5  text-black'/></Button>
        </Menu.Target>
  
        <Menu.Dropdown>
          <Menu.Item>Заповнити мед.карту</Menu.Item>
          <Menu.Item disabled>Переглянути мед.карту</Menu.Item>
        </Menu.Dropdown>
      </Menu>
  )
}

export default ChatMenu