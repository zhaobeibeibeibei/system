<template>
<!-- 封装面包屑组件 -->
  <el-breadcrumb separator="/">
     <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>{{le1}}</el-breadcrumb-item>
     <el-breadcrumb-item>{{le2}}</el-breadcrumb-item>

  </el-breadcrumb>
</template>

<script>
export default {
  name: 'my-brand',

  props: ['le1', 'le2']

}
</script>

<style>

</style>
