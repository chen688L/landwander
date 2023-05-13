<template>
  <div class="dictType">
    <div class="search">
      <label>类型：</label>
      <el-input
        style="width: 300px"
        placeholder="请输入"
        clearable
        v-model="searchValue"
        @clear="cancelSearch"
      />
      <el-button type="primary" icon="el-icon-search" @click="getAllType()"
        >搜索</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="insertVisible = true"
        >新增</el-button
      >
    </div>
    <div class="view">
      <el-button @click="isview = true">表格视图</el-button>
      <el-button @click="isview = false">树形视图</el-button>
    </div>
    <!-- 表格视图 -->
    <el-table v-if="isview" :data="tableData" height="460">
      <el-table-column prop="dictCode" label="编号" width="120">
      </el-table-column>
      <el-table-column prop="dictType" label="土地类型" width="120">
      </el-table-column>
      <el-table-column prop="dictValue" label="子类型" width="120">
        <template slot-scope="scope">
          <div class="typeInput">
            <el-input
              focus
              v-if="index == scope.row.dictCode"
              v-model="scope.row.dictValue"
              @blur="updateType(scope.row)"
            />
            <span v-else>{{ scope.row.dictValue }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建日期" sortable width="180">
        <template slot-scope="scope">
          {{ scope.row.createdAt | getTime }}
        </template>
      </el-table-column>
      <el-table-column prop="updateAt" label="修改日期" sortable width="180">
        <template slot-scope="scope">
          {{ scope.row.updateAt | getTime }}
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
            <div class="edit2" @click="updateInput(scope.row)">
              <i class="el-icon-edit"></i>修改
            </div>
            <div class="edit3" @click="deleteType(scope.row)">
              <i class="el-icon-delete"></i>删除
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 树形视图 -->
    <div v-else>
      <el-tree :data="treedata" @node-click="handleNodeClick"></el-tree>
    </div>

    <!-- 新增类型 -->
    <el-dialog title="新增土地类型" width="35%" :visible.sync="insertVisible">
      <div class="insert">
        <label>类 型：</label>
        <el-input v-model="dictType"></el-input>
      </div>
      <div class="insert">
        <label>子类型：</label>
        <el-input v-model="dictValue"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insertVisible = false">取 消</el-button>
        <el-button type="primary" @click="addType()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: -1,
      dictType: "",
      dictValue: "",
      oldValue: "",
      tableData: [],
      insertVisible: false,
      treedata: [],
      isview: true,
      searchValue: "",
    };
  },
  mounted() {
    this.getAllType();
    this.getTypeValue();
  },
  methods: {
    cancelSearch() {
      this.searchValue = "";
      this.getAllType();
    },
    handleNodeClick(data) {
      console.log(data);
    },
    getTypeValue() {
      this.$apis.dictTypeValue().then((res) => {
        console.log(res);
        this.treedata = res.data;
      });
    },
    getAllType() {
      this.$apis
        .checkAlltype({
          dictLabel: "",
          dictValue: this.searchValue,
          dictType: this.searchValue,
        })
        .then((res) => {
          console.log(res.data);
          let tableData = res.data;
          this.tableData = tableData.reverse()
        });
    },
    addType() {
      this.$apis
        .insertType({
          dictLabel: this.dictValue,
          dictValue: this.dictValue,
          dictType: this.dictType,
        })
        .then((res) => {
          if (res.data == 1) {
            this.$message.success("类型字典新增成功！");
            this.getAllType();
            this.insertVisible = false;
          } else {
            this.$message.error("类型字典新增失败！");
          }
        });
    },
    updateInput(row) {
      this.index = row.dictCode;
      this.oldValue = row.dictValue;
    },
    updateType(row) {
      console.log(row);
      console.log(this.oldValue);
      if (row.dictValue != this.oldValue) {
        this.$apis.updateType(row).then((res) => {
          this.$message.success("已修改");
        });
      }
      this.index = -1;
    },
    deleteType(row) {
      this.$apis
        .deleteType({
          dictCode: row.dictCode,
        })
        .then((res) => {
          console.log("delete",res);
          this.getAllType();
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