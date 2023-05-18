import { IAppointment } from "@/types";
import { Button } from "@mantine/core";
import React from "react";
import AppointmentItem from "./AppointmentItem";

type Props = {
  appointments: IAppointment[] | [];
  setCreationMode: (value: boolean) => void;
  creationMode: boolean;
};

const AppointmentsList = ({ appointments, setCreationMode }: Props) => {
  return (
    <div>
      <>
        {appointments?.length > 0 &&
          appointments?.map((appointment, index) => (
            <AppointmentItem key={index} appointment={appointment} />
          ))}
      </>
      <div className="flex gap-3 items-center mt-5">
        {appointments.length === 0 ? (
          <p className="font-medium">Ви не маєте жодного запису</p>
        ) : (
          <p className="font-medium">Створити додатковий?</p>
        )}
        <Button
          className="hover:bg-slate-300 duration-300"
          variant={"default"}
          onClick={() => setCreationMode(true)}
        >
          Створити
        </Button>
      </div>
    </div>
  );
};

export default AppointmentsList;
