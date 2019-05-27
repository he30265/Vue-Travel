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

补充：上面我们将样式写在了 vue 模板中的 style 标签里，如果想要用外部引用的方式来引入样式，该怎么做？首先新建一个 .styl 文件，在里边编写样式代码。在 vue 页面中，style 标签及上面的 lang 属性保持不变，通过 import 来引入这个 .styl 文件就可以了（后缀名可以省略）：
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

此时页面的一个效果：

![](https://upload-images.jianshu.io/upload_images/9373308-3daff82401cf7358.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

基本代码已完成，接下来把它提交到分支 home-swiper 上，之前已经切换到 home-swiper 分支了，可以通过 git branch 检查一下，然后正常提交就可以了：

![](https://upload-images.jianshu.io/upload_images/9373308-7dc366d7ab2a5543.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

执行上面命令时，直接通过 git push 提交失败了，是因为此时 GitHub 中还没有 home-swiper 这个分支，所以需要通过 命令 “git ush -u origin home-swiper” 进行提交，此时打开 GitHub 仓库，就可以看到有 home-swiper 这个分支的信息了。

![](https://upload-images.jianshu.io/upload_images/9373308-f06f836b6f9472c2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后通过命令 git checkout master 切换到主分支，与 home-swiper 分支合并。注意，在切换主分支之前，一定要将代码提交到仓库中。

![](https://upload-images.jianshu.io/upload_images/9373308-064bd6e21129ff99.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




### 四、图标区域页面布局与逻辑实现

和上一节首页轮播图一样，我们再创建一个分支 home-icons 并切换到这个分支，将图标区域组件提交到这个分支上去。流程一样，先新建一个 icons.vue，然后在 Home.vue 中引入这个组件，最后编辑这个组件的布局样式就行。

注意，这块也应该是一个轮播效果，当图标超过8个的时候，在第二屏展示，可以根据 swiper.vue 对布局进行一个配置，在去哪网上找一些图标素材，把数据添加到组建的 data 下，通过 v-for 渲染出来。

![image.png](https://upload-images.jianshu.io/upload_images/9373308-9a827ed1442a61dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

页面的布局样式我就不多说了，可以参考我写的结构样式：

icons.vue
```
<template>
  <div class="icon_list">
    <swiper :options="swiperOption">
      <swiper-slide>
        <ul class="ul">
          <li class="li" v-for="item of iconList" :key="item.id">
            <a href class="a">
              <img :src="item.imgSrc" alt class="ico">
              <span class="txt">{{item.txt}}</span>
            </a>
          </li>
        </ul>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeIcons",
  data() {
    return {
      swiperOption: {
        loop: false,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      iconList: [
        {
          id:'001',
          imgSrc:
            "http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
          txt: "景点门票"
        },
        {
          id:'002',
          imgSrc:
            "http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20193/f0f00d6dfe038c044dbc9a437f58b0eb.png",
          txt: "一日游"
        },
        {
          id:'003',
          imgSrc:
            "http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png",
          txt: "北京必游"
        },
        {
          id:'004',
          imgSrc:
            "http://img1.qunarzz.com/piao/fusion/1803/47/c2b659e048b11602.png",
          txt: "溜娃游"
        },
        {
          id:'005',
          imgSrc:
            "http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20191/0334cf5430b9b5505fd79e2b8d7e8670.png",
          txt: "爬长城"
        },
        {
          id:'006',
          imgSrc:
            "http://img1.qunarzz.com/piao/fusion/1803/6c/9e54a8540fee0102.png",
          txt: "故宫"
        },
        {
          id:'007',
          imgSrc:
            "http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png",
          txt: "动植物园"
        },
        {
          id:'008',
          imgSrc:
            "http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20195/35d83bb968d80d54926f30cfb92cb6ff.png",
          txt: "限时抢购"
        },
        {
          id:'009',
          imgSrc:
            "http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20194/b4511345827006994aa1980a3886f0ac.png",
          txt: "北京世园会"
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.icon_list >>> .swiper-container {
  height: 2.8rem;
}
.icon_list {
  margin: 0.24rem 0;
  .ul {
    overflow: hidden;
    margin: 0 -0.1rem;
    .li {
      width: 25%;
      float: left;
      box-sizing: border-box;
      padding: 0.08rem 0.1rem;
      .a {
        color: #333;
        font-size: 0.26rem;
        text-align: center;
        display: block;
        .ico {
          width: 1rem;
          height: 1rem;
        }
        .txt {
          display: block;
          font-size: 0.24rem;
        }
      }
    }
  }
}
</style>
```

上面代码中我添加了9个图标项，因为设置了轮播区域的高度，所以只显示出8个，如果想在第二屏显示剩下的轮播项该怎么做？我们可以通过 computed 属性来计算，回忆一下 ["Vue.js第2课-基础"](https://www.jianshu.com/p/bfb8aee31de4) 中的 computed 计算属性，它自带缓存机制，语法又比较简单。

修改一下 icons.vue 中 js 部分的代码：

icons.vue
```
export default {
  name: "HomeIcons",
  data() {
    return {
      swiperOption: {
        loop: false,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      iconList: [
        // ...
      ]
    };
  },
  computed: {
    pages() {
      const pages = [];
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 8);
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    }
  }
};
```

上面代码中，我们定义了一个 pages 属性，他返回一个内容，这个内容中先定义了一个数组 pages，这个数组就是最外层的一个数组，然后通过 forEach 便历 iconList，forEach 中传一个函数，他接收两个参数，第一个是便历出的每一项，第二个是每一项的下标，然后再定义一个 page，当前下标对应的数据应该展示在轮播图的第几屏，这个页码我们通过 Math.floor（向下取整）来计算，假设第3个数据，index 对应的是2，Math.floor(2/8) 是0，所以应该展示在第0页上，如果是第9个数据，index 对应的就是 8，Math.floor(8/8) 是1，所以第9个数据就会展示到第二页。page 计算完后，就可以做一个判断了，如果 pages 下面的第 page 项不存在，就让他等于一个空数组，然后把 item 添加到 pages 的第 page 项中。最后还需要返回 pages 这个属性。现在 pages 和 page 的关系其实就是这样的一个二维数组，pages 里包含着两个 page：
```
[[1,2,3,4,5,6,7,8],[9]]
```

数据便历出来了，接下来就该渲染到页面了，既然 pages 是一个二维数组，那么我们在模板中也要通过两个 v-for 来循环，先在 swiper-slide 中循环 pages，决定它是几页显示，然后在图标列表中循环 page，展示出每页的图标项。

icons.vue
```
<template>
  <div class="icon_list">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(page,index) of pages" :key="index">
        <ul class="ul">
          <li class="li" v-for="item of page" :key="item.id">
            <a href class="a">
              <img :src="item.imgSrc" alt class="ico">
              <span class="txt">{{item.txt}}</span>
            </a>
          </li>
        </ul>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
```

这样就没问题了，第一屏8个图标项展示完后，第9个会显示到第二屏。

![](https://upload-images.jianshu.io/upload_images/9373308-4e6677bdd2bd8f38.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


再来对模板做一个优化，如果图标下的文字多了，可能会影响页面的布局，这个时候可以通过样式来设置文字超出显示“...”：
```
overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
```

其实，不仅这里会用到超出显示“...”，其他地方也会用到，那我们就可以借助 styl 提供的 mixin 对这块的代码进行封装。在 asset 下 style 目录中新建一个文件 mixins.styl，在这里定义一个 ellipsic 方法，他接收的参数就是上边这三行样式代码。

mixins.styl
```
ellipsic() {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
```

如何用这个方法呢？首先在样式中通过 import 引入这个 mixins 这个文件，然后在元素样式下直接使用 ellipsic() 就可以了例：
```
<style lang="stylus" scoped>
@import "~style/mixins"
.txt {
    display: block;
    font-size: 0.24rem;
    padding:0 .1rem;
    ellipsic();
}
```

以上就完成了图标区域页面布局与逻辑实现，记得把代码提交到仓库，并切换到 master 分支合并。



### 五、“推荐组件”和“周末去哪组件”开发

这两个组件我们放在一起讲，依然新建一个分支来开发，不过，我们可以试着换一种方式，使用成员协作的方式来开发（如果条件允许的话，可以试一下，两台电脑，两个用户，模拟一下协作开发）。之前两个组件都是在同一个用户账户下，新建分支，开发完成之后再提交并合并，这次，我们试一下在这个项目仓库里添加一个团队成员，在他的账户上开发这个两个组件，再提交。具体操作方法可以参考我的 [“如何在GitHub上协作开发项目”](https://www.jianshu.com/p/4539b5dde0e2) 这篇文章。

接下来，在这个新成员的账户环境下我们开始开发“推荐组件”和“周末去哪组件”这部分。首先还是新建并切换到 index-recommend 这个分支上，流程和之前的几个组件一样，先在 home 目录下的 components 目下新建一个 recommend.vue 文件和 weekend.vue，编写布局结构和逻辑代码，然后在 Home.vue 中引用这个两个组件，布局样式我就不多讲解了，可以参考我写好的布局样式，或上去哪网看一下。

recommend.vue
```
<template>
  <div class="rec_wrap">
    <div class="rw_tit">猜你喜欢</div>
    <div class="rw_list">
      <div class="rl_li border-bottom" v-for="item of recommendList" :key="item.id">
        <a href class="a">
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
        </a>
      </div>
    </div>
    <div class="rw_more">
      <a href class="a">查看所有产品</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  data() {
    return {
      recommendList: [
        {
          id: "001",
          imgUrl:
            "http://img1.qunarzz.com/sight/p0/1902/84/84696f368bbec10da3.img.jpg_200x200_50323152.jpg",
          infoTit: "北京世界园艺博览会",
          infoTxt: "80条评论",
          infoMoney: "108"
        },
        {
          id: "002",
          imgUrl:
            "http://img1.qunarzz.com/sight/p0/1409/19/adca619faaab0898245dc4ec482b5722.jpg_200x200_1bc99086.jpg",
          infoTit: "故宫",
          infoTxt: "659条评论",
          infoMoney: "60"
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '~style/mixins';
@import '~style/varibles';

.rec_wrap {
  .rw_tit {
    font-size: 0.32rem;
    color: #333;
    padding: 0.2rem;
  }

  .rw_list {
    .rl_li {
      padding: 0.2rem;

      .a {
        color: #333;
        display: flex;

        .pic {
          width: 2rem;
          height: 2rem;

          .img {
            width: 100%;
          }
        }

        .info {
          flex: 1;
          min-width: 0;
          padding: 0.2rem;
          box-sizing: border-box;

          .tit {
            font-size: 0.28rem;
            ellipsic();
          }

          .txt {
            font-size: 0.22rem;
            color: #666;
            margin: 0.2rem 0;
            ellipsic();
          }

          .money {
            font-size: 0.22rem;
            color: #666;

            .b {
              font-size: 0.18rem;
              color: #ff7b00;
            }

            .i {
              font-size: 0.38rem;
              color: #ff7b00;
            }
          }
        }
      }
    }
  }

  .rw_more {
    .a {
      display: block;
      text-align: center;
      font-size: 0.28rem;
      padding: 0.2rem 0;
      color: $ftColor;
    }
  }
}
</style>
```

补充：在原网站上每一个列表项都有一个下边的，回忆一下在("Vue.js第5课-Vue项目预热)[https://www.jianshu.com/p/402e35c9e978] 讲过的1像素边框的问题，那个时候在全局引入了一个 border.css，所以这个下边框就不需要在样式选择器中写了，直接在这个元素标签上加一个 border-bottom 的 class 名就可以了。

weekend.vue
```
<template>
  <div class="rec_wrap">
    <div class="rw_tit">周末去哪儿</div>
    <div class="rw_list">
      <div class="rl_li" v-for="item of weekendList" :key="item.id">
        <a href class="a">
          <div class="pic">
            <img :src="item.imgUrl" alt class="img">
          </div>
          <div class="info">
            <div class="tit">{{item.infoTit}}</div>
            <div class="txt">{{item.infoTxt}}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeWeekend",
  data() {
    return {
      weekendList: [
        {
          id: "001",
          imgUrl:
            "http://img1.qunarzz.com/sight/source/1603/6d/2f67ae0659f41f.jpg_r_640x214_bf6cbd0b.jpg",
          infoTit: "北京赏花好地方",
          infoTxt: "乱花渐欲迷人眼，京城赏花大搜索"
        },
        {
          id: "002",
          imgUrl:
            "http://img1.qunarzz.com/sight/source/1811/f3/86173f863bef61.jpg_r_640x214_52b003ac.jpg",
          infoTit: "京城周末撒欢",
          infoTxt: "在帝都过周末，不仅仅是城中游！"
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '~style/mixins';
@import '~style/varibles';

.rec_wrap {
  background-color: #f4f4f4;

  .rw_tit {
    font-size: 0.32rem;
    color: #333;
    padding: 0.2rem;
  }

  .rw_list {
    .rl_li {
      margin-bottom: 0.1rem;

      .a {
        color: #333;

        .pic {
          width: 100%;

          .img {
            width: 100%;
          }
        }

        .info {
          box-sizing: border-box;
          padding: 0.2rem;
          background-color: #fff;

          .tit {
            font-size: 0.28rem;
            ellipsic();
          }

          .txt {
            font-size: 0.22rem;
            color: #666;
            margin-top: 0.2rem;
            ellipsic();
          }
        }
      }
    }
  }
}
</style>
```

 编写好 recommend.vue 和 weekend.vue 后，效果应该是这样的：

![](https://upload-images.jianshu.io/upload_images/9373308-db23eb0c13f4f8bb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

接下来将代码提交到远程仓库：

![](https://upload-images.jianshu.io/upload_images/9373308-7563f5ca8516e86a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后切换到主分支，并将 index-recommend 分支合并到主分支，记得，执行完合并命令后还需要 push 一下，提交到远程仓库。

![](https://upload-images.jianshu.io/upload_images/9373308-3dc1efb9366e7ca9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 六、Ajax 获取首页数据

之前，首页的数据都是写死在 data 中的，这一章我们通过 Ajax 动态的获取首页的数据内容。首先还是创建一个分支 index-ajax，并切换到这个分支:

![](https://upload-images.jianshu.io/upload_images/9373308-9106d18b08b43d9c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在 Vue.js 中发送 Ajax 请求有很多方式，比如说浏览器自带的 fetch 这个函数、vue-resource，现在官方推荐我们的是 axios 第三方模块，他可以实现跨平台的数据请求，比如在浏览器端 axios 可以发送 xhr 的请求，在 node 服务器上可以发送 http 请求。接下来看一下 axios 实现 Ajax 数据请求的方法。

首先通过 npm 安装 axios，安装成功后，启动项目服务。

![](https://upload-images.jianshu.io/upload_images/9373308-112fbadce7d22c36.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


之前在 pages/home/components 目录下新建了很多首页的组件，每一个组件都有自己的数据，如果每一个组件都在 data 中发一个 Ajax 请求，那组件如果非常多的话，就需要发送非常多的 Ajax 请求，这样一定会降低网站的性能，怎么做才比较合理呢？一个首页就让他发送一次 Ajax 请求，所以在 Home.vue 中发送 Ajax 请求就可以了，这个组件获取到数据后，可以把数据传给每一个子组件。

回忆一下 Vue.js 中的生命周期函数 mounted，我们就借助这个生命周期函数来写 Ajax 数据的获取。首先通过 import 引入 axios，在 mounted 中这样写：
```
mounted() {
    this.getHomeInfo();
}
```

在 mounted 里写一个 this.getHomeInfo() 这样的语句，让页面挂载好了之后去执行 getHomeInfo 这个函数，把这个函数定义在 methods 中，这个方法就帮助我们获取 Ajax 的数据，使用 axios.get() 这个方法，去请求一个 url，这个 url 可以写成 /api/index.json，axios 返回的结果是一个 prom 对象，随意可以用 .then(this.getHomeInfoSucc)，再定义一个 getHomeInfoSucc 函数，他会收到一个结果，把结果打印出来。
```
methods: {
    getHomeInfo() {
        axios.get("/api/index.json").then(this.getHomeInfoSucc);
    },
    getHomeInfoSucc(result) {
        console.log(result);
    }
},
```

到网页上看一下：

![](https://upload-images.jianshu.io/upload_images/9373308-937c7695ae5e5bae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

报错说，帮助你发送了一个 /api/index.json 的请求，但是这个请求返回的是404，因为现在就没有这个 json 文件，在没有后端支持的情况下，我们可模拟一下数据。在项目中，有一个叫 static 的目录，static 目录存放的是静态的文件，我们可以在下面新建一个目录 mock，添加一个 json 文件，先随便添加一些内容。

为什么要把模拟数据放到 static 这个目录中呢？因为在整个项目中，只有 static 目录下的的内容可以被外部访问到，意思是在地址后跟上路径，只有 static 这个目录下的文件可以被访问到，访问其他路径就会自动重新定位回到首页。

![](https://upload-images.jianshu.io/upload_images/9373308-5538d0913eb53687.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里在补充一个知识点，如果不想把这些本地的文件提交到远程仓库上，打开 .gitignore 文件，添加 "static/mock" 就可以了。

想一个问题，如果这么写了 json 文件，那 Ajax 请求的时候，地址就应该是
"/static/mock/index.json"，而不是 "/api/index.json"，去网页上看一下：

![](https://upload-images.jianshu.io/upload_images/9373308-d6f41334041b2e97.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

json 数据成功的获取出来了。可是，这么写就带来了一个新的问题，现在用的都是本地模拟的接口地址，假如代码要上线，肯定不能填成这样的一个地址，就需要在上线之前把这个地址重新替换成 api 格式的地址。上线之前改代码是有风险的，不建议这做，那怎么解决这个问题呢？

假设在开发环境中，我们依然这么写这个路径，但是如果有一个转发机制，可以帮助我们对 api 下面的所有 json 文件请求转发到本地的 mock 目录下，这样不就可以了么？

Vue.js 提供了一个 proxy 代理的功能，通过这个功能就可以实现刚才的一个构想。打开 config 目录下 index.js 文件，可以看到，在开发环境里，官方给我们提供了一个 proxyTable 这样一个配置项，在这里做一些配置：
```
proxyTable: {
  '/api': {
    target: 'http://localhost:8080',
    pathRewrite: {
      '^/api': '/static/mock/'
    }
  }
}
```

上面配置的意思是，当我们去请求 /api 目录的时候，我们希望他去帮助我们把请求转发到依然是这台服务器的8080端口上，只不过我希望他把路径做一个替换，一旦请求的地址是以 /api 开头的，就把它替换为请求到本地的 /static/mock 目录下。所以当去访问 /api/index.json 的时候，开发环境里，webpack-dev-server 这个工具会自动的帮助你把 /api 替换成 /static/mock/，请求的是 api，webpack-dev-server 自动的帮我们做一个开发环境的转发。

改动了配置文件，需要重启一下项目服务，然后打开页面。

![](https://upload-images.jianshu.io/upload_images/9373308-ba957eb26ffc050c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

页面没有问题，虽然我们取的是 /api 下的 index.json，实际上他已经帮我们自动的取到了 /mock 下的 index.json 的内容，接下来修改一下 index.json 里的内容，将之前写好的几个组件里的数据放进去，然后打开页面可以看一下：

![](https://upload-images.jianshu.io/upload_images/9373308-f671b87f954c5ef9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

以上，我们就通过 Ajax 获取到了 index.json 中的数据。



### 七、首页父子组件数据传递

这一章我们看一下如何把获取到的数据传给首页的每一个组件，也就是父组件向子组件传值的问题。

在 Home.vue 中定义一个 data，这里返回所有子组件的数据，首先他要存一个 city，也就是首页 header 部分右上角的城市名，我们先给他一个空字符串，接着在 methods 中的 getHomeInfoSucc 方法下编写逻辑代码。

在编写 index.json 的时候，添加了一个叫 ret 的属性，值为 true，他的意思就是后端正确的返回了结果。当 Ajax 请求到数据的时候，先做一个判断，如果后端正确的返回了结果并且结果中有 data 数据，就继续进行赋值的操作，我们让刚存的 city 的值等于返回结果中的 city，然后去 template 中找到header 这个组件，通过属性的形式向父组件进行传值，我们定义一个 city 属性，他的值就是下边 data 中返回的 city。接着，去 header.vue 中通过 props 接收这个值，使用插值表达式来渲染这个数据。

给其他的子组件传数据也都是这种方式，例如轮播组件，接收到数据后，可以把组件自己的 data 数据都删掉，通过 props 接收到父组件的值后，在 v-for 中也修改一下列表数据就可以了，下面列出我编写好的 Home.vue 和 swiper.vue 看一下：

Home.vue
```
<template>
<div>
    <home-header :city="city"></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icons :list="iconList"></home-icons>
    <home-recomment :list="recommentList"></home-recomment>
    <home-weekend :list="weekendList"></home-weekend>
</div>
</template>

<script>
import HomeHeader from "./components/header";
import HomeSwiper from "./components/swiper";
import HomeIcons from "./components/icons";
import HomeRecomment from "./components/recommend";
import HomeWeekend from "./components/weekend";
import axios from "axios";

export default {
    name: "home",
    components: {
        HomeHeader,
        HomeSwiper,
        HomeIcons,
        HomeRecomment,
        HomeWeekend
    },
    data() {
        return {
            city: "",
            swiperList: [],
            iconList: [],
            recommentList: [],
            weekendList: []
        }
    },
    methods: {
        getHomeInfo() {
            axios.get("/api/index.json").then(this.getHomeInfoSucc);
        },
        getHomeInfoSucc(result) {
            result = result.data;
            if (result.ret && result.data) {
                const data = result.data;
                this.city = data.city;
                this.swiperList = data.swiperList;
                this.iconList = data.iconList;
                this.recommentList = data.recommendList;
                this.weekendList = data.weekendList;
            }

        }
    },
    mounted() {
        this.getHomeInfo();
    }
};
</script>

<style lang="">
</style>
```

swiper.vue
```
<template>
<div class="wrapper">
    <swiper :options="swiperOption">
        <swiper-slide v-for="item of list" :key="item.id">
            <img :src="item.src" alt class="slide_img">
      </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</div>
</template>

<script>
export default {
    name: "HomeSwiper",
    props: {
        list: Array
    },
    data() {
        return {
            swiperOption: {
                loop: true,
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        };
    }
};
</script>

<style lang="stylus" scoped>
.wrapper {
    overflow: hidden;
    width: 100%;
    position: relative;

    .slide_img {
        width: 100%
    }

    >>>.swiper-pagination-bullet-active {
        background-color: #fff
    }
}
</style>
```

以上我们就完成了首页通过 Ajax 获取到数据后，将数据传递给首页的每个子组件，并将数据渲染到页面上。

最后，别忘了，提交代码到远程，并合并分支。



## Vue.js第7课-项目实战-城市列表开发

### 一、城市选择页面路由配置

点击首页右上角的城市，会跳一个城市选择的页面，现在我们先来实现这个跳转的功能。

首先在 pages 目录下新建一个城市的目录 city，在里面新建一个 components 目录和一个 City.vue 文件，和新建首页的方式是一样的。并在在 components 中新建一个属于城市列表页的头部组件 header.vue。然后在 City.vue 中引入并使用这个组件。接下来我们去 router/index.js 中配置一下路由，先引入 City.vue 这个组件，然后添加路由信息，设置城市列表页的路径是 /city。

router/index.js
```
import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/home/Home";
import City from "@/pages/city/City";

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
        }
    ]
});
```

完成这些后，我们就可以去首页的 header 中添加路由跳转了。打开首页的 header 组件，在需要跳转的元素外层包裹一个 router-link，用属性 to 指向目标跳转页面，例如：

pages/home/components/header.vue
```
<router-link to="city">
  <div class="header_right">
    {{this.city}}
    <span class="iconfont">&#xe64a;</span>
  </div>
</router-link>
```

此时，点击右上角的城市，就会跳到一个城市列表页，完善一下页面的布局与样式，并给城市列表页的头部也加一个 router-link，让他能够返回。

pages/city/components/header.vue
```
<template>
<div class="header">
    <router-link to="/">
        <div class="header_back">
            <span class="iconfont">&#xe624;</span>
        </div>
    </router-link>

    <div class="header_txt">城市选择</div>
</div>
</template>

<script>
export default {
    name: "CityHeader"
};
</script>

<style lang="stylus" scoped>
@import '~style/varibles';

.header {
    position: relative;
    background-color: $bgColor;
    overflow: hidden;
    color: #fff;
    padding: 0.2rem;

    .header_back {
        color: #fff;
        position: absolute;
    }

    .header_txt {
        text-align: center;
    }
}
</style>
```

运行项目，点击首页右上角的城市，可以跳转到城市列表页，点击城市列表页左上角返回图标，可以返回到首页，以上就完成了城市选择页面的路由配置。



### 二、搜索框布局

搜索框这个组件我们依然新建一个分支 city-search 并切换到这个分支进行开发，子组件的开发及在父组件上注册的流程我这里就不多说了，可以参考我编写的搜索框组件的布局样式：

search.vue
```
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
```

开发完成，记得提交代码并合并分支。



### 三、列表布局

新建一个分支 city-list 并切换到这个分支进行开发，可以参考我编写的搜索框组件的布局样式：

注意右侧有一个字母排序，给他先留一个区域，之后我们使用插件来修改这里。现在要做的就是把头部和上面的搜索框让出来，也就是让当前页面不能向下滚动，之后借助插件来实现一个拖拽效果。可以参考一下我编写的列表布局组件样式：

list.vue
```
<template>
<div class="list_wrapper">
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
            <div class="button_box">
                <div class="button">北京</div>
            </div>
            <div class="button_box">
                <div class="button">北京</div>
            </div>
            <div class="button_box">
                <div class="button">北京</div>
            </div>
            <div class="button_box">
                <div class="button">北京</div>
            </div>
        </div>
    </div>
    <div class="lw_section">
        <div class="ls_tit">A</div>
        <div class="ls_li">
            <div class="alp_li border-bottom">阿拉尔</div>
            <div class="alp_li border-bottom">阿拉尔</div>
            <div class="alp_li border-bottom">阿拉尔</div>
            <div class="alp_li border-bottom">阿拉尔</div>
            <div class="alp_li border-bottom">阿拉尔</div>
        </div>
        <div class="ls_tit">A</div>
        <div class="ls_li">
            <div class="alp_li border-bottom">阿拉尔</div>
            <div class="alp_li border-bottom">阿拉尔</div>
            <div class="alp_li border-bottom">阿拉尔</div>
            <div class="alp_li border-bottom">阿拉尔</div>
            <div class="alp_li border-bottom">阿拉尔</div>
        </div>
        <div class="ls_tit">A</div>
        <div class="ls_li">
            <div class="alp_li border-bottom">阿拉尔</div>
            <div class="alp_li border-bottom">阿拉尔</div>
            <div class="alp_li border-bottom">阿拉尔</div>
            <div class="alp_li border-bottom">阿拉尔</div>
            <div class="alp_li border-bottom">阿拉尔</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "CityList"
};
</script>

<style lang="stylus" scoped>
@import '~style/varibles';

.list_wrapper {
    overflow: hidden;
    position: absolute;
    top: 1.5rem;
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
```



### 四、Better-scroll 的使用及字母表布局

上一节，我们给列表区域加了一个超出隐藏，并且设置了绝对定位，这个时候列表是没法拖动的，我们可以使用一个第三方的包 better-scroll 来解决这个问题。

接着上面，先来看 [Better-scroll](https://github.com/ustbhuangyi/better-scroll) 的使用。 首先通过 npm 安装，然后看一下官网上的文档：
```
<div class="wrapper">
  <ul class="content">
    <li>...</li>
    <li>...</li>
    ...
  </ul>
  <!-- you can put some other DOMs here, it won't affect the scrolling -->
</div>

<script>
import BScroll from 'better-scroll'
const wrapper = document.querySelector('.wrapper')
const scroll = new BScroll(wrapper)
</script>
```

官网上告诉我们，使用这个插件，需要在包裹列表的元素外层，也套一层
 div，所以我需要修改一下页面，在 list-wrapper 下在加一层 div 就可以了。然后引入 better-scroll，创建一个 better-scroll 实例。

这里我们需要获取一下 Dom 元素，回忆一下[“Vue.js第3课-深入理解Vue组件（part01）”](https://www.jianshu.com/p/3f84f4724409)中 ref 的使用。给列表最外层元素一个 ref 属性，并给他一个值，将这个值传入 better-scroll 中。

在 js 中，首先引入 better-scroll，然后将逻辑代码写到 mounted 中，意思是当页面 Dom 挂载后，执行这个效果，例：

list.vue
```
<script>
import BScroll from "better-scroll";
export default {
    name: "CityList",
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper);
    }
};
</script>
```

这个时候打开页面，可以看到已经实现了一个滚动效果，并且有一个弹性的动画效果。其实这做的就是一个吸顶效果，使用这个插件会让用户体验更佳，当你下拉页面再松开的时候，会有一个反弹的效果。

最后，我们做一下右侧字母表的这个区块，依然是新建一个字母表组件，例如 alphabet，然后编写内容，并在 City.vue 中引用。右侧字母表组件可以参考我的样式布局：

alphabet.vue
```
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
```

然后打开页面，没有问题的话就会是下面的效果：

![](https://upload-images.jianshu.io/upload_images/9373308-de37ae04537e1811.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

以上就完成了城市列表的基本布局，下一节我们将逻辑添加到这个页面中。记得提交代码，合并分支。



### 五、页面的动态数据渲染

这一章使用 axios 将城市数据动态渲染到城市列表页，城市的数据存放在 static/mock/city.json 中，因为内容比较多，可以直接去我的 [项目线上仓库](https://github.com/he30265/Vue-Travel) 下载。

首先在 City.vue 中通过 ajax 获取 city.json 中的数据，然后在 data 中返回获取到的热门城市数组和所有城市对象，通过属性将这两组数据传递给子组件 list.vue。

City.vue
```
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
```

接下来去子组件中通过 props 接收这两组数据，并渲染到页面上：

list.vue
```
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
```

完成了这两组数据的渲染之后，我们提交一下代码，并合并到主分支。


接着我们完成一下右侧，看一下点击字母跳转到对应的字母下的城市列表该怎么实现。同样，新建 city-comments 分支，在这个分支上进项右侧功能的开发。


