import {request} from './request'

// 获取主页多数据请求
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 获取主页物品数据请求
export function getHomeGoods(type,page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}