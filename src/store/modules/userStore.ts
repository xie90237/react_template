import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface userStoreType {
  token: string
  setToken: (val: string) => void
  userInfo: null | {
    [key: string]: string
  }
  setUserInfo: (val: userStoreType['userInfo']) => void
  logout: () => void
}

export const useUserStore = create(
  persist<userStoreType>(
    (set, get) => ({
      token: '',
      userInfo: null,
      setToken: (val) => {
        localStorage.setItem('token', val)
        set(() => ({ token: val }))
      },
      setUserInfo: (val) => set(() => ({ userInfo: val })),
      logout: () => {
        set(() => ({ token: '', userInfo: null }))
      }
    }),
    { name: 'userStore' }
  ) // 存储在local中的key
)
