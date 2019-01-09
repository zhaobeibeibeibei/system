<template>
<el-card class="card">
 <my-brand le1="权限管理" le2="权限列表"></my-brand>
<el-row class="row">
  <el-col>
     <el-button type="primary">添加角色</el-button>
  </el-col>
</el-row>
 <el-table :data="tableData5" style="width: 100%" height="400px">
    <el-table-column type="expand" >
      <template slot-scope="data">
       <el-row v-for="(v,i) in data.row.children" :key="i">
         <el-col :span="4">
           <el-tag closable  type="" class="t" @close="de(data.row,v)">{{v.authName}}</el-tag>
           <span class="el-icon-arrow-right"></span>
         </el-col>
         <el-col :span="20">
           <el-row v-for="(v1,i) in v.children" :key="i" >
              <el-col :span="4">
                 <el-tag closable  type="success" @close="de(data.row,v1)" class="t">{{v1.authName}}</el-tag>
                 <span class="el-icon-arrow-right"></span>
              </el-col>
           <el-col :span="20" >
             <el-tag closable  class="t" v-for="(v2,i) in v1.children" @close="de(data.row,v2)" :key="i" type="warning">{{v2.authName}}</el-tag>
            </el-col>
           </el-row>
         </el-col>
       </el-row>
       <el-row v-if="data.row.children.length===0">
         <el-col>暂无任何权限</el-col>
       </el-row>
      </template>
    </el-table-column>
    <el-table-column
    type="index">
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="roleName">
    </el-table-column>
    <span>aaaa</span>
    <el-table-column
      label="角色描述"
      prop="roleDesc">
    </el-table-column>
   <el-table-column

      label="操作">
      <template slot-scope="data">
         <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="edit(data.row.id)"></el-button>
         <el-button size="mini" plain type="danger" icon="el-icon-delete" @click="deleteuser(data.row.id)" circle></el-button>
         <el-button size="mini" plaintype="success" icon="el-icon-check" circle  @click="open(data.row)"></el-button>
      </template>

    </el-table-column>
  </el-table>
<el-dialog
  title="分配权限"
  :visible.sync="dialogVisible"
  width="50%"
  >
    <!--
      :default-expanded-keys="[2, 3]" 默认张开项
      :default-checked-keys="[5]" 默认选中项
   -->
  <el-tree
  :data="data2"
  default-expand-all
 :default-checked-keys=checkdeArr
  show-checkbox
  node-key="id"
  ref="da"
  :props="defaultProps">
</el-tree>
  <span slot="footer" class="dialog-footer">
     {{this.id}}
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="success()">确 定</el-button>
  </span>
</el-dialog>
</el-card>

</template>

<script>
export default {
  data () {
    return {
      tableData5: [],
      dialogVisible: false,
      data2: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      checkdeArr: [],
      id: 0

    }
  },
  created () {
    this.getdata()
  },
  methods: {
    async getdata () {
      const res = await this.$http.get('roles')
      // console.log(res)
      this.tableData5 = res.data.data
    },
    // 删除权限
    async de (user, rightid) {
      console.log(user)
      // console.log(rightid)
      // roles/:roleId/rights/:rightId
      const res = await this.$http.delete(`roles/${user.id}/rights/${rightid.id}`)
      // console.log(res)
      user.children = res.data.data
    },
    // 树形权限
    async open (data) {
      this.id = data.id
      console.log(data)
      // rights/:type
      this.dialogVisible = true
      const res = await this.$http.get(`rights/tree`)
      // console.log(res)
      this.data2 = res.data.data
      const arr = []
      data.children.forEach(element => {
        element.children.forEach(el => {
          el.children.forEach(el1 => {
            arr.push(el1.id)
          })
        })
      })
      this.checkdeArr = arr
    },
    //
    async success () {
      const arr1 = this.$refs.da.getHalfCheckedKeys()
      const arr2 = this.$refs.da.getCheckedKeys()
      const arr3 = [...arr1, ...arr2].join(',')

      console.log(arr3)
      // roles/:roleId/rights

      const res = await this.$http.post(`roles/${this.id}/rights`, {
        rids: arr3
      })
      console.log(res)
      this.dialogVisible = false
      this.getdata()
    }

  }

}
</script>

<style>
.card{
  height: 100%;
}
.row{
  margin-top: 20px
}
.t{
  margin-top: 10px;
  margin-right: 5px;
}
</style>
