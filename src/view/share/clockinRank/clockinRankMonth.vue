<template>
    <div class="clockinRankMonth">
        月榜
        <moblink :path="moblink.path" :mobid="moblink.mobid" :params="moblink.params" :showDefaultUI="moblink.showDefaultUI"></moblink>
    </div>
</template>
<script>
import moblink from "../../../components/moblink.vue";

export default {
  data() {
    return {
      moblink: {
        path: "tigerfit/ranking",
        mobid: this.$route.query.m,
        params: {
          // u: this.$route.query.u,
          ...this.$route.query
        },
        showDefaultUI: false
      }
    };
  },
  components: {
    moblink
  }
};
</script>
