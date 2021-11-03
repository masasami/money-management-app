import { useCallback, useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { AiOutlineCheck } from 'react-icons/ai'

import { Account } from 'interfaces/account'
import { Tag } from 'interfaces/tag'
import { apiService } from 'lib/api.service'

import { useRecoilValue } from 'recoil'
import { userState } from 'lib/atoms'

type Props = {
  datetimeAccount: string
  accounts: Account[]
  onHide: () => void
}

const ModalDebitCredit = (props: Props) => {
  const user = useRecoilValue(userState)
  if (!user) return null

  const [tags, setTags] = useState<Tag[]>([])

  const onClickOk = useCallback(() => {
    props.onHide()
  }, [])

  useEffect(() => {
    console.log(props.accounts)
    ;(async () => {
      const tags = await apiService.get<Tag[]>(`get_tags_by_id_user/${user.id_user}`)
      setTags(tags)
    })()
  }, [])

  return (
    <div className="modal-grayout">
      <div className="modal-screen">
        <header className="w-full h-14 text-white bg-blue-500 flex items-center justify-center p-2 rounded-t relative">
          <h2 className="absolute mx-auto">{props.datetimeAccount}</h2>
          <button className="text-red-500 ml-auto font-bold" onClick={props.onHide}>
            <IoIosClose fontSize={32} />
          </button>
        </header>
        <main className="flex-1 p-5 scrollbar-y">
          <ul>
            {props.accounts.map((account, i) => {
              const debit = Number(account.debit)
              const credit = Number(account.credit)
              let amount = 0
              if (debit > 0) amount = debit
              if (credit > 0) amount = credit * -1
              return (
                <li key={i} className="border border-gray-300 p-2 mb-3">
                  <div className="flex items-center">
                    <input type="text" value={account.content} />
                    <div>{amount.toLocaleString()}</div>
                    <select>
                      <option value=""></option>
                      {tags.map((tag, i) => (
                        <option key={i} value={tag.id_tag}>
                          {tag.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </li>
              )
            })}
          </ul>
        </main>
        <footer className="px-5 pb-5 flex items-center justify-center">
          <button className="btn-sub" onClick={props.onHide}>
            <BsArrowReturnLeft />
            <span className="ml-1">戻る</span>
          </button>
          <button className="btn-main ml-3" onClick={() => onClickOk()}>
            <AiOutlineCheck />
            <span className="ml-1">OK</span>
          </button>
        </footer>
      </div>
    </div>
  )
}

export default ModalDebitCredit
