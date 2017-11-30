<template>
  <section class="header" ref="header">
    <div class="mask" :style="'background-image: url(' +showAvatar + '?imageView2/q/20' +')'"></div>
    <div class="user">
      <img class="avatar" :src="showAvatar + '?imageView2/q/20'" alt="">
      <div class="name">
        <span>{{showName}}</span>
        <i>{{userInfo.gender === 1? '♂' : '♀'}}</i>
      </div>
      <ul class="fans">
        <li>
          <div class="txt">关注</div>
          <div class="num">{{userInfo.attentions}}</div>
        </li>
        <li>
          <div class="txt">粉丝</div>
          <div class="num">{{userInfo.fans}}</div>
        </li>
        <li>
          <div class="txt">被赞</div>
          <div class="num">{{userInfo.likes}}</div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    userInfo: {
      avatar: "",
      nickname: "",
      gender: "",
      attentions: "",
      fans: "",
      likes: ""
    }
  },
  computed: {
    showAvatar() {
      return this.userInfo.avatar || this.userInfo.wx_avatar;
    },
    showName() {
      return this.userInfo.nickname || this.userInfo.wx_nickname;
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  padding-top: 0.64rem;
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.24);
    background-size: cover;
    background-position: center center;
    opacity: 0.24;
  }
  .user {
    z-index: 2;
    position: relative;
    .avatar {
      box-sizing: border-box;
      width: 0.8rem;
      height: 0.8rem;
      margin: 0 auto 0.16rem;
      border: 0.02rem solid #ffffff;
      border-radius: 50%;
      object-fit: cover;
    }
    .name {
      margin: 0 0.24rem;
      padding-bottom: 0.04rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.18rem;
      border-bottom: rgba(255, 255, 255, 0.1) solid 0.02rem;
      span {
        color: #fff;
      }
      i {
        margin-left: 0.07rem;
        padding: 0.04rem;
        border: 1px dotted #fff;
        text-align: center;
        border-radius: 0.08rem;
      }
    }
    .fans {
      display: flex;
      justify-content: space-around;
      text-align: center;
      padding: 0.1rem 0;
      .txt {
        font-size: 0.14rem;
        opacity: 0.56;
        line-height: 0.2rem;
      }
      .num {
        font-size: 0.2rem;
        line-height: 0.28rem;
      }
    }
  }
}
</style>
