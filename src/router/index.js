import Vue from 'vue'
import VueRouter from 'vue-router'

// 进行路由懒加载
const Home = () =>
    import ('../views/home/Home')
const Category = () =>
    import ('../views/category/Category')
const Cart = () =>
    import ('../views/cart/Cart')
const Profile = () =>
    import ('../views/profile/Profile')
const Detail = () =>
    import ('../views/detail/Detail')

// 安装插件
Vue.use(VueRouter)

// 创建router

// 配置对应映射关系
const routes = [{
        // 重定向
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/detail/:iid',
        component: Detail
    }
]
const router = new VueRouter({
    routes,
    mode: 'history'
})

// 到处router
export default router