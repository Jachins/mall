<template>
    <!-- <div id="app"> -->
     <div id="tab-bar">
       <!-- <slot name="item-icon"></slot>
      <slot name="item-text"></slot> -->
      <slot></slot>
     </div>
    <!-- </div> -->
  </template>
<script>
    export default {
        name: 'TabBar'

    }
</script>
<style scoped>
    /* @import "./assets/base.css"; */
    
    body {
        padding: 0;
        margin: 0;
    }
    
    #tab-bar {
        display: flex;
        background-color: #f6f6f6;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: -10px 10px 3px 10px rgba(100, 100, 100, 0.5);
        /* box-shadow: 水平位置  垂直位置  模糊距离  阴影大小 阴影颜色 从外层的阴影改变阴影内测阴影(inset)*/
    }
</style>