<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :collapse="!isCollapse"
      background-color="#374151"
      text-color="#fff"
      active-text-color="#fff"
      :default-active="defaultActiveRoute"
    >
      <hamburger
        class="hamburger-container"
        :toggleClick="toggleSideBar"
        :isActive="sidebar.opened"
      ></hamburger>

      <sidebar-item :routes="routers"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger/index.vue";
import { routes } from "@/router/index";
import SidebarItem from "./SidebarItem.vue";

export default {
  data() {
    return {
      defaultActiveRoute: "homePage",
      routers: routes,
    };
  },

  components: { SidebarItem, Hamburger },

  mounted() {
    this.judgeActiveRoute(this.$route.path);
  },

  computed: {
    ...mapGetters(["sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
  },

  watch: {
    "$route.name": function (val) {
      this.judgeActiveRoute(val);
    },
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },

    judgeActiveRoute(name) {
      const originRoute = this.routers;
      for (const ii in originRoute) {
        if (originRoute[ii].name && originRoute[ii].name.indexOf(name) > -1) {
          this.defaultActiveRoute = originRoute[ii].name;
          return;
        }
        if (originRoute[ii].children) {
          for (let i = 0; i < originRoute[ii].children.length; i += 1) {
            let childrenRoute = originRoute[ii].children[i];
            if (childrenRoute.name && name.indexOf(childrenRoute.name) > -1) {
              this.defaultActiveRoute = childrenRoute.name;
              return;
            }
          }
        }
      }
    },
  },
};
</script>
