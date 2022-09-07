<template>
  <!--自己的上传 图片 -->
  <div class="my-upload">
    <h3>+</h3>
    <input type="file" @change="changeImg"  v-if="showInput" />
    <img :src="imgUrl" alt="" v-if="imgUrl" />
  </div>
</template>

<script>

/*
    Event
      send  回调函数参数  file
    Methods 
      setImgUrl()  :  设置图片地址

*/
import path  from "path"
export default {
  data(){
    return {
      imgUrl:"",
      showInput:false
    }
  },
  methods: {

    //清楚imgUrl
    setImgUrl(url){
        this.imgUrl=url
    },
    //修改input状态
    setShowInput(bool){
      this.showInput=bool
    },

    
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
      this.$emit("send",file)
    },
  },
};
</script>

<style lang="less" scoped>
@import "../less/index.less";

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
