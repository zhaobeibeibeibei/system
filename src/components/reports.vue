<template>
  <el-card class="card">
      <my-brand le1="数据统计" le2="数据列表"></my-brand>
       <div id="main" style="width: 800px;height:400px;margin-top:20px"></div>
  </el-card>
</template>

<script>
// 导入echarts
import echarts from 'echarts'
export default {
  mounted(){
this.gteecharts()

  },
  methods:{
  async  gteecharts(){
       // 基于准备好的dom，初始化echarts实例
       const myChart = echarts.init(document.getElementById('main'))
        const res=await this.$http.get(`reports/type/1`)
     console.log(res)
     const data=res.data.data
       const option = {
         title: {
          text: '堆叠区域图'
        },
         tooltip : {
            trigger: 'axis',
             axisPointer: {
              type: 'cross',
             label: {
                backgroundColor: '#6a7985'
            }
        }
    },
       toolbox: {
           feature: {
             saveAsImage: {}
          }
    },
       grid: {
           left: '3%',
           right: '4%',
           bottom: '3%',
           containLabel: true
    },
};
      const option1={...data,...option}
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option1)

    },

  }


}
</script>

<style>
.card{
  height: 100%;
}
</style>
