<template>
  <div class="w3ls-login box loginDiv">
    <!-- <img src="images/logo.png" alt="logo_img" /> -->
    <!-- form starts here -->
    <form action="#" method="post">
      <div class="agile-field-txt">
        <input
          type="text"
          name="userName"
          placeholder="用户名"
          required=""
          v-model="userName"
        />
      </div>
      <div class="agile-field-txt">
        <input
          type="password"
          name="password"
          placeholder="密码"
          required=""
          v-model="passWord"
        />
        <!-- <div class="agile_label">
          <input
            id="check3"
            name="check3"
            type="checkbox"
            value="show password"
          />
          <label class="check" for="check3">Remember me</label>
        </div> -->
      </div>
      <div class="w3ls-bot">
        <input type="submit" value="登录" @click="submit" />
      </div>
    </form>
  </div>
</template>

<script>

import { login as userLogin } from "@/utils/userUtils.js";
export default {
  data() {
    return {
      userName: "",
      passWord: "",
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();
      if(process.env.NODE_ENV !=="production"){
        userLogin("测试账号");
        this.$router.push("/")
      }else{

      }

    },
  },
};
</script>

<style lang="scss" scoped>
.loginDiv {
  width: 100%;
  height: 100%;
  .w3ls-bot {
    input {
      padding: 14px;
    }
  }
}
</style>
