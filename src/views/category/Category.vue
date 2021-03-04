<template>
    <div class="wrapper" ref='aaaa'>
    
    <div>
        <!-- 无论是否设置click:false,button都可以点击 -->
        <!-- <button @click="btnClick">按钮</button> -->
    </div>
</div>
</template>
<script>
    // import BScroll from 'better-scroll'
    export default {
        name: "Category",
        data() {
            return {
                scroll: null
            }
        }
        // ,
        // //  组件创建完之后调用
        // mounted() {

        //     this.scroll = new BScroll(this.$refs.aaaa, {
        //         // probeType: 3,
        //         // pullUpLoad: true

        //     })

        //     this.scroll.on('scroll', (position) => {
        //         console.log(position);
        //     })

        //     this.scroll.on('pullingUp', () => {
        //         console.log('上拉加载更多');
        //     })
        // },
        // methods: {
        //     btnClick() {
        //         console.log('btnClick');
        //     }
        // }
    }
</script>
<style scoped>
    .wrapper {
        height: 150px;
        background-color: greenyellow;
        /* overflow-y: scroll; */
        /* 隐藏测滚动条 */
        overflow: hidden;
    }
</style>