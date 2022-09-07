<template>
  <el-dialog
    :title="info.isAdd ? '菜单添加' : '菜单编辑'"
    :visible.sync="info.isshow"
    @closed="closed"
  >
    <el-form :model="user">
      {{ user }}
      <el-form-item label="菜单名称" label-width="120px">
        <el-input v-model="user.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" label-width="120px">
        <el-select v-model="user.pid" placeholder="请选择上级菜单" @change="changePid">
          <el-option label="顶级菜单" :value="0"></el-option>
          <!-- 遍历菜单列表 -->
          <el-option
            v-for="item in list "
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型" label-width="120px">
        <el-radio v-model="user.type" disabled :label="1">目录</el-radio>
        <el-radio v-model="user.type" disabled :label="2">菜单</el-radio>
      </el-form-item>
      <!-- 是目录，有图标，没有地址；
      是菜单，有地址，没有图标 -->
      <el-form-item label="菜单图标" label-width="120px" v-if="user.type == 1">
        <el-select v-model="user.icon" placeholder="请选择菜单图标">
          <el-option v-for="item in icons" :key="item" :value="item">
            <i :class="item"></i>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单地址" label-width="120px" v-else>
        <el-select v-model="user.url" placeholder="请选择菜单地址">
          <el-option v-for="item in IndexRoutes" :key="item.path" :label="item.meta.title" :value="'/'+item.path"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" label-width="120px">
        <el-switch
          v-model="user.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" v-if="info.isAdd" @click="add">添 加</el-button>
      <el-button type="primary" v-else  @click="update">修 改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqmenuadd, reqmenuedit, reqmenuinfo } from '../../../http/api';
import {IndexRoutes} from "../../../router"
import {successAlert} from "../../../utils/alert"
export default {
  props: ["info","list"],
  data() {
    return {
      user: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 2,
      },
      // icon集合
      icons: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-help",
        "el-icon-camera-solid ",
        "el-icon-s-platform",
      ],
      //二级路由
      IndexRoutes,
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    cancel() {
      this.info.isshow = false;
    },
    //清空数据
    empty(){
       this.user = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 2,
      };
    },
        //修改了pid 
    changePid(){
      // 如果pid是0，那么type=1;否则，type=2
      if(this.user.pid===0){
        this.user.type=1
      }else{
        this.user.type=2

      }
    },
    //获取一条数据
    getOne(id){
      reqmenuinfo({id:id}).then(res=>{
        if(res.data.code==200){
          this.user=res.data.list
          this.user.id=id
        }
      })
    },
        //修改
        update(){
          reqmenuedit(this.user).then(res=>{
            if(res.data.code==200){
              successAlert(res.data.msg)
              this.empty()
              this.info.isshow=false
              this.$emit("init")
            }
          })
        },
        //如果是编辑的关闭。就要执行empty
        closed(){
          if(!this.info.isAdd){
            this.empty()
          }
        },
    //添加
    add(){

      reqmenuadd(this.user).then(res=>{
        if(res.data.code===200){
          console.log(res);
          successAlert(res.data.msg)
          //清空
          this.empty()
          this.info.isshow=false

          //刷新
          this.$emit("init")
        }
      })
    }
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
</style>
