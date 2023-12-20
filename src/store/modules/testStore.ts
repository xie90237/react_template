import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const getApi = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(123456)
    }, 2000)
  })
}

interface testStoreType {
  count: number
  setCount: (val: number) => void
  addCount: (val: number) => void
  getCountVo: () => string
  fetchCount: () => Promise<any>
}

export const useTestStore = create(
  persist<testStoreType>(
    (set, get) => ({
      count: 0,
      setCount: (val) => set(() => ({ count: val })),
      addCount: (val) => {
        set((state) => ({ count: state.count + val }))
      },
      getCountVo: () => {
        return get().count + '123'
      },
      fetchCount: async () => {
        const res = await getApi()
        set({ count: res })
        return get().count
      }
    }),
    { name: 'testStore' }
  ) // 存储在local中的key
)
