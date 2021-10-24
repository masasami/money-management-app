import { ReactNode } from 'react'
import Head from 'next/head'

import Header from 'layouts/Header'
import Nav from './Nav'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Head>
        <title>Money Management</title>
        <meta name="description" content="Money Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex-1 flex mt-16 overflow-y-scroll">
        <Nav />
        <div className="w-full md:flex-1">{children}</div>
      </main>
    </div>
  )
}

export default Layout
