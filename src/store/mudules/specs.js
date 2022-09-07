import {
    reqspecslist,
    reqspecscount
} from "../../http/api"
const state = {
    // 1.初始值
    list: [],
    // 总条目
    total: 0,
    // 一页的条目
    size: 2,
    // 当前的页码
    page: 1
}

const getters = {
    //2.导出给组件
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    },
    page(state) {
        return state.page
    },
}

const mutations = {
    //3.修改
    changeList(state, list) {
        state.list = list;
    },
    changetotal(state, total) {
        state.total = total;
    },
    changesize(state, size) {
        state.size = size;
    },
    changepage(state, page) {
        state.page = page;
    }
}

const actions = {
    // 4.逻辑
    reqList({
        commit,
        dispatch
    }) {
        dispatch("reqSpecsList")

        //请求总数
        reqspecscount().then(res => {
            if (res.data.code === 200) {
                //修改总数
                commit("changetotal", res.data.list[0].total)
            }
        })
    },
    //请求列表数据
    reqSpecsList({
        state: {
            page,
            size
        },
        commit,
        dispatch
    },isAll=false){
        //发列表请求
        let params=isAll?{}:{
            page,
            size
        }
        reqspecslist(params).then(res => {
            if (res.data.code == 200) {
                let arr=res.data.list ? res.data.list : []

                // 如果请到的是空数组，并且不是第1页，page--;再次请列表
                if(arr.length===0&&page>1){
                    commit("changepage",page-1)
                    dispatch("reqSpecsList")
                    return;
                }

                //修改list 
                commit("changeList", arr)
            }
        })
    },

    //修改页码
    changePage({
        commit,
        dispatch
    }, page) {
        //修改page 
        commit("changepage", page)
        //重新请求列表
        dispatch("reqSpecsList")

    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}