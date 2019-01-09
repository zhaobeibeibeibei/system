<template>
  <div class="one">
    <el-container>
      <el-header class="header">
        <el-row>
          <el-col :span="3">
            <img src="@/assets/logo.png" alt>
          </el-col>
          <el-col :span="19" class="ziti">
            <h2>电商后台管理系统</h2>
          </el-col>
          <el-col :span="1" class="out">
            <a href="#" @click.prevent="lyout()">退出</a>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" >
          <el-menu
          router
            unique-opened
            default-active="1"
            class="el-menu-vertical-demo middle"
          >
            <el-submenu :index="''+v.order" v-for="(v,i) in data" :key="i">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{v.authName}}</span>
              </template>
              <el-menu-item-group v-for="(v1,i) in v.children" :key="i">
                <el-menu-item :index="v1.path">
                  <i class="el-icon-menu"></i>
                 {{v1.authName}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  beforeCreate () {
    // 验证是否存储token
    if (!localStorage.getItem('token')) {
      this.$message.warning('请先登录')
      this.$router.push({
        path: '/login'
      })
    }
  },
  created () {
    this.getdata()
  },
  data () {
    return {
      data: []

    }
  },
  methods: {
    // 退出登录
    lyout () {
      localStorage.clear()
      this.$router.push({
        path: '/login'
      })
      this.$message.success('退出成功')
    },
    // 左侧列表展示
    async getdata () {
      // menus
      const res = await this.$http.get('menus')
      console.log(res)
      this.data = res.data.data
    }
  }

}
</script>

<style>
.one {
  height: 100%;
  background-color: lightslategray;
}
.middle {
  height: 700px;
}
.header {
  background-color: skyblue;
}
.ziti {
  text-align: center;
  line-height: 60px;
}
.out {
  line-height: 60px;
}
</style>
