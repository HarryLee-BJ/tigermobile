<template>
  <div>
    <div class="hasData" v-if="showDataView">
      <div class="pagePadding">
        <div class="profile-header-wrapper">
          <div class="avater-wrapper" @click="personInfo">
            <div class="avater" :style=" 'background-image: url(' +  avatar  + '?imageMogr2/auto-orient/quality/20' +')'"></div>
            <div class="userName">{{nickname}}</div>
          </div>
          <ul class="thumbs-wrapper">
            <li class="thumbs">
              <div class="ft-gary-samll">关注</div>
              <div class="ft-wt-big txtc">{{attentions}}</div>
            </li>
            <li class="thumbs">
              <div class="ft-gary-samll">粉丝</div>
              <div class="ft-wt-big txtc">{{fans}}</div>
            </li>
            <li class="thumbs">
              <div class="ft-gary-samll">被赞</div>
              <div class="ft-wt-big txtc">{{likes}}</div>
            </li>
          </ul>
        </div>
        <div class="info-wrapper">
          <div class="video-wrapper">
            <video class="video" v-if="clockInfo.movie_url" controls="controls" :poster="clockInfo.url" :src="clockInfo.movie_url">
            </video>
            <img class="video" :src="clockInfo.url  + '?imageMogr2/auto-orient/quality/50'" v-if="!clockInfo.movie_url" />
            <div class="sport_id" :style=" 'background-image: url(' +  sport_id_img  +')'"></div>
            <div class="isShowTiger"></div>
          </div>
          <ul class="sport">
            <div class="flexS">
              <li class="item" v-if="clockInfo.sport_id">
                <div class="icon" :style=" 'background-image: url(' +  sport_id_icon +')'"></div>
              </li>
              <li class="item" v-if="clockInfo.duration !=='00:00:00'">
                <div class="icon" :style=" 'background-image: url(' +  sport_id_duration  +')'"></div>
                <div class="num">
                  {{durationTime}}
                </div>
              </li>
              <li class="item" v-if="clockInfo.hr">
                <div class="icon" :style=" 'background-image: url(' +  sport_id_hr +')'"></div>
                <div class="num">{{clockInfo.hr}}bpm</div>
              </li>
              <li class="item" v-if="clockInfo.distance">
                <div class="icon" :style=" 'background-image: url(' +  sport_id_distance +')'"></div>
                <div class="num">{{clockInfo.distance}}{{clockInfo.distance_unit === 1?'m':'km'}}</div>
              </li>
            </div>
            <div v-if="clockInfo.bodypart_id" class="bodyPart">{{bodypart_id_str}}</div>
          </ul>
        </div>
      </div>
    </div>
    <div class="noData" v-if="showNoView">
    </div>
    <moblink v-if="showMobLink" :path="moblink.path" :mobid="moblink.mobid" :params="moblink.params" :showDefaultUI="moblink.showDefaultUI"></moblink>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
/**
     * path 路径
     * mobid route.query.mobid
     * params app查询参数
     * showDefaultUI true 使用默认UI
     */
