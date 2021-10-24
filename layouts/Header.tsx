import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineAccountBook } from 'react-icons/ai'
import { VscAccount } from 'react-icons/vsc'

const Header = () => {
  return (
    <header className="w-full h-16 flex items-center px-6 bg-blue-500 fixed z-50">
      <AiOutlineMenu fontSize={24} className="text-white cursor-pointer mr-4" />
      <AiOutlineAccountBook fontSize={32} className="text-white mr-2" />
      <h1 className="text-2xl text-white">カレンダー</h1>
      <VscAccount fontSize={32} className="text-white ml-auto cursor-pointer" />
    </header>
  )
}

export default Header
