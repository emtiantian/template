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
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

      <sidebar-item :routes="routers"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import Hamburger from '@/components/Hamburger/index.vue';
import { routes } from '@/router/index';
import SidebarItem from './SidebarItem.vue';

export default {
  data() {
    return {
      defaultActiveRoute: '',
      routers: routes,
    };
  },

  components: { SidebarItem, Hamburger },

  mounted() {
    this.judgeActiveRoute(this.$route.name);
  },

  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened;
    },
  },

  watch: {
    '$route.name': function (val) {
      this.judgeActiveRoute(val);
    },
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar');
    },

    judgeActiveRoute(routeName) {
      const originRoute = {
        projectManage: ['projectManage'],
        AlarmManage: ['Alarm', 'alarmConfig', 'addGroup', '编辑群组'],
        LinkageManage: ['LinkageManage'],
        RecordManage: ['Record'],
        DeviceRecord: ['DeviceRecord'],
      };

      // eslint-disable-next-line no-restricted-syntax
      for (const ii in originRoute) {
        if (originRoute[ii].indexOf(routeName) > -1) {
          this.defaultActiveRoute = ii;
          return;
        }
      }
    },
  },
};
</script>
