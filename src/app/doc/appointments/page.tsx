'use client';

import AppointmentsList from "@/app/appointments/AppointmentsList";
import withApplicationShell from "@/app/components/AppShell";
import NoPatients from "@/app/components/NoPatients/NoPatients";
import { useAppSelector } from "@/hooks/redux";
import { useDoctorAppointments } from "@/hooks/useAppointments";
import useDoctorPatients from "@/hooks/useDoctorPatients";
import withDocAuth from "@/hooks/withDocAuth";

type Props = {}

const DoctorAppointments = (props: Props) => {
    const patients = useDoctorPatients()
    // @ts-ignore
    const uid = useAppSelector(state=> state.firebase.auth.uid)
    const appointments = useDoctorAppointments(uid)
  
    console.log('doctor appointments', appointments);
    
    return (
      <div>
        <h1 className="text-xl my-10">Візити від ваших пацієнтів</h1>
        {patients.length > 0 ? (
          <>
          {appointments?.length === 0 && <h1 className='mx-auto mt-[40vh]'>Ваші пацієнти поки що не створили жодного запису</h1>}
          <AppointmentsList forDoc appointments={appointments} creationMode={false} setCreationMode={()=>{}} />
          </>
        ) : (
          <NoPatients/>
        )}
      </div>
    )
}

export default withDocAuth(withApplicationShell(DoctorAppointments)) 