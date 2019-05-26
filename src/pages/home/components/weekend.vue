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
