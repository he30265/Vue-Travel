<template>
<div class="wrapper">
    <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) of swiperList" :key="index">
            <img :src="item.src" alt class="slide_img">
      </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</div>
</template>

<script>
export default {
    name: "HomeSwiper",
    data() {
        return {
            swiperOption: {
                loop: true,
                pagination: {
                    el: '.swiper-pagination'
                }
            },
            swiperList: [{
                    src: "http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20194/17e2352b857f66e9d2948e98dc483bc2.jpg_750x200_2857d0a3.jpg"
                },
                {
                    src: "http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20193/87a224d0349d94a11e97f31aa1aba4f5.jpg_750x200_1f78af87.jpg"
                },
                {
                    src: "http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20195/5eb82a8ca5b0cebb2c3ae1a53a4d8f81.jpg_750x200_645bfba1.jpg"
                }
            ]
        };
    }
};
</script>

<style lang="stylus" scoped>
.wrapper {
    overflow: hidden;
    width: 100%;
    height: 1.7rem;

    .slide_img {
        width: 100%
    }
    >>> .swiper-pagination-bullet-active{background-color:#fff}
}
</style>
