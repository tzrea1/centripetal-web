import axios from 'utils/axios.js'

// 分页获取用户充值记录接口
export function getUserRecharges (params) {
  return axios.get('/mock/recharge/', {
    params
  })
}

// 新增用户充值记录接口
export function createUserRecharges (data) {
  return axios.post('/mock/recharge/', data)
}

// 查询用户余额接口
export function getUserCharge () {
  return axios.get('/mock/recharge/charge')
}

// 用户优惠券接口
export function getCouponList (params) {
  return axios.get('/mock/coupon/', {
    params
  })
}

// 用户消费记录接口
export function getUserBillList (params) {
  return axios.get('/mock/bill/', {
    params
  })
}

// 生成订单
export function createOrder (data) {
  return axios.post('/mock/order/', data)
}

// 订单详情
export function getOrderInfo (params) {
  return axios.get('/mock/order/info', {
    params
  })
}

// 订单支付
export function orderPay (data) {
  return axios.post('/mock/order/pay', data)
}

// 订单列表
export function getOrderList (params) {
  return axios.get('/mock/order/', {
    params
  })
}

// 取消订单
export function cancelOrder (params) {
  return axios.get('/mock/order/cancel', {
    params
  })
}

// 删除订单
export function deleteOrder (params) {
  return axios.delete(`/mock/order/${params.id}`)
}

// 用户咨询接口
export function consultList () {
  return axios.get('/mock/consult/')
}
