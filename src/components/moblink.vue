<template>
    <div class="share">
        <div class="logo">
            <img class="img" src="../assets/favicon.png" alt="">
            <div class="txt">
                <div>老虎运动</div>
                <div>--{{subtitle}}</div>
            </div>
        </div>
        <!--<div class="open" id="moblink-href">-->
        <!-- :moblink-featured  跳两次 -->
         <div class="open" id="moblink-href" :moblink-featured="moblinkFeatured">
            {{btnTxt}}
         </div>
    </div>
</template>

<script>
export default {
  /**
     * path 路径
     * mobid route.query.mobid
     * params app查询参数
     * showDefaultUI false 使用自定义UI
     * showDefaultUI true 使用默认UI
     * btnTxt false 按钮文字
     */
  // props: ["path", "mobid", "params", "showDefaultUI", "btnTxt"],
  props: {
    path: {
      type: String,
      require: false,
      default: ""
    },
    mobid: {
      type: String,
      require: false,
      default: ""
    },
    params: {
      type: Object,
      require: false,
      default() {
        return {};
      }
    },
    showDefaultUI: {
      type: Boolean,
      require: false,
      default: false
    },
    btnTxt: {
      type: String,
      require: false,
      default: "打开APP"
    },
    subtitle: {
      type: String,
      require: false,
      default: "都是身材照"
    }
  },
  computed: {
    moblinkFeatured() {
      let appPath = `${this.path}?mobid=${this.mobid}`;

      for (const key in this.params) {
        appPath = appPath + `&${key}=${this.params[key]}`;
      }

      return appPath;
    }
  },
  methods: {
    createDom() {
      const script = document.createElement("script");

      script.setAttribute("id", "-moblink-js");
      script.setAttribute(
        "src",
        "https://f.moblink.mob.com/moblink.js?appkey=1db1063fdc256"
      );

      const body = document.querySelector("body");

      body.appendChild(script);

      script.onload = function() {
        MobLink.init({
          // debug: true,
          path: this.path,
          mobid: this.mobid,
          params: this.params,
          showDefaultUI: this.showDefaultUI
        });
      }.bind(this);
    }
  },
  mounted() {
    const hasScript = document.querySelector("#-moblink-js");
    !hasScript && this.createDom(); // 防止重复插入
  },
  beforeDestroy() {
    const body = document.querySelector("body");
    const dom = document.querySelector("#-moblink-js");

    body.removeChild(dom);
  }
};
</script>
<style lang="less" scoped>
.bgb {
  background-color: rgba(0, 0, 0, 0.5);
}

.share {
  z-index: 999;
  left: 0;
  bottom: 0;

  .bgb;
  padding: 0.08rem 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  width: 100%;
  box-sizing: border-box;

  .logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    .img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.08rem;
      border-radius: 0.05rem;
    }
    .txt {
      line-height: 0.18rem;
      margin-top: 0.05rem;
      text-align: start;
      flex: 1;
      div:nth-child(1) {
        font-size: 0.16rem;
      }
      div:nth-child(2) {
        padding-left: 0.18rem;
        margin-right: -0.1rem;
        font-size: 0.1rem;
        opacity: 0.8;
      }
    }
  }

  .open {
    background-color: rgb(254, 222, 30);
    border-color: rgb(254, 222, 30);
    color: rgb(73, 70, 70);
    padding: 0.08rem 0.16rem;
    color: rgb(73, 70, 70);
    font-size: 0.13rem;
    text-decoration: none;
    border-radius: 0.04rem;
  }

  .open:active {
    opacity: 0.8;
  }
}

.moblink-featured-href {
  line-height: 0.3rem;
  height: 0.3rem;
}
</style>
