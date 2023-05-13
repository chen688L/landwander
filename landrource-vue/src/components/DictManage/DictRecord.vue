<template>
  <div class="dictType">
    <div class="search">
      <div style="margin-bottom: 20px">
        <label>日期范围：</label>
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <label>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</label>
      <el-input
        style="width: 200px; margin-right: 50px"
        placeholder="请输入"
        clearable
        v-model="searchValue"
        @clear="cancelSearch"
      />

      <el-button type="primary" icon="el-icon-search" @click="searchRecord()"
        >搜索</el-button
      >
      <el-button type="primary" icon="el-icon-delete" @click="searchRecordClean()"
        >清空搜索</el-button
      >
    </div>
    <!-- 表格视图 -->
    <el-table :data="tableData">
      <el-table-column prop="searchid" label="编号" width="120">
      </el-table-column>
      <el-table-column prop="content" label="记录" width="120">
      </el-table-column>
      <el-table-column prop="state" label="热门搜索" width="120">
        <template slot-scope="scope">
          <img
            v-if="scope.row.state == 1"
            style="width: 30px; height: 30px"
            src="../../assets/static/hot.png"
          />
          {{ scope.row.state == 1 ? "热门" : "记录" }}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建日期" sortable width="180">
        <template slot-scope="scope">
          {{ scope.row.createdAt | getTime }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="修改日期" sortable width="180">
        <template slot-scope="scope">
          {{ scope.row.updatedAt | getTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <div class="edit">
            <div
              class="edit2"
              v-if="scope.row.state == 1"
              @click="updateRecord(scope.row, 2)"
            >
              <i class="el-icon-top"></i>取消置顶
            </div>
            <div
              class="edit2"
              v-if="scope.row.state == 2"
              @click="updateRecord(scope.row, 1)"
            >
              <i class="el-icon-top"></i>置顶
            </div>
            <div class="edit3" @click="deleteType(scope.row)">
              <i class="el-icon-delete"></i>删除
            </div>
          </div>
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

    <!-- 新增类型 -->
    <el-dialog title="新增流转方式" width="35%" :visible.sync="insertVisible">
      <div class="insert">
        <label>流转方式：</label>
        <el-input v-model="dictValue"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insertVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFs()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      index: -1,
      dictValue: "",
      oldValue: "",
      tableData: [],
      insertVisible: false,
      searchValue: "",
      pageSize: 8, //表格行数
      pageNum: 1, //当前页数
      totalNum: 11, //总页数
      value1: "",
    };
  },
  mounted() {
    this.getRecord();
    this.getRecordNum();
  },
  methods: {
    searchRecordClean(){
      this.value1=""
      this.searchRecord()
    },
    searchRecord() {
      this.getRecord();
      this.getRecordNum();
    },
    updateRecord(row, state) {
      this.$apis
        .updateRecord({
          state: state,
          searchid: row.searchid,
        })
        .then((res) => {
          this.$message.success("修改置顶成功");
          this.getRecord();
          this.getRecordNum();
        });
    },
    currentChange(newSize) {
      this.pageNum = newSize;
      this.getRecord();
    },
    cancelSearch() {
      this.searchValue = "";
      this.getRecord();
      this.getRecordNum();
    },
    handleNodeClick(data) {
      console.log(data);
    },
    getRecord() {
      this.$apis
        .checkRecord({
          content: this.searchValue,
          fromTime: this.value1[0],
          toTime: this.value1[1],
          state: null,
          pageSize: (this.pageNum - 1) * this.pageSize,
          pageNum: this.pageSize,
        })
        .then((res) => {
          console.log(res);
          this.tableData = res.data;
        });
    },
    getRecordNum() {
      this.$apis
        .checkRecordNum({
          content: this.searchValue,
          fromTime: this.value1[0],
          toTime: this.value1[1],
          state: null,
        })
        .then((res) => {
          this.totalNum = res.data;
          console.log(this.totalNum);
        });
    },
    addFs() {
      this.$apis
        .insertFs({
          dictValue: this.dictValue,
        })
        .then((res) => {
          if (res.data == 1) {
            this.$message.success("方式字典新增成功！");
            this.getRecord();
            this.insertVisible = false;
          } else {
            this.$message.error("方式字典新增失败！");
          }
        });
    },
    updateType(row) {
      console.log(row);
      console.log(this.oldValue);
      if (row.dictValue != this.oldValue) {
        this.$apis.updateFs(row).then((res) => {
          this.$message.success("已修改");
        });
      }
      this.index = -1;
    },
    deleteType(row) {
      this.$apis
        .deleteRecord({
          searchid: row.searchid,
        })
        .then((res) => {
          this.getRecord();
          this.getRecordNum();
          this.$message.success("已删除");
        });
    },
  },
};
</script>
  
  <style lang="less" scoped>
.search {
  margin: 20px 0;
  button {
    margin: 0 20px;
  }
  button:last-child {
    margin: 0;
  }
}
label {
  font-size: 14px;
}
.edit {
  display: flex;
  justify-content: space-around;
  .edit2 {
    cursor: pointer;
    text-decoration: underline;
    color: rgb(12, 80, 227);
  }
  .edit3 {
    color: red;
    text-decoration: underline;
    cursor: pointer;
  }
}

.insert {
  width: 350px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    width: 200px;
  }
}

.typeInput {
}
</style>