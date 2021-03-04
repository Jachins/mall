import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazeLoad from 'vue-lazyload'

Vue.config.productionTip = false
    // 添加事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 安装图片懒加载插件
Vue.use(VueLazeLoad, {
    loading: require('./assets/img/common/images.png')
})

// 解决移动端300ms延迟问题
FastClick.attach(document.body)

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')