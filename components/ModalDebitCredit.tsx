import { useCallback, useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { MdDeleteForever } from 'react-icons/md'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { AiOutlineCheck } from 'react-icons/ai'
import moment from 'moment'

import { Account } from 'interfaces/account'
import { Tag } from 'interfaces/tag'
import { apiService } from 'lib/api.service'

import { useRecoilValue, useRecoilState } from 'recoil'
import { accountsState, userState } from 'lib/atoms'

type Props = {
  datetimeAccount: string
  accounts: Account[]
  onHide: () => void
}

const ModalDebitCredit = (props: Props) => {
  const user = useRecoilValue(userState)
  if (!user) return null

  const [globalAccounts, setGlobalAccounts] = useRecoilState(accountsState)
  const [accounts, setAccounts] = useState<Account[]>(
    props.accounts.map<Account>((account) => ({ ...account, is_debit: account.debit !== null, is_del: false }))
  )
  const [tags, setTags] = useState<Tag[]>([])
  const [isValid, setIsValid] = useState(true)

  const addAccount = useCallback((isDebit: boolean) => {
    setAccounts((accounts) => [
      {
        id_account: 0,
        id_user: user.id_user,
        id_tag: null,
        content: null,
        debit: null,
        credit: null,
        dt_account: moment(new Date(props.datetimeAccount)).format('YYYY-MM-DD'),
        dt_create: null,
        dt_update: null,
        title: '',
        color_code: '',
        is_debit: isDebit,
        is_del: false,
      },
      ...accounts,
    ])
    // 追加された入力欄にフォーカスを当てる
    setTimeout(() => document.getElementById('content0')?.focus(), 0)
  }, [])

  // 勘定一覧を更新しグローバルにセット
  const save = useCallback(async () => {
    try {
      const ids = accounts
        .filter((account) => account.is_del && account.id_account)
        .map((account) => account.id_account)
      if (ids.length) {
        await apiService.post('delete_accounts', { id_accounts: ids })
      }
      const upsertedAccounts = await apiService.post<Account[]>('upsert_accounts', {
        accounts: accounts.filter((account) => !account.is_del),
      })

      // 削除されていないものを抽出
      const filteredGlobalAccounts = globalAccounts.filter((globalAccount) => {
        for (const id of ids) {
          if (id === globalAccount.id_account) {
            return false
          }
        }
        return true
      })
      for (let i = 0; i < upsertedAccounts.length; i++) {
        const index = filteredGlobalAccounts.findIndex((ga) => ga.id_account === upsertedAccounts[i].id_account)
        // マッチするIDがあれば更新扱いのため代入
        // マッチするIDがなければ新規作成扱いのためpushで追加
        if (index >= 0) {
          filteredGlobalAccounts[index] = upsertedAccounts[i]
        } else {
          filteredGlobalAccounts.push(upsertedAccounts[i])
        }
      }
      setGlobalAccounts(filteredGlobalAccounts)
      props.onHide()
    } catch (e) {
      console.log(e)
    }
  }, [accounts])

  useEffect(() => {
    console.log(props.accounts)
    ;(async () => {
      const tags = await apiService.get<Tag[]>(`get_tags_by_id_user`)
      setTags(tags)
    })()
  }, [])

  useEffect(() => {
    // 金額の入力判定
    if (
      accounts
        .filter((account) => !account.is_del)
        .every((account) => (account.is_debit && account.debit) || (!account.is_debit && account.credit))
    ) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [accounts])

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

        <div className="flex p-5">
          <button className="btn text-white bg-green-500 ml-auto" onClick={() => addAccount(true)}>
            収入を追加
          </button>
          <button className="btn text-white bg-red-500 ml-3" onClick={() => addAccount(false)}>
            支出を追加
          </button>
        </div>

        {/* メイン */}
        <main className="flex-1 px-5 scrollbar-y">
          <ul>
            {accounts.map((account, i) => {
              return (
                !account.is_del && (
                  <li key={i} className="border border-gray-500 rounded p-2 mb-3 last:mb-0">
                    <div className="md:flex md:items-center relative">
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
                      {/* 内容 */}
                      <div className="flex-1">
                        <input
                          type="text"
                          className="form-control w-full"
                          placeholder="内容"
                          id={`content${i}`}
                          value={account.content || ''}
                          onChange={(e) => {
                            setAccounts((accounts) => {
                              accounts[i].content = e.target.value
                              return [...accounts]
                            })
                          }}
                        />
                      </div>
                      {/* 収入 */}
                      {account.is_debit && (
                        <input
                          type="text"
                          className={`border rounded p-2 text-right w-full md:w-[200px] ${
                            account.debit ? 'border-gray-300' : 'border-red-500'
                          }`}
                          placeholder="¥0,000"
                          value={account.debit !== null ? `¥${account.debit.toLocaleString()}` : ''}
                          onChange={(e) => {
                            setAccounts((accounts) => {
                              const value = e.target.value.replaceAll(',', '').replaceAll('¥', '')
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
                          className={`border rounded p-2 text-right w-full md:w-[200px] ${
                            account.credit ? 'border-gray-300' : 'border-red-500'
                          }`}
                          placeholder="¥0,000"
                          value={account.credit !== null ? `¥${account.credit.toLocaleString()}` : ''}
                          onChange={(e) => {
                            setAccounts((accounts) => {
                              const value = e.target.value.replaceAll(',', '').replaceAll('¥', '')
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
                        className="form-control w-full md:w-[200px]"
                        value={String(account.id_tag)}
                        onChange={(e) => {
                          setAccounts((accounts) => {
                            if (!e.target.value) {
                              accounts[i].id_tag = null
                              return [...accounts]
                            }
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

                      <MdDeleteForever
                        fontSize={32}
                        className="text-red-500 cursor-pointer absolute top-0 right-0 md:relative"
                        onClick={() => {
                          setAccounts((accounts) => {
                            accounts[i].is_del = true
                            return [...accounts]
                          })
                        }}
                      />
                    </div>
                  </li>
                )
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

          <button
            className={`btn text-white ml-3 ${isValid ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={save}
            disabled={!isValid}
          >
            <AiOutlineCheck />
            <span className="ml-1">保存</span>
          </button>
        </footer>
      </div>
    </div>
  )
}

export default ModalDebitCredit
