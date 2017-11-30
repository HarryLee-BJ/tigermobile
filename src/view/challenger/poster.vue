<template>
  <!-- 邀请好友 -->
  <div>
    <div class="imgs-wrapper">
      <div class="imgs">
        <img class="title" src="http://coach-10061631.image.myqcloud.com/319a8ac3-ef06-40d9-8e54-d43f0cc5563b" alt="">
        <div class="body">
          <img class="part2" src="http://coach-10061631.image.myqcloud.com/71fb36fe-4698-426d-ae6d-dc31ec0b1b40" alt="">
          <img class="part3" src="http://coach-10061631.image.myqcloud.com/414c5061-9a2e-47f7-9aa2-ee77197fd19c" alt="">
        </div>
      </div>
    </div>
    <moblink :path="moblink.path" :mobid="moblink.mobid" :params="moblink.params" :showDefaultUI="moblink.showDefaultUI" :btnTxt="'帮助朋友'"></moblink>
  </div>
</template>

<script>
import errMsg from "../../unit/apiErr";
import moblink from "../../components/moblink.vue";
export default {
  data() {
    return {
      code: this.$route.query.code,
      userID_activityID: this.$route.query.u, // 和activityID合并到一起了  => activityID 没用到...
      moblink: {
        path: "",
        mobid: "",
        params: {},
        showDefaultUI: false
      },
      isValidUserAgent: false,
      userAgent: ""
    };
  },
  components: {
    moblink
  },
  computed: {
    activityID() {
      return this.userID_activityID.split("-a=")[1];
    },
    userID() {
      return this.userID_activityID.split("-a=")[0];
    }
  },
  methods: {
    async wechatCode() {
      // code+user_id 换分享成果
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + "/api/jsp/users/thirds/code",
        params: {
          code: this.$route.query.code,
          user_id: this.userID,
          platfrom: this.userAgent
        }
      });
      const { body: { success, message } } = httpResponse;
      if (!success) {
        console.log("wechat code err:" + errMsg(parseInt(message)));
      }
    },
    getUA() {
      const ua = navigator.userAgent;
      const browser = {
        Weibo: !!ua.match(/Weibo/),
        Weixin: !!ua.match(/MicroMessenger/)
      };

      const { Weibo, Weixin } = browser;

      if (Weibo || Weixin) {
        this.isValidUserAgent = true;
      } else {
        this.isValidUserAgent = false;
        return;
      }

      if (Weibo) {
        this.userAgent = "wb";
      } else if (Weixin) {
        this.userAgent = "wx";
      } else {
        this.userAgent = "other";
      }
    }
  },
  mounted() {
    document.title = "老虎运动";

    this.getUA();

    this.isValidUserAgent && this.wechatCode();
  }
};
</script>

<style lang="less" scoped>
@import url("../../style/challenger/imgs.less");
</style>

