<template>
<div class="search">
    <input class="ipt" type="text" placeholder="输入城市名或拼音">
</div>
</template>

<script>
export default {
    name: "CitySearch"
};
</script>

<style lang="stylus" scoped>
@import '~style/varibles';

.search {
    background-color: $bgColor;
    overflow: hidden;
    color: #fff;
    padding: 0.2rem;

    .ipt {
        width: 100%;
        background-color: #fff;
        text-align: center;
        color: #666;
        height: .5rem;
        line-height: .5rem;
        box-sizing: border-box;
        padding: 0 .2rem;
    }
}

</style>
