<template>
  <div class="home">
    <scroll :hoverStop="isScroll.hoverStop" :speed="isScroll.speed">
      <template v-slot:default="{ scrollKey }">
        <template v-for="item in data">
          <div class="tr" :key="item.code + scrollKey" @click="click(item)">
          </div>
        </template>
      </template>
    </scroll>
  </div>
</template>

<script>


export default {

};
</script>
<style lang="scss" scoped>

</style>
