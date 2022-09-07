<template>
  <el-dialog
    :title="info.isAdd ? '活动添加' : '活动编辑'"
    :visible.sync="info.isshow"
    @closed="closed"
  >
    <el-form :model="user">
      <div>user:{{ user }}</div>

      <el-form-item label="活动名称" label-width="120px">
        <el-input v-model="user.title" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="活动期限" label-width="120px">
        <template slot-scope="scope">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            >
            </el-date-picker>
          </div>
        </template>
      </el-form-item>

      <el-form-item label="一级分类" label-width="120px">
        <el-select v-model="user.first_cateid" @change="changeFirst">
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" label-width="120px">
        <el-select v-model="user.second_cateid">
          <el-option
            v-for="item in secondCateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品" label-width="120px">
        <el-select v-model="user.goodsid">
          <el-option
            v-for="item in list"
            :key="item.id"
            :value="item.id"
            :label="item.title"
          ></el-option>
        </el-select>
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
  reqcatelist,
  reqspeckadd,
  reqspeckedit,
  reqspeckinfo,
  reqspecklist,
} from "../../../http/api";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      // 1.初始化表单数据
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 2,
      },
      secondCateList: [],
      value1: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
    }),

    //一级分类便了，开始计算二级分类的列表
    changeFirst() {
      //二级分类的值先清空
      this.user.second_cateid = "";
      this.getSecondList();
    },
    //计算二级列表
    async getSecondList() {
      let res = await reqcatelist({ pid: this.user.first_cateid });
      if (res.data.code === 200) {
        this.secondCateList = res.data.list ? res.data.list : [];
      }
    },

    //点了添加
    add() {
      this.user.begintime = this.value1[0];
      this.user.endtime = this.value1[1];
      reqspeckadd(this.user).then((res) => {
        if (res.data.code === 200) {
          // 弹成功
          successAlert(res.data.msg);

          // 清空user的数据
          this.empty();
          // 弹框消失
          this.info.isshow = false;

          // 刷新列表
          this.$emit("init");
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
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 2,
      };
      this.value1 = [];
    },

    //获取一条数据
    getOne(id) {
      reqspeckinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id=id;
          this.value1.push(this.user.begintime);
          this.value1.push(this.user.endtime);

        }
      });
    },
    //修改
    update() {
      reqspeckedit(this.user).then((res) => {
        if (res.data.code == 200) {
          // 弹成功
          successAlert(res.data.msg);

          // 清空user的数据
          this.empty();
          // 弹框消失
          this.info.isshow = false;

          // 刷新列表
          this.$emit("init");
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
  mounted() {
    this.reqCateList();
  },
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
