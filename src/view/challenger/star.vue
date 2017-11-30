<template>
  <div class="star">
    <div class="header">挑战明星</div>
    <div class="body">
      <div class="mask"></div>
      <div class="cont">
        <video class="video" controls="controls" :poster="star.avatar + '?imageView2/5/w/500/h/500/q/50'" :style="'width:calc(50vw - .08rem);height:calc(50vw - .08rem);'  " :src="star.video"></video>
        <div class="info" :style="'width:calc(50vw - .08rem);height:calc(50vw - .08rem);'  ">
          <img class="avatar" :src="star.avatar + '?imageView2/5/w/200/h/200/q/50'" alt="" @click="toIndex(star)">
          <div class="username">{{star.name}} <span class="pro"></span> </div>
          <div class="item-wrapper">
            <!-- <ul class="items" :style="'width:'+ .7*skills.length  +'rem'"> -->
            <ul class="items" :style="'width:'+ width/100  +'rem;'">
              <li class="item _width" v-for="item in skills" :key="item">
                {{item}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    star: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      info: {},
      width: 175
    };
  },
  computed: {
    skills() {
      if (this.star.skill) {
        return this.star.skill.split(" ");
      } else {
        return [];
      }
    }
  },
  methods: {
    toIndex({ user_id }) {
      if (!user_id) {
        return;
      }
      this.$router.push({
        path: "/userInfoShare",
        query: {
          u: user_id
        }
      });
    },
    getWidth() {
      const items = document.querySelectorAll("._width");
      let width = 0;
      [...items].map(item => {
        width += item.getBoundingClientRect().width + 8;
      });
      this.width = width;
    }
  },
  mounted() {
    setTimeout(this.getWidth, 300);
  }
};
</script>


<style lang="less" scoped>
@import url("../../style/challenger/star.less");
</style>
