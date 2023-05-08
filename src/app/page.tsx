'use client'

import withAuth from '@/hooks/withAuth'
import Image from 'next/image'
import { NavbarSimpleColored } from './components/Navbar'
import { RootState } from './store'

function Home() {
  // const dispatch = useDispatch();
  // const count = useSelector((state: RootState) => state.counter.value);
  return (
    <main className='flex min-h-screen items-center justify-between'>
      <NavbarSimpleColored />
      <div>test</div>
    </main>
  )
}

export default withAuth(Home)
