declare global {
  interface ServiceType {
    user: {
      LoginApi: {
        address: string
        avatarUrl: string
        email: string
        id: string
        integral: number
        inviteCode: string
        nickName: string
        parentCode: string
        record: boolean
        recordUrl: string
        type: number
        vipLevel: number
      }
    }
  }
}

export { }
