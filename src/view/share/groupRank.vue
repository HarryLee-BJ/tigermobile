<template>
  <div class="groupRank">
    <section class="header" ref="header">
      <span class="back" @click="back">←</span>
      <span class="type">{{rankType}}</span>
    </section>
    <section class="topThree" ref="topThree">
      <div class="ranks">
        <div class="rankItem" v-if="rankList[1]">
          <div class="card">
            <img :src="rankList[1].avatar + '?imageView2/w/400/h/400/q/10'" alt="">
            <div class="nameDot">
              <span class="txt">{{rankList[1].nickname}}</span>
            </div>
            <div class="rankNum">
              <span class="num">{{rankList[1].count}}</span>
              <span class="txt">次</span>
            </div>
          </div>
          <div class="mask g"></div>
        </div>
        <div class="rankItem topOne" v-if="rankList[0]">
          <div class="card">
            <img :src="rankList[0].avatar + '?imageView2/w/400/h/400/q/10'" alt="">
            <div class="nameDot">
              <span class="txt">{{rankList[0].nickname}}</span>
            </div>
            <div class="rankNum">
              <span class="num">{{rankList[0].count}}</span>
              <span class="txt">次</span>
            </div>
          </div>
          <div class="mask r"></div>
        </div>
        <div class="rankItem" v-if="rankList[2]">
          <div class="card">
            <img :src="rankList[2].avatar + '?imageView2/w/400/h/400/q/10'" alt="">
            <div class="nameDot">
              <span class="txt">{{rankList[2].nickname}}</span>
            </div>
            <div class="rankNum">
              <span class="num">{{rankList[2].count}}</span>
              <span class="txt">次</span>
            </div>
          </div>
          <div class="mask b"></div>
        </div>
      </div>
    </section>
    <section class="other" v-if="other.length">
      <div class="height" :style="'max-height:' + listHeight + 'px;' " ref="wrapper">
        <ul class="listWrapper">
          <li class="item" v-for="(item,index) in other" :key="item.user_id">
            <div class="card">
              <div class="userInfo">
                <span class="num">{{index+4}}.</span>
                <img class="avatar" :src="item.avatar + '?imageView2/format/w/150/h/150/q/10'" alt="">
                <span class="name">{{item.nickname}}</span>
                <i class="isPro" v-if="item.isPro === 1"></i>
              </div>
              <div class="clockNum">
                <span class="txt">打卡</span>
                <span class="num">{{item.count}}</span>
                <span class="txt">次</span>
              </div>
            </div>
            <div class="mask" :class="item.user_id === user_id ? 'selfMaskTypeAll' : '' "></div>
          </li>
        </ul>
      </div>
    </section>
    <moblink :path="moblink.path" :mobid="moblink.mobid" :params="moblink.params" :showDefaultUI="moblink.showDefaultUI"></moblink>
  </div>
</template>

<script>
import moblink from "../../components/moblink.vue";
import BScroll from "better-scroll";
import { pageInit } from "../../mixins/pageInit";
export default {
  data() {
    return {
      rankType: "老虎运动打卡排行榜",
      rankList: [],
      moblink: {
        path: "tigerfit/trainDetail",
        mobid: this.$route.query.mobid || this.$route.query.m,
        params: {
          ...this.$route.query,
          user_id: this.$route.query.u
        },
        showDefaultUI: false
      },
      user_id: this.$route.query.user_id || this.$route.query.u,
      listHeight: 0
    };
  },
  mixins: [pageInit],
  components: {
    moblink
  },
  computed: {
    topThree() {
      return this.rankList.slice(0, 3);
    },
    other() {
      return this.rankList.slice(3);
    }
  },
  methods: {
    async ranks() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + "/api/ranks/clockinsall"
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
    back() {
      this.$router.push({
        name: "personalPage",
        query: this.$route.query
      });
    },
    setScrollHeight() {
      this.listHeight =
        document.documentElement.clientHeight -
        this.$refs.header.getBoundingClientRect().height -
        this.$refs.topThree.getBoundingClientRect().height -
        57 - // 57moblink
        50; // 余量
    }
  },
  filters: {
    nicknameFilter(name) {
      if (name.length > 5) {
        return name.substr(0, 8) + "...";
      } else {
        return name;
      }
    }
  },
  mounted() {
    this.ranks().then(() => {
      this.setScrollHeight();
      setTimeout(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          tap: true
        });
      }, 20);
    });
  }
};
</script>


<style lang="less" scoped>
.header {
  text-align: center;
  font-size: 0.16rem;
  color: #fff;
  position: relative;
  padding-top: 0.21rem;
  .back {
    position: absolute;
    left: 0.16rem;
    top: 0.16rem;
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.24);
    line-height: 0.32rem;
    text-align: center;
    transition: all 0.3s;
    color: #fede1e;
  }
  .back:active {
    transform: scale(2);
    color: red;
  }
}
.ranks {
  display: flex;
  justify-content: space-around;
  padding-top: 0.4rem;
  margin-bottom: 0.4rem;
  .topOne {
    transform: scale(1.2);
  }
  .rankItem {
    position: relative;
    padding: 0.1rem;
    padding-bottom: 0.18rem;
    border-top-left-radius: 2em;
    border-top-right-radius: 2em;
    border-bottom-left-radius: 2em;
    border-bottom-right-radius: 2em;
    color: #fff;
    text-align: center;
    line-height: 0.33rem;
    transition: all 0.3s;
    width: 0.6rem;
    white-space: nowrap;
    .card {
      z-index: 10;
      position: relative;
    }
    img {
      box-sizing: border-box;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      border: 2px solid #fff;
      margin: 0 auto 0.08rem;
    }
    .txt {
      font-size: 0.14rem;
    }
    .num {
      font-size: 0.28rem;
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
    }
    .r {
      background-image: linear-gradient(-180deg, #b4ec51 0%, #429321 100%);
    }
    .g {
      background-image: linear-gradient(-180deg, #fad961 0%, #f76b1c 100%);
    }
    .b {
      background-image: linear-gradient(-270deg, #414bff 2%, #ab5bff 97%);
    }
  }
}
.height {
  border: 1px solid #454545;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 auto;
}
.listWrapper {
  border-radius: 8px;
  overflow: hidden;
  .item {
    position: relative;
    border-bottom: 1px solid #454545;
    .card {
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.12rem;
      .userInfo {
        display: flex;
        align-items: center;
        flex: 1;
        .num {
          font-size: 0.24rem;
          display: block;
          width: 0.4rem;
        }
        .avatar {
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 50%;
          margin-right: 0.12rem;
        }
        .name {
          font-size: 0.14rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 1.2rem;
        }
        .isPro {
          width: 0.24rem;
          height: 0.1rem;
          background-image: url("../../assets/PRO.png");
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center center;
          padding-left: 0.04rem;
        }
      }
      .clockNum {
        display: flex;
        align-items: center;
        .txt {
          opacity: 0.64;
          font-size: 0.14rem;
        }
        .num {
          font-size: 0.2rem;
          display: block;
          width: 0.4rem;
          text-align: center;
        }
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
    }
    .selfMaskTypeAll {
      background-image: linear-gradient(90deg, #aa5cff, #414bff);
    }
    .selfMaskTypeMonth {
      background-image: linear-gradient(-180deg, #fad961 0%, #f76b1c 100%);
    }
  }
}
.other {
  padding: 0 0.2rem;
}
.nameDot {
  width: 0.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rankNum {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.card {
  padding-bottom: 0.4rem;
}
</style>
