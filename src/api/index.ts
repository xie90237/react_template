import request from 'utils/request'

export const getApi = () =>
  request('/formetas/game/listH5GamesHead', 'POST', {})
