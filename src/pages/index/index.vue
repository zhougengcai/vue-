<template>
  <div>
    <el-container class="content">
      <el-aside width="200px">
        <!-- 侧边栏 
            unique-opened	是否只保持一个子菜单的展开
            background-color 背景色
            text-color 文本颜色
             active-text-color 激活文本颜色
             router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
            -->
        <el-menu
          unique-opened
          class="el-menu-vertical-demo"
          router
          background-color="rgba(0,0,0,0)"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 是目录，下面有菜单 -->

            <el-submenu :index="item.id + ''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>

              <el-menu-item-group>
                <el-menu-item
                  v-for="i in item.children"
                  :key="i.id"
                  :index="i.url"
                >
                  {{ i.title }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!--没有目录， 只有菜单的情况 -->
            <el-menu-item v-else :index="item.url">
              <i class="el-icon-timer"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 头部 -->
          <div class="header-con">
            <span>{{ userInfo.username }}</span>
            <el-button type="primary" plain @click="logout">退出登录</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 内容区 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      changeUserInfo: "changeUserInfo",
    }),
    logout() {
      this.changeUserInfo({});
      this.$router.replace("/login");
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";

.el-header {
  background: @header-color;
  .header-con {
    float: right;
    margin-right: @margin;
    span {
      color: @white;
      margin-right: @margin;
      margin-top: @margin;
      display: inline-block;
    }
  }
}
.el-aside {
  background: @primary-deep;
}
.content {
  height: 100vh;
}
</style>
