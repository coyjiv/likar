import { PersistPartial } from "redux-persist/lib/persistReducer";

export type PersistedState<T> = T & PersistPartial;