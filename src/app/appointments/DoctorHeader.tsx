import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { PhoneIcon, AtSymbolIcon } from '@heroicons/react/24/outline';


const useStyles = createStyles((theme) => ({
    icon: {
      color: 'black'
    },
  
    name: {
      
    },
  }));


type Props = {
    avatar: string;
  name: string;
  title: string;
  phone: string;
  email: string;
}

const DoctorHeader = ({ avatar, name, title, phone, email }: Props) => {
    const { classes } = useStyles();
  return (
    <div className='flex justify-center bg-slate-400/30 py-4 rounded-lg'>
    <Group noWrap>
      <Avatar src={avatar} size={94} radius="md" />
      <div>
        <Text fz="xs" tt="uppercase" fw={700} c='black'>
          {title}
        </Text>

        <Text fz="lg" fw={500} className={'text-black'}>
          {name}
        </Text>

        <Group noWrap spacing={10} mt={3}>
          <AtSymbolIcon className={classes.icon+' w-[1rem]'} />
          <Text fz="xs" c='black'>
            {email}
          </Text>
        </Group>

        <Group noWrap spacing={10} mt={5}>
          <PhoneIcon className={classes.icon+' w-[1rem]'} />
          <Text fz="xs" c='black'>
            {phone}
          </Text>
        </Group>
      </div>
    </Group>
  </div>
  )
}

export default DoctorHeader
