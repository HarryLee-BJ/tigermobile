<template>
    <div class="profile" v-if="isDoneLoading">
        <header>
            <div class="blur_cover" :style="{backgroundImage:backgroundImage}"></div>
            <!--个人资料只读页头像-->
            <div v-if="!isShowSaveButton" class="avatar" :style="{backgroundImage:avatar}" @click="isShowModel=true"></div>
            <!--个人资料编辑页头像-->
            <label v-if="isShowSaveButton">
                    <!--上传头像组件-->
                    <pic style="position: absolute" class="upload" :name="'asd1'" :imgStyle="'100px'" @imgDone="imgDone"></pic>
                    <div class="avatar" :style="{backgroundImage:avatar}">
                        <!--相机logo-->
                        <img class="camera" src="../assets/profile/camera_2x.png" style="width: 0.16rem;height: 0.13rem" />
                    </div>
                </label>
        </header>
        <!--个人资料只读页-->
        <div v-if="!isShowSaveButton" class="profile_body">
            <ul>
                <li>
                    <span>昵称</span>
                    <span class="profile_value">{{nickname?nickname:wx_nickname}}</span>
                </li>
                <li>
                    <span>性别</span>
                    <span class="profile_value">{{gender==1?gender_male:gender_female}}</span>
                </li>
                <li>
                    <span>年龄</span>
                    <span v-if="isShowAge" class="profile_value">
                            <input disabled v-model="bday"> &nbsp;&nbsp;{{age}}岁
                        </span>
                    <span class="profile_value">{{original_bday === '0000-00-00'?'未填写':''}}</span>
                </li>
                <li>
                    <span>电话</span>
                    <span class="profile_value">{{tel?tel:'未填写'}}</span>
                </li>
                <div class="hr_gray"></div>
                <li>
                    <span>身高</span>
                    <span class="profile_value">{{body_height===0?'未填写':body_height}}
                            <span v-if="isShowUnit" class="body_height_unit">cm</span>
                    </span>
                </li>
                <li>
                    <span>体重</span>
                    <span class="profile_value">{{body_weight===0?'未填写':body_weight}}
                            <span v-if="isShowUnit" class="body_weight_unit">kg</span>
                    </span>
                </li>
            </ul>
        </div>
        <div v-if="!isShowSaveButton&&!isShowModel" class="button" @click="edit">
            <span>编辑</span>
        </div>
        <!--个人资料编辑页-->
        <div v-if="isShowSaveButton" class="profile_body">
            <ul>
                <li>
                    <span>昵称</span>
                    <input id="nickname" class="profile_value" type="text" v-model="nickname" placeholder="请输入昵称">
                </li>
                <li>
                    <span>性别</span>
                    <span class="profile_value">
                            <span @click="female">
                                <span class="gender">{{gender_female}}</span>
                    <img class="gender_selector" :src="selector_female" style="width: 0.16rem; height: 0.16rem" />
                    </span>
                    <span @click="male">
                                <span class="gender">{{gender_male}}</span>
                    <img class="gender_selector" :src="selector_male" style="width: 0.16rem; height: 0.16rem" />
                    </span>
                    </span>
                </li>
                <li>
                    <span>生日</span>
                    <input class="profile_value bday" type="date" v-model="bday" placeholder="请选择生日">
                </li>
                <li>
                    <span>电话</span>
                    <input id="tel" class="profile_value" type="tel" v-model="tel" placeholder="请输入手机号码">
                </li>
                <div class="hr_gray"></div>
                <li>
                    <span>身高</span>
                    <span class="profile_value">
                            <input id="height" class="body_height" type="number" pattern="[0-9]*" v-model="body_height" placeholder="请输入身高">
                            <span v-if="isShowUnit" class="body_height_unit">cm</span>
                    </span>
                </li>
                <li>
                    <span>体重</span>
                    <span class="profile_value">
                            <input id="weight" class="body_weight" type="number" pattern="[0-9]*" v-model="body_weight" placeholder="请输入体重">
                            <span v-if="isShowUnit" class="body_weight_unit">kg</span>
                    </span>
                </li>
            </ul>
        </div>
        <div v-if="isShowSaveButton" class="button" @click="save">
            <span>保存</span>
        </div>
        <!--头像模态框-->
        <transition name="fade" mode="out-in">
            <div v-if="isShowModel" class="model" :style="{backgroundImage:avatar}" @click="isShowModel=false"></div>
        </transition>
    </div>
