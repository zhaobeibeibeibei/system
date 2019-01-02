<template>
<div id="fatner">
<el-form :label-position="labelPosition" label-width="80px" class="from" >
  <h2>用户登陆</h2>
  <el-form-item label="用户">
    <el-input v-model="formdata.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formdata.password"></el-input>
  </el-form-item>
  <el-button type="primary" class="btn" @click="check()">登陆</el-button>
</el-form>
</div>

</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      formdata: {
        username: '',
        password: ''

      }
    }
  },
  methods: {
    async check () {
    const res=await this.$http.post('login', this.formdata)
    const {data:{data,meta:{msg,status}}}=res
    if(status===200){
      localStorage.setItem("token",data.token)
      this.$router.push({
      path:'/'
        })
        }else{
          this.$message.warning(msg);
        }

    }

  }
}
</script>

<style>
#fatner{
  background-color: lightslategray;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.from{
  background-color:#fff;
  width: 400px;
  padding: 20px;
  border-radius: 10px;

}
.from .btn{
  width: 100%;
}
</style>
