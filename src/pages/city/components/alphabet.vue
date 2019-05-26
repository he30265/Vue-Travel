<template>
<div class="alp_list">
    <div class="ul">
        <div class="li">A</div>
        <div class="li">A</div>
        <div class="li">A</div>
        <div class="li">A</div>
        <div class="li">A</div>
        <div class="li">A</div>
        <div class="li">A</div>
    </div>
</div>
</template>

<script>
export default {
    name: "CityAlphabet"
};
</script>

<style lang="stylus" scoped>
@import '~style/varibles';

.alp_list {
    position: absolute;
    top: 1.62rem;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 0.44rem;

    .ul {
        .li {
            color: $ftColor;
            text-align: center;
            padding: 0 0.2rem;
        }
    }
}
</style>
