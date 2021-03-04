import { debounce } from './utils';
import BackTop from 'components/content/backTop/BackTop'

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
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0)
        }
    }
}