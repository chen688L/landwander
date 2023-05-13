<template>
  <div class="landmanage">
    <div class="search">
      <label>搜索：</label>
      <el-input
        placeholder="请输入搜索内容"
        v-model="searchVal"
        clearable
        focus
        @clear="cancelSearch"
      >
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="getNews()"
        >搜索</el-button
      >
    </div>
    <div class="list">
      <el-table
        ref="filterTable"
        :data="tableData"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        style="width: 1040px; margin: 10px auto"
      >
        <el-table-column prop="title" label="新闻标题" width="250">
        </el-table-column>
        <el-table-column prop="content" label="新闻内容" width="300">
          <template slot-scope="scope">
            <div class="news-content">{{ scope.row.content }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="标签"
          width="80"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state == 0 ? 'warning' : 'success'"
              disable-transitions
              >{{ scope.row.state == 0 ? "草稿" : "已发布" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="日期" sortable width="180">
          <template slot-scope="scope">
            {{ scope.row.createdAt | getTime }}
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
              <div class="edit1" @click="checkView(scope.row)">
                <i class="el-icon-view"></i>详情
              </div>
              <div class="edit2" @click="updateView(scope.row)">
                <i class="el-icon-edit"></i>修改
              </div>
              <div class="edit3" @click="openDelete(scope.row)">
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
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      size="50%"
      :with-header="false"
    >
      <div class="drawer">
        <div>
          <strong>新闻ID:</strong>
          <span>{{ demands.nid }}</span>
        </div>
        <div>
          <strong>发布者ID:</strong>
          <span>{{ demands.uid }}</span>
        </div>
        <div>
          <strong>标题:</strong>
          <span>{{ demands.title }}</span>
        </div>
        <div>
          <strong>详情:</strong>
          <div class="newcontent" v-html="demands.content"></div>
        </div>

        <div>
          <strong>图片:</strong>
          <div><img :src="url + demands.picture" /></div>
        </div>
        <div>
          <strong>状态:</strong>
          <el-tag
            :type="demands.state == 0 ? 'warning' : 'success'"
            disable-transitions
            >{{ demands.state == 0 ? "草稿" : "已发布" }}</el-tag
          >
        </div>
        <div>
          <strong>发布时间:</strong>
          <span>{{ demands.createdAt | getTime }}</span>
        </div>
        <div>
          <strong>更新时间:</strong>
          <span>{{ demands.updatedAt | getTime }}</span>
        </div>
      </div>
    </el-drawer>
    <!-- 删除 -->
    <el-dialog title="提示" :visible.sync="deleteVisible" width="30%" center>
      <i
        class="el-icon-warning-outline"
        style="color: red; margin-right: 10px"
      ></i>
      <span>确定要删除该新闻吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteNews()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
  <script>
export default {
  name: "NewsManage",
  props: ["toAddNews"],
  data() {
    return {
      pageSize: 5, //表格行数
      pagerNum: 1, //当前页数
      totalNum: 11, //总页数
      drawer: false,
      url: process.env.VUE_APP_BASE_API, //头像前置url
      searchVal: "",
      tableData: [],
      demands: {},
      deleteVisible: false, //控制删除弹出框
      nid: "",
    };
  },
  mounted() {
    this.getNews();
    this.getDemandNum();
  },
  methods: {
    currentChange(newSize) {
      this.pagerNum = newSize;
      this.getNews();
    },
    cancelSearch() {
      this.searchVal = "";
      this.getNews();
      this.getDemandNum();
    },
    getNews() {
      this.$apis
        .checkNews({
          title: this.searchVal,
          content: this.searchVal,
          pageSize: (this.pagerNum - 1) * this.pageSize,
          pageNum: this.pageSize,
        })
        .then((res) => {
          this.tableData = res.data;
          this.getDemandNum();
        });
    },
    getDemandNum() {
      this.$apis
        .getDemandNum({
          title: this.searchVal,
          fs: this.searchVal,
          address: this.searchVal,
          type: this.searchVal,
          content: this.searchVal,
        })
        .then((res) => {
          this.totalNum = res.data;
        });
    },
    checkView(row) {
      this.drawer = true;
      this.demands = row;
    },
    updateView(row) {
      localStorage.setItem("sys_landrource_news", JSON.stringify(row));
      this.toAddNews();
    },
    openDelete(row) {
      this.deleteVisible = true;
      this.nid = row.nid;
    },
    deleteNews() {
      this.$apis
        .deleteNews({
          nid: this.nid,
        })
        .then((res) => {
          this.$message({
            message: "新闻删除成功！",
            type: "success",
          });
          this.getNews();
          this.getDemandNum();
          this.deleteVisible = false;
        });
    },
    formatter(row, column) {
      return row.address;
    },
  },
};
</script>
  
  <style lang="less" scoped>
.landmanage {
  margin: 10px auto;
  padding-top: 20px;
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
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    color: rgb(108, 112, 115);
  }
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
.drawer {
  margin: 30px 40px;
  white-space: normal; //超过宽度换行
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
.news-content {
  height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>