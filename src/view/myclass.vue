<template>
  <div>
    <!-- <div class="spinner-loading" v-if="noData">
                                                                        <mt-spinner type="snake"></mt-spinner>
                                                                    </div> -->
    <ul class="tap">
      <li @click="tagIndex = 0 ;  courseFinishedChecked = true" :class=" tagIndex === 0 ? 'active' : '' " v-if="courseFinished.length >0 && courseFinishedChecked === false" class="dot">已完成</li>
      <li @click="tagIndex = 0 ;  courseFinishedChecked = true" :class=" tagIndex === 0 ? 'active' : '' " v-else>已完成</li>
      <li @click="tagIndex = 1 ; courseBfStartChecked = true" :class=" tagIndex === 1 ? 'active' : '' " v-if="courseBfStart.length >0 && courseBfStartChecked === false" class="dot">未开始</li>
      <li @click="tagIndex = 1 ; courseBfStartChecked = true" :class=" tagIndex === 1 ? 'active' : '' " v-else>未开始</li>
      <li @click="tagIndex = 2 ; coursePendingChecked = true" :class=" tagIndex === 2 ? 'active' : '' " v-if="coursePending.length >0 && coursePendingChecked === false" class="dot">待处理</li>
      <li @click="tagIndex = 2 ; coursePendingChecked = true" :class=" tagIndex === 2 ? 'active' : '' " v-else>待处理</li>
    </ul>
    <div id="class" v-if="!noData">
      <div class="mgt-5 class-wrapper roll-viewer">
        <div class="roll-cont" :style="{transform: 'translateX('+ -tagIndex*3.75 + 'rem)'}">
          <div class="body-base full-wh">
            <div v-if="courseFinished.length !== 0">
              <div class="class-item" v-for="item in courseFinished" :key="item.course_id" @click="toDetail(item.course_id,0)">
                <img class="class-pic" alt="" v-lazy="item.trainerAvatar + '?imageView2/5/w/200/h/200' ">
                <div class="class-info">
                  <div class="class-info_title" v-if="!item.courseName">{{item.trainerName}}教练</div>
                  <div class="class-info_title" v-if="item.courseName">我的{{item.courseName}}的训练 | {{item.trainerName}}教练</div>
                  <div class="class-info_remark">
                    <div class="time">{{item.time}}</div>
                    <div class="icon started">已完成</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="defaultCopy" v-if="courseFinished.length === 0">
              并没有已完成的课程
            </div>
          </div>
          <div class="body-base full-wh">
            <div v-if="courseBfStart.length !== 0">
              <div class="class-item" v-for="item in courseBfStart" :key="item.course_id" @click="toDetail(item.course_id,1)">
                <img class="class-pic" :src="item.trainerAvatar + '?imageView2/5/w/200/h/200' " alt="">
                <div class="class-info">
                  <div class="class-info_title" v-if="!item.courseName">{{item.trainerName}}教练</div>
                  <div class="class-info_title" v-if="item.courseName">我的{{item.courseName}}的训练 | {{item.trainerName}}教练</div>
                  <div class="class-info_remark">
                    <div class="time">{{item.time}}</div>
                    <div class="icon notstarted">未开始</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="defaultCopy" v-if="courseBfStart.length === 0">
              教练正在为您制定身体改造计划
            </div>
          </div>
          <div class="body-base full-wh">
            <!-- <transition-group name="list-complete" tag="p"> -->
              <div v-if="coursePending.length !== 0">
                <div class="operating list-complete-item" :key="item.course_id" v-for="(item,index) in coursePending">
                  <div class="operating-item">
                    <img class="class-pic" :src="item.trainerAvatar + '?imageView2/5/w/200/h/200' " alt="">
                    <div class="class-info">
                      <div class="class-info_title" v-if="!item.courseName">{{item.trainerName}}教练</div>
                      <div class="class-info_title" v-if="item.courseName">我的{{item.courseName}}的训练 | {{item.trainerName}}教练</div>
                      <div class="class-info_remark">
                        <div class="time">{{item.time}}</div>
                        <div class="icon wait">待处理</div>
                      </div>
                    </div>
                  </div>
                  <div class="operating-judge" @click.stop>
                    <span class="postive" @click.self="isAccept(index,item,1)">接受</span>
                    <span class="negative" @click.self="isAccept(index,item,0)">拒绝</span>
                  </div>
                </div>
              </div>
            <!-- </transition-group> -->
            <div class="defaultCopy" v-if="coursePending.length === 0">
              <div>与其等待不如主动出击,</div>
              <div>快去勾搭你的教练吧！</div>
              <div>好身材，约出来！</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { slideObj } from "../unit/tap.js";
