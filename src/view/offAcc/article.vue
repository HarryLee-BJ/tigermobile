<template>
  <div class="article">
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
      <li class="item" v-for="item in articlesList" @click="toDetail(item)" :key="item.article_id">
        <img class="card" :src="item.cover + '?imageView2/5/w/700/h/300/q/50'" alt="">
        <div class="title">{{item.t}}</div>
        <div class="txt">{{item.d | dFilter}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { pageInit } from "../../mixins/pageInit";
import { InfiniteScroll } from "mint-ui";
import Vue from "vue";
Vue.use(InfiniteScroll);
export default {
  props: {
    trainersID: {
      require: true,
      type: String,
      default: ""
    },
    tabIndex: {
      default: 0,
      type: Number,
      require: true
    }
  },
  data() {
    return {
      articlesList: [],
      loading: true,
      pageIndex: 1,
      pageSize: 10
    };
  },
  watch: {
    tabIndex(now) {
      if (now === 1) {
        if (this.pageIndex === 1) {
          this.articles();
        } else {
          !this.loading && this.articles();
        }
      }
    }
  },
  mixins: [pageInit],
  methods: {
    loadMore() {
      if (this.tabIndex !== 1) {
        return;
      }
      this.loading = true;

      this.articles();
    },
    async articles() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + `/api/users/${this.trainersID}/articles`,
        params: {
          page: this.pageIndex,
          limit: this.pageSize
        }
      });
      try {
        const data = await this.isTrue(httpResponse);
        this.articlesFilter(data);
      } catch (error) {
        console.log("err:", error);
      }
    },
    articlesFilter(data) {
      this.articlesList = this.articlesList.concat(data);
      this.loading = !data.length;
      this.pageIndex++;
    },
    toDetail({ article_id }) {
      this.$router.push({
        path: "/off/article/" + article_id
      });
    }
  },
  filters: {
    dFilter(txt) {
      if (txt) {
        return txt.substr(0, 70) + " ......";
      } else {
        return "";
      }
    }
  }
};
</script>


<style lang="less" scoped>
.article {
  padding: 0.16rem;
  .item {
    .card {
      width: 91vw;
      height: 42vw;
      max-width: 7.5rem*0.91;
      max-height: 7.5rem*0.42;
      border-radius: 0.08rem;
      transition: all 0.3s;
      margin: 0 auto;
    }
    .title {
      padding-top: 0.16rem;
      font-size: 0.16rem;
      color: #ffffff;
      line-height: 0.22rem;
      margin-bottom: 0.02rem;
    }
    .txt {
      opacity: 0.64;
      font-size: 0.13rem;
      color: #ffffff;
      line-height: 0.18rem;
      margin-bottom: 0.16rem;
      text-align: justify;
    }
  }
  .item:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 0.16rem;
  }
  .item:active {
    .card {
      opacity: 0.64;
    }
  }
}
</style>
