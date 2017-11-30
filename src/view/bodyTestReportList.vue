<template>
  <div class="test_report_list" v-if="isDoneLoading">
    <header v-if="isShowList">
      <div class="report_quantity">
        <span>体测 <span class="times">{{data.datas.length}}</span> 次</span>
      </div>
      <div class="since_the_last_test">
        <span>距离上次体测 <span>{{data.days}}</span> 天</span>
      </div>
    </header>
    <div v-if="isShowList" class="list_body">
      <template v-for="item,index in data.datas">
          <div @click="report_detail(item.test_id)" class="each_test">
              <div v-if="index==0" class="last_test">
                  <div class="date">
                      <span>{{item.date}}</span>
                  </div>
                  <img class="tag" src="../assets/bodyTestReportList/tag_blue_2x.png" />
                  <img class="dotted_line dotted_line_head" src="../assets/bodyTestReportList/dotted_line_head_2x.png" />
              </div>
              <div v-if="index!=0" class="past_test">
                  <div class="date black">
                      <span>{{item.date}}</span>
                  </div>
                  <img class="tag" src="../assets/bodyTestReportList/tag_white_2x.png" />
                  <img class="dotted_line" src="../assets/bodyTestReportList/dotted_line_body_2x.png" />
              </div>
              <div class="text">
                  <div class="title">
                      <span v-if="index==0">我的最近一次体测</span>
                      <span v-if="index!=0">我的第<span>{{data.datas.length - index}}</span>次体测</span>
                      <!--<span>我的第<span>{{data.datas.length - index}}</span>次体测</span>-->
                  </div>
                  <div class="create_time">
                      <span>{{item.time}}</span>
                  </div>
              </div>
              <div class="arrow">
                  <img src="../assets/bodyTestReportList/arrow_2x.png" style="width: 0.08rem;" />
              </div>
          </div>
</template>

        </div>

        <div v-if="!isShowList" class="no_body_test_tip">
            <span>教练还没有给你做过体测～</span>
        </div>
    </div>
</template>

<script>
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
export default {
  created() {
    //            赋予页面Title
    document.title = "我的体测";
    this.$http({
      method: "jsonp",
      url: this.$getApi + "/api/web/test/find/mytest",
      params: {
        code: this.$route.query.code
      },
      before() {
        Indicator.open({
          //                        text:'拼命加载中...',
          spinnerType: "fading-circle"
        });
      }
    }).then(res => {
      console.log(res.body);
      if (res.body.success) {
        //接口请求成功
        this.isDoneLoading = true;
        Indicator.close();
        this.data = res.body.data;
        if (this.data.datas.length === 0) {
          this.isShowList = false;
        } else {
          this.data.datas.map((v, k) => {
            v.date =
              parseInt(v.createtime.split("-")[1]) +
              "/" +
              parseInt(v.createtime.split("-")[2].split(" ")[0]);
            v.time =
              v.createtime.split(" ")[1].split(":")[0] +
              ":" +
              v.createtime.split(" ")[1].split(":")[1];
          });
        }
      } else {
        //接口请求失败
        if (res.body.data > 40000) {
          //相同code请求多次
          Toast({
            message: "code重复使用 error:" + res.body.data,
            position: "bottom"
          });
          Indicator.close();
        } else if (res.body.data < 100) {
          Toast({
            message: "数据错误 data:" + res.body.data,
            position: "bottom"
          });
          Indicator.close();
        } else {
          Toast({
            message: "发生错误 message:" + res.body.message,
            position: "bottom"
          });
          Indicator.close();
        }
      }
    });
  },
  updated() {},
  activated() {
    document.title = "我的体测";
  },
  data() {
    return {
      isDoneLoading: false,
      isShowList: true,
      data: {},
      times: ""
    };
  },
  methods: {
    report_detail(id) {
      this.$router.push({
        name: "examination",
        params: {
          id: id
        }
      });
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.test_report_list {
  width: 3.75rem;
  margin: 0 auto 0.74rem auto;
  font-weight: bold;
}
header {
  width: 3.75rem;
  height: 0.48rem;
  font-size: 0.13rem;
  color: rgba(255, 255, 255, 0.56);
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
}
.report_quantity {
  line-height: 0.48rem;
  margin-left: 0.16rem;
}
.times {
  font-size: 0.18rem;
  line-height: 0;
  color: white;
}
.since_the_last_test {
  line-height: 0.48rem;
  margin-right: 0.16rem;
}
.list_body {
  margin-top: 0.16rem;
}
.each_test {
  width: 3.75rem;
  height: 0.56rem;
  padding-left: 0.16rem;
  padding-right: 0.16rem;
}
.date {
  width: 0.32rem;
  text-align: center;
  position: absolute;
  font-size: 0.1rem;
  line-height: 0.19rem;
  /*background-color: red;*/
  /*margin-left: 0.05rem;*/
}
.black {
  color: black;
}
.tag {
  width: 0.38rem;
  float: left;
  margin-top: 0.01rem;
  margin-right: 0.09rem;
}
.dotted_line {
  width: 0.09rem;
  float: left;
}
.dotted_line_head {
  padding-top: 0.08rem;
}
.text {
  float: left;
  margin-left: 0.08rem;
}
.title {
  margin-top: 0.01rem;
  font-size: 0.13rem;
  line-height: 0.18rem;
}
.create_time {
  margin-top: 0.02rem;
  font-size: 0.12rem;
  line-height: 0.17rem;
  opacity: 0.56;
}
.arrow {
  float: right;
  margin-top: 0.12rem;
}
.no_body_test_tip {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.14rem;
  color: white;
  font-weight: normal;
}
</style>
