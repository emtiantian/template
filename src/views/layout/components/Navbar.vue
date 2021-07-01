<template>
  <div class="navbar" mode="horizontal">
    <div class="img-box">
      <img src="@/assets/logo.svg" />
    </div>

    <div class="nav-content">
      <div class="left-menu">
        <BreadCrumb />
      </div>
      <div class="right-menu">
        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <span>用户名</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown" class="top-bar-menu">
            <el-dropdown-item>
              <span @click="logout" style="display:block;">{{ '退出' }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>

import BreadCrumb from '@/components/breadCrumb/index.vue';

export default {
  components: { BreadCrumb },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar');
    },

    logout() {
      // 登出
    },
  },
};
</script>

<style lang="scss">
.top-bar-menu.el-popper[x-placement^='bottom'] {
  margin-top: 0px;
  // left: auto !important;
  // right: 0px !important;
}
.top-bar-menu.el-dropdown-menu--medium {
  padding: 0;
  line-height: 25px;
}
.top-bar-menu.el-dropdown-menu--medium .el-dropdown-menu__item {
  line-height: 25px;
}
.top-bar-menu.el-dropdown-menu {
  padding: 5px 0;
  border-radius: 0px;
  -webkit-box-shadow: 3px 3px 12px 0 rgba(34, 34, 34, 0.47);
  box-shadow: 3px 3px 12px 0 rgba(34, 34, 34, 0.47);
}
</style>

<style lang="scss" scoped>
@import '@/styles/variables';
.navbar {
  position: fixed;
  width: 100%;
  min-width: 1280px;
  height: 60px;
  line-height: 60px;
  z-index: 999;
  border-bottom: none !important;
  background-color: #fff;
  box-shadow: 0px 1px 5px #bcbcbc;
  .left-menu {
    float: left;
  }
  .right-menu {
    float: right;
    margin-right: 20px;
    height: 100%;
    overflow: hidden;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      font-size: 14px;
      color: #666;
      margin: 0 8px;
      cursor: pointer;
    }
    .avatar-container {
      height: 60px;
      line-height: 60px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .img-box {
    float: left;
    position: relative;
    width: 180px;
    height: 60px;
    background-color: rgba(71, 127, 227, 1);
    img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      height: 26px;
      width: 97px;
    }
  }
  .platform-name {
    padding: 0 20px;
    color: $fontcolor;
    font-size: 14px;
  }
  .nav-content {
    float: right;
    width: calc(100% - 180px);
    height: 60px;
  }
}
</style>
