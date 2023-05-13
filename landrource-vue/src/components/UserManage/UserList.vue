<template>
  <div class="userlist">
    <!-- 头部搜索 -->
    <div class="search">
      <label>用户类型：</label>
      <el-select v-model="searchType" class="searchType" placeholder="全部">
        <el-option label="全部" value=""></el-option>
        <el-option label="管理员" value="1"></el-option>
        <el-option label="普通用户" value="2"></el-option>
      </el-select>
      <input
        placeholder="请输入手机号"
        class="searchValue"
        v-model="searchValue"
      />
      <el-button type="primary" icon="el-icon-search" @click="search()"
        >搜索</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addUserVisbale = true"
        >新增</el-button
      >
    </div>
    <!-- 表格数据 -->
    <el-table
      class="usertable"
      :data="tableData"
      style="width: 960px;margin: auto;font-size: 12px;"
      :cell-style="{textAlign:'center'}"
      :header-cell-style="{'text-align':'center'}"
      size="small"
    >
      <el-table-column
        type="index"
        label="序号"
        width="80"
        fixed
      >
      </el-table-column>
      <el-table-column
        prop="tag"
        label="头像"
        width="80"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 40px; height: 40px"
            :src="url + scope.row.avater"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="昵称"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间"
        width="180"
        sortable
      >
      <template slot-scope="scope">
            {{ scope.row.createdAt | getTime}}
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
      <el-table-column
        label="身份认证"
        width="120"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="warning" v-if="scope.row.ispass == 1"
            >认证中</el-button
          >
          <el-button size="mini" type="success" v-if="scope.row.ispass == 2"
            >认证成功</el-button
          >
          <el-button size="mini" type="danger" v-if="scope.row.ispass == 3"
            >认证失败</el-button
          >
          <el-button size="mini" type="info" v-if="scope.row.ispass == 0"
            >未认证</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <div class="edit">
            <div class="edit2" @click="updateEdit(scope.row)"><i class="el-icon-edit"></i>编辑</div>
            <div class="edit3" @click="openDelete(scope.$index, scope.row)">
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
    <!-- 新增用户信息 -->
    <el-dialog title="新增用户" :visible.sync="addUserVisbale">
      <el-form :model="form" :rules="rules">
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="/api/upload/avater"
            :data="admin"
            :limit="6"
            multiple
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeuploadPath"
            :http-request="uploadPath"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.rid" placeholder="请选择角色">
            <el-option label="普通用户" value="2"></el-option>
            <el-option label="管理员" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="身份证号"
          :label-width="formLabelWidth"
          prop="idcard"
        >
          <el-input v-model="form.idcard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="真实姓名"
          :label-width="formLabelWidth"
          prop="realname"
        >
          <el-input v-model="form.realname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserVisbale = false">取 消</el-button>
        <el-button type="primary" @click="adduser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除用户 -->
    <el-dialog title="提示" :visible.sync="deleteVisible" width="30%" center>
      <i
        class="el-icon-warning-outline"
        style="color: red; margin-right: 10px"
      ></i>
      <span>确定要删除 {{ username }} 用户吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑和详情 -->
    <el-drawer
      title="个人详情"
      :visible.sync="userdils"
      direction="rtl"
      size="40%"
    >
      <el-row style="padding: 10px" justify="left">
        <el-col style="line-height: 40px; font-size: 14px" :span="4"
          >头像：</el-col
        >
        <el-col :span="20" style="display: flex; align-items: center">
          <el-image
            v-if="upimgUrl == ''"
            class="upImg"
            :src="url + userInfo.avater"
            fit="cover"
          ></el-image>
          <el-upload
            ref="upload"
            action="/api/upload/avater"
            :data="admin"
            :limit="1"
            list-type="picture-card"
            :before-upload="beforeuploadPath"
            :http-request="uploadPath2"
          >
            <span class="upavater">更换头像</span>
          </el-upload>
        </el-col>
      </el-row>

      <el-row style="padding: 10px" justify="left">
        <el-col style="line-height: 40px; font-size: 14px" :span="4"
          >UID：</el-col
        >
        <el-col :span="20">
          <el-input
            class="userInfoInput"
            disabled
            v-model="userInfo.uid"
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="padding: 10px">
        <el-col style="line-height: 40px; font-size: 14px" :span="4"
          >昵称：</el-col
        >
        <el-col :span="20">
          <el-input
            class="userInfoInput"
            v-model="userInfo.username"
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="padding: 10px">
        <el-col style="line-height: 40px; font-size: 14px" :span="4"
          >手机号：</el-col
        >
        <el-col :span="20">
          <el-input
            class="userInfoInput"
            v-model="userInfo.phone"
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="padding: 10px">
        <el-col style="line-height: 40px; font-size: 14px" :span="4"
          >身份证号：</el-col
        >
        <el-col :span="20">
          <el-input
            class="userInfoInput"
            v-model="userInfo.idcard"
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="padding: 10px">
        <el-col style="line-height: 40px; font-size: 14px" :span="4"
          >真实姓名：</el-col
        >
        <el-col :span="20">
          <el-input
            class="userInfoInput"
            v-model="userInfo.realname"
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="padding: 10px">
        <el-col style="line-height: 40px; font-size: 14px" :span="4"
          >身份证正面：</el-col
        >
        <el-col :span="20">
          <img class="idimg" :src="idUrlU!=''?url + idUrlU:''" />
          <span class="idimgspan"
            >修改图片
            <input
              @change="getImgUrl($event,1)"
              ref="file"
              title=""
              type="file"
              accept="image/*"
              class="hiddenInput"
          /></span>
        </el-col>
      </el-row>
      <el-row style="padding: 10px">
        <el-col style="line-height: 40px; font-size: 14px" :span="4"
          >身份证反面：</el-col
        >
        <el-col :span="20">
          <img class="idimg" :src="idUrlD!=''?url + idUrlU:''" />
          <span class="idimgspan"
            >修改图片
            <input
              @change="getImgUrl($event,2)"
              ref="file"
              title=""
              type="file"
              accept="image/*"
              class="hiddenInput"
          /></span>
        </el-col>
      </el-row>
      <el-row style="padding: 10px">
        <el-col style="line-height: 40px; font-size: 14px" :span="4"
          >认证状态：</el-col
        >
        <el-col :span="20">
          <el-select
              class="itselect"
              v-model="userInfo.ispass"
              placeholder="类型"
            >
              <el-option label="未认证" :value="0"></el-option>
              <el-option label="认证中" :value="1"></el-option>
              <el-option label="认证成功" :value="2"></el-option>
              <el-option label="认证失败" :value="3"></el-option>
            </el-select>
        </el-col>
      </el-row>
      <el-row style="padding: 10px">
        <el-col style="line-height: 40px; font-size: 14px" :span="4"
          >性别：</el-col
        >
        <el-col :span="20">
          <el-select
            class="userInfoInput"
            v-model="userInfo.sex"
          >
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="padding: 10px">
        <el-col style="line-height: 40px; font-size: 14px" :span="4"
          >角色：</el-col
        >
        <el-col :span="20">
          <el-select
            class="userInfoInput"
            v-model="userInfo.rid"
          >
            <el-option label="普通用户" value="2"></el-option>
            <el-option label="管理员" value="1"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="padding: 10px">
        <el-col style="line-height: 40px; font-size: 14px" :span="4"
          >创建时间：</el-col
        >
        <el-col :span="20">
          <el-input
            class="userInfoInput"
            disabled
            :value="userInfo.createdAt | getTime"
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="padding: 10px">
        <el-col style="line-height: 40px; font-size: 14px" :span="4"
          >更新时间：</el-col
        >
        <el-col :span="20">
          <el-input
            disabled
            class="userInfoInput"
            :value="userInfo.updatedAt | getTime"
          ></el-input>
        </el-col>
      </el-row>
      <el-button
        @click="updateUser()"
        type="primary"
        style="margin: 30px 10px"
      >
        确认修改
      </el-button>
    </el-drawer>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      searchType: "", //搜索用户类型
      searchValue: "", //搜索内容
      tableData: [], //表格数据
      pageSize: 5, //表格行数
      pagerNum: 1, //当前页数
      totalNum: 11, //总页数
      url: process.env.VUE_APP_BASE_API, //头像前置url
      addUserVisbale: false, //控制新增用户弹出框
      deleteVisible: false, //控制删除用户弹出框
      userdils: false, //控制编辑弹出框
      username: "", //删除用户提示用户名
      userId: "", //删除用户的id
      imgUrl: "", //新增 图片链接地址
      upimgUrl: "", //更改 图片链接地址
      idUrlU: "", //更改 图片链接地址
      idUrlD: "", //更改 图片链接地址
      form: {
        //新增用户信息
        phone: "",
        password: "",
        name: "",
        sex: "",
        rid: "",
        idcard: "",
        realname: "",
      },
      userInfo: {
        sex: "",
        ispass: "",
        rid: "",
        createdAt: "",
        updatedAt: "",
        avater: "",
        identityU:"",
        identityD:""
      }, //编辑和详情 用户信息
      formLabelWidth: "120px", //编辑和详情 文本框长度
      admin: {
        //上传头像的用户
        uid: localStorage.getItem('uid'),
      },
      rules: {
        name: [
          { required: false, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入11位数的手机号",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        sex: [{ required: false, message: "请选择性别", trigger: "change" }],
        idcard: [
          { required: false, message: "请输入身份证号", trigger: "blur" },
        ],
        realname: [
          { required: false, message: "请输入真实姓名", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getAlluser();
    this.getUserNum();
  },
  methods: {
    search() {
      this.searchContent();
      this.searchNum();
    },
    searchContent() {
      this.$apis
        .search({
          searchValue: this.searchValue,
          searchType: this.searchType,
          pageSize: (this.pagerNum - 1) * this.pageSize,
          pagerNum: this.pageSize,
        })
        .then((res) => {
          this.tableData = res.data;
        });
    },
    searchNum() {
      this.$apis
        .searchNum({
          searchValue: this.searchValue,
          searchType: this.searchType,
          ispass: null
        })
        .then((res) => {
          this.totalNum = res.data;
        });
    },
    updateUser() {
      this.userInfo.avater = this.upimgUrl == "" ? this.userInfo.avater : this.upimgUrl;
      this.userInfo.rid = this.ridChangeB(this.userInfo.rid);
      this.userInfo.identityU = this.idUrlU
      this.userInfo.identityD = this.idUrlD
      console.log("user:",this.userInfo);
      let user = this.userInfo
      this.$apis
        .updateUser(user)
        .then((res) => {
          console.log(res);
          this.userdils = false;
          this.upimgUrl = "";
          this.$refs.upload.clearFiles();
          this.$message({
            message: "修改成功！",
            type: "success",
          });
          this.form = {
            phone: "",
            password: "",
            name: "",
            sex: "",
            rid: "",
            idcard: "",
            realname: "",
          },
          this.getAlluser();
          this.getUserNum();
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
    adduser() {
      this.$apis
        .addUser({
          avater: this.imgUrl,
          phone: this.form.phone,
          password: this.form.password,
          username: this.form.name,
          sex: this.form.sex,
          rid: this.form.rid,
          idcard: this.form.idcard,
          realname: this.form.realname,
        })
        .then((result) => {
          this.$message({
            message: "用户添加成功！",
            type: "success",
          });
          this.addUserVisbale = false;
          this.getAlluser()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.uploadPath(file);
    },
    beforeuploadPath(file) {
      const isJPG =
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("仅支持jpg，png，jpeg格式的图片！");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    uploadPath(item) {
      let formData = new FormData();
      formData.append("file", item.file);
      formData.append("uid", localStorage.getItem('uid'));
      this.$apis
        .upload(formData)
        .then((res) => {
          console.log("文件上传返回：" + res.data);
          this.imgUrl = res.data;
        })
        .catch((error) => {
          console.log("文件上传异常:" + error);
        });
    },
    uploadPath2(item) {
      let formData = new FormData();
      formData.append("file", item.file);
      formData.append("uid", localStorage.getItem('uid'));
      this.$apis
        .upload(formData)
        .then((res) => {
          this.upimgUrl = res.data;
        })
        .catch((error) => {
          console.log("文件上传异常:" + error);
        });
    },
    getUserNum() {
      this.$apis
        .getUserNum({})
        .then((res) => {
          this.totalNum = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAlluser() {
      this.$apis
        .checkUser({
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
    currentChange(newSize) {
      this.pagerNum = newSize;
      if (this.searchType != "" || this.searchValue != "") {
        this.searchContent();
      } else {
        this.getAlluser();
      }
    },
    userDetails(userList) {
      userList.rid = this.ridChange(userList.rid);
      this.userInfo = userList;
      this.userdils = true;
    },
    updateEdit(row) {
      this.userDetails(row);
    },
    openDelete(index, row) {
      this.deleteVisible = true;
      this.username = row.username;
      this.userId = row.uid;
    },
    deleteUser() {
      this.$apis
        .deleteUser({
          uid: this.userId,
        })
        .then((res) => {
          this.$message({
            message: "用户删除成功！",
            type: "success",
          });
          this.getAlluser();
          this.getUserNum();
          this.deleteVisible = false;
        });
    },
    ridChange(value) {
      if (value == 1) {
        return "管理员";
      } else {
        return "普通用户";
      }
    },
    ridChangeB(value) {
      if (value == "管理员") {
        return 1;
      } else {
        return 2;
      }
    },
    getImgUrl(e, index) {
      let urlU = e.target.files[0];
      let formData = new FormData();
      formData.append("file", urlU);
      formData.append("uid", localStorage.getItem('uid'));
      this.$apis
        .upload(formData)
        .then((res) => {
          console.log(res);
          if (index == 1) {
            this.idUrlU = res.data;
          }else{
            this.idUrlD = res.data;
          }
        })
        .catch((error) => {
          console.log("文件上传异常:" + error);
        });
    },
  },
  computed: {},
  filters: {},
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
.el-select>.el-input{
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
.idimg{
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