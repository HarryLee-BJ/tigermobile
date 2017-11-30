<template>
  <div>
    <!-- <transition name="fade" mode="out-in">
                        <div class="spinner-loading" v-if="noData">
                            <mt-spinner type="snake"></mt-spinner>
                        </div>
                    </transition> -->
    <!-- <userheader :pic="showAvatar" :isIcon="false" v-if="noData"></userheader> -->
    <div v-if="!noData">
      <!--<userheader :time="'5月11日 13:00'" :pic="'https://picture.120xinmao.com/6046t1495590001386-1032x1032.jpg'" :bgimg="'https://picture.120xinmao.com/6046t1495590001386-1032x1032.jpg'"
                            :isIcon="false">
                        </userheader>-->
      <userheader :time="time" :pic="showAvatar" :isIcon="false">
      </userheader>
      <div id="examination">
        <div class="examination-wrapper bg-black">
          <div class="item">
            <div class="bmi" v-if="bmiNum">
              BMI {{bmiNum}}
            </div>
            <ul class="bmi-line">
              <li class="bmi-item"></li>
              <li class="bmi-item"></li>
              <li class="bmi-item"></li>
              <li class="bmi-item"></li>
            </ul>
          </div>
          <ul class="item body-data lvl_1">
            <li>
              <span class="value">{{test.height}}
                  <i>cm</i>
                </span>
              <span class="annotations">身高</span>
            </li>
            <li>
              <span class="value">{{test.weight}}
                  <i>kg</i>
                </span>
              <span class="annotations">体重</span>
            </li>
            <li>
              <span class="value">{{test.basemet}}
                  <i>kcal</i>
                </span>
              <span class="annotations">基础代谢</span>
            </li>
          </ul>
          <div class="item radius-base">
            <ul class="body-data">
              <li>
                <span class="value">{{test.muscle}}
                    <i>kg</i>
                  </span>
                <span class="annotations">骨骼肌</span>
              </li>
              <li>
                <span class="value">{{test.fat_percent}}
                    <i>%</i>
                  </span>
                <span class="annotations">体脂率</span>
              </li>
              <li>
                <span class="value">{{test.leanweight}}
                    <i>kg</i>
                  </span>
                <span class="annotations">去脂体重</span>
              </li>
            </ul>
            <div id="chart">
            </div>
            <div class="chart-res">{{size}}</div>
            <ul class="body-data">
              <li class="hips">
                <span class="value">{{test.whr}}
                    <i></i>
                  </span>
                <span class="annotations">腰臀比</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="ranger-wrapper item-base bd-base">
          <div class="title">
            以下数据为您运动1h的热量消耗值（千卡），请结合 自身实际情况和热量消耗值，选择下述中合适自己的 运动项目吧！
          </div>
          <ul class="ranger">
            <li>
              <div class="ranger-title">
                <i class="ranger-icon icon_1"></i>
                <div :style="{width: Consumption_zl*0.0014 +'rem'}" class="ranger-p"></div>
              </div>
              <span class="ranger-unit">{{Consumption_zl.toFixed(1)}}
                  <i class="i-unit">千卡</i>
                </span>
            </li>
            <li>
              <div class="ranger-title">
                <i class="ranger-icon icon_2"></i>
                <div :style="{width: Consumption_pb*0.0014 +'rem'}" class="ranger-p"></div>
              </div>
              <span class="ranger-unit">{{Consumption_pb.toFixed(1)}}
                  <i class="i-unit">千卡</i>
                </span>
            </li>
            <li>
              <div class="ranger-title">
                <i class="ranger-icon icon_3"></i>
                <div :style="{width: Consumption_jt*0.0014 +'rem'}" class="ranger-p"></div>
              </div>
              <span class="ranger-unit">{{Consumption_jt.toFixed(1)}}
                  <i class="i-unit">千卡</i>
                </span>
            </li>
            <li>
              <div class="ranger-title">
                <i class="ranger-icon icon_4"></i>
                <div :style="{width: Consumption_ts*0.0014 +'rem'}" class="ranger-p"></div>
              </div>
              <span class="ranger-unit">{{Consumption_ts.toFixed(1)}}
                  <i class="i-unit">千卡</i>
                </span>
            </li>
            <li>
              <div class="ranger-title">
                <i class="ranger-icon icon_5"></i>
                <div :style="{width: Consumption_dc*0.0014 +'rem'}" class="ranger-p"></div>
              </div>
              <span class="ranger-unit">{{Consumption_dc.toFixed(1)}}
                  <i class="i-unit">千卡</i>
                </span>
            </li>
            <li>
              <div class="ranger-title">
                <i class="ranger-icon icon_6"></i>
                <div :style="{width: Consumption_yy*0.0014 +'rem'}" class="ranger-p"></div>
              </div>
              <span class="ranger-unit">{{Consumption_yy.toFixed(1)}}
                  <i class="i-unit">千卡</i>
                </span>
            </li>
            <li>
              <div class="ranger-title">
                <i class="ranger-icon icon_7"></i>
                <div :style="{width: Consumption_tq*0.0014 +'rem'}" class="ranger-p"></div>
              </div>
              <span class="ranger-unit">{{Consumption_tq.toFixed(1)}}
                  <i class="i-unit">千卡</i>
                </span>
            </li>
            <li>
              <div class="ranger-title">
                <i class="ranger-icon icon_8"></i>
                <div :style="{width: Consumption_dq*0.0014 +'rem'}" class="ranger-p"></div>
              </div>
              <span class="ranger-unit">{{Consumption_dq.toFixed(1)}}
                  <i class="i-unit">千卡</i>
                </span>
            </li>
            <li>
              <div class="ranger-title">
                <i class="ranger-icon icon_9"></i>
                <div :style="{width: Consumption_yyc*0.0014 +'rem'}" class="ranger-p"></div>
              </div>
              <span class="ranger-unit">{{Consumption_yyc.toFixed(1)}}
                  <i class="i-unit">千卡</i>
                </span>
            </li>
            <li>
              <div class="ranger-title">
                <i class="ranger-icon icon_10"></i>
                <div :style="{width: Consumption_snds*0.0014 +'rem'}" class="ranger-p"></div>
              </div>
              <span class="ranger-unit">{{Consumption_snds.toFixed(1)}}
                  <i class="i-unit">千卡</i>
                </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/radar");
