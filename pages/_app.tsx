import 'styles/tailwind-bundle.css'
import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import Auth from 'layouts/Auth'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <RecoilRoot>
      <Auth route={router.route}>
        <Component {...pageProps} />
      </Auth>
    </RecoilRoot>
  )
}
export default MyApp
