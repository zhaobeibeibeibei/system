<template>
<div>
  <el-card class="card">
    <my-brand le1="权限管理" le2="权限列表"></my-brand>

    <el-table
    class="table"
    :data="tableData"
    height="500px"

    border
    style="width: 100%">
    <el-table-column
      type="index"
      width="180">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径">
    </el-table-column>
      <el-table-column
      prop="level"
      label="层级">
      <template slot-scope="data">
        <span v-if="data.row.level==='0'">一级</span>
        <span v-if="data.row.level==='1'">二级</span>
        <span v-if="data.row.level==='2'">三级</span>

      </template>
    </el-table-column>
  </el-table>

  </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    async getdata () {
      const res = await this.$http.get('rights/list')
      // console.log(res)
      this.tableData = res.data.data
    }
  }

}
</script>

<style>
.card{
height:650px;
}
.table{
  margin-top: 20px;
  overflow: hidden;
}
</style>