// props: ['path', 'mobid', 'params', 'showDefaultUI']
import moblink from "../../components/moblink.vue";
import errMsg from "../../unit/apiErr";
export default {
  data() {
    return {
      hasData: false,
      isDataChecked: false,
      clockin_id: this.$route.query.clockin_id || this.$route.query.c, // 安卓 ios 不同步
      mobid: this.$route.query.mobid || this.$route.query.m,
      attentions: 0,
      fans: 0,
      likes: 0,
      avatar: "",
      nickname: "",
      clockInfo: {
        avatar: "",
        bodypart_id: "",
        clockin_id: "",
        distance: "",
        distance_unit: "",
        duration: "",
        gender: "",
        gym_name: "",
        hr: "",
        isShowTiger: "",
        likes: "",
        movie_url: "",
        nickname: "",
        photo_time: "",
        sport_id: "",
        time0: "",
        url: "",
        user_id: ""
      },
      sport_id_img: "", // video 图标 require(img)
      sport_id_icon: "", // 类型（下）  图标 require(img)`
      bodypart_id_str: "", // 部位
      sport_id_duration: require(`../../assets/clockInShare/sportTime.png`), // 类型（下）  图标 require(img)
      sport_id_hr: require(`../../assets/clockInShare/sportRate.png`), // 类型（下）  图标 require(img)
      sport_id_distance: require(`../../assets/clockInShare/sportDistance.png`), // 类型（下）  图标 require(img)
      showMobLink: false,
      moblink: {
        path: "tigerfit/clockinDetail",
        mobid: this.$route.query.mobid || this.$route.query.m,
        params: {
          ...this.$route.query,
          clockin_id: this.$route.query.clockin_id || this.$route.query.c // 安卓 ios 不同步 // this.clockin_id
        },
        showDefaultUI: false
      }
    };
  },
  /*
                    DataView
                 */
  computed: {
    showDataView() {
      return this.hasData && this.isDataChecked;
    },
    showNoView() {
      return !this.hasData && this.isDataChecked;
    },
    durationTime() {
      const time = this.clockInfo.duration;
      let last = 0;
      if (time) {
        const hhmmss = time.split(":");
        last = parseInt(hhmmss[0]) * 60 + parseInt(hhmmss[1]);
      }

      return last + "min";
    }
  },
  components: {
    moblink
  },
  created() {
    Indicator.open({
      spinnerType: "fading-circle"
    });
    this.getclockinLikesinfo()
      .then(() => {
        Indicator.close();
      })
      .catch(e => {
        console.log(e);
        Indicator.close();
      });
  },
  methods: {
    async getclockinLikesinfo() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + "/api/clockin/user/sport/share/getclockinLikesinfo",
        params: {
          clockin_id: this.clockin_id
        }
      });
      this.isDataTrue(httpResponse, this.clockinLikesinfoFilter);
      // 数据指派过了
      this.isDataChecked = true;
    },
    isDataTrue(httpResponse, dataFilter) {
      const { body: { success, data, message } } = httpResponse;
      if (success) {
        if (Object.keys(data).length) {
          // 数据都分配完 在全部展示
          this.hasData = true;
          dataFilter(data);
        } else {
          // Toast('数据为空！')
          Toast("请稍后重试");
        }
      } else {
        Toast(errMsg(parseInt(message)));
      }
    },
    clockinLikesinfoFilter(data) {
      this.attentions = data.attentions;
      this.fans = data.fans;
      this.likes = data.likes;
      this.avatar = data.avatar;
      this.nickname = data.nickname;
      document.title = `${data.nickname}的健身详情`;
      const info = data.clockInfo[0]; // 以下统一用info 用数组第0个
      this.clockInfo = info;
      this.sport_id_img = require(`../../assets/sportIcon/${info.sport_id}.png`); // 右上角老虎头像
      this.sport_id_icon = require(`../../assets/sportSe/${info.sport_id}.png`); // 右上角老虎头像

      const bodyPartArr = [
        false,
        "胸部",
        "背部",
        "肩部",
        "手臂",
        "腹部",
        "臀部",
        "腿部",
        "全身综合",
        "其他"
      ]; // 部位可能没有
      this.bodypart_id_str = bodyPartArr[info.bodypart_id];
    },
    personInfo() {
      if (this.$route.query.offac === "1") {
        console.log(this.$route.query.offac);
        this.$router.push({
          name: "offAccIndex",
          params: {
            id: this.clockInfo.user_id
          },
          query: {
            m: this.mobid
          }
        });
      } else {
        this.$router.push({
          name: "personalPage",
          query: {
            m: this.mobid,
            u: this.clockInfo.user_id
          }
        });
      }
    }
  },
  mounted() {
    // this.createDom()
    this.showMobLink = true;
  }
};
</script>

<style lang="less" scoped>
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

.flexA {
  display: flex;
  justify-content: space-around;
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

.radius {
  border-top-left-radius: 3em;
  border-top-right-radius: 3em;
  border-bottom-left-radius: 3em;
  border-bottom-right-radius: 3em;
}

.noData {
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url("../../assets/clockInShare/Group.png");
  background-size: 0.78rem 0.82rem;
  width: 3.43rem;
  height: 3.43rem;
  margin: 0 auto;
}

.info-wrapper {
  border-radius: 0.15rem;
  overflow: hidden;
  border: 1px solid #454545;
}

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
      animation: myfirst 1s infinite;
    }
    @keyframes myfirst {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(1.3);
      }
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

.video-wrapper {
  position: relative;
  .video {
    display: block;
    width: 100%;
    min-height: 3.43rem;
    overflow: hidden;
    height: auto;
    margin: 0 auto;
    border-radius: 0.15rem;
  }
  .isShowTiger,
  .sport_id {
    .bgbase;
    position: absolute;
    top: 0.14rem;
    width: 0.28rem;
    height: 0.28rem;
    z-index: 10;
  }
  .isShowTiger {
    right: 0.17rem;
    background-image: url("../../assets/sportSe/logo.png");
  }
  .sport_id {
    right: 0.53rem;
  }
}

.sport {
  padding: 0.16rem;
  .item {
    .flexS;
    .bgb;
    .radius;
    margin-right: 0.12rem;
    margin-bottom: 0.12rem;
    .icon {
      .bgbase;
      width: 0.32rem;
      height: 0.32rem;
    }
    .num {
      margin-left: 0.04rem;
      font-size: 0.11rem;
      padding-right: 0.1rem;
    }
  }
  .bodyPart {
    .bgb;
    .radius;
    line-height: 0.32rem;
    padding: 0 0.1rem;
    display: inline-block;
    font-size: 0.11rem;
  }
}
</style>