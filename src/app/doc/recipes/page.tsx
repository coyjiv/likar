'use client'
import withApplicationShell from '@/app/components/AppShell'
import NoPatients from '@/app/components/NoPatients/NoPatients'
import useDoctorPatients from '@/hooks/useDoctorPatients'
import withDocAuth from '@/hooks/withDocAuth'
import { Select } from '@mantine/core'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@mantine/core'
import { useDropzone } from 'react-dropzone'
import { useFirebase } from 'react-redux-firebase'
import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore'

type Props = {}

const RecipesPage = (props: Props) => {
  const patients = useDoctorPatients()
  const db = getFirestore()
  const firebase = useFirebase()
  const [choosenPatient, setChoosenPatient] = useState<any>(null)
  console.log('patients', patients, choosenPatient)
  const [uploadMode, setUploadMode] = useState(false)
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  })
  console.log('acceptedFiles', acceptedFiles)

  const handleUploadFile = () => {
    firebase
      .uploadFile(`recipes/${choosenPatient.id}`, acceptedFiles[0])
      .then((res) => {
        res.uploadTaskSnapshot.ref.getDownloadURL().then((downloadURL) => {
          updateDoc(doc(db, 'users', choosenPatient.id), {
            recipes: arrayUnion(downloadURL),
          })
        })
      })
  }

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  return (
    <div>
      {patients.length > 0 ? (
        <>
          {uploadMode ? (
            <>
              <section className='container'>
                <div
                  {...getRootProps({ className: 'dropzone' })}
                  className=' border-dashed border-black border-[5px] flex justify-center items-center py-40'
                >
                  <input {...getInputProps()} />
                  <p className='font-medium'>
                    Перенесіть файл на цю панель, які бажаєте завантажити, або
                    клацніть
                  </p>
                </div>
                <aside>
                  <h4>Файл</h4>
                  <ul>{files}</ul>
                </aside>
              </section>
              <Button
                variant={'default'}
                disabled={acceptedFiles.length === 0}
                onClick={() => {
                    handleUploadFile()
                  setUploadMode(false)
                }}
              >
                Завантажити файл
              </Button>
            </>
          ) : (
            <div className=' sm:grid sm:grid-cols-3 xl:grid-cols-4 sm:items-start sm:gap-4 sm:py-6'>
              <label
                htmlFor='patient'
                className='block text-xl font-medium leading-6 text-gray-900 sm:pt-1.5'
              >
                Виберіть пацієнта
              </label>
              <div className='mt-2 sm:col-span-2 sm:mt-0'>
                <Select
                  value={choosenPatient?.id ?? ''}
                  placeholder='Почніть вводити ФІО пацієнта щоб знайти його в базі даних'
                  data={patients.map(
                    (doctor: any, i) => ({
                      value: doctor.id,
                      label: `${doctor.lastName} ${doctor.firstName} ${doctor.middleName}`,
                    }),
                    []
                  )}
                  onChange={(value) => {
                    console.log('value', value)

                    setChoosenPatient(patients.find((el) => el.id === value))
                  }}
                  searchable
                  nothingFound='Нікого не знайдено'
                  maxDropdownHeight={280}
                />
              </div>
              <Button
                variant={'default'}
                disabled={!choosenPatient}
                onClick={() => setUploadMode(true)}
              >
                Далі
              </Button>
            </div>
          )}
        </>
      ) : (
        <NoPatients />
      )}
    </div>
  )
}

export default withDocAuth(withApplicationShell(RecipesPage))
