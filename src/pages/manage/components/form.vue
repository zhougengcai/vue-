<template>
  <el-dialog
    :title="info.isAdd ? '管理员添加' : '管理员编辑'"
    :visible.sync="info.isshow"
    @closed="closed"
  >
    <el-form :model="user">
      {{ user }}
      <el-form-item label="所属角色" label-width="120px">
        <el-select v-model="user.roleid" placeholder="请选择所属角色">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :value="item.id"
            :label="item.rolename"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名称" label-width="120px">
        <el-input v-model="user.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="120px">
        <el-input v-model="user.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" label-width="120px">
        <el-switch
          v-model="user.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" v-if="info.isAdd" @click="add">添 加</el-button>
      <el-button type="primary" v-else @click="update">修 改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqmenulist,
  reqroleadd,
  reqroleedit,
  reqroleinfo,
  reqrolelist,
  requseradd,
  requseredit,
  requserinfo,
  requserlist,
} from "../../../http/api";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      //角色名称
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 2,
      },
      //1.角色列表初始值
      roleList: [],
    };
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
    // 点了取消
    cancel() {
      this.info.isshow = false;
    },

    //点了添加
    add() {
      requseradd(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹框
          successAlert(res.data.msg);
          this.empty();
          //关闭弹框
          this.info.isshow = false;
          //刷新数据
          this.$emit("init");
        }
      });
    },
    //获取一条数据
    getOne(uid) {
      requserinfo({ uid: uid }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.password = "";
        }
      });
    },
    //修改
    update() {
      requseredit(this.user).then((res) => {
        if (res.data.code == 200) {
          // 弹成功
          successAlert(res.data.msg);
          // 判断修改user.uid是不是当前用户的uid,如果是，就要退出了；如果不是，什么都不做
          if (this.user.uid === this.userInfo.uid) {
            this.changeUserInfo({});
            this.$router.replace("/login");
            return;
          }
          // 清空user的数据
          this.empty();
          // 弹框消失
          this.info.isshow = false;
          // 刷新列表
          this.$emit("init");
        }
      });
    },
    //清空user
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 2,
      };
    },
    closed() {
      //如果是编辑的关闭，就要执行empty
      if (!this.info.isAdd) {
        this.empty();
      }
    },
  },
  mounted() {
    // 2.进来就要请求角色列表
    reqrolelist().then((res) => {
      if (res.data.code == 200) {
        this.roleList = res.data.list;
      }
    });
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
</style>
