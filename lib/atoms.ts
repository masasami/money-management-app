import { atom } from 'recoil'
import { User } from 'interfaces/user'

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
})
