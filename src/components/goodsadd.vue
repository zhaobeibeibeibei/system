<template>
  <el-card class="card">
    <my-brand le1="商品管理" le2="商品列表"></my-brand>
    <el-alert title="商品信息" type="info" center show-icon class="title"></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="1*active" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-form class="form" :model="form" label-position="top">
      <el-tabs tab-position="left" v-model="active" @tab-click="change()">
        {{active}}
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>

          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>

          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>

          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>

          <el-form-item label="商品分类">
            {{selectedOptions2}}
            <el-cascader
              clearable
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions2"
              :props="props"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数" v-model="daDt">
          <el-form-item :label="v.attr_name" v-for="(v,i) in daDt" :key="i">
            <el-checkbox-group v-model="v.attr_vals">
              <el-checkbox border v-for="(v1,i) in v.attr_vals" :key="i" :label="v1"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <el-form-item :label="v.attr_name" v-for="(v,i) in daJt" :key="i">
            <el-input v-model="v.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <!--
            action 上传地址
            on-preview 上传文件的钩子
            on-remove  移除文件的钩子
            file-list  上传的文件列表
            list-type  文件列表的类型
           -->
          <el-upload
            class="upload-demo"
            action="http://localhost:8888/api/private/v1/upload"
            :headers="headers"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
          <el-form-item>
             <el-button type="primary" plain @click="add()">点击添加商品</el-button>
             <quill-editor v-model="form.goods_introduce"></quill-editor>

          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
// goods_name商品名称
// goods_cat以为','分割的分类列表  [1,2,3]--->"1,2,3"
// goods_price价格
// goods_number数量
// goods_weight重量
// goods_introduce介绍
// pics上传的图片临时路径（对象）
// attrs商品的参数（数组）
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      active: '1',
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',

        pics: [],
        goods_cat: '',
        attrs: []  //保存动态/静态数据的id vals值以对象的方式
      },
      options: [],
      selectedOptions2: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      daDt: [],
      daJt: [],
      headers:{
        Authorization:localStorage.getItem('token')
      }
    }
  },
   components: {
    quillEditor
  },
  created () {
    this.getdata()
  },
  methods: {
    handleChange () {},
    async getdata () {
      const res = await this.$http.get('categories?type=3')
      // console.log(res)
      this.options = res.data.data
    },
    // tab切换时触发
    async change () {
      if (this.active === '2') {
        if (this.selectedOptions2.length === 3) {
          const res = await this.$http.get(
            `categories/${this.selectedOptions2[2]}/attributes?sel=many`
          )
          // console.log(res);
          this.daDt = res.data.data
          this.daDt.forEach(item => {
            item.attr_vals.length === 0
              ? []
              : (item.attr_vals = item.attr_vals.split(','))
          })
          console.log(this.daDt)
        } else {
          this.$message.warning('请先选择三级分类')
        }
      }

      if (this.active === '3') {
        const res = await this.$http.get(
          `categories/${this.selectedOptions2[2]}/attributes?sel=only`
        )
        console.log(res)
        this.daJt = res.data.data
      }
    },
    // 上传图片
    handleRemove (file, fileList) {
     // console.log(file)
           // findIndex  -> ES6数组的新API
      // 1. 数组遍历方法
      // 2. 该方法形参是cb
      // 3. 该方法有返回 return 条件
      // 4. 该方法会把符合条件的元素item的索引自动返回
      const index = this.form.pics.findIndex(item => {
        return item.pic === file.response.data.tmp_path;
      });

      this.form.pics.splice(index, 1);
      console.log(this.form.pics)
    },
    handleSuccess (fileresponse, file, fileList) {
      //console.log(fileresponse)
      this.form.pics.push({
        pic:fileresponse.data.tmp_path
      })
        console.log(this.form.pics)
    },
    //添加商品
    async add(){
      //good_cat
      this.form.goods_cat=this.selectedOptions2.join(',')
      // 动态参数数组  map遍历数组 把返回值放入数组中 返回数组
      const arr1 = this.daDt;
      const arr1New = arr1.map(item => {
        return { attr_id: item.attr_id, attr_value: item.attr_vals };
      });

      // 静态参数数组
      const arr2 = this.daJt;
      const arr2New = arr2.map(item => {
        return { attr_id: item.attr_id, attr_value: item.attr_vals };
      });
      // 合并数组
      const arr = [...arr1New, ...arr2New];

      this.form.attrs = arr;

      const res=await this.$http.post(`goods`,this.form)
      console.log(res)
      this.$router.push({
        path:'/goods'
      })



    }
  }
}
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
.ql-container{
  min-height: 200px;
}
</style>
