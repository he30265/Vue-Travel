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

*知识点补充1：上边我们先用 for in 循环了 this.cities，这是因为 this.cities 他是一个对象，所以用 for in 来循环，for in 循环出的是 key，如果想取到 key 对应的的值，就要在后面跟上索引。然后再将循环出的值通过 forEach() 来循环，forEach() 来遍历数组，里面可以传一个方法。*

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


#### 1、首页右上角“当前城市”和“城市页”当前城市的共享

先来看一下项目中现有组件的一个目录结构：

![](https://upload-images.jianshu.io/upload_images/9373308-e0bcbe846326422e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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

state 这个对象里边存放的就是公用的数据，他对应的就是图解中的 State，组件都可以去使用这里的数据。

接着打开 src/main.js，这个时候就可以通过 import 直接引入 src/stroe/index.js 了，然后在下面的 vue 实例中添加 stroe 这个属性就可以了。此时运行一下项目，如果没有报错，就说明引用成功。

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


#### 2、改变 State，更新当前城市

下面我们再实现一个功能，就是点击城市列表页下面的“热门城市”，他会显示到当前城市中。也就是我们要改变那张图中的 State，看一下图中绿色虚线框圈出的内容，首先得调用 Actions，然后再调用 Mutations，调用 Actions 的时候，是需要 Dispatch 方法的，调用 Mutations 的时候，是需要 Commit 方法的，下面我们走一下这个流程：

在 city/list.vue 中我们给每一个热门城市绑定一个点击事件 handleCityClick，并把 item.name 传进来，然后将这个方法写在 methods 中，他接收一个 city，这个 city 就是被点击的城市。

现在我们已经获取到被点击的城市名了，接下来，在这个组件里，我要调用 vuex 中的 Actions，看那张图，有一个 Dispatch 的方法，我们在调用 Actions 的时候，一定要调用 Dispatch 这个方法，所以在这个 handleCityClick 方法中这么写：当改变 city 的时候，通过 Dispath 去派发一个 changeCity 的一个 Actions 的行动，将 city 作为第二个参数传过来。
```
methods :{
    handleCityClick(city){
        this.$store.dispatch(changeClick,city);
    }
}
```

Dispatch 的意思是派发一个名字是 changeCity 的 Actions 行动，然后把 city 传过去。当然这么写是没有效果的，因为在创建 store 的时候只有一个 city，并没有任何的 Actions，所以打开 store/index.js，写一个 actions 对象，他这里需要有一个和 dispatch 中名字一样的 Actions，也就是 changeCity，这个方法接收两个参数，第一个参数是一个上下文 ctx，第二个也就是传递过来的数据，就是那个 city。当你点击城市的时候，actions 会被派发，store/index.js 这里正好对应的 Actions 接收到传递过来的 city。

store/index.js
```
actions:{
    changeCity (ctx,city){
    }
},
```

此时 Actions 中已经接收到传递过来的城市，他需要调用 Mutations 来改变 State（公用的数据），看图解，Mutations 是需要 Commit 来提交的，在 city/list.vue 下的 methods 中再加一个 Commit 提交：

city/list.vue
```
methods :{
    handleCityClick(city){
        this.$store.dispatch("changeCity",city); // 派发
        this.$store.commit("changeCity",city); // 提交
    }
}
```

他要把这个 changeCity 和 city 提交给 Mutations，所以和在 store/index.js 中创建 actions 一样，接下来要创建一个 Mutations，这里也可以写一个 changeCity，每一个 mutations 对应的参数也会有两个，第一个是 state，第二个是外部传过来的 city。

store/index.js
```
mutations:{
    changeCity(state,city){
    }
}
```

我想 Actions 去调用 Mutations，那如何去调用呢？看一下图，Actions 如果想调用 Mutations，必须执行一个方法 Commit，那就在 actions 中执行一个下这个方法，之所以 Actions 中第一个参数是 ctx，作用就是他可以借助 ctx 帮助我们拿到 Commit 这个方法，然后去执行 changeCity 这个 Mutations，传过去一个内容是 city。然后在 Mutations 中做一个事情，State 指的是所有公用的数据，让这个数据等于 city 就可以了。

store/index.js
```
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state : {
        city:"北京"
    },
    actions:{
        changeCity (ctx,city){
            ctx.commit("changeCity",city);
        }
    },
    mutations:{
        changeCity(state,city){
            state.city = city;
        }
    }
})
```


此时，打开页面，点击热门城市，当前城市就会变换了。

上面这一过程，就是图解中 State → Actions → Mutations 这一过程，其实我们也可以省去 Actions 这一步，直接 State → Mutations，接下来我们把 store/index.js 中 actions 部分注释掉，然后去 city/list.vue 中，把使用 dispath 给 actions 派发 changeCity 和 city 去掉，直接通过 commit 方法调用 mutations 就可以了。

store/index.js
```
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state : {
        city:"北京"
    },
    // actions:{
    //     changeCity (ctx,city){
    //         ctx.commit("changeCity",city);
    //     }
    // },
    mutations:{
        changeCity(state,city){
            state.city = city;
        }
    }
})
```

city/list.vue
```
methods :{
    handleCityClick(city){
        // this.$store.dispatch("changeCity",city); // 派发
        this.$store.commit("changeCity",city); // 提交
    }
}
```

回到页面上，可以看到逻辑是没有任何问题的。点击“热门城市”，“当前城市”就会改变。

还有两处也要实现一下这样的效果，就是热门城市下的城市列表和搜索结果中的城市列表。打开 city/list.vue ，给城市列表也加一个点击事件，需要注意的是，这里传的是 city.name，而不是 item.name，注意循环的变量名。

city/list.vue
```
<div class="alp_li border-bottom" v-for="city of item" :key="item.id" @click="handleCityClick(city.name)">{{city.name}}</div>
```

还有 city/search.vue，这个组件里没有 handleCityClick 这个方法，所以要在 methods 中添加一下这个方法，然后再城市列表传入点击事件。



### 十、Vuex 的高级使用及 localStorage

#### 1、localStorage

这一章讲解一些稍微高级的 Vuex 的 api 的使用，同时讲解一下 localStorage 这个本地存储的内容。

上一章，我们在 src 目录下新建了一个 store 目录，这里存储了 Vuex 中的默认数据，city 设置成了“北京”，其实这样去写，是有问题的，点击城市，会改变这个 city，但是当页面刷新了，就又变回了北京。在真实的项目中，如果你这次选中了一个城市，下次再打开这个网页的时候，上次选的城市还应该在的，怎么解决这个问题呢？我们需要引入一个新的概念，叫做 localStorage，HTML5 中提供了一个新的 api，叫做 localStorage，它可以帮助我们实现类似与 cookie 的功能，做到本地存储，他的 api 要比 cookie 更加的简单，所以这里我们使用 localStorage 实现保存城市的功能。

打开 store/index.js，我们这样去写，当用户尝试去改变城市的时候，我不但把 state 中的 city 改了，同时还去存一个 localStorage，直接写 localStorage.city = city 就可以了。然后让 stare 中 city 的默认值是 localStorage.city || "北京"，就可以了。也就是 city 的值我默认先去 localStorage 中取，如果取不到，才用默认的 “北京”。

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

这个时候打开页面，我们选择一个城市，然后刷新页面，可以看到上次选择的城市还在。但是当使用 localStorage 的时候，建议在外层包裹一个 try{}catch(e){}，因为在某些浏览器，如果用户关闭了本地存储这样的功能，或者使用隐身模式，使用 localStorage 可能导致浏览器直接抛出异常，代码就运行不了了，为了避免这种问题，建议在外层加一个 try{}catch(e){}，怎么加呢？

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

现在我们看到 store/index.js 这个文件慢慢的变得复杂起来了，实际上，在真正的项目开发和之中，会做进一步的拆分，也就是把这个文件拆分为 State、Actions、Mutations，在 store 中创建一个文件叫 state.js（只存储公用数据），然后把设置默认数据的这块代码放进去，并通过 export 导出，内容就是在 index.js 中定义的 state 对象里的内容：
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

接着，我再在 store 目录下创建一个文件，叫做 mutations.js，然后把 index.js 中的 mutations 对象里的代码剪切进去：
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

这样，我们就将 vuex 的代码拆分成了 State、Actions、Mutations 这几个部分，他们也就分别对应着 state.js、index.js、mutations.js，未来他的维护性也会得到比较大的提高。

![](https://upload-images.jianshu.io/upload_images/9373308-e028f3dc4a9aa5d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



#### 2、Vuex 中高级 api 的使用

最后我们对 vuex 的使用做一个优化，先对 pages/home/header.vue 进行一个优化，可以看到之前使用公用数据的时候，需要写：
```
{{this.$store.state.city}}
```
 一长串内容，vuex 给我们一个比较高级的 api，先通过 import 引入 import {mapState} from "vuex";

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
里面可以写一个数组，mapState 是指，我把 vuex 中 state 里的数据映射到我这个组件的 computed 中，把 city 这个公用数据映射到我的一个名字叫做 city 的计算属性之中，做好这个映射之后，上面就不用写这么麻烦了：
```
把 {{this.$store.state.city}} 改为 {{this.city}} 就可以了。
```

下面我们再去城市选择页给“当前城市”做一个修改，还是先 import {mapState} from 'vuex';

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

他的意思就是，我想把 vuex 里的 city 这个公用的数据映射到我这个组件的计算属性里，映射过来的名字叫做 currentCity，如果这么写的话，上面的当前城市就可以改为 {{this.currentCity}}。

再改一下下面的城市列表，在 methods 中，当我点击城市按钮的时候，会派发一个 Mutations，vuex 同样给我们提供了一个简便的方法，叫做 mapMutations，所以我们可以这样改一下 import：
```
import {mapState,mapMutations} from 'vuex';
```

然后在 methods 中使用 mapMutations，这里一样可以传一个数组，传一个 changeCity：
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
这么麻烦的写了，可以直接改为 this.changeCity(city); 就行了。

search.vue 组件也修改一下，我们把这块 methods 中的方法复制一下，放到 search.vue 里面，记得在上面引入 mapMutations：import {mapMutations} from 'vuex'。

**小结一下，首先是 mapState 这个东西，State 我们知道，里面存放的是公用数据，加上 map 它就是一个方法，这个方法能够映射 State 中的公用数据，通过 ES6 中的展开运算符来映射，例如 ...mapState(['city']) 就映射到了 State 中的 city 数据，然后放到组件的计算属性 computed 中，这样就可以直接通过 this.city 来获取 city 的值了，就不需要先去 Store，然后再去 state 里找 city 了。...mapState(）里边也可以是一个对象，如果是对象，需要有键和值。**

**然后是 mapMutations 这个东西，Mutations 是来改变 State（公用的数据）的，加上 map 也就是一个方法，之前在点击事件中，我们是通过 commit 将事件及数据提交给 Mutations 的，然后 Mutations 再去改变 State 中的公用数据，现在我们不用这样做了，vuex 同样给我们提供了一个简便的方法，叫做 mapMutations，还是通过展开运算符，例如 ...mapMutations(['changeCity']) 它的意思就是我通过 mapMutations 映射到了 Mutations 中的 changeCity 这个方法，就不需要 Commit 来连接了，所以直接在组件中使用 changeCity 方法就可以了。**


到这里，Vue 的一些高级写法也带大家接触了。接下来，打开 Vue 的官网，打开 Vuex，可以看到他有几个核心的概念：

![](https://upload-images.jianshu.io/upload_images/9373308-e7cef2ec3eaea316.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

State 我们已经熟悉了，存放的是公用的文件，Action 我们也用过，一些异步的方法我们可以写在 Action 中，Mutation 是对数据所以写改变，接下来看一下 Getter 的作用。

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

他的意思就是我们把 Vuex 里的 Getters 映射到我这个组件里的一个 computed 的计算属性里，这样就可以在右上角城市位置直接使用 {{this.doubleCity}} 了，打开页面，就可以看到右上角出现了两遍的城市名。

![](https://upload-images.jianshu.io/upload_images/9373308-b03e9182b61c4fd3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

那这有什么用呢？实际上，在 Vuex 中 getters 的作用有点类似于组件中的 computed 计算属性的作用，当我们需要根据 state 里面的数据算出一些新的数据的时候，我们就可以借助 getters 这样一个工具来提供新的数据，这样的话，我们可以避免数据的冗余。

最后，再来看一下 Vuex 中的最后一个核心概念，叫做 Module，什么时候用到 Module 呢？当我们遇到一个非常复杂的业务场景，比如在管理后台系统的时候，经常会有很多共用的数据，在 Vuex 中进行存储，如果我们把所有的 Mutations 都放到 mutations.js 文件中，这个文件慢慢的会变得非常庞大，难以维护，这个时候，我们可以借助 Module 对一个复杂的 Mutations、State 包括 Actions 进行一个拆分，可以看一下官网的例子，他定义了几个模块，moduleA、moduleB，创建 store 的时候，可以通过模块来做 store 的创建，这样有一个好处，就是，A 模块存储和 A 模块相关的数据，以及操作就可以了，B 模块存储 B 模块对应的数据及对数据的操做，然后在创建 store 的时候，我对各个模块进行整合，通过 Modul 写我们的代码，可以是代码具有更好的可维护性。当然，目前我们的项目中只有一个 city 这样的一个共有数据，所以没有必要去使用 Module 把我们的代码进行拆分。

来自官网：
```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

以上就讲解了 Vuex 的高级使用及 localStorage，记得提交代码到远程仓库。



### 十一、使用 keep-alive 优化网页性能

这一章我们学习使用 keep-alive 这个 Vue 内置的 Vue 标签来对我们已经写好的两个页面进行性能的优化，首先还是先建一个分支 city-keepalive 并切换，在这个分支上进行开发。

启动项目服务，打开页面，这样看不存在什么问题，基本的一些业务逻辑都已经实现了，但是在控制台中打开 Network 网络这个选项，选择 XHR，当初次进入首页的时候，请求了一个 index.json 的文件，然后切换到列表页，又请求了一个 city.json，然后再回到首页，index.json 又请求了一次，再次去列表页，city.json 又请求了一次，也就是，每一次路由发生变化的时候，Ajax 都会重新的被发送。

![](https://upload-images.jianshu.io/upload_images/9373308-f536d48e2960f553.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们打开代码来看一下是什么原因，打开 Home.vue 首页这个组件，每一次打开这个首页的时候，都会被重新的渲染，所以 mounted 这个钩子就会被重新的执行，那么这个 Ajax 数据就会被重新获取，那么这么能让他只获取一次呢？

打开 main.js，可以看到入口组件是 App 这个组件，再打开 App.vue，router-view 显示的是当前地址所对应的内容，我们可以在外层包裹一个 keep-alive 的一个标签，他是 Vue 自带的一个标签，他的意思就是我的路由的内容被加载一次后，我就把路由中的内容放到内存之中，下一次再进入这个路由的时候，不需要重新渲染这个组件，去重新执行钩子函数，只要去内存里把以前的内容拿出来就可以，这个时候，回到页面上，再打开 Network，进入到列表页，选择城市再返回首页，就不会再去加载 index.json 了，同样再进入列表页，也不会再去加载 city.json 了，他直接会从内存中调数据，而不会重新去法 Ajax 请求了。

这样还是存在逻辑上的问题的，当我在“北京”的时候，首页显示的是“北京”的内容，当切换为“上海”时，首页就应该显示“上海”的内容，所以城市发生改变的时候，首页还需要重新发一次 Ajax 请求，来获取不同城市的数据信息，我们对这一块做一个调整。

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

先在 data 中设置一个数据 lastCity，默认值是空，接着当页面被挂载的时候，让他等于 this.city，对上一次的城市做一个保存：
```
mounted() {
    this.lastCity = this.city
    this.getHomeInfo();
},
```

当页面被重新激活的时候，我们在 activted 中这样写：
```
activated() {
    if(this.lastCity != this.city){
        this.lastCity = this.city
        this.getHomeInfo();
    }
},
```

如果上一次的城市 lastCity 不等于当前城市的时候，就重新发一个 Ajax 请求，直接调用上面 getHomeInfo 方法就可以了。当上次的 city 和这次的 city 不一样时，还需要让他等于这次的 city。回到页面上，可以看到当切换的城市和上次的城市一样时，Ajax 就不会请求 city.json 了，当不一样时，才会去请求 city.json。

回到代码里面，通过 activted 这样一个 keep-alive 新增的生命周期函数，结合 lastCity 这样一个临时缓存变量，就实现了首页代码性能优化的调整。

以上，关于首页和城市列表页所有功能的完整实现就做完了，最后，提交代码到分支上，然后合并到主分支。