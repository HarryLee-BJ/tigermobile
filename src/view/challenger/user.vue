<template>
  <div>
    <div v-if="showNoView"></div>
    <div class="user" v-if="showDataView">
      <div class="header">挑战用户</div>
      <div class="item-wrapper">
        <ul class="items">
          <li class="item" v-for="(item,index) in list" :key="item.clockin_id" @click="doBridgeClock(item)">
            <i class="isShowTiger" v-if="item.isShowTiger === '1'"></i>
            <i class="sportType" :style=" 'background-image: url(' +  item.iconImg   +')'"></i>
            <img class="img" :src="item.url + '?imageView2/5/w/400/h/400/q/50'" alt="">
            <div class="info">
              <div class="txt">
                <div class="title ellipsis" v-if="item.tag">#{{item.tag}}</div>
                <div class="p" v-if="item.content">{{item.content |contentF}}</div>
              </div>
              <div class="bottom">
                <img class="avatar" :src="item.avatar + '?imageView2/5/w/150/h/150/q/10'" alt="">
                <div class="r" @click="dolike(item,index)">
                  <img class="like" key="like" src="../../assets/challenger/like.png" alt="" v-show="!item.isLike">
                  <img class="like" key="liked" src="../../assets/challenger/liked.png" alt="" v-show="item.isLike">
                  <span class="num">{{item.likes}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { pageInit } from "../../mixins/pageInit";
import { userAgent } from "../../mixins/userAgent";
export default {
  props: {
    challengeID: {
      type: String,
      required: true
    },
    userID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 10,
      ajaxLock: true,
      iconList: []
    };
  },
  mixins: [pageInit, userAgent],
  methods: {
    async clockins() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + `/api/challenges/${this.challengeID}/clockins`,
        params: {
          user_id: this.userID,
          page: this.pageIndex,
          limit: this.pageSize
        }
      });
      try {
        const data = await this.isTrue(httpResponse);
        this.clockinsFilter(data);
      } catch (error) {
        console.log("err:", error);
      }
    },
    clockinsFilter(data) {
      if (data.length) {
        this.ajaxLock = true;
      } else {
        this.ajaxLock = false;
      }
      data.map(item => {
        item.iconImg = require(`../../assets/sportIcon/${item.sport_id}.png`);
      });
      this.list = this.list.concat(data);
      this.pageIndex++;
    },
    loadMore() {
      if (
        window.pageYOffset /
          (document.documentElement.scrollHeight - window.innerHeight) >=
        0.8
      ) {
        if (this.ajaxLock) {
          this.ajaxLock = false;
          this.clockins();
        }
      }
    },
    bindLoad() {
      window.addEventListener("scroll", this.loadMore, false);
    },
    removeLoad() {
      window.removeEventListener("scroll", this.loadMore, false);
    },
    async likeAddOrCancel(clockin_id) {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + `/api/jsp/likes/clockins`,
        params: {
          clockin_id: clockin_id,
          user_id: this.userID
        }
      });
      this.likeAddOrCancelFilter(httpResponse);
    },
    likeAddOrCancelFilter(httpResponse) {
      if (!httpResponse.body.success) {
        // 失败 点赞取消  成功 不处理
      }
    },
    dolike(item, index) {
      item.isLike = !item.isLike;
      if (item.isLike) {
        this.list[index].likes++;
      } else {
        this.list[index].likes--;
      }
      this.likeAddOrCancel(item.clockin_id); // clockin_id flag
    },
    doBridgeClock({ clockin_id }) {
      this.emitBridge("打卡详情", {
        clockin_id
      });
    }
  },
  filters: {
    contentF(str) {
      if (str.length > 20) {
        return str.substr(0, 20) + "...";
      } else {
        return str;
      }
    }
  },
  async mounted() {
    await this.clockins();
    this.bindLoad();
    this.isAJAX = true;
  },
  beforeDestroy() {
    this.removeLoad();
  }
};
</script>

<style lang="less" scoped>
@import url("../../style/challenger/user.less");
</style>
