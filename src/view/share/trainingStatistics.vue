<template>
    <div class="isAjax" v-if="isAjax">
        <div class="hasData" v-if="hasData.getData && hasData.getFan">
            <div class="pagePadding">
                <div class="profile-header-wrapper">
                    <div class="avater-wrapper" @click="personInfo(visited_user_id,moblink.mobid)">
                        <div class="avater" :style=" 'background-image: url(' + clockin.avatar  + '?imageMogr2/auto-orient/quality/50' +')'"></div>
                        <div class="userName">{{clockin.nickname}}</div>
                    </div>
                    <ul class="thumbs-wrapper">
                        <li class="thumbs">
                            <div class="ft-gary-samll txtc">关注</div>
                            <div class="ft-wt-big txtc">{{mymainpage.attentions}}</div>
                        </li>
                        <li class="thumbs">
                            <div class="ft-gary-samll txtc">粉丝</div>
                            <div class="ft-wt-big txtc">{{mymainpage.fans}}</div>
                        </li>
                        <li class="thumbs">
                            <div class="ft-gary-samll txtc">被赞</div>
                            <div class="ft-wt-big txtc">{{mymainpage.likes}}</div>
                        </li>
                    </ul>
                </div>
                <div class="info-wrapper">
                    <div class="item-wrapper">
                        <div class="item">

                            <div class="day" v-for="(item,index) in dayList" :key="index">
                                <div class="day-time">{{item.part}}</div>
                                <div class="disc">
                                    <div class="shadow" :style=" 'top:-' + item.per +'%'"></div>
                                    <div class="color"></div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="item-wrapper">
                        <div class="item wrap">
                            <div class="kind" v-for="(item,index) in kindList" :key="index">
                                <div class="sportBase">
                                    <div class="shadow top" :style=" 'transform: rotateZ(' + item.per  +'deg)'"></div>
                                    <div class="color icon" :style=" 'background-image: url(' + require('../../assets/sportSe/' + item.kind + '.png')   +')'"></div>
                                </div>
                                <div class="time">{{item.num}}</div>
                            </div>
                        </div>
                    </div>

                    <div class="item-wrapper">
                        <div class="item wrap">

                            <div class="part" v-for="(item,index) in partList" :key="index">
                                <div class="num">{{item.num}}</div>
                                <div class="bar" :style=" 'height:'+item.num/100*33 +'rem;' "></div>
                                <div class="name">{{item.part}}</div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="noData" v-if="!(hasData.getData && hasData.getFan)">

        </div>

        <moblink v-if="showMobLink" :path="moblink.path" :mobid="moblink.mobid" :params="moblink.params" :showDefaultUI="moblink.showDefaultUI"></moblink>
    </div>
</template>
<script>
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";

import { counterAdd } from "../../unit/counterAdd";

import moblink from "../../components/moblink.vue";

