import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-image'
export default {
  install (Vue) {
    // Vue 对象  main.js 使用 Vue.use(插件) 调用install函数，传入当前的Vue对象
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)
  }
}
