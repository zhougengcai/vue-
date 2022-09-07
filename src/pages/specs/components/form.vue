<template>
  <el-dialog
    :title="info.isAdd ? '规格添加' : '规格编辑'"
    :visible.sync="info.isshow"
    @closed="closed"
  >
    <el-form :model="user">
      <div>user:{{ user }}</div>
      <div>attrArr:{{ attrArr }}</div>

      <el-form-item label="规格名称" label-width="120px">
        <el-input v-model="user.specsname" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 遍历attrArr  -->
      <el-form-item
        label="规格属性"
        label-width="120px"
        v-for="(item, index) in attrArr"
        :key="index"
      >
        <div class="line">
          <el-input v-model="item.val" autocomplete="off"></el-input>

          <el-button
            type="primary"
            v-if="index == 0"
            @click="attrArr.push({ val: '' })"
            >新增规格属性</el-button
          >
          <el-button type="danger" v-else @click="attrArr.splice(index, 1)"
            >删除</el-button
          >
        </div>
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
import { reqspecsadd, reqspecsedit, reqspecsinfo } from "../../../http/api";
import { errorAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      // 1.初始化表单数据
      user: {
        specsname: "",
        attrs: "",
        status: 2,
      },
      //规格属性
      attrArr: [
        {
          val: "",
        },
        {
          val: "",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
    }),

    // 点了取消
    cancel() {
      this.info.isshow = false;
    },
    //清空user
    empty() {
      this.user = {
        specsname: "",
        attrs: "",
        status: 2,
      };
      //规格属性
      this.attrArr = [
        {
          val: "",
        },
        {
          val: "",
        },
      ];
    },
    checkData() {
      return new Promise((resolve) => {
        if (this.user.specsname === "") {
          errorAlert("规格名称不能为空");
          return;
        }
        if (this.attrArr.some((item) => item.val === "")) {
          errorAlert("规格属性均不能为空");
          return;
        }
        let newArr = this.attrArr.map((item) => item.val);
        if (new Set(newArr).size < this.attrArr.length) {
          errorAlert("规格属性不能相同");
          return;
        }
        resolve();
      });
    },
    add() {
      this.checkData().then(() => {
        /* 将attrArr赋值给user.attrs 
      attrArr :[ { "val": "红色" }, { "val": "黑色" }, { "val": "白色" } ] -->['红色','黑色','白色']
      user.attrs :'红色,黑色,白色'
      */
        this.user.attrs = this.attrArr.map((item) => item.val).join(",");

        reqspecsadd(this.user).then((res) => {
          if (res.data.code === 200) {
            // 弹成功
            successAlert(res.data.msg);
            // 清空user的数据
            this.empty();
            // 弹框消失
            this.info.isshow = false;
            // 刷新列表????????????????????///
            this.reqList();
          }
        });
      });
    },

    //获取一条数据
    getOne(id) {
      reqspecsinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list[0];
          /*
          user.attrs": [ "a", "b" ]
          attrArr:[ { "val": "a" }, { "val": "b" } ]
          */
          this.attrArr = this.user.attrs.map((item) => ({ val: item }));
        }
      });
    },
    //修改
    update() {
      this.checkData().then(() => {
        this.user.attrs = this.attrArr.map((item) => item.val).join(",");
        reqspecsedit(this.user).then((res) => {
          if (res.data.code == 200) {
            // 弹成功
            successAlert(res.data.msg);

            // 清空user的数据
            this.empty();
            // 弹框消失
            this.info.isshow = false;
            // 刷新列表
            this.reqList();
          }
        });
      });
    },
    closed() {
      //如果是编辑的关闭，就要执行empty
      if (!this.info.isAdd) {
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
