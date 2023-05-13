<template>
  <div class="contract">
    <div CLASS="upload-demo">
      <el-upload
        ref="upload"
        style="display: inline-block"
        action="string"
        :limit="10"
        :file-list="fileList"
        :on-error="loadFileError"
        :before-upload="beforeUpload"
        :show-file-list="false"
        :http-request="uploadFile"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        multiple
      >
        <el-button type="success">上传文件</el-button>
      </el-upload>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 75%; margin: 30px auto"
      id="pictable"
      :cell-style="{ 'text-align': 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column header-align="center" type="selection" width="50">
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
          {{ scope.row.createAt | getTime }}
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="createAt"
        label="下载"
        width="180"
      >
        <template slot-scope="scope">
          <el-button class="controlbtn" type="danger" @click="upDown(scope.row)"
            >下载</el-button
          >
          <el-button
            class="controlbtn"
            type="danger"
            @click="removeFile(scope.row)"
            >删除</el-button
          >
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
      fileList: [],
      uid: "",
      tableData: [],
      multipleSelection: [],
      url: process.env.VUE_APP_BASE_API,
      totalNum: 0,
      pageSize: 5,
      pagecurrent: 1,
    };
  },
  mounted() {
    this.uid = JSON.parse(localStorage.getItem('admin_userinfo')).uid;
    this.getFile();
    this.getFileNum();
  },
  methods: {
    upDown(row) {
      console.log(row);
      window.location.href = this.url + row.path;
    },
    // 文件上传失败
    loadFileError() {
      this.$message.error("文件上传失败！！！");
    },
    // 上传文件之前
    beforeUpload(file) {
      const extension =
        file.name.split(".")[1] === "doc" || file.name.split(".")[1] === "docx"; // 是否以txt为后缀
      const isLt2M = file.size / 1024 / 1024 < 100; // 文件大小是否小于100M
      // if (!extension) {
      //   this.$message.error("上传文件的格式只能是.txt！！！");
      // }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过100MB！！！");
      }
      return extension && isLt2M; // 若为false则停止上传
    },
    // 上传文件
    uploadFile(param) {
      const File = param.file;
      console.log("合同",File);
      let formDataInfo = new FormData();
      formDataInfo.append("file", File); // 将文件传向后端
      formDataInfo.append("uid", this.uid); // 将文件传向后端
      this.$apis.fileUpload(formDataInfo).then((res) => {
        console.log(res);
        if (res == "ok") {
          this.getFile()
          this.getFileNum()
          this.$message.success("文件上传成功！！！");
        } else {
          this.$message.error("文件上传失败！！！");
        }
      });
    },
    // 删除文件  如果beforeUpload函数返回值为false,会自动触发handleRemove
    handleRemove(file, fileList) {
      if (file != "") {
        this.$apis
          .fileDelete({
            fileName: file.name,
          })
          .then((res) => {
            if (res == "ok") {
              this.$message.success("删除成功！！！");
            } else {
              this.$message.error("删除失败！！！");
            }
          });
      }
    },
    removeFile(row) {
      this.$apis
        .fileDelete({
          fileName: row.filename,
        })
        .then((res) => {
          if (res == "ok") {
            this.$message.success("删除成功！！！");
            this.fileName = "";
            this.getFile()
            this.getFileNum()
          } else {
            this.fileName = "";
            this.$message.error("删除失败！！！");
          }
        });
    },
    // 文件超出个数限制
    handleExceed() {
      this.$message.warning("超出文件个数限制！！！");
    },

    getFileNum() {
      this.$apis
        .FileNum({
          state: 2,
        })
        .then((res) => {
          this.totalNum = res.data;
        })
        .catch((err) => {});
    },
    getFile() {
      this.$apis
        .checkFile({
          state: 2,
          pageCurrent: (this.pagecurrent - 1) * this.pageSize,
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
    currentChange(newSize) {
      this.pagecurrent = newSize;
      this.getFile();
    },
  },
};
</script>

<style lang="less" scoped>
.contract {
}
.upload-demo {
  display: block;
  width: 75%;
  margin: 20px auto;
}
.btn {
  margin-left: 100px;
}
.controlbtn {
  width: 50px;
  height: 30px;
  padding: 0;
  font-size: 12px;
}
.el-pagination {
  text-align: center;
}
</style>

