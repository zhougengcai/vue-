<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- 表格 -->
    <!-- 7.绑定自定义事件 willEdit -->
    <!-- 3.3 将list传递给list 组件 -->
    <v-list @willEdit="willEdit" :list="list" @init="init"></v-list>

    <!-- 弹框 -->
    <!-- 3.info传递给子组件 -->
    <v-form :info="info" :list="list" @init="init" ref="form"></v-form>
    <!-- 分页组件 -->
    <!-- 分页组件
    设置layout，表示需要显示的内容，用逗号分隔，布局元素会依次显示。prev表示上一页，next为下一页，pager表示页码列表。
    total表示总条目数
    page-size	每页显示条目个数，默认是10
    background	是否为分页按钮添加背景色
    @current-change 页码改变时会触发  @current-change="changePage"
     -->
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      background
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqrolelist, requsercount, requserlist } from "../../http/api";
import { toggle } from "../../mixmins/toggle";
export default {
  components: {
    vList,
    vForm,
  },
  mixins: [toggle],
  props: [],
  data() {
    return {
      // 3.1 初始化列表数据
      list: [],
      //一页的条目
      size: 2,
      //总条目
      total: 0,
      //damn
      page: 1,
    };
  },
  methods: {
    reqList() {
      requserlist({ page: this.page, size: this.size }).then((res) => {
        if (res.data.code == 200) {
          let arr = res.data.list ? res.data.list : [];

          /* 删除了最后一页最后一条数据，默认是：暂无数据。但是我们希望如果有上一页显示上一页数据
          如果取回来的数据arr是空数组，并且当前的page >1,那么就应该取page-1 的数据 
          如果page <=1,就什么都不做
          */
          if (arr.length == 0 && this.page > 1) {
            this.page--;
            this.reqList();
            return;
          }

          this.list = arr;
        }
      });
    },
    //刷新列表
    init() {
      this.reqList();
      // 请求总数
      requsercount().then((res) => {
        if (res.data.code == 200) {
          this.total = res.data.list[0].total;
        }
      });
    },

    //修改了页码
    changePage(e) {
      this.page = e;
      this.reqList()
    },
  },
  mounted() {
    //3.2 一进来就要获取列表数据
    this.init();
  },
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";
.el-button {
  margin-bottom: @margin;
}
</style>
