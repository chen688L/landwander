<template>
  <div class="addNews">
    <div class="left">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="90px"
      class="demo-ruleForm"
    >
    <!-- 新闻标题 -->
      <el-form-item label="标题" prop="title">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <!-- 新闻内容 -->
      <el-form-item label="内容" prop="content">
        <div style="border: 1px solid #ccc">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height: 500px; overflow-y: hidden"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
          />
        </div>
      </el-form-item>
      <!-- 封面图片 -->
      <el-form-item label="封面图片(1张)">
        <el-upload
          class="avatar-uploader"
          action="/api/upload/avater"
          :data="admin"
          :limit="1"
          multiple
          list-type="picture-card"
          :file-list="fileList"
          :before-upload="beforeuploadPath"
          :http-request="uploadPath"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
        <el-button v-if="isUpdate" type="warning" @click="updateNews()" >修改新闻</el-button>
        <el-button v-else type="primary" @click="submitForm()">发布新闻</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
    <div class="right">
      <div class="top"></div>
      <div class="newsd">
        <div class="title">{{ title==""?"标题：XXXXXX":title }}</div>
        <div class="time">2023-2-3 10:15:27</div>
        <div class="content" v-html="html"></div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import axios from 'axios';

export default {
  name: "addNews",
  components: { Editor, Toolbar },
  mounted(){
    this.news = JSON.parse(localStorage.getItem("sys_landrource_news"))
    this.init()
    if(this.news){
      this.getUpdateNews(this.news)
    }
  },
  destroyed() {
    localStorage.removeItem("sys_landrource_news")
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  data() {
    return {
      editor: null,
      html: "",
      title:"",
      news:{
        "title":"",
        "content":"",
        "picture":"",
        "state":""
      },
      fileList: [],
      isUpdate: 0,
      toolbarConfig: {},
      editorConfig: {
        placeholder: '请输入内容...',
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
          // 配置上传图片
          uploadImage: {
            customUpload: this.update
          },
          uploadVideo:{
            customUpload:this.updateVideo
          },
          // 继续其他菜单配置...
        }
      },
      url: process.env.VUE_APP_BASE_API,
      mode: "default", // or 'simple'
      admin: {uid: localStorage.getItem("uid"),},
      ruleForm: {},
      domain: "",
      protocol: "",
      token: "",
    };
  },
  methods: {
    getUpdateNews(item){
      this.title = item.title
      this.picture = item.picture
      this.$nextTick(() => {
        this.html = item.content
      })
      let imgs = {name:"a.jpg",url:this.url+this.picture}
      this.fileList.push(imgs)
      if(item){
        this.isUpdate = 1
      }else{
        this.isUpdate = 0
      }
    },
    cleanNews(){
      this.news = {}
      this.title = ""
      this.picture = ""
      this.fileList = []
      this.$nextTick(() => {
        this.html = ""
      })
    },
    updateNews(){
      this.news.title = this.title
      this.news.content = this.html
      this.news.picture = this.picture
      this.$apis.updateNews(this.news).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      });
    },
    update(file, insertFn) {
      // file 即选中的文件
      // 自己实现上传，并得到图片 url alt href
      let formData = new FormData();
      formData.append("file", file);
      formData.append("uid", localStorage.getItem('uid'));
      this.$apis
        .upload(formData)
        .then((res) => {
          this.imgUrl = this.imgUrl==""?res.data:this.imgUrl
          console.log("tu",this.url + res.data,file.name,this.url + res.data);
          insertFn(this.url + res.data, file.name, this.url + res.data)
        })
        .catch((error) => {
          console.log("文件上传异常:" + error);
        });

    },

    updateVideo(file, insertVideo){
      console.log("file",file);
      let filebase64 = this.imageToBase64(file)
      let file2=new FormData()
      file2.append("file",file)
      file2.append("token",this.token)
      axios({
        url:"https://upload-z2.qiniup.com",
        method:"POST",
        data:file2
      }).then(res=>{
        console.log(res.data.key);
        let imageUrl = this.protocol + "://" + this.domain + "/" + res.data.key;
        console.log(imageUrl);
        this.uploadImg(res.data.key, this.imageUrl);
        insertVideo(imageUrl)
      })
    },
     // 上传文件到服务端数据库
     uploadImg(filename, path) {
      this.$apis
        .uploadByQiniu({
          uid: this.uid,
          filename: filename,
          path: path,
        })
        .then((res) => {
          console.log(res);
        });
    },
     // 加载页面初始化
     init: function () {
      let that = this;
      // 前端默认上传获取Token的接口，采用【GET】方式
      this.$apis
        .fileUpload2()
        .then(function (res) {
          that.token = res.token;
          that.domain = res.domain;
          that.protocol = res.protocol;
          that.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    imageToBase64(img) {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsDataURL(img); //转化二进制流，异步方法
        reader.onload = (e) => {
          // console.log(e.target.result,'-----res')
          resolve(e.target.result) ;
        };
      });
    },


    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    // 提交按钮
    submitForm() {
      this.$apis.addNews({
        "uid": localStorage.getItem("uid"),
        "title": this.title,
        "content": this.html,
        "picture": this.imgUrl
      }).then((res) => {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.cleanNews()
      });
    },
    // 重置按钮
    resetForm() {
    },
    uploadPath(item) {
      let formData = new FormData();
      formData.append("file", item.file);
      formData.append("uid", localStorage.getItem('uid'));
      this.$apis
        .upload(formData)
        .then((res) => {
          this.imgUrl = res.data;
        })
        .catch((error) => {
          console.log("文件上传异常:" + error);
        });
    },
    // 封面图片规格
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
.addNews {
  width: 100%;
  display: flex;
  background: #eee;
}
.left{
  background: #fff;
  width: 66%;
}
.right{
  margin: 50px 20px;
  background: #fff;
  width: 375px;
  height: 667px;
  overflow-y: auto;
  white-space:normal;//超过宽度换行
  .top{
    height: 35px;
    background: olivedrab;
  }
  .newsd{
		margin: 5px auto;
    padding: 10px 10px;
    white-space:normal;//超过宽度换行
	}
  .title{
		font-size: 20px;
		font-weight: bold;
	}
  .time{
    font-size: 12px;
    margin: 10px 0;
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
.avatar-uploader-icon {
  width: 148px;
  height: 148px;
  line-height: 148px;
}
.avatar-uploader {
  display: inline-block;
  margin-right: 20px;
}
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>