import errmsg from "../unit/apiErr.js";
import { Indicator } from "mint-ui";
export default {
  beforeCreate() {
    document.title = "我的课程";
    Indicator.open({
      spinnerType: "fading-circle"
    });
  },
  activated() {
    document.title = "我的课程";
  },
  data() {
    return {
      noData: true,
      tagIndex: 0,
      course: [],
      courseFinished: [],
      courseBfStart: [],
      coursePending: [],
      courseFinishedChecked: false,
      courseBfStartChecked: false,
      coursePendingChecked: false
    };
  },
  watch: {
    noData(now) {
      if (!now) {
        this.$nextTick(function() {
          this.bindTap();
        });
      }
    },
    tagIndex() {
      window.scrollTo(0, 0);
    }
  },
  computed: {
    // courseFinished() { // 以完成
    //     return this.course.filter(item => item.courseStatus === 3)
    // },
    // courseBfStart() { // 未开始
    //     return this.course.filter(item => item.courseStatus === 1)
    // },
    // coursePending() { // 待处理
    //     return this.course.filter(item => item.courseStatus === 2)
    // }
  },
  methods: {
    bindTap() {
      const _this = this;
      const DOM = document.querySelector(".roll-cont");
      slideObj.touch(DOM, function(res) {
        if (res === "right") {
          if (_this.tagIndex > 0) {
            _this.tagIndex--;
          } else {
            _this.tagIndex = 2;
          }
        } else if (res === "left") {
          if (_this.tagIndex < 2) {
            _this.tagIndex++;
          } else {
            _this.tagIndex = 0;
          }
        }
      });
    },
    operate(tag) {
      console.log(tag);
    },
    async jsonpRequest() {
      const response = await this.$http.jsonp(
        this.$getApi + "/api/wx/users/courses", // /api/wx/users/courses?code=001kwrA805TpbJ1YuUD80X5RA80kwrAK
        {
          params: {
            //                        code: process.env.NODE_ENV === 'development' ?
            //                            '021ZMvb30s7CYF1umv830hYtb30ZMvbq' : this.$route.query.code
            code: this.$route.query.code
          }
        }
      );
      const body = response.body;
      if (body.success) {
        this.noData = false;
        this.classTypeInit(body.data);
      } else {
        const { message } = body;
        const title = errmsg(message);
        this.$toast(title);
      }
      Indicator.close();
    },
    classTypeInit(data) {
      // 后台 =>  状态(0待处理 1未开始 2进行中 3已完成 4已拒绝)
      // this.courseBfStart = this.course.filter(item => item.courseStatus === 1); // 未开始
      // this.coursePending = this.course.filter(item => item.courseStatus === 0); // 待处理
      // this.courseFinished = this.course.filter(item => item.courseStatus === 3); // 以完成

      this.courseBfStart = data.unstarts; // 未开始
      this.coursePending = data.unhandles; // 待处理
      this.courseFinished = data.completes; // 以完成
    },
    // 0拒绝 1同意
    async isAccept(index, { course_id, customer_id }, isAgree) {
      console.log(index);
      const response = await this.$http.jsonp(
        this.$getApi + "/api/customer/addCourse/agree",
        {
          params: {
            course_id,
            customer_id,
            isAgree
          }
        }
      );
      const body = response.body;
      if (body.success) {
        if (body.data.status === 1) {
          this.changeCourse(index, isAgree); // code唯一 本地改展示
          this.$toast("操作成功，待教练确认！");
        } else {
          const { status } = body.data;
          const msg = {
            "1000": "教练不能同意自己的课程",
            "1001": "不是你的课程不能同意",
            "1002": "已同意或已拒绝此课程"
          };
          let title = "操作失败！";
          if (msg[status]) {
            title = title + msg[status];
          }
          this.$toast(title);
        }
      } else {
        const { message } = body;
        const title = errmsg(message);
        this.$toast(title);
      }
    },
    changeCourse(index, isAgree) {
      const removedItem = this.coursePending.splice(index, 1)[0];
      console.dir(removedItem);
      if (isAgree === 1) {
        this.courseBfStart.push(removedItem);
      } else {
        // 拒绝
      }
    },
    toDetail(id, state) {
      this.$router.push({
        name: "report",
        params: {
          id
        },
        query: {
          state
        }
      });
    }
  },
  filters: {
    avaterFilter(item) {
      let resAvatar = "";
      if (!(item.avatar || item.wx_avatar)) {
        resAvatar = require("../assets/defaultAvatar.png");
      } else if (item.avatar) {
        resAvatar = item.avatar;
      } else {
        resAvatar = item.wx_avatar;
      }
      return resAvatar;
    }
  },
  mounted() {
    this.jsonpRequest();
  }
};
</script>

<style lang="less" scoped>
@import url("../style/myclass.less");
#class {
  height: 100%;
}
.list-complete-item {
  transition: all 0.3s;
  width: 100%;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: rotateX(90deg);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
