<template>
  <div class="picturemanage">
    <el-button type="primary" icon="el-icon-download">下载</el-button>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;"
      id="pictable"
      :cell-style="{ 'text-align': 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        header-align="center"
        type="selection"
        width="50"
      >
      </el-table-column>
     
      <el-table-column
        header-align="center"
        prop="tag"
        label="头像"
        width="100"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 40px; height: 40px"
            :src="url + scope.row.path"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="filename"
        label="文件名"
        width="150"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="path"
        label="存储地址"
        width="150"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="uid"
        label="创建者ID"
        width="150"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="createAt"
        label="创建时间"
        width="180"
      >
      <template slot-scope="scope">
            {{ scope.row.createAt | getTime}}
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
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      url: process.env.VUE_APP_BASE_API,
      totalNum:0,
      pageSize:5,
      pagecurrent:1
    };
  },
  mounted() {
    this.getPicture()
    this.getpicNum()
  },
  methods: {
    getpicNum(){
      this.$apis.picNum({
      }).then(res=>{
        this.totalNum = res.data
      }).catch(err=>{
      })
    },
    getPicture(){
      this.$apis
      .pictures({
        pageCurrent: (this.pagecurrent-1)*this.pageSize,
        pageSize: this.pageSize,
      })
      .then((res) => {
        this.tableData = res.data;
      })
      .catch((err) => {});
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    currentChange(newSize){
      this.pagecurrent = newSize
      this.getPicture()
    },
  },
};
</script>

<style scoped>
#pictable{
  font-size: 10px;
}
.picturemanage{
  margin: 10px auto;
  padding-top: 20px;
  width: 78%;
}
.pagination{
  text-align: center;
  padding-top: 10px;
}
</style>