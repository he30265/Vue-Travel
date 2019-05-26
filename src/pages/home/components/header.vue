<template>
<div class="header">
    <div class="header_left">
        <span class="iconfont">&#xe624;</span>
    </div>
    <div class="header_center">
        <span class="iconfont">&#xe632;</span>
        输入城市/景点/游玩主题
    </div>
    <div class="header_right">{{this.city}} <span class="iconfont">&#xe64a;</span></div>
</div>
</template>

<script>
export default {
    name: "HomeHeader",
    props: {
        city: String
    }
};
</script>

<style lang="stylus" scoped>
// @import "../../../assets/style/varibles"
// @import "~@/assets/style/varibles"
@import "~style/varibles"

.header {
    background-color: $bgColor;
    overflow: hidden;
    color: #fff;
    padding: 0.2rem;

    .header_left {
        float: left;
    }

    .header_center {
        float: left;
        margin: 0 0.2rem;
    }

    .header_right {
        float: right;
    }
}
</style>
