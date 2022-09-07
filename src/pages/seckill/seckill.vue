<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

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
import { reqmemberlist, reqspecklist } from "../../http/api";
export default {
  components: {
    vList,
    vForm,
  },
  mixins:[toggle],
  props: [],
  data() {
    return {
      list:[],
   
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),

    init() {
      reqspecklist().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list?res.data.list:[];
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
