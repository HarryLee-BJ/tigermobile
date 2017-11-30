<template>
  <div id="schedule">
    <div class="fixed-header" ref="header">
      <div class="table-title">
        <section class="coach">
          <img :src="coach.avatar + '?imageView2/5/w/200/h/200/q/10'" alt="">
          <div>
            <div class="name">{{coach.nickname}}</div>
            <div class="gym">{{coach.gym_name}}</div>
          </div>
        </section>
        <section  class="titleType">
          <div><i class="dot dot_g"></i>可预约</div>
          <div><i class="dot dot_y"></i>待确认</div>
          <div><i class="dot dot_b"></i>不可预约</div>
          <div><i class="dot dot_l"></i>预约成功</div>
        </section>
      </div>
      <div class="time-title ">
        <div class="time-title_item month">
          {{monthNow}}月
        </div>
        <div class="time-title_item" v-for="(item,index) in weekTitle" :key="index">
          {{item.txt}}
          <div>
            {{item.num}}
          </div>
        </div>
      </div>
    </div>
    <div class="table" @click="reservation" ref="table">
      <div class="day pd2">
        <div class="day_title" v-for="num in 48" :key="num" v-show="num%2===0">
          {{num | num2hour}}
          <i class="min" >:{{num | num2min}}</i>
        </div>
      </div>
      <div class="day" v-for="(day,dIndex) in allClass" :key="dIndex">
        <div v-for="(time,tIndex) in day" :key="tIndex" class="class" :day_time="day[dIndex].day+'='+time.time" :class="((day[dIndex].day===0) && (time.time<timeNow)) ? 'cant': ''">
          <div class="posWrapper" :class="time.type" v-if="time.avatar" @click.stop="clickChecked(time.type)">
            <img :src="time.avatar + '?imageView2/5/w/200/h/200/q/10'" alt="" class="posAvatar" v-if="time.user_id === user_id">
          </div>
          <div class="catWrapper cant" v-if="((day[dIndex].day===0) && (time.time<timeNow))">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"; // return moment(time).format("YYYY-MM-DD HH:mm:ss");
