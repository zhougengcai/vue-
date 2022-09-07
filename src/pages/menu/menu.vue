<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 表格 -->
    <v-list :list="list" @willEdit="willEdit" @init="init"></v-list>
    <!-- 弹框 -->
    <v-form :info="info" :list="list" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqmenulist } from "../../http/api";

export default {
  props: [],
  components: {
    vList,
    vForm,
  },
  data() {
    return {
      list: [],
      info: {
        // 1.声明isshow,用来做弹框出现和消失的
        // 由于dialog 组件要直接修改isshow,但是子组件是不能修改父组件传递的数据的，所以我们传递一个引用类型，这样子组件和父组件共用一个数据
        isshow: false,
        isAdd: true, //true-添加 false-编辑
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),

    // 刷新数据
    init() {
      reqmenulist({ istree: true }).then((res) => {
        if (res.data.code === 200) {
          this.list = res.data.list;
        }
      });
    },

    // 添加
    willAdd() {
      this.info.isshow = true;
      this.info.isAdd = true;
    },

    //点了编辑
    willEdit(id) {
      this.info.isshow = true;
      this.info.isAdd = false;
      //希望form发请求
      this.$refs.form.getOne(id)
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";
.el-button {
  margin-bottom: @margin;
  margin-top: 20px;
}
</style>
