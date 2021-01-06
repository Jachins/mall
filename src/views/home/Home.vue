<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div  slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners" />
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view />
    </div>
</template>
<script>
    import NavBar from 'components/common/navbar/NavBar';

    import {
        getHomeMultidata
    } from 'network/home.js';

    import HomeSwiper from './childComps/HomeSwiper';
    import RecommendView from './childComps/RecommendView';
    import FeatureView from './childComps/FeatureView'


    export default {
        name: 'Home',
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView

        },
        data() {
            return {
                banners: [],
                recommends: []
            }
        },
        created() {
            // 1.请求多个数据
            getHomeMultidata().then(res => {
                console.log(res);
                // this.result = res;
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })
        }
    }
</script>
<style scoped>
    .home-nav {
        color: #fff;
        background-color: var(--color-tint);
    }
</style>