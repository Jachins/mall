<template>
   <div class="tab-bar-item" @click="itemClick">
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
    <div>首页</div> -->
    <div v-if="!isActive"><slot name='item-icon'></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name='item-text'></slot></div>
   </div>
  </template>
<script>
    export default {
        name: 'TabBarItem',
        props: {
            path: String,
            activeColor: {
                type: String,
                default: 'red'
            }
        },
        data() {
            return {
                // isActive: true
            }
        },
        computed: {
            isActive() {
                // /home->item1(/home)=true;
                // /home->item1(/category)=false;
                // /home->item1(/cart)=true;
                // /home->item1(/profile)=true;
                return this.$route.path.indexOf(this.path) !== -1
            },
            // 动态更改颜色
            activeStyle() {
                return this.isActive ? {
                    color: this.activeColor
                } : {}
            }
        },
        methods: {
            itemClick() {
                this.$router.replace(this.path)
                    // console.log("打印打印")
            }
        }
    }
</script>
<style scoped>
    .tab-bar-item {
        flex: 1;
        height: 49px;
        text-align: center;
        font-size: 13px;
    }
    
    .tab-bar-item img {
        width: 24px;
        height: 24px;
        margin-top: 3px;
        vertical-align: middle;
    }
</style>