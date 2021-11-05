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

  const [accounts, setAccounts] = useState<Account[]>(
    props.accounts.map<Account>((account) => ({ ...account, is_debit: !!account.debit }))
  )
  const [tags, setTags] = useState<Tag[]>([])

  const onClickOk = useCallback(async () => {
    try {
      await apiService.post<Account[]>('upsert_accounts', { accounts })
      props.onHide()
    } catch (e) {
      console.log(e)
    }
  }, [accounts])

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
        {/* ヘッダー */}
        <header className="w-full h-14 text-white bg-blue-500 flex items-center justify-center p-2 rounded-t relative">
          <h2 className="absolute mx-auto">{props.datetimeAccount}</h2>
          <button className="text-red-500 ml-auto font-bold" onClick={props.onHide}>
            <IoIosClose fontSize={32} />
          </button>
        </header>

        {/* メイン */}
        <main className="flex-1 p-5 scrollbar-y">
          <ul>
            {accounts.map((account, i) => {
              return (
                <li key={i} className="form-control mb-3">
                  <div className="md:flex md:items-center">
                    {/* 収入ボタン */}
                    {account.is_debit && (
                      <button
                        className="btn text-white bg-green-500"
                        onClick={() => {
                          setAccounts((accounts) => {
                            accounts[i].is_debit = false
                            accounts[i].debit = null
                            accounts[i].credit = null
                            return [...accounts]
                          })
                        }}
                      >
                        収入
                      </button>
                    )}
                    {/* 支出ボタン */}
                    {!account.is_debit && (
                      <button
                        className="btn text-white bg-red-500"
                        onClick={() => {
                          setAccounts((accounts) => {
                            accounts[i].is_debit = true
                            accounts[i].debit = null
                            accounts[i].credit = null
                            return [...accounts]
                          })
                        }}
                      >
                        支出
                      </button>
                    )}
                    <input
                      type="text"
                      className="form-control"
                      value={account.content}
                      onChange={(e) => {
                        setAccounts((accounts) => {
                          accounts[i].content = e.target.value
                          return [...accounts]
                        })
                      }}
                    />
                    {/* 収入 */}
                    {account.is_debit && (
                      <input
                        type="text"
                        className="form-control text-right"
                        value={account.debit !== null ? account.debit.toLocaleString() : ''}
                        onChange={(e) => {
                          setAccounts((accounts) => {
                            const value = e.target.value.replaceAll(',', '')
                            if (!value) {
                              accounts[i].debit = null
                              return [...accounts]
                            }

                            const debit = Number(value)
                            if (isNaN(debit)) return [...accounts]

                            accounts[i].debit = debit
                            return [...accounts]
                          })
                        }}
                      />
                    )}
                    {/* 支出 */}
                    {!account.is_debit && (
                      <input
                        type="text"
                        className="form-control text-right"
                        value={account.credit !== null ? account.credit.toLocaleString() : ''}
                        onChange={(e) => {
                          setAccounts((accounts) => {
                            const value = e.target.value.replaceAll(',', '')
                            if (!value) {
                              accounts[i].credit = null
                              return [...accounts]
                            }

                            const credit = Number(value)
                            if (isNaN(credit)) return [...accounts]

                            accounts[i].credit = credit
                            return [...accounts]
                          })
                        }}
                      />
                    )}

                    {/* タグリスト */}
                    <select
                      className="form-control max-w-[200px]"
                      value={String(account.id_tag)}
                      onChange={(e) => {
                        setAccounts((accounts) => {
                          accounts[i].id_tag = Number(e.target.value)
                          return [...accounts]
                        })
                      }}
                    >
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

        {/* フッター */}
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
