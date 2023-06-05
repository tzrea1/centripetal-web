import axios from 'utils/axios.js'

// 课程导航
export function getLessonNav () {
  return axios.get('/mock/lesson/nav.json')
}

// 课程列表
export function getLessonList (params) {
  return axios.get('/mock/lesson/list.json', {
    params
  })
}

// 课程详情
export function getLessonDetail (params) {
  return axios.get('/mock/lesson/detail.json', {
    params
  })
}

// 课程目录
export function getLessonComment (params) {
  return axios.get('/mock/lesson/nav.json', {
    params
  })
}

// 课程问答
export function getLessonQa (params) {
  return axios.get('/mock/lesson/qa', {
    params
  })
}
