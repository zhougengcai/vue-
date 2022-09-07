<template>
  <div>
    <!-- data:展示的数据 
            default-expand-all 默认展开所有项
            我们不需要:tree-props="{children:"用哪个字段判断该数据是否有子节点"}"
      -->

    <el-table
      :data="list"
      row-key="id"
      :tree-props="{ children: 'children' }"
      style="width: 100%; margin-bottom: 20px"
      border
    >
      <el-table-column prop="id" label="用户编号"> </el-table-column>
      <el-table-column prop="username" label="用户名称"> </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="default" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="willEdit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqroledelete, requserdelete } from "../../../http/api";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["list"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    //点了编辑
    //通知父组件点了编辑，把id传过去
    willEdit(uid) {
      this.$emit("willEdit", uid);
    },
    //删除
    del(uid) {
      this.$confirm("你确定要删除吗?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //真的要删除了
          requserdelete({ uid: uid }).then((res) => {
            if (res.data.code == 200) {
              // 弹成功
              successAlert(res.data.msg);
              // 刷列表
              this.$emit("init");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
</style>
