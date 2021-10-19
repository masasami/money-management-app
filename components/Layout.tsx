import { ReactNode } from 'react'
import Head from 'next/head'
import styles from './Layout.module.scss'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Money Management</title>
        <meta name="description" content="Money Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  )
}

export default Layout