</template>

<script>
import "../unit/jquery-3.1.1.min";
import pic from "../components/upload/pic.vue";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
//    引入正则表达式
import {
  checkName,
  checkPhone,
  checkHeight,
  checkWeight
} from "../unit/validate";
export default {
  created() {
    //            赋予页面Title
    document.title = "个人信息";
    this.$http({
      url: this.$getApi + "/api/user/chat/getCustomerInfo",
      method: "jsonp",
      params: {
        code: this.$route.query.code
      },
      before() {
        Indicator.open({
          spinnerType: "fading-circle"
        });
      }
    }).then(res => {
      console.log(res.body);
      if (res.body.success && res.body.data.user_id) {
        //接口请求成功
        Indicator.close();
        this.isDoneLoading = true;
        this.user_id = res.body.data.user_id;
        //                    向后台传值用头像地址
        this.avatar_param = res.body.data.avatar;
        //                    展示用头像地址
        this.avatar = res.body.data.avatar
          ? "url(" +
            res.body.data.avatar +
            "?imageMogr2/auto-orient/quality/50)"
          : "url(" + res.body.data.wx_avatar + ")";
        //                    展示用背景图
        this.backgroundImage = res.body.data.avatar
          ? "url(" +
            res.body.data.avatar +
            "?imageMogr2/auto-orient/quality/50)"
          : "url(" + res.body.data.wx_avatar + ")";
        //                    昵称规则
        this.wx_nickname = res.body.data.wx_nickname;
        this.nickname = res.body.data.nickname;
        if (this.nickname) {
          console.log("成功获取昵称，nickname:" + this.nickname + "。并用昵称渲染");
        } else {
          console.log(
            "昵称nickname" +
              this.nickname +
              "获取失败，用微信昵称" +
              this.wx_nickname +
              "渲染"
          );
        }
        if (res.body.data.gender === 1) {
          this.gender = 1;
          this.selector_male = require("../assets/profile/selector_blue_2x.png");
          this.selector_female = require("../assets/profile/selector_gray_2x.png");
        } else {
          this.gender = 0;
          this.selector_male = require("../assets/profile/selector_gray_2x.png");
          this.selector_female = require("../assets/profile/selector_blue_2x.png");
        }
        this.bday =
          res.body.data.bday === "0000-00-00"
            ? "1990-01-01"
            : res.body.data.bday;
        this.tel = res.body.data.tel;
        this.body_height =
          res.body.data.height === 0 ? 0 : res.body.data.height;
        this.body_weight =
          res.body.data.weight === 0 ? 0 : res.body.data.weight;
        //                    判断是否在资料只读页展示身高、体重单位
        if (res.body.data.height === 0 && res.body.data.weight === 0) {
          this.isShowUnit = false;
        }
        //                    计算年龄
        let birthday = new Date();
        let today = new Date();
        birthday.setFullYear(this.bday.split("-")[0]);
        birthday.setMonth(this.bday.split("-")[1] - 1);
        birthday.setDate(this.bday.split("-")[2]);
        birthday.setHours(0);
        birthday.setMinutes(0);
        birthday.setSeconds(0);
        this.age = parseInt(
          (today.getTime() - birthday.getTime()) / 31536000000
        );
        //                    接口获得的原始数据
        //                    this.original_avatar = res.body.data.avatar?'url('+res.body.data.avatar+')':"url('http://coach-10061631.image.myqcloud.com/e2f8c2e9-eb93-4456-89b0-2741253ea1e2')";
        //                    this.original_nickname = res.body.data.nickname;
        //                    if(res.body.data.gender===1){
        //                        this.original_selector_male = require('../assets/profile/selector_blue_2x.png');
        //                    }else {
        //                        this.original_selector_male = require('../assets/profile/selector_gray_2x.png');
        //                    }
        this.original_bday = res.body.data.bday;
        if (this.original_bday === "0000-00-00") {
          this.isShowAge = false;
        }
        //                    this.original_tel = res.body.data.tel;
        //                    this.original_body_height = res.body.data.height===0?0:res.body.data.height;
        //                    this.original_body_weight = res.body.data.weight===0?0:res.body.data.weight;
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
            message: res.body.message
              ? "发生错误 message:" + res.body.message
              : "发生错误",
            position: "bottom"
          });
          Indicator.close();
        }
      }
    });
  },
  updated() {
    //            console.log('---updated---');
    //            console.log('this.avatar:',this.avatar);
    //            console.log('this.nickname:',this.nickname);
    //            console.log('this.gender:',this.gender);
    //            console.log('this.bday:',this.bday);
    //            console.log('this.tel:',this.tel);
    //            console.log('this.body_height:',this.body_height);
    //            console.log('this.body_weight:',this.body_weight);
    //            console.log('---end---');
  },
  data() {
    return {
      isDoneLoading: false,
      gender_male: "男",
      gender_female: "女",
      user_id: "",
      //                展示用&修改后数据
      avatar_param: "",
      avatar: "",
      backgroundImage: "",
      //                昵称
      wx_nickname: "",
      nickname: "",
      selector_male: "",
      selector_female: "",
      gender: "",
      bday: "",
      age: "",
      tel: "",
      body_height: "",
      body_weight: "",
      isShowAge: true,
      isShowUnit: true,
      //                原始数据
      //                original_avatar:'',
      //                original_nickname:'',
      //                original_selector_male:'',
      original_bday: "",
      //                original_tel:'',
      //                original_body_height:'',
      //                original_body_weight:'',
      isShowSaveButton: false,
      isShowModel: false
    };
  },
  methods: {
    //            上传头像
    imgDone(res) {
      console.log(res.data.data.download_url);
      this.avatar =
        "url(" +
        res.data.data.download_url +
        "?imageMogr2/auto-orient/quality/50)";
      this.backgroundImage =
        "url(" +
        res.data.data.download_url +
        "?imageMogr2/auto-orient/quality/50)";
      this.avatar_param = res.data.data.download_url;
      this.$http({
        url: this.$getApi + "/api/user/chat/modCustomerInfo",
        method: "jsonp",
        params: {
          user_id: this.user_id,
          avatar: this.avatar_param,
          nickname: this.nickname,
          gender: this.gender,
          bday: this.bday,
          tel: this.tel,
          height: this.body_height,
          weight: this.body_weight
        }
      });
    },
    //            编辑
    edit() {
      this.isShowSaveButton = true;
      //                如果不存在昵称，则在点击编辑时将微信昵称赋给昵称；编辑页依旧用昵称渲染
      if (!this.nickname) {
        this.nickname = this.wx_nickname;
      }
      //                如果接口传来身高体重为0 0，那么点击编辑时将身高体重制空，展示placeholder
      if (this.body_height === 0 && this.body_weight === 0) {
        this.body_height = "";
        this.body_weight = "";
      }
    },
    //            保存
    save() {
      if (!checkName($("#nickname"))) {
        Toast({
          message: "请输入7个汉字或14个字符以内的昵称",
          position: "bottom"
        });
      } else if (!checkPhone($("#tel"))) {
        Toast({
          message: "请输入正确的手机号码",
          position: "bottom"
        });
      } else if (!checkHeight($("#height"))) {
        Toast({
          message: "请输入正确的身高",
          position: "bottom"
        });
      } else if (!checkWeight($("#weight"))) {
        Toast({
          message: "请输入正确的体重",
          position: "bottom"
        });
      } else {
        this.$http({
          url: this.$getApi + "/api/user/chat/modCustomerInfo",
          method: "jsonp",
          params: {
            user_id: this.user_id,
            avatar: this.avatar_param,
            nickname: this.nickname,
            gender: this.gender,
            //                        如果点击清除则传回初始生日
            bday: this.bday === "" ? this.original_bday : this.bday,
            tel: this.tel,
            height: this.body_height,
            weight: this.body_weight
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
            this.bday = res.body.data.user.bday;
            this.original_bday = res.body.data.user.bday;
            if (this.bday !== "0000-00-00") {
              this.isShowAge = true;
            }
            //                        重新计算年龄
            let birthday = new Date();
            let today = new Date();
            birthday.setFullYear(this.bday.split("-")[0]);
            birthday.setMonth(this.bday.split("-")[1] - 1);
            birthday.setDate(this.bday.split("-")[2]);
            birthday.setHours(0);
            birthday.setMinutes(0);
            birthday.setSeconds(0);
            this.age = parseInt(
              (today.getTime() - birthday.getTime()) / 31536000000
            );
            Indicator.close();
            Toast({
              message: "修改成功",
              iconClass: "fa fa-check fa-lg"
            });
            this.isShowSaveButton = false;
          } else {
            Toast({
              message:
                res.body.message === "3"
                  ? "昵称重复"
                  : "发生错误 message:" + res.body.message,
              position: "bottom"
            });
            Indicator.close();
          }
        });
      }
    },
    male() {
      this.selector_male = require("../assets/profile/selector_blue_2x.png");
      this.selector_female = require("../assets/profile/selector_gray_2x.png");
      this.gender = 1;
    },
    female() {
      this.selector_male = require("../assets/profile/selector_gray_2x.png");
      this.selector_female = require("../assets/profile/selector_blue_2x.png");
      this.gender = 0;
    }
  },
  //        watch:{
  //            上传头像直接触发接口，不再监听avatar
  //            avatar(newV,oldV){
  //                if (newV!==this.original_avatar){
  //                    $('.save').slideDown('slow');
  //                }
  //            },
  //            nickname(newV,oldV){
  //                if (newV!==this.original_nickname){
  //                    $('.save').slideDown('slow');
  //                }
  //            },
  //            selector_male(newV,oldV){
  //                if (newV!==this.original_selector_male){
  //                    $('.save').slideDown('slow');
  //                }
  //            },
  //            bday(newV,oldV){
  //                if (newV!==this.original_bday){
  //                    $('.save').slideDown('slow');
  //                }
  //            },
  //            tel(newV,oldV){
  //                if (newV!==this.original_tel){
  //                    $('.save').slideDown('slow');
  //                }
  //            },
  //            body_height(newV,oldV){
  //                if (newV!==this.original_body_height){
  //                    $('.save').slideDown('slow');
  //                }
  //            },
  //            body_weight(newV,oldV){
  //                if (newV!==this.original_body_weight){
  //                    $('.save').slideDown('slow');
  //                }
  //            },
  //        },
  components: {
    pic
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.profile {
  width: 3.75rem;
  margin: 0 auto;
}
header {
  width: 3.75rem;
  height: 1.92rem;
  margin: 0 auto;
  background-color: black;
  overflow: hidden;
  position: relative;
  z-index: 2;
  /*box-shadow: 0rem 0rem 0.04rem #888888;*/
}
.blur_cover {
  width: 3.85rem;
  height: 2.02rem;
  margin: -0.05rem -0.05rem;
  position: absolute;
  z-index: 1;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(5px);
  opacity: 0.8;
}
.avatar {
  width: 0.72rem;
  height: 0.72rem;
  margin: 0.6rem 1.52rem;
  border: white 0.01rem solid;
  border-radius: 0.36rem;
  position: absolute;
  z-index: 2;
  overflow: hidden;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
.camera {
  position: absolute;
  margin-top: 0.55rem;
  margin-left: 0.28rem;
}
.profile_body {
  width: 3.43rem;
  height: 3.21rem;
  border: 0.01rem solid rgba(255, 255, 255, 0.1);
  border-radius: 0.08rem;
  margin: 0.16rem auto 0.74rem auto;
  font-size: 0.14rem;
  text-align: left;
}
.profile_body ul {
  margin-top: 0.08rem;
}
.profile_body ul li {
  height: 0.48rem;
  padding-left: 0.16rem;
  padding-right: 0.16rem;
  line-height: 0.48rem;
  /*border: 0.01rem solid red;*/
}
.profile_body ul li input {
  line-height: 0.48rem;
  text-align: right;
}
.bday {
  margin-right: -0.18rem;
}
.profile_value {
  float: right;
  /*font-weight: bold;*/
}
.gender {
  margin-left: 0.08rem;
  float: right;
}
.gender_selector {
  margin-top: 0.16rem;
  margin-left: 0.32rem;
  float: right;
}
.hr_gray {
  width: 3.27rem;
  height: 0.01rem;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0.08rem auto;
}
.button {
  width: 3.75rem;
  height: 0.48rem;
  font-size: 0.14rem;
  text-align: center;
  line-height: 0.48rem;
  background-color: rgba(0, 0, 0, 0.24);
  position: fixed;
  bottom: 0;
  /*display: none;*/
}
.model {
  width: 100%;
  height: 100vh;
  background-color: black;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  z-index: 999;
}
</style>