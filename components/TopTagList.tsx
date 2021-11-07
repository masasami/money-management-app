import { useEffect, useState } from 'react'
import { Account } from 'interfaces/account'
import { RiCheckboxBlankFill } from 'react-icons/ri'

type Props = {
  accounts: Account[]
}

const TopTagList = (props: Props) => {
  const [titles, setTitles] = useState<string[]>([])
  const [colorCodes, setColorCodes] = useState<string[]>([])

  useEffect(() => {
    // タグのタイトル、カラーコードの重複を排除
    const titleObject: { [id: string]: string } = {}
    const colorCodeObject: { [id: string]: string } = {}
    for (const account of props.accounts) {
      const id = account.id_tag
      const key = String(id)
      titleObject[key] = id ? account.title : 'タグ未設定'
      colorCodeObject[key] = id ? account.color_code : '00000050'
    }
    // 重複を排除したものを配列化
    const titles = Object.values(titleObject)
    const colorCodes = Object.values(colorCodeObject)
    setTitles(titles)
    setColorCodes(colorCodes)
  }, [props.accounts])

  return (
    <ul className="h-[150px] p-3 overflow-y-scroll flex-1 scrollbar-y">
      {titles.map((_, i) => (
        <li key={i} className="mb-2 flex items-center">
          <RiCheckboxBlankFill color={`#${colorCodes[i]}`} />
          <span className="flex-1 ellipsis">{titles[i]}</span>
        </li>
      ))}
    </ul>
  )
}

export default TopTagList
