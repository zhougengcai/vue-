<template>
  <el-dialog title="会员修改" :visible.sync="info.isshow" @closed="closed">
    <el-form :model="user">
      <div>user:{{ user }}</div>

      <el-form-item label="手机号" label-width="120px">
        <el-input v-model="user.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="昵称" label-width="120px">
        <el-input v-model="user.nickname" autocomplete="off"></el-input>
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
      <el-button type="primary" @click="update">修 改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqmemberedit,
  reqmemberinfo,
  reqmemberlist,

} from "../../../http/api";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info","list"],
  data() {
    return {
      // 1.初始化表单数据
      user: {
        uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
        nickname: "",
        phone: "",
        password: "",
        status: 2,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
     init() {
      console.log(1);
      reqmemberlist().then((res) => {
        console.log(2);
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },


    // 点了取消
    cancel() {
      this.info.isshow = false;
    },
    //清空user
    empty() {
      this.user = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 2,
      };
    },

    //获取一条数据
    getOne(uid) {
      reqmemberinfo({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
        }
      });
    },
    //修改
    update() {
      reqmemberedit(this.user).then((res) => {
        if (res.data.code == 200) {
          // 弹成功
          successAlert(res.data.msg);

          // 清空user的数据
          this.empty();
          // 弹框消失
          this.info.isshow = false;

          // 刷新列表
         this.$emit("init")
        }
      });
    },
    closed() {
      //如果是编辑的关闭，就要执行empty
      if (!this.info.isshow) {
        this.empty();
      }
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
.line {
  display: flex;
  .el-input {
    flex: 1;
  }
}
</style>
