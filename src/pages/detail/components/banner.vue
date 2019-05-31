<template>
<div>
    <div class="banner-con" @click="hanleBannerClick">
    <div class="banner-return">
        <span class="iconfont">&#xe624;</span>
    </div>
    <div class="banner-pic">
        <img
        src="//img1.qunarzz.com/sight/p0/1707/e1/e13a1e819bc59b79a3.img.jpg_600x330_29b1824b.jpg"
        alt
      >
    </div>
        <div class="banner-txt">
            <div class="bt-picnum">
                <span class="iconfont">&#xe685;</span>3
            </div>
            <div class="bt-tit">涠洲岛船票</div>
        </div>
    </div>
    <common-gallary :imgs="imgs" v-show="showGallary" @close="GalleryClose"></common-gallary>
</div>

</template>

<script>
import CommonGallary from "common/gallary/Gallary"
export default {
    name: "DetailBanner",
    components : {
        CommonGallary
    },
    data(){
        return {
            showGallary : false,
            imgs : ["http://img1.qunarzz.com/sight/p0/1902/84/84696f368bbec10da3.img.jpg_350x240_3a0fefe8.jpg","http://img1.qunarzz.com/sight/p0/1902/f3/f351c5dd27344a30a3.img.jpg_350x240_1136e527.jpg"]
        }
    },
    methods:{
        hanleBannerClick(){
            this.showGallary = true
        },
        GalleryClose(){
            this.showGallary = false
        }
    }
};
</script>

<style lang="stylus" scoped>
.banner-con {
    position: relative;
    color: #fff;

    .banner-return {
        position: absolute;
        top: 0.2rem;
        left: 0.2rem;
        width: 0.72rem;
        height: 0.72rem;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        text-align: center;
        line-height: 0.72rem;
    }

    .banner-pic {
        height: 3.52rem;

        img {
            width: 100%;
        }
    }

    .banner-txt {
        position: absolute;
        left: 0.2rem;
        bottom: 0.2rem;

        .bt-picnum {
            background-color: rgba(0, 0, 0, 0.6);
            line-height: 0.4rem;
            text-align: center;
            font-size: 0.24rem;
            border-radius: 0.2rem;

            .iconfont {
                font-size: 0.24rem;
                margin-right: 0.1rem;
            }
        }

        .bt-tit {
            font-size: 0.28rem;
            margin-top: 0.2rem;
        }
    }
}
</style>
