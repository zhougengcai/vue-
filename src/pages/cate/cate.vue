<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 表格 -->
    <v-list @willEdit="willEdit" ></v-list>
    <!-- 弹框 -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
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

     
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),

   
  
  },
  mounted() {

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
