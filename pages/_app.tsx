import 'styles/tailwind-bundle.css'
import 'styles/globals.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
