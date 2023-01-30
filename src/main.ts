// 引入工具
import { createApp } from 'vue'
import { filterformat } from './utils/filterformat'
import { createPinia } from 'pinia'
import { piniaPlugin } from './utils/piniaPlugin'
import { routerBeforeEach,routerAfterEach } from './utils/routerGuard'
import lazyPlugin from 'vue3-lazy'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入全局组件
import MainHeader from '@/components/MainHeader/index.vue'
import ContentSection from '@/components/ContentSection/index.vue'
import Dialog from '@/components/Dialog/index.vue'


// 使用pinia持久化插件
const store = createPinia()
store.use(piniaPlugin({
  key: 'pinia'
}))

let app = createApp(App)


type Filter = {
  formatTime: <T extends any>(str: T) => T,
  filtersinger:<T extends any>(str: T) => T,
  filterSongTime:<T extends any>(str: T) => T,
  keepTwoDecimalFull:<T extends any>(str: T) => T
}

// 声明要扩充@vue/runtime-core包的声明.
// 这里扩充"ComponentCustomProperties"接口, 因为他是vue3中实例的属性的类型.
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $filters: Filter,
  }
}

// 全局函数和变量
app.config.globalProperties.$filters = filterformat


app.use(ElementPlus)
app.use(store)
app.use(router)
app.use(lazyPlugin,{
  loading:new URL('./assets/images/ice.png',import.meta.url).href,
  error:new URL('./assets/SPY×FAMILY/Anya2.png',import.meta.url).href
})

// 路由守卫
routerBeforeEach
routerAfterEach

// 链式调用
app.component('main-header', MainHeader).component('content-section', ContentSection).
component('dialoge',Dialog).mount('#app')
