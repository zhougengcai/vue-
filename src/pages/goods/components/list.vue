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
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$pre+scope.row.img" alt="">
         </template
        ><!--  -->
      </el-table-column>
      <el-table-column  label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1"
            >是</el-button
          >
          <el-button type="default" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column  label="是否热卖"> 
         <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1"
            >是</el-button
          >
          <el-button type="default" v-else>否</el-button>
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
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" @click="willEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      layout="prev, pager, next"
      @current-change="changePage"
      :total="total"
      :page-size="size"
      background
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqgoodsdelete, reqspecsdelete } from "../../../http/api";
import { successAlert } from "../../../utils/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqList",
      changePage: "goods/changePage",
    }),
    //6.点了编辑
    willEdit(id) {
      //通知父组件点了编辑,而且还要告诉点了是哪条id
      this.$emit("willEdit", id);
    },
    //删除
    del(id) {
      this.$confirm("你确定要删除吗?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async() => {
          //真的要删除了
         let res = await reqgoodsdelete({ id: id })
         if (res.data.code == 200) {
              // 弹成功
              successAlert(res.data.msg);
              // 刷列表
              this.reqList();
            }
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
    //请列表
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
