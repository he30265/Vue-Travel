<template>
<div class="header">
    <div class="header_left">
        <span class="iconfont">&#xe624;</span>
    </div>
    <div class="header_center">
        <span class="iconfont">&#xe632;</span>
        输入城市/景点/游玩主题
    </div>
    <div class="header_right">
        <span class="iconfont">&#xe64a;</span>
    </div>
</div>
</template>

<script>
export default {
    name: "HomeHeader"
};
</script>

<style lang="stylus" scoped>
// @import "../../../assets/style/varibles.styl"
// @import "~@/assets/style/varibles.styl"
@import "~style/varibles.styl"
.header {
    background-color: $bgColor;
    overflow: hidden;
    color: #fff;
    padding: 10px;

    .header_left {
        float: left;
    }

    .header_center {
        float: left;
        margin: 0 20px;
    }

    .header_right {
        float: right;
    }
}
</style>
