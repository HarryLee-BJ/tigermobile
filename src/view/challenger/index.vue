<template>
  <div>
    <div v-if="showNoView"></div>
    <div class="index" v-if="showDataView">
      <section class="cards">
        <ul class="">
          <li class="item daily">
            <div class="info">
              <div class="title">{{info.t}}</div>
              <div class="p">{{info.d}}</div>
            </div>
            <div class="white-btn" @click="doBridge">
              <div class="txt">前往打卡</div>
              <div class="mask"></div>
            </div>
          </li>
        </ul>
      </section>
      <star class="mgb" :star="star"></star>
      <user :challengeID="challengeID" :userID="userID"></user>
    </div>
  </div>
</template>

<script>
import star from "./star";
import user from "./user";
import { pageInit } from "../../mixins/pageInit";
import { userAgent } from "../../mixins/userAgent";
export default {
  data() {
    return {
      userID: this.$route.query.u, // "14d1ca1a820c49c9a0f2e6129cbe011e",
      challengeID: this.$route.query.c, // "2cad0638-b94c-4d30-b904-38e7864c4948",
      code: this.$route.query.code,
      info: {
        challenge_id: "",
        d: "",
        score: "",
        t: ""
      },
      star: {}
    };
  },
  mixins: [pageInit, userAgent],
  components: {
    user,
    star
  },
  methods: {
    async tasks() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + `/api/challenges/${this.challengeID}`
      });
      try {
        const data = await this.isTrue(httpResponse);
        this.tasksFilter(data);
      } catch (error) {
        console.log("err:", error);
      }
    },
    tasksFilter(data) {
      this.info = data;
      this.star = data.star;
    },
    doBridge() {
      const { challenge_id, d, score, t } = this.info;
      this.emitBridge("前往打卡", {
        challenge_id,
        d,
        score,
        t
      });
    }
  },
  async mounted() {
    await this.tasks();
    this.isAJAX = true;
  }
};
</script>

<style lang="less" scoped>
@import url("../../style/challenger/index.less");
.mgb {
  margin-bottom: 0.08rem;
}
</style>