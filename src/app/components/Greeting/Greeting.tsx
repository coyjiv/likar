type Props = {
    currentUser: any
}

const Greeting = ({currentUser}: Props) => {
  return (
    <main className='flex min-h-[80vh] overflow-y-hidden items-center justify-center w-full'>
      <div className='flex flex-col justify-center items-center w-full'>
        <h1 className='font-medium text-2xl mt-5 ml-5'>
          Вітаємо, {currentUser?.firstName + ' ' + currentUser?.middleName}
        </h1>

        <h3 className='font-light text-lg mt-5 ml-5'>Для початку оберіть варіант з меню ліворуч</h3>
      </div>
    </main>
  )
}

export default Greeting