export default {
  data() {
    return {
      isAjax: false,
      hasData: {
        getData: false,
        getFan: false
      },
      // user_id: '04fbe1827bb84b60a3772d3cb735f6e6',
      // visited_user_id: '04fbe1827bb84b60a3772d3cb735f6e6',
      // date: '08/07-08/14',

      // user_id: this.$route.query.user_id,
      // visited_user_id: this.$route.query.visited_user_id, // visited_user_id 是上一页的 user_id 是被看的人的 id
      visited_user_id: this.$route.query.user_id, // visited_user_id 是上一页的 user_id 是被看的人的 id
      date: this.$route.query.date,

      dayList: [
        {
          part: "S",
          num: 0,
          per: 0,
          anhao: "sunday"
        },
        {
          part: "M",
          num: 0,
          per: 0,
          anhao: "monday"
        },
        {
          part: "T",
          num: 0,
          per: 0,
          anhao: "tuesday"
        },
        {
          part: "W",
          num: 0,
          per: 0,
          anhao: "wednesday"
        },
        {
          part: "T",
          num: 0,
          per: 0,
          anhao: "thursday"
        },
        {
          part: "F",
          num: 0,
          per: 0,
          anhao: "friday"
        },
        {
          part: "S",
          num: 0,
          per: 0,
          anhao: "saturday"
        }
      ],
      dayListNumAll: 0,

      // kindList: [  // 长度不一定
      //     {
      //         kind: 0,
      //         num: 4,
      //         per: 40
      //     }
      // ],
      kindList: [], // 长度不一定
      kindListNumAll: 0,

      partList: [
        {
          part: "胸部",
          num: 0,
          anhao: "xb"
        },

        {
          part: "背部",
          num: 0,
          anhao: "bb"
        },
        {
          part: "肩部",
          num: 0,
          anhao: "jb"
        },
        {
          part: "手臂",
          num: 0,
          anhao: "sb"
        },
        {
          part: "腹部",
          num: 0,
          anhao: "fb"
        },
        {
          part: "臀部",
          num: 0,
          anhao: "tb"
        },
        {
          part: "腿部",
          num: 0,
          anhao: "tuib"
        },
        {
          part: "全身综合",
          num: 0,
          anhao: "all"
        }
      ],

      clockin: {
        avatar: "",
        bodyPartData: "",
        nickname: "",
        sportTypeData: "",
        weekData: ""
      },

      mymainpage: {
        attentions: 0,
        fans: 0,
        likes: 0
      },

      showMobLink: false,
      moblink: {
        path: "tigerfit/trainDetail",
        mobid: this.$route.query.mobid,
        params: {
          user_id: this.$route.query.user_id,
          date: this.$route.query.date
        },
        showDefaultUI: false
      }
    };
  },
  components: {
    moblink
  },
  created() {
    Indicator.open({
      spinnerType: "fading-circle"
    });
  },
  methods: {
    // createDom() {
    //     const script = document.createElement('script')

    //     script.setAttribute('id', '-moblink-js')
    //     script.setAttribute('src', 'http://f.moblink.mob.com/moblink.js?appkey=1db1063fdc256')

    //     const body = document.querySelector('body')
    //     body.appendChild(script)

    //     script.onload = (function () {

    //         MobLink.init({
    //             debug: true,
    //             path: "tigerfit/trainDetail",
    //             mobid: this.$route.query.mobid,
    //             params: {
    //                 user_id: this.$route.query.user_id,
    //                 date: this.$route.query.date
    //             }
    //             // showDefaultUI: false
    //         });
    //     }).bind(this)
    // },
    async getData() {
      // 获取一周的运动数据详情 上 中
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + "/api/user/sport/getsportweekdata",
        params: {
          user_id: this.visited_user_id,
          date: this.date
        }
      });

      this.isDataTrue(httpResponse, this.dataFilter);
    },

    async getFan() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + "/api/user/sport/mymainpage",
        params: {
          user_id: this.visited_user_id // 接口键名有错
        }
      });

      this.isDataTrue(httpResponse, this.fanFilter);
    },

    isDataTrue(httpResponse, Filter) {
      const { body: { success, data } } = httpResponse;

      if (success) {
        if (Object.keys(data).length) {
          Filter(data);
        } else {
          //                    Toast('数据为空！')
          Toast("请稍后重试");
        }
      } else {
        //                Toast('接口出错！')
      }
    },

    dataFilter(data) {
      this.hasData.getData = true;

      data.clockin.bodyPartData = JSON.parse(data.clockin.bodyPartData);
      data.clockin.sportTypeData = JSON.parse(data.clockin.sportTypeData);
      data.clockin.weekData = JSON.parse(data.clockin.weekData);

      this.clockin = data.clockin;

      document.title = `${data.clockin.nickname}的健身详情`;

      //  上 半球
      const weekData = data.clockin.weekData;
      for (const key in weekData) {
        this.dayList.map(function(item) {
          if (key === item.anhao) {
            item.num = weekData[key];
          }
        });
      }

      this.dayListNumAll = this.dayList.reduce((sum, item) => {
        return sum + item.num;
      }, 0);

      // 注意 this 指向
      // function 指向 dayList
      // 不用箭头函数 要绑定 this
      this.dayList.map(
        function(item) {
          const per = item.num / this.dayListNumAll * 100;
          // const per = 60
          let perShow = 0;

          if (per >= 0 && per < 25) {
            perShow = 25;
          } else if (per >= 25 && per < 50) {
            perShow = 50;
          } else if (per >= 50 && per < 100) {
            perShow = 75;
          } else if (per === 100) {
            perShow = 100;
          } else {
            perShow = 25;
          }

          item.per = perShow;
        }.bind(this)
      );

      // 中 圆形进度条
      const sportTypeData = data.clockin.sportTypeData;

      for (const key in sportTypeData) {
        // 'sport1' => 1.png
        const kindName = key.substr(-1, 1);
        console.log("kindName:", kindName);

        this.kindList.push({
          kind: kindName,
          num: sportTypeData[key],
          per: 0
        });
      }

      this.kindListNumAll = this.kindList.reduce(function(sum, item) {
        return sum + item.num;
      }, 0);

      this.kindList.map(
        function(item) {
          item.per = item.num / this.kindListNumAll * 180;
        }.bind(this)
      );

      // kindList: [  // 长度不一定
      //     {
      //         kind: 0,
      //         num: 4,
      //         per: 40
      //     }
      // ],
      // kindListNumAll: 0,

      // 底 黄色进度条
      const bodyPartData = data.clockin.bodyPartData;
      for (const key in bodyPartData) {
        this.partList.map(function(item) {
          if (key === item.anhao) {
            item.num = bodyPartData[key];
          }
        });
      }
    },

    fanFilter(data) {
      this.hasData.getFan = true;

      this.mymainpage.attentions = data.attentions;
      this.mymainpage.fans = data.fans;
      this.mymainpage.likes = data.likes;
    },

    personInfo(user_id, mobid) {
      this.$router.push({
        name: "userInfoShare",
        query: {
          user_id: user_id,
          mobid: mobid,
          tab: "data"
        }
      });
    }
    // async getClockin() {
    //     const httpResponse = await this.$http({
    //         method: 'jsonp',
    //         url: this.$getApi + '/api/clockin/user/sport/share/clockininfo',
    //         params: {
    //             user_id: this.visited_user_id // 接口键名有错
    //         }
    //     })

    //     this.ClockinFilter(httpResponse)
    // },
    // ClockinFilter() {

    // },
  },
  filters: {
    // topFilter(num) {
    //     // return num * 100 + '%';
    // }
  },
  mounted() {
    Promise.all([
      this.getData(), // 具体数据
      this.getFan() // 粉丝
      // this.getClockin()
    ])
      .then(() => {
        this.isAjax = true;
        Indicator.close();

        this.partList.map(function(item) {
          counterAdd(500, 0, item.num, function(now) {
            item.num = now;
          });
        });

        this.dayList.map(function(item) {
          counterAdd(500, 0, item.per, function(now) {
            item.per = now;
          });
        });

        this.kindList.map(function(item) {
          counterAdd(500, 0, item.per, function(now) {
            item.per = now;
          });
        });
      })
      .catch(e => {
        this.isAjax = true;
        console.log(e);
        Indicator.close();
      });

    // this.createDom()

    this.showMobLink = true;
  }
};
</script>

