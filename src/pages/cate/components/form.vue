<template>
  <el-dialog
    :title="info.isAdd ? '分类添加' : '分类编辑'"
    :visible.sync="info.isshow"
    @closed="closed"
  >
    <el-form :model="user">
      {{ user }}
      <el-form-item label="上级分类" label-width="120px">
        <el-select v-model="user.pid">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" label-width="120px">
        <el-input v-model="user.catename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片" label-width="120px">
        <!--自己的上传 图片 -->
        <div class="my-upload">
          <h3>+</h3>
          <input type="file" @change="changeImg" v-if="info.isshow" />
          <img :src="imgUrl" alt="" v-if="imgUrl" />
        </div>
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
      <el-button type="primary" v-else @click="update">修 改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import path from "path";
import {
  reqcateadd,
  reqcateedit,

} from "../../../http/api";
import { errorAlert, successAlert } from "../../../utils/alert";
import { reqcateinfo } from "../../../http/api";
export default {
  props: ["info"],
  data() {
    return {
      // 1.初始化表单数据
      user: {
        pid: "",
        catename: "",
        img: "",
        status: 2,
      },
      //2.初始化图片地址
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      list:"cate/list"
    }),
  },
  methods: {
    ...mapActions({
     reqList:"cate/reqList"
    }),
    //原生选择了文件
    changeImg(e) {
      console.log(e);
      let file = e.target.files[0];
      // 判断文件大小 file.size=12313B
      //1M=1024KB 1kb=1024B 1B=8b
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不能超过2m");
        return;
      }
      // 判断文件类型  file.name="1.1.2.2.4.3.jpeg"
      let imgArr = [".jpg", ".jpeg", ".png", ".gif", ".jfif"];
      // let extname = file.name.slice(file.name.lastIndexOf("."))
      let extname = path.extname(file.name);
      if (!imgArr.includes(extname)) {
        errorAlert("请上传正确的文件格式");
        return;
      }
      // 根据文件生成一个图片地址
      this.imgUrl = URL.createObjectURL(file);
      //赋值给user.img
      this.user.img = file;
    },
    // 点了取消
    cancel() {
      this.info.isshow = false;
    },

    //点了添加
    add() {
      reqcateadd(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹框
          successAlert(res.data.msg);
          // 清空user的数据
          this.empty();
          //关闭弹框
          this.info.isshow = false;
          //刷新数据
         this.reqList()
        }
      });
    },
    //获取一条数据
    getOne(id) {
      reqcateinfo({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          // 补id
          this.user.id = id;

          this.imgUrl=this.$pre+this.user.img
        }
      });
    },
    //修改
    update() {


      reqcateedit(this.user).then((res) => {
        if (res.data.code == 200) {
          // 弹成功
          successAlert(res.data.msg);
        
          // 清空user的数据
          this.empty();
          // 弹框消失
          this.info.isshow = false;
          // 刷新列表
         this.reqList()
        }
      });
    },
    //清空user
    empty() {
      this.user = {
        pid: "",
        catename: "",
        img: "",
        status: 2,
      };
      this.imgUrl = "";
    },
    closed() {
      //如果是编辑的关闭，就要执行empty
      if (!this.info.isAdd) {
        this.empty();
      }
    },
  },
  mounted() {
   
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";

.my-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed @primary;
  position: relative;

  h3 {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 150px;
    font-size: @h1;
    font-weight: 400;
    color: @primary;
  }
  input {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 100;
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
