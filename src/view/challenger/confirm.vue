<template>
  <div class="model-wrapper">
    <div class="model">
      <img :src="icon" alt="" class="reward">
      <div class="cont">
        <div class="title">
          <span>恭喜你获得</span>
          <span>{{t}}</span>
        </div>
        <div class="notes">
          <div>请正确填写您的邮寄信息 </div> 
          <div>我们会在1-3个工作日内发出奖品</div> 
        </div>
        <ul class="info">
          <li class="ipt-wrapper">
            <input type="text" class="ipt" placeholder="请输入收件人姓名" v-model="realname">
          </li>
          <li class="ipt-wrapper">
            <input type="text" class="ipt" placeholder="请输入收件人手机号" v-model="mobile">
          </li>
          <li class="ipt-wrapper">
            <textarea class="textarea" name="" id="" cols="30" rows="4" placeholder="请输入邮寄地址" v-model="adr"></textarea>
          </li>
        </ul>
      </div>

      <div class="bonus" @click.self="bonus">
        兑奖
      </div>
    </div>
    <div class="mask">
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

import errMsg from "../../unit/apiErr";

export default {
  props: ["t", "icon", "user_id", "activity_id", "prize_id"],
  data() {
    return {
      realname: "", //	是	string	姓名
      mobile: "", //	是	string	电话
      adr: "" //	是	string	地址
    };
  },
  methods: {
    bonus() {
      this.infoVerify();
    },
    infoVerify() {
      if (!this.realname) {
        Toast("姓名未填！");
        return;
      }

      if (!this.mobile) {
        Toast("手机号未填！");
        return;
      }

      if (!/^1[0-9]{10}$/.test(+this.mobile)) {
        Toast("请输入正确的手机号码！");
        return;
      }

      if (!this.adr) {
        Toast("邮寄地址未填！");
        return;
      }

      this.activitysPrizes();
      this.$emit("positive", "positive");
    },
    async activitysPrizes() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + `/api/jsp/users/activitys/prizes`,
        params: {
          user_id: this.user_id, //	是	string	用户的ID
          activity_id: this.activity_id, //	是	string	活动的ID
          prize_id: this.prize_id, //	是	string	礼品的ID
          realname: this.realname, //	是	string	姓名
          mobile: this.mobile, //	是	string	电话
          adr: this.adr //	是	string	地址
        }
      });
      this.activitysPrizesFilter(httpResponse);
    },
    activitysPrizesFilter(httpResponse) {
      const { body: { success, message } } = httpResponse;
      if (success) {
        Toast("提交成功!");
      } else {
        Toast("提交失败!");
        console.log(errMsg(parseInt(message)));
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../style/challenger/confirm.less");
</style>

