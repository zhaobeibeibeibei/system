<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row>
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" clearable @clear="gteu()" class="sou">
          <el-button slot="append" icon="el-icon-search" @click="getuser()"></el-button>
        </el-input>
        <el-button type="primary" plain @click="add()">点击添加</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table height="300px" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="100"></el-table-column>
      <el-table-column label="创建日期" width="150">
        <template slot-scope="data">{{data.row.create_time | setdate}}</template>
      </el-table-column>
      <el-table-column label="用户状态" width="120">
        <template slot-scope="data">
          <el-switch
            v-model="data.row.mg_state"
            @change="changest(data.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
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
          <el-button
            size="mini"
            plaintype="success"
            icon="el-icon-check"
            circle
            @click="setmager(data.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 对话框 -->
    <!-- 点击添加 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 点击编辑 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑管理员 -->
    <el-dialog title="编辑管理员权限" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="用户名:" :label-width="formLabelWidth">{{mangername}}</el-form-item>
        <el-form-item label="角色分配:" :label-width="formLabelWidth">
          <el-select v-model="regionid">
            <el-option label="请选择---" :value="-1" disabled></el-option>
            <el-option v-for="(v,i) in jiuese" :key="i" :label="v.roleName" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitedit()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: -1,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisible: false,
      form: {
        username: '',
        email: '',
        mobile: '',
        password: ''
      },
      formLabelWidth: '120px',
      mangername: '',
      jiuese: [],
      regionid: -1,
      uid: ''
    }
  },
  created () {
    // this.gtedata()
    this.gtedata()
  },
  methods: {
    // 获取所有用户
    async gtedata () {
      // 配置请求头
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      )
      console.log(res)
      const {
        data: {
          data: { total, users },
          meta: { msg, status }
        }
      } = res
      if (status === 200) {
        this.tableData = users
        this.total = total
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    },
    // 分页设置
    handleSizeChange (val) {
      this.pagenum = 1
      this.pagesize = val
      this.gtedata()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // 当前页码
      this.pagenum = val
      this.gtedata()
      console.log(`当前页: ${val}`)
    },
    // 搜索用户
    getuser () {
      this.pagenum = 1
      this.gtedata()
    },
    gteu () {
      this.gtedata()
    },
    // 添加用户--x显示弹出框
    add () {
      this.dialogFormVisibleAdd = true
    },
    // 添加用户
    async addUser () {
      const res = await this.$http.post('users', this.form)
      console.log(res)
      const {
        data: {
          meta: { msg, status }
        }
      } = res
      if (status === 201) {
        this.dialogFormVisibleAdd = false
        this.$message.success(msg)
        this.gtedata()
      }
      this.form = ''
    },
    // 编辑用户
    async edit (id) {
      this.dialogFormVisibleEdit = true
      const res = await this.$http.get(`users/${id}`)
      console.log(res)
      const {
        data: {
          data,
          meta: { status }
        }
      } = res
      if (status === 200) {
        this.form = data
      }
    },
    // 提交编辑信息
    async editUser () {
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      console.log(res)
      const {
        data: {
          meta: { status, msg }
        }
      } = res
      if (status === 200) {
        this.dialogFormVisibleEdit = false
        this.gtedata()
      } else {
        this.$message.warning(msg)
      }
    },
    // 删除用户
    deleteuser (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${id}`)
          const {
            data: {
              meta: { status }
            }
          } = res
          if (status === 200) {
            this.gtedata()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 修改用户状态
    async changest (user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      )
      const {
        data: {
          meta: { msg, status }
        }
      } = res
      if (status === 200) {
        this.$message.success(msg)
        this.gtedata()
      }
    },
    // 修改管理员权限
    async setmager (manger) {
      this.mangername = manger.username // 用户名
      this.uid = manger.id
      this.dialogFormVisible = true
      const res = await this.$http.get(`users/${manger.id}`)
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = res
      this.regionid = data.rid // 角色id

      // 获取角色列表
      const res2 = await this.$http.get('roles')
      this.jiuese = res2.data.data
    },
    // 提交用户角色编辑
    submitedit () {
      this.$http.put(`users/${this.uid}/role`, {
        rid: this.regionid
      })
      this.dialogFormVisible = false
    }
  }
}
</script>

<style>
.card {
  height: 100%;
}
.sou {
  margin-top: 20px;
  width: 400px;
}
</style>
