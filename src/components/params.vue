<template>
  <el-card class="card">
    <my-brand le1="商品管理" le2="商品列表"></my-brand>
    <el-alert title="注意只允许为三级分类设置参数" type="warning" center show-icon class="title"></el-alert>

    <el-form>
      <el-form-item label="请选择">
        {{selectedOptions2}}
        <el-cascader
          clearable
          expand-trigger="hover"
          :options="options"
          v-model="selectedOptions2"
          :props="props"
          :show-all-levels="false"
          @change="dt()"
        ></el-cascader>
      </el-form-item>
    </el-form>

    <el-tabs type="card" v-model="active" @tab-click="changetTad()">
      <el-tab-pane label="动态参数" name="1">
        <!-- 按钮 -->
        <el-button type="primary" plain :disabled="selectedOptions2.length===0">设置动态参数</el-button>
        <!-- 表格 -->
        <el-table :data="daDt" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="data">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-tag
                  v-for="(v,i) in data.row.attr_vals"
                  :key="i"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(data.row,v)"
                >{{v}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(data.row)"
                  @blur="handleInputConfirm(data.row)"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作" prop="name">
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
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          height="300px"

          style="width: 100%"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="attr_name" label="属性名称" width="120"></el-table-column>
          <el-table-column property="attr_vals" label="属性值" width="140"></el-table-column>
          <el-table-column property="address" label="操作" width="140">
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
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      selectedOptions2: [],
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      active: "1",
      daDt: [],
      inputVisible: false,
      inputValue: "",
      tableData:[]
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    async getdata() {
      const res = await this.$http.get("categories?type=3");
      // console.log(res)
      this.options = res.data.data;
    }, //动态数据
    async dt() {
      if (this.selectedOptions2.length === 3 && this.active === "1") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions2[2]}/attributes?sel=many`
        );
        console.log(res);
        this.daDt = res.data.data;
        this.daDt.forEach(item => {
          item.attr_vals.length === 0
            ? []
            : (item.attr_vals = item.attr_vals.split(","));
        });
      }
      if (this.selectedOptions2.length === 3 && this.active === "2") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions2[2]}/attributes?sel=only`
        );
      }
    },
    //tab改变时触发
    async changetTad() {
      if (this.selectedOptions2.length === 3 && this.active === "1") {
        this.dt();
      }

      if (this.selectedOptions2.length === 3 && this.active === "2") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions2[2]}/attributes?sel=only`
        );
        this.tableData=res.data.data
        console.log(res);
      }
    },
    //动态tab
    async handleClose(arr, v) {
      //console.log(arr.attr_vals)
      arr.attr_vals.splice(arr.attr_vals.indexOf(v), 1);
      console.log(arr.attr_vals);
      //
      const putdata = {
        attr_name: arr.attr_name,
        attr_vals: arr.attr_vals.join(","),
        attr_sel: arr.attr_sel
      };
      const res = await this.$http.put(
        `categories/${this.selectedOptions2[2]}/attributes/${arr.attr_id}`,
        putdata
      );
      console.log(res);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    async handleInputConfirm(arr) {
      let inputValue = this.inputValue;
      if (inputValue) {
        arr.attr_vals.push(inputValue);
      }
      const putdata = {
        attr_name: arr.attr_name,
        attr_vals: arr.attr_vals.join(","),
        attr_sel: arr.attr_sel
      };
      const res = await this.$http.put(
        `categories/${this.selectedOptions2[2]}/attributes/${arr.attr_id}`,
        putdata
      );
      console.log(res);

      this.inputVisible = false;
      this.inputValue = "";
    }
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
