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
            unique-opened
            default-active="1"
            class="el-menu-vertical-demo middle"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <i class="el-icon-menu"></i>
                  用户列表
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <i class="el-icon-location"></i>
                  角色列表
                </el-menu-item>
                <el-menu-item index="1-2">
                  <i class="el-icon-location"></i>
                  权限列表
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <i class="el-icon-location"></i>
                  商品列表
                </el-menu-item>
                <el-menu-item index="1-2">
                  <i class="el-icon-location"></i>
                  分类参数
                </el-menu-item>
                <el-menu-item index="1-3">
                  <i class="el-icon-location"></i>
                  商品分类
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <i class="el-icon-location"></i>
                  订单列表
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <i class="el-icon-location"></i>
                  数据报表
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  beforeCreate(){
    //验证是否存储token
    if(!localStorage.getItem('token')){
      this.$message.warning('请先登录')
      this.$router.push({
        path:"/login"
      })

    }

  },
  methods:{
    //退出登录
    lyout(){
      localStorage.clear()
      this.$router.push({
        path:"/login"
      })
      this.$message.success("退出成功")
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
