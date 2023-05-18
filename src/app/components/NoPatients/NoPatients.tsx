type Props = {}

const NoPatients = (props: Props) => {
  return (
    <>
      <div className='flex mt-20 min-h-[60vh] flex-col items-center justify-center h-full'>
        <div className='text-2xl font-bold'>Ви поки що не маєте пацієнтів</div>
        <div className='text-xl font-light'>
          Ваші пацієнти повині зареєструватися на нашому порталі
        </div>
      </div>
      <span className='text-sm absolute left-1/2 -translate-x-[10%] bottom-10 font-light'>
        Виникли запитання? Напишіть нам на{' '}
        <a href={'mailto:support@likar.example.com'}>
          support@likar.example.com
        </a>
      </span>
    </>
  )
}

export default NoPatients
