<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <keep-alive>
                <router-view v-if="$route.meta.keep"></router-view>
            </keep-alive>
        </transition>

        <transition name="fade" mode="out-in">
            <router-view v-if="!$route.meta.keep"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
  name: "app",
  methods: {},
  mounted() {
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("API:", this.$getApi);
  }
};
</script>

<style>

</style>