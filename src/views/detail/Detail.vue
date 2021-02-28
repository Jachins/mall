<template>
    
    <div id="detail">
        <detail-nav-bar class="detail-nav"/>
        <scroll class="detail-content" ref="scroll">
        <detail-swiper :top-images="topImages" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
        <detail-goods-info :detail-info="detailInfo"
        @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo"></detail-param-info>
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

    import {
        getDetail,
        Goods,
        Shop,
        GoodsParam
    } from 'network/detail'

    export default {
        name: 'Detail',
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailGoodsInfo,
            DetailParamInfo
        },
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {}
            }
        },
        created() {
            // 1.保存传入的iid
            this.iid = this.$route.params.iid


            // 2. 根据iid请求详情页的数据
            getDetail(this.iid).then(res => {
                console.log(res);
                this.topImages = res.result.itemInfo.topImages;

                // 3.获取商品信息
                this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)

                // 4.获取商家信息
                this.shop = new Shop(res.result.shopInfo);

                // 5.保存商品的详情数据
                this.detailInfo = res.result.detailInfo;

                // 6.获取参数信息
                this.paramInfo = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
            })
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