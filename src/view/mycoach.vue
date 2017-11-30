<template>
  <div>
    <!-- <div class="spinner-loading" v-if="noData">
                                      <mt-spinner type="snake"></mt-spinner>
                                  </div> -->
    <div id="coach" class="body-base" v-if="!noData">
      <div v-if="trainers.length !== 0">
        <div class="coach-item item-base" v-for="item in trainers" :key="item.a_id" @click="toSchedule(item.a_id,item.b_id)">
          <img class="avater" v-lazy="item.avatar + '?imageView2/5/w/150/h/150'">
          <div class="info">
            <div class="name ft-wt-big">{{item.nickame}}</div>
            <div class="belong ft-gary-samll">{{item.gymname}}</div>
          </div>
        </div>
      </div>
      <div class="defaultCopy" v-if="trainers.length === 0">
        <div>还没有教练，</div>
        <div>快去寻找您的专属教练吧！</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import errmsg from "../unit/apiErr.js";
export default {
  beforeCreate() {
    document.title = "我的教练";
    Indicator.open({
      spinnerType: "fading-circle"
    });
  },
  activated() {
    document.title = "我的教练";
  },
  data() {
    return {
      noData: true,
      trainers: [],
      user_id: ""
    };
  },
  methods: {
    async myTrainerList() {
      const response = await this.$http.jsonp(
        this.$getApi + "/api/customer/wechat/myTrainerList",
        {
          params: {
            //                        code: process.env.NODE_ENV === 'development' ?
            //                            '001bVk5R0BUSOb2YJz7R03Ri5R0bVk5G' : this.$route.query.code
            code: this.$route.query.code
          }
        }
      );
      const body = response.body;
      if (body.success) {
        this.trainers = body.data.trainers;
        this.user_id = body.data.user_id;
        this.noData = false;
      } else {
        const { message } = body;
        const title = errmsg(message);
        this.$toast(title);
      }
      Indicator.close();
    },
    toSchedule(a, b) {
      this.$router.push({
        name: "schedule",
        params: {
          id: a
        },
        query: {
          user: b
        }
      });
    }
  },
  mounted() {
    this.myTrainerList();
  }
};
</script>

<style lang="less" scoped>
@import url("../style/coach.less");
</style>
