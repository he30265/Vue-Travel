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
          id: "001",
          imgSrc:
            "http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
          txt: "景点门票"
        },
        {
          id: "002",
          imgSrc:
            "http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20193/f0f00d6dfe038c044dbc9a437f58b0eb.png",
          txt: "一日游"
        },
        {
          id: "003",
          imgSrc:
            "http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png",
          txt: "北京必游"
        },
        {
          id: "004",
          imgSrc:
            "http://img1.qunarzz.com/piao/fusion/1803/47/c2b659e048b11602.png",
          txt: "溜娃游"
        },
        {
          id: "005",
          imgSrc:
            "http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20191/0334cf5430b9b5505fd79e2b8d7e8670.png",
          txt: "爬长城"
        },
        {
          id: "006",
          imgSrc:
            "http://img1.qunarzz.com/piao/fusion/1803/6c/9e54a8540fee0102.png",
          txt: "故宫"
        },
        {
          id: "007",
          imgSrc:
            "http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png",
          txt: "动植物园"
        },
        {
          id: "008",
          imgSrc:
            "http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20195/35d83bb968d80d54926f30cfb92cb6ff.png",
          txt: "限时抢购"
        },
        {
          id: "009",
          imgSrc:
            "http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20194/b4511345827006994aa1980a3886f0ac.png",
          txt: "北京世园会"
        }
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
</script>

<style lang="stylus" scoped>
@import "~style/mixins"
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
          padding:0 .1rem;
          ellipsic();
        }
      }
    }
  }
}
</style>
