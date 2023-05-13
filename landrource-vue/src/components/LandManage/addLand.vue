<template>
  <div class="addland">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="90px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="土地类型" prop="dictType">
        <el-cascader v-model="dictValue" :options="options"></el-cascader>
      </el-form-item>
      <el-form-item label="流转方式" prop="fs">
        <el-select v-model="ruleForm.fs" placeholder="请选择活动区域">
          <el-option label="转让" value="转让"></el-option>
          <el-option label="出租" value="出租"></el-option>
          <el-option label="转包" value="转包"></el-option>
          <el-option label="合作" value="合作"></el-option>
          <el-option label="入股" value="入股"></el-option>
          <el-option label="互换" value="互换"></el-option>
          <el-option label="招拍挂" value="招拍挂"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="流转年限" prop="year">
        <el-input v-model="ruleForm.year"></el-input>
      </el-form-item>
      <el-form-item label="流转面积" prop="area">
        <el-input v-model="ruleForm.area"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-cascader
          v-model="areaItem"
          :options="areaArr"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="addressd">
        <el-input v-model="ruleForm.addressd"></el-input>
        <img
          class="wz"
          src="../../assets/static/wz.png"
          @click="chooseMap = true"
        />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="ruleForm.price" style="width: 160px"></el-input>
        <el-select
          style="margin-left: 10px; width: 160px"
          v-model="unit"
          placeholder="请选择活动区域"
        >
          <el-option label="万元" value="万元"></el-option>
          <el-option label="元/亩/年" value="元/亩/年"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item label=""> </el-form-item>
      <el-form-item label=""> </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">立即创建</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="right">
      <div>
        <label>上传土地图片 (限制6张):</label>
        <el-upload
          class="avatar-uploader"
          action=""
          :data="admin"
          :limit="6"
          multiple
          list-type="picture-card"
          :file-list="fileList"
          :on-remove="removeImg1"
          :before-upload="beforeuploadPath"
          :http-request="uploadPath1"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div>
        <label>上传土地凭证 (限制6张):</label>
        <el-upload
          class="avatar-uploader"
          action="/api/upload/avater"
          :data="admin"
          :limit="6"
          multiple
          list-type="picture-card"
          :file-list="fileList2"
          :on-remove="removeImg2"
          :before-upload="beforeuploadPath"
          :http-request="uploadPath2"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <!-- 选择详细地址 -->
    <el-dialog title="提示" :visible.sync="chooseMap" width="50%">
      <my-map @mapsmbit="mapsmbit"></my-map>
    </el-dialog>
  </div>
</template>

<script>
import { area } from "../../config/area";
import myMap from "./Map.vue";

export default {
  name: "addLand",
  components: {
    myMap,
  },
  mounted() {
    this.$apis.dictTypeValue({}).then((res) => {
      console.log(res);
      this.options = res.data;
    });
  },
  data() {
    return {
      chooseMap: false,
      areaArr: area,
      areaItem: "",
      options: [],
      unit: "万元",
      admin: {
        //上传头像的用户
        uid: localStorage.getItem("uid"),
      },
      ruleForm: {
        title: "",
        dictType: "",
        dictValue: "",
        fs: "",
        year: "",
        area: "",
        address: "",
        addressd: "",
        price: "",
        phone: "",
        imgurl: "",
        content: "",
        lid: "",
      },
      fileList: [],
      fileList2: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      },
      land: [],
      testify: [],
      dictValue: "",
      longitude: 0,
      latitude: 0,
    };
  },
  methods: {
    mapsmbit(map) {
      this.ruleForm.addressd = map.address;
      this.longitude = map.lng;
      this.latitude = map.lat;
      console.log(map);
      console.log(123);
    },
    submitForm() {
      this.ruleForm.dictType = this.dictValue[0];
      this.ruleForm.dictValue = this.dictValue[1];
      this.ruleForm.address =
        this.areaItem[0] + this.areaItem[1] + this.areaItem[2];
      console.log(this.ruleForm.address);
      this.ruleForm.price = this.ruleForm.price + this.unit;
      this.ruleForm.imgurl = this.land[0];
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$apis
            .addland({
              uid: localStorage.getItem("uid"),
              landdetail: this.ruleForm,
              land: this.land,
              testify: this.testify,
              longitude: this.longitude,
              latitude: this.latitude,
            })
            .then((res) => {
              this.$message({
                message: "添加成功",
                type: "success",
              });
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dictValue = "";
      this.dictType = "";
      this.areaItem = "";
      this.ruleForm = {
        title: "",
        dictType: "",
        dictValue: "",
        fs: "",
        year: "",
        area: "",
        address: "",
        addressd: "",
        price: "",
        phone: "",
        imgurl: "",
        content: "",
        lid: "",
      };
    },
    uploadPath1(item) {
      let formData = new FormData();
      formData.append("file", item.file);
      formData.append("uid", localStorage.getItem("uid"));
      this.$apis
        .upload(formData)
        .then((res) => {
          this.imgUrl = res.data;
          this.land.push(res.data);
        })
        .catch((error) => {
          console.log("文件上传异常:" + error);
        });
    },
    uploadPath2(item) {
      let formData = new FormData();
      formData.append("file", item.file);
      formData.append("uid", localStorage.getItem("uid"));
      this.$apis
        .upload(formData)
        .then((res) => {
          this.imgUrl = res.data;
          this.testify.push(res.data);
        })
        .catch((error) => {
          console.log("文件上传异常:" + error);
        });
    },
    removeImg1(file, fileList) {
      if (this.fileList.indexOf(file.url)) {
        this.fileList.splice(this.fileList.indexOf(file.url), 1);
      }
      // 删除
      for (let key in file) {
        delete file[key];
      }
      this.land = [];
    },
    removeImg2(file, fileList) {
      if (this.fileList2.indexOf(file.url)) {
        this.fileList2.splice(this.fileList2.indexOf(file.url), 1);
      }
      // 删除
      for (let key in file) {
        delete file[key];
      }
      this.testify = [];
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
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader-icon {
  width: 148px;
  height: 148px;
  line-height: 148px;
}
.addland {
  width: 100%;
  display: flex;
  .right {
    padding: 30px;
    border-left: 1px solid #eee;
    label {
      vertical-align: middle;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
    }
  }
}
.el-input {
  width: 350px;
}
.el-textarea {
  width: 350px;
}
.demo-ruleForm {
  padding: 30px;
}
.wz {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}

/deep/ .el-dialog__body {
  padding-top: 0;
}
</style>