<template>
<div class="search">
    <input v-model="keyword" class="ipt" type="text" placeholder="输入城市名或拼音">
    <div class="search-content" ref="content" v-show="keyword">
        <ul>
            <li v-for="item of list" :key="item.id" @click="handleCityClick(item.name)">{{item.name}}</li>
            <li v-show="noKeyword">无匹配项</li>
        </ul>
    </div>
</div>
</template>

<script>
import BScroll from "better-scroll"
export default {
    name: "CitySearch",
    props: {
        cities: Object
    },
    data() {
        return {
            keyword: "",
            list: [],
            timer: null
        };
    },
    methods:{
        handleCityClick(city){
            this.$store.commit("changeCity",city);
        }
    },
    computed:{
        noKeyword(){
            return !this.list.length;
        }
    },
    watch: {
        keyword() {
            if(this.keyword ==""){
                this.list=[]
                return
            }
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                const result = [];
                for (let i in this.cities) {
                    this.cities[i].forEach((value) => {
                        if (
                            value.name.indexOf(this.keyword) > -1 ||
                            value.spell.indexOf(this.keyword) > -1
                        ) {
                            result.push(value);
                        }
                    });
                }
                this.list = result;
            }, 100);
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.content);
    },
};
</script>

<style lang="stylus" scoped>
@import '~style/varibles';

.search {
    background-color: $bgColor;
    overflow: hidden;
    padding: 0 0.2rem;
    height: 0.9rem;
    line-height: 0.9rem;

    .ipt {
        width: 100%;
        background-color: #fff;
        text-align: center;
        color: #666;
        height: 0.5rem;
        line-height: 0.5rem;
        box-sizing: border-box;
        padding: 0 0.2rem;
    }

    .search-content {
        position: absolute;
        top: 1.62rem;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 1;
        padding: 0 0.2rem;
        overflow: hidden;
    }
}
</style>
