<template>
  <div>
    <section class="pro">
      <div class="info">
        <section class="header">
          <img class="avatar" :src="showAvatar + '?imageView2/5/w/200/h/200/q/10'" alt="">
          <div class="score">{{userInfo.scores}}</div>
          <canvas class="canvas" id="canvas" width="220" height="220"></canvas>
        </section>
        <section class="card">
          <div class="nameline">
            <span class="name">{{showName}}</span>
            <span class="icon"></span>
          </div>
          <div class="addline">
            <span class="city">{{userInfo.local}}</span>
            <!-- <span class="block">朝阳区</span> -->
            <span class="gym">{{userInfo.gym_name}}</span>
            <span class="length" v-if="showDist">{{showDist}}km</span>
          </div>
        </section>
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
      <div class="mask" :style="'background-image: url(' + showAvatar + '?imageView2/5/w/100/h/100/q/10);'"></div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      attentions: "",
      avatar: "",
      background: "",
      bday: "",
      calorie_consume: "",
      dist: "",
      distance: "",
      fans: "",
      gender: "",
      gym_name: "",
      heft: "",
      isPro: "",
      likes: "",
      local: "",
      nickname: "",
      offac: "",
      scores: "",
      tel: "",
      user_id: "",
      wx_avatar: "",
      wx_nickname: ""
    }
  },
  computed: {
    showDist() {
      return this.userInfo.dist ? this.userInfo.dist / 1000 : "";
    },
    showAvatar() {
      return this.userInfo.avatar || this.userInfo.wx_avatar;
    },
    showName() {
      return this.userInfo.nickname || this.userInfo.wx_nickname;
    }
  },
  watch: {
    "userInfo.scores"(now) {
      if (now) {
        this.canvas(now * 10);
      }
    }
  },
  methods: {
    canvas(percent) {
      console.log(percent);
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      const circleX = canvas.width / 2; // 中心x坐标
      const circleY = canvas.height / 2; // 中心y坐标
      const radius = 100; // 圆环半径
      const lineWidth = 10; // 圆形线条的宽度
      // 画圆
      function circle(cx, cy, r) {
        ctx.beginPath();
        ctx.moveTo(cx + r, cy);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "rgba(141,77,232,0.24)";
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
      }
      // 画弧线
      function sector(cx, cy, r, startAngle, endAngle, anti) {
        ctx.beginPath();
        ctx.moveTo(cx, cy + r); // 从圆形底部开始画
        ctx.lineWidth = lineWidth;
        // 渐变色 - 可自定义
        const linGrad = ctx.createLinearGradient(
          circleX,
          circleY - radius - lineWidth,
          circleX,
          circleY + radius + lineWidth
        );
        linGrad.addColorStop(0.0, "#ff2366");
        linGrad.addColorStop(0.5, "#8d4de8");
        linGrad.addColorStop(1.0, "#e52d84");
        ctx.strokeStyle = linGrad;
        // 圆弧两端的样式
        ctx.lineCap = "round";
        // 圆弧
        ctx.arc(
          cx,
          cy,
          r,
          startAngle * (Math.PI / 180.0) + Math.PI / 2,
          endAngle * (Math.PI / 180.0) + Math.PI / 2,
          anti
        );
        ctx.stroke();
      }
      // 刷新
      function loading() {
        if (process >= percent) {
          clearInterval(circleLoading);
        }
        // 清除canvas内容
        ctx.clearRect(0, 0, circleX * 2, circleY * 2);
        // 圆形
        circle(circleX, circleY, radius);
        // 圆弧
        sector(circleX, circleY, radius, 0, process / 100 * 360);
        // 控制结束时动画的速度
        if (process / percent > 0.9) {
          process += 0.3;
        } else if (process / percent > 0.8) {
          process += 0.55;
        } else if (process / percent > 0.7) {
          process += 0.75;
        } else {
          process += 1.0;
        }
      }
      let process = 0.0; // 进度
      const circleLoading = window.setInterval(function() {
        loading();
      }, 20);
    }
  }
};
</script>


<style lang="less" scoped>
.basebg {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.pro {
  position: relative;
  padding: 1.08rem 0.16rem 0;
}
.mask {
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  .basebg;
  opacity: 0.64;
  margin-bottom: 0.8rem;
}
.info {
  position: relative;
  z-index: 2;
  background-image: linear-gradient(-270deg, #414bff 2%, #ab5bff 97%);
  border-radius: 4px;
  .header {
    position: absolute;
    left: 50%;
    top: -0.45rem;
    transform: translateX(-50%);
    .avatar {
      object-fit: cover;
      width: 0.9rem;
      height: 0.9rem;
      border-radius: 50%;
    }
    .score {
      width: 0.28rem;
      height: 0.28rem;
      margin: 0 auto;
      transform: translateY(-0.1rem);
      background-image: linear-gradient(-213deg, #8d4de8 9%, #ff2366 95%);
      border-radius: 50%;
      font-size: 14px;
      color: #ffffff;
      line-height: 0.28rem;
      text-align: center;
      z-index: 2;
      position: relative;
      font-weight: 800;
    }
  }
  .card {
    padding: 0.7rem 0.16rem 0;
    .nameline {
      text-align: center;
      font-size: 0.18rem;
      color: #ffffff;
      margin-bottom: 0.07rem;
      .icon {
        display: inline-block;
        width: 0.24rem;
        height: 0.12rem;
        .basebg;
        background-image: url("http://coach-10061631.image.myqcloud.com/1060e00b-5f5f-4174-9cd9-cc9c4bc22e08");
      }
    }
    .addline {
      text-align: center;
      font-size: 0.13rem;
      color: rgba(255, 255, 2525, 0.64);
      line-height: 0.16rem;
      padding-bottom: 0.2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      span {
        padding: 0 0.04rem;
      }
      .gym {
        border-left: 2px solid rgba(255, 255, 2525, 0.64);
      }
    }
  }
  .fans {
    display: flex;
    justify-content: space-between;
    padding: 0.1rem 0.24rem 0.09rem;
    text-align: center;
    .txt {
      opacity: 0.56;
      font-size: 0.14rem;
      color: #ffffff;
    }
    .num {
      font-size: 0.2rem;
      color: #ffffff;
      line-height: 0.28rem;
    }
  }
}
.canvas {
  width: 1.1rem;
  height: 1.1rem;
  position: absolute;
  z-index: 1;
  left: 50%;
  top: -0.1rem;
  transform: translateX(-50%);
}
</style>
