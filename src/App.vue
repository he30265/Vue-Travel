<template>
<div id="app">
    <keep-alive exclude="detail">
        <!-- 显示的是当前路由地址所对应的内容 -->
        <router-view />
    </keep-alive>
</div>
</template>

<script>
var AV = require('leancloud-storage');
export default {
    name: 'App',
    mounted(){
        // console.log(AV);
    }
}
</script>

<style>
</style>
