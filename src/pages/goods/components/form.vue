<template>
  <el-dialog
    :title="info.isAdd ? '商品添加' : '商品编辑'"
    :visible.sync="info.isshow"
    @closed="closed"
    @opened="opened"
  >
    <el-form :model="user">
      <div>user:{{ user }}</div>

      <el-form-item label="一级分类" label-width="120px">
        <el-select
          v-model="user.first_cateid"
          placeholder="请选择一级分类"
          @change="changeFirst"
        >
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" label-width="120px">
        <el-select
          v-model="user.second_cateid"
          autocomplete="off"
          placeholder="请选择一级分类"
        >
          <el-option
            v-for="item in secondCateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" label-width="120px">
        <el-input v-model="user.goodsname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格" label-width="120px">
        <el-input v-model="user.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" label-width="120px">
        <el-input v-model="user.market_price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片" label-width="120px">
        <upload-img @send="user.img = $event" ref="upload"></upload-img>
      </el-form-item>

      <el-form-item label="商品规格" label-width="120px">
        <el-select
          v-model="user.specsid"
          placeholder="请选择商品规格"
          @change="changeSpecs"
        >
          <el-option
            v-for="item in specsList"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格属性" label-width="120px">
        <el-select
          v-model="user.specsattr"
          autocomplete="off"
          placeholder="请选择规格属性"
          multiple
        >
          <el-option
            v-for="item in attrsList"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否新品" label-width="120px">
        <el-radio v-model="user.isnew" :label="1">是</el-radio>
        <el-radio v-model="user.isnew" :label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="是否热卖" label-width="120px">
        <el-radio v-model="user.ishot" :label="1">是</el-radio>
        <el-radio v-model="user.ishot" :label="2">否</el-radio>
      </el-form-item>
      <!-- 遍历attrArr  -->

      <el-form-item label="状态" label-width="120px">
        <el-switch
          v-model="user.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
      <el-form-item label="商品描述" label-width="120px">
        <div id="editor" v-if="info.isshow"></div>
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
import {
  reqcatelist,
  reqgoodsadd,
  reqgoodsedit,
  reqgoodsinfo,
  reqspecsadd,
  reqspecsedit,
  reqspecsinfo,
} from "../../../http/api";
import { errorAlert, successAlert } from "../../../utils/alert";
import E from "wangeditor";
export default {
  props: ["info"],
  data() {
    return {
      // 1.初始化表单数据
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 2,
        ishot: 2,
        status: 2,
      },
      //二级分类的列表
      secondCateList: [],
      //规格属性列表
      attrsList: [],
    };
  },
  computed: {
    ...mapGetters({
      //分类数据
      cateList: "cate/list",
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      //分类方法
      reqCateList: "cate/reqList",
      reqSpecsList: "specs/reqSpecsList",
      //商品列表数据
      reqList: "goods/reqList",
    }),
    //一级分类便了，开始计算二级分类的列表
    changeFirst() {
      //二级分类的值先清空
      this.user.second_cateid = "";
      this.getSecondList();
    },
    //计算二级列表
    async getSecondList() {
      let res = await reqcatelist({ pid: this.user.first_cateid });
      if (res.data.code === 200) {
        this.secondCateList = res.data.list ? res.data.list : [];
      }
    },
    //规格发生改变
    changeSpecs() {
      //清空选中的属性值
      this.user.specsattr = [];
      //根据选中的规格（thisuser.specsid） 计算 规格属性列表数据
      this.getAttrsList();
    },
    getAttrsList() {
      let obj = this.specsList.find((item) => item.id === this.user.specsid);
      this.attrsList = obj ? obj.attrs : [];
    },
    //弹框出现
    opened() {
      //kongzhi 控制上传文件input的出现
      this.$refs.upload.setShowInput(true);

      //创建编辑器
      this.editor = new E("#editor");

      this.editor.create();

      //给编辑器赋值
      this.editor.txt.html(this.user.description);
    },

    closed() {
      //弹框消失
      this.$refs.upload.setShowInput(false);
      //添加取消
      if (this.info.isAdd) {
        // 将编辑器内存存在user.description
        this.user.description = this.editor.txt.html();
      }
      //如果是编辑的关闭，就要执行empty
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    // 点了取消

    cancel() {
      this.info.isshow = false;
    },
    //清空user
    empty() {
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 2,
        ishot: 2,
        status: 2,
      };
      //二级分类的列表
      (this.secondCateList = []),
        //规格属性列表
        (this.attrsList = []);
      this.$refs.upload.setImgUrl("");

      //清楚编辑器
      this.editor.txt.html("");
    },
    //检查数据
    checkedData() {
      return new Promise((resolve, reject) => {
        if (this.user.first_cateid === "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.user.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.user.goodsname === "") {
          errorAlert("商品名称不能为空");
          return;
        }
        if (this.user.price === "") {
          errorAlert("商品价格不能为空");
          return;
        }
        if (this.user.market_price === "") {
          errorAlert("市场价格不能为空");
          return;
        }
        if (this.user.img === "") {
          errorAlert("布片不能为空");
          return;
        }
        if (this.user.specsid === "") {
          errorAlert("规格不能为空");
          return;
        }
        if (this.user.specsattr.length > 0) {
          errorAlert("规格属性不能为空");
          return;
        }
        if (this.editor.txt.html() === "") {
          errorAlert("商品描述不能为空");
          return;
        }
        resolve();
      });
    },
    add() {
      this.checkedData().then(  async() => {
        //由于后端specsattr要字符串，所以要json stringify
        //但是直接json 页面用的是多选multiple  他需要数组，如果没有添加 成功，页面已经变成了字符串，是不合理的，所以我们需要在发送数据之前拷贝一份， 将specsattr转为字符串，页面还的是数组但是user中有文件对象 不能使用json方法拷贝 否则文件对象会丢失
        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
          //编辑器的内容给description
          description: this.editor.txt.html(),
        };

        let res = await reqgoodsadd(data);
        if (res.data.code === 200) {
          // 弹成功
          successAlert(res.data.msg);
          // 清空user的数据
          this.empty();
          // 弹框消失
          this.info.isshow = false;
          // 刷新列表????????????????????///
          this.reqList();
        }
      });
    },

    //获取一条数据
    getOne(id) {
      reqgoodsinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          //根据1级分类id计算二级列表
          this.getSecondList();
          //给图片赋值
          this.$refs.upload.setImgUrl(this.$pre + this.user.img);

          //根据规格计算展示的列表
          this.getAttrsList();
          //user.specsattr  转数组
          this.user.specsattr = JSON.parse(this.user.specsattr);

          //给富文本编辑器赋值
          if (this.editor) {
            this.editor.txt.html(this.user.description);
          }
        }
      });
    },
    //修改
    update() {
      this.checkedData().then(() => {
        reqgoodsedit({
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
          description: this.editor.txt.html(),
        }).then((res) => {
          if (res.data.code == 200) {
            // 弹成功
            successAlert(res.data.msg);

            // 清空user的数据
            this.empty();
            // 弹框消失
            this.info.isshow = false;
            // 刷新列表
            this.reqList();
          }
        });
      });
    },
  },
  mounted() {
    this.reqCateList();
    this.reqSpecsList(true);
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
.line {
  display: flex;
  .el-input {
    flex: 1;
  }
}
</style>
