import axios from 'utils/axios.js'

// 获取用户收货地址接口
export function getUserAddresss () {
  return axios.get('/mock/address')
}

// 新建用户收货地址接口
export function createUserAddress (data) {
  return axios.post('/mock/address/', data)
}

// 编辑用户收货地址接口
export function updateUserAddress (data) {
  return axios.put(`/mock/address/${data.id}`, data)
}

// 删除用户收货地址接口
export function deleteUserAddress (params) {
  return axios.delete(`/mock/address/${params.id}`)
}

// 设为默认收货地址接口
export function defaultUserAddress (params) {
  return axios.get('/mock/address/default', {
    params
  })
}
