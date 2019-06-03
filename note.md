## 八、项目实战-旅游网站详情页面开发

### 一、详情页动态路由及 banner 布局

这一章来看一下详情页的动态路由及 banner 布局。首选新建一个分支 detail-banner 并且切换到这个分支进行开发。

首先打开 home/recommend.vue，我们把循环项改为 router-link 标签的形式，然后通过 to 给元素加路由地址，为了让每个页面的详情页地址不一样，这里我们使用动态路由，就是在 to 前面加一个冒号，地址后面跟一个 item.id 这样一个参数，这样每个详情页的地址就是动态的了，例：

home/recommend.vue
```
<router-link class="rl_li border-bottom" v-for="item of list" :key="item.id" :to="'/detail/' + item.id">
    <div class="a">
        <div class="pic">
        <img :src="item.imgUrl" alt class="img">
        </div>
        <div class="info">
        <div class="tit">{{item.infoTit}}</div>
        <div class="txt">{{item.infoTxt}}</div>
        <div class="money">
            <b class="b">¥</b>
            <i class="i">{{item.infoMoney}}</i>起
        </div>
        </div>
    </div>
</router-link>
```

这个时候打开页面，点击城市，看地址栏 url 的变化，不同城市的详情页地址也不同。

补充，router-link 会自动把标签渲染为 a 标签，如果不想让他渲染为 a 标签，就给他加一个 tag 属性，里边写上标签名，例如：tag="li"，意思是让这个 router-link 渲染为 li 标签。

现在我们还没有进行路由的配置，接下来我们添加一个路由。首先在 pages 下新建一个 detail 目录用来存放详情页的组件，然后在 detail 目录下新建一个 Detail.vue 组件，里面编写一些内容，例：

Detail.vue
```
<template>
    <div>
        detail
    </div>
</template>

<script>
export default {
    name : "detail"
}
</script>

<style lang="stylus" scoped>

</style>
```

接下来就可以去 router 中添加这个页面的路由信息了，打开 router/index.js，首先通过 import 引入 Detail.vue 这个组件，然后给他配置路由信息，这个时候我们知道了 detail 这个路径后面还要跟一个参数，所以在路径后要跟一个动态路由，在 Vue 中，通过 /路径/:id 的形式我们就写了一个动态路由，他的意思是，前面的路径必须是 /detail/，后面要带一个参数，这个参数要放在 id 这个变量里面，

router/index.js
```
import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/home/Home";
import City from "@/pages/city/City";
import Detail from "@/pages/detail/Detail";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },{
            path: "/city",
            name: "City",
            component: City
        },
        {
            path: "/detail/:id",
            name: "Detail",
            component: Detail
        }
    ]
});
```

这个时候，打开页面，点击城市，url 后面就会跟一个该城市对应的 id。下面我们先来完成详情页面的布局与样式。

先来完成一下 banner 部分，在 detail 目录下新建一个 components 目录，然后在 components 目录中新建一个 banner.vue 组件。下面是我已经编辑好的 banner 部分的布局与样式：

detail/banner.vue
```
<template>
<div class="banner-con">
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
</template>

<script>
export default {
    name: "DetailBanner"
};
</script>

<style lang="stylus" scoped>
.banner-con {
    position: relative;
    color: #fff;

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
```

完成 banner 部分的布局样式后，还需要在 Detail 中引入并使用 banner.vue 组件。

Detail.vue
```
<template>
    <div>
        <detail-banner></detail-banner>
    </div>
</template>

<script>
import DetailBanner from "./components/banner";
export default {
    name : "Detail",
    components :{
        DetailBanner
    }
}
</script>
```

这个时候打开页面，点击“猜你喜欢”部分的城市，会跳转到详情页，样式布局如下：

