<template> 
    <div id="detail">
        <detail-nav-bar class="detail-nav"/>
        <scroll class="detail-content" ref="scroll">
        <detail-swiper :top-images="topImages" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
        <detail-goods-info :detail-info="detailInfo"
        @imageLoad="imageLoad" />
        <detail-param-info :param-info="paramInfo" />
       
        <detail-comment-info :comment-info="commentInfo" />
        <goods-list :goods="recommends" />
    </scroll>
    </div>

</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import Scroll from 'components/common/scroll/Scroll'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import GoodsList from 'components/content/goods/GoodsList'


    import {
        getDetail,
        Goods,
        Shop,
        GoodsParam,
        getRecommend
    } from 'network/detail'

    import {
        debounce
    } from 'common/utils'

    export default {
        name: 'Detail',
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList
        },
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                itemImgListener: null
            }
        },
        created() {
            // 1.保存传入的iid
            this.iid = this.$route.params.iid

            // 3.请求推荐数据
            getRecommend().then(res => {
                    this.recommends = res.data.list
                })
                // 2. 根据iid请求详情页的数据
            getDetail(this.iid).then(res => {





                // 获取数据
                const data = res.result;
                this.topImages = data.itemInfo.topImages;

                // 3.获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

                // 4.获取商家信息
                this.shop = new Shop(data.shopInfo);

                // 5.保存商品的详情数据
                this.detailInfo = data.detailInfo;

                // 6.获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

                // 7.取出评论信息
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }

            })
        },
        mounted() {
            const refresh = debounce(this.$refs.scroll.refresh, 500)
                // 3.监听item中图片加载完成

            // // 对监听事件进行保存
            this.itemImgListener = () => {
                refresh()
            }
            this.$bus.$on('itemImgLoad', this.itemImgListener)

        },
        destroyed() {
            this.$bus.$off('itemImgLoad', this.itemImgListener)
        },
        methods: {
            imageLoad() {
                // 图片加载完成之后刷新一次
                this.$refs.scroll.refresh()
            }
        }
    }
</script>

<style scoped>
    #detail {
        position: relative;
        background-color: #fff;
        z-index: 9;
        height: 100vh;
    }
    
    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    
    .detail-content {
        height: calc(100% - 44px);
        overflow: hidden;
    }
</style>