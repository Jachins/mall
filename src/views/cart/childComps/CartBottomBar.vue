<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button :is-checked="isSelectAll" class="check-button"
            @click.native="checkClick"></check-button>
            <span>全选</span>
        </div>
        <div class="price">合计: {{totalPrice}}</div>
        <div class="calculate" @click="calcClick">去结算({{checkLength}})</div>
    </div>
</template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton'
    import {
        mapGetters
    } from 'vuex'
    export default {
        name: "CartBottomBar",
        components: {
            CheckButton
        },
        computed: {
            ...mapGetters(['cartList']),
            totalPrice() {
                return '¥' + this.$store.state.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue, item) => {
                    return preValue + item.price * item.count
                }, 0).toFixed(2)
            },
            checkLength() {
                return this.cartList.filter(item => item.checked).length
            },
            isSelectAll() {
                // 当购物车为空时 
                if (this.cartList.length === 0) return false;
                // 使用filter
                // return !(this.cartList.filter(item => !item.checked).length);
                // 使用find
                return !(this.cartList.find(item => !item.checked));
            }
        },
        methods: {
            checkClick() {
                if (this.isSelectAll) {
                    // 全部选中，
                    this.cartList.forEach(item => item.checked = false)
                } else { //部分或者全部没选中
                    this.cartList.forEach(item => item.checked = true)
                }
            },
            calcClick() {
                if (!this.isSelectAll) {
                    this.$toast.show('请选择购买的商品');
                }
            }
        }
    }
</script>

<style scoped>
    .bottom-bar {
        height: 35px;
        background-color: #eee;
        position: relative;
        line-height: 35px;
        display: flex;
        /* bottom: 49px; */
    }
    
    .check-content span,
    .price,
    .calculate {
        font-size: 14px;
    }
    
    .check-content {
        display: flex;
        align-items: center;
        margin-left: 10px;
        /* width: 40px; */
    }
    
    .check-button {
        width: 19px;
        height: 19px;
        line-height: 19px;
        margin-right: 5px;
    }
    
    .price {
        margin-left: 20px;
        flex: 1;
    }
    
    .calculate {
        width: 90px;
        background: orangered;
        color: #fff;
        text-align: center;
    }
</style>