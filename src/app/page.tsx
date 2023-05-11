"use client";

import withAuth from "@/hooks/withAuth";
import { useAppSelector } from "@/hooks/redux";
import Walkthrough from "./components/modals/Walkthrough/Walkthrough";
import { useState } from "react";
import withApplicationShell from "./components/AppShell";

function Home() {
  const currentUser = useAppSelector((state) => state.firebase.profile);
  const [isModalOpened, toggleModal] = useState(
    Boolean(!currentUser.assignedDoctor)
  );
  return (
    <main className="flex min-h-screen items-center justify-between">
     {
       currentUser?.username &&
      //  @ts-ignore
      <Walkthrough open={isModalOpened} close={()=>toggleModal(false)} />
     } 
      <div>test</div>
    </main>
  );
}

export default  withAuth(withApplicationShell(Home));
