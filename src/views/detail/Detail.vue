<template> 
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll class="detail-content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
        <detail-goods-info :detail-info="detailInfo"
        @imageLoad="imageLoad" />
        <detail-param-info ref="params" :param-info="paramInfo" />
       
        <detail-comment-info ref="comment" :comment-info="commentInfo" />
        <goods-list ref="recommend" :goods="recommends" />
       
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart" />
    <!-- <toast :message="message" :show="show"></toast> -->
    </div>

</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailBottomBar from './childComps/DetailBottomBar'

    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from 'components/common/scroll/Scroll'
    // import Toast from 'components/common/toast/Toast'


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

    import {
        itemListenerMixin,
        backTopMixin
    } from 'common/mixin';

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
            GoodsList,
            DetailBottomBar
            // Toast

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
                themeTopYs: [],
                getThemeTopY: null,
                currentIndex: 0
                    // message: "",
                    // show: false

            }
        },
        mixins: [itemListenerMixin, backTopMixin],
        created() {
            // 1.保存传入的iid
            this.iid = this.$route.params.iid


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
                // 3.请求推荐数据
            getRecommend().then(res => {
                this.recommends = res.data.list
            })

            // 4.给getThemeTopY赋值
            this.getThemeTopY = debounce(() => {
                this.themeTopYs = []

                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                this.themeTopYs.push(Number.MAX_VALUE)

            }, 50)
        },
        mounted() {},
        destroyed() {
            this.$bus.$off('itemImgLoad', this.itemImgListener)
        },
        methods: {
            // 加入购物车,获取商品的详细信息
            addToCart() {
                const product = {}
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid;


                // 2.将商品加入购物车
                // this.$store.commit('addCart', product)
                this.$store.dispatch('addCart', product).then(res => {
                    this.$toast.show(res);
                })
            },
            imageLoad() {
                // 图片加载完成之后刷新一次
                this.$refs.scroll.refresh()
                this.getThemeTopY()
            },
            titleClick(index) {
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
            },
            contentScroll(position) {
                //    1.获取y值
                const positionY = -position.y

                // 2.positonY值和主题中的值进行对比
                let length = this.themeTopYs.length;
                for (let i = 0; i < length; i++) {
                    // 判断区间在0和某个数字之间(i<length-1)
                    if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
                        this.currentIndex = i;
                        this.$refs.nav.currentIndex = this.currentIndex;
                    }
                }
                // 1.判断BackTop是否显示
                this.isShowBackTop = (-position.y) > 1000;


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
        /* height: calc(100% - 44px);
        overflow: hidden; */
        position: absolute;
        top: 44px;
        bottom: 50px;
    }
</style>