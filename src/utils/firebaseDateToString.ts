import dayjs from "dayjs"

export const firebaseDateToString = (date: {
    seconds: number;
    nanoseconds: number;
}) => {
    return dayjs.unix(date?.seconds).format('DD/MM/YYYY')
}