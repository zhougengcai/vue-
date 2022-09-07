import { reqcatelist } from "../../http/api";

const state = {
  // 1.初始值
  list: [],
};

const getters = {
  //2.导出给组件
  list(state) {
    return state.list;
  },
};

const mutations = {
  //3.修改
  changeList(state, list) {
    state.list = list;
  },
};

const actions = {
    reqList(context){
        //发请求
        reqcatelist({istree:true}).then(res=>{
            if(res.data.code===200){
            //修改list
            context.commit("changeList",res.data.list?res.data.list:[])
            }
        })
    }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
