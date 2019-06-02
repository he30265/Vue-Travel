
<template>
    <div class="detail-content">
        <detail-banner></detail-banner>
        <detail-header></detail-header>
    </div>
</template>

<script>
import DetailBanner from "./components/banner"
import DetailHeader from "./components/header"
export default {
    name : "detail",
    components:{
        DetailBanner,
        DetailHeader
    }
}
</script>

<style lang="stylus" scoped>
    .detail-content{
        height 20rem;
    }
</style>