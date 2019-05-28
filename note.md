### 一、城市选择页面路由配置

点击首页右上角的城市，会跳一个城市选择的页面，现在我们先来实现这个跳转的功能。

首先在 pages 目录下新建一个城市的目录 city，在里面新建一个 components 目录和一个 City.vue 文件，和新建首页的方式是一样的。并在 components 中新建一个属于城市列表页的头部组件 header.vue。然后在 City.vue 中引入并使用这个组件。接下来我们去 router/index.js 中配置一下路由，先引入 City.vue 这个组件，然后添加路由信息，设置城市列表页的路径是 /city。

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
<div class="header">
    <router-link to="/">
        <div class="header_back">
            <span class="iconfont">&#xe624;</span>
        </div>
    </router-link>
    <div class="header_txt">城市选择</div>
</div>
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

接着再完成右侧字母表的数据渲染，通过 Ajax 将字母表数据渲染到 alphabet.vue 中，方式和 list.vue 中渲染城市首字母的方式一样，使用的也是同一个数据：

alphbet.vue
```
<template>
<div class="alp_list">
    <div class="ul">
        <div class="li" v-for="(item,key) of cities" :key="key">{{key}}</div>
    </div>
</div>
</template>

<script>
export default {
    name: "CityAlphabet",
    props:{
        cities : Object
    }
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

当前效果图：

![](https://upload-images.jianshu.io/upload_images/9373308-ab4ae0c34f1a9695.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

完成 Ajax 数据的渲染之后，我们提交一下代码，并合并到主分支。

下一节我们来介绍如何实现点击右侧字母，定位到左侧对应首字母城市列表位置的这样一个效果了。




### 六、兄弟组件间联动

首先还是创建一个分支 git-comments，将这部分功能提交到这个分支上。

先来实现这样一个功能，点击右侧字母表，例如点击 B，城市列表就会定位到以 B 字母开头的城市。

打开 alphabet.vue，在循环的元素上加一个点击事件，例如 handleAlpClick，然后在 methods 中写这个事件方法，当执行点击方法的时候，这个事件会接受一个 e 对象，可以 console.log 在控制台看一下这个对象有哪些内容。这样我们就可以通过 e.target.innerHTML 获取到被点击的元素的值。然后回忆一下子组件是如何向父组件传值的，我们通过 emit 向外触发一个 change 事件，再传一个刚才获取到的元素的值到父组件 list.vue 中，让 list.vue 中对应字母的区块显示出来。现在我们要做的就是兄弟组件之间的传值，之前在["Vue.js第3课-深入理解Vue组件（part02）"](https://www.jianshu.com/p/451ae220bc7f)中讲过非父子组件的传值方法，通过 bus 总线的形式来传值。但是因为我们现在这个非父子组件非常的简单，可以让 alphabet 组件将值传递给 City 组件，然后 City 组件再将值转发给 list 组件，这样就实现了兄弟组件的传值。刚才我们已经通过 emit 向父组件出发了一个 change 事件，接下来去 City 中接收一下这个方法。

打开 City.vue，在模板中绑定一个 change 方法，方法名叫 handleAlpChange，然后在 methods 写这个方法，这个方法接收一个值 letter，这个 letter 就是 alphabet.vue 中获取的被点击的元素的值，可以在这个方法中 console.log 一下这个 letter，可以看到，他就是当前被点击的元素的字母，此时，父组件就接收到子组件传来的这个数据了。

接下来，我们在将父组件接收到的这个数据传给子组件 list.vue，父组件是通过属性向子组件传值的。首先在父组件 City.vue 里的 data 中定义一个 letter，默认值是空，在 handleAlpChange 方法中，当接受到外部传来的 letter 的时候，让 this.letter = letter。最后只需要把 letter 传递给子组件 list 就可以了，在 City 组件的模板 city-list 中通过 :letter="letter" 向子组件 list 传值。打开 list.vue，在 props 中接收这个 letter，并且验证类型为 String 类型。现在要做的就是，当 list.vue 发现 letter 有改变的时候，就需要让组件显示的列表项跟 letter 相同的首字母的列表项要显示出来，怎么做呢？

这个时候就要借助一个侦听器，回忆一下[”Vue.js第2课-基础“](https://www.jianshu.com/p/bfb8aee31de4)中的 watch 侦听器，我们要在 list.vue 这个组件里监听 letter 的变化，一旦 letter 变了，我们就需要做一些事情。先来打印一下 letter，可以看到，点击字母，就会打印出对应的字母，以上就完成了子组件监听父组件传来的数据的变化。

接下来就该在侦听器里的 letter 方法中编写逻辑代码了。better-scroll 给我们提供了这样一个接口，scroll.scorllToElement，如果 letter 不为空的时候，就调用 this.scroll.scrollToElement() 这个方法，可以让滚动区自动滚到某一个元素上，那么怎么传这个元素呢？在循环城市这一块中，我们给循环项加一个 ref 引用来获取当前 Dom 元素，让他也等于 key 就行，然后回到侦听器的 letter 中，定义一个 element，他就等于通过 ref 获取到的元素：
```
const element = this.$refs[this.letter][0];
```

这个时候就可以通过字母获取到他对应的区域，然后把 element 传入 scrollToElement 里，注意，上边代码最后加了一个 [0]，这是因为如果不加，通过 ref 或的的内容就是一个数组，这个数组里的第一个元素才是真正的 DOM 元素，这个时候，点击右侧字母表，就可以跳到对应的字母下的城市列表了。

点击跳转的功能实现啦，接下来再实现一下滑动右侧字母表，左侧城市列表切换的效果。

首先在 alphabet.vue 组件的模板中给循环项绑定三个新的事件： touchstart 事件 handleTouchStart、touchmove 事件 handleTouchMove 和 touchend 事件 handleTouchEnd，然后将这三个事件写到 methods 中，这三个事件需要帮我们做一些事，当 touchstart 事件执行之后，才会触发 touchmove 事件，所以要在 data 中定义一个标识位 touchSataus，默认值为 false，当手指触摸的时候，也就是触发 touchstart 事件的时候，在 handleTouchStart 方法中让 this.touchstart = true，当结束滑动的时候，在 handleTouchEnd 方法中让 this.touchstart = false。只有在触发 touchmove 事件的时候，才会执行 handleTouchMove 方法，主要的逻辑代码也就在 handleTouchMove 方法中来实现。

在 handleTouchMove 方法中，先做一个判断，也就是当 this.touchSataus 为 true 的时候，再编写下面的代码。先定义一个 startY 来获 A 字母距页面顶部的高度是多少，然后定义一个 touchY 来获取当前手指距离顶部的高度，做一个差值，就能够算出当前手指位置和 A 字母顶部的一个差值，再除以每个字母的高度，我就可以知道当前是第几个字母了，然后我去去对应的字母，触发一个 change 事件给外部就可以了。

如果想根据下标找到对应下标的字母的话，就需要有一个数组来存储这个字母的列表，现在我们通过 props 接收的 cities 是一个对象，不是一个数组，我们需要定义一个数组类型的数据，这里用到了 computed 计算属性，回忆一下[”Vue.js第2课-基础“](https://www.jianshu.com/p/bfb8aee31de4)中的 computed 属性。在计算属性中定义一个 letters 的一个属性默认为一个空数组，然后通过 for 循环遍历出 cities 中的每一项，添加到 letters 中，这样我们就构建出一个名字叫做 letters 的计算属性，然后返回这个属性，他的内容就是一个只包含字母表的一个数组了，那么上面的循环项也可以修改一下了，将 v-for 中的 cities 改为 letters，key 值让他等于 item 就可以了，传值也是 item 就可以了。

接下来再回到 handleTouchMove 方法中，继续编写拖动的代码，上面 touchY 获取了当前手指距离顶部的高度，因为上面还有城市选择和输入框的元素，所以需要减去这两个元素的高度，可以打印一下这个值，在浏览器中可以看到这个值是不断变化的。接着定义一个 index 的变量，他是一个字母的下标，他就等于 touchY - startY，再除以每个字母的高度，最后做一个向下取整，也就是：
```
const index = Math.floor((touchY - startY) / 22);
```

这样就可以算出当前手指滑动的位置对应的字母的下标是多。最后一步，通过 emit 向父组件触发一个 change 事件，并传一个下标对应的字母。这个 emit 是要写在一个判断里的，判断当 index 大于等于 0 并且 index 小于 letters 的长度，再去通过 emit 触发事件。

这个时候就实现了拖动右侧，左侧也跟着变得效果了，下面我把 alphabet 和  list 这两个子组件及 City 这个父组件粘贴到笔记中：

alphhabet.vue
```
<template>
<div class="alp_list">
    <div class="ul">
        <div class="li" :ref="item" v-for="item of letters" :key="item" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchendå="handleTouchEnd" @click="handleAlpClick">{{item}}</div>
    </div>
