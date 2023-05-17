import { PersistPartial } from "redux-persist/lib/persistReducer";

export type PersistedState<T> = T & PersistPartial;

export interface IDoctor{
    avatarUrl: string;
    id: string;
    dOB: string;
    email: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    phoneNumber: string;
    speciality: string;
    patients: IPatient[];
    appointments: IAppointment[];
}

export interface IPatient{
    avatarUrl: string;
    dOB: string;
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    assignedDoctor: IDoctor["id"];
}

export interface IAppointment{
    timeStart: string;
    id: string;
    timeEnd: string;
    additionalInfo: string;
    date: {
        seconds: number;
        nanoseconds: number;
    }
    doctorUid: IDoctor["id"];
    userUid: IPatient["id"];
}