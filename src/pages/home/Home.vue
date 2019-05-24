<template>
<div>
    <home-header></home-header>
    <home-swiper></home-swiper>
</div>
</template>

<script>
// 引入 header.vue 组件
import HomeHeader from "./components/header";

// 引入 swiper.vue 组件
import HomeSwiper from "./components/swiper";

export default {
    name: 'home',
    components: {
        HomeHeader,
        HomeSwiper
    }
}
</script>

<style lang="">

</style>
