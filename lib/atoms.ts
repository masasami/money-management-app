import { atom } from 'recoil'
import { User } from 'interfaces/user'
import { Account } from 'interfaces/account'

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
})

export const accountsState = atom<Account[]>({
  key: 'accountsState',
  default: [],
})
