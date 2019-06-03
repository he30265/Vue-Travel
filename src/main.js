// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import fastClick from "fastclick";
import "./assets/js/rem.js";
import "style/reset.css";
import "style/border.css";
import "style/iconfont.css";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import store from "./store/";
import "babel-polyfill";

Vue.config.productionTip = false;

fastClick.attach(document.body);

Vue.use(VueAwesomeSwiper /* { default global options } */);

var AV = require('leancloud-storage');
AV.init("V7lzAyxGxYVEhMYUXqw1M54v-gzGzoHsz", "0iEPtcsAqGyypYcLqy71G0ul");

console.log(AV)

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
});
