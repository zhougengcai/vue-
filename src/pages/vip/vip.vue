<template>
  <div>
    <!-- 表格 -->
    <v-list @willEdit="willEdit" :info="info" @init="init" :list="list"></v-list>
    <!-- 弹框 -->
    <v-form :info="info" ref="form" @init="init" :list="list"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { toggle } from "../../mixmins/toggle";
import { reqmemberlist } from "../../http/api";
export default {
  components: {
    vList,
    vForm,
  },
  props: [],
  data() {
    return {
      list:[],
      info: {
        // 1.声明isshow,用来做弹框出现和消失的
        // 由于dialog 组件要直接修改isshow,但是子组件是不能修改父组件传递的数据的，所以我们传递一个引用类型，这样子组件和父组件共用一个数据
        isshow: false,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willEdit(uid) {
      this.info.isshow = true;

      //希望form发请求
      this.$refs.form.getOne(uid);
    },
    init() {
      console.log(1);
      reqmemberlist().then((res) => {
        console.log(2);
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
  },
  mounted() {
    this.init()
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
