<template>
    <div id="user_header">
        <div class="report-header-wrapper">
            <div class="filter-bg" :style="{backgroundImage: 'url(' + bgimg + ')'}">
    
            </div>
            <div class="header">
                <img class="avater" :src="pic" alt="">
                <div class="words">
                    <span class="date">{{time}}</span>
                    <span class="location">{{location}}</span>
                </div>
                <i class="icon" :class="courseIconClass" v-if="isIcon"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    time: {
      default: "",
      type: String
    },
    pic: {
      default: "",
      type: String
    },
    location: {
      default: "",
      type: String
    },
    bgimg: {
      // default: require("../assets/default_banner_2x.png"),
      default:
        "http://coach-10061631.image.myqcloud.com/2a028597-067e-4251-8252-4854621b60e0?imageView2/5",
      type: String
    },
    isIcon: {
      default: true,
      type: Boolean
    },
    // 计划 1
    // 报告 0
    courseState: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {};
  },
  computed: {
    courseIconClass() {
      const arr = ["coreseGreen", "coreseOrg"];
      return arr[this.courseState];
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../style/user_header.less");
</style>