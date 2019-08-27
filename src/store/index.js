const KEY = 'hm-toutiao-user'
export default {
  // 存储
  setUser (user) {
    // user 数据类型  对象
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  // 获取
  getUser () {
    // 获取用户信息
    const jsonStr = window.sessionStorage.getItem(KEY) || '{}'
    // 可能没有数据  返回的null  通过null.token报错 但是{}.token 值 undefined
    return JSON.parse(jsonStr)
  },
  // 删除
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
