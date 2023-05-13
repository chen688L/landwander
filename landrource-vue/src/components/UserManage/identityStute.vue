<template>
  <div class="identity">
    <div class="search">
      <label>认证状态：</label>
      <el-select
        class="itselect"
        v-model="ispass"
        placeholder="类型"
        @change="checkIspass(ispass)"
      >
        <el-option label="未认证" :value="0"></el-option>
        <el-option label="待认证" :value="1"></el-option>
        <el-option label="认证成功" :value="2"></el-option>
        <el-option label="认证失败" :value="3"></el-option>
      </el-select>
      <div style="font-size: 12px;color: #8d8d8d;margin-left: 10px;">提示: 认证信息不完整无法认证成功</div>
    </div>
    <el-table
      class="usertable"
      :data="tableData"
      style="width: 1080px;margin: auto;font-size: 12px;"
      :cell-style="{textAlign:'center'}"
      :header-cell-style="{'text-align':'center'}"
      size="small"
      :default-sort="{ prop: 'updatedAtTime', order: 'descending' }"
    >
      <el-table-column
        type="index"
        label="序号"
        width="80"
        fixed
      >
      </el-table-column>
      <el-table-column
        prop="realname"
        label="真实姓名"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="idcard"
        label="身份证号"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="tag"
        label="身份证正面"
        width="120"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 40px; height: 40px"
            :src="url + scope.row.identityU"
            fit="cover"
            :preview-src-list="srcList"
            @click="vbs(url + scope.row.identityU)"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture">无</i>
            </div></el-image
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="身份证反面"
        width="120"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 40px; height: 40px"
            :src="url + scope.row.identityD"
            fit="cover"
            :preview-src-list="srcList"
            @click="vbs(url + scope.row.identityD)"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture">无</i>
            </div></el-image
          >
        </template>
      </el-table-column>
      <el-table-column
        label="身份认证"
        width="120"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="info" v-if="scope.row.ispass == 0"
            >未认证</el-button
          >
          <el-button size="mini" type="warning" v-if="scope.row.ispass == 1"
            >待认证</el-button
          >
          <el-button size="mini" type="success" v-if="scope.row.ispass == 2"
            >认证成功</el-button
          >
          <el-button size="mini" type="danger" v-if="scope.row.ispass == 3"
            >认证失败</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        label="认证状态"
        width="220"
      >
        <template slot-scope="scope">
          <div class="edit">
            <el-select
              class="itselect"
              :ref="scope.row.uid"
              v-model="scope.row.ispass"
              placeholder="类型"
              @change="selectIspass(scope.row)"
            >
              <el-option label="未认证" :value="0"></el-option>
              <el-option label="待认证" :value="1"></el-option>
              <el-option label="认证成功" :value="2"></el-option>
              <el-option label="认证失败" :value="3"></el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="更新时间"
        width="180"
        sortable
      >
      <template slot-scope="scope">
            {{ scope.row.updatedAt | getTime}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :page-size="pageSize"
      @current-change="currentChange"
      layout="total, prev, pager, next"
      :total="totalNum"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "identityStute",
  data() {
    return {
      tableData: [], //表格数据
      pageSize: 5, //表格行数
      pagerNum: 1, //当前页数
      totalNum: 11, //总页数
      ispass: 1,
      url: process.env.VUE_APP_BASE_API, //头像前置url
      srcList: [],
    };
  },
  mounted() {
    this.getAlluser();
    this.searchNum();
  },
  methods: {
    getAlluser() {
      this.$apis
        .checkStatus({
          ispass: this.ispass,
          pageSize: (this.pagerNum - 1) * this.pageSize,
          pagerNum: this.pageSize,
        })
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchNum() {
      this.$apis
        .searchNum({
          searchValue: "",
          searchType: "",
          ispass: this.ispass
        })
        .then((res) => {
          this.totalNum = res.data;
          console.log("res:",res.data);
        });
    },
    currentChange(newSize) {
      this.pagerNum = newSize;
      this.getAlluser();
    },
    checkIspass(ispass){
      this.getAlluser()
      this.searchNum()
    },
    selectIspass(row) {
      console.log(this.$refs[row.uid].value);
      console.log(row.ispass);
      console.log("aaa-",this.tableData.ispass);
      this.$apis
        .updateUser(row)
        .then((res) => {
          this.$message({
            message: "修改成功！",
            type: "success",
          });
          this.getAlluser();
          this.searchNum();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    verifyIspass(row){
      let ver = ""
      if(row.ispass!=2){
        ver = true
      }else{
        ver = row.realname && row.idcard && row.identityU && row.identityD
      }
      if(ver){

      }
    },
    vbs(val) {
      this.srcList = [];
      this.srcList.push(val);
    },
  },
};
</script>

<style lang="less" scoped>
.identity{
  margin: 0 auto;
  padding-top: 20px;
}
.search{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
.el-pagination{
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
/deep/ .el-input{
  width: 200px;
}
</style>