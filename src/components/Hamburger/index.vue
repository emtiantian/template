<template>
  <div @click="toggleClick" class="box-hamburger">
    <svg-icon class="hamburger main-color" icon-class="list1" :class="{ 'is-active': isActive }"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    toggleClick: {
      type: Function,
      default: null,
    },
  },
};
</script>

<style scoped>
.box-hamburger {
  width: 100%;
  cursor: pointer;
  text-align: center;
  background-color: #374151;
  padding-left: 6px;
}
.hamburger {
  width: 100%;
  display: inline-block;
  cursor: pointer;
  color: #eee;
  font-size: 24px;
  transform: rotate(0deg);
  transition: 0.38s;
  transform-origin: 50% 50%;
}

.hamburger.is-active {
  transform: rotate(90deg);
}
</style>
