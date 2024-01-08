import request from 'utils/request'

export const getApi = () =>
  request<ServiceType['user']['LoginApi']>('/pre/aa', 'POST', {})
