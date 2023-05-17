import React from "react";
import RegisterForm from "../components/forms/RegisterForm";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <div className="flex flex-col h-screen py-0 sm:py-44 items-center justify-center bg-animation-gradient">
      <h1 className="text-3xl text-white mb-10 font-light">Панель пацієнта</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