import userheader from "../components/user_header.vue";
import { Indicator } from "mint-ui";
import errmsg from "../unit/apiErr.js";
export default {
  beforeCreate() {
    Indicator.open({
      spinnerType: "fading-circle"
    });
  },
  created() {
    const _this = this;
    this.jsonpRequest().then(function() {
      let title = "";
      if (_this.showName) {
        title = _this.showName + "的体测报告";
      } else {
        title = "体测报告";
      }
      document.title = title;
    });
  },
  activated() {},
  data() {
    return {
      noData: true,
      test: {
        basemet: "",
        bday: "",
        chest: "",
        createtime: "",
        customer_id: "",
        fat: "",
        fat_percent: "",
        gender: "",
        gym_name: "",
        height: "",
        hips: "",
        isgoal: "",
        leanweight: "",
        leanweight_percent: "",
        leg: "",
        muscle: "",
        muscle_percent: "",
        photo: "",
        test_id: "",
        waist: "",
        weight: "",
        whr: "",
        avatar: "",
        nickname: "",
        wx_avatar: "",
        wx_nickname: ""
      },
      size: "" // 标准体重 肥胖型
    };
  },
  components: {
    userheader
  },
  watch: {
    noData(now, old) {
      if (!now) {
        this.$nextTick(function() {
          this.init();
        });
      }
    }
  },
  computed: {
    Consumption_zl() {
      return this.test.weight * 60 * 0.098;
    },
    Consumption_pb() {
      return this.test.weight * 60 * 0.165;
    },
    Consumption_jt() {
      return this.test.weight * 60 * 0.098;
    },
    Consumption_ts() {
      return this.test.weight * 60 * 0.129;
    },
    Consumption_dc() {
      return this.test.weight * 60 * 0.169;
    },
    Consumption_yy() {
      return this.test.weight * 60 * 0.129;
    },
    Consumption_tq() {
      return this.test.weight * 60 * 0.215;
    },
    Consumption_dq() {
      return this.test.weight * 60 * 0.133;
    },
    Consumption_yyc() {
      return this.test.weight * 60 * 0.138;
    },
    Consumption_snds() {
      return this.test.weight * 60 * 0.033;
    },
    time() {
      try {
        const arr = this.test.createtime.split(" ");
        const year = arr[0];
        const day = arr[1];
        const dayArr = day.split(":");
        const yearArr = year.split("-");
        return `${yearArr[1]}月${yearArr[2]}日 ${dayArr[0]}:${dayArr[1]}`;
      } catch (error) {
        console.log(error);
      }
    },
    bmiNum() {
      const bmi = (this.test.weight /
        (this.test.height / 100) /
        (this.test.height / 100)
      ).toFixed(1);
      if (bmi !== "NaN") {
        return bmi;
      } else {
        return "暂无数据";
      }
    },
    // 自定义 > 微信 > 老虎头
    // avatar: '',
    // nickname: '',
    // wx_avatar: '',
    // wx_nickname: '',
    showName() {
      return this.test.nickname ? this.test.nickname : this.test.wx_nickname;
    },
    showAvatar() {
      let resAvatar = "";
      if (!(this.test.avatar || this.test.wx_avatar)) {
        resAvatar = require("../assets/defaultAvatar.png");
      } else if (this.test.avatar) {
        resAvatar = this.test.avatar;
      } else {
        resAvatar = this.test.wx_avatar;
      }
      return resAvatar;
    }
  },
  methods: {
    init() {
      const myChart = echarts.init(document.getElementById("chart"));
      const _this = this;
      myChart.setOption({
        radar: {
          indicator: [
            {
              name: "体重",
              max: 130
            },
            {
              name: "脂肪",
              max: 100
            },
            {
              name: "骨骼肌",
              max: 100
            }
          ]
        },
        series: [
          {
            type: "radar",
            areaStyle: {
              normal: {}
            },
            data: [
              {
                value: [_this.test.weight, _this.test.fat, _this.test.muscle]
              }
            ]
          }
        ]
      });
    },
    // async getTestIdByCode() {
    //     const response = await this.$http.jsonp(this.$getApi + '/api/test/find/getTestIdByCode', {
    //         params: {
    //             code: process.env.NODE_ENV === 'development' ?
    //                 '061E6AzF0gAsPi2VmWwF0ZxFzF0E6AzW' : getQueryString('code')
    //         }
    //     })
    //     const body = response.body
    //     if (body.success) {
    //         this.test_id = body.data.test_id
    //         this.jsonpRequest()
    //     } else {
    //         this.$toast('接口出错!')
    //     }
    // },
    async jsonpRequest() {
      const response = await this.$http.jsonp(
        this.$getApi + "/api/test/find/side",
        {
          params: {
            test_id: this.$route.params.id
          }
        }
      );
      const body = response.body;
      if (body.success) {
        if (Object.keys(this.test).length !== 0) {
          this.test = body.data.test;
          // if (!body.data.test.avatar) { // 没头像 使用默认
          //     this.test.avatar = require('../assets/defaultAvatar.png')
          // }
          this.bodySize();
        } else {
          this.$toast("接口出错");
        }
        this.noData = false;
      } else {
        const { message } = body;
        const title = errmsg(message);
        this.$toast(title);
      }
      Indicator.close();
    },
    // async getUserInfo() {
    //     const response = await this.$http.jsonp(this.$getApi + '/api/course/share/info', {
    //         params: {
    //             course_id: this.$route.params.id
    //         }
    //     })
    // },
    bodySize(test) {
      const fatPercent = this.test.fat_percent; //
      const leanWeightPercent = this.test.leanweight_percent; //
      const skeletalMusclePercent = this.test.muscle_percent; //
      if (
        fatPercent < 12 &&
        skeletalMusclePercent < 50 &&
        leanWeightPercent < 82
      ) {
        this.size = "低体重/虚弱型";
      } else if (
        fatPercent > 18 &&
        skeletalMusclePercent > 59 &&
        leanWeightPercent > 88
      ) {
        this.size = "高体重/肥胖型";
      } else if (
        fatPercent > 18 &&
        skeletalMusclePercent > 49 &&
        skeletalMusclePercent < 60 &&
        leanWeightPercent > 88
      ) {
        this.size = "高体重/肌肉型";
      } else if (
        fatPercent < 12 &&
        skeletalMusclePercent > 49 &&
        skeletalMusclePercent < 60 &&
        leanWeightPercent < 82
      ) {
        this.size = "低体重/肌肉型";
      } else if (
        fatPercent > 12 &&
        fatPercent < 18 &&
        skeletalMusclePercent > 49 &&
        skeletalMusclePercent < 60 &&
        leanWeightPercent > 82 &&
        leanWeightPercent < 88
      ) {
        this.size = "标准体重/肌肉型";
      } else if (
        fatPercent > 12 &&
        fatPercent < 18 &&
        skeletalMusclePercent < 49 &&
        leanWeightPercent > 82 &&
        leanWeightPercent < 88
      ) {
        this.size = "标准体重/虚弱型";
      } else if (
        fatPercent < 12 &&
        skeletalMusclePercent > 59 &&
        leanWeightPercent > 82 &&
        leanWeightPercent < 88
      ) {
        this.size = "标准体重/肌肉型";
      } else if (
        fatPercent > 18 &&
        skeletalMusclePercent < 49 &&
        leanWeightPercent > 82 &&
        leanWeightPercent < 88
      ) {
        this.size = "标准体重/肥胖型";
      } else if (
        fatPercent > 18 &&
        skeletalMusclePercent > 49 &&
        skeletalMusclePercent < 60 &&
        leanWeightPercent > 88
      ) {
        this.size = "高体重/虚弱型";
      } else if (
        fatPercent > 18 &&
        skeletalMusclePercent < 49 &&
        leanWeightPercent < 82
      ) {
        this.size = "低体重/肥胖型";
      } else {
        this.size = "标准体重/肥胖型";
      }
    }
  },
  mounted() {
    // this.getTestIdByCode()
    // const _this = this
    // this.jsonpRequest().then(function () {
    //     let title = ''
    //     if(_this.showName){
    //        title = _this.showName + '的体测报告'
    //     }else{
    //        title ='体测报告'
    //     }
    //     document.title = title
    // })
    // this.getUserInfo()
  }
};
</script>

<style lang="less" scoped>
@import url("../style/examination.less");
#chart {
  width: 3rem;
  height: 3rem;
  margin: 0 auto;
  transform: scale(0.75);
}
.hips {
  width: 1.14rem;
  border-right: 1px solid #454545;
  flex-grow: 0;
}
.ranger-p {
  max-width: 1.8rem;
}
</style>