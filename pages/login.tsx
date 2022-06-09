import type { NextPage } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'
import { AiOutlineAccountBook } from 'react-icons/ai'
import { IoIosClose } from 'react-icons/io'
import { toast } from 'react-toastify'

import { User } from 'interfaces/user'
import { apiService } from 'lib/api.service'
import { useLoginUser } from 'lib/atoms'

const Login: NextPage = () => {
  const { setUser } = useLoginUser()

  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)

  const login = async () => {
    try {
      const user = await apiService.post<User>('login', {
        login_id: loginId,
        password: password,
      })
      console.log(user)
      setUser(user)

      toast.success('ログインしました！', {
        onOpen: () => Router.push('/top'),
      })
    } catch (e) {
      console.log(e)
      setIsError(true)
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="py-8">
        <AiOutlineAccountBook fontSize={48} className="text-blue-500" />
      </div>

      {isError && (
        <div className="w-[90vw] max-w-[320px] py-4 px-5 mb-8 text-sm bg-red-200 border border-red-500 rounded flex items-center shadow">
          ログインIDまたはパスワードが違います
          <button className="cursor-pointer ml-auto" onClick={() => setIsError(false)}>
            <IoIosClose fontSize={20} className="text-red-500" />
          </button>
        </div>
      )}

      <section className="w-[90vw] max-w-[320px] p-5 bg-gray-50 border border-gray-300 rounded mb-4 shadow">
        <h2>ログインID</h2>
        <input
          type="text"
          className="w-full border border-gray-300 rounded py-1 px-4 mb-4 outline-none"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && login()}
        />

        <h2>パスワード</h2>
        <input
          type="password"
          className="w-full border border-gray-300 rounded py-1 px-4 mb-4 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && login()}
        />

        <button className="btn-main w-full justify-center" onClick={login}>
          ログイン
        </button>
      </section>

      <div className="w-[90vw] max-w-[320px] p-4 flex justify-center border border-gray-300 rounded shadow">
        <Link href="signup">
          <a className="underline text-blue-500">ユーザー作成</a>
        </Link>
      </div>
    </div>
  )
}

export default Login
