<template>
  <div>
    <div class="nodata" v-if="showNoView">
      <!-- 无数据 默认 空白? -->
    </div>
    <div class="ranklist" v-if="showDataView">
      <div class="itemWrapper">
        <div ref="wrapper">
          <div class="ranks" :style="'width:'+ rankList.length * 1.28+'rem'">
            <div class="rankItem" v-for="(item,index) in rankList" :key="item.user_id" @click="toRankList(index)" :class=" tabIndex === index ? 'now' : '' ">
              <div class="card">
                <img :src="item.avatar" alt="">
                <div v-if="item.index !== -1" class="rankNum">
                  <span class="txt">第</span>
                  <span class="num">{{item.index}}</span>
                  <span class="txt">名</span>
                </div>
                <div v-else class="rankNum">
                  <span class="txt">未上榜</span>
                </div>
                <div class="rankTxt">
                  <span class="num">{{item.count}}</span>
                  <span class="txt">次</span>
                </div>
              </div>
              <div class="mask" :class=" tabIndex === index ? 'maskNow' : '' "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { pageInit } from "../../../mixins/pageInit";
export default {
  props: ["user_id", "mobid"],
  data() {
    return {
      tabIndex: 0,
      width: 375,
      rankList: []
    };
  },
  mixins: [pageInit],
  methods: {
    widthInit() {
      this.width = document.body.getBoundingClientRect().width;
    },
    async ranks() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + "/api/ranks/users/" + this.user_id
      });
      try {
        const data = await this.isTrue(httpResponse);
        this.ranksFilter(data);
      } catch (error) {
        console.log("err:", error);
      }
      this.isAJAX = true;
    },
    ranksFilter(data) {
      this.rankList = data;
    },
    toRankList(index) {
      this.tabIndex = index;
      this.$router.push({
        name: "groupRank",
        query: {
          u: this.user_id,
          m: this.mobid
        }
      });
    }
  },
  mounted() {
    this.widthInit();
    this.ranks().then(() => {
      setTimeout(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollX: true,
          scrollY: false,
          click: true,
          tap: true,
          probeType: 2 // 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
        });
        if (this.rankList.length > 2) {
          this.scroll.on("scroll", ({ x }) => {
            this.tabIndex = Math.abs(parseInt(x / 128)) + 1;
          });
          this.scroll.on("scrollEnd", ({ x }) => {
            this.tabIndex = Math.abs(parseInt(x / 128)) + 1;
          });
        }
      }, 20);
    });
  }
};
</script>

<style lang="less" scoped>
.itemWrapper {
  padding-top: 0.56rem;
  width: 100%;
  .ranks {
    display: flex;
  }
}
.rankItem {
  position: relative;
  margin: 0 0.24rem;
  padding: 0.1rem;
  width: 0.8rem;
  box-sizing: border-box;
  white-space: nowrap;
  padding-bottom: 0.18rem;
  border-top-left-radius: 2em;
  border-top-right-radius: 2em;
  border-bottom-left-radius: 2em;
  border-bottom-right-radius: 2em;
  color: #fff;
  text-align: center;
  line-height: 0.33rem;
  transition: all 0.3s;
  .card {
    position: relative;
    z-index: 10;
    white-space: nowrap;
    img {
      box-sizing: border-box;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      border: 2px solid #fff;
      margin: 0 auto 0.08rem;
    }
    .txt {
      opacity: 0.64;
      font-size: 0.14rem;
    }
    .num {
      font-size: 0.18rem;
    }
  }
  .mask {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0.2;
    border-top-left-radius: 2em;
    border-top-right-radius: 2em;
    border-bottom-left-radius: 2em;
    border-bottom-right-radius: 2em;
    background-image: linear-gradient(-180deg, #b4ec51 0%, #429321 100%);
  }
  .maskNow {
    background-image: linear-gradient(-180deg, #fad961 0%, #f76b1c 100%);
  }
}
.now {
  transform: scale(1.2);
}
.rankNum {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.rankTxt {
  padding-top: 0.3rem;
}
</style>
