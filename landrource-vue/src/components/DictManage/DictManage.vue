<template>
  <div class="dictManage">
    <div class="left" style="width: 15%">
      <div>
        <div class="el-menu-item" @click="toFs()">
          <span>流转方式</span>
        </div>
        <div class="el-menu-item" @click="toType()">
          <span>流转类型</span>
        </div>
        <div class="el-menu-item" @click="toDictRecord()">
          <span>搜索记录</span>
        </div>
      </div>
    </div>
    <div class="right" style="width: 85%">
      <keep-alive>
        <component :is="isdict"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import DictType from '@/components/DictManage/DictType.vue'
import DictFs from '@/components/DictManage/DictFs.vue'
import DictRecord from '@/components/DictManage/DictRecord.vue'
export default {
  components:{
    DictType,
    DictFs,
    DictRecord
  },
  data() {
    return {
      isdict:"DictType"
    };
  },
  methods: {
    toFs(view){
      this.isdict = 'DictFs'
    },
    toType(){
      this.isdict = 'DictType'
    },
    toDictRecord(){
      this.isdict = 'DictRecord'
    },
  },
};
</script>

<style lang="less" scoped>
.dictManage {
  display: flex;
}
.left{
  border-right: 1px solid #EBEEF5;
}
.right {
  margin: 20px;
}

</style>