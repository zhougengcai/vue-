<template>
  <div>
    <!-- 折线图 -->
    <div
      id="line"
     
    ></div>
    <!-- 饼状图 -->
    <div
      id="pie"
    
    ></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
let echarts = require("echarts");
export default {
  props: [],
  data() {
    return {};
  },
  watch:{
    list:{
      handler(){
        if(this.list.length>0){
            //折线图
    var myLine = echarts.init(document.getElementById("line"));

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "商品分类子类数据",
      },
      tooltip: {},
      legend: {
        data: ["数量"],
      },
      xAxis: {
        data: this.list.map(item=>item.catename),
      },
      yAxis: {},
      series: [
        {
          name: "数量",
          type: "line",
          data: this.list.map(item=>item.children?item.children.length:0),
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myLine.setOption(option);

    //饼状图图
    var mypie = echarts.init(document.getElementById("pie"));

    // 指定图表的配置项和数据
    var option2 = {
      backgroundColor: "#2c343c",
      title: {
        text: "商品分类子类数据",
        left: "center",
        top: 20,
        textStyle: {
          color: "#ccc",
        },
      },
      tooltip: {
        trigger: "item",
      },
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1],
        },
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: this.list.map(item=>({name:item.catename,value:item.children?item.children.length:0})).sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: "radius",
          label: {
            color: "rgba(255, 255, 255, 0.3)",
          },
          labelLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
          itemStyle: {
            color: "#c23531",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function (idx) {
            return Math.random() * 200;
          },
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    mypie.setOption(option2);
        }
      },
      deep:true
    }
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
  },
  mounted() {
    this.reqList();

  
  },
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";
#line{
  width: 450px;
  height: 300px;
  display: inline-block;
  border: 1px solid #ccc;
  margin-right: 30px;
}
#pie{
    width: 450px;
  height: 300px;
  display: inline-block;
  border: 1px solid #ccc;
}
</style>
