<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive> -->
      <router-view :key="key"> </router-view>
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
.app-main {
  padding: 16px;
  height: 100%;
  background-color: #f0f2f5;
  overflow: auto;
  color: $fontcolor;
}
</style>
