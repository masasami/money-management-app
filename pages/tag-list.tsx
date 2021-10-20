import type { NextPage } from 'next'
import Layout from 'components/Layout'
import { AiOutlineTag } from 'react-icons/ai'

const TagList: NextPage = () => {
  return (
    <Layout>
      <ul>
        <li className="flex items-center pt-6 pb-3 pl-6 pr-12 ">
          <AiOutlineTag className="text-xl mr-4" />
          <span className="text-sm">食費</span>
        </li>
        <li className="flex items-center py-3 pl-6 pr-12 ">
          <AiOutlineTag className="text-xl mr-4" />
          <span className="text-sm">娯楽費</span>
        </li>
        <li className="flex items-center py-3 pl-6 pr-12 ">
          <AiOutlineTag className="text-xl mr-4" />
          <span className="text-sm">水道・光熱費</span>
        </li>
      </ul>
    </Layout>
  )
}

export default TagList
