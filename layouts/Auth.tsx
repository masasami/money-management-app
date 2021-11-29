import { ReactNode, useEffect } from 'react'
import Router from 'next/router'
import { apiService } from 'lib/api.service'
import { useRecoilState } from 'recoil'
import { userState } from 'lib/atoms'

type Props = {
  route: string
  children: ReactNode
}
const Auth = (props: Props) => {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    ;(async () => {
      try {
        const user = await apiService.get('auth')
        setUser(user)
      } catch (e) {
        console.log(e)
        setUser(null)
        props.route !== '/login' && props.route !== '/signup' && Router.push('/login')
      }
    })()
  }, [])
  if (props.route === '/login' || props.route === '/signup' || user) return <>{props.children}</>
  return null
}

export default Auth
