import Link from 'next/link'
import { GoCalendar } from 'react-icons/go'
import { AiOutlineTag } from 'react-icons/ai'

const Nav = () => {
  return (
    <nav className="w-64 h-full text-gray-500 border-r border-gray-300">
      <ul>
        <li className="pt-6 pb-3 pl-6 pr-12">
          <Link href="/top">
            <a className="flex items-center cursor-pointer">
              <GoCalendar className="text-xl mr-4" />
              <span className="text-sm">トップ</span>
            </a>
          </Link>
        </li>
        <li className="py-3 pl-6 pr-12">
          <Link href="/tag-list">
            <a className="flex items-center cursor-pointer">
              <AiOutlineTag className="text-xl mr-4" />
              <span className="text-sm">タグ</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
