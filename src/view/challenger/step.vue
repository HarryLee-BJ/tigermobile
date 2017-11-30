<template>
  <div>
    <div v-if="showNoView"></div>
    <div class="step" v-if="showDataView">
      <section class="header">
        <div class="header-wrapper">
          <div class="activity">
            <div class="cont">
              本周活跃度
              <span class="num">{{info.user_score}}</span>
            </div>
            <div class="mask"></div>
          </div>
          <div class="medal">
            <ul class="icon-cont">
              <li class="icon" :class="lineStep > index ? '': 'iconGary'" :style=" 'background-image: url(' + item.icon+');'" @click="showDisc(item,index)" v-for="(item,index) in prizes" :key="item.prize_id">
              </li>
            </ul>
            <div class="disc">
              <div class="disc-item" v-for="(item,index) in prizes" v-show="disc===index && isShowDisc" :key="item.prize_id">
                <div>{{item.t}}</div>
                <div v-html="item.d"></div>
              </div>
            </div>
            <div class="line-wrapper" ref="lineWrapper">
              <div class="line" :style="'width:' + lineWidth + 'px;'"></div>
            </div>
          </div>
        </div>
      </section>
      <section class="cards">
        <ul>
          <li class="item" v-for="(item,index) in list" :key="item.challenge_id" :class="index === 0 ? 'daily' : '' ">
            <div class="info">
              <div class="title ellipsis" v-if="index !== 3">{{item.t}}</div>
              <div class="title ellipsis" v-else>
                {{item.t}} ({{item.progress}}/{{item.limit}})
              </div>
              <div class="p ellipsis">{{item.d}}</div>
            </div>
            <div class="btn" v-if="index !==0 " @click="challenge(item)">
              <span v-if="item.done">已经完成</span>
              <span v-else>{{item.btnTxt}}</span>
            </div>
            <div class="white-btn" v-else @click="FinishChallenge(item)">
              <div class="txt">
                <span v-if="item.done">已经完成</span>
                <span v-else>{{item.btnTxt}}</span>
              </div>
              <div class="mask"></div>
            </div>
          </li>
        </ul>
      </section>
    </div>
    <confirm :t="alert_prize.t" :icon="alert_prize.icon" :prize_id="alert_prize.prize_id" :activity_id="activityID" :user_id="userID" @positive="btnReslove" v-show="isConfirm">
    </confirm>
    <!-- 蒙版 disc -->
    <div class="disc-mask" @click.self="hideDisc" v-show="isShowDisc"></div>
    <div class="disc-mask" @click.self="hideConfirm" v-show="isConfirm"></div>
  </div>
</template>

<script>
import { pageInit } from "../../mixins/pageInit";
import { userAgent } from "../../mixins/userAgent";
import confirm from "./confirm.vue";

export default {
  data() {
    return {
      lineWidth: 0,
      wrapperWidth: 0,
      lineStep: 0,
      code: this.$route.query.code,
      userID_activityID: this.$route.query.u, // 和activityID合并到一起了
      list: [],
      info: {
        challenge_id: "",
        cover: "",
        d: "",
        t: "",
        user_score: ""
      },
      prizes: [],
      btnType: 1,
      par: {
        title: "",
        body: ""
      },
      isConfirm: false,
      disc: 0,
      isShowDisc: false,
      alert_prize: {
        t: "",
        icon: "",
        score: ""
      }
    };
  },
  mixins: [pageInit, userAgent],
  components: {
    confirm
  },
  computed: {
    activityID() {
      return this.userID_activityID.split("-a=")[1];
    },
    userID() {
      return this.userID_activityID.split("-a=")[0];
    }
  },
  watch: {
    lineWidth(now) {
      const per = now / this.wrapperWidth;
      let step = 0;
      if (per < 0.25) {
        step = 0;
      } else if (per >= 0.25 && per < 0.5) {
        step = 1;
      } else if (per >= 0.5 && per < 0.75) {
        step = 2;
      } else {
        step = 3;
      }
      this.lineStep = step;
    },
    alert_prize(now) {
      if (!this.isTigerApp) {
        // 只有在 app 内 才存在兑奖
        return;
      }
      if (Object.keys(now).length) {
        this.isConfirm = true;
      }
    }
  },
  methods: {
    async activitys() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url:
          this.$getApi +
          `/api/activitys/${this.activityID}?user_id=${this.userID}`
      });
      try {
        const data = await this.isTrue(httpResponse);
        this.activitysFilter(data);
      } catch (error) {
        console.log("err:", error);
      }
    },
    activitysFilter(data) {
      this.info = data;
      this.prizes = data.prizes;
      this.alert_prize = data.alert_prize;
    },
    async activitysChallenges() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url:
          this.$getApi +
          `/api/activitys/${this.activityID}/challenges?user_id=${this.userID}`
      });
      try {
        const data = await this.isTrue(httpResponse);
        this.activitysChallengesFilter(data);
      } catch (error) {
        console.log("err:", error);
      }
    },
    activitysChallengesFilter(data) {
      const btnTxt = ["完成挑战", "前往打卡", "分享挑战", "邀请好友"];
      data.map((item, index) => {
        if (item.limit === item.progress) {
          Object.assign(item, {
            done: true
          });
        } else {
          Object.assign(item, {
            done: false
          });
        }
        Object.assign(item, {
          btnTxt: btnTxt[index]
        });
      });
      this.list = data;
    },
    getLineWwidth() {
      // DOM操作 放一起 且保证已经挂载
      const dom = this.$refs.lineWrapper;
      this.wrapperWidth = dom.getBoundingClientRect().width;
      this.lineWidth = (this.info.user_score - 50) / 200 * this.wrapperWidth; // 175 为得到的分数
    },
    challenge(item) {
      this.emitBridge(item.btnTxt, item);
    },
    showModel({ t, d }) {
      this.par = {
        title: t,
        body: d
      };
      this.isConfirm = true;
    },
    showDisc(item, index) {
      this.disc = index;
      this.isShowDisc = !this.isShowDisc;
    },
    hideDisc() {
      this.disc = 0;
      this.isShowDisc = false;
    },
    hideConfirm() {
      console.log("isConfirm");
      this.isConfirm = false;
    },
    btnReslove(data) {
      console.log("btnReslove");
      this.isConfirm = false;
    },
    FinishChallenge({ btnTxt, challenge_id }) {
      /* 
          假如是 app 则发送事件 => app 原生打卡
        */
      if (this.isTigerApp) {
        const json = {};
        document.location =
          "__bridge__" +
          encodeURI(JSON.stringify(json), "utf-8") +
          "__bridge__";
      }
      /* 
          app || web => web chlsidx
        */
      this.$router.push({
        name: "chlsidx",
        query: {
          u: this.userID,
          c: challenge_id
        }
      });
    }
  },
  async mounted() {
    Promise.all([this.activitys(), this.activitysChallenges()]).then(
      () => {
        this.isAJAX = true;
        this.getLineWwidth();
      },
      e => console.log(e)
    );
  }
};
</script>

<style lang="less" scoped>
@import url("../../style/challenger/step.less");
.mask-warpper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
</style>