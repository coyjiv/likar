'use client'
import withApplicationShell from '@/app/components/AppShell'
import ProfileForm from '@/app/components/forms/ProfileForm'
import withDocAuth from '@/hooks/withDocAuth'


type Props = {}

const DoctorsProfile = (props: Props) => {
  return (
    // @ts-ignore
    <ProfileForm forDoc />
  )
}

export default withDocAuth(withApplicationShell(DoctorsProfile))  