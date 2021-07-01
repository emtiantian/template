<template>
  <el-tooltip :content="desc" v-if="desc">
    <svg-icon :icon-class='iconClass' :class-name='className||""' style="cursor:pointer" ></svg-icon>
  </el-tooltip>
  <svg-icon :icon-class='iconClass' :class-name='className||""' style="cursor:pointer" v-else></svg-icon>
</template>

<script>
export default {
  name: 'activeSvgIcon',
  props: ['desc', 'iconClass', 'className'],
};
</script>

<style scoped lang="scss">

</style>
