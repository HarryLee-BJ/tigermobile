<template>
  <div>
    <div v-if="showNoView">
      <div class="showNoView"></div>
    </div>
    <div v-if="showDataView">
      <section class="header" ref="header">
        <div class="mask" :style="'background-image: url(' +userInfo.avatar + '?imageView2/q/20' +')'"></div>
        <div class="user">
          <img class="avatar" :src="userInfo.avatar + '?imageView2/q/20'" alt="">
          <div class="name">
            <span>{{userInfo.nickname}}</span>
            <span class="pro"></span>
          </div>
          <ul class="fans">
            <li>
              <div class="txt">关注</div>
              <div class="num">{{userInfo.attentions}}</div>
            </li>
            <li>
              <div class="txt">粉丝</div>
              <div class="num">{{userInfo.fans}}</div>
            </li>
            <li>
              <div class="txt">被赞</div>
              <div class="num">{{userInfo.likes}}</div>
            </li>
          </ul>
        </div>
      </section>
      <section class="tab" ref="tab">
        <ul class="tab_cont" ref="tab_cont">
          <li class="tab_item cStopic" @click="tabIndex = 0"></li>
          <li class="tab_item cSarticle" @click="tabIndex = 1"></li>
        </ul>
        <div class="tab_bar">
          <div class="tab_bar_wrapper" :style="'width:'+tabWidth+'px;transform: translateX('+ tabWidth*tabIndex +'px)'">
            <div class="tab_dot"></div>
          </div>
        </div>
      </section>
      <section>
        <the-card v-show="tabIndex===0" :trainersID="ID" :tabIndex="tabIndex"></the-card>
        <the-article v-show="tabIndex===1" :trainersID="ID" :tabIndex="tabIndex"></the-article>
      </section>
    </div>
    <moblink :path="moblink.path" :mobid="moblink.mobid" :params="moblink.params" :showDefaultUI="moblink.showDefaultUI"></moblink>
  </div>
</template>

<script>
import theCard from "./card.vue";
import theArticle from "./article.vue";
import { pageInit } from "../../mixins/pageInit.js";
import moblink from "@/components/moblink.vue";
export default {
  data() {
    return {
      ID: this.$route.params.id, // 798c74feb61a4dcb94446a5a043a8cff
      tabIndex: 0,
      tabWidth: 375 / 2,
      userInfo: {
        nickname: "",
        fans: "",
        likes: "",
        attentions: "",
        gender: ""
      },
      clockins: [],
      moblink: {
        path: "", //
        mobid: "",
        params: {},
        showDefaultUI: false
      }
    };
  },
  components: {
    theCard,
    theArticle,
    moblink
  },
  mixins: [pageInit],
  methods: {
    lineInit() {
      this.tabWidth = this.$refs.tab_cont.getBoundingClientRect().width / 2;
    },
    getClientWidth() {
      const resizeEvt =
        "orientationchange" in window ? "orientationchange" : "resize";
      const recalc = () => {
        this.lineInit();
      };
      window.addEventListener(resizeEvt, recalc, false);
      document.addEventListener("DOMContentLoaded", recalc, false);
    },
    async mymainpage() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + `/api/users/${this.ID}/centers`
      });
      try {
        const data = await this.isTrue(httpResponse);
        this.mymainpageFilter(data);
      } catch (error) {
        console.log("err:", error);
      }
    },
    mymainpageFilter(data) {
      this.userInfo = data;
    }
  },
  async mounted() {
    await this.mymainpage();
    this.isAJAX = true;
    this.getClientWidth();
    this.lineInit();
  }
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  padding-top: 0.64rem;
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.24);
    background-size: cover;
    background-position: center center;
    opacity: 0.24;
  }
  .user {
    z-index: 2;
    position: relative;
    .avatar {
      box-sizing: border-box;
      width: 0.8rem;
      height: 0.8rem;
      margin: 0 auto 0.16rem;
      border: 0.02rem solid #ffffff;
      border-radius: 50%;
      object-fit: cover;
    }
    .name {
      margin: 0 0.24rem;
      padding-bottom: 0.04rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.18rem;
      border-bottom: rgba(255, 255, 255, 0.1) solid 0.02rem;
      .pro {
        width: 0.24rem;
        height: 0.12rem;
        background-image: url("../../assets/PRO_Y.png");
        background-size: cover;
        margin-left: 0.05rem;
      }
    }
    .fans {
      display: flex;
      justify-content: space-around;
      text-align: center;
      padding: 0.1rem 0;
      .txt {
        font-size: 0.14rem;
        opacity: 0.56;
        line-height: 0.2rem;
      }
      .num {
        font-size: 0.2rem;
        line-height: 0.28rem;
      }
    }
  }
}
.tab {
  border-bottom: 0.01rem solid hsla(0, 0%, 100%, 0.1);
  .tab_cont {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .tab_item {
      flex: 1;
      text-align: center;
      background-repeat: no-repeat;
      background-position: center center;
      height: 0.52rem;
    }
    .cStopic {
      background-image: url("../../assets/userInfoShare/topic.png");
      background-size: 0.45rem 0.32rem;
    }
    .cSarticle {
      background-image: url("../../assets/userInfoShare/article.png");
      background-size: 0.32rem 0.32rem;
    }
  }
  .tab_bar {
    height: 0.02rem;
    .tab_bar_wrapper {
      transition: all 0.3s;
      .tab_dot {
        width: 0.2rem;
        height: 0.02rem;
        margin: 0 auto;
        background-color: #fff;
        border-top-right-radius: 2em;
        border-top-left-radius: 2em;
        border-bottom-right-radius: 2em;
        border-bottom-right-radius: 2em;
        box-shadow: 0 -4px 8px #fff;
      }
    }
  }
}
</style>
