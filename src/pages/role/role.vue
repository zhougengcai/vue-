<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 表格 -->
    <v-list :list="list" @willEdit="willEdit" @init="init"></v-list>
    <!-- 弹框 -->
    <v-form :info="info" @init="init" :list="list" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqrolelist } from "../../http/api";
import {toggle} from "../../mixmins/toggle"
export default {
  components: {
    vList,
    vForm,
  },
  mixins:[toggle],
  props: [],
  data() {
    return {
      list: [],
     
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),

    init() {
      reqrolelist().then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.list = res.data.list;
        }
      });
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
