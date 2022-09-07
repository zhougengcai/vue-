<template>
  <div class="login">
    <div class="con">
      <h3 class="text -primary text-center h1">登录</h3>
      <el-input
        v-model="user.username"
        placeholder="请输入账号"
        clearable
      ></el-input>
      <el-input
        v-model="user.password"
        placeholder="请输入密码"
        clearable
        show-password
      ></el-input>
      <div class="text-center">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requserlogin } from "../../http/api";
export default {
  props: [],
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      changeUserInfo: "changeUserInfo",
    }),
    login() {
      requserlogin(this.user).then((res) => {
        if (res.data.code == 200) {
          // 存res.data.list
          this.changeUserInfo(res.data.list);
          this.$router.replace("/");
        }
      });
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";

.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to right,
    @primary-light,
    @primary,
    @primary-deep
  );
  .con {
    padding: @padding;
    width: 300px;
    background: @white;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: @border;
  }
  h3 {
    margin-bottom: @margin;
  }
  .el-input {
    margin-bottom: @margin;
  }
}
</style>
