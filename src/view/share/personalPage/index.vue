<template>
  <div>
    <div class="nodata" v-if="showNoView"></div>
    <div class="homePage" v-if="showDataView">
      <section v-if="userInfo.isPro === 0">
        <user :userInfo="userInfo"></user>
      </section>
      <section v-else>
        <userPro :userInfo="userInfo"></userPro>
      </section>
      <section class="tab" ref="tab">
        <ul class="tab_cont" ref="tab_cont" v-if="userInfo.isPro">
          <li class="tab_item cScard"  @click="changeTab(0,'cardlist')"></li>
          <li class="tab_item cSman"   @click="changeTab(1,'students')"></li>
          <li class="tab_item cSrank"  @click="changeTab(2,'ranklist')"></li>
        </ul>
        <ul class="tab_cont" ref="tab_cont" v-else>
          <li class="tab_item cScard"  @click="changeTab(0,'cardlist')"></li>
          <li class="tab_item cSrank"  @click="changeTab(1,'ranklist')"></li>
        </ul>
        <div class="tab_bar">
          <div class="tab_bar_wrapper" :style="'width:'+tabWidth+'px;transform: translateX('+ tabWidth*tabIndex +'px)'">
            <div class="tab_dot"></div>
          </div>
        </div>
      </section>
      <section class="list">
        <div v-show="tabName === 'cardlist'">
          <div class="height" ref="wrapper" :style="'max-height:'+ listHeight +'px;' ">
            <cardlist @onImgDone="scrollInit" :user_id="USER_ID" :mobid="MOBID" :tabName="tabName"></cardlist>
          </div>
        </div>
        <div v-show="tabName === 'students'">
          <students :user_id="USER_ID" :tabName="tabName"></students>
        </div>
        <div v-show="tabName === 'ranklist'">
          <ranklist :user_id="USER_ID" :mobid="MOBID" :tabName="tabName"></ranklist>
        </div>
      </section>
      <div v-if="!isTigerApp">
        <moblink :path="moblink.path" :mobid="moblink.mobid" :params="moblink.params" :showDefaultUI="moblink.showDefaultUI"></moblink>
      </div>
    </div>
  </div>
</template>

<script>
import cardlist from "./cardList.vue";
import ranklist from "./rankList.vue";
import students from "./students.vue";
import user from "./user.vue";
import userPro from "./userPro.vue";
import BScroll from "better-scroll";
import moblink from "../../../components/moblink.vue";
import { pageInit } from "../../../mixins/pageInit";
export default {
  data() {
    return {
      showNoView: false,
      showDataView: false,
      tabIndex: 0,
      tabName: "cardlist",
      tabWidth: 375 / 2,
      listHeight: "",
      moblink: {
        path: "tigerfit/personInfo", // /tigerfit/personInfoPro
        mobid: this.$route.query.mobid || this.$route.query.m,
        params: {
          ...this.$route.query,
          user_id: this.$route.query.u
        },
        showDefaultUI: false
      },
      userInfo: {
        nickname: "",
        fans: "",
        likes: "",
        attentions: "",
        gender: "",
        isPro: ""
      },
      /* 
                安卓 iOS 不一样,
                cardList 和 rankList 统一在这里取 ID
              */
      USER_ID: this.$route.query.user_id || this.$route.query.u,
      MOBID: this.$route.query.mobid || this.$route.query.m,
      isTigerApp: false
    };
  },
  components: {
    cardlist,
    ranklist,
    moblink,
    user,
    userPro,
    students
  },
  mixins: [pageInit],
  watch: {
    tabIndex(now) {
      console.log("now:", now);
    }
  },
  methods: {
    changeTab(index, name) {
      this.tabIndex = index;
      this.tabName = name;
    },
    async mymainpage() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + `/api/users/${this.USER_ID}/centers`
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
    },
    lineInit() {
      const tabNum = document.querySelectorAll(".tab_item");
      const num = [...tabNum].length;
      this.tabWidth = this.$refs.tab_cont.getBoundingClientRect().width / num;
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
    scrollInit() {
      this.listHeight =
        document.documentElement.clientHeight -
        this.$refs.tab.getBoundingClientRect().height;
      setTimeout(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          click: true
        });
      }, 20);
    },
    getUserAgent() {
      const ua = navigator.userAgent;
      const browser = {
        Tiger: !!ua.match(/Tiger/)
      };
      if (browser.Tiger) {
        this.isTigerApp = true;
      }
    }
  },
  mounted() {
    this.getUserAgent();
    this.mymainpage()
      .then(() => {
        this.isAJAX = true;
        this.getClientWidth();
        this.lineInit();
      })
      .catch(e => console.log("mymainpage:" + e));
  }
};
</script>

<style lang="less" scoped>
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
      background-size: 0.3rem 0.3rem;
    }
    .cScard {
      background-image: url("../../../assets/userInfoShare/cScard.png");
    }
    .cSrank {
      background-image: url("../../../assets/userInfoShare/cSrank.png");
    }
    .cSman {
      background-image: url("../../../assets/userInfoShare/cSman.png");
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
.height {
  overflow: hidden;
}
.homePage {
  min-height: 100vh;
}
</style>