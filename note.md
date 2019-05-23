### 一、首页 header 区域开发

在这个项目中，我们使用 stylus 进行网站样式的开发，他比较像 less 和 sass，可以帮助我们在 css 中使用一些变量，方便我们快速的编写 css，接下来通过 npm 先来安装一下 stylus.css:
```
npm install stylus --save
npm install stylus-loader --save
```

![](https://upload-images.jianshu.io/upload_images/9373308-7c83a12da243c503.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

安装成功后，启动服务。

接下来去项目中开始编写头部的内容，打开 pages 目录中的 home 目录，我们可以在其中再新建一个目录 components 用来存放首页所需要的组件，我们可以把首页分成很多个小的组件，最后把它拼装起来，放到 Home.vue 中。在 components 中构建一个文件 header.vue。我们把 Home.vue 中的内容复制到 header.vue 中，然后在 template 标签中简单的添加一些元素。在 script 标签中给这个组件起一个名字，例如 “HomeHeader”。最后在 style 标签中添加一些样式。stylus 已经安装好了，所以就可以用 stylus 编写一些样式了。

header.vue:
```
<template>
<div class="header">
    <div class="header_left">返回</div>
    <div class="header_center">搜索</div>
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
    background-color: #f60;
    overflow: hidden;
    color: #fff;
    padding: 10px;

    .header_left {
        float: left;
    }

    .header_center {
        float: left;
        margin: 0 20px;
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

![](https://upload-images.jianshu.io/upload_images/9373308-3d6c2dc299312518.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

以上只是做一个简单的测试，实际的页面效果应该要按照设计稿来还原的。

补充：上面我们将样式写在了 vue 模板中的 style 标签里，如果想要用外部引用的方式来引入样式，该怎么所？首先新建一个 .styl 文件，在里边编写样式代码。在 vue 页面中，style 标签及上面的 lang 属性保持不变，通过 import 来引入这个 .styl 文件就可以了（后缀名可以省略）：
```
<style lang="stylus" scoped>
@import "./header"
</style>
```




### 二、IconFont 的使用和代码优化

#### 1、IconFont 的使用

在 header.vue 中使用 IconFont，首先进入 [IconFont 官网](https://www.iconfont.cn/) 登录账号并创建一个项目，然后进入图标库，将需要的图标加入购物车，再进入购物车，将选择的图标添加到自己的项目中，最后下载至本地。

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

每个项目都是有一个主题颜色的，比如这个项目是 #f60，我们可以把这个颜色放到一个变量之中，每次只需要修改这一个变量就可以了。

在 assets 下创建一个 varibles.styl 文件，定义一个背景色变量，例如：

varibles.styl
```
$bgColor = #f60
```

如何使用这个变量呢？打开 header.vue 文件，通过 import 引入 varibles.styl 文件：

header.vue
```
@import "../../../assets/style/varibles.styl"
```

然后把 background-color 后面的值替换为 $bgColor 这个变量就可以了。


接下来再做一个优化，我们看到找 varibles.styl 这个文件向上找了好几层，之前我们用过一个内容，让圈a代表 src 目录，那能不能在这里不写这么长，也用圈a来代替 src 目录？这样是可以的，但是因为这是在 style 中引入的，所以要在圈a前加一个“~”：
```
// @import "../../../assets/style/varibles.styl"
@import "~@/assets/style/varibles.styl"
```

有的时候，我觉得像 style 这个目录里的东西到处都要用，比如说 main.js 里和 header.vue 里都在反复的使用这个目录，那有没有办法给他起一个别名呢？就像这个圈a符号一样。

这样是可以的，打开 build 目录下的 webpack.base.conf.js 文件，找到 resolve 下的 alias（别名） 对象，在创建一个别名，例如：
```
// ...
alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('src'),
    'style': resolve('src/assets/style'),
}
// ...
```

然后就可以去修改 main.js 里和 header.vue 中对 style 的引入了，记得在修改了配置文件，需要重新启动项目。

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


