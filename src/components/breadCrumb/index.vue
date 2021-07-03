<template>
  <el-breadcrumb class="app-breadcrumb" separator=">">
    <transition-group name="breadcrumb">
      <template v-for="(item, index) in levelList">
        <el-breadcrumb-item :key="item.path" v-if="item.meta.title">
          <span
            v-if="
              item.redirect === 'noredirect' || index == levelList.length - 1
            "
            class="no-redirect"
            >{{ item.meta.title }}</span
          >
          <router-link v-else :to="{ name: item.name }">{{
            item.meta.title
          }}</router-link>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: [],
      root: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    getBreadcrumb() {
      this.levelList = [];
      const { routes } = this.$router.options;
      for (let i = 0; i < routes.length; i += 1) {
        if (this.$route.meta.category) {
          if (
            routes[i].meta &&
            routes[i].meta.category === this.$route.meta.category
          ) {
            this.root = routes[i];
            break;
          }
        }
      }
      this.levelList.unshift(this.$route);
      if (this.root) {
        this.setLevelList(this.$route, this.root.children);
      }
    },
    setLevelList(route, children) {
      for (let i = 0; i < children.length; i += 1) {
        if (children[i] && route.meta.parent === children[i].name) {
          this.levelList.unshift(children[i]);
        }
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  position: relative;
  top: 4px;
  display: inline-block;
  font-size: 15px;
  margin-left: 40px;
  .no-redirect {
    color: #477fe3;
    cursor: text;
  }
}
</style>
