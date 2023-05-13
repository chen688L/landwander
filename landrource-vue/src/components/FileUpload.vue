<template>
    <!-- 弹窗，上传文件 -->
    <el-dialog
      :title="title"
      :visible.sync="fileUploadVisible"
      width="500px"
      style="padding:0;"
      @close="close"
    >
      附件名称：
      <el-input
        v-model="fileName"
        autocomplete="off"
        size="small"
        style="width: 300px;"
      ></el-input>
      <div class="add-file-right" style="height:70px;margin-top:5px;">
        <div class="add-file-right-img">上传文件：支持扩展名：.xlsx,.xls</div>
        <input
          type="file"
          ref="clearFile"
          @change="getFile($event)"
          multiple="multiplt"
          class="add-file-right-input"
          style="margin-left: 18px;margin-top:5px"
          accept=".xlsx, .xls"
        />
      </div>
  
      <div slot="footer" class="dialog-footer">
        <el-button
          icon="el-icon-upload2"
          type="primary"
          @click="submitAddFile"
          size="small"
          >开始上传</el-button
        >
        <el-button icon="el-icon-download" @click="downLoadTemplate" size="small"
          >下载导入模板</el-button
        >
        <el-button icon="el-icon-delete" @click="resetAdd" size="small"
          >全部删除</el-button
        >
      </div>
    </el-dialog>
  </template>
  
  <script>
  export default {
    name: "file-upload",
    props: {
      title: {
        type: String,
        default: "批量上传"
      },
      templateDownloadUrl: {
        type: String,
        default: "",
        require: true
      },
      fileUploadUrl: {
        type: String,
        default: "",
        require: true
      },
      templateName: {
        type: String,
        default: "模板",
        require: true
      }
    },
    components: {},
    mounted() {},
    data() {
      return {
        fileUploadVisible: false,
        fileName: "",
        addArr: []
      };
    },
    methods: {
      close() {
        this.resetAdd();
        this.fileUploadVisible = false;
      },
      resetAdd() {
        this.addArr.length = 0;
        this.fileName = "";
        //清空选择的文件
        this.$refs.clearFile.type = "text";
        this.$refs.clearFile.value = "";
        this.$refs.clearFile.type = "file";
      },
      //获取本地文件
      getFile(event) {
        var file = event.target.files;
        for (var i = 0; i < file.length; i++) {
          // 上传类型判断
          var imgName = file[i].name;
          var idx = imgName.lastIndexOf(".");
          if (idx !== -1) {
            var ext = imgName.substr(idx + 1).toUpperCase();
            ext = ext.toLowerCase();
            if (ext != "xlsx" && ext != "xls") {
            } else {
              this.addArr.push(file[i]);
              this.fileName = this.addArr[0].name;
            }
          } else {
          }
        }
      },
      //提交上传
      submitAddFile() {
        if (0 === this.addArr.length) {
          this.$message({
            type: "info",
            message: "请选择要上传的文件"
          });
          return;
        }
        let formData = new FormData();
        formData.append("file", this.addArr[0]);
        this.$apis.excel(
          formData,
        ).then(({ data }) => {
          console.log(data);
          if (data && data.code === 0) {
            this.resetAdd();
            this.$alert(data.msg, "导入结果", { dangerouslyUseHTMLString: true });
            // 调用父组件的刷新列表事件
            this.$emit("refreshDataList");
          } else {
            this.$message.error("a");
          }
        });
      },
              // {
        //   url: this.templateDownloadUrl,
        //   method: "get",
        //   responseType: "blob" //服务器返回的数据类型
        // }
      //下载模板
      downLoadTemplate() {

        this.$apis.downexcel()
          .then(res => {
            //流的转储属于浅拷贝
            const content = res;
            const blob = new Blob([content]); //构造一个blob对象来处理数据
            const fileName = this.templateName + ".xlsx";
            console.log(res);
  
            //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
            //IE10以上支持blob但是依然不支持download
            if ("download" in document.createElement("a")) {
              //支持a标签download的浏览器
              const link = document.createElement("a"); //创建a标签
              link.download = fileName; //a标签添加属性
              link.style.display = "none";
              link.href = URL.createObjectURL(blob);
              document.body.appendChild(link);
              link.click(); //执行下载
              URL.revokeObjectURL(link.href); //释放url
              document.body.removeChild(link); //释放标签
            } else {
              //其他浏览器
              navigator.msSaveBlob(blob, fileName);
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error("下载文件失败");
          });
      }
    }
  };
  </script>
  
  <style scoped></style>
  
  