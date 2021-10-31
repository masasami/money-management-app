import type { NextPage } from 'next'
import { AiOutlineAccountBook } from 'react-icons/ai'

const Login: NextPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className=" py-8">
        <AiOutlineAccountBook fontSize={48} className="text-blue-500" />
      </div>
      <section className="w-[90vw] max-w-[308px] p-5 bg-gray-50 border border-gray-300 rounded">
        <h2>ログインID</h2>
        <input type="text" className="w-full border border-gray-300 rounded py-1 px-4 mb-4 outline-none" />

        <h2>パスワード</h2>
        <input type="password" className="w-full border border-gray-300 rounded py-1 px-4 mb-4 outline-none" />

        <button className="btn-main w-full justify-center">ログイン</button>
      </section>
    </div>
  )
}

export default Login