![](https://upload-images.jianshu.io/upload_images/9373308-f895e38f29b33360.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

以上就完成了详情页动态路由及 banner 布局，点击 banner 部分，他是会打开一个轮播的，下一章我们来看一下这个轮播如何实现。


### 二、公用图片画廊组件拆分

这一章来创建一个公用图片画廊的组件，点击 banner 图，会打开一个图片画廊，图片有轮播滚动的效果，并且在底部会显示一共有几张图，当前是第几张图的效果。

因为在其他地方可能也会用到这个组件，所以我们把他作为一个公共组件来开发，首先创建这个公共组件，在 src 目录下创建 common 目录，然后在里面创建 gallary 目录，并在里面创建 Gallary.vue 文件，将画廊的代码编写到这个组件中。

这个时候我们要去 banner 中引入并使用这个组件，这里我们可以配置一下路径，回忆一下 /api 路径 是怎么配置指向为 /static/mock 路径的。打开 build 目录下的 webpack.base.conf.js，在 alias 中，我们添加一条配置信息，'common': resolve('src/common')，也就是让 common 指向 src 下的 common 目录。

刚才修改了配置信息，所以要重启一下项目服务才能生效。回到 banner.vue 中，可以直接 import CommonGallary from "common/gallary/Gallary" 来引入公共画廊组件，这样就不用再向上一层目录去寻找文件了。然后在组件对象中添加 CommonGallary 这个组件，并在模板中使这个组件。

在 banner.vue 中完成组件的引入与使用后，我们来编写一下 Gallary.vue 这个组件的布局与样式。

Gallary.vue
```
<template>
<div class="gallery-con">
    <div class="gc-wrapper">
        <swiper :options="swiperOptions" class="swiper">
            <swiper-slide class="slide">
                <img
            class="slide-img"
            src="http://img1.qunarzz.com/sight/p0/1902/84/84696f368bbec10da3.img.jpg_350x240_3a0fefe8.jpg"
            alt
          >
        </swiper-slide>
                <swiper-slide>
                    <img
            class="slide-img"
            src="http://img1.qunarzz.com/sight/p0/1902/f3/f351c5dd27344a30a3.img.jpg_350x240_1136e527.jpg"
            alt
          >
        </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</div>
</template>

<script>
export default {
    name: "CommonGallary",
    data() {
        return {
            // swiperOptions: {
            //     loop: false,
            //     pagination: '.swiper-pagination',
            //     paginationType : 'fraction',
            // }
            swiperOptions: {
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    type: "fraction"
                }
            }
        };
    }
};
</script>

<style lang="stylus" scoped>
.gallery-con {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9;
    background-color: #000;

    .gc-wrapper {
        .slide-img {
            width: 100%;
        }

        .swiper-pagination {
            color: #fff;
        }
    }
}
</style>
```

遇到一个关于 swiper 分页器的问题，如果直接把 pagination 和 paginationType 属性写在 swiperOptions 对象中，分页器就显示不出来，必须将分页器的配置参数写在 pagination 对象中：
```
swiperOptions: {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        type: "fraction"
    }
}
```

以上就完成了画廊组件基本的样式布局，但是现在轮播图片是写死的，接下来我们通过获取数据动态的将轮播图片渲染出来，在 props 中定义一组默认数据，模拟通过 props 接收外部传来的数据。

Gallary.vue
```
<template>
<div class="gallery-con">
    <div class="gc-wrapper">
        <swiper :options="swiperOptions" class="swiper">
            <swiper-slide class="slide" v-for="(item,index) of imgs" :key="index">
                <img
            class="slide-img"
            :src="item"
            alt
          >
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</div>
</template>

<script>
export default {
    name: "CommonGallary",
    props:{
        imgs:{
            type : Array,
            default(){
                return ["http://img1.qunarzz.com/sight/p0/1902/84/84696f368bbec10da3.img.jpg_350x240_3a0fefe8.jpg","http://img1.qunarzz.com/sight/p0/1902/f3/f351c5dd27344a30a3.img.jpg_350x240_1136e527.jpg"]
            }
        }
    },
    data() {
        return {
            swiperOptions: {
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    type: "fraction"
                }
            }
        };
    }
};
</script>
```

但是，公用的组件其实不应该有默认值，将 default 中 return 改为一个空数组，然后打开 banner.vue 组件，我让这个组件给 Gallary.vue 组件传一组数据，将刚才那组图片数据放到 banner.vue 中的 data 中并返回。然后通过属性的形式将 imgs 传给 common-gallary 组件，Gallary.vue 再通过 props 接收这个 imgs 就可以了。

banner.vue
```
data(){
    return {
        imgs : ["http://img1.qunarzz.com/sight/p0/1902/84/84696f368bbec10da3.img.jpg_350x240_3a0fefe8.jpg","http://img1.qunarzz.com/sight/p0/1902/f3/f351c5dd27344a30a3.img.jpg_350x240_1136e527.jpg"]
    }
}
```

Gallary.vue
```
props:{
    imgs:{
        type : Array,
        default(){
            return imgs
        }
    }
},
```

此时打开页面，轮播依然可以正常渲染出来，没有问题。接着我们做一些逻辑上的控制，在 banner.vue 中让 common-gallary 默认是隐藏的，使用 v-show 中传一个 showGallary 变量，默认为 false，用这个变量来控制画廊的显示与隐藏。这个时候打开页面，可以看到画廊是不显示的。接下来我们要做一件事情，就是点击 banner 区域显示画廊。

打开 banner.vue，给 banner 外层区域绑定一个点击事件，并在 methods 中写这个方法：

banner.vue
```
<div class="banner-con" @click="hanleBannerClick"></div>

methods:{
    hanleBannerClick(){
        this.showGallary = true
    }
}
```

但是这个时候打开页面，会看到轮播出现了问题，因为开始 swiper 是隐藏状态，再次打开后，swiper 计算就会有问题，所以这里需要给 swiper 添加两个参数 observeParents（当Swiper的父元素变化时，Swiper更新）和 c（当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swipe）,

Gallery.vue
```
swiperOptions: {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        type: "fraction"
    },
    observeParents : true,
    observer : true
}
```

这个时候就没有任何问题了。接下来再实现一个功能，就是点击画廊，可以将他关闭。首先在 Gallary.vue 中给画廊组件绑定一个点击事件 handleGalleryClick，然后在 methods 中通过 emit 向外触发一个 close 事件，然后去 banner.vue 中绑定这个 close 事件，添加一个事件方法例如 GalleryClose，然后在 methods 中编写 GalleryClose 方法，让 showGallary 这个变量变为 flase，这样就实现了点击画廊，画廊关闭的效果。附上 Gallary.vue 和 banner.vue 的代码：

Gallary.vue
```
<template>
<div class="gallery-con" @click="handleGalleryClick">
    <div class="gc-wrapper">
        <swiper :options="swiperOptions" class="swiper">
            <swiper-slide class="slide" v-for="(item,index) of imgs" :key="index">
                <img
            class="slide-img"
            :src="item"
            alt
          >
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</div>
</template>

<script>
export default {
    name: "CommonGallary",
    props:{
        imgs:{
            type : Array,
            default(){
                return imgs
            }
        }
    },
    data() {
        return {
            swiperOptions: {
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    type: "fraction"
                },
                observeParents : true,
                observer : true
            }
        }
    },
    methods:{
        handleGalleryClick(){
            this.$emit("close");
        }
    }
};
</script>

<style lang="stylus" scoped>
.gallery-con {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9;
    background-color: #000;

    .gc-wrapper {
        .slide-img {
            width: 100%;
        }

        .swiper-pagination {
            color: #fff;
        }
    }
}
</style>
```

banner.vue
```
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
                <span class="iconfont">&#xe624;</span>3
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
            }
        }

        .bt-tit {
            font-size: 0.28rem;
            margin-top: 0.2rem;
        }
    }
}
</style>
```

以上我们就完成了公用图片画廊组件拆分与功能的实现，最后记得提交代码并合并分支。



### 三、实现 Header 渐隐渐显效果

可以打开 [去哪网](http://touch.piao.qunar.com/touch/detail.htm?id=989946426&from=as_recommend_sight) 看一下城市的详情页，首先他的左上角定位了一个返回图标，当页面向下滑动过的时候，这个返回图标消失，会渐渐出现一个头部，和首页的头部样式一样，所以我们先来完成头部这两个部分的布局样式。

首先在 details/components 目录下新建一个 header.vue 组件，并在 Details.vue 中引用并使用这个组件，然后编写 header.vue 组件的布局与样式。例：

detail/header.vue
```
<template>
<div class="detail-header">
    <router-link class="header-abs" to="/">
        <span class="iconfont">&#xe624;</span>
    </router-link>
    <div class="header-fix">
        <div class="header-left">
            <span class="iconfont">&#xe624;</span>
        </div>
        <div class="header-center">北京世界园艺博览会</div>
    </div>
</div>
</template>

<script>
export default {
    name: "DetailHeader"
};
</script>

<style lang="stylus" scoped>
@import '~style/varibles';

.detail-header {
    .header-abs {
        position: absolute;
        top: .2rem;
        left: .2rem;
        width: 0.68rem;
        height: 0.68rem;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        text-align: center;
        line-height: 0.68rem;
        color #fff
    }

    .header-fix {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: $bgColor;
        overflow: hidden;
        color: #fff;
        padding: 0.2rem;

        .header-left {
            position: absolute;
            top: 0.2rem;
            left: 0.2rem;
        }

        .header-center {
            text-align: center;
            margin: 0 0.2rem;
        }
    }
}
</style>
```
当前效果图：

![](https://upload-images.jianshu.io/upload_images/9373308-854aa7b52227b41e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

注意，因为当前详情页内容不够长，不能下滑，所以给 Detail.vue 内容设置一个高度，让他能够向下滑动。

头部的布局样式完成了，接下来就需要实现一些逻辑了。默认打开详情页的时候，导航条是不显示的，只显示返回按钮图标，当页面向下滑动的时候，返回图标隐藏，导航条渐渐显示出来，我么来实现一下这个效果。

首先在 data 中定义一个变量 showAbs，默认为 true，然后通过 v-show 来决定哪个元素显示：

```
<template>
<div class="detail-header">
    <router-link class="header-abs" to="/" v-show="showAbs">
        <span class="iconfont">&#xe624;</span>
    </router-link>
    <div class="header-fix" v-show="!showAbs">
        <div class="header-left">
            <span class="iconfont">&#xe624;</span>
        </div>
        <div class="header-center">北京世界园艺博览会</div>
    </div>
</div>
</template>

<script>
export default {
    name: "DetailHeader",
    data(){
        return {
            showAbs: true
        }
    }
};
</script>
```

所以这个时候返回图标这个元素是显示的，header 部分不显示，当我们将页面向下滑，高度差不多是 50px 的时候，让返回图标隐藏，header 显示，所以这里要写一个滚动监听的函数，那就用到 activted 这个生命周期函数了。

在 activted 中，我们给 window 添加一个滚动监听事件 handleScroll，然后在 methods 中编写这个事件方法，通过 document.documentElement.scroll 来获取页面向上滚动的高度，然后做判断，当这个高度大于 50 的时候，也就是差不多大于图标按钮的高度时，图标按钮隐藏，header 部分显示，所以让 this.showAbs 为 false 就可以了，否则让他为 true，这样就实现了当页面的滚动高度大于 50 的时候，返回图标隐藏，header 显示。

header.vue
```
<script>
export default {
    name: "DetailHeader",
    data(){
        return {
            showAbs: true
        }
    },
    methods:{
        handleScroll(){
            const top = document.documentElement.scrollTop;
            if(top > 50){
                this.showAbs = false;
            }else{
                this.showAbs = true;
            }
            console.log(top);
        }
    },
    activated(){
        window.addEventListener("scroll",this.handleScroll);
    }
};
</script>
```

接下来就该实现渐隐渐显的动画效果了，在 if 判断中定义一个 opacity 变量，他等于 top/100，因为 top 值在页面滚动的时候是变化的，所以 opacity 也就是变化的了，然后做一个三元运算，当这个 opacity 大于 1 的时候，我就让他一直等于 1，也就是让他一直显示，否则的话，还是让他等于这个 opacity 变量，然后给 data 中的 opacityStyle 设置值，让他里边的 opacity 等于 opacity。

header.vue
```
<script>
export default {
    name: "DetailHeader",
    data(){
        return {
            showAbs: true,
            opacitySty:{
                opacity : 0
            }
        }
    },
    methods:{
        handleScroll(){
            const top = document.documentElement.scrollTop;
            if(top>50){
                this.showAbs = false;
                let opacity = top / 100;
                opacity = opacity > 1 ? 1 : opacity;
                this.opacitySty.opacity = opacity;
            }else{
                this.showAbs = true
            }
        }
    },
    activated() {
        window.addEventListener("scroll",this.handleScroll)
    },
};
</script>
```

回到页面，向下滚动，可以看到导航出现了一个渐隐渐显的效果。最后记得给导航中的返回按钮也添加一个返回首页的路由。

以上就实现了 Header 渐隐渐显效果。



### 四、对全局事件的解绑

先来回顾上一章，给 window 对象添加滚动监听事件这部分，我们在 handleScroll 中打印一些内容，例：

detail/header.vue
```
methods:{
    handleScroll(){
        console.log("scroll");
        // ...
    }
},
activated(){
    window.addEventListener("scroll",this.handleScroll);
}
```

启动项目服务，打开页面，在详情页滚动页面的时候，可以看到控制台输出了 “scroll” 内容，这没有问题，但是，回到首页，在滚动页面的时候，控制台中也打印出了 “scroll” 内容，也就是说首页也执行了 handleScroll 这个方法，但是这个方法我们是写在 header.vue 中的，为什么首页也会有呢？

因为之前我们都是用 @ 给元素绑定事件，而且是给当前组件中的元素绑定，他只作用于组件的内部，不会影响外部的组件，但是这里我们是给全局的 window 对象绑定的，所以会造成这种问题，这个滚动事件不仅对这个组件有效果，对其他的组件也产生了影响，那如何去处理这个问题呢？

当我们对这个组件用了 keep-alive 的时候，这个组件会多出一个 activted 生命是周期函数，这一块内容可以回顾一下 [“Vue.js第7课-项目实战-城市列表开发（part04）”](https://www.jianshu.com/p/2a5d7f190ceb) 中的第十一章，activted 在每次页面展示的时候会执行，与之对应，他还提供给我们一个新的生命周期函数，叫做 deactivted，他是页面即将被隐藏，或者说页面即将被替换成新的页面的时候，这个组件的 deactivted 这个生命周期函数会被执行，我们在这个函数中将给 window 对象添加的滚动事件给移除掉。

detail/header.vue
```
// ...
activated(){
    window.addEventListener("scroll",this.handleScroll);
},
deactivated(){
    window.removeEventListener("scroll",this.handleScroll);
}
// ...
```

也就你页面展示的时候绑定 scroll 事件，页面隐藏的时候再去对这个 scroll 事件进行解绑。这个时候，回到页面，在详情页滚动的时候，可以看到打印出了 “scroll”，回到首页，滚动页面的时候，并没有打印出 “scroll”，说明并没有执行滚动时间，这样就解决了上一章中留下的 BUG。

最后记得提交代码并合并分支。


### 五、使用递归组件实现详情页列表

这一章我们来完成详情页的列表部分，可以看一下 [去哪网](http://touch.piao.qunar.com/touch/detail.htm?id=38170&from=as_recommend_sight) 的详情页列表部分，因为内容比较多，所以我们先简单的实现一部分列表内容，来看一下递归组件如何使用。

首先还是新建一个 detail-list 分支并切换，在这个分支上进行代码的开发。然后新建 list.vue，编写组件的基本结构，然后到 Detail.vue 中引入并使用这个模板。这次我们先不编写模板的样式，先来看一下对数据的处理，在 Detail.vue 中添加一组数据，例：

Detail.vue
```
data() {
    return {
        list: [{
            title: "非指定日上午场票",
            children: [{
                    title: "[上午场]成人票（早定优惠）"
                },
                {
                    title: "[上午场]老人票"
                }
            ]
        }, {
            title: "指定日上午场票",
            children: [{
                    title: "[上午场]老人票"
                },
                {
                    title: "[上午场]学生票"
                }
            ]
        }, {
            title: "儿童票"
        }, {
            title: "特惠票"
        }]
    }
}
```

然后使用属性的方式将 list 传递给子组件 list.vue，list.vue 接收到 list 数据后，我们在模板中将它渲染出来，例：

list.vue
```
<template>
<div>
    <div class="list-con" v-for="(item,index) of list" :key="index">
        <div class="list-tit">{{item.title}}</div>
    </div>
</div>
</template>
```

此时页面是这样的一个效果：

![](https://upload-images.jianshu.io/upload_images/9373308-fe1bd70c409aceb2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

之前我们在 list 数据的每一项下还添加了一组子项 children，它里面又包含着几组数据，现在我们将 children 子项页渲染到页面，这个时候就用到递归组件了，递归组件的意思就是在组件自身调用组件自身：

list.vue
```
<template>
<div>
    <div class="list-con" v-for="(item,index) of list" :key="index">
        <div class="list-tit">{{item.title}}</div>
        <div class="list-children">
            <div v-if="item.children" class="list-children-item">
                <detail-list :list="item.children"></detail-list>
            </div>
        </div>
    </div>
</div>
</template>
```

上面代码中，我们在 list-children 这个元素下，先做了一个判断，当 item.children 下有值的时候，调用一下自身，也就是 detail-list 这个组件，这个组件也是通过属性的形式，传一个 list，因为在 list.vue 中已经通过 props 接收到 list 了，而且外层已经循环过 list 了，现在我们只是要获取 list 下的 children 中的数据了，所以直接让这个 list 属性等于 item.children 就可以了，打开页面，可以看到这样一个效果：

![](https://upload-images.jianshu.io/upload_images/9373308-fbb93df60f66a4b7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

虽然样式上有问题，但是我们可以在控制台中看到这些数据是存在层级关系的，说明数据渲染的没有问题，接下来我们对样式做一个调整。

list.vue
```
<template>
<div>
    <div class="list-con" v-for="(item,index) of list" :key="index">
        <div class="list-tit border-bottom">
            <span class="ticket"></span>
            {{item.title}}
        </div>
        <div class="list-children">
            <div v-if="item.children" class="list-children-item">
                <detail-list :list="item.children"></detail-list>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "DetailList",
    props: {
        list: Array
    }
};
</script>

<style lang="stylus" scoped>
.list-con {
    .list-tit {
        position: relative;
        height: 0.88rem;
        line-height: 0.88rem;
        padding: 0 0.2rem 0 0.6rem;

        .ticket {
            display: inline-block;
            position: absolute;
            width: 0.36rem;
            height: 0.36rem;
            top: 0.26rem;
            left: 0.2rem;
            background: url('//s.qunarzz.com/piao/image/touch/sight/detail.png') 0 -0.45rem no-repeat;
            background-size: auto;
            margin-right: 0.1rem;
            background-size: 0.4rem 3rem;
        }
    }

    .list-children {
        padding: 0 0.2rem;

        .list-children-item {
            .ticket {
                background: none;
            }
        }
    }
}
</style>
```

此时打开页面，可以看到页面是这样一个效果的：

![](https://upload-images.jianshu.io/upload_images/9373308-5734f58c4d6af997.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果我们将 data 中 list 里的 children 中再添加一组 children 呢？可以试一下：

Detail.vue
```
// ...
list: [{
    title: "非指定日上午场票",
    children: [{
            title: "[上午场]成人票（早定优惠）",
            children:[{
                title:"第三级"
            },{
                title:"第三级"
            }]
        },
        {
            title: "[上午场]老人票"
        }
    ]
}, {
    title: "指定日上午场票",
    children: [{
            title: "[上午场]老人票"
        },
        {
            title: "[上午场]学生票"
        }
    ]
}, {
    title: "儿童票"
}, {
    title: "特惠票"
}]
// ...
```

list.vue 中不需要做任何修改，因为我们在子组件中调用自身的时候，其实就相当于在调用子组件的位置又加了一边 template 中的内容，所以他会找到子数据再循环渲染一次，打开页面可以看一下：

![](https://upload-images.jianshu.io/upload_images/9373308-f4b277a3e5cb2d97.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

没有任何问题，记得将这部分代码提交一下。



### 六、使用 Ajax 获取动态数据

首先在 static/mock 目录下新建一个 details.json 文件，在里面存放详情页的信息，例如：

details.json
```
{
    "ret": true,
    "data": {
        "sightName": "北京世界园艺博览会",
        "bannerImg": "http://img1.qunarzz.com/sight/p0/1902/84/84696f368bbec10da3.img.jpg_600x330_5ca3e181.jpg",
        "gallaryImgs": ["http://img1.qunarzz.com/sight/p0/1902/84/84696f368bbec10da3.img.jpg_350x240_3a0fefe8.jpg", "http://img1.qunarzz.com/sight/p0/1902/3b/3bc5185f2bc00e49a3.img.jpg_350x240_3042e6e0.jpg", "http://img1.qunarzz.com/sight/p0/1902/99/99c0bd5da2c8b9cda3.img.jpg_350x240_d37145b3.jpg"],
        "categoryList": [{
            "title": "非指定日上午场票",
            "children": [{
                "title": "[上午场]成人票（早定优惠）"
            }, {
                "title": "[上午场]老人票"
            }]
        }, {
            "title": "指定日上午场票",
            "children": [{
                "title": "[上午场]成人票（早定优惠）"
            }, {
                "title": "[上午场]老人票"
            }]
        }, {
            "title": "儿童票"
        }, {
            "title": "特惠票"
        }]
    }
}
```

然后到 Detail.vue 中通过 axios 获取 detail.json 中的数据，在请求地址这一块需要注意一下，当访问 id 是 001 的景点的时候，应该获取的是 001 这个景点对应的数据，访问 002 获取的就是 002 这个景点对应的数据，所以每一次请求都把这个 id 带给后端，这个 id 是动态路由的一个参数，回忆一下[“Vue.js第8课-项目实战-旅游网站详情页面开发（part01）”](https://www.jianshu.com/p/38c62608d16c)中的动态路由，那里我们设置了点击不同的城市，地址会根据 id 的不同，而变得不一样。这里，在我们通过 Ajax 向后端请求数据的时候，也需要实现因 id 不同，请求地址也不同的逻辑，所以我们就要在 axios 请求的地址后加一个动态路由的参数，如何获得动态路由的参数呢？

首先看一下路由的配置，打开 router 目录下的 index.js，我们给 detail 这个路径后面加了一个 :id，定义了动态路由，会把对应的 id 存在对应的 id 变量里，那么在请求地址这一块就可以这样去写：
```
axios.get("/api/detail.json?params" + this.$route.params.id)
```

他的意思就是给这个请求地址加一个参数，这个参数就是去路由中找到的 id 这个参数，这个时候我们打开页面，例如点击 id 是 001 的城市，到 Network 中看一下，他的请求地址后边跟的就是 detail.json?id=001：

![](https://upload-images.jianshu.io/upload_images/9373308-451ed61d748ebc2a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

说明能够获取到 001 的 id 值，并发送 ajax 请求。上面这种方式我们直接将参数拼接到了路径后边，其实可以换一种方式，前面只写接口名，后面写一个对象，里边存放需要的参数：
```
axios.get("/api/detail.json",{
    params : {
        id : this.$route.params.id
    }
})
```

然后去调用 then 方法，去接收请求到的数据：

Detail.vue
```
<script>
// ...
import axios from "axios"
export default {
    // ...
    methods:{
        getDeatilInfo(){
            // axios.get("/api/detail.json?params" + this.$route.params.id);
            // 推荐把参数 params 放到对象中去使用：
            axios.get("/api/detail.json",{
                params : {
                    id : this.$route.params.id
                }
            }).then(this.getDEatilInfoSucc);
        },
        getDEatilInfoSucc(result){
            console.log(result);
        }
    },
    mounted(){
        this.getDeatilInfo();
    }
};
</script>
```

打开页面，可以看到，已经成功请求到了数据：

![](https://upload-images.jianshu.io/upload_images/9373308-a66a61ab7bbb2730.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

接下来，我们将请求到的数据做下处理，并将这些数据渲染到页面上。

Detail.vue
```
<template>
<div class="detail-content">
    <detail-banner :sightName="sightName" :bannerImg="bannerImg" :gallaryImgs="gallaryImgs"></detail-banner>
    <detail-header :sightName="sightName"></detail-header>
    <div class="content">
        <detail-list :categoryList="categoryList"></detail-list>
    </div>
</div>
</template>

<script>
import DetailBanner from "./components/banner";
import DetailHeader from "./components/header";
import DetailList from "./components/list";
import axios from "axios";
export default {
    name: "detail",
    components: {
        DetailBanner,
        DetailHeader,
        DetailList
    },
    data() {
        return {
            sightName: "",
            bannerImg: "",
            gallaryImgs: [],
            categoryList: []
        };
    },
    methods: {
        getDeatilInfo() {
            // axios.get("/api/detail.json?params" + this.$route.params.id)
            // 推荐把参数 params 放到对象中去使用：
            axios
                .get("/api/detail.json", {
                    params: {
                        id: this.$route.params.id
                    }
                })
                .then(this.getDEatilInfoSucc);
        },
        getDEatilInfoSucc(result) {
            if (result.data) {
                var data = result.data.data;
                this.sightName = data.sightName;
                this.bannerImg = data.bannerImg;
                this.gallaryImgs = data.gallaryImgs;
                this.categoryList = data.categoryList;
            }
        }
    },
    mounted() {
        this.getDeatilInfo();
    }
};
</script>

<style lang="stylus" scoped>
.detail-content {
    height: 20rem;
}
</style>
```

Detail.vue 中我们通过 axios 请求到了数据，并将数据都给到了各个属性上去，然后再通过属性的方式将这些数据传递给子组件们，最后到各个子组件中通过 props 接收数据并渲染到页面上，banner.vue、
header.vue、list.vue 这几个组件如何去接收数据并渲染我就不多说了。

这个时候详情页的效果应该是这样的：

![](https://upload-images.jianshu.io/upload_images/9373308-570bd3fa328556bf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

但是有一个问题，打开 Network，如果点击的是第一个城市，他会去请求:
```
http://localhost:8080/api/detail.json?id=001
```
这个路径下的数据，但是返回到首页，我们再点第二个城市，并没有发送新的请求，还是 id=001 的请求，刷新一下页面，才会去请求 id=2 的城市的信息，显然这是不符合逻辑的。导致出现这个问题的原因是什么呢？

回顾一下 keep-alive，我们在 App.vue 中给 router-view 外层包裹了一个 keep-alive 标签，他是 Vue 自带的一个标签，意思就是我的路由的内容被加载一次后，我就把路由中的内容放到内存之中，下一次再进入这个路由的时候，不需要重新渲染这个组件，去重新执行钩子函数，只要去内存里把以前的内容拿出来就可以。我们之前做城市列表页的时候，加了 keep-alive，可以在首页和列表页切换的的时候，不用每次都去请求 index.json 和 list.json，但是在这里，每一个城市的信息内容都是不同的，所以这里讲一个 keep-alive 中的一个属性 exclude，给他添加不想被缓存的页面组件的名字，例如：exclude="detail，意思是除了 detail 页面，其他页面都会被缓存。

这个时候，如果点击的是第一个城市，他会去请求 id=1 的城市信息数据，返回到首页，我们再点第二个城市，就会去请求 id=2 的城市信息。

这样页面就没有问题了么？回到页面上，我们这样去试一下：将首页往上滚动一部分，然后去点击城市，进入详情页，发现详情页也被向上滚动了同样的高度，也就是这个滚动在多个页面之间会互相影响，怎么解决这个 BUG 呢？打开 Vue 官网，找到 vue-router 下的滚动行为，官网给我们提供了一个方法 scrollBehavior，我们将这个方法添加到 router/index.js 中：

router/index.js
```
import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/home/Home";
import City from "@/pages/city/City";
import Detail from "@/pages/detail/Detail"

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },{
            path: "/city",
            name: "City",
            component: City
        },{
            path: "/detail/:id",
            name: "Detail",
            component: Detail
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});
```
这样就解决了滚动一个页面，影响多个页面的问题。scrollBehavior 这个方法的意思就是，我滚动了某个页面，当打开新的页面的时候，将新页面的位置定位到 x 轴和 y 轴都为 0 的位置。

*我还发现了一个问题，就是代码写到这里，我在详情页滚动页面的时候，头部显示不出来了，原本是有一个渐隐渐现的效果的，现在压根就不显示了，经过苦苦的寻找，找到了原因，是因为 activated 这个生命周期函数不执行了，原因是我在上边用了 exclude，取消了对详情页的缓存，所以详情页中使用的组件也不会被缓存。之前说过，当你使用 keeo-alive 的时候，组件中会多出一个生命周期函数 activted，既然这里设置了让 keep-alive 不包括详情页，就不会多出 activted 这个生命周期函数，那么滚动事件也不会被监听。这里换成声明周期函数 created 就可以了，在 created 中添加监听事件，与之对应的在 decreated 中移除监听事件（因为滚动会影响其他组件，所以在打开新页的时候要移除滚动事件，与之前讲的“对全局事件的解绑”中的 deactivated 意思是一样的）。*

以上就完成了使用 Ajax 获取动态数据，记得提交代码并合并分支。

**补充：**
到这里，我们想一个问题，每个组件都有一个 name 值，例：

detail/list.vue
```
export default {
    name: "DetailList",
}
```

那这个 name 值究竟是有什么用呢？在被其他组件调用的时候，这个 name 值是否决定了其他组件调用该组件时所使用的名称？例：

Detail.vue
```
<template>
<detail-list></detail-list>
</template>

<script>
import DetailList from "./components/list";
export default {
    name: "Detail",
    components: {
        DetailList
    },
}
```
可以看到，父组件 Detail.vue 引入并调用子组件的时候，确实使用了子组件 list.vue 的 name 值：DetailList，但这并不能说明子组件的 name 值就决定了调用他的组件使用他时就是 name 这个名字，我么可以这样试一下，把父组件 Detail.vue 中引入并调用子组件时的名字换一下：

Detail.vue
```
<template>
<detail-list000></detail-list000>
</template>

<script>
import DetailList000 from "./components/list";
export default {
    name: "Detail",
    components: {
        DetailList000
    },
}
```

上面我们将 DetailList 都换换成了 DetailList000，打开页面，可以看到页面显示依然正常，那就说明子组件中的 name 值和父组件引用并调用他时的名字并没有关系。那这个 name 值究竟有什么用呢？

目前我们可以知道他在下面这三个地方有用到过：

- 做递归组件的时候；
- 取消页面的缓存；
- 浏览器 Vue Devtools 查看对应的组件。

回忆一下上面我们使用递归组件实现详情页列表的时候，我们在 detail/list.vue 这个组件中，又调用了一次组件自身，因为是同一个组件，所以并不用 import 来引入，而是直接用组件的 name 值就可以了，例：

list.vue
```
<template>
<div>
    <detail-list :list="item.children"></detail-list>
</div>
</template>

<script>
export default {
    name: "DetailList",
    props: {
        list: Array
    }
};
</script>
```

为了验证组件调用自身的时候，就是通过 name 来调用的，我们可以将 DetailList 改为 DetailList000：

list.vue
```
<template>
<div>
    <detail-list000 :list="item.children"></detail-list000>
</div>
</template>

<script>
export default {
    name: "DetailList000",
    props: {
        list: Array
    }
};
</script>
```

回到页面上，可以看到显示依然没有问题。


还记得之前在详情页 detail.vue 中通过 axios 请求数据么？ 因为我们在根组件 App.vue 中使用了 keep-alive，但是每个详情页的内容是不同的，请求内容信息的地址也是不同的，所以这里使用了 exclude，意思是除了 exclude 内的页面，其他页面都会被缓存，exclude 中写的就是要取消缓存的那个页面的 name 值。

最后一个地方就是浏览器 Vue Devtools 查看对应的组件的时候，我们可以给浏览器安装一个插件 Vue Devtools，方便我们去查看组件的结构，以及组件的一些参数和配置。

![](https://upload-images.jianshu.io/upload_images/9373308-a4dbbb2798005152.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 七、在项目中加入基础动画

当点击详情页的时候，会出现一个画廊，点击画廊，他又会消失，如果想给这一过程加一个动画效果，一个渐隐渐显的效果，该如何实现？回忆下一 [“Vue.js第4课-Vue中的动画特效（part01）”](https://www.jianshu.com/p/aaae38025876)中实现动画特效的方法。

这里我们先在公共组件目录 common 下新建一个存放动画组件的目录 animation，然后在该目录下新建一个 fade.vue，子里边编写渐隐渐显的动画效果，这里我们使用插槽的方式来实现：

fade.vue
```
<template>
<transition>
    <slot></slot>
</transition>
</template>

<script>
export default {
    name: "fade"
};
</script>

<style lang="stylus" scoped>
.v-enter,
.v-leave-to {
    opacity: 0;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s;
}
</style>
```

接下来去 detail/banner.vue 中引入并使用这个组件，因为我们使用的是 slot 插槽的形式，所以在 banner.vue 中直接将画廊组件 common-gallary 放到 fade 模板中就可以了，这样就相当于给画廊组件外层包了一个 transition，并给他加上了动画效果：

detail/banner.vue
```
<template>
<div>
    <!-- ... -->
    <fade>
        <common-gallary :imgs="gallaryImgs" v-show="showGallary" @close="GalleryClose"></common-gallary>
    </fade>
</div>
</template>

<script>
// ...
import fade from "common/animation/fade";
export default {
    name: "DetailBanner",
    components : {
        fade
    }
    // ...
};
</script>
```

此时打开页面，当我们点击详情页的 banner 部分时，画廊会渐渐的显示出来，点击画廊部分，他会渐渐的消失，以上就完成了 banner 部分的一个简单的动画效果。

最后记得提交代码并合并分支。



## 九、项目实战-项目的联调，测试与发布上线

### 一、Vue 项目的接口联调

之前我们使用的数据都不是后端返回的真实数据，而是我们自己通过接口 mock 模拟的假数据，当我们开发到这样一个节点，如果前端的代码已经编写完毕了，后端的接口也已经写好的时候，我们就需要把前端模拟的数据删掉，去尝试使用后端提供的数据进行一个前后端的一个调试，这个过程就称为前后端的联调。在 Vue 中如何进行接口的联调？我们来看一下。

在之前写代码的时候，我们在 static 目录下，会有一个 mock 文件夹，里面写了一些 json 文件，当我们的代码做联调的时候，这些 mock 的数据就没用了，我们要把这些 mock 数据切换为后端真实提供给我们的数据。

我用 Node.js 启动了一个后端服务器，将之前 mock 模拟的数据放到 Node 服务器上并简单地编写了接口给前端调用，来实模拟测试前后端项目的联调。

如何用 Node.js 编写接口可以参考我的这篇文章 [“用 Node.js 编写 RESTful API 接口给前端调用”](https://www.jianshu.com/p/dbec0680aed9)，具体怎么编码我就不详细说了，可以去我的 GitHub 仓库[“Vue-Travel-Server”](https://github.com/he30265/Vue-Travel-Server.git)将文件下载下来，安装依赖包并启动，即可使用我编写好的接口。

用 Node.js 编写好数据接口后，我们可以测试一下，启动服务，访问以下三个地址：
```
http://localhost:8082/api/index.json
http://localhost:8082/api/city.json
http://localhost:8082/api/detail.json
```

![](https://upload-images.jianshu.io/upload_images/9373308-46ba3e66e79f819f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

看到数据可以请求成功，那就回到我们的 Vue 项目中，试用一下这三个接口，把 mock 删了，意思是我联调的时候不希望访问我本地的数据，而是去访问后端服务器的数据。打开 config/index.js，在[“Vue.js第6课-项目实战-首页开发（part03）”](https://www.jianshu.com/p/24d039183dc0)中讲过一个 proxy 代理的功能，之前我们将 /api 开头的请求替换成了本地的 /static/mock/ 下的数据，也就是将请求转发到前端 8080 这个服务器下，现在我要把他转发到后端的服务器上，我们将 target 中的地址换为后端服务器的地址（上面我在 Node.js 中设置的服务器端口号为 8082），在 pathRewrite 中，将 /api 的地址映射到服务器的 api 的路径下，而不是我本地的 /static/mock/ 路径：

config/index.js
```
proxyTable: {
    '/api': {
        target: 'http://localhost:8082', // 后端提供的接口地址
        pathRewrite: {
            '^/api': 'http://localhost:8082/api/',
        }
    }
},
```

这个时候，回到页面，我们可以看到 Node.js 提供的接口数据可以正常请求到，页面渲染也没有任何问题：

![](https://upload-images.jianshu.io/upload_images/9373308-67e3e747375c5ea4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

但是在 pathRewrite 中这么写，其实是没有任何意义的，直接将 pathRewrite 删除就可以了。此时 proxyTable 变得非常简单，只要你在开发服务器上请求 api 下面的地址，我都帮你转发到后台服务器上面。当改变了 config 目录下的配置文件的时候，需要重启前端项目服务。

这个时候，打开页面，可以看到成功请求到后端接口的数据并渲染到页面上了。当然，现在我们的前后端都是在我们本地，在做真实的前后端联调的项目中，如果后端服务不在本地，而是在后端程序员的电脑上，或者是内网/外网的服务器，如果是这样的话，你的代理就不能写 localhost 了，可以去写一个内网的 ip 地址，或者外网域名，通过这种形式，我们就可以把 /api 这个地址的任何请求代理转发给任何一台后端服务器从而非常方便的实现前后端的联调。

我们修改一下后端服务的主机名和端口号来做个测试，在 Node.js 服务器下这样修改：

app.js
```
const hostname = '127.0.0.1';
const port = 3000;
const server = app.listen(port,hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}`);
});
```

然后打开 Vue项目的 config/index.js，这样修改就可以了。
```
proxyTable: {
    '/api': {
        target:'http://127.0.0.1:3000',
        pathRewrite: {}
    }
},
```

回到页面上，可以看到数据请求依然没有任何问题。以上就完成了 Vue 项目的接口联调。



### 二、Vue 项目真机测试

这一章来看一下 Vue 项目如何进行真机测试。我们在通过 npm run dev 启动项目服务的时候，终端会显示出项目的服务地址，通过这个地址我们就可以访问项目了：

![](https://upload-images.jianshu.io/upload_images/9373308-762aabc1146859f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我再启动一个终端，执行 ifconfig（如果是 window 操作系统，命令就是 ipconfig），通过这个命令，我们可以获取到当前机器的 ip 地址：

![](https://upload-images.jianshu.io/upload_images/9373308-b625f0bdba4a9900.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

所以我电脑在内网里的 ip 地址就是 192.168.0.103，复制一下这个地址，然后在浏览器中输入一下 192.168.0.103，他指的也是我这台机器，所以 8080 端口和 localhost:8080 端口实际上指的地方都是一样的，正常访问 192.168.0.103:8080/ 也是可以打开项目的，但是现在浏览器提示无法建立链接，为了做一下确认，把 8080 端口换成 80（后端接口地址），本地的后端服务器是可以正常启动的，也就是说 ip 地址没问题，只是 8080 端口无法被外界访问，原因是我们前端的项目是通过 webpack-dev-server 启动的，webpack-dev-server 默认不支持通过 ip 的形式进行页面的问问，所以我们要对他默认的配置项做一个修改。

打开项目根目录下的 package.json 文件，我们每次执行 npm run dev 的时候，实际上都是在运行这样一段话：

package.json
```
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
```
也就是帮我们启动一个 webpack-dev-server，如果想让这个 webpack-dev-server 能够通过 ip 地址被访问的话，我们需要在上面那行代码中加一端代码“--host 0.0.0.0”：

package.json
```
"dev": "webpack-dev-server --host 0.0.0.0 --inline --progress --config build/webpack.dev.conf.js",
```

这样去修改一下配置项就可以了。重启一服务，这个时候，访问 192.168.0.103:8080/#/ 就没有问题了。可以通过 ip 地址访问网站之后呢，我们就可以让我们的手机直接在内网里通过这个地址访问该网站了。这样就可以做一个真机测试。

通过测试，发现一个 BUG，在城市列表也，我滑动右侧字母表，页面也跟着滑动了，所以在代码里我们需要把这个 BUG 解决掉。打开 city/alphabet.vue 这个组件，给模板中的 touchstart 加一个修饰符 prevent：

city/alphabet.vue
```
<div class="li" :ref="item" v-for="item of letters" :key="item" @touchstart.prevent="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" @click="handleAlpClick">{{item}}</div>
```

它是一个事件修饰符，可以阻止 touchstart 的默认行为，当阻止掉他的默认行为的时候，滚动字母表的时候，页面就不会跟着上下拖动了，回到手机上，可以看到没有任何问题了。

在 Vue 项目的真机测试中，因为手机机型的不同，就会出现不同的问题，如果是一些低版本的安卓手机，可能会出现在手机上访问这个网页，是白屏的效果，他可能有两种原因产生，一种是你的手机上可能默认不支持 Promise，解决这个问题，我们需要通过 npm 安装一个第三方的包，babel-polyfill，这个包他会判断，如果浏览器没有 Promise，会自动帮我们去添加这些 ES6 的新特性。

安装好之后，进入 main.js 入口文件，去引入 babel-polyfill 这个包，这样这个项目在所有浏览器上都支持 Promise 了，一部分手机上展示有白屏的问题也就得到解决。如果还有一部分手机依然有这样的问题，这种情况一般来说不是代码的问题，而是 webpack-dev-server 的问题，下一章我们来讲解 webpack 的打包上线，可以把项目打包好了之后，放到真正的开发环境或者线上环境，去做一个测试，当代码上传到开发环境的服务器或者线上的服务器环境的时候，白屏问题就不会出现了。


### 三、Vue 项目打包上线

在对 Vue 项目进行了联调与真机测试之后，我们把项目打包上线，那 Vue 的项目如何真正的完成上线的流程呢？

当我们做 Vue 项目上线的时候，首先第一步，在项目下打开命令窗口，运行 npm run build 命令，这个时候，Vue 的脚手架工具会帮助我们自动的对 src 目录下的源代码进行打包编译，生成一个能被浏览器运行的代码，同时这个代码也是一个压缩过后的代码。

![](https://upload-images.jianshu.io/upload_images/9373308-8af71760eec267b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

完成之后，打开我们的项目目录，可以看到里面多了一个 dist 目录，这个目录中的代码，就是我们最终要上线的代码，我先讲这个目录放到桌面上去。

![](https://upload-images.jianshu.io/upload_images/9373308-15068de3878e9112.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下一步，我会将 dist 目录里的内容给到后端的开发人员，后端会把这个代码放到服务器上，然后和后端代码一起上线。这样就完成了最简单的上线。