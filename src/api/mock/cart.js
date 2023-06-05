import axios from 'utils/axios.js';

// 获取购物车列表接口
export function getCartList () {
  return axios.get('/mock/cart/cart.json');
}

// 单个添加购物车接口
export function addCart (data) {
  return axios.post('/mock/cart/cart.json', data);
}

// 单个删除购物车接口
export function deleteCart (data) {
  console.log(data);
  return axios.delete(`/mock/cart/cart.json/${data.id}`);
}

// 多个删除购物车接口
export function multipleDeleteCart (data) {
  return axios.delete(`/mock/cart/cart.json/${data.ids}`, data);
}
