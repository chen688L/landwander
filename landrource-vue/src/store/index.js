import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({

    //存放数据
    state: {
        registerPhone: "",
        registerPassword: "",
        uid:"",
        userInfo:localStorage.getItem('admin_userinfo'),
        mapaddress:{
            latitude: 0,  //纬度
            longitude: 0,//经度
            address:"",
        } //添加土地定位地址
    },
    mutations: {
        setUserInfo(state, data) {
           state.userInfo = data ? data : '';
           state.uid = data ? data.uid : '';
           localStorage.setItem('uid',state.uid)
        },
        setMapaddress(state, data) {
            state.mapaddress=data.address
            state.latitude = data.lat
            state.longitude = data.lng
         },
    },
    getters:{},
    actions: {},
    modules: {
    },
});
export default store;