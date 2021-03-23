import request from '@/utils/request'
const baseURL = 'http://localhost:3000'

export function fecthList(params) {
  return request({
    url: `${baseURL}/blog/list`,
    method: 'get',
    params: {
      ...params
    }
  })
}

export function del(params) {
  return request({
    url: `${baseURL}/blog/del`,
    method: 'post',
    data: {
      ...params
    }
    
  })
}