<template>
    <div>
        <div class="nodata" v-if="showNoView">
            <!-- 无数据 默认 空白? -->
        </div>
        <div class="cardWrapper" v-if="showDataView">
            <div v-if="!cardList.length"></div>
            <ul class="cardList" v-else>
                <li  v-for="item in cardList" :key="item.clockin_id" @click="toClockInShare(item.clockin_id)">
                    <img  class="card page-lazyload-image" v-lazy="item.url + '?imageView2/w/500/h/500/q/50'" alt=""> 
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { pageInit } from "../../../mixins/pageInit";
export default {
  props: ["user_id", "mobid"],
  data() {
    return {
      cardList: []
    };
  },
  mixins: [pageInit],
  methods: {
    async clockininfo() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + "/api/clockin/user/sport/share/clockininfo",
        params: {
          user_id: this.user_id
        }
      });

      try {
        const data = await this.isTrue(httpResponse);
        this.clockininfoFilter(data);
      } catch (error) {
        console.log("err:", error);
      }
    },
    toClockInShare(id) {
      this.$router.push({
        name: "clockInShare",
        query: {
          m: this.mobid,
          c: id
        }
      });
    },
    clockininfoFilter(data) {
      this.cardList = data.clockin;
    }
  },
  mounted() {
    this.clockininfo()
      .then(() => {
        this.isAJAX = true;
        this.$emit("onImgDone");
      })
      .catch(e => console.log("clockininfo:" + e));
  }
};
</script>

<style lang="less" scoped>
.cardList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 3.75rem;
  margin: 0 auto;
  .card {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 4px;
    object-fit: cover;
    margin: 0.02rem;
  }
}

/*
    iPhone plus
*/

@media screen and (min-width: 400px) {
  .cardList {
    width: 3.75rem;
  }
}

/*
    横屏
*/

@media screen and (min-width: 500px) {
  .cardList {
    width: 100%;
  }
}
</style>
