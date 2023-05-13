<template>
    <div class="landmanage">
      <div class="search">
        <label>搜索：</label>
        <el-input placeholder="请输入搜索内容" v-model="searchVal" clearable @clear="cancelSearch">
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="getDemand()">搜索</el-button>
      </div>

      <div>
        <el-table
          ref="filterTable"
          :data="tableData"
          :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ 'text-align': 'center' }"
          style="width: 1000px;margin: 30px auto;"
        >
          <el-table-column prop="title" label="标题" width="220">
          </el-table-column>
          <el-table-column prop="name" label="发布者" width="80">
          </el-table-column>
          <el-table-column prop="fs" label="流转方式" width="80">
          </el-table-column>
          <el-table-column prop="phone" label="联系方式" width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="180"
            :formatter="formatter"
          >
          </el-table-column>
          <el-table-column
            prop="createdAt"
            label="日期"
            sortable
            width="180"
          >
            <template slot-scope="scope">
                {{ scope.row.createdAt | getTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120"
            align="center"
            header-align="center"
          >
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
      <el-drawer title="我是标题" 
      :visible.sync="drawer" 
      size="50%"
      :with-header="false">
        <div class="drawer">
          <div>
            <strong>发布者ID:</strong>
            <span>{{ demands.uid }}</span>
          </div>
          <div>
            <strong>ID:</strong>
            <span>{{ demands.demandid }}</span>
          </div>
          <div>
            <strong>标题:</strong>
            <span>{{ demands.title }}</span>
          </div>
          <div>
            <strong>详情:</strong>
            <span>{{ demands.content }}</span>
          </div>
          <div>
            <strong>类型:</strong>
            <span>{{ demands.type }}</span>
          </div>
          <div>
            <strong>价格区间:</strong>
            <span>{{ demands.priceDown +"-" +demands.priceUp }}</span>
          </div>
          <div>
            <strong>地址:</strong>
            <span>{{ demands.address }}</span>
          </div>
          <div>
            <strong>流转方式:</strong>
            <span>{{ demands.fs }}</span>
          </div>
          <div>
            <strong>面积区间:</strong>
            <span>{{ demands.areaDown + "-" + demands.areaUp }}</span>
          </div>
          <div>
            <strong>转让年限:</strong>
            <span>{{ demands.year }}</span>
          </div>
          <div>
            <strong>联系方式:</strong>
            <span>{{ demands.phone }}</span>
          </div>
          <div>
            <strong>发布时间:</strong>
            <span>{{ demands.createdAt | getTime}}</span>
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
      <span>确定要删除该需求吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser()">确 定</el-button>
      </span>
    </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserDemand",
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
        demandId: "",
      };
    },
    mounted() {
      this.getDemand();
      this.getDemandNum();
    },
    methods: {
      currentChange(newSize) {
        this.pagerNum = newSize;
        this.getDemand();
      },
      cancelSearch(){
        this.searchVal = ""
        this.getDemand()
        this.getDemandNum()
      },
      getDemand() {
        this.$apis
          .checkDemand({
            title: this.searchVal,
            fs: this.searchVal,
            address: this.searchVal,
            type: this.searchVal,
            content: this.searchVal,
            pageSize: (this.pagerNum - 1) * this.pageSize,
            pageNum: this.pageSize,
          })
          .then((res) => {
            this.tableData = res.data;
            console.log(this.tableData);
            this.getDemandNum()
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
      updateView(row) {
        this.drawer = true;
        this.demands = row;
      },
      openDelete(row){
        this.deleteVisible = true;
        this.demandId = row.demandid
      },
      deleteUser() {
      this.$apis
        .deleteDemand({
          demandid: this.demandId,
        })
        .then((res) => {
          this.$message({
            message: "用户删除成功！",
            type: "success",
          });
          this.getDemand();
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
    div{
      margin: 20px 0;
      strong{
        margin-right: 10px;
      }
    }
    img{
      width: 250px;
    }
  }
  </style>