<style lang="less" scoped>
// 基本样式
.bgbase {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.flexS {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.flexB {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bgb {
  background-color: rgba(0, 0, 0, 0.1);
}

.pagePadding {
  padding: 0.16rem;
}

.txtc {
  text-align: center;
}

.info-wrapper {
  border-radius: 0.15rem;
  overflow: hidden;
  border: 1px solid #454545;
}

.wrap {
  flex-wrap: wrap;
}

.noData {
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url("../../assets/clockInShare/Group.png");
  background-size: 0.78rem 0.82rem;
  width: 3.43rem;
  height: 3.43rem;
  margin: 0 auto;
} // 头部信息
.profile-header-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.16rem;

  .avater-wrapper {
    .flexS;
    .avater {
      .bgbase;
      width: 0.32rem;
      height: 0.32rem;
      border-radius: 50%;
      margin-right: 0.08rem;
    }

    .userName {
      font-size: 0.13rem;
      line-height: 0.2rem;
    }
  }

  .thumbs-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .thumbs {
      margin-right: 0.16rem;
    }
  }
}

.item-wrapper {
  border-bottom: 1px solid #454545;
  .item {
    padding: 0.24rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .day {
      .day-time {
        font-size: 11px;
        text-align: center;
        margin-bottom: 12px;
      }
    }
  }
}

.item-wrapper:last-child {
  border-bottom: none;
} // 彩色圆形
.discbase {
  width: 0.24rem;
  height: 0.24rem;
  border-radius: 50%;
}

.disc {
  position: relative;
  overflow: hidden;
  .time {
    z-index: 10;
  }
  .discbase;
  .shadow,
  .color {
    .discbase;
  }

  .shadow {
    .bgbase;
    background-image: url("../../assets/discb.jpeg");
    position: absolute;
    left: 0; // top: 0;
    transition: all 3s linear;
    transform: rotateZ(0);
    width: 0.24rem;
    height: 0.24rem;
  }
  .color {
    .bgbase;
    background-image: url("../../assets/disc.png");
  }
} // 运动类型
.kindDisc {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
} // .kind:not(:nth-child(5)) {
//     margin-right: .2rem;
// }
.kind {
  margin-bottom: 0.12rem;
  margin-left: 0.08rem;
  margin-right: 0.08rem;
  .sportBase {
    position: relative;
    overflow: hidden;
    .bgbase;
    background-image: url("../../assets/sportSe/quan.png");
    .kindDisc;
    margin-bottom: 0.08rem;

    .shadow {
      width: 0.8rem;
      height: 0.8rem;
      position: absolute;
      left: -0.2rem;
      top: 0;
      z-index: 1;
      box-sizing: border-box;

      transition: all 3s linear;
      transform-origin: top center;
      background-image: url("../../assets/discb.jpeg");
    }
    .color {
      .bgbase;
      .kindDisc;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
    }
  }

  .time {
    line-height: 0.17rem;
    margin-top: 0.06rem;
    font-size: 0.12rem;
    text-align: center;
    opacity: 0.8;
  }
} // 进度条
.part {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;

  height: 1.5rem;
  .num,
  .name {
    font-size: 0.12rem;
    text-align: center;
    line-height: 0.17rem;
  }
  .num {
    opacity: 0.8;
  }

  .bar {
    margin: 0.02rem auto 0.08rem;
    width: 0.08rem;
    height: 0.8rem;
    transition: all 3s linear;
    background-color: #ffba5a;

    border-top-left-radius: 0.11rem;
    border-top-right-radius: 0.11rem;
    border-bottom-right-radius: 0.11rem;
    border-bottom-left-radius: 0.11rem;

    max-height: 0.9rem;
    min-height: 0.05rem;
  }
}
</style>