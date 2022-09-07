<template>
  <el-dialog
    :title="info.isAdd ? '角色添加' : '角色编辑'"
    :visible.sync="info.isshow"
    @closed="closed"
  >
    <el-form :model="user">
      {{ user }}
      <el-form-item label="角色名称" label-width="120px">
        <el-input v-model="user.rolename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" label-width="120px">
        <!-- 树形控件 -->
        <!-- 3.展示到树形控件上 -->
        <el-tree
          :data="menuList"
          show-checkbox
          :props="{ children: 'children', label: 'title' }"
          node-key="id"
          ref="tree"
        ></el-tree>
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
} from "../../../http/api";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      //角色名称
      user: {
        rolename: "",
        menus: "",
        status: 2,
      },
      //1.菜单列表初始值
      menuList: [],
      //数据
      //   list:[]
    };
  },
  computed: {
    ...mapGetters({
      userInfo:"userInfo"
    }),
  },
  methods: {
    ...mapActions({
      changeUserInfo:"changeUserInfo"
    }),
    // 点了取消
    cancel() {
      this.info.isshow = false;
    },

    //点了添加
    add() {
      this.user.menus = this.$refs.tree.getCheckedKeys();

      reqroleadd(this.user).then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          //弹框
          successAlert(res.data.msg);
          //关闭弹框
          this.info.isshow = false;
          //刷新数据
          this.$emit("init");
        }
      });
    },
    //获取一条数据
    getOne(id) {
      reqroleinfo({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          // 补id
          this.user.id = id;

          //给树赋值
          this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        }
      });
    },
    //修改
    update() {
      // 先取出树的数据给user.menus ,再发请求
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());

      reqroleedit(this.user).then((res) => {
        if (res.data.code == 200) {
          // 弹成功
          successAlert(res.data.msg);
           /*==================看这个判断条件================================
          先判断当前修改的user.id 是不是当前登录用户的roleid。 
          如果是，就自动退出登录；如果不是，什么都不做*/ 
          if(this.user.id===this.userInfo.roleid){
            //清空vuex和本地存储的数据

            this.changeUserInfo({})
            //跳转页面

            this.$router.replace("/login")
            return
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
        rolename: "",
        menus: "",
        status: 2,
      };
      //清空树
      this.$refs.tree.setCheckedKeys([]);
    },
    closed() {
      //如果是编辑的关闭，就要执行empty
      if (!this.info.isAdd) {
        this.empty();
      }
    },
  },
  mounted() {
    reqmenulist({ istree: true }).then((res) => {
      if (res.data.code === 200) {
        this.menuList = res.data.list;
      }
    });
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";

</style>
