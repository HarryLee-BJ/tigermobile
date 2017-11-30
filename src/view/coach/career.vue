<template>
  <div>
    <div v-if="showNoView">
      <div class="showNoView"></div>
    </div>
    <div class="career" v-if="showDataView">
      <div class="main">
        <section class="header">
          <div class="left">
            <img class="avatar" :src="info.avatar+'?imageView2/5/w/100/h/100/q/50'" alt="">
            <div class="course">
              <div>课时费</div>
              <div>{{info.price/100 || 0}}</div>
              <div>元/节</div>
            </div>
          </div>
          <div class="right">
            <div class="name">
              {{info.real_name}}
              <div class="pro" v-if="info.is_pass_cert"></div>
            </div>
            <div class="address">
              <span>{{info.local}}</span>
              <span class="gym" v-if="info.gym_name">{{info.gym_name}}</span>
            </div>
            <ul class="exp">
              <li>{{info.years || 1 }}年从业经验</li>
              <li v-if="info.is_free">{{info.is_free === 1 ? '在职教练':'自由教练'}}</li>
              <li v-if="info.edus[0]">{{info.edus[0].t}}</li>
              <li v-for="(item,index) in info.tag" :key="index">{{item}}</li>
            </ul>
          </div>
        </section>
        <section class="line">
          <div class="part">
            <div class="item" v-if="info.certs.length">
              <div class="time">
              </div>
              <div class="certificate">
                <div class="dot dot_title"></div>
                <div class="title">培训经历</div>
              </div>
            </div>
            <div class="item" v-for="item in info.certs" :key="item.certs_id">
              <div class="time">
                {{item.start | startF}}年
              </div>
              <div class="certificate">
                <div class="dot"></div>
                <div class="title">{{item.t}}</div>
                <div class="imgbox">
                  <img v-for="img in item.imgs" :src="img+'?imageView2/5/w/200/h/200/q/50'" :key="img" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="part">
            <div class="item" v-if="info.honors.length">
              <div class="time">
              </div>
              <div class="certificate">
                <div class="dot dot_title"></div>
                <div class="title">个人荣誉</div>
              </div>
            </div>
            <div class="item" v-for="item in info.honors" :key="item.honor_id">
              <div class="time">
                {{item.start | startF}}年
              </div>
              <div class="certificate">
                <div class="dot"></div>
                <div class="title">{{item.t}}</div>
                <div class="imgbox">
                  <img v-for="img in item.imgs" :src="img+'?imageView2/5/w/200/h/200/q/50'" :key="img" alt="">
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="mask" :style="'background-image: url('+info.avatar+'?imageView2/5/w/200/h/200/q/50);'"></div>
    </div>
    <moblink :path="moblink.path" :mobid="moblink.mobid" :params="moblink.params" :showDefaultUI="moblink.showDefaultUI" :subtitle="'本教练在此恭候'"></moblink>
  </div>
</template>

<script>
import { pageInit } from "../../mixins/pageInit";
import moblink from "@/components/moblink.vue";
export default {
  data() {
    return {
      ID: this.$route.params.id, // a5ae5c81d275499d87d92051e206a73b
      info: {
        avatar: "",
        price: "",
        real_name: "",
        local: "",
        tag: "",
        years: "",
        gym_name: "",
        is_free: "",
        is_pass_cert: "",
        edus: [
          {
            t: ""
          }
        ],
        certs: [],
        honors: []
      },
      moblink: {
        path: "", //
        mobid: "",
        params: {},
        showDefaultUI: false // 约他上课
      }
    };
  },
  mixins: [pageInit],
  components: {
    moblink
  },
  methods: {
    async workingInfo() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + `/api/trainers/${this.ID}/working/info`
      });
      try {
        const data = await this.isTrue(httpResponse);
        this.workingInfoFilter(data);
      } catch (error) {
        console.log("err:", error);
      }
    },
    workingInfoFilter(data) {
      this.info = data;
      const tags = this.info.tag;
      if (tags) {
        this.info.tag = tags.split(" ");
      }
    }
  },
  filters: {
    startF(time) {
      return time ? time.split("-")[0] : "20XX";
    }
  },
  async mounted() {
    await this.workingInfo();
    this.isAJAX = true;
  }
};
</script>

<style lang="less" scoped>
@import url("../../style/coach/career.less");
</style>
