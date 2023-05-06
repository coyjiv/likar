'use client';

import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount } from './store/Features/counter/counterSlice';
import { RootState } from './store/store';

export default function Home() {
  // const dispatch = useDispatch();
  // const count = useSelector((state: RootState) => state.counter.value);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <h1>Count is {count}</h1>
      <button onClick={()=>dispatch(increment())}>Increase the count by 1</button>
      <button onClick={()=>dispatch(decrement())}>Decrease the count by 1</button> */}
    </main>
  )
}
