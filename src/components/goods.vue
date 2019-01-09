<template>
  <div>
    <el-card class="card">
      <my-brand le1="商品管理" le2="商品列表"></my-brand>
      <!-- 搜索框 -->
      <el-row class="row">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="query" clearable @clear="gteu()" class="sou">
            <el-button slot="append" icon="el-icon-search" @click="getuser()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="15">
          <el-button type="primary" plain @click="$router.push({path:'/goodsadd'})">添加商品</el-button>
        </el-col>
      </el-row>

      <el-table ref="singleTable" height="400px" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="goods_name" label="商品名称" width="200"></el-table-column>
        <el-table-column property="goods_price" label="商品价格" width="120"></el-table-column>
        <el-table-column property="goods_weight" label="商品重量"></el-table-column>
        <el-table-column property="upd_time" label="创建日期">
          <template slot-scope="data">
            {{data.row.upd_time | setdate}}

          </template>
        </el-table-column>
       <el-table-column prop="address" label="操作">
        <template slot-scope="data">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="edit(data.row.id)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            @click="deleteuser(data.row.id)"
            circle
          ></el-button>

        </template>
      </el-table-column>
      </el-table>
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[6, 12, 18, 24]"
      :page-size="6"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      query: '',
      pagenum: 1,
      pagesize: 6,
      total: -1
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    // query  查询参数
    // pagenum 当前页码
    // pagesize 每页显示条数
    async getdata () {
      const res = await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log(res)
      const {data: {data: {total, goods}, meta: {msg, status}}} = res
      this.tableData = goods
      this.total = total
    },
    handleSizeChange (val) {
      this.pagenum = 1
      this.pagesize = val
      this.getdata()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getdata()
      console.log(`当前页: ${val}`)
    }

  }

}
</script>

<style>
.card {
  height: 100%;
}
.row {
  margin-top: 20px;
}
</style>
