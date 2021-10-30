import { ReactNode, useState, useCallback } from 'react'
import Head from 'next/head'

import Header from 'layouts/Header'
import Nav from 'layouts/Nav'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const [isOpenNav, setIsOpenNav] = useState(false)
  const toggle = useCallback(() => setIsOpenNav((isOpenNav) => !isOpenNav), [])

  return (
    <div className="w-screen h-screen flex flex-col">
      <Head>
        <title>Money Management</title>
        <meta name="description" content="Money Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onClick={toggle} />
      <main className="flex-1 overflow-y-scroll">
        <div className="w-full h-full">{children}</div>
      </main>
      {isOpenNav && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50"
          onClick={toggle}
        >
          <Nav />
        </div>
      )}
    </div>
  )
}

export default Layout