</div>
</template>

<script>
export default {
    name: "CityAlphabet",
    props: {
        cities: Object
    },
    computed: {
        letters() {
            const letters = [];
            for (let i in this.cities) {
                letters.push(i);
            }
            return letters;
        }
    },
    data() {
        return {
            touchSataus: false
        };
    },
    methods: {
        handleAlpClick(e) {
            this.$emit("change", e.target.innerHTML);
        },
        handleTouchStart() {
            this.touchSataus = true;
        },
        handleTouchMove(e) {
            if (this.touchSataus) {
                const startY = this.$refs["A"][0].offsetTop;
                const touchY = e.touches[0].clientY - 81;
                const index = Math.floor((touchY - startY) / 22);
                if (index >= 0 && index < this.letters.length) {
                    this.$emit("change", this.letters[index]);
                }
            }
        },
        handleTouchEnd() {
            this.touchSataus = false;
        }
    }
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

City.vue
```
<template>
<div>
    <city-header></city-header>
    <city-search></city-search>
    <city-list :hotCities="hotCities" :cities="cities" :letter="letter"></city-list>
    <city-alphabet :cities="cities" @change="handleAlpChange"></city-alphabet>
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
            cities: {},
            letter: ""
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
        },
        handleAlpChange(letter) {
            this.letter = letter;
        }
    },
    mounted() {
        this.getCityInfo();
    }
};
</script>

<style lang="stylus" scoped></style>
```

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
            <div v-for="(item,key) of cities" :key="key" :ref="key">
                <div class="ls_tit">{{key}}</div>
                <div class="ls_li">
                    <div class="alp_li border-bottom" v-for="city of item" :key="item.id">{{city.name}}</div>
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
        cities: Object,
        letter: String
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper);
    },
    watch: {
        letter() {
            if (this.letter) {
                const element = this.$refs[this.letter][0];
                this.scroll.scrollToElement(element);
            }
        }
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

以上就完成了字母表组件和列表组件进行了关联，兄弟组件间的通信，包括父子组件之间的通信也在项目中做了真实的应用。最后，记得提交代码合并分支。




### 七、列表切换性能优化

这一节我们来优化一下列表页面的性能，首先打开 alphabet.vue，上一节在这个组件中写了一个 handleTouchMove 方法，在里面获取了一个 A 标签的 offsetTop 值，这个值一直都是固定的，而我们需要每次执行这个方法的时候，都会去运算一次，所以他的性能比较低，提高这块的性能，我们可以这样去写：

在 data 里再定义一个变量 startY，初始值为 0，再写一个 updated 生命周期钩子，当页面的数据被更新的时候，同时页面完成了自己的渲染之后，updated 这个钩子就会被执行，他执行的时候，startY 就等于我们在 handleTouchMove 方法中定义的 startY 的值，还要把 index 中减去的 startY 替换成 this.startY，保存一下，到页面上看一下，效果没有问题。

看一下 updated 这一块是怎么回事，当初次渲染 alphabet.vue 的时候，用的是 City.vue 中的 cities 来渲染的，City.vue 中初始的 cities 值是一个空对象，也就是页面刚加载在的时候，alphabet.vue 什么定西都不会显示出来，当 City.vue Ajax 获取到数据之后，cities 的值才发生变化，alphabet 才被渲染出来，当往 alphabet 传的数据发生变化的时候，alphabet 这个组件就会重新渲染，当 alphabet 重新渲染之后，updated 这个生命周期钩子就会被执行，这个时候页面上已经展示出了城市字母列表里的所有内容，那么这个时候我们就会去 A 这个字母所在的城市列表所有的内容，也就去获取 A 所对应的 DOM 的 offsetTop 的值，就没有任何的问题。

这是第一步的性能优化，第二步做一个函数截流的性能优化。

当鼠标在字母表上来回移动的时候，这个时候，touchMove 执行的频率是非常高的，可以通过截流限制一下函数执行的频率。怎么做呢？可以在数据项中定义一个 timer，默认值等于 null，然后到 handleTouchMove 中编写代码。如果已经存在了，就 clearTimeout，否则，就创建一个 timer，给他一个 setTimeout 方法，将下面的逻辑代码剪切到这个定时器。也就是正在做这件事情的时候，我让他延时 16ms 再去执行，假设在这 16ms 之间，你又去做了手指的滚动，他就会把上一次做的操作给清除掉，重新做你这一次要做的事情，通过这种函数截流的方式，可以大大的节约 handleTouchMove 这个函数的执行频率，从而提高函页面的性能。更新一下 alphabet.vue 中的代码：

alphabet.vue
```
<template>
<div class="alp_list">
    <div class="ul">
        <div class="li" :ref="item" v-for="item of letters" :key="item" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchendå="handleTouchEnd" @click="handleAlpClick">{{item}}</div>
    </div>
</div>
</template>

<script>
export default {
    name: "CityAlphabet",
    props: {
        cities: Object
    },
    computed: {
        letters() {
            const letters = [];
            for (let i in this.cities) {
                letters.push(i);
            }
            return letters;
        }
    },
    data() {
        return {
            touchSataus: false,
            startY: 0,
            timer: null
        };
    },
    updated() {
        this.startY = this.$refs["A"][0].offsetTop;
    },
    methods: {
        handleAlpClick(e) {
            this.$emit("change", e.target.innerHTML);
        },
        handleTouchStart() {
            this.touchSataus = true;
        },
        handleTouchMove(e) {
            if (this.touchSataus) {
                if (this.timer) {
                    clearTimeout;
                }
                this.timer = setTimeout(() => {
                    const touchY = e.touches[0].clientY - 81;
                    const index = Math.floor((touchY - this.startY) / 22);
                    if (index >= 0 && index < this.letters.length) {
                        this.$emit("change", this.letters[index]);
                    }
                }, 16);
            }
        },
        handleTouchEnd() {
            this.touchSataus = false;
        }
    }
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

以上就完成了列表切换性能优化，记得提交代码合并分支。




### 八、搜索功能实现

打开 city 目录中 search 这个组件，新建一个列表的区块 search_content，让这个区块展示搜索的内容，此时他和 input 框是同级，所以需要在这两个元素外再包裹一层，然后给 search_content 一个样式布局，让他绝对定位到搜索框下。

完成基本的样式布局后，我们来实现一些逻辑，首先要把 input 框里的内容和我的数据做一个绑定，所以在 data 中返回一个 keyword，默认为空，通过 v-model 实现一个数据的双向绑定。然后 search.vue 这个组件还要接收 City.vue 传过来的 cities 数据，所以在 City.vue 中的模板 city-search 里通过属性的方式传一个 cities，接着回到 search.vue 中，通过 props 接收父组件传过来的 cities。再到 data 中返回一个 list 数组，默认为空。

写一个侦听器 watch，在里边监听 keyword 的改变，这里还是使用截流的方式来实现，先在 data 中定义一个 timer，默认值为 null，然后在监听 keyword 的方法中，判断，当 timer 为 null 时，清除这个定时器。下面写这个定时器的方法，当延时 100ms 的时候，箭头函数会被执行。先定义一个 result 变量，默认为空数组，然后通过 for 循环出 cities 中的每一项，再将 cities 中的每一项通过 forEach 遍历出来。forEach 中传一个箭头函数，这个函数接收一个 value，可以打印 value 看一下，他里面有一个 name 和 spell 值，我们可以通过判断这两个值中是否有输入的 keyeord 匹配的值，也就是如果从 name 和 spell 中能搜索到关键词，我们就把这一项添加到 result 中，然后让 data 中的 list 等于 result。

得到和输入相匹配的数据后，就可以通过 v-for 将他们渲染出来了。这个时候，基本的业务逻辑就编写完成了，打开页面，输入城市的中文或字母，下面就会展示出匹配的城市：

![](https://upload-images.jianshu.io/upload_images/9373308-4dff7e4c67ab1672.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

接下来子再通过 better-scrool 来实现一个下拉效果，首先引入 better-scroll，然后在钩子函数 mounted 中创建一个 better-scroll 实例，通过 ref 将 search_content 元素传入到这个实例中，这样就实现了一个下拉的效果。

最后再做一些细节上的处理，首先在输入框输入内容后，再清除掉，下边之前匹配出的城市依然存在，这个时候，只需要判断一下，当 keyword 值为空的时候，就让这个 list 为空，下边的列表也就不显示了。

当输入一个不匹配的字符串，此时下面是什么都不显示的，我们可以通过 v-show 做一个没有匹配项的提示，在 li 标签下添加一份 li 标签，通过 v-show 判断一下，当 list 中没有数据时，显示这个元素。可以直接将 js 的逻辑的运算 !list.length 放到 v-show 中，但是建议还是不要在指令中添加逻辑运算，我们可以使用 computed 计算属性，设置这个值，模板里面尽量保持简洁的语法。

先在，页面上始终都会显示这个查询结果元素，他把下面的元素都覆盖掉了，现在来解决一下这个问题。我们可以让 search_content 这个元素的显示与否通过一个变量来决定，v-show="keyword"，意思是，当有这个 keyword 的时候，才显示 search_content 查询结果的元素。

以上就完成了城市选择页的搜索内容，最后记得提交代码。