import errmsg from "../unit/apiErr.js";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      coach: {
        avatar: "",
        gym_name: "",
        nickname: ""
      },
      weekTitle: [],
      stateLattice: [],
      allClass: [],
      timeNow: 0,
      monthNow: moment().month() + 1,
      user_id: `${this.$route.query.user}`
    };
  },
  methods: {
    clickChecked(type) {
      // console.log("被占:", type); // watting", "cant" , "success"
      if (type === "success") {
        this.$toast("您已经预约成功 !");
        // MessageBox.alert("您已经预约成功 !", "老虎运动");
      } else if (type === "watting") {
        // MessageBox.alert("正在等待教练确认 !", "老虎运动");
        this.$toast("正在等待教练确认 !");
      } else if (type === "cant") {
        // MessageBox.alert("该时间段已被预约 !", "老虎运动");
        this.$toast("该时间段已被预约 !");
      }
    },
    async reservation(e) {
      if (!this.getTime(e)) {
        return;
      }

      const { start, end, diffDay, time } = this.getTime(e);

      if (this.canAddCourse(diffDay, time)) {
        try {
          await MessageBox.confirm(
            `
            预约 ${this.coach.nickname} 教练 ${start.split(" ")[0]}
            </br>
            ${start.split(" ")[1]}-${end.split(" ")[1]}的训练吗 ?
            `,
            "预约教练"
          );
          this.courseAdd(start, end);
        } catch (error) {
          this.$toast("您已经取消预约 !");
        }
      }
    },
    canAddCourse(diffDay, time) {
      diffDay = parseInt(diffDay);
      time = parseInt(time);

      let bool = true;
      if (diffDay === 0 && time < this.timeNow) {
        // console.log("time < this.timeNow");
        this.$toast("此时间段不可预约 !");
        bool = false;
      }

      this.stateLattice.map((item, index) => {
        console.log("time:", time - item.time);
        // console.log("item.time:", item.time);
        if (item.day === diffDay && time - item.time === -1) {
          // MessageBox.alert("预约不足一小时,无法预约教练 !", "老虎运动");
          this.$toast("预约不足一小时,无法预约教练 !");
          bool = false;
          return;
        }
      });

      return bool;
    },
    getTime(e) {
      if (
        e.target &&
        [...e.target.classList].find(className => className === "class")
      ) {
        const [diffDay, time] = e.target.attributes.day_time.value.split("=");
        const HHmm = `${time / 2}`.split(".");
        let HH = HHmm[0];
        const mm = HHmm[1];
        let resTime = "";
        if (HH < 10) {
          HH = `0${HH}`;
        }

        if (mm) {
          resTime = ` ${HH}:30:00`;
        } else {
          resTime = ` ${HH}:00:00`;
        }

        const endHHmm = resTime.split(":");
        const endmm = endHHmm[1];
        const endHH = parseInt(endHHmm[0]);
        const endTime = ` ${endHH + 1}:${endmm}:00`;

        const thatDay = moment()
          .add(diffDay, "days")
          .format("YYYY-MM-DD");

        return {
          start: thatDay + resTime,
          end: thatDay + endTime,
          diffDay: diffDay,
          time: time
        };
      }
    },
    initTitle() {
      const dayStr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

      for (let diffDay = 0; diffDay < 7; diffDay++) {
        this.weekTitle.push({
          num: moment()
            .add(diffDay, "days")
            .date(),
          txt:
            dayStr[
              moment()
                .add(diffDay, "days")
                .day()
            ]
        });
      }
    },
    initTimeNow() {
      const HHmm = moment().format("HH:mm");
      const [nowHour, nowMin] = HHmm.split(":");
      this.timeNow = nowHour * 2 + parseInt(nowMin / 30) + 1;
    },
    async getCurseList() {
      const response = await this.$http.jsonp(
        this.$getApi + "/api/course/list/getweek",
        {
          params: {
            trainer_id: this.$route.params.id,
            user_id: this.$route.query.user,
            time: moment().format("YYYY-MM-DD")
          }
        }
      );

      const body = response.body;

      if (body.success) {
        this.getCurseListFilter(body.data.course);
      } else {
        this.$toast("接口出错!");
      }
    },
    getCurseListFilter(classList) {
      // 此处待定
      // STATUS =         0待确认     1未开始  2进行中 3已完成   4已拒绝
      const status2str = ["watting", "cant", "cant", "cant", ""]; // success
      this.stateLattice = classList.map((item, index) => {
        const mTime = moment(item.start);
        const HH = mTime.hour();
        const mm = mTime.minute();
        const resTime = HH * 2 + parseInt(mm / 30);
        const resDay = parseInt(
          Math.abs(
            (mTime.valueOf() -
              moment(moment().format("YYYY-MM-DD 00:00:00")).valueOf()) /
              86400000
          )
        );

        return {
          avatar: item.avatar || item.wx_avatar,
          type: status2str[item.status],
          day: resDay,
          time: resTime,
          user_id: item.customer_id
        };
      });

      this.initTableChecked();
    },
    initTableChecked() {
      // 向表格添加头像
      for (const item of this.stateLattice) {
        // 课程列表
        for (const klass of this.allClass) {
          // 全部表格
          klass.map(klassItem => {
            if (item.day === klassItem.day && item.time === klassItem.time) {
              klassItem.avatar = item.avatar;
              klassItem.type = item.type;
              klassItem.user_id = item.user_id;
            }
          });
        }
      }
    },
    async workingInfo() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + `/api/users/${this.$route.params.id}/centers` //
      });
      const { body: { data, success } } = httpResponse;
      if (success) {
        this.coach = {
          avatar: data.avatar || data.wx_avatar,
          gym_name: data.gym_name,
          nickname: data.nickname || data.wx_nickname
        };
      } else {
        this.$toast("接口出错!");
      }
    },
    initTable() {
      function dayClass(day) {
        const res = [];
        for (let time = 0; time < 48; time++) {
          res.push({
            day: day,
            time: time,
            avatar: "",
            type: "empty"
          });
        }
        return res;
      }
      for (let day = 0; day < 7; day++) {
        this.allClass.push(dayClass(day));
      }
    },
    async courseAdd(start, end) {
      const response = await this.$http.jsonp(
        this.$getApi + "/api/customer/course/web/add",
        {
          params: {
            start: start,
            end: end,
            customer_id: this.$route.query.user,
            trainer_id: this.$route.params.id,
            course_name: "",
            status: "0",
            type: "0",
            flag: "1" // 学员向教练约课
          }
        }
      );

      const body = response.body;

      if (body.success) {
        this.$toast("操作成功!");
      } else {
        const { message } = body;
        const title = errmsg(message);
        this.$toast(title);
      }
      this.getCurseList();
    },
    scroll() {
      window.onload = () => {
        const tableH =
          this.$refs.table.getBoundingClientRect().height * 0.375 - 42;
        setTimeout(() => {
          window.scrollTo(0, tableH);
        }, 100);
      };
    }
  },
  filters: {
    num2hour(num) {
      // if (num < 20) {
      //   return "0" + parseInt(num / 2);
      // } else {
      //   return parseInt(num / 2);
      // }

      return parseInt(num / 2);
    },
    num2min(num) {
      if (num % 2 === 0) {
        return "00";
      } else {
        return "30";
      }
    }
  },
  created() {
    document.title = "教练日程";
    this.initTable();
  },
  mounted() {
    this.initTimeNow();
    this.initTitle();
    this.getCurseList();
    this.workingInfo();
    this.scroll();
  }
};
</script>

<style lang="less" scoped>
@import url("../style/schedule.less");
.posWrapper {
  position: absolute;
  width: 0.43rem;
  height: 0.38rem;
  z-index: 2;
  left: 50%;
  top: 0.02rem;
  border-radius: 2px;
  transform: translateX(-50%);
}

.catWrapper {
  position: absolute;
  width: 100%;
  height: 0.42rem;
}
.posAvatar {
  border-radius: 50%;
  width: 0.28rem;
  height: 0.28rem;
  object-fit: cover;
  border: 1px solid #fff;
  position: absolute;
  right: 0.06rem;
  top: 0.04rem;
}
.success {
  background: #9ce346;
}
.watting {
  background: #f8b457;
}
.cant {
  background: #262626;
}

.pd2 {
  margin-top: 0.28rem;
  width: 0.32rem;
}
</style>
<style>
.mint-msgbox {
  width: 2.95rem;
}
.mint-msgbox-title {
  color: #505050;
  font-size: 0.16rem;
}

.mint-msgbox-message {
  color: #757575;
  line-height: 1.5;
  font-size: 0.14rem;
}
.mint-msgbox-cancel {
  color: #505050;
}
.mint-msgbox-btns {
  font-size: 0.16rem;
}
</style>
