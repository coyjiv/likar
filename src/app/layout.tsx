import './globals.css'

import { Providers } from './store/provider'
import { Inter } from 'next/font/google'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang='en'>
      <body className={'font-apple-system'}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
