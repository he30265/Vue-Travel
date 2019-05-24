### 一、首页 header 区域开发

在这个项目中，我们使用 stylus 进行网站样式的开发，他比较像 less 和 sass，可以帮助我们在 css 中使用一些变量，方便我们快速的编写 css，接下来通过 npm 先来安装一下 stylus.css:
```
npm install stylus --save
npm install stylus-loader --save
```

![](https://upload-images.jianshu.io/upload_images/9373308-7c83a12da243c503.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

安装成功后，启动服务。

接下来去项目中开始编写头部的内容，打开 pages 目录中的 home 目录，我们可以在其中再新建一个目录 components 用来存放首页所需要的组件，我们可以把首页分成很多个小的组件，最后把它拼装起来，放到 Home.vue 中。在 components 中构建一个文件 header.vue，我们把 Home.vue 中的内容复制到 header.vue 中，然后在 template 标签中简单的添加一些元素。在 script 标签中给这个组件起一个名字，例如 “HomeHeader”。最后在 style 标签中添加一些样式。stylus 已经安装好了，所以就可以用 stylus 编写一些样式了。

这里再补充一个知识点，就是 rem 的使用，可以看一下我的 [“移动端开发 rem 单位使用问题”](https://www.jianshu.com/p/86afe3fafd4d) 这篇文章，这个项目中我们就用 js 动态设置 html 的 font-size 的方式来使用 rem。首先在项目中 main.js 文件里通过 import 引入 rem.js ，并在 main.js 中设置设计稿的宽，此时元素的 rem 值就是 设计稿中元素 px 值/100。然后还需要修改一个地方就是之前引入的样式初始化文件 reset.css，把 body 的 font-size 设置为 .14rem，否则页面初始化的字体大小就会有问题。

rem.js:
```
(function (doc, win) {
    var docEl = doc.documentElement;
    var resizeEvt =
        "orientationchange" in window ? "orientationchange" : "resize";
    var recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (clientWidth >= 640) {
            docEl.style.fontSize = "100px";
        } else {
            docEl.style.fontSize = 100 * (clientWidth / 640) + "px";
        }
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);
```

接下来可以去编写 header.vue 中结构和样式了，现在为了测试，我先把一些 icon 写成文字了，后面讲了 IconFont，再做替换，例：

header.vue
```
<template>
<div class="header">
    <div class="header_left">返回</div>
    <div class="header_center">
        <span></span>
        输入城市/景点/游玩主题
        </div>
        <div class="header_right">城市</div>
    </div>
</template>

<script>
export default {
    name: "HomeHeader"
};
</script>

<style lang="stylus" scoped>
.header {
    background-color: #02bcd5;
    overflow: hidden;
    color: #fff;
    padding: 0.2rem;

    .header_left {
        float: left;
    }

    .header_center {
        float: left;
        margin: 0 0.2rem;
    }

    .header_right {
        float: right;
    }
}
</style>
```

注意，因为使用的是 stylus，所以在 style 标签中需要给他添加一个 lang 的属性等于 stylus。还有，如果想让这个组件写的一些样式不要对其他的一些组件产生任何的影响，就在 style 标签中再写一个 scoped。

然后去 Home.vue 中去使用 header.vue 这个组件，在 script 标签中这样写：

Home.vue
```
<script>
// 引入 header.vue 组件
import HomeHeader from "./components/header";
export default {
    name: 'home',
    components: {
        HomeHeader
    }
}
</script>
```

上边已经将 header.vue 这个组件注册进来了，这时就可以在 template 中使用这个组件了。注意，我们给 header.vue 取得名字是 HomeHeader，所以在模板中使用他的时候，名字应该是 home-header。

Home.vue
```
<template>
<div>
    <home-header></home-header>
</div>
</template>
```

这个时候，我们打开页面看一下，样式可以正常显示，没有问题：

![](https://upload-images.jianshu.io/upload_images/9373308-ae56b7581aaeeba0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

以上只是做一个简单的测试，实际的页面效果应该要按照设计稿来还原的。

补充：上面我们将样式写在了 vue 模板中的 style 标签里，如果想要用外部引用的方式来引入样式，该怎么所？首先新建一个 .styl 文件，在里边编写样式代码。在 vue 页面中，style 标签及上面的 lang 属性保持不变，通过 import 来引入这个 .styl 文件就可以了（后缀名可以省略）：
```
<style lang="stylus" scoped>
@import "./header"
</style>
```




### 二、IconFont 的使用和代码优化

#### 1、IconFont 的使用

上一节我将 icon 部分写成了文字，现在我们来看一下在 header.vue 中如何使用 IconFont。首先进入 [IconFont 官网](https://www.iconfont.cn/) 登录账号并创建一个项目，然后进入图标库，将需要的图标加入购物车，再进入购物车，将选择的图标添加到自己的项目中，最后下载至本地。

将下载好的文件解压，将所需的文件拷贝到项目中：

![](https://upload-images.jianshu.io/upload_images/9373308-ddad4ed505e45a90.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

打开 src 下 assets 下 style 目录中创建一个目录 iconfont，然后将刚才解压得到的字体文件拷贝进去，然后在将 iconfont.css 这个文件放到 style 目录下就可以。这里还需要修改一下 iconfont.css 中字体文件的路径，此时已经变成当前路径下的 iconfont 目录下的文件了。

这个时候 IconFont 已经可以被使用了，先在 main.js 中引入 IconFont：

main.js
```
import "./assets/style/iconfont.css";
```

接下来，在 header.vue 中使用一下 IconFont，将之前的测试文字删除，可以添加一个 span，给他一个 class 名叫 iconfont（如果不加这个 class，就显示不了图标），再进入 IconFont 官网，进入项目，找到对应的图标，点击复制代码，将代码粘贴到 span 中，例：
```
<span class="iconfont">&#xe624;</span>
```

这个时候 IconFont 在项目中就可以正常使用了，接下来我们对代码进行一个优化。



#### 2、代码优化

每个项目都是有一个主题颜色的，比如这个项目是 #02bcd5，我们可以把这个颜色放到一个变量之中，每次只需要修改这一个变量就可以了。

在 assets 下创建一个 varibles.styl 文件，定义一个背景色变量，例如：

varibles.styl
```
$bgColor = #02bcd5
```

如何使用这个变量呢？打开 header.vue 文件，通过圈a加 import 引入 varibles.styl 文件：

header.vue
```
@import "../../../assets/style/varibles"
```

然后把 background-color 后面的值替换为 $bgColor 这个变量就可以了。


接下来再做一个优化，我们看到找 varibles.styl 这个文件向上找了好几层，之前我们用过一个内容，让圈a代表 src 目录，那能不能在这里不写这么长的路径，也用圈a来代替 src 目录？这样是可以的，但是因为这是在 style 中引入的，所以要在圈a前加一个“~”：
```
// @import "../../../assets/style/varibles.styl"
@import "~@/assets/style/varibles.styl"
```

有的时候，我觉得像 style 这个目录里的东西到处都要用，比如说 main.js 里和 header.vue 里都在反复的使用这个目录，那有没有办法给他起一个别名呢？就像这个圈a符号一样。

这样是可以的，打开 build 目录下的 webpack.base.conf.js 文件，找到 resolve 下的 alias（别名） 对象，再创建一个别名，例如：
```
// ...
alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('src'),
    'style': resolve('src/assets/style'),
}
// ...
```

然后就可以去修改 main.js 里和 header.vue 中对 style 的引入了，记得在 style 标签中通过圈a 引入文件时，一定要在前面加“~”。最后，在修改了配置文件后，需要重新启动项目才能生效。

main.js
```
// ...
import "style/reset.css";
import "style/border.css";
import "style/iconfont.css";
// ...
```

header.vue
```
// ...
@import "~style/varibles.styl"
// ...
```

看一下此时的一个效果：

![](https://upload-images.jianshu.io/upload_images/9373308-3acd88da9ed41a21.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

记得，每完成一个功能模块都要提交代码到 GitHub 远程仓库上。这几次的提交，我们都提到了 master 主分支上。在实际的大型项目开发之中，每个功能模块都会先提交到一个对应的分支上，最后，再把这些分支合并到主分支上，接下来，我们要完成首页轮播图这个组件，看一下怎么将这个组件提交到一个分支上，然后再合并到主分支 master 上。




### 三、首页轮播图

首先在远程仓库上新建一个分支用来提交“首页轮播”这个组件，如果你用的是码云作为你的远程仓库，直接在网站上就可以新建分支，但 GitHub 没有提供新建分支的操作，我们需要通过命令来新建，例如新建一个叫 home-swiper 的分支，并切换到这个分支：
```
git checkout -b home-swiper
```

通过 git branch 可以查看所有分支，标星号的是当前使用的分支。

![](https://upload-images.jianshu.io/upload_images/9373308-1a8dc6f912123d86.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在 home-swiper 这个分支下，我们编写一下首页轮播这个组件，这个轮播图我们用 swiper 来实现。去 GitHub 上搜一下 (vue-awesome-swiper)[https://github.com/surmon-china/vue-awesome-swiper] 这个项目，根据文档内容在我们的项目中使用 npm 安装 swiper。：
```
npm install vue-awesome-swiper --save
```

![](https://upload-images.jianshu.io/upload_images/9373308-fc8526dfd2eae21f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

安装成功后，需要在 main.js 中引入 swiper 并使用：
```
// ...
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */);
// ...
```

在 pages 的 home 的 compoments 目录下新建一个 swiper.vue 组件，编写组件内容，例：

swiper.vue
```
<template>
<swiper :options="swiperOption">
    <swiper-slide>I'm Slide 1</swiper-slide>
    <swiper-slide>I'm Slide 2</swiper-slide>
    <swiper-slide>I'm Slide 3</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
</swiper>
</template>

<script>
export default {
    name: "HomeSwiper",
    data () {
        return {
            swiperOption: {

            }
        }
    }
};
</script>
```

然后去 Home.vue 中引入并使用 HomeSwiper 这个组件，此时，控制台如果没有报错，swiper 组件的轮播效果就可以实现。

现在我们来完善一下 swiper 这个组件，在(去哪网手机版)[http://piao.qunar.com/touch/] 上拷贝几张轮播图片的地址，添加到组件的 data 中，在模板中通过 v-for 循环渲染出来，然后在 swiperOption 中添加几个属性，例如 loop 是否循环滚动，pagination 分页器，具体使用方法可以去 GitHub 上查看。最后还需要给这个轮播元素一个高度，如果不给高度，可能会导致一个问题，就是如果在 swiper 组件下面再添加了元素，当网络状况不好的时候，swiper 这个组件比下面的元素加载出的晚，下面元素会顶上去，swiper 组件加载出来后，下边元素又被撑下去，这样就会出现一个抖动的问题，所以需要给这个 swiper 组件外层再加一个 div，给这个 div设置一个高度。

最后还需要修改一下分页器被选中时的样式，直接在 .wrapper 下写 .swiper-pagination-bullet-active，然后设置背景色，发现并没有效果，这是因为我们在 style 标签中设置了 scope，解决方法：样式穿透，在 .swiper-pagination-bullet-active 前加 “>>>” 就可以了。

基本代码已完成，接下来把它提交到分支 home-swiper 上，之前已经切换到 home-swiper 分支了，可以通过 git branch 检查一下，然后正常提交就可以了：

![](https://upload-images.jianshu.io/upload_images/9373308-7dc366d7ab2a5543.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

执行上面命令时，直接通过 git push 提交失败了，是因为此时 GitHub 中还没有 home-swiper 这个分支，所以需要通过 命令 “git ush -u origin home-swiper” 进行提交，此时打开 GitHub 仓库，就可以看到有 home-swiper 这个分支的信息了。

![](https://upload-images.jianshu.io/upload_images/9373308-f06f836b6f9472c2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






### 四、