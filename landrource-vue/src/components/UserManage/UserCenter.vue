<template>
  <div class="usercenter">
    <div class="left">
      <img class="avatar" :src="url + userInfo.avater" />
      <span>
        更换头像
        <input
          @change="getImgUrl($event)"
          ref="file"
          title=""
          type="file"
          accept="image/*"
          class="hiddenInput"
        />
      </span>
    </div>
    <div class="right">
      <div>个人基本信息</div>
      <div class="flex">
        <div class="label">昵称：</div>
        <div class="info">{{ userInfo.username }}</div>
      </div>
      <div class="flex">
        <div class="label">性别：</div>
        <div class="info">{{ userInfo.sex }}</div>
      </div>
      <div class="flex">
        <div class="label">手机号(账号)：</div>
        <div class="info">{{ userInfo.phone }}</div>
      </div>
      <div>个人实名信息</div>
      <div class="flex">
        <div class="label">身份证号：</div>
        <div class="info">{{ userInfo.idcard }}</div>
      </div>
      <div class="flex">
        <div class="label">真实姓名：</div>
        <div class="info">{{ userInfo.realname }}</div>
      </div>
      <div class="btnrow">
        <el-button class="upbtn" type="primary" @click="updateInfoVis()"
          >修改信息</el-button
        >
      </div>
      <div class="btnrow">
        <el-button class="upbtn" type="primary" @click="changePassword = true"
          >更换密码</el-button
        >
      </div>
      <el-dialog
        title="修改信息"
        class="mydialog"
        :visible.sync="changeUser"
        width="50%"
        center
      >
        <div class="row">
          <label>昵称： </label>
          <el-input v-model="user.username"></el-input>
        </div>
        <div class="row">
          <label>性别： </label>
          <el-select v-model="user.sex">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </div>
        <div class="row">
          <label>身份证号：</label>
          <el-input v-model="user.idcard"></el-input>
        </div>
        <div class="row">
          <label>真实姓名：</label>
          <el-input v-model="user.realname"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="changeUser = false">取 消</el-button>
          <el-button type="primary" @click="updateUser()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="修改密码"
        class="mydialog"
        :visible.sync="changePassword"
        width="50%"
        center
      >
        <div class="tips" v-if="msg">请输入正确的内容</div>
        <div class="row">
          <label>原密码： </label>
          <el-input v-model="pwdold"></el-input>
        </div>
        <div class="row">
          <label>新密码：</label>
          <el-input v-model="pwdnew1"></el-input>
        </div>
        <div class="row">
          <label>确认新密码：</label>
          <el-input v-model="pwdnew2"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closePwd()">取 消</el-button>
          <el-button type="primary" @click="updatePwd()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Username",
  data() {
    return {
      userInfo: {
        username: "",
        sex: "",
        idcard: "",
        realname: "",
        createdAt: "",
        avater: "",
      },
      user: {
        username: "",
        sex: "",
        idcard: "",
        realname: "",
      },
      changeUser: false,
      changePassword: false,
      pwdold: "",
      pwdnew1: "",
      pwdnew2: "",
      msg: false,
      url: process.env.VUE_APP_BASE_API, //头像前置url
    };
  },
  created(){
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('admin_userinfo'));
    console.log(this.userInfo);
  },
  methods: {
    getImgUrl(e) {
      this.logoUrl = e.target.files[0];
      console.log(this.logoUrl);
      console.log(e);
      let formData = new FormData();
      formData.append("file", this.logoUrl);
      formData.append("uid", localStorage.getItem('uid'));
      this.$apis
        .upload(formData)
        .then((res) => {
          console.log(res);
          this.$apis
            .updateAvater({
              uid: this.$store.state.userInfo.uid,
              avater: res.data,
            })
            .then((res2) => {
              this.userInfo.avater = res.data;
            });
        })
        .catch((error) => {
          console.log("文件上传异常:" + error);
        });
    },
    updateInfoVis() {
      this.user.username = this.userInfo.username;
      this.user.sex = this.userInfo.sex;
      this.user.idcard = this.userInfo.idcard;
      this.user.realname = this.userInfo.realname;
      this.changeUser = true;
    },
    closePwd() {
      this.changePassword = false;
      this.msg = false;
    },
    updateUser() {
      this.userInfo.createdAt = this.formatTime(this.userInfo.createdAt);
      this.userInfo.username = this.user.username;
      this.userInfo.sex = this.user.sex;
      this.userInfo.idcard = this.user.idcard;
      this.userInfo.realname = this.user.realname;
      this.$apis
        .updateUser(this.userInfo)
        .then((res) => {
          this.changeUser = false;
          this.$message({
            message: "修改成功！",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updatePwd() {
      if (
        this.pwdnew1 == this.pwdnew2 &&
        this.pwdnew1 != "" &&
        this.pwdold != ""
      ) {
        this.$apis
          .updatePwd({
            uid: localStorage.getItem('uid'),
            oldpassword: this.pwdold,
            newpassword: this.pwdnew1,
          })
          .then((res) => {
            this.$message({
              message: "密码已修改",
              type: "success",
            });
          });
        this.changePassword = false;
        this.msg = true;
      } else {
        this.msg = true;
      }
    },
    formatTime(time) {
      let date = new Date(new Date(time).getTime() + 8 * 3600 * 1000);
      date = date.toJSON();
      date = date.substring(0, 19).replace("T", " ");
      return date;
    },
  },
};
</script>

<style lang="less" scoped>
.usercenter {
  width: 100%;
  height: 100%;
  display: flex;
  background: #eee;
}
.left {
  text-align: center;
  background: #fff;
  padding: 20px;
  margin: 10px 0 0 10px;
  height: 108px;
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
  span {
    position: relative;
    cursor: pointer;
    font-size: 12px;
    text-decoration: underline;
    color: rgb(53, 53, 211);
  }
}
.avatar {
  width: 100px;
  height: 100px;
}
.right {
  margin: 10px 10px;
  padding: 20px;
  width: 900px;
  height: 500px;
  background: #fff;
}
.flex {
  font-family: "Courier New", Courier, monospace;
  display: flex;
  margin: 16px;
  font-size: 16px;
}
.label {
}
.info {
  // font-size: 14px;
}
.el-input {
  width: 200px;
}
.el-select {
  width: 200px;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 45%;
  margin: 8px auto;
}
.mydialog {
  margin-left: 30px;
}
.tips {
  margin: 3px auto;
  text-align: center;
  color: red;
  font-size: 12px;
}
.btnrow {
  margin-top: 16px;
}
.upbtn {
  height: 28px;
  line-height: 4px;
}
</style>