<template>
  <el-card class="card">
    <my-brand le1="商品管理" le2="商品列表"></my-brand>
    <el-alert title="商品信息" type="info" center show-icon class="title"></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="active" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-form :model="formdata" class="form">
      <el-tabs tab-position="left" v-model="active">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="formdata.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="formdata.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="formdata.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="formdata.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions2"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">配置管理</el-tab-pane>
        <el-tab-pane name="3" label="商品属性">角色管理</el-tab-pane>
        <el-tab-pane name="4" label="商品图片">定时任务补偿</el-tab-pane>
        <el-tab-pane name="5" label="商品内容">角色管理</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
// goods_name商品名称
// goods_cat以为','分割的分类列表
// goods_price价格
// goods_number数量
// goods_weight重量
// goods_introduce介绍
// pics上传的图片临时路径（对象）
// attrs商品的参数（数组）

export default {
  data() {
    return {
      active: 1,
      formdata: {},
      options:'',
      selectedOptions2:''
    };
  }
};
</script>

<style>
.card {
  height: 100%;
}
.title {
  margin-top: 20px;
  margin-bottom: 20px;
}
.form {
  height: 400px;
  overflow: auto;
}
</style>
