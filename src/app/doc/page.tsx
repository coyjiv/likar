"use client";

import { useAppSelector } from "@/hooks/redux";
import { useState } from "react";
import withApplicationShell from "../components/AppShell";
import withDocAuth from "@/hooks/withDocAuth";

function Home() {
  const currentUser = useAppSelector((state) => state.firebase.profile);
  const [isModalOpened, toggleModal] = useState(
    Boolean(!currentUser.assignedDoctor)
  );
  return (
    <main className="flex min-h-screen items-center justify-between">
      <div>Вітаємо, {currentUser?.firstName}</div>
    </main>
  );
}

export default  withDocAuth(withApplicationShell(Home));