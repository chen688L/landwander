<template>
  <div class="identity">
    <div class="search">
      <label>审核状态：</label>
      <el-select
        class="itselect"
        v-model="ispass"
        placeholder="类型"
        @change="checkIspass(ispass)"
      >
        <el-option label="审核中" :value="'1'"></el-option>
        <el-option label="审核成功" :value="'2'"></el-option>
        <el-option label="审核失败" :value="'3'"></el-option>
      </el-select>
      <div style="font-size: 12px; color: #8d8d8d; margin-left: 10px">
        提示: 审核信息不完整无法审核成功
      </div>
    </div>
    <el-table
      class="usertable"
      :data="tableData"
      style="width: 1060px; margin: auto; font-size: 12px"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
      size="small"
      :default-sort="{ prop: 'updatedAtTime', order: 'descending' }"
    >
      <el-table-column type="index" label="序号" width="80" fixed>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="220"> </el-table-column>
      <el-table-column prop="address" label="地址" width="120">
      </el-table-column>
      <el-table-column prop="tag" label="土地证明" width="120">
        <template slot-scope="scope">
          <el-link type="info" @click="updateView(scope.row)">查看</el-link>
        </template>
      </el-table-column>
      <el-table-column label="土地状态" width="120" prop="ispass">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" v-if="scope.row.ispass == 1"
            >待审核</el-button
          >
          <el-button size="mini" type="success" v-if="scope.row.ispass == 2"
            >审核成功</el-button
          >
          <el-button size="mini" type="danger" v-if="scope.row.ispass == 3"
            >审核失败</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="220" prop="ispass">
        <template slot-scope="scope">
          <div class="edit">
            <el-select
              class="itselect"
              :ref="scope.row.lid"
              v-model="scope.row.ispass"
              placeholder="类型"
              @change="selectIspass(scope.row)"
            >
              <el-option label="待审核" :value="'1'"></el-option>
              <el-option label="审核成功" :value="'2'"></el-option>
              <el-option label="审核失败" :value="'3'"></el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="updatedat" label="更新时间" width="180" sortable>
        <template slot-scope="scope">
          {{ scope.row.updatedat | getTime }}
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
    <!-- 详情 -->
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      size="50%"
      :with-header="false"
    >
      <div class="drawer">
        <div>
          <strong>标题:</strong>
          <span>{{ landdetail.title }}</span>
        </div>
        <div>
          <strong>类型:</strong>
          <span>{{ landdetail.dictType + "/" + landdetail.dictValue }}</span>
        
          <strong style="margin-left: 30px;">流转方式:</strong>
          <span>{{ landdetail.fs }}</span>
       
          <strong style="margin-left: 30px;">面积:</strong>
          <span>{{ landdetail.area }}</span>
        
          <strong style="margin-left: 30px;">转让年限:</strong>
          <span>{{ landdetail.year }}年</span>
        </div>
        <div>
          <strong>地址:</strong>
          <span>{{ landdetail.address }}</span>
        </div>
        <div>
          <strong>更新时间:</strong>
          <span>{{ landdetail.updatedat | getTime }}</span>
        </div>
        <div>土地图片和凭证信息：</div>
        <div v-for="(item, index) in imglist" :key="index">
          <img v-if="item.type=='testify'" :src="url + item.url" />
        </div>
        <div class="fixed">
          <el-button type="success" round @click="updateState(2)">审核通过</el-button>
          <el-button type="danger" round @click="updateState(3)">审核失败</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
  
  <script>
export default {
  name: "identityLand",
  data() {
    return {
      tableData: [], //表格数据
      pageSize: 5, //表格行数
      pagerNum: 1, //当前页数
      totalNum: 11, //总页数
      ispass: "1",
      url: process.env.VUE_APP_BASE_API, //头像前置url
      srcList: [],
      drawer: false,
      landdetail: {
        ispass:''
      },
      imglist: [],
    };
  },
  mounted() {
    this.getAllLand();
    this.searchNum();
  },
  methods: {
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
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateState(ispass){
      this.landdetail.ispass = ispass
      this.selectIspass(this.landdetail)
      this.drawer = false;
    },
    getAllLand() {
      this.$apis
        .clandPass({
          ispass: this.ispass,
          pageSize: (this.pagerNum - 1) * this.pageSize,
          pagerNum: this.pageSize,
        })
        .then((res) => {
          this.tableData = res.data;
          console.log(res.data);
          console.log(this.ispass);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchNum() {
      this.$apis
        .landPassNum({
          ispass: this.ispass,
        })
        .then((res) => {
          this.totalNum = res.data;
          console.log("res:", res.data);
        });
    },
    currentChange(newSize) {
      this.pagerNum = newSize;
      this.getAllLand();
    },
    checkIspass(ispass) {
      this.getAllLand();
      this.searchNum();
    },
    selectIspass(row) {
      console.log(row);
      this.$apis
        .updateLand({
          land:null,
          testify:null,
          landdetail:row,
          longitude:null,
          latitude:null
        })
        .then((res) => {
          this.$message({
            message: "修改成功！",
            type: "success",
          });
          this.getAllLand();
          this.searchNum();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    vbs(val) {
      this.srcList = [];
      this.srcList.push(val);
    },
  },
};
</script>
  
  <style lang="less" scoped>
.identity {
  margin: 0 auto;
  padding-top: 20px;
}
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
.el-pagination {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
/deep/ .el-input {
  width: 200px;
}

.drawer {
  margin: 30px 40px;
  position: relative;
  div {
    margin: 20px 0;
    strong {
      margin-right: 10px;
    }
  }
  img {
    width: 100%;
  }
  .fixed{
    background: #fff;
    width: 100%;
    position: fixed;
    bottom: 0;
    margin: 0;
    padding: 20px 0;
  }
}
</style>