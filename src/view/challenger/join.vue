<template>
  <!-- 分享挑战 -->
  <div>
    <div class="imgs-wrapper">
      <div class="imgs">
        <img class="title" src="http://coach-10061631.image.myqcloud.com/f04b83cf-a8ce-4c72-8f3a-06e6e7d3b61d" alt="">
        <div class="body">
          <img class="part2" src="http://coach-10061631.image.myqcloud.com/9819e7e4-e754-496a-9bbe-fbecb388a1cf" alt="">
          <img class="part3" src="http://coach-10061631.image.myqcloud.com/a7d8de5c-3118-4343-aff2-21faa1a55b8c" alt="">
        </div>
      </div>
    </div>
    <moblink :path="moblink.path" :mobid="moblink.mobid" :params="moblink.params" :showDefaultUI="moblink.showDefaultUI" :btnTxt="'参加挑战'"></moblink>
  </div>
</template>

<script>
import moblink from "../../components/moblink.vue";

export default {
  data() {
    return {
      moblink: {
        path: "",
        mobid: "",
        params: {},
        showDefaultUI: false
      }
    };
  },
  components: {
    moblink
  },
  mounted() {
    document.title = "老虎运动";
  }
};
</script>


<style lang="less" scoped>
@import url("../../style/challenger/imgs.less");
</style>

