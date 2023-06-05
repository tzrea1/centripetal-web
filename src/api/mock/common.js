import axios from 'utils/axios.js'
import Axios from 'axios'
import { ERR_OK } from 'api/mock/config.js'

// 获取用户搜索历史
export function getSearchHistory () {
  return axios.get(`/mock/common/history.json`)
}

// 生成一条搜索历史
export function createSearchHistory (keyword) {
  return axios.post('/mock/common/history.json', {
    params: {
      keyword
    }
  })
}

// 获取热搜词接口
export function getHot () {
  return axios.get(`/mock/common/hot.json`)
}

// 获取底部版权footer数据
export function getFooter () {
  return axios.get(`/mock/common/footer.json`)
}

// 获取头部数据接口
export function getHeader () {
  return axios.get(`/mock/common/nav.json`)
}

// 获取实时搜索数据
export function getSearch (keyword) {
  return new Promise((resolve, reject) => {
    Axios.get('https://www.imooc.com/search/history', {
      params: {
        words: keyword
      }
    }).then(res => {
      const { status, data: { result, data } } = res
      if (status === 200 && result === 0) {
        resolve({
          code: ERR_OK,
          msg: '获取成功',
          data: data
        })
      } else {
        reject({
          code: -1,
          msg: '获取失败'
        })
      }
    }).catch(error => {
      reject({
        code: -1,
        msg: error.message || '获取失败'
      })
    })
  })
}
