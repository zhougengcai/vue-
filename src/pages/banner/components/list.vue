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
      <el-table-column prop="id" label="编号"> </el-table-column>
      <el-table-column prop="title" label="轮播图标题"> </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$pre + scope.row.img" alt="" />
        </template>
      </el-table-column>

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
          <el-button type="primary" @click="willEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除
      
          </el-button>
        <div>
                {{scope.row}}
        </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqbanneredit} from "../../../http/api";
import { successAlert } from "../../../utils/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqList",
    }),
    //点了编辑
    //通知父组件点了编辑，把id传过去
    willEdit(id) {
      this.$emit("willEdit", id);
    },
    //删除
    del(id) {
      this.$confirm("你确定要删除吗?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //真的要删除了
          reqbanneredit({ id: id }).then((res) => {
            if (res.data.code == 200) {
              // 弹成功
              successAlert(res.data.msg);
              // 刷列表
                this.reqList()
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
  mounted() {
    this.reqList();
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
