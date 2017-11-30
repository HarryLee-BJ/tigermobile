<template>
  <div>
    <div class="nodata" v-if="showNoView"></div>
    <div class="clockinRank" v-if="showDataView">

      <section class="card">
        <img class="avatar" :src="avatar" alt="">
        <div class="username">
          <div>{{username}}</div>
          <div class="pro"></div>
        </div>

        <div class="rankNum" v-if="rankNum">
          <div class="txt">第</div>
          <div class="data">{{rankNum}}</div>
          <div class="txt">名</div>
        </div>

        <div class="rankNum" v-else>
          <div class="txt">暂无数据</div>
        </div>
        <div class="clockinNum">
          <div class="txt">打卡</div>
          <div class="data">{{clockinNum}}</div>
          <div class="txt">次</div>
        </div>
      </section>

      <div v-if="$route.query.t">
        <section class="txt" v-if="$route.query.t === '0' ">全国总排行榜</section>
        <section class="txt" v-if="$route.query.t === '1' ">{{$route.query.p}}月排行榜</section>
      </div>

      <section class="txt" v-if="per">已击败{{per}}%的老虎运动用户</section>
      <section class="txt" v-else>尚未击败任何用户</section>

      <moblink :path="moblink.path" :mobid="moblink.mobid" :params="moblink.params" :showDefaultUI="moblink.showDefaultUI"></moblink>
    </div>
  </div>
</template>
<script>
import { counterAdd } from "../../../unit/counterAdd";
import moblink from "../../../components/moblink.vue";
import { pageInit } from "../../../mixins/pageInit";

export default {
  data() {
    return {
      user_id: this.$route.query.u,

      avatar: "",
      username: "",
      rankNum: 0,
      clockinNum: 0,
      per: 0,

      moblink: {
        path: "tigerfit/ranking",
        mobid: this.$route.query.m,
        params: {
          // u: this.$route.query.u,
          ...this.$route.query
        },
        showDefaultUI: false
      }
    };
  },
  created() {
    document.title = "老虎运动";
  },
  mixins: [pageInit],
  components: {
    moblink
  },
  methods: {
    async ranks() {
      const clockinType = ["clockinsall", "clockinsmonth"];
      const resType = clockinType[parseInt(this.$route.query.t)]; // this.$route.query.t => 0表示总榜   1表示省的月榜

      const httpResponse = await this.$http({
        method: "jsonp",
        // url: this.$getApi + `/api/ranks/${clockinType[0]}/users/${this.user_id}/area/${this.$route.query.p}` //月榜传地址
        url:
          this.$getApi +
          `/api/ranks/${resType}/users/${this.user_id}?area=${this.$route.query
            .p}`
      });

      this.isAJAX = true;

      try {
        const data = await this.isTrue(httpResponse);
        this.dataFilter(data);
      } catch (error) {
        console.log("err:", error);
      }
    },
    dataFilter(data) {
      // this.avatar = data.avatar + '?imageMogr2/auto-orient/quality/50'
      this.avatar = data.avatar;
      this.username = data.nickname;
      this.rankNum = data.index;
      this.clockinNum = data.count;
      this.per = (data.ratio * 100).toFixed(2);

      counterAdd(500, 0, this.clockinNum, now => (this.clockinNum = now));
      counterAdd(500, 0, this.rankNum, now => (this.rankNum = now));
    }
  },
  mounted() {
    this.ranks();
  }
};
</script>
<style lang="less" scoped>
.card {
  position: relative;
  width: 3.44rem;
  margin: 0.82rem auto 0;
  border-radius: 0.08rem;
  background: linear-gradient(to right, #aa5cff, #414bff);
  padding-top: 0.66rem;
  margin-bottom: 0.16rem;
  .avatar {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 2px solid #fff;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%) translateY(-50%);
    object-fit: cover;
  }
  .username {
    text-align: center;
    font-size: 0.2rem;
    line-height: 0.2rem;
    font-family: PingFang-SC-Medium;
    display: flex;
    align-items: center;
    justify-content: center;

    .pro {
      width: 0.24rem;
      height: 0.1rem;
      background-image: url("../../../assets/PRO.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
      margin-left: 0.05rem;
    }
  }
  .rankNum {
    display: flex;
    justify-content: center;
    align-items: baseline;
    padding-top: 0.3rem;
    .txt {
      font-size: 0.28rem;
      line-height: 0.4rem;
      color: rgba(255, 255, 255, 0.64);
      font-weight: 400;
    }
    .data {
      font-size: 0.56rem;
      line-height: 0.56rem;
      font-family: AvenirNextCondensed-DemiBold;
    }
  }
  .clockinNum {
    display: flex;
    justify-content: center;
    align-items: baseline;
    padding-top: 0.35rem;
    padding-bottom: 0.6rem;
    .txt {
      font-size: 0.24rem;
      line-height: 0.33rem;
      color: rgba(255, 255, 255, 0.64);
      font-weight: 400;
    }
    .data {
      font-size: 0.8rem;
      line-height: 0.8rem;
      font-family: AvenirNextCondensed-DemiBold;
    }
  }
}

.txt {
  font-weight: 200;
  text-align: center;
  color: rgba(255, 255, 255, 0.64);
  font-family: PingFang-SC-Regular;
  font-size: 0.18rem;
  line-height: 0.25rem;
}

.data {
  padding: 0 0.05rem;
}
</style>