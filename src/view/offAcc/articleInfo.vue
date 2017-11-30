<template>
  <div id="thep">
    <div v-html="content"></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import errMsg from "@/unit/apiErr.js";
export default {
  data() {
    return {
      show: false,
      ID: this.$route.params.id,
      content: ""
    };
  },
  methods: {
    async articles() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + "/api/articles/" + this.ID
      });
      this.articlesFilter(httpResponse);
    },
    articlesFilter(httpResponse) {
      const { body: { success, data, message } } = httpResponse;
      if (success) {
        this.content = data.content;
      } else {
        Toast(errMsg(parseInt(message)));
      }
    }
  },
  mounted() {
    this.articles();
  }
};
</script>


<style lang="less" scoped>
#thep {
  width: 90vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  margin:0 auto;
}
</style>
<style lang="less">
#thep{
  font-size: 0.14rem;
  line-height: 1.5;
  img {
    max-width: 70vw;
    margin: 0.1rem auto;
  }
}
</style>
