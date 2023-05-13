<template>
  <div class="userlist">
    <!-- 头部搜索 -->
    <div class="search">
      <input
        placeholder="请输入角色名"
        class="searchValue"
        v-model="searchValue"
        clearable
        @clear="getAllrole"
      />
      <el-button type="primary" icon="el-icon-search" @click="search()"
        >搜索</el-button
      >
      <el-button type="primary" icon="el-icon-plus" @click="addVisible = true"
        >新增</el-button
      >
    </div>
    <!-- 表格数据 -->
    <div>
      <el-table
        class="usertable"
        :data="tableData"
        style="width: 720px; margin: 30px auto; font-size: 12px"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        size="small"
      >
        <el-table-column prop="rid" label="编号" width="120"> </el-table-column>
        <el-table-column prop="role" label="角色" width="120">
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180" sortable>
          <template slot-scope="scope">
            {{ scope.row.createdAt | getTime }}
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新时间" width="180" sortable>
          <template slot-scope="scope">
            {{ scope.row.updatedAt | getTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <div class="edit">
              <div class="edit2" @click="openUpdate(scope.row)"><i class="el-icon-edit"></i>编辑</div>
              <div class="edit3" @click="openDelete(scope.$index, scope.row)">
                <i class="el-icon-delete"></i>删除
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pagination"
      :page-size="pageSize"
      @current-change="currentChange"
      layout="total, prev, pager, next"
      :total="totalNum"
    >
    </el-pagination>

    <!-- 新增角色 -->
    <el-dialog title="新增角色" :visible.sync="addVisible">
      <el-form :model="form">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入角色名称', trigger: 'blur' },
          ]"
        >
          <el-input v-model="form.role" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="角色权限"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入角色权限', trigger: 'blur' },
          ]"
        >
          <el-input v-model="form.rolekey" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除角色 -->
    <el-dialog title="提示" :visible.sync="deleteVisible" width="30%" center>
      <i
        class="el-icon-warning-outline"
        style="color: red; margin-right: 10px"
      ></i>
      <span>确定要删除 {{ rolename }} 角色吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRole()">确 定</el-button>
      </span>
    </el-dialog>

      <!-- 修改角色 -->
      <el-dialog title="修改" :visible.sync="updateVisible">
      <el-form :model="updateform">
        <el-form-item
          label="角色编号"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入角色名称', trigger: 'blur' },
          ]"
        >
          <el-input v-model="updateform.rid" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入角色名称', trigger: 'blur' },
          ]"
        >
          <el-input v-model="updateform.role" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="角色权限"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入角色权限', trigger: 'blur' },
          ]"
        >
          <el-input v-model="updateform.rolekey" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRole()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
    
    <script>
export default {
  name: "RoleManage",
  data() {
    return {
      searchValue: "", //搜索内容
      tableData: [], //表格数据
      pageSize: 5, //表格行数
      pagerNum: 1, //当前页数
      totalNum: 5, //总页数
      deleteVisible: false, //控制删除用户弹出框
      rolename: "", //删除用户提示用户名
      roleId: "", //删除用户的id
      formLabelWidth: "120px", //编辑和详情 文本框长度
      form: {
        //新增角色
        role: "",
        rolekey: "",
      },
      updateform:{},
      addVisible: false,
      updateVisible: false,
      rules: {
        role: [
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        rolekey: [
          { required: true, message: "请输入角色权限", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getAllrole();
    this.getRoleNum();
  },
  methods: {
    search() {
      this.getAllrole();
      this.searchNum();
    },
    searchNum() {
      this.$apis
        .getRoleNum({
          searchValue: this.searchValue,
        })
        .then((res) => {
          this.totalNum = res.data;
        });
    },
    getRoleNum() {
      this.$apis
        .getRoleNum({})
        .then((res) => {
          this.totalNum = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllrole() {
      this.$apis
        .checkRole({
          role: this.searchValue,
          pageSize: (this.pagerNum - 1) * this.pageSize,
          pageNum: this.pageSize,
        })
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    currentChange(newSize) {
      this.pagerNum = newSize;
      this.getAllrole();
    },
    openDelete(index, row) {
      this.deleteVisible = true;
      this.rolename = row.role;
      this.roleId = row.rid;
    },
    deleteRole() {
      this.$apis
        .deleteRole({
          id: this.roleId,
        })
        .then((res) => {
          this.$message({
            message: "用户删除成功！",
            type: "success",
          });
          this.getAllrole();
          this.getRoleNum();
          this.deleteVisible = false;
        });
    },
    openUpdate(row){
      this.updateVisible = true
      this.updateform = row
    },
    updateRole() {
      console.log(this.updateform);
      this.updateform.createdAt=''
      this.$apis
        .updateRole(this.updateform)
        .then((res) => {
          this.$message({
            message: "角色修改成功！",
            type: "success",
          });
          this.getAllrole();
          this.getRoleNum();
          this.updateVisible = false;
        });
    },
    addRole() {
      this.$apis
        .addRole(this.form)
        .then((res) => {
          this.$message({
            message: "添加角色成功",
            type: "success",
          });
          this.getAllrole();
          this.getRoleNum();
          this.addVisible = false;
        });
    },
  },
};
</script>
  
  <style lang="less" scoped>
.userlist {
  background: #fff;
  margin: 10px auto;
  padding-top: 20px;
}
.search {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-bottom: 10px;
  .searchValue {
    height: 38px;
    width: 230px;
    border: 1px solid #dcdfe6;
    line-height: 38px;
    outline: 0;
    padding: 0 15px;
    margin-left: 10px;
  }
  button {
    margin-left: 30px;
  }
}
.el-select > .el-input {
  width: 200px;
}
.usertable {
  margin-top: 20px;
}
.edit {
  display: flex;
  justify-content: space-around;
}
.edit1 {
  cursor: pointer;
  text-decoration: underline;
  color: rgb(108, 112, 115);
}
.edit2 {
  cursor: pointer;
  text-decoration: underline;
  color: rgb(12, 80, 227);
}
.edit3 {
  cursor: pointer;
  color: red;
  text-decoration: underline;
}
.pagination {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.el-input__inner {
  height: 30px;
}

.avatar-uploader-icon {
  line-height: 146px;
  width: 146px;
}
.userInfoInput {
  width: 380px;
}
.upavater {
  cursor: pointer;
  text-decoration: underline;
  margin: 10px;
  line-height: 60px;
  font-size: 12px;
}
.upImg {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  padding: 16px;
  cursor: pointer;
  line-height: 146px;
  margin-right: 8px;
}
.idimg {
  width: 200px;
  height: 150px;
}
.idimgspan {
  margin-left: 5px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: blue;
  position: relative;
}
.hiddenInput {
  width: 70px;
  height: 70px;
  z-index: 6;
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
}
</style>