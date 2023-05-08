"use client";

import withAuth from "@/hooks/withAuth";
import Image from "next/image";
import { NavbarSimpleColored } from "./components/Navbar";
import { RootState } from "./store";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Walkthrough from "./components/modals/Walkthrough/Walkthrough";
import { useState } from "react";

function Home() {
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.firebase.profile);
  const [isModalOpened, toggleModal] = useState(
    Boolean(!currentUser.assignedDoctor)
  );
  console.log(currentUser.currentDoctor);
  return (
    <main className="flex min-h-screen items-center justify-between">
      <NavbarSimpleColored />
      <Walkthrough open={isModalOpened} />
      <div>test</div>
    </main>
  );
}

export default withAuth(Home);
