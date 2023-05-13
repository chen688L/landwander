<template>
  <div id="app">
    <el-container style="height: 100%">
      <el-aside :width="asideWide">
        <el-row id="approw">
          <el-col :span="24">
            <el-menu
              @click="cleanAddNews()"
              id="appmenu"
              :collapse="isCollapse"
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-menu-item index="1" @click="tohome()">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-s-custom"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <!-- <template slot="title">用户管理</template> -->
                  <el-menu-item index="1-1" @click="toUserList"
                    >用户列表</el-menu-item
                  >
                  <el-menu-item index="1-2" @click="toUserDemand()"
                    >用户需求</el-menu-item
                  >
                  <el-menu-item index="1-3" @click="toidentityStute()"
                    >认证审核</el-menu-item
                  >
                  <!-- <el-menu-item index="1-4" @click="toPictureManage()"
                    >图片管理</el-menu-item
                  > -->
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="3" @click="toRoleManage()">
                <i class="el-icon-s-check"></i>
                <span slot="title">角色管理</span>
              </el-menu-item>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-s-data"></i>
                  <span>土地管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1" @click="toLandManage()"
                    >土地列表</el-menu-item
                  >
                  <el-menu-item index="4-2" @click="toLandMap()"
                    >地图标记</el-menu-item
                  >
                  <el-menu-item index="4-3" @click="toidentityLand()"
                    >土地审核</el-menu-item
                  >
                  <el-menu-item index="4-4" @click="toaddland()"
                    >新增土地</el-menu-item
                  >
                  <el-menu-item index="4-5" @click="toReport()"
                    >土地举报</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-s-data"></i>
                  <span>资讯管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1" @click="toNewsManage()"
                    >新闻列表</el-menu-item
                  >
                  <el-menu-item index="5-2" @click="toAddNews()"
                    >发布新闻</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="6" @click="toDictManage()">
                <i class="el-icon-document"></i>
                <span slot="title">字典管理</span>
              </el-menu-item>
              <el-menu-item index="7" @click="toContract()">
                <i class="el-icon-document"></i>
                <span slot="title">合同模板</span>
              </el-menu-item>
              <!-- <el-menu-item index="8">
                <i class="el-icon-setting"></i>
                <span slot="title" @click="test()">系统通知</span>
              </el-menu-item> -->
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <img
            class="colmenu"
            src="@/assets/static/shouqi.png"
            @click="changeCollapse"
          />

          <el-dropdown @command="avaterMenu" class="userInfo">
            <img class="avater" :src="myavater" />
            <span>{{ username }}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">个人中心</el-dropdown-item>
              <el-dropdown-item command="2">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main id="el-main">
          <keep-alive exclude="addNews">
            <component :is="iscom" :toAddNews="toAddNews"></component>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
  <script>
import UserList from "../components/UserManage/UserList.vue";
import UserDemand from "../components/UserManage/UserDemand.vue";
import UserDetails from "../components/UserManage/UserDetails.vue";
import PictureManage from "../components/PictureManage/PictureManage.vue";
import UserCenter from "@/components/UserManage/UserCenter.vue";
import identityStute from "@/components/UserManage/identityStute.vue";

import homeVue from "@/components/Home/home.vue";

import LandManage from "@/components/LandManage/LandManage.vue";
import addLand from "@/components/LandManage/addLand.vue";
import identityLand from "@/components/LandManage/identityLand.vue";
import LandMap from "@/components/LandManage/LandMap.vue";
import ReportManage from "@/components/LandManage/ReportManage.vue";

import addNews from "@/components/NewsManage/addNews.vue";
import NewsManage from "@/components/NewsManage/NewsManage.vue";
import RoleManage from "@/components/RoleManage/RoleManage.vue";
import Contract from "@/components/Contract/Contract.vue";
import testVue from "../components/test.vue";
import DictManage from "@/components/DictManage/DictManage.vue";

export default {
  name: "Main",
  components: {
    UserList,
    UserDetails,
    testVue,
    PictureManage,
    homeVue,
    UserCenter,
    identityStute,
    LandManage,
    addLand,
    UserDemand,
    NewsManage,
    addNews,
    Contract,
    RoleManage,
    identityLand,
    LandMap,
    DictManage,
    ReportManage
  },
  data() {
    return {
      iscom: "homeVue",
      isCollapse: false,
      asideWide: "200px",
      myavater: "",
      username:"",
      url: process.env.VUE_APP_BASE_API, //头像前置url
    };
  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem('admin_userinfo'));
    console.log(userInfo);
    this.myavater = this.url + userInfo.avater
    this.username = userInfo.username
  },
  methods: {
    cleanAddNews() {
      localStorage.removeItem("sys_landrource_news");
    },
    avaterMenu(command) {
      let msg = "";
      if (command == 1) {
        this.iscom = "UserCenter";
      } else {
        var mymessage = confirm("是否退出登录？");
        if (mymessage == true) {
          this.$message("退出登录");
          sessionStorage.removeItem("token");
          this.$store.commit("setUserInfo", {});
          this.$router.push("/");
        } else if (mymessage == false) {
        }
      }
    },
    test() {
      this.iscom = "testVue";
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.asideWide = "64px";
      } else {
        this.asideWide = "200px";
      }
    },
    toaddland() {
      this.iscom = "addLand";
    },
    toLandManage() {
      this.iscom = "LandManage";
    },
    toLandMap() {
      this.iscom = "LandMap";
    },
    toUserDemand() {
      this.iscom = "UserDemand";
    },
    toNewsManage() {
      this.iscom = "NewsManage";
    },
    toDictManage() {
      this.iscom = "DictManage";
    },
    toAddNews() {
      this.iscom = "addNews";
    },
    toReport() {
      this.iscom = "ReportManage";
    },
    toidentityStute() {
      this.iscom = "identityStute";
    },
    toidentityLand() {
      this.iscom = "identityLand";
    },
    tohome() {
      this.iscom = "homeVue";
    },
    toRoleManage() {
      this.iscom = "RoleManage";
    },
    toUserDetails() {
      this.iscom = "UserDetails";
    },
    toUserList() {
      this.iscom = "UserList";
    },
    toPictureManage() {
      this.iscom = "PictureManage";
    },
    toContract() {
      this.iscom = "Contract";
    },
  },
};
</script>
  
  <style>
body,
html {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  margin: 0px;
  padding: 0px;
}
.el-header {
  background-color: #818ea6;
  color: #333;
}

.el-aside {
  background-color: #545c64;
  transition: all 0.5s ease-in-out;
}

#el-main {
  padding: 0;
  margin: 0 auto;
  width: 100%;
  /* 设置滚动条 */
  overflow-x: scroll;
  white-space: nowrap;
}
/* 隐藏滚动条 */
#el-main::-webkit-scrollbar {
  width: 0 !important;
}
#el-main::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

body > .el-container {
  margin-bottom: 40px;
}
#appmenu {
  border: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
#approw {
  margin: 30px 0;
  transition: all 0.5s ease-in-out;
}
.colmenu {
  width: 30px;
  height: 30px;
  margin-top: 10px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.userInfo {
  float: right;
  display: flex;
  align-items: center;
}
.avater {
  border-radius: 40px;
  width: 40px;
  height: 40px;
  margin-top: 10px;
  margin-right: 10px;
}

/*去掉导航栏滚动条的显示
   ::-webkit-scrollbar 滚动条整体部分
  display: none----将元素的显示设为无，即在网页中不占任何的位置 */
.el-aside::-webkit-scrollbar {
  display: none;
}
</style>