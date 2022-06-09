import { atom, useRecoilState } from 'recoil'
import { User } from 'interfaces/user'
import { Account } from 'interfaces/account'

const userState = atom<User | null>({
  key: 'recoil/userState',
  default: null,
})
export const useLoginUser = () => {
  const [user, setUser] = useRecoilState(userState)
  return { user, setUser }
}

const accountsState = atom<Account[]>({
  key: 'recoil/accountsState',
  default: [],
})
export const useGlobalAccounts = () => {
  const [globalAccounts, setGlobalAccounts] = useRecoilState(accountsState)
  return { globalAccounts, setGlobalAccounts }
}
