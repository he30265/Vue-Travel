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

打开 city 目录中 search.vue 这个组件，新建一个列表的区块 search-content，让这个区块展示搜索的内容，此时他和 input 框是同级，所以需要在这两个元素外再包裹一层，然后给 search-content 一个样式布局，让他绝对定位到搜索框下，这是为了之后调用 better-scroll 这个插件。

完成基本的样式布局后，我们来实现一些逻辑，首先要把 input 框里的内容和我的数据做一个绑定，所以在 data 中返回一个 keyword，默认为空，通过 v-model 实现一个数据的双向绑定。然后 search.vue 这个组件还要接收 City.vue 传过来的 cities 数据，所以在 City.vue 中的模板 city-search 里通过属性的方式传一个 cities，接着回到 search.vue 中，通过 props 接收父组件传过来的 cities。再到 data 中返回一个 list 数组，这个 list 数组用来存放和输入相匹配的结果项，默认为空。

写一个侦听器 watch，在里边监听 keyword 的改变，这里还是使用节流的方式来实现，先在 data 中定义一个 timer 定时器，默认值为 null，然后在监听 keyword 的方法中，判断，当 timer 为 null 时，清除这个定时器。下面写这个定时器的方法，当延时 100ms 的时候，箭头函数会被执行。先定义一个 result 变量，默认为空数组，然后通过 for 循环出 cities 中的每一项，再将 cities 中的每一项通过 forEach 遍历出来。forEach 中传一个箭头函数，这个函数接收一个 value，可以打印 value 看一下，他里面有一个 name 和 spell 值，我们可以通过判断这两个值中是否有输入的 keyeord 匹配的值，也就是如果从 name 和 spell 中能搜索到关键词，我们就把这一项添加到 result 中，然后让 data 中的 list 等于 result。

**知识点补充1：上边我们先用 for in 循环了 this.cities，这是因为 this.cities 他是一个对象，所以用 for in 来循环，for in 循环出的是 key，如果想取到 key 对应的的值，就要在后面跟上索引。然后再将循环出的值通过 forEach() 来循环，forEach() 来遍历数组，里面可以传一个方法。**

得到和输入相匹配的数据后，就可以通过 v-for 将他们渲染出来了。这个时候，基本的业务逻辑就编写完成了，打开页面，输入城市的中文或字母，下面就会展示出匹配的城市：

