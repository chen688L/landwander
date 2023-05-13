<template>
  <div class="landmanage">
    <div class="search">
      <label>搜索：</label>
      <el-input
        placeholder="请输入搜索内容"
        v-model="searchVal"
        clearable
        @clear="cancelSearch"
      >
      </el-input>
      <el-select
        v-model="searchType"
        clearable
        placeholder="请选择流转类型"
        @clear="cancelSearch"
      >
        <el-option
          v-for="item in typeopts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="searchLand()"
        >搜索</el-button
      >
      <el-button
        icon="el-icon-download"
        type="danger"
        @click="downVisible = true"
        >导出土地信息</el-button
      >
    </div>
    <div>
      <el-table
        ref="filterTable"
        :data="tableData"
        :cell-style="{ 'text-align': 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="80" fixed>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="230">
        </el-table-column>
        <el-table-column prop="dictType" label="流转类型" width="100">
        </el-table-column>
        <el-table-column prop="fs" label="流转方式" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="联系方式" width="150">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="150"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column
          prop="ispass"
          label="标签"
          width="100"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="warning" v-if="scope.row.ispass == 1"
              >审核中</el-button
            >
            <el-button size="mini" type="success" v-if="scope.row.ispass == 2"
              >审核成功</el-button
            >
            <el-button size="mini" type="danger" v-if="scope.row.ispass == 3"
              >审核失败</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="updatedat" label="更新时间" width="180" sortable>
          <template slot-scope="scope">
            {{ scope.row.updatedat | getTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <div class="edit">
              <div class="edit1" @click="updateView(scope.row)"><i class="el-icon-edit"></i>详情</div>
              <div class="edit3" @click="openDelete(scope.row)"><i class="el-icon-delete"></i>删除</div>
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
    </div>
    <!-- 详情 -->
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      size="50%"
      :with-header="false"
    >
      <div class="drawer">
        <div>
          <strong>发布者ID:</strong>
          <span>{{ landdetail.uid }}</span>
        </div>
        <div>
          <strong>ID:</strong>
          <span>{{ landdetail.lid }}</span>
        </div>
        <div>
          <strong>标题:</strong>
          <span>{{ landdetail.title }}</span>
        </div>
        <div>
          <strong>详情:</strong>
          <span>{{ landdetail.content }}</span>
        </div>
        <div>
          <strong>类型:</strong>
          <span>{{ landdetail.dictType + "/" + landdetail.dictValue }}</span>
        </div>
        <div>
          <strong>地址:</strong>
          <span>{{ landdetail.address }}</span>
        </div>
        <div>
          <strong>流转方式:</strong>
          <span>{{ landdetail.fs }}</span>
        </div>
        <div>
          <strong>面积:</strong>
          <span>{{ landdetail.area }}</span>
        </div>
        <div>
          <strong>转让年限:</strong>
          <span>{{ landdetail.year }}</span>
        </div>
        <div>
          <strong>联系方式:</strong>
          <span>{{ landdetail.phone }}</span>
        </div>
        <div>
          <strong>发布时间:</strong>
          <span>{{ landdetail.issuetime | getTime }}</span>
        </div>
        <div>
          <strong>更新时间:</strong>
          <span>{{ landdetail.updatedat | getTime }}</span>
        </div>
        <div>土地图片和凭证信息：</div>
        <div v-for="(item, index) in imglist" :key="index">
          <img :src="url + item.url" />
        </div>
      </div>
    </el-drawer>
    <!-- 删除 -->
    <el-dialog title="提示" :visible.sync="deleteVisible" width="30%" center>
      <i
        class="el-icon-warning-outline"
        style="color: red; margin-right: 10px"
      ></i>
      <span>确定要删除该土地吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteLand()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 下载excel表格 -->
    <el-dialog title="导出土地信息表" :visible.sync="downVisible">
      <label>选择导出的土地：</label>
      <el-select v-model="downIspass" placeholder="请选择活动区域">
        <el-option label="全部" value="-1"></el-option>
        <el-option label="审核中" value="1"></el-option>
        <el-option label="审核通过" value="2"></el-option>
        <el-option label="审核失败" value="3"></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="downVisible = false">取 消</el-button>
        <el-button type="danger" @click="downLoadTemplate()">下 载</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "LandManage",
  data() {
    return {
      pageSize: 5, //表格行数
      pagerNum: 1, //当前页数
      totalNum: 11, //总页数
      drawer: false,
      visible: false,
      deleteVisible: false, //控制删除弹出框
      downVisible: false,
      url: process.env.VUE_APP_BASE_API, //头像前置url
      typeopts: [
        {
          value: "耕地",
          label: "耕地",
        },
        {
          value: "林地",
          label: "林地",
        },
        {
          value: "园林",
          label: "园林",
        },
      ],
      searchVal: "",
      searchType: "",
      tableData: [],
      landdetail: {},
      imglist: [],
      uid: "",
      lid: "",
      downIspass: "-1",
    };
  },
  mounted() {
    this.getLand();
    this.getLandNum();
    this.getLandType();
  },
  methods: {
    //下载土地信息
    downLoadTemplate() {
      this.$apis
        .downexcel({
          ispass: this.downIspass,
        })
        .then((res) => {
          //流的转储属于浅拷贝
          const content = res;
          const blob = new Blob([content]); //构造一个blob对象来处理数据
          const fileName = "土地信息数据.xlsx";
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
            this.downVisible = false;
          } else {
            //其他浏览器
            navigator.msSaveBlob(blob, fileName);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("下载文件失败");
        });
    },
    searchLand() {
      this.getLand();
      this.getLandNum();
    },
    cancelSearch() {
      this.searchVal = "";
      this.getLand();
      this.getLandNum();
    },
    currentChange(newSize) {
      this.pagerNum = newSize;
      this.getLand();
    },
    getLand() {
      this.$apis
        .checkland({
          title: this.searchVal,
          dict_value: "",
          dict_type: this.searchType,
          pageSize: (this.pagerNum - 1) * this.pageSize,
          pagerNum: this.pageSize,
        })
        .then((res) => {
          this.tableData = res.data;
          console.log(this.tableData);
        });
    },
    getLandNum() {
      this.$apis
        .checklandnum({
          title: this.searchVal,
          dict_value: "",
          dict_type: this.searchType,
        })
        .then((res) => {
          this.totalNum = res.data;
        });
    },
    updateView(row) {
      this.drawer = true;
      this.landdetail = row;
      this.$apis
        .checkimgsBylid({
          lid: row.lid,
          type: "",
        })
        .then((res) => {
          this.imglist = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openDelete(row) {
      this.deleteVisible = true;
      this.lid = row.lid;
      this.uid = row.uid;
    },
    deleteLand() {
      this.$apis
        .deleteLand({
          lid: this.lid,
          uid: this.uid,
        })
        .then((res) => {
          this.$message({
            message: "删除成功！",
            type: "success",
          });
          this.getLand();
          this.getLandNum();
          this.deleteVisible = false;
        });
    },
    formatter(row, column) {
      return row.address;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    getLandType() {
      this.$apis.dictType().then((res) => {
        console.log(res.data);
        var list = []
        for(let i=0;i<res.data.length;i++){
          let type={}
          type.label = res.data[i]
          type.value = res.data[i]
          list.push(type)
        }
        this.typeopts = list
        
      });
    },
  },
};
</script>

<style lang="less" scoped>
.landmanage {
  margin: 10px auto;
  padding: 20px 10px;
}
.search {
  margin: 20px auto;
  text-align: center;
  .el-input {
    width: 200px;
    margin: 0 10px;
  }
  .el-select {
    margin: 0 10px;
  }
  /deep/ .el-input {
    width: 200px;
  }
}
.el-pagination {
  margin: 20px auto;
  text-align: center;
}
.edit {
  display: flex;
  justify-content: space-around;
  .edit1 {
    text-decoration: underline;
    cursor: pointer;
  }
  .edit3 {
    color: red;
    text-decoration: underline;
    cursor: pointer;
  }
}
.drawer {
  margin: 30px 40px;
  white-space:normal;//超过宽度换行
  div {
    margin: 20px 0;
    strong {
      margin-right: 10px;
    }
  }
  img {
    width: 250px;
  }
}
/deep/ .el-dialog{
  width: 28%;
}
</style>