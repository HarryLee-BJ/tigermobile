<template>
    <div class="clockinRankGroup">
        <clockinRankAll></clockinRankAll>
        <!-- <clockinRankAll v-if="rankType === 0"></clockinRankAll>
            <clockinRankMonth v-if="rankType === 1"></clockinRankMonth> -->
    </div>
</template>
<script>
import clockinRankAll from "./clockinRankAll.vue";
import clockinRankMonth from "./clockinRankMonth.vue";
export default {
  data() {
    return {
      rankType: parseInt(this.$route.query.t)
    };
  },
  components: {
    clockinRankAll,
    clockinRankMonth
  },
  mounted() {
    const arr = ["总榜", "省的月榜"]; // 0表示总榜   1表示省的月榜
    console.log("排行种类:", arr[parseInt(this.$route.query.t)]);
  }
};
</script>
