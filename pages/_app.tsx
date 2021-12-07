import 'styles/tailwind-bundle.css'
import 'styles/globals.css'
import type { AppProps } from 'next/app'

// Recoil
import { RecoilRoot } from 'recoil'

// トースト
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import Auth from 'layouts/Auth'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <RecoilRoot>
      <Auth route={router.route}>
        <Component {...pageProps} />
        <ToastContainer />
      </Auth>
    </RecoilRoot>
  )
}
export default MyApp
