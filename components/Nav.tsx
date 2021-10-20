import { GoCalendar } from 'react-icons/go'
import { AiOutlineTag } from 'react-icons/ai'
import { VscGraphLine } from 'react-icons/vsc'

const Nav = () => {
  return (
    <nav className="w-64 h-full text-gray-500 border-r border-gray-300">
      <ul>
        <li className="flex items-center pt-6 pb-3 pl-6 pr-12 cursor-pointer">
          <GoCalendar className="text-xl mr-4" />
          <span className="text-sm">トップ</span>
        </li>
        <li className="flex items-center py-3 pl-6 pr-12 cursor-pointer">
          <AiOutlineTag className="text-xl mr-4" />
          <span className="text-sm">タグ</span>
        </li>
        <li className="flex items-center py-3 pl-6 pr-12 cursor-pointer">
          <VscGraphLine className="text-xl mr-4" />
          <span className="text-sm">グラフ</span>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
