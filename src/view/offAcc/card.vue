<template>
  <div>
    <div v-if="showNoView"></div>
    <div class="item-wrapper" v-if="showDataView">
      <ul class="items" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
        <li class="item" v-for="(item,index) in cardList" :key="item.clockin_id" @click="toDetail(item)">
          <i class="isShowTiger" v-if="item.isShowTiger === '1'"></i>
          <i class="sportType" :style=" 'background-image: url(' +  item.iconImg   +')'"></i>
          <img class="img" :src=" item.url + '?imageView2/5/w/400/h/400/q/50'" alt="">
          <div class="info">
            <div class="txt">
              <div class="title ellipsis" v-if="item.tag[0]">#{{item.tag[0].title}}</div>
              <div class="p" v-if="item.content">{{item.content}}</div>
            </div>
            <div class="bottom">
              <img class="avatar" :src="item.avatar + '?imageView2/5/w/150/h/150/q/10'" alt="">
              <div class="r" @click.stop="dolike(item,index)">
                <img class="like" key="like" src="../../assets/challenger/liked.png" alt="">
                <span class="num">{{item.likes}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
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
      default: "",
      type: String,
      require: true
    },
    tabIndex: {
      default: 0,
      type: Number,
      require: true
    }
  },
  data() {
    return {
      cardList: [],
      loading: true, // 若为真，则无限滚动不会被触发
      pageIndex: 1,
      pageSize: 10
    };
  },
  mixins: [pageInit],
  methods: {
    loadMore() {
      if (this.tabIndex !== 0) {
        return;
      }
      this.loading = true;

      this.clockins();
    },
    async clockins() {
      const httpResponse = await this.$http({
        method: "jsonp",
        url: this.$getApi + `/api/users/${this.trainersID}/clockins`,
        params: {
          page: this.pageIndex,
          limit: this.pageSize
        }
      });
      try {
        const data = await this.isTrue(httpResponse);
        this.clockinsFilter(data);
      } catch (error) {
        console.log("err:", error);
      }
    },
    clockinsFilter(data) {
      this.cardList = this.cardList.concat(data);
      this.loading = !data.length;
      this.pageIndex++;
    },
    toDetail({ clockin_id }) {
      this.$router.push({
        path: "/cS",
        query: {
          c: clockin_id,
          offac: "1"
        }
      });
    }
  },
  async mounted() {
    this.tabIndex === 0 && (await this.clockins());
    this.isAJAX = true;
  }
};
</script>

<style lang="less" scoped>
.user {
  padding: 0.12rem 0.08rem;
  background-color: rgba(0, 0, 0, 0.1);
  .header {
    font-size: 0.14rem;
    line-height: 0.2rem;
    margin-bottom: 0.12rem;
  }
}
.item-wrapper {
  padding: 0.16rem 0.08rem 0;
}
.items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
}
.item {
  .img {
    transition: all 0.3s;
  }
}
.item:active {
  .img {
    opacity: 0.64;
  }
}
.item {
  width: 1.75rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 0.04rem;
  overflow: hidden;
  margin-bottom: 0.08rem;
  position: relative;
  .img {
    width: 1.75rem;
    height: 1.75rem;
    display: block;
    margin-bottom: 0.08rem;
  }
  .info {
    padding: 0.08rem;
  }
}
.isShowTiger,
.sportType {
  position: absolute;
  width: 0.16rem;
  height: 0.16rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 10;
  top: 0.085rem;
}
.isShowTiger {
  background-image: url(../../assets/sportSe/logo.png);
  right: 0.085rem;
}
.sportType {
  right: 0.257rem;
}
.txt {
  .title {
    font-size: 13px;
    color: #3d9eee;
    line-height: 0.18rem;
    margin-bottom: 0.05rem;
  }
  .p {
    opacity: 0.64;
    font-size: 13px;
    color: #ffffff;
    line-height: 0.18rem;
    max-height: 0.38rem;
    overflow: hidden;
    margin-bottom: 0.16rem;
  }
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .avatar {
    width: 0.24rem;
    height: 0.24rem;
    object-fit: cover;
    display: block;
    border-radius: 50%;
  }
}
.r {
  display: flex;
  align-items: center;
  .like {
    width: 0.24rem;
    height: 0.24rem;
    display: block;
    margin-right: 0.05rem;
  }
  .num {
    font-size: 0.13rem;
  }
}
@media screen and (min-width: 380px) and (max-width: 420px) {
  .item {
    width: 1.95rem;
    .img {
      width: 1.95rem;
      height: 1.95rem;
    }
  }
  .bottom {
    .avatar {
      width: 0.264rem;
      height: 0.264rem;
    }
  }
}
</style>
