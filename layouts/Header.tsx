import { MouseEventHandler, useState } from 'react'
import Router from 'next/router'
import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineAccountBook } from 'react-icons/ai'
import { VscAccount } from 'react-icons/vsc'
import { apiService } from 'lib/api.service'
import { useSetRecoilState } from 'recoil'
import { userState } from 'lib/atoms'

type Props = {
  onClick: MouseEventHandler
}

const Header = (props: Props) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const setUser = useSetRecoilState(userState)
  const logout = async () => {
    try {
      await apiService.post('logout')
      setUser(null)
    } catch (e) {
      console.log(e)
    } finally {
      Router.push('login')
    }
  }
  return (
    <header className="w-full h-16 relative flex items-center px-6 bg-blue-500">
      <button onClick={props.onClick}>
        <AiOutlineMenu fontSize={24} className="text-white cursor-pointer mr-4" />
      </button>
      <AiOutlineAccountBook fontSize={32} className="text-white mr-2" />
      <h1 className="text-2xl text-white">カレンダー</h1>
      <VscAccount fontSize={32} className="text-white ml-auto cursor-pointer" onClick={() => setIsOpenMenu(true)} />
      {isOpenMenu && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-transparent z-50" onClick={() => setIsOpenMenu(false)}>
          <div className="absolute top-[60px] right-0 py-2 px-4 bg-white border border-gray-300 rounded">
            <button className="cursor-pointer" onClick={logout}>
              ログアウト
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