![](https://upload-images.jianshu.io/upload_images/9373308-4dff7e4c67ab1672.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

接下来子再通过 better-scrool 来实现一个下拉效果，首先引入 better-scroll，然后在钩子函数 mounted 中创建一个 better-scroll 实例，通过 ref 将 search_content 元素传入到这个实例中，这样就实现了一个下拉的效果。

最后再做一些细节上的处理，首先在输入框输入内容后，再清除掉，下边之前匹配出的城市依然存在，这个时候，只需要判断一下，当 keyword 值为空的时候，就让这个 list 为空，下边的列表也就不显示了。

当输入一个不匹配的字符串，此时下面是什么都不显示的，我们可以通过 v-show 做一个没有匹配项的提示，在 li 标签下添加一份 li 标签，通过 v-show 判断一下，当 list 中没有数据时，显示这个元素。可以直接将 js 的逻辑的运算 !list.length 放到 v-show 中，但是建议还是不要在指令中添加逻辑运算，我们可以使用 computed 计算属性，设置这个值，模板里面尽量保持简洁的语法。

现在，页面上始终都会显示这个查询结果元素，他把下面的元素都覆盖掉了，来解决一下这个问题。我们可以让 search_content 这个元素的显示与否通过一个变量来决定，v-show="keyword"，意思是，当有这个 keyword 的时候，才显示 search_content 查询结果的元素。

附上最终的 search.vue 的代码：

search.vue
```
<template>
<div class="search">
    <div>
        <input class="ipt" type="text" placeholder="输入城市名或拼音" v-model="keyword">
        <div class="search_content" ref="search" v-show="keyword">
            <ul>
                <li class="border-bottom" v-for="item of list" :key="item.id">{{item.name}}</li>
                <li class="border-bottom" v-show="hasNoData">没有找到匹配数据</li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import BScroll from "better-scroll";
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
    computed: {
        hasNoData() {
            return !this.list.length;
        }
    },
    watch: {
        keyword() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            if (!this.keyword) {
                this.list = [];
                return;
            }
            this.timer = setTimeout(() => {
                const result = [];
                for (let i in this.cities) {
                    this.cities[i].forEach(value => {
                        if (
                            value.spell.indexOf(this.keyword) > -1 ||
                            value.name.indexOf(this.keyword) > -1
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
        this.scroll = new BScroll(this.$refs.search);
    }
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
    background-color: #f5f5f5;

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

    .search_content {
        overflow: hidden;
        position: absolute;
        z-index: 1;
        top: 1.62rem;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        background-color: #f5f5f5;
        padding: 0 0.2rem;
        box-sizing: border-box;
    }
}
</style>
```

以上就完成了城市选择页的搜索内容，最后记得提交代码。




### 九、使用 Vuex 实现数据共享

这一章，我们使用 Vuex 来实现首页和城市页的数据共享。先创建一个分支 city-vuex 并切换到这个分支，进行开发。

先来看一下项目中现有组件的一个目录结构：

![](https://upload-images.jianshu.io/upload_images/9373308-5d961c981efae360.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们现在要实现的的是 City.vue 和 Home.vue 组件之间的通信，之前讲过我们可以通过 bus 总线的方式来实现非父子组件的通信，但是这种会比较麻烦，我们换一种方式，使用 Vue 官方推荐的数据框架 Vuex，下图是官网上的一个 Vuex 的图解：

![](https://upload-images.jianshu.io/upload_images/9373308-adf8f06c55150a44.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Vuex 可以进行多个页面复杂的传值，接下来我们看一下如何在项目中使用 Vuex。首先通过 npm install 安装 vuex：

![](https://upload-images.jianshu.io/upload_images/9373308-1cdf178a006aa2a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后在项目中引入 vuex，之前我们在安装插件的时候，都是在 src/main.js 中引入并通过 Vue.use() 来使用的，但是因为 vuex 处理的数据可能会比较复杂，所以我们在 src 目录下新建一个 store 目录，并在里面新建一个 index.js，在这里去引入 vue 和 vuex 并使用：

src/stroe/index.js
```
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        city: "北京"
    }
})
```

state 这个对象里边存放的就是公用的数据。

接着打开 src/main.js，这个时候就可以通过 import 直接引入 src/stroe/index.js 了，然后在下面的 vue 实例中添加 stroe 这个属性。此时运行一下项目，如果没有报错，就说明引用成功。

src/main.js
```
import store from "./store"
new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
});
```

打开 home/Home.vue，之前首页 header 部分右侧的城市数据是父组件通过 ajax 请求到 static/mock/index.json 中的 city 数据，然后通过属性的方式把这个数据传给子组件 header.vue，子组件 header.vue 再通过 props 接收，最后渲染到页面上。现在我们不用这种方式获取数据并渲染了，把 Home.vue 中 home-header、data、getHomeInfoSucc() 中的 city 都去掉，然后打开 home/header.vue，修改一下之前的插值表达式，将之前 {{this.city}} 修改为：
```
{{this.$store.state.city}}
```

因为我们在 stroe/index.js 下将数据存到了 State 中，所以直接通过state.city 就能获取到 city 的数据。这个时候打开页面，就可以看到“北京”正常渲染到头部右侧了。我们把城市列表页头部中的“当前城市”之前写死的“北京”也换成这种方式来渲染。

下面我们在实现一个功能，就是点击城市列表页下面的“热门城市”，他会显示到当前城市中。也就是我们要改变那张图中的 State，看一下图中绿色虚线框圈出的内容，首先得调用 Actions，然后再调用 Mutations，下面我们走一下这个流程：

我们给每一个热门城市绑定一个点击事件 handleCityClick，并把 item.name 传进来，然后将这个方法写在 methods 中，他接收一个 city，这个 city 就是被点击的城市。

现在我们已经获取到被点击的城市名了，接下来，在这个组件里，我要调用 vuex 中的 Actions，看那张图，有一个 Dispatch 的方法，我们在调用 Actions 的时候，一定要调用 Dispatch 这个方法，所以在这个 handleCityClick 方法中这么写：当改变 city 的时候，通过 Dispath 去触发一个 changeCity 的一个 Actions 的行动，将 city 作为第二个参数传过来。
```
methods :{
    handleCityClick(city){
        this.$store.dispatch(changeClick,city);
    }
}
```

Dispatch 的意思是派发一个名字是 changeCity 的 Actions 行动，然后把 city 传过去。当然这么写是没有效果的，因为在创建 store 的时候只有一个 city，并没有任何的 Actions，所以打开 store/index.js，写一个 actions 对象，他这里需要有一个 Dispatch 中名字一样的 Actions，也就是 changeCity，这个方法接收两个参数，第一个参数是一个上下文 ctx，第二个也就是传递过来的数据，就是那个 city。当你点击城市的时候，actions 会被派发，store/index.js 这里正好对应的 Actions 接收到传递过来的 city。

此时 Actions 中已经接收到传递过来的城市，他需要调用 Mutations 来改变 State（公用的数据），所以接下来要创建一个 Mutations，这里也可以写一个 changeCity，每一个 mutations 对应的参数也会有两个，第一个是 state，第二个是外部传过来的 city。我想 Actions 去调用 Mutations，那如何去调用呢？看一下图，Actions 如果想调用 Mutations，必须执行一个方法 Commit，那就在 actions 中执行一个下这个方法，之所以 Actions 中第一个参数是 ctx，作用就是他可以借助 ctx 帮助我们拿到 Commit 这个方法，然后去执行 changeCity 这个 Mutations，传过去一个内容是 city。然后在 Mutations 中做一个事情，State 指的是所有公用的数据，让这个数据等于 city 就可以了。

此时，打开页面，点击热门城市，当前城市就会变换了。

在刚才改变 state 的这个过程，并没有任何的异步操作，而且这个操作也非常的简单，不是一些批量的操作，其实这一块组件直接调用 Mutations 就可以了，跳过调用 Actions，我们把 Actions 部分注释掉，然后去 city/list.vue 中，可以不通过 Dispatch 调用 Actions，而通过 Commit 方法直接调用 Mutations 了，回到页面上，可以看到是没有任何问题的。

还有几处也要实现一下这样的效果，点击下边的城市列表，也可以更新当前城市，那么就在 city/list.vue 中给城市列表也加一个点击事件，需要注意的是，这里传的是 city.name，而不是 item.name，注意循环的变量。回到页面，可以看到也没有问题。

然后是城市搜索，点击搜索结果中的城市，也可以改变当前城市，所以打开 search.vue 这个组件，将 list.vue 中的 handleCityClick 方法复制一份到 search.vue 中，给查询出的结果项绑定一个 handleCityClick 就行了。

最后，我们还需要实现一个效果，就是点击了城市，能让他自动返回到首页。这一块讲解一下路由的知识，打开 Vue.js 的官网，在生态系统中找到 Vue Router，里边有一个编程式导航。在网页上，我们做页面跳转有两种方式，一种是通过 a 标签的形式，另一种是通过 js window.location.href 这种形式来做页面的跳转。在 Vue 中一样，我么可以通过 router-link 标签的形式进行页面的跳转，也可以通过 js 的形式进行页面的跳转，但是，他的 js 跳转不同于我们之前的 window.location.href 形式的跳转，在 Vue 只能够他用的是编程式导航的形式，编程式导航中给我们提供了一个 .push() 方法，就是帮助我们做页面跳转的，到代码中看一下怎么来用，打开 list.vue，在 handleCityClick 这个方法在，我们使用编程式导航这种方式，在城市改变后，让页面跳转到首页，因为我们的项目使用了 vue-router，所以每一个组件里都有 router 这样一个实例属性，这个实例属性上面呆了一个方法就叫做 push，通过这个方法就可以做页面的跳转，想跳到那一页，就在 push() 中添加哪一页的地址：
```
methods:{
    handleCityClick(city){
        this.$store.commit("changeCity",city);
        this.$router.push("/");
    }
}
```

list.vue 改好了之后，search.vue 也加一下 router.push。打开页面，可以看到点击选择城市后，自动跳转到了首页，而且首页右上角显示的就是你选择的城市，这个时候，两个页面的联动就做完了。



### 十、Vuex 的高级使用及 localStorage

这一章讲解一些稍微高级的 Vuex 的 api 的使用，同时讲解一下 localStorage 这个本地存储的内容。

上一章，我们在 src 目录下新建了一个 store 目录，这里存储了 Vuex 中的默认数据，city 设置成了北京，其实这样去写，是有问题的，点击城市，会改变这个 city，但是当页面刷新了，就又变回了北京。在真实的网站中，如果你这次选中了一个城市，下次再打开这个网页的时候，上次选的城市还应该在的，怎么解决这个问题呢？我们需要引入一个新的概念，叫做 localStorage，HTML5 中提供了一个新的 api，叫做 localStorage，它可以帮助我们实现类似与 cookie 的功能，做到本地存储，他的 api 要比 cookie 更加的简单，所以这里我们使用 localStorage 实现保存城市的功能。

打开 store/index.js，我们这样去写，当用户尝试去改变城市的时候，我不但把 state 中的 city 该了，同时还去存一个 localStorage，直接写 localStorage.city = city 就可以了。然后让 stare 中 city 的默认值是 localStorage.city || "北京"，就可以了。也就是 city 的值我默认先去 localStorage 中取，如果取不到，才用默认的 “北京”。

store/index.js
```
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        city: localStorage.city || "北京"
    },
    mutations: {
        changeCity(state, city) {
            state.city = city;
            localStorage.city = city;
        }
    }
})
```

这个时候打开页面，我们选择一个城市，然后刷新页面，可以看到上次选择饿城市还在。但是当使用 localStorage 的时候，建议在外层包裹一个 try{}catch(e){}，因为在某些浏览器，如果用户关闭了本地存储这样的功能，或者使用隐身模式，使用 localStorage 可能导致浏览器直接抛出异常，代码就运行不了了，为了避免这种问题，建议在外层加一个 try{}catch(e){}，怎么加呢？

先定义一个默认的 defaultCity 等于“北京”，然后写一个 try{}catch(e){}，这样写：如果有 localStorage.city，default.city 就等于 localStorage.city，下边 state 中的 city 就可以等于 defaultCity 了，同样在 mutations 的 changeCity 中也要写一个 try{}catch(e)：

store/index.js
```
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

let defaultCity = "北京"
try {
    if (localStorage.city) {
        defaultCity = localStorage.city;
    }
} catch (e) { }

export default new Vuex.Store({
    state: {
        city: defaultCity
    },
    mutations: {
        changeCity(state, city) {
            state.city = city;
            try {
                localStorage.city = city;
            } catch (e) { }
        }
    }
})
```

现在我们看到 store/index.js 这个文件慢慢的变得复杂起来了，实际上，在真正的项目开发和之中，会做进一步的拆分，在 store 中创建一个文件叫 state.js，然后把：
```
let defaultCity = "北京"
try {
    if (localStorage.city) {
        defaultCity = localStorage.city;
    }
} catch (e) { }
```
这块代码放进去，然后把 state 中的代码也拿到 state.js 中：
```
let defaultCity = "北京"
try {
    if (localStorage.city) {
        defaultCity = localStorage.city;
    }
} catch (e) { }

export default {
    city: defaultCity
}
```

接下来，只需要在 index.js 中 import state 就可以了：
```
import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
Vue.use(Vuex);

export default new Vuex.Store({
    state: state,
    mutations: {
        changeCity(state, city) {
            state.city = city;
            try {
                localStorage.city = city;
            } catch (e) { }
        }
    }
})
```

接着，我再在 store 目录下创建一个文件，叫做 mutations.js，然后把 index.js 中的 mutations 里的代码剪切进去：
```
export default {
    changeCity(state, city) {
        state.city = city;
        try {
            localStorage.city = city;
        } catch (e) { }
    }
}
```

最终 index.js 就变成了这样：
```
import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
Vue.use(Vuex);

export default new Vuex.Store({
    state: state,
    mutations: mutations
})
```

这样，我们就将 vuex 的代码拆分成了几个部分，未来他的维护性也会得到比较大的提高。

最后我们对 vuex 的使用做一个优化，对 pages/home/header.vue 进行一个优化，可以看到之前使用公用数据的时候，需要写 {{this.$store.state.city}} 一长串内容，vuex 给我们一个比较高级的 api，我们可以这样去写代码：
```
import {mapState} from "vuex";
```

之后来一个计算属性，在计算属性中用一个展开运算符：
```
import {mapState} from "vuex";
export default {
  name: "HomeHeader",
  computed :{
    ...mapState(['city'])
  }
};
```
里面可以写一个数组，mapState 是指，我把 vuex 里面的数据映射到我这个组件的 computed 中，我把 city 这个公用数据映射到我的一个名字叫做 city 的计算属性之中，做好这个映射之后，上面就不用写这么麻烦了，把 {{this.$store.state.city}} 改为 this.city 就可以了。

下面我们再去城市选择页做一个修改，

```
import {mapState} from 'vuex';
```

然后再写一个计算属性，刚才我们在展开运算符中传入的是一个数组，这回我们传一个对象：
```
// ...
computed:{
    ...mapState({
        currentCity : city
    })
}
// ...
```

他的意思就是，我想把 vuex 里的 city 这个公用的数据映射到我这个组件的计算属性里，映射过来的名字叫做 currentCity，如果这么写的话，上面的当前城市就可以改为 {this.currentCity}。

再改一下下面的城市列表，在 methods 中，当我点击城市按钮的时候，会派发一个 Mutations，vuex 同样给我们提供了一个简便的方法，叫做 mapMutations，所以我们可以这样改一下 import：
```
import {mapState,mapMutations} from 'vuex';
```
然后在 methods 中应用 mapMutations，这里一样可以传一个数组，传一个 changeCity：
```
methods:{
    handleCityClick(city){
        // this.$store.dispatch("changeCity",city);
        this.$store.commit("changeCity",city);
        this.$router.push("/");
    },
    ...mapMutations(['changeCity'])
}
```
他的意思就是，我们有一个 mapMutations 叫做 changeCity，然后我把这个 mapMutations 映射到我这个组件里一个名字叫做 changeCity 的方法里，那么如果我要调这个 mapMutations，就没必要：
```
this.$store.commit("changeCity",city);
```
这么麻烦的写了，可以直接改为 this.changeCity(city); 就行了。我们把这块 methods 中的方法复制一下，放到 search.vue 里面，记得在上面引入 mapMutations：import {mapMutations} from 'vuex'。

到这里，Vue 的一些高级写法也带大家接触了。接下来，打开 Vue 的官网，打开 Vuex，可以看到他有几个核心的概念：

![](https://upload-images.jianshu.io/upload_images/9373308-e7cef2ec3eaea316.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

State 我们几经熟悉了，存放的是公用的文件，Action 我们也用过，一些一步的方法我们可以写在 Action 中，Mutation 里放的是同步的大的对数九的一些改变，接下来看一下 Getter 的作用。

回到 store/index.js 中，写一个 getters，它对应的是一个对象，我们可以写一个方法，叫做 doubleCity，他会接收一个参数叫做 state，可以这样写：
```
getters: {
    doubleCity(){
        return state.city + " " + state.city;
    }
}
```

然后去首页上，打开 home/header.vue，这里右上角的城市我用的是 city，它显示的只是一个城市的名字，如果这里要用两个城市该怎么办呢？我们可以在 computed 下加一个 mapGetters：
```
import {mapState, mapGetters} from "vuex";
export default {
  name: "HomeHeader",
  computed :{
    ...mapState(['city']),
    ...mapGetters(['doubleCity'])
  }
};
```

他的意思就是我们把 Vuex 里的 getters 映射到我这个组件里的一个 computed 的计算属性里，这样就可以在右上角城市位置直接使用 {{this.doubleCity}} 了，打开页面，就可以看到右上角出现了两遍的城市名。

![](https://upload-images.jianshu.io/upload_images/9373308-b03e9182b61c4fd3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

那这有什么用呢？实际上，在 Vuex 中 getters 的作用有点类似于组件中的 computed 计算属性的作用，当我们需要根据 state 里面的数据算出一些新的数据的时候，我们就可以借助 getters 这样一个工具来提供新的数据，这样的话，我们可以避免数据的冗余。

最后，再来看一下 Vuex 中的最后一个核心概念，叫做 Module，什么时候用到 Module 呢？当我们遇到一个非常复杂的业务场景，比如在管理后台系统的时候，经常会有很多共用的数据，在 Vuex 中进行存储，如果我们把所有的 Mutations 都放到 mutations.js 文件中，这个文件慢慢的会变得非常庞大，难以维护，这个时候，我们可以借助 Module 对一个复杂的 Mutations、State 包括 Actions 进行一个拆分，可以看一下官网的例子，他定义了几个模块，moduleA、moduleB，创建 store 的时候，可以通过模块来做 store 的创建，这样有一个好处，就是，A 模块存储和 A 模块相关的数据，以及操作就可以了，B 模块存储 B 模块对应的数据及对数据的操做，然后在创建 store 的时候，我对各个模块进行整合，通过 Modul 写我们的代码，可以是代码具有更好的可维护性。当然，目前我们的项目中只有一个 city 这样的一个共有数据，所以没有必要去使用 Module 把我们的代码进行拆分。

以上就讲解了 Vuex 的高级使用及 localStorage，记得提交代码到远程仓库。



### 十一、使用 keep-alive 优化网页性能

这一章我们学习使用 keep-alive 这个 Vue 内置的 Vue 标签来对我们已经写好的两个页面进行性能的优化，首先还是先建一个分支 city-keepalive 并切换，在这个分支上进行开发。

启动项目服务，打开页面，这样看不存在什么问题，基本的一些业务逻辑都已经实现了，但是在控制台中打开 Network 网络这个选项，选择 XHR，当初次进入首页的时候，请求了一个 index.json 的文件，然后切换到列表页，又请求了一个 city.json，然后再回到首页，index.json 又请求了一次，再次去列表页，city.json 又请求了一次，也就是，没一次路由发生变化的时候，Ajax 都会重新的被发送。

![](https://upload-images.jianshu.io/upload_images/9373308-f536d48e2960f553.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们打开代码来看一下是什么原因，打开 Home.vue 首页这个组件，每一次打开这个首页的时候，都会被重新的渲染，所以 mounted 这个钩子就会被重新的执行，那么这个 Ajax 数据就会被重新获取，那么这么能让他只获取一次呢？

打开 main.js，可以看到入口组件是 App 这个组件，再打开 App.vue，router-view 显示的是当前地址所对应的内容，我们可以在外层包裹一个 keep-alive 的一个标签，他是 Vue 自带的一个标签，他的意思就是我的路由的内容被加载一次后，我就把路由中的内容放到内存之中，下一次再进入这个路由的时候，不需要重新渲染这个组件，去重新执行钩子函数，只要去内存里把以前的内容拿出来就可以，这个时候，回到页面上，再打开 Network，进入到列表页，选择城市再返回首页，就不会再去加载 index.json 了，同样再进入列表页，也不会再去加载 city.json 了，他直接会从内存中调数据，而不会重新去法 Ajax 请求了。

这样还是存在逻辑上的问题的，当我在“北京”的时候，首页显示的是“北京”的内容，当切换为“上海”时，树叶就应该显示“上海”的内容，所以城市发生改变的时候，首页还需要重新发一次 Ajax 请求，我们对这一块做一个调整。

打开 Home.vue 组件，改一下 axios 请求地址这里，在他的后面带一个参数，让他等于 Vuex 中存的当前的城市，所以还需要在 Home.vue 组件中引用 Vuex，import { mapState } from "vuex"，然后再加一个计算属性：
```
computed:{
    ...mapState(['city'])
}
```
获取到城市对应的内容，然后就可以在发 Ajax 的时候，把 city 放在请求的参数里面：
```
axios.get("/api/index.json?city=" + this.city).then(this.getHomeInfoSucc);
```

这个时候，我们打开页面，可以看到请求参数里已经携带了当前的城市：

![](https://upload-images.jianshu.io/upload_images/9373308-bd61b9bb9cd195b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

但是，例如当你切换了城市“桂林”，回到首页，并没有重新发 Ajax 请求，虽然上面的城市变成了“桂林”，但是底下的内容还是“北京”的内容，我们希望底下的内容跟着变，该怎么做呢？

当我们在 App.vue 中用了 keep-alive 的时候，这块的内容已经被缓存起来了，他直接取得是缓存里的数据，那如何去改变缓存里的数据呢？当你使用 keeo-alive 的时候，组件中会多出一个生命周期函数 activted，可以在 mounted 和 activated 两个生命周期函数下打印一些内容，到浏览器上看一下他俩的执行：
```
mounted() {
    console.log("mounted");
    this.getHomeInfo();
},
activated(){
    console.log("activted");
}
```

打开页面，可以看到，mounted 和 activated 都会执行，当切换了城市，再回到首页的时候，组件的 mounted 就不会执行了，就只有 activated 会被执行，那么我们借助 activated 这个生命周期函数就可以实现我们想要的功能了。

首先在页面被挂载的时候，也就是 mounted 中一定会去发一个 Ajax 请求，当页面重新被显示的时候，activated 一定会被重新的执行，那么我们就可以在页面每次重新显示的时候，可以判断当前页面上的城市和上次页面上显示的城市是否是相同的，如果不相同的，就再发一次 Ajax 请求。

先在 data 中设置一个数据 lastCity，默认值是空，接着当页面被挂载的时候，让他等于 this.city，对上一次的城市做一个保存，当页面被重新激活的时候，我们在 activted 中这样写：
```
activated(){
    if(this.lastCity !== this.city){
        this.getHomeInfo();
    }
}
```

如果上一次的城市 lastCity 不等于当前城市的时候，就重新发一个 Ajax 请求，直接调用上面 getHomeInfo 方法就可以了。当上次的 city 和这次的 city 不一样时，还需要让他等于这次的 city。回到页面上，可以看到当切换的城市和上次的城市一样时，Ajax 就不会请求 city.json 了，当不一样时，才会去请求 city.json。

回到代码里面，通过 activted 这样一个 keep-alive 新增的生命周期函数，结合 lastCity 这样一个临时缓存变量，就实现了首页代码性能优化的调整。

以上，关于首页和城市列表页所有功能的完整实现就做完了，最后，提交代码到分支上，然后合并到主分支。



第八课

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

可以打开 [去哪网](http://touch.piao.qunar.com/touch/detail.htm?id=989946426&from=as_recommend_sight) 看一下城市的详情页，首先他的左上角定位了一个返回图标，当页面向下滑动过的时候，这个返回图标小时，会渐渐出现一个头部，和首页的头部样式一样，所以我们先来完成头部这两个部分的布局样式。

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

![](https://upload-images.jianshu.io/upload_images/9373308-2df589225a8d4b3a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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

所以这个时候返回图标这个元素是显示的，header 部分不显示，当我们将页面向下滑，高度差不多是 60px 的时候，让返回图标隐藏，header 显示，所以这里要写一个滚动监听的函数，那就用到 avtivted 这个生命周期函数了。

在 activted 中，我们给 window 添加一个滚动监听事件 handleScroll，然后在 methods 中编写这个事件方法，通过 document.documentElement.scroll 来获取页面向上滚动的高度，然后做判断，当这个高度大于 50 的时候，也就是差不多大于图标安努的高度时，图标按钮隐藏，header 部分显示，所以让 this.showAbs 为 false 就可以了，否则让他为 true，这样就实现了当页面的滚动高度大于 50 的时候，返回图标隐藏，header 显示。

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





### 三、实现 Header 渐隐渐显效果

可以打开 [去哪网](http://touch.piao.qunar.com/touch/detail.htm?id=989946426&from=as_recommend_sight) 看一下城市的详情页，首先他的左上角定位了一个返回图标，当页面向下滑动过的时候，这个返回图标小时，会渐渐出现一个头部，和首页的头部样式一样，所以我们先来完成头部这两个部分的布局样式。

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

![](https://upload-images.jianshu.io/upload_images/9373308-2df589225a8d4b3a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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

所以这个时候返回图标这个元素是显示的，header 部分不显示，当我们将页面向下滑，高度差不多是 60px 的时候，让返回图标隐藏，header 显示，所以这里要写一个滚动监听的函数，那就用到 avtivted 这个生命周期函数了。

在 activted 中，我们给 window 添加一个滚动监听事件 handleScroll，然后在 methods 中编写这个事件方法，通过 document.documentElement.scroll 来获取页面向上滚动的高度，然后做判断，当这个高度大于 50 的时候，也就是差不多大于图标安努的高度时，图标按钮隐藏，header 部分显示，所以让 this.showAbs 为 false 就可以了，否则让他为 true，这样就实现了当页面的滚动高度大于 50 的时候，返回图标隐藏，header 显示。

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

![](https://upload-images.jianshu.io/upload_images/9373308-c865e2684d9a60c4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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

![](https://upload-images.jianshu.io/upload_images/9373308-0c507a27cbd9bd31.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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

![](https://upload-images.jianshu.io/upload_images/9373308-5f2deb6e9f7ee5db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240

如果我们将 data 中 list 例的 children 中再添加一组 children 呢？可以试一下：

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
}]
// ...
```

list.vue 中不需要做任何修改，因为我们在子组件中调用自身的时候，其实就相当于在调用子组件的位置又加了一边 template 中的内容，所以他会找到子数据再循环渲染一次，打开页面可以看一下：

![](https://upload-images.jianshu.io/upload_images/9373308-9b0b8e7fa7cd263d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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

然后到 Detail.vue 中通过 axios 获取 detail.json 中的数据，在请求地址这一块需要注意一下，当访问 id 是 001 的景点的时候，需要获取的是 001 这个景点对应的数据，访问 002 获取的就是 002 这个景点对应的数据，所以每一次请求都把这个 id 带给后端，这个 id 是动态路由的一个参数（回忆一下动态路由），如何获得动态路由的参数呢？

首先看一下路由的配置，打开 router 目录下的 index.js，我们给 detail 这个路径后面加了一个 :id，定义了动态路由，会把对应的 id 存在对应的 id 变量里，那么在请求地址这一块就可以这样去写：axios.get("/api/detail.json?params" + this.$route.params.id)，他的意思就是给这个请求地址加一个参数，这个参数就是去路由中找到的 id 这个参数，这个时候我们打开页面，例如点击 id 是 001 的城市，到 Network 中看一下，他的请求地址就是 http://127.0.0.1:8080/api/detail.json?params002：

![](https://upload-images.jianshu.io/upload_images/9373308-75a8085440654814.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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

![](https://upload-images.jianshu.io/upload_images/9373308-42b0baa7ed4f35bb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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

![](https://upload-images.jianshu.io/upload_images/9373308-3143a870049e07e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

但是有一个问题，打开 Network，如果点击的是第一个城市，他会去请求 http://localhost:8080/api/detail.json?id=001，但是返回到首页，我们再点第二个城市，并没有发送新的请求，还是 id=001 的请求，刷新一下页面，才会去请求 id=2 的城市的信息，显然这是不符合逻辑的。导致出现这个问题的原因是什么呢？

回顾一下 keep-alive，我们在 App.vue 中给 router-view 外层包裹了一个 keep-alive 标签，他是 Vue 自带的一个标签，意思就是我的路由的内容被加载一次后，我就把路由中的内容放到内存之中，下一次再进入这个路由的时候，不需要重新渲染这个组件，去重新执行钩子函数，只要去内存里把以前的内容拿出来就可以。我们之前做城市列表页的时候，加了 keep-alive，可以在首页和列表页切换的的时候，不用每次都去请求 index.json 和 list.json，但是在这里，每一个城市的信息内容都是不同的，所以这里讲一个 keep-alive 中的一个属性 exclude，让他等于组件的名字，例如：exclude="detail，意思是除了 detail 页面，其他页面都会被缓存。

这个时候，如果点击的是第一个城市，他会去请求 http://localhost:8080/api/detail.json?id=001，返回到首页，我们再点第二个城市，就会去请求 id=2 的城市信息。

这样页面就没有问题了么？回到页面上，我们这样去试一下：将首页往上滚动一部分，然后去点击城市，进入详情页，发现详情页也被向上滚动了同样的高度，也就是这个滚动多个页面之间会互相影响，这么解决这个 BUG 呢？打开 Vue 官网，找到 vue-router 下的滚动行为，官网给我们提供了一个方法，我们将这个方法添加到 router/index.js 中：

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

以上就完成了使用 Ajax 获取动态数据，记得提交代码并合并分支。

**补充：**到这里，我们想一个问题，每个组件都有一个 name 值，例：

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


