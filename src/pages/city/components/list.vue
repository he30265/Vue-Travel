<template>
<div class="list_wrapper" ref="wrapper">
    <div>
        <div class="lw_section">
            <div class="ls_tit">当前城市</div>
            <div class="ls_li">
                <div class="button_box">
                    <div class="button">北京</div>
                </div>
            </div>
        </div>
        <div class="lw_section">
            <div class="ls_tit">热门城市</div>
            <div class="ls_li">
                <div class="button_box" v-for="item of hotCities" :key="item.id">
                    <div class="button">{{item.name}}</div>
                </div>
            </div>
        </div>
        <div class="lw_section">
            <div v-for="(item,key) of cities">
                <div class="ls_tit">{{key}}</div>
                <div class="ls_li">
                    <div class="alp_li border-bottom" v-for="city of item">{{city.name}}</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import BScroll from "better-scroll";
export default {
    name: "CityList",
    props: {
        hotCities: Array,
        cities: Object
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper);
    }
};
</script>

<style lang="stylus" scoped>
@import '~style/varibles';

.list_wrapper {
    overflow: hidden;
    position: absolute;
    top: 1.62rem;
    left: 0;
    right: 0;
    bottom: 0;

    .lw_section {
        .ls_tit {
            background-color: #f5f5f5;
            padding: 0.2rem;
            color: #212121;
            font-size: 0.24rem;
        }

        .ls_li {
            overflow: hidden;
            padding: 0 0.5rem 0.2rem 0.1rem;

            .button_box {
                width: 33.3%;
                float: left;
                box-sizing: border-box;
                padding: 0 0.1rem;
                margin-top: 0.2rem;

                .button {
                    font-size: 0.24rem;
                    border: 1px solid #ccc;
                    text-align: center;
                    padding: 0.1rem 0;
                }
            }

            .alp_li {
                padding: 0.2rem 0;
                padding: 0.2rem 0.1rem;
            }
        }
    }
}
</style>
