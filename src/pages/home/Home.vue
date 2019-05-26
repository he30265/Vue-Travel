<template>
<div>
    <home-header></home-header>
    <home-swiper></home-swiper>
    <home-icons></home-icons>
    <home-recomment></home-recomment>
    <home-weekend></home-weekend>
</div>
</template>

<script>

import HomeHeader from "./components/header";
import HomeSwiper from "./components/swiper";
import HomeIcons from "./components/icons";
import HomeRecomment from "./components/recommend";
import HomeWeekend from "./components/weekend";

export default {
    name: 'home',
    components: {
        HomeHeader,
        HomeSwiper,
        HomeIcons,
        HomeRecomment,
        HomeWeekend
    }
}
</script>

<style lang="">

</style>
