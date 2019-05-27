<template>
<div>
    <city-header></city-header>
    <city-search></city-search>
    <city-list :hotCities="hotCities" :cities="cities"></city-list>
    <city-alphabet></city-alphabet>
</div>
</template>

<script>
import CityHeader from "./components/header";
import CitySearch from "./components/search";
import CityList from "./components/list";
import CityAlphabet from "./components/alphabet";
import axios from "axios";
export default {
    name: "City",
    components: {
        CityHeader,
        CitySearch,
        CityList,
        CityAlphabet
    },
    data() {
        return {
            hotCities: [],
            cities: {}
        };
    },
    methods: {
        getCityInfo() {
            axios.get("/api/city.json").then(this.getCitySuccess);
        },
        getCitySuccess(result) {
            if (result.data.ret && result.data.data) {
                const data = result.data.data;
                this.hotCities = data.hotCities;
                this.cities = data.cities;
            }
        }
    },
    mounted() {
        this.getCityInfo();
    }
};
</script>

<style lang="stylus" scoped></style>
