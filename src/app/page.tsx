"use client";

import withAuth from "@/hooks/withAuth";
import { useAppSelector } from "@/hooks/redux";
import Walkthrough from "./components/modals/Walkthrough/Walkthrough";
import { useEffect, useState } from "react";
import withApplicationShell from "./components/AppShell";
import { useRouter } from "next/navigation";
import Greeting from "./components/Greeting/Greeting";

function Home() {
  // @ts-ignore
  const currentUser = useAppSelector((state) => state.firebase.profile);
  const [isModalOpened, toggleModal] = useState(
    Boolean(!currentUser.assignedDoctor)
  );
  const router = useRouter()
  useEffect(()=>{
    if(currentUser?.isDoctor){
      router.push('/doc')
    }
  }, [currentUser, router])
  return (
    <main className="flex min-h-screen items-center justify-between overflow-y-hidden">
     {
       currentUser?.username &&
      //  @ts-ignore
      <Walkthrough open={isModalOpened} close={()=>toggleModal(false)} />
     } 
      <Greeting currentUser={currentUser}/>
    </main>
  );
}

export default  withAuth(withApplicationShell(Home));
