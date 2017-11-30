<template>
  <div class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
    <div class="students" v-for="item in clockins" :key="item.user_id">
      <div class="title">
        <img class="avatar" :src="item.showAvatar + '?imageView2/5/w/100/h/100/q/50'" alt="">
        <div class="name">{{item.showName}}</div>
        <img class="icon" src="http://coach-10061631.image.myqcloud.com/1060e00b-5f5f-4174-9cd9-cc9c4bc22e08" alt="" v-if="item.isPro">
      </div>
      <div class="card-wrapper">
        <ul class="card" :style="'width:'+ 1.38*item.clockinsNum + 'rem;'">
          <li v-for="img in item.clockins" :key="img.clockin_id">
            <video class="pic" :src="img.movie_url" v-if="img.movie_url"></video>
            <img class="pic" :src="img.url + '?imageView2/5/w/200/h/200/q/50'" alt="" controls="controls" v-else>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { pageInit } from "../../../mixins/pageInit.js";
import { InfiniteScroll } from "mint-ui";
import Vue from "vue";
Vue.use(InfiniteScroll);
export default {
  props: {
    user_id: "",
    tabName: {
      default: "cardlist",
      type: String
    }
  },
  data() {
    return {
      clockins: [],
      loading: false, // 若为真，则无限滚动不会被触发
      pageIndex: 1,
      pageSize: 10
    };
  },
  watch: {
    tabName(now) {
      if (now === "students") {
        if (this.pageIndex === 1) {
          // 否则 当加载到最后一个 pageIndex 时  来回切换 tabName 还是会加载空的数据
          this.studentsClockins();
        } else {
          !this.loading && this.studentsClockins();
        }
      }
    }
  },
  mixins: [pageInit],
  methods: {
    loadMore() {
      if (this.tabName !== "students") {
        return;
      }
      this.loading = true;
      this.studentsClockins();
    },
    async studentsClockins() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + `/api/trainers/${this.user_id}/students/clockins`,
        params: {
          page: this.pageIndex,
          limit: this.pageSize
        }
      });
      try {
        const data = await this.isTrue(httpResponse);
        this.studentsClockinsFilter(data);
      } catch (error) {
        console.log("err:", error);
      }
    },
    studentsClockinsFilter(data) {
      this.clockins.push(
        ...data.map(item => ({
          ...item,
          showName: item.nickname || item.wx_nickname,
          showAvatar: item.avatar || item.wx_avatar,
          clockinsNum: item.clockins.length
        }))
      );

      this.pageIndex++;

      this.loading = !data.length;
    }
  }
};
</script>

<style lang="less" scoped>
.students {
  padding: 0.16rem;
  padding-bottom: 0;
  .title {
    margin-bottom: 0.16rem;
    display: flex;
    align-items: center;
    .avatar {
      width: 0.32rem;
      height: 0.32rem;
      border-radius: 50%;
      margin-right: 0.08rem;
    }
    .name {
      font-size: 0.14rem;
      color: #ffffff;
      margin-right: 0.04rem;
    }
    .icon {
      width: 0.24rem;
      height: 0.12rem;
      object-fit: cover;
    }
  }
  .card-wrapper {
    overflow: scroll;
    .card {
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.16rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      .pic {
        width: 1.26rem;
        height: 1.26rem;
        display: block;
      }
    }
  }
}
.list {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
