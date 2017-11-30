<template>
  <div>
    <!-- <transition name="fade" mode="out-in">
              <div class="spinner-loading" v-if="noData">
                  <mt-spinner type="snake"></mt-spinner>
              </div>
          </transition> -->
    <!-- 没有数据只展示默认头部  -->
    <div v-if="noData">
      <userheader :pic="avatar" :isIcon="false"></userheader>
      <div class="defaultCopy">
        <div>好记性不如烂笔头，说不定报告在教练深深的脑海里</div>
        <div>别着急，教练正在为您准备训练报告</div>
      </div>
    </div>
    <!-- 有数据全部展示  -->
    <div id="report" v-if="!noData">
      <userheader :time="timeFormated" :pic="avatar + '?imageMogr2/auto-orient/quality/50'" :location="gym_name" :courseState="reportState"></userheader>
      <div class="report-classes-wrapper">
        <div class="classes">
          <div v-for="item in action" v-if="action.length">
            <div class="action">{{item.name.projectName}}</div>
            <ul class="items-wrapper">
              <li class="items" v-for="(unit,index) in item.value">
                <i>{{index}}.</i>
                <span v-if="unit[0].weight !== '0' &&  unit[0].reps !== '0' ">{{unit[0].weight}} kg x {{unit[0].reps}} rep</span>
                <span v-if="!(unit[0].weight !== '0' &&  unit[0].reps !== '0')">空</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="classes" v-if="trainer_comments">
          <div class="coach">
            <div class="mycoach">我的教练</div>
            <div class="coachinfo">
              <span>{{trainer_name}}</span>
              <img :src="trainer_avatar + '?imageMogr2/auto-orient/quality/50'" alt="">
            </div>
          </div>
          <div class="claim">
            {{trainer_comments}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userheader from "../components/user_header.vue";
import { Indicator } from "mint-ui";
import errmsg from "../unit/apiErr.js";
export default {
  name: "report",
  beforeCreate() {
    Indicator.open({
      spinnerType: "fading-circle"
    });
  },
  created() {
    const _this = this;
    this.jsonpRequest().then(function() {
      // 计划 1
      // 报告 0
      let str = "",
        title;
      _this.reportState = parseInt(_this.$route.query.state);
      str = _this.reportState === 0 ? "训练报告" : "训练计划";
      if (_this.nickname) {
        title = `${_this.nickname}的${str}`;
      } else {
        title = `${str}`;
      }
      document.title = title;
    });
  },
  data() {
    return {
      noData: true,
      action: [],
      avatar: require("../assets/defaultAvatar.png"),
      gym_name: "",
      nickname: "",
      photo: "",
      start: "",
      time: "",
      trainer_avatar: "",
      trainer_comments: "",
      trainer_name: "",
      // 计划 1
      // 报告 0
      reportState: 0
    };
  },
  components: {
    userheader
  },
  computed: {
    timeFormated() {
      const day = this.start.split(" ")[0];
      const dayArr = day.split("-");
      return `${parseInt(dayArr[1])}月${parseInt(dayArr[2])}日 ${this.time}`;
    }
  },
  methods: {
    async jsonpRequest() {
      const response = await this.$http.jsonp(
        this.$getApi + "/api/course/share/info",
        {
          params: {
            course_id: this.$route.params.id
          }
        }
      );
      const body = response.body;
      if (body.success) {
        if (Object.keys(body.data).length) {
          this.action = body.data.course.action;
          if (body.data.course.avatar) {
            this.avatar = body.data.course.avatar;
          } else {
            this.avatar = require("../assets/defaultAvatar.png");
          }
          this.gym_name = body.data.course.gym_name;
          this.nickname = body.data.course.nickname;
          this.photo = body.data.course.photo;
          this.start = body.data.course.start;
          this.time = body.data.course.time;
          this.trainer_avatar = body.data.course.trainer_avatar;
          this.trainer_comments = body.data.course.trainer_comments;
          this.trainer_name = body.data.course.trainer_name;
          this.noData = false;
        } else {
          console.log("/api/course/share/info => 空对象！");
          Indicator.close();
          // this.$toast('暂无数据')
        }
      } else {
        const { message } = body;
        const title = errmsg(message);
        this.$toast(title);
      }
      Indicator.close();
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url("../style/report.less");
</style>