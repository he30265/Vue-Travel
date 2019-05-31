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




## 第八课

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

先来完成一下 banner 部分，在 detail 目录下新建一个 components 目录，然后在 components 目录中新建一个 banner.vue 组件。

detail/banner.vue
```
<template>
<div class="banner-con">
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
```


### 二、公用图片画廊组件拆分

这一章来创建一个公用图片画廊的组件，点击 banner 图，会打开一个图片画廊，图片有轮播滚动的效果，并且在底部会显示一共有几张图，当前是第几张图的效果。

以为在其他地方可能也会用到这个组件，所以我们把他作为一个公共组件来开发，首先创建这个公共组件，在 src 目录下创建 common 目录，然后在里面创建 gallary 目录，并在里面创建 Gallary.vue 文件，将画廊的代码编写到这个组件中。

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
            //     paginationType : 'bullets',
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

**补充数字分页不生效问题**

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

但是这个时候打开页面，会看到轮播出现了问题，因为开始 swiper 是隐藏状态，再次打开后，swiper 计算就会有问题，所以这里需要给 swiper 添加两个参数 observeParents（当Swiper的父元素变化时，Swiper更新）和 observer（当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swipe）,

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

首先在 details 目录下新建一个 header.vue 组件，并在 Details.vue 中引用并使用这个组件，然后编写 header.vue 组件的布局与样式。例：

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
    name: "DetailHeader",
    data(){
        return {
            showAbs: true
        }
    }
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

接下来就该实现渐隐渐显的动画效果了，在 if 判断中定义一个 opacity 变量，他等于 top/120，因为 top 值在页面滚动的时候是变化的，所以 opacity 也就是变化的了，然后做一个三元运算，当这个 opacity 大于 1 的时候，我就让他一直等于 1，也就是让他一直显示，否则的话，还是让他等于这个 opacity 变量，然后给 data 中的 opacityStyle 设置值，让他里边的 opacity 等于 opacity。回到页面，向下滚动，可以看到导航出现了一个渐隐渐显的效果。最后记得给导航中的返回按钮也添加一个返回首页的路由。


以上就实现了 Header 渐隐渐显效果，最后记得提交代码并合并分支。