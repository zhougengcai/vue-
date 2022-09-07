<template>
  <div>
    <!--
      data:展示的数据
      default-expand-all 默认展开所有项，我们不需要
      :tree-props="{ children: '用哪个字段判断该数据是否有子节点' }"
      -->

    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>

      <el-table-column label="状态">
        <template>
          <el-button type="primary">启用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="willEdit(scope.row.uid)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqmemberlist } from "../../../http/api";

export default {
  props: ["info","list"],
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),

    //6.点了编辑
    willEdit(id) {
      //通知父组件点了编辑,而且还要告诉点了是哪条id
      this.$emit("willEdit", id);
    },
  },
  mounted() {
    //请列表
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
img {
  width: 80px;
  height: 80px;
}
</style>
