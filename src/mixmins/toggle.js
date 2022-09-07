export const toggle = {
    data() {
        return {
     
          info: {
            // 1.声明isshow,用来做弹框出现和消失的
            // 由于dialog 组件要直接修改isshow,但是子组件是不能修改父组件传递的数据的，所以我们传递一个引用类型，这样子组件和父组件共用一个数据
            isshow: false,
            isAdd: true, //true-添加 false-编辑
          },
        };
      },
      methods: {
    
  
        //点了添加
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
}