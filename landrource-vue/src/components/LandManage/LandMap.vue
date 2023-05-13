<template>
  <div class="a">
    //为地图设置宽和高
    <div id="container"></div>
  </div>
</template>
  <script>
export default {
  name: "LandMap",
  data() {
    return {
      //假数据   经纬度
      lnglats: [],
      ab:"www"
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      this.$apis.checkLocation().then((res) => {
        console.log(res.data);
        this.lnglats = res.data;
        this.carGPSIP();
      });
    },
    carGPSIP() {
      var map = new AMap.Map("container", {
        resizeEnable: true,
        mapStyle: "amap://styles/darkblue",
        zoom: 12
      }); //初始化地图
      //信息窗口实例
      var infoWindow = new AMap.InfoWindow();
      //遍历生成多个标记点
      for (var i = 0, marker; i < this.lnglats.length; i++) {
        let degree = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        var marker = new AMap.Marker({
          map: map,
          position: [this.lnglats[i].longitude,this.lnglats[i].latitude], //不同标记点的经纬度
          anchor: "center", //锚点位置
          offset: new AMap.Pixel(0, 0), // 设置点标记偏移量
          content: `<div class="marker level${degree}"><img src="/img/level${degree}.png" alt=""></div>`,
        });

        marker.content = 
        `<div class="showview">
          <div class="showheader"}>
            <div>编号：${i}</div>
            <div>土地ID：${this.lnglats[i].lid}</div>
            <div>标题：${this.lnglats[i].title}</div>
            <div>类型：${this.lnglats[i].type}</div>
            <div>经纬度：${this.lnglats[i].longitude},${this.lnglats[i].latitude}</div>
          </div>
        </div>`;
        marker.on("click", markerClick);
        // marker.emit("click", { target: marker }); //默认初始化不出现信息窗体,打开初始化就出现信息窗体
      }
      function markerClick(e) {
        infoWindow.setContent(e.target.content);
        console.log("点击",e.target.content);
        console.log("",this.ab);
        infoWindow.open(map, e.target.getPosition());
      }
      map.setFitView();

    },
    getLandInfo(row){
      
    }
  },
};
</script>
  <style lang="less" scoped>
.a {
  position: relative;
  width: 100%;
  height: 100%;
}

#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  position: absolute;

  /deep/ .amap-marker {
    width: 100%;
    height: 100%;

    .marker {
      img {
        width: 100%;
        height: 100%;
      }
    }

    .level1 {
      width: 8px;
      height: 8px;
    }

    .level2 {
      width: 14px;
      height: 14px;
    }

    .level3 {
      width: 20px;
      height: 20px;
      animation: mymove 5s infinite;
    }

    .level4 {
      width: 26px;
      height: 26px;
      animation: mymove 5s infinite;
    }

    .level5 {
      width: 34px;
      height: 34px;
      animation: mymove 5s infinite;
    }

    @keyframes mymove {
      0% {
        transform: scale(1); /*开始为原始大小*/
      }
      25% {
        transform: scale(1.5); /*放大1.5倍*/
      }
      50% {
        transform: scale(1);
      }
      75% {
        transform: scale(1.5);
      }
    }
  }
}
</style>
  
