import { debounce } from './utils';

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        // 对this.$refs.scroll.refresh这个函数进行防抖操作
        const refresh = debounce(this.$refs.scroll.refresh, 500)
            // 3.监听item中图片加载完成

        // 对监听事件进行保存
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
            // console.log('yes')
            // () => {

        // 图片加载完成之后刷新一次
        // this.$refs.scroll.refresh()
        // refresh()
        // })  
